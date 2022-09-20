const HtmlTags = [
  'title',
  'og:url',
  'twitter:title',
  'og:title',
  'twitter:description',
  'og:description',
  'twitter:image',
  'twitter:image:alt',
  'canonical',
];

export function fetchTags(tags: string[]) {
  return tags.map((tag) => HtmlTags.includes(tag));
}

export interface IScrape {
  title: string | undefined;
  url?: string | undefined;
  domain?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
}
