import { ITimeline } from '@frontend/components';

export interface ICareer extends ITimeline {
  documentid: string;
  position?: number;
}
