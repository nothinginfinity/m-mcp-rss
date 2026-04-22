/**
 * podcast-to-envelope.ts
 *
 * Example: ingest one RSS feed item and produce a SignedEnvelope.
 *
 * This is the send side of the RSS cycle.
 * The companion example (envelope-to-feed.ts) shows the emit side.
 *
 * Flow:
 *   RSS feed item → RssItem → RssEnvelope (SignedEnvelope)
 */

import type { RssItem } from '../src/types/rss-item.js';
import type { SignedEnvelope } from '../src/types/signed-envelope.js';
import { RSS_CONTENT_TYPE } from '../src/types/rss-envelope.js';

// 1. A normalized RssItem (would come from the ingest layer)
const item: RssItem = {
  id: 'https://example.com/episodes/ai-regulation-2026',
  title: 'AI Regulation in 2026: What Hosts Are Saying',
  link: 'https://example.com/episodes/ai-regulation-2026',
  description: 'A roundup of podcast commentary on the new AI governance frameworks announced this month.',
  author: 'Example Podcast',
  publishedAt: '2026-04-21T12:00:00Z',
  enclosure: {
    url: 'https://example.com/audio/ai-regulation-2026.mp3',
    type: 'audio/mpeg',
    length: 45231200,
  },
  categories: ['AI', 'regulation', 'policy'],
  sourceFeedUrl: 'https://example.com/feed.xml',
  sourceFeedTitle: 'Example Podcast',
};

// 2. Derive the FeedAddress from the source feed URL
// In production: sha256(feedUrl).slice(0, 8) + '.rss.mmcp'
const feedAddress = 'a3f9c812.rss.mmcp';

// 3. Wrap the RssItem in a SignedEnvelope
const envelope: SignedEnvelope = {
  id: 'env_rss_001',
  from: feedAddress,
  to: 'alice.mmcp',
  payload: {
    contentType: RSS_CONTENT_TYPE,
    subject: item.title,
    content: JSON.stringify(item),
  },
  sentAt: new Date().toISOString(),
  signature: 'UNSIGNED_EXAMPLE',
};

console.log('RssEnvelope ready to deliver to alice.mmcp inbox:');
console.log(JSON.stringify(envelope, null, 2));
