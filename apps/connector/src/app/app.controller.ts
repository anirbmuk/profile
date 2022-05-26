import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  getProfile() {
    return this.appService.getProfile();
  }

  @Get('techstack')
  getTechstack() {
    return this.appService.getTechstack();
  }

  @Get('github')
  getGitHubLinks() {
    return this.appService.getGitHubLinks();
  }

  @Get('footer')
  getFooter() {
    return this.appService.getFooter();
  }
}
