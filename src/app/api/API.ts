const baseUrl = 'https://apis.career.otsimo.xyz/api/restaurant'

export const getQuery = async (path: string): Promise<any> => {
  return await fetch(`${baseUrl}${path}`).then(async (response) => await response.json())
}

export const get = async (path: string): Promise<any> => {
  const response = await fetch(`${baseUrl}${path}`)
  return await response.json()
}
