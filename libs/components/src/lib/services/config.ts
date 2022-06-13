import { InjectionToken } from '@angular/core';

export const GTM_ID = new InjectionToken<string | undefined | null>('GTM_ID');

export interface IService {
  gtmId?: string | undefined | null;
}
