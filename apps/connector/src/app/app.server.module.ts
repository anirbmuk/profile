import {
  ConnectorLibraryModule,
  FirebaseConfig,
  FirebaseService,
} from '@frontend/connector-lib';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from './../../../frontend/src/app/app.server.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
} as FirebaseConfig;

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
export class ServerModule {
  constructor() {
    console.log('config =>', {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    });
  }
}
