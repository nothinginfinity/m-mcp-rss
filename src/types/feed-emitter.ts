/**
 * EmitOptions — configuration for feed.xml generation.
 */
export interface EmitOptions {
  /** Feed title — shown in podcast apps and RSS readers */
  title: string;

  /** Feed description */
  description: string;

  /** Canonical URL where this feed.xml will be hosted */
  feedUrl: string;

  /** Link to the feed's home page or repo */
  siteUrl: string;

  /** Author name */
  author?: string;

  /** Feed language, defaults to "en" */
  language?: string;

  /** Path to write the feed.xml file */
  outputPath: string;
}

/**
 * EmitResult — outcome of a feed.xml write operation.
 */
export interface EmitResult {
  /** Absolute path where feed.xml was written */
  outputPath: string;

  /** Number of items written to the feed */
  itemCount: number;

  /** ISO timestamp of when the feed was generated */
  generatedAt: string;

  /** Whether the write succeeded */
  success: boolean;

  /** Error message if success is false */
  error?: string;
}

/**
 * FeedItem — a single item in the emitted feed.xml.
 * Derived from a SignedEnvelope whose payload is an RssItem.
 */
export interface FeedItem {
  /** Envelope ID used as the RSS <guid> */
  guid: string;

  /** Item title */
  title: string;

  /** Item description or summary */
  description: string;

  /** Link to original content */
  link: string;

  /** ISO publish date */
  pubDate: string;

  /** Author credit */
  author?: string;

  /** Optional media enclosure (audio/video) */
  enclosureUrl?: string;
  enclosureType?: string;
  enclosureLength?: number;

  /** Categories */
  categories?: string[];

  /** The sender .mmcp address — embedded as a custom <mmcp:from> tag */
  mmcpFrom: string;
}
