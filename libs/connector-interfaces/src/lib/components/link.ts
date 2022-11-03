export interface ILink {
  type: 'internal' | 'external';
  text: string;
  title?: string;
  icon?: string;
  url: string;
}
