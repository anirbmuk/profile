import { BaseEventParams } from '@frontend/components';

export interface CustomParams extends BaseEventParams {
  section: 'techstack' | 'github' | 'education';
}

export interface TechstackImpressionParams extends CustomParams {
  section: 'techstack';
}

export interface GitHubImpressionParams extends CustomParams {
  section: 'github';
}

export interface EducationImpressionParams extends CustomParams {
  section: 'education';
}
