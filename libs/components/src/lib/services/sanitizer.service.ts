import { Injectable } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { ServiceModule } from './service.module';

@Injectable({
  providedIn: ServiceModule,
})
export class SanitizerService {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  sanitizeHtml(value: string | SafeValue): string | null {
    return this.domSanitizer.sanitize(1, value);
  }
}
