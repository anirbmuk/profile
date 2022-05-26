export interface ILink {
  type: 'internal' | 'external';
  text: string;
  icon?: string;
  url: string;
}
