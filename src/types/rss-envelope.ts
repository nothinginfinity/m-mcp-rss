import type { SignedEnvelope } from './signed-envelope.js';

/**
 * RssEnvelope — a SignedEnvelope carrying a single RssItem as its payload.
 *
 * Conventions:
 *   payload.contentType  = "application/rss-item+json"
 *   payload.content      = JSON.stringify(RssItem)
 *   payload.subject      = RssItem.title
 *   from                 = FeedAddress derived from RssItem.sourceFeedUrl
 *   to                   = recipient .mmcp address (the inbox owner)
 *
 * The signature field is populated by the ingest layer using the
 * local agent keypair. For read-only RSS sources the signature
 * represents the ingesting agent, not the original publisher.
 */
export type RssEnvelope = SignedEnvelope;

/**
 * RssContentType — the MIME type used to identify RSS item payloads
 * inside a SignedEnvelope. Consumers check this field to distinguish
 * RSS envelopes from other message types.
 */
export const RSS_CONTENT_TYPE = 'application/rss-item+json' as const;

/**
 * FeedAddress — a stable .mmcp-style identifier derived from a feed URL.
 *
 * Format: <sha256(feedUrl)[0..8]>.rss.mmcp
 * Example: a3f9c812.rss.mmcp
 *
 * This address appears as the `from` field on all envelopes ingested
 * from that feed. It is read-only — you cannot send TO a feed address.
 */
export type FeedAddress = string;

/**
 * FeedAlias — a human-readable local alias mapping to a feed URL.
 * Stored in aliases.json. Never transmitted in envelopes.
 *
 * Example:
 *   { alias: "joerogan.rss.mmcp", feedUrl: "https://feeds.simplecast.com/rogan" }
 */
export interface FeedAlias {
  /** Human-readable .mmcp-style alias */
  alias: string;

  /** Canonical RSS feed URL this alias resolves to */
  feedUrl: string;

  /** Optional display name for this feed */
  displayName?: string;
}
