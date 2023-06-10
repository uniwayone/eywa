import * as sanitizeHtml from 'sanitize-html';

export function sanitizeInput(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape',
  });
}

export function lowercaseString(value: string) {
  return value?.toLowerCase()?.trim();
}

export function sanitizeUserObject(user: any) {
  const sanitized = user.toObject();
  delete sanitized['password'];
  delete sanitized['verification_token'];
  delete sanitized['auth_method'];
  delete sanitized['created_at'];
  return sanitized;
}
