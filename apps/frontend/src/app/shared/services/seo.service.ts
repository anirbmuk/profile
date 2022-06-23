import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';

enum metaTags {
  OG_URL = 'og:url',
  TWITTER_TITLE = 'twitter:title',
  OG_TITLE = 'og:title',
  TWITTER_DESCRIPTION = 'twitter:description',
  OG_DESCRIPTION = 'og:description',
  TWITTER_IMAGE = 'twitter:image',
  TWITTER_IMAGE_ALT = 'twitter:image:alt',
  OG_IMAGE = 'og:image',
  ROBOTS = 'robots',
  GOOGLE_SITE_VERIFICATION = 'google-site-verification',
}

export interface ITag {
  site?: string;
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  robots: string;
  googleid?: string;
}

interface ISupportedTag {
  key: string;
  value: keyof ITag;
  type: 'string' | 'url';
  metatag: 'name' | 'property';
  metaname?: string;
}

const rootTitle = 'Anirban Mukherjee (anirbmuk)';

const supportedTags: ISupportedTag[] = [
  {
    key: metaTags.TWITTER_TITLE,
    value: 'title',
    type: 'string',
    metatag: 'name',
  },
  {
    key: metaTags.OG_TITLE,
    value: 'title',
    type: 'string',
    metatag: 'property',
    metaname: 'title',
  },
  { key: metaTags.TWITTER_IMAGE, value: 'image', type: 'url', metatag: 'name' },
  {
    key: metaTags.OG_IMAGE,
    value: 'image',
    type: 'url',
    metatag: 'property',
    metaname: 'image',
  },
  {
    key: metaTags.TWITTER_IMAGE_ALT,
    value: 'imageAlt',
    type: 'string',
    metatag: 'name',
  },
  {
    key: metaTags.TWITTER_DESCRIPTION,
    value: 'description',
    type: 'string',
    metatag: 'name',
  },
  {
    key: metaTags.OG_DESCRIPTION,
    value: 'description',
    type: 'string',
    metatag: 'property',
    metaname: 'description',
  },
  { key: metaTags.OG_URL, value: 'url', type: 'url', metatag: 'property' },
  { key: metaTags.ROBOTS, value: 'robots', type: 'string', metatag: 'name' },
];

export enum Robots {
  FOLLOW = 'follow',
  NOFOLLOW = 'nofollow',
  INDEX = 'index',
  NOINDEX = 'noindex',
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  setMetaTags(tags: ITag): void {
    for (const tag of supportedTags) {
      if (tags[tag.value]) {
        let value = tags[tag.value];
        if (tag.type === 'url') {
          value = `${environment.hostUrl}${tags[tag.value]}`;
        }
        if (!this.meta.getTag(`${[tag.metatag]}='${tag.key}'`)) {
          value &&
            this.meta.addTag({
              [tag.metatag]: tag.key,
              content: value,
              ...(tag.metaname && { name: tag.metaname }),
            });
        } else {
          value &&
            this.meta.updateTag(
              {
                [tag.metatag]: tag.key,
                content: value,
                ...(tag.metaname && { name: tag.metaname }),
              },
              `${[tag.metatag]}='${tag.key}'`,
            );
        }
      } else {
        if (this.meta.getTag(`${[tag.metatag]}='${tag.key}'`)) {
          this.meta.removeTag(`${[tag.metatag]}='${tag.key}'`);
        }
      }
    }
    if (environment.google.verified && environment.google.id) {
      if (this.meta.getTag(`name='google-site-verification'`)) {
        environment.google.id &&
          this.meta.updateTag(
            {
              name: 'google-site-verification',
              content: environment.google.id || '',
            },
            `name='google-site-verification'`,
          );
      } else {
        environment.google.id &&
          this.meta.addTag({
            name: 'google-site-verification',
            content: environment.google.id || '',
          });
      }
    }
  }

  setTitle(title?: string): void {
    this.title.setTitle(title ? `${rootTitle} | ${title}` : rootTitle);
  }

  setCanonical(path?: string): void {
    this.document.querySelector('link[rel="canonical"]')?.remove();
    const renderer = this.rendererFactory.createRenderer(null, null);
    const link = renderer.createElement('link');
    renderer.setAttribute(link, 'rel', 'canonical');
    renderer.setAttribute(link, 'href', `${environment.hostUrl}${path ?? ''}`);
    renderer.appendChild(this.document?.head, link);
  }

  get pageTitle(): string {
    return this.title.getTitle();
  }
}
