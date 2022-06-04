import { BaseDocument } from '../base';

export type SupportedSocialIcons = 'twitter' | 'linkedin' | 'github';

export interface IProfile extends BaseDocument {
  blog: IBlog[];
  contact: IContact[];
  designation: string;
  currentjob?: string;
  location: string;
  social: ISocial[];
  bio?: string[];
  cover?: string[];
}

export interface IBlog {
  technology: string;
  url: string;
  icon?: string;
  description?: string;
  position?: 'start' | 'middle' | 'end' | undefined;
  iconSize?: number;
}

export interface IContact {
  type: 'email' | 'tel';
  value: string;
  icon?: string;
  iconSize?: number;
}

export interface ISocial {
  type: SupportedSocialIcons;
  url: string;
  icon?: string;
}
