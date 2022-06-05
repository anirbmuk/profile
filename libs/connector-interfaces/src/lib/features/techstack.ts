import { BaseDocument } from '../base';

export interface ITechstack extends BaseDocument {
  technology: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
  repository: {
    name: string;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
  database: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
}
