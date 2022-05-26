import { BaseDocument } from '../base';
import { ILink } from './../components';

export interface IFooterBlock extends BaseDocument {
  documentid: string;
  links?: ILink[];
  copyright: string;
}
