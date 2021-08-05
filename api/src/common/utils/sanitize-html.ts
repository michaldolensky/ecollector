import * as sanitizeHtml from 'sanitize-html';

export const sanitizeHTML = (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      div: ['style'],
    },
  });
};
