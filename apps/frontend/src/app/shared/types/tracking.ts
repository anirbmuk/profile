import { BaseEventParams } from '@frontend/components';

export interface ImpressionEventParams extends BaseEventParams {
  section:
    | 'footer_section'
    | 'profile_section'
    | 'profile_image_section'
    | 'career_section'
    | 'techstack_section'
    | 'github_section'
    | 'education_section'
    | 'aboutme_section'
    | 'error_page'
    | 'not_found';
}

export interface ClickEventParams extends ImpressionEventParams {
  url: string | undefined;
}

export interface ToggleEventParams extends ImpressionEventParams {
  state: boolean;
}

export type ImpressionSections = 'education' | 'github' | 'profile' | 'career';
