import {
  ConnectorLibraryModule,
  FirebaseService,
} from '@frontend/connector-lib';
import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './module.type';

@Module({
  imports: [
    ConnectorLibraryModule.forRoot({
      firebaseConfig: config,
    }),
    CacheModule.register({
      store: 'memory',
      ttl: 24 * 60 * 60,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
