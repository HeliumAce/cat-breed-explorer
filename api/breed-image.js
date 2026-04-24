import { getSecureCorsHeaders, applyCorsHeaders } from './rate-limiter.js';

const CAT_API_URL = 'https://api.thecatapi.com/v1';

export default async function handler(request, response) {
  const corsHeaders = getSecureCorsHeaders(request);
  applyCorsHeaders(response, corsHeaders);

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const apiKey = process.env.CAT_API_KEY;
  if (!apiKey) {
    console.error('CAT_API_KEY is not set in environment variables');
    return response.status(500).json({ error: 'Cat API key is not configured.' });
  }

  const { id } = request.query;
  if (!id || typeof id !== 'string') {
    return response.status(400).json({ error: 'Missing required query param: id' });
  }

  try {
    const upstreamResponse = await fetch(
      `${CAT_API_URL}/images/${encodeURIComponent(id)}`,
      { headers: { 'x-api-key': apiKey } }
    );

    if (!upstreamResponse.ok) {
      return response.status(upstreamResponse.status).json({
        error: 'Upstream error from TheCatAPI',
      });
    }

    const data = await upstreamResponse.json();

    response.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=604800'
    );
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching breed image from TheCatAPI:', error.message);
    return response.status(500).json({ error: 'Internal server error.' });
  }
}
