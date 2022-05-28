import { Injectable } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { SanitizerModule } from './sanitizer.module';

@Injectable({
  providedIn: SanitizerModule,
})
export class SanitizerService {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  sanitizeHtml(value: string | SafeValue): string | null {
    return this.domSanitizer.sanitize(1, value);
  }
}
