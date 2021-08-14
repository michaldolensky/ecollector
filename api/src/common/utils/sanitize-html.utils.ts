import * as sanitizeHtml from 'sanitize-html';

export const sanitizeHtmlUtils = (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      div: ['style'],
    },
  });
};
