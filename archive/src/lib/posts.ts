/** Parse `YYYY-M-D-slug.md` from content collection entry id */
export function parsePostFilename(id: string) {
  const m = id.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-(.+)\.md$/);
  if (!m) throw new Error(`Invalid blog filename: ${id}`);
  const [, y, mo, d, slug] = m;
  return {
    year: y,
    month: mo.padStart(2, "0"),
    day: d.padStart(2, "0"),
    slug,
  };
}

export function postUrl(entry: { id: string }) {
  const { year, month, day, slug } = parsePostFilename(entry.id);
  return `/blog/${year}/${month}/${day}/${slug}/`;
}

export function normalizeTags(
  tags: string | string[] | undefined,
): string[] {
  if (tags === undefined) return [];
  return Array.isArray(tags) ? tags : [tags];
}
