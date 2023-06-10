import { Injectable } from '@angular/core';
import { ServiceModule } from '../service.module';
import { IScrape } from './scraping.type';

@Injectable({
  providedIn: ServiceModule,
})
export class ScraperService {
  scrape(html: string): IScrape {
    const head = this.getHeadSection(html);
    const title = this.getTitle(head);
    const description = this.getDescription(head);
    const canonical = this.getCanonical(head);
    const image = this.getImage(head);
    const domain = this.getHostname(canonical);

    return {
      title,
      description,
      ...(canonical && { url: canonical }),
      ...(image && { image }),
      ...(domain && { domain }),
    };
  }

  private getHeadSection(html: string) {
    const [, after] = html.split('<head>');
    const [before] = after.split('</head>');
    return before;
  }

  private getTitle(head: string) {
    const [, after] = head.split('<title>');
    const [before] = after.split('</title>');
    return before;
  }

  private getDescription(head: string): string | undefined {
    if (!head) {
      return;
    }
    const [, after] = head.split('<meta ', 2);
    const [before] = after.split('>', 2);

    const hasDescription = ['og:description'].some((tag) => before.includes(tag));

    if (!hasDescription) {
      return this.getDescription(head.slice(head.indexOf(before)));
    }

    const [, afterContent] = before.split('content="', 2);
    const [beforeContent] = afterContent.split('"', 2);

    return beforeContent?.endsWith('/')
      ? beforeContent.slice(0, -1).trim()
      : beforeContent.trim();
  }

  private getCanonical(head: string): string | undefined {
    if (!head) {
      return;
    }
    const [, after] = head.split('<link rel="canonical"', 2);
    const [before] = after.split('>', 2);

    const hasCanonical = ['href'].some((tag) => before.includes(tag));

    if (!hasCanonical) {
      return this.getCanonical(head.slice(head.indexOf(before)));
    }

    const [, afterContent] = before.split('href="', 2);
    const [beforeContent] = afterContent.split('"', 2);

    return beforeContent?.endsWith('/')
      ? beforeContent.slice(0, -1).trim()
      : beforeContent.trim();
  }

  private getImage(head: string): string | undefined {
    if (!head) {
      return;
    }
    const [, after] = head.split('<meta ', 2);
    const [before] = after.split('>', 2);

    const hasImage = ['og:image', 'twitter:image'].some((tag) => before.includes(tag));

    if (!hasImage) {
      return this.getImage(head.slice(head.indexOf(before)));
    }

    const [, afterContent] = before.split('content="', 2);
    const [beforeContent] = afterContent.split('"', 2);

    return beforeContent?.endsWith('/')
      ? beforeContent.slice(0, -1).trim()
      : beforeContent.trim();
  }

  private getHostname(url: string | undefined): string | undefined {
    return url && new URL(url)?.hostname;
  }
}
