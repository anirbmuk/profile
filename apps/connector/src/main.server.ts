import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const { ServerModule } = await import('./app/app.server.module');
  const app = await NestFactory.create(ServerModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 4300;
  await app.listen(port, () => {
    Logger.log(`NestJS server started on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch((err) => console.error(err));
}
