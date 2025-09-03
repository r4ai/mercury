// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_MainIndex_getConfig } from './pages/(main)/index';
// prettier-ignore
import type { getConfig as File_Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as File_DocsIndex_getConfig } from './pages/docs/index';
// prettier-ignore
import type { getConfig as File_InternalPlaygroundSection_getConfig } from './pages/internal/playground-section';

// prettier-ignore
type Page =
| ({ path: '/' } & GetConfigResponse<typeof File_MainIndex_getConfig>)
| ({ path: '/_root' } & GetConfigResponse<typeof File_Root_getConfig>)
| ({ path: '/docs' } & GetConfigResponse<typeof File_DocsIndex_getConfig>)
| ({ path: '/internal/playground-section' } & GetConfigResponse<typeof File_InternalPlaygroundSection_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
