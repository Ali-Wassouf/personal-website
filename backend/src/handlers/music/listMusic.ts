import type { APIGatewayProxyHandler } from 'aws-lambda'
import { readJsonFile } from '../../lib/content'
import { ok, serverError, options } from '../../lib/response'

interface MusicData {
  releases: unknown[]
}

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return options()

  try {
    const data = await readJsonFile<MusicData>('music.json')
    const releases = data?.releases ?? []
    return ok(releases)
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
