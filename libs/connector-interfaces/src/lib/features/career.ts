import { ITimeline } from '../components';

export interface ICareer extends ITimeline {
  documentid: string;
  position?: number;
}
