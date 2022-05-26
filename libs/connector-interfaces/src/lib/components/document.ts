import { BaseDocument } from '../base';

export type SupportedDocTypes = 'link';
export type SupportedCatTypes = 'github';

export interface IDocument extends BaseDocument {
  type: SupportedDocTypes;
  category: SupportedCatTypes;
  value: string | number | boolean | Date | undefined;
}
