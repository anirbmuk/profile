import { BaseDocument } from '../base';

export interface IFeaturedBlog extends BaseDocument {
  url: string;
  position: number;
}
