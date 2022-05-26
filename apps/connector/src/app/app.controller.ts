import {
  FOOTER,
  GITHUB,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(PROFILE)
  getProfile() {
    return this.appService.getProfile();
  }

  @Get(TECHSTACK)
  getTechstack() {
    return this.appService.getTechstack();
  }

  @Get(GITHUB)
  getGitHubLinks() {
    return this.appService.getGitHubLinks();
  }

  @Get(FOOTER)
  getFooter() {
    return this.appService.getFooter();
  }
}
