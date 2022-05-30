import { BaseDocument } from '../base';

export interface ITechstack extends BaseDocument {
  technology: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
  }[];
  repository: {
    name: string;
    position: number;
    icon?: string;
  }[];
  database: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
  }[];
}
