import {
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
} from '@frontend/connector-interfaces';
import { FirebaseService } from '@frontend/connector-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly firebase: FirebaseService) {}

  async getGitHubLinks(): Promise<IGitHub[] | undefined> {
    const items = await this.firebase.fetchCollection<IGitHub>({
      collections: ['github'],
    });
    return items;
  }

  async getFooter(): Promise<IFooterBlock | undefined> {
    const items = await this.firebase.fetchCollection<IFooterBlock>({
      collections: ['footer'],
    });
    return items?.[0];
  }

  async getProfile(): Promise<IProfile | undefined> {
    const items = await this.firebase.fetchCollection<IProfile>({
      collections: ['profile'],
    });
    return items?.[0];
  }

  async getTechstack(): Promise<ITechstack | undefined> {
    const items = await this.firebase.fetchCollection<ITechstack>({
      collections: ['techstack'],
    });
    return items?.[0];
  }
}
