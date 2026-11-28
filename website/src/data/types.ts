import type { loadSiteContent } from './site-content';

export type SiteContent = Awaited<ReturnType<typeof loadSiteContent>>;
export type Platform = Pick<SiteContent['download']['platforms'][number], 'name' | 'detail'>;
