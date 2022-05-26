import { BaseDocument } from '../base';

export interface ITechstack extends BaseDocument {
  technology: {
    name: string;
    rating: number;
    position: number;
  }[];
  repository: {
    name: string;
    position: number;
  }[];
  database: {
    name: string;
    rating: number;
    position: number;
  }[];
}
