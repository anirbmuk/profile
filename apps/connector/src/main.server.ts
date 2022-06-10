import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { ServerModule } from './app/app.server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 4300;
  await app.listen(port, () => {
    Logger.log(`NestJS started on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  config();
  bootstrap().catch((err) => console.error(err));
}
