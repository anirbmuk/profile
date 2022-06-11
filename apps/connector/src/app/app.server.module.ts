import {
  ConnectorLibraryModule,
  FirebaseService,
} from '@frontend/connector-lib';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
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
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class ServerModule {}
