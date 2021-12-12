import * as sanitizeHtml from 'sanitize-html';
import { ValueTransformer } from 'typeorm';

export const sanitizeHtmlUtils = (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      div: ['style'],
    },
  });
};

export class HtmlSanitizerTransformer implements ValueTransformer {
  from(value: string): string {
    return value;
  }

  to(value: string): string {
    return sanitizeHtmlUtils(value);
  }
}
