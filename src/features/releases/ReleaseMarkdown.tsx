import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked once: no raw HTML pass-through, GitHub-flavored line breaks.
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Sanitizer config: strip all raw HTML tags and attributes, allow only
// safe text formatting from Markdown. No scripts, no inline styles, no event
// handlers, no dangerous protocols.
function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'del', 's', 'mark',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'a', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img',
    ],
    ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'colspan', 'rowspan'],
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
  });
}

type ReleaseMarkdownProps = {
  markdown: string;
  className?: string;
};

export default function ReleaseMarkdown({
  markdown,
  className,
}: ReleaseMarkdownProps) {
  const html = useMemo(() => {
    const raw = marked.parse(markdown, { async: false }) as string;
    return sanitize(raw);
  }, [markdown]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
