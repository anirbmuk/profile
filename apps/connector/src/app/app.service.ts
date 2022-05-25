import { IDocument } from '@frontend/connector-interfaces';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase';

@Injectable()
export class AppService {
  constructor(private readonly firebase: FirebaseService) {}

  async getGitHubLinks(): Promise<{ items: IDocument[] | undefined }> {
    const items = await this.firebase.fetchCollection<IDocument>({
      collections: ['github'],
    });
    return { items };
  }
}
