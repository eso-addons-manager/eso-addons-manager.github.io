import type { APIRoute, GetStaticPaths } from 'astro';
import { getReleaseSnapshot } from '../../data/github';

// Astro ignores literal underscore-prefixed directories in src/pages.
export const getStaticPaths = (() => [{ params: { releaseData: '_data' } }]) satisfies GetStaticPaths;

export const GET: APIRoute = async () => {
  const { snapshot } = await getReleaseSnapshot();
  return Response.json(snapshot);
};
