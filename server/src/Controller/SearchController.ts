import { Request, Response } from 'express';
import { SearchResponse } from '../Api/Search';
import { db } from '../Database/Database';
import { adoptionPosts, pets, species } from '../Database/Schema';
import { and, eq, ilike, notInArray, or } from 'drizzle-orm';
import { caseUnreachable, createValidationError } from '../Util/Error';
import { extractQueryByKeys, tryRun } from '../Util/Util';
import { Result, result } from '../Util/Error';
import { SearchFields, searchValidator } from '../Api/Validators/SearchValidator';

const DefaultSearchPageSize = 10;

export type SearchPosts = Readonly<{
    page?: number,
    pageSize?: number,
    /** Exclude posts from these uids. */
    excludeUserIds?: string[],
    /**
     * If true, search results will only include posts that match all the search fields
     * (i.e. AND between conditions instead of OR).
     */
    strictSearch?: boolean
}> & Readonly<Partial<{
    // we can search by multiple values for a field (e.x. species: ['cat', 'dog'])
    [K in typeof SearchFields[keyof typeof SearchFields]]: string | string[]
}>>

/**
 * Search for adoption posts based on the given search fields.
 * @param search Filters and pagination for the search
 */
export const searchPosts = (search: SearchPosts): Promise<Result<SearchResponse>> => {
    // get all the search terms from the query.
    // E.x. { species: ['cat', 'dog'] } => [{ field: 'species', query: 'cat' }, { field: 'species', query: 'dog' }]
    const searchTerms = Object.values(SearchFields)
        .filter(f => search[f] !== undefined)
        .flatMap(field => {
            const query = search[field]!;
            if(Array.isArray(query))
                return query.map(q => ({ field, query: q }));
            else
                return [{ field, query }];
        });
    
    // map each search term to a SQL LIKE clause
    const searchFilters = searchTerms.map(t => {
        switch (t.field) {
            case 'species': return ilike(species.name, `%${t.query}%`);
            case 'city': return ilike(adoptionPosts.city, `%${t.query}%`);
            case 'petName': return ilike(pets.name, `%${t.query}%`);
            default: return caseUnreachable();
        }
    });

    if(searchFilters.length === 0)
        return Promise.resolve(result({ data: [], count: 0 }));

    const excludeUserIds = new Set((search.excludeUserIds ?? []).filter(id => id.trim() !== ''));
    const excludeUsersFilter = excludeUserIds.size > 0
        ? notInArray(adoptionPosts.userId, Array.from(excludeUserIds))
        : undefined;
    
    const limit = search.pageSize ?? DefaultSearchPageSize;
    const offset = ((search.page ?? 1) - 1) * limit;
    const queryFilter = and(
        excludeUsersFilter,
        // if strict search, use AND between search filters, else use OR
        search.strictSearch ? and(...searchFilters) : or(...searchFilters)
    );

    const searchQuery = db
        .select({
            postId: adoptionPosts.adoptPostId,
            title: adoptionPosts.title,
            province: adoptionPosts.province,
            city: adoptionPosts.city,
            petName: pets.name,
            speciesName: species.name
        })
        .from(adoptionPosts)
        .innerJoin(pets, eq(adoptionPosts.petId, pets.petId))
        .innerJoin(species, eq(pets.speciesId, species.speciesId))
        .where(queryFilter)
        .offset(offset)
        .limit(limit)
        .then(data => ({ data, count: data.length }));
    return tryRun(searchQuery);
};

export const getSearch = async (req: Request, res: Response): Promise<unknown> => {
    // TODO: get uid from auth session and exclude the user's posts from the search results

    const { page, pageSize } = req.query;
    const searchFields = extractQueryByKeys(req.query, Object.values(SearchFields));
    
    const validationRes = searchValidator.safeParse({ page, pageSize, ...searchFields });
    if (!validationRes.success)
        return res.status(400).json(createValidationError('Invalid search query', validationRes));
    
    // run search with the provided search fields from req.query
    const searchResults = await searchPosts({
        strictSearch: true,
        ...validationRes.data
    });

    if (!searchResults.success)
        return res.status(500).json(createValidationError('Error searching for posts'));

    return res.json(searchResults.value);
};
