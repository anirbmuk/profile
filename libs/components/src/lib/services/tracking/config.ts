import { InjectionToken } from '@angular/core';

export const GTM_ID = new InjectionToken<string | undefined | null>('GTM_ID');
export const PRODUCTION = new InjectionToken<boolean>('PRODUCTION');

export interface IService {
  gtmId?: string | undefined | null;
  production?: boolean;
}

export function buildGTMScript(gtmId: string) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-${gtmId}');`;
}

export function buildNoScript(gtmId: string) {
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${gtmId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
}
