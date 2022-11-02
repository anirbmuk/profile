import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GTM_ID, IService, PRODUCTION } from './tracking/config';

@NgModule({
  imports: [BrowserModule],
  declarations: [],
  exports: [],
})
export class ServiceModule {
  static forRoot(config: IService): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        {
          provide: GTM_ID,
          useValue: config.gtmId,
        },
        {
          provide: PRODUCTION,
          useValue: config.production || false,
        },
      ],
    };
  }
}
