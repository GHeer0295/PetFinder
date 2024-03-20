import { z } from "zod";

export const SearchFields = {
    species: 'species',
    pet: 'petName',
    city: 'city'
} as const;

/** Creates a zod object that has all of the {@link SearchFields} as optional string fields. */
const searchFieldsValidator = Object.values(SearchFields)
    .reduce(
        (acc, field) => ({ ...acc, [field]: z.string().optional() }),
        {} as Record<typeof SearchFields[keyof typeof SearchFields], z.ZodString>
    );

export const searchValidator = z.object({
    // validate page and pageSize as numeric strings
    page: z.string().regex(/^\d+$/).transform(Number).transform(n => n > 0 ? n : 1).optional(),
    pageSize: z.string().regex(/^\d+$/).transform(Number).transform(n => n > 0 ? n : 1).optional(),
    ...searchFieldsValidator
}).partial().refine(
    data => Object.values(SearchFields).some(field => data[field] !== undefined),
    { message: `At least one search field must be included in the query (${Object.values(SearchFields).join(', ')})` }
);
