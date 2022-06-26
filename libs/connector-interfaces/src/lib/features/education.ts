import { BaseDocument } from '../base';

export interface IEducation extends BaseDocument {
  degree: string;
  startyear: number;
  endyear: number;
  field: string;
  school: string;
  position: number;
  location: string;
}
