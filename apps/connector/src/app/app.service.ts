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
  IFeaturedBlog,
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { FirebaseService } from '@frontend/connector-lib';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BadRequestException, GenericException } from './exception';

@Injectable()
export class AppService {
  constructor(
    private readonly firebase: FirebaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getGitHubLinks() {
    return this.get<IGitHub>(GITHUB);
  }

  async getFooter() {
    return this.get<IFooterBlock>(FOOTER, 1);
  }

  async getProfile() {
    return this.get<IProfile>(PROFILE, 1);
  }

  async getTechstack() {
    return this.get<ITechstack>(TECHSTACK, 1);
  }

  async getCareer() {
    return this.get<ICareer>(CAREER);
  }

  async getEducation() {
    return this.get<IEducation>(EDUCATION, 1);
  }

  async getAboutme() {
    return this.get<IAboutme>(ABOUTME);
  }

  async getBlogs() {
    return this.get<IFeaturedBlog>(BLOG);
  }

  private async get<T>(path: string, limit?: number) {
    if (!path) {
      throw new BadRequestException('Firestore collection is empty');
    }
    let items = [] as T[];
    const cacheKey = btoa(`${path}_${limit ?? 1}`);
    const cachedItems = await this.cacheManager.get(cacheKey);
    if (cachedItems) {
      return JSON.parse(await this.cacheManager.get(cacheKey)) as T[];
    }
    try {
      items = await this.firebase.fetchCollection<T>({
        collections: [path],
        whereClause: [
          { column: 'visibility', operator: '==', condition: 'public' },
        ],
        ...(limit && { limit }),
      });
      await this.cacheManager.set(cacheKey, JSON.stringify(items));
      return items;
    } catch {
      throw new GenericException();
    }
  }
}
