export function formatDate(date: Date | null): string {
  if (!date) return 'Present';
  return date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short' });
}

/** Render **bold** and *italic* inline markdown as HTML. */
export function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>');
}
