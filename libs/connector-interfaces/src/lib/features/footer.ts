import { BaseDocument } from '../base';
import { ILink } from './../components';

export interface IFooterBlock extends BaseDocument {
  links?: ILink[];
  copyright: string;
  publishdate?: string;
}
