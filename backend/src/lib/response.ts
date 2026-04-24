import type { APIGatewayProxyResult } from 'aws-lambda'

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export function ok<T>(data: T, meta?: Record<string, unknown>): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ data, ...(meta ? { meta } : {}) }),
  }
}

export function notFound(message = 'Not found'): APIGatewayProxyResult {
  return {
    statusCode: 404,
    headers: corsHeaders,
    body: JSON.stringify({ error: { code: 'NOT_FOUND', message } }),
  }
}

export function serverError(message = 'Internal server error'): APIGatewayProxyResult {
  return {
    statusCode: 500,
    headers: corsHeaders,
    body: JSON.stringify({ error: { code: 'INTERNAL_ERROR', message } }),
  }
}

export function options(): APIGatewayProxyResult {
  return { statusCode: 204, headers: corsHeaders, body: '' }
}
