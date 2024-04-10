const API_URL = '/api/search';
const AVAILABLE_SPECIES_URL = `${API_URL}/availableSpecies`;

export type ResponseError = Readonly<{
  error: string,
  issues: string[]
}>

export type AvailableSpeciesSuccess = Readonly<{
  data: string[],
  count: number
}>
export type AvailableSpeciesResponse = AvailableSpeciesSuccess | ResponseError

export const getAvailableSpecies = async (): Promise<AvailableSpeciesResponse> => {
  const res = await fetch(AVAILABLE_SPECIES_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Could not receive profile');
  }

  return res.json() as Promise<AvailableSpeciesResponse>;
};
