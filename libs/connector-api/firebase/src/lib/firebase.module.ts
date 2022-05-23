import { DynamicModule, Module } from '@nestjs/common';
import { ConnectorConfig, FirebaseService } from './..';
import { FIREBASE_CONFIG } from './configs';

@Module({})
export class FirebaseModule {
  static forRoot(config: ConnectorConfig): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: FIREBASE_CONFIG,
          useValue: config.firebaseConfig,
        },
        FirebaseService,
      ],
    };
  }
}
