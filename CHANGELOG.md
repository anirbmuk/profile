## v1.13.0
- **Feat**: Updated to latest firebase package with tree-shakable modular approach.  
- **Fix**: Fixed incorrect image size reference for PWA assets.  
- **Fix**: Switched to CDN fonts to reduce payload size and better caching with service worker.  

## v1.12.0
- **Feat**: Added more customizations on the `fe-button` component.  
- **Fix**: Fixed issue of fetching data from cache twice.  

## v1.11.2
- **Fix**: Fixed display issues with notification component on tablets.  
- **Feat**: `IconComponent` now supports **lazy** and **eager** loading of images, based on input.  
- **Perf**: Layouts re-arranged to solve `Cumulative Layout Shift` issues.  

## v1.11.1
- **Chore**: Improved lint and prettier rules.  

## v1.11.0
- **Feat**: Enabled server-side caching with `cache-manager` package. Responses will be cached for 24 hours.  

## v1.10.3
- **Fix**: Fixed execution errors with lint-staged and husky.  

## v1.10.2
- **Chore**: Updated nest to v8 and enabled Node 16 on GCP.  
- **Fix**: Fixed width of notification component on large screens.  

## v1.10.1
- **Chore**: Set up **lint-staged** with **husky**.  

## v1.10.0
- **Feat**: Added new notification component. Added listener to service-worker `updateAvailable` event to trigger notification.  

## v1.9.10
- **Chore**: Updated @angular and @nrwl packages to latest of 12.  

## v1.9.9
- **Fix**: Fixed broken build caused by Node version upgrade on GitHub Actions.  
- **Fix**: Faster page load by re-ordering API call dependencies.  

## v1.9.8
- **Fix**: Tracking variables renamed as per GTM and GA conventions.  
- **Fix**: Fixed incorrect tracking callback initialization causing incorrect page-title to be reported on tracking.  

## v1.9.7
- **Chore**: Added node-inspect scripts to `package.json`.
- **Fix**: Fixed typescript data models for homepage data items.
- **Fix**: Added limit options for faster firebase fetch.

## v1.9.6
- Removed index.html from service worker cache.
- **Fix**: stop horizontal progress bar in case of any api error.
- **Feat**: added `translate="no"` for non-translatable strings.

## v1.9.5
- Locally hosted Google Material font file for faster page load.
- Removed `Popular Blogs` section for performance reasons.

## v1.9.4
- Locally hosted Google Font files for faster page load.
- Cache index.html by service worker for faster page load.
- Accessibility bug fix.

## v1.9.3
- Improved 404 page design.
- Dark mode fixes.
- SEO improvements.
- Fixes for tablet view.

## v1.9.2
- Improved tracking.
- Allow debug tracking during development.  

## v1.9.1
- CSS fixes for dark-mode.  

## v1.9.0
- Added download resume option.  

## v1.8.0
- Added blog section with feature to scrape web.  

## v1.7.0
- Removed route resolvers.
- Replaced skeleton loader by progress-bar loader.        

## v1.6.0
- Route resolver to pre-fetch data
- Removed headshot image to fix TTI      

## v1.5.0
- UI improvements
- Horizontal snap scroll on github section
- Performance improvements    

## v1.4.0
- SEO improvements
- Workspace upgrade  

## v1.3.0
- SEO fixes
- Added dark mode  

## v1.0.0
- Initial revision with SSR, SEO, Analytics  
