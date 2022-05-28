import { BaseDocument } from '../base';

export type SupportedSocialIcons = 'twitter' | 'linkedin' | 'github';

export interface IProfile extends BaseDocument {
  blog: IBlog[];
  contact: IContact[];
  designation: string;
  location: string;
  education: IEducation[];
  social: ISocial[];
  bio?: string[];
  cover?: string[];
}

export interface IBlog {
  technology: string;
  url: string;
  icon?: string;
}

export interface IContact {
  type: 'email' | 'tel';
  value: string;
  icon?: string;
}

export interface IEducation {
  degree: string;
  startyear: number;
  endyear: number;
  field: string;
  school: string;
  position: number;
}

export interface ISocial {
  type: SupportedSocialIcons;
  url: string;
  icon?: string;
}
