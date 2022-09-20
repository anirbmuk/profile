import {
  ABOUTME,
  BLOG,
  CAREER,
  EDUCATION,
  FOOTER,
  GITHUB,
  IAboutme,
  ICareer,
  IEducation,
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { FirebaseService } from '@frontend/connector-lib';
import { Injectable } from '@nestjs/common';
import { IFeaturedBlog } from './../../../../libs/connector-interfaces/src/lib/features/featuredblog';
import { BadRequestException, GenericException } from './exception';

@Injectable()
export class AppService {
  constructor(private readonly firebase: FirebaseService) {}

  async getGitHubLinks() {
    return this.get<IGitHub[]>(GITHUB);
  }

  async getFooter() {
    return this.get<IFooterBlock>(FOOTER);
  }

  async getProfile() {
    return this.get<IProfile>(PROFILE);
  }

  async getTechstack() {
    return this.get<ITechstack>(TECHSTACK);
  }

  async getCareer() {
    return this.get<ICareer[]>(CAREER);
  }

  async getEducation() {
    return this.get<IEducation[]>(EDUCATION);
  }

  async getAboutme() {
    return this.get<IAboutme[]>(ABOUTME);
  }

  async getBlogs() {
    return this.get<IFeaturedBlog[]>(BLOG);
  }

  private async get<T>(path: string) {
    if (!path) {
      throw new BadRequestException('Firestore collection is empty');
    }
    let items = [] as T[];
    try {
      items = await this.firebase.fetchCollection<T>({
        collections: [path],
        whereClause: [
          { column: 'visibility', operator: '==', condition: 'public' },
        ],
      });
      return items;
    } catch {
      throw new GenericException();
    }
  }
}
