import { IDocument } from '@frontend/connector-interfaces';
import { FirebaseService } from '@frontend/connector-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly firebase: FirebaseService) {}

  async getGitHubLinks(): Promise<IDocument[] | undefined> {
    const items = await this.firebase.fetchCollection<IDocument>({
      collections: ['github'],
    });
    return items;
  }
}
