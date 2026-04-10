export function formatDate(date: Date | null): string {
  if (!date) return 'Present';
  return date.toLocaleDateString('en', { year: 'numeric', month: 'short' });
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

/** Bold **text** → <strong>text</strong> (minimal markdown for highlights) */
export function boldMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
