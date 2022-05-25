export type SupportedDocTypes = 'link';
export type SupportedCatTypes = 'github';

export interface IDocument {
  documentid: string;
  type: SupportedDocTypes;
  category: SupportedCatTypes;
  value: string | number | boolean | Date | undefined;
}
