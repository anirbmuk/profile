import { ConnectorLibraryModule, FirebaseService } from '@frontend/connector-lib';
import { CacheModule, Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from './../../../frontend/src/app/app.server.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './module.type';

@Module({
  imports: [
    ConnectorLibraryModule.forRoot({
      firebaseConfig: config,
    }),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/apps/frontend'),
    }),
    CacheModule.register({
      store: 'memory',
      ttl: 24 * 60 * 60,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class ServerModule {}
