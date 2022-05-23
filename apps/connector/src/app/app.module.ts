import { FirebaseModule } from '@frontend/connector-api/firebase';
import { Module } from '@nestjs/common';
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
};

@Module({
  imports: [
    FirebaseModule.forRoot({
      shared: {
        production: process.env.APP_ENV !== 'development',
      },
      firebaseConfig: config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
