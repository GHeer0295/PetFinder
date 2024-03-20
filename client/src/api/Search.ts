export type SearchQuery = Readonly<{
  species?: string,
  petName?: string,
  city?: string,
  page?: number,
  pageSize?: number
}>

export type ResponseError = Readonly<{
  error: string,
  issues: string[]
}>

const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'] as const;
export type Provinces = typeof provinces[number];

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
export const isResponseError = (response: SearchResponse): response is ResponseError => 'error' in response;
