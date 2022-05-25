import { DynamicModule, Module } from '@nestjs/common';
import { ConnectorLibraryConfiguration } from './connector-library.types';
import { FIREBASE_CONFIG } from './firebase';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class ConnectorLibraryModule {
  static forRoot(config: ConnectorLibraryConfiguration): DynamicModule {
    return {
      module: ConnectorLibraryModule,
      providers: [
        {
          provide: FIREBASE_CONFIG,
          useValue: config.firebaseConfig,
        },
      ],
      exports: [FIREBASE_CONFIG],
    };
  }
}
