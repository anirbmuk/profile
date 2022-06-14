import { BaseEventParams } from '@frontend/components';

export interface ImpressionEventParams extends BaseEventParams {
  section: 'techstack_section' | 'github_section' | 'education_section';
}

export interface ClickEventParams extends BaseEventParams {
  source?: string;
  url?: string;
}
