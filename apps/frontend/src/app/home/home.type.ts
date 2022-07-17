import { ICareer, IProfile } from '@frontend/connector-interfaces';

export interface IHomePageData {
  profile: [IProfile];
  career: ICareer[];
}
