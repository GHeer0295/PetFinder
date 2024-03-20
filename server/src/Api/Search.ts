import { z } from 'zod';
import { ResponseError } from './Common';
import { searchValidator } from './Validators/SearchValidator';
import { Provinces } from '../Database/Schema';

export type SearchQuery = z.infer<typeof searchValidator>

export type SearchSuccess = Readonly<{
    data: Readonly<{
        postId: string,
        title: string,
        province: Provinces,
        city: string,
        petName: string,
        speciesName: string
    }>[],
    count: number
}>
export type SearchResponse = SearchSuccess | ResponseError
