/**
 * RssItem — normalized, feed-agnostic representation of a single RSS entry.
 * Derived from RSS 2.0 and Atom feed item fields.
 * This is the canonical internal representation before envelope wrapping.
 */
export interface RssItem {
  /** Unique identifier — guid (RSS 2.0) or id (Atom). Falls back to link if absent. */
  id: string;

  /** Episode or article title */
  title: string;

  /** Canonical URL to the original content */
  link: string;

  /** Full or summary description. HTML allowed — consumers should sanitize. */
  description: string;

  /** Author name or email, if present */
  author?: string;

  /** ISO 8601 publish date. Parsed from pubDate (RSS 2.0) or published/updated (Atom). */
  publishedAt: string;

  /** Media enclosure — audio or video attachment */
  enclosure?: RssEnclosure;

  /** Categories or tags assigned to this item */
  categories?: string[];

  /** Raw source feed URL this item was ingested from */
  sourceFeedUrl: string;

  /** Human-readable feed/show name */
  sourceFeedTitle?: string;
}

/**
 * RssEnclosure — audio or video attachment on an RSS item.
 * Maps directly to the <enclosure> tag in RSS 2.0.
 */
export interface RssEnclosure {
  /** Direct URL to the media file */
  url: string;

  /** MIME type, e.g. "audio/mpeg", "video/mp4" */
  type: string;

  /** File size in bytes. 0 if unknown. */
  length: number;
}
