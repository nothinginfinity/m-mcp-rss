/**
 * envelope-to-feed.ts
 *
 * Example: take agent output envelopes and describe the feed.xml they produce.
 *
 * This is the emit side of the RSS cycle.
 * The companion example (podcast-to-envelope.ts) shows the ingest side.
 *
 * Flow:
 *   Agent output SignedEnvelopes → FeedEmitter → feed.xml
 */

import type { SignedEnvelope } from '../src/types/signed-envelope.js';
import type { EmitOptions, FeedItem } from '../src/types/feed-emitter.js';

// 1. Agent output envelopes (would come from the agent's outbox)
const agentEnvelopes: SignedEnvelope[] = [
  {
    id: 'env_out_001',
    from: 'alice.mmcp',
    to: 'podcast-soup-feed.mmcp',
    payload: {
      contentType: 'text/markdown',
      subject: 'Week of Apr 21: AI Regulation Roundup',
      content: '## AI Regulation\n\nThis week 8 podcasts covered AI governance...\n',
    },
    sentAt: '2026-04-21T18:00:00Z',
    signature: 'UNSIGNED_EXAMPLE',
  },
];

// 2. Map envelopes to FeedItems
const feedItems: FeedItem[] = agentEnvelopes.map((env) => ({
  guid: env.id,
  title: env.payload.subject ?? 'Untitled',
  description: env.payload.content,
  link: 'https://github.com/nothinginfinity/Studio-OS-Chat/spaces/alice.mmcp/outbox.md',
  pubDate: env.sentAt,
  author: env.from,
  mmcpFrom: env.from,
}));

// 3. Emit config
const options: EmitOptions = {
  title: 'Podcast Soup',
  description: 'An AI-generated show about other podcasts, powered by m-mcp-rss.',
  feedUrl: 'https://raw.githubusercontent.com/nothinginfinity/Studio-OS-Chat/main/feeds/podcast-soup.xml',
  siteUrl: 'https://github.com/nothinginfinity/m-mcp-rss',
  author: 'alice.mmcp',
  language: 'en',
  outputPath: 'feeds/podcast-soup.xml',
};

console.log('Feed config:');
console.log(JSON.stringify(options, null, 2));
console.log('\nFeed items to emit:');
console.log(JSON.stringify(feedItems, null, 2));
console.log('\n→ FeedEmitter would write feed.xml to:', options.outputPath);
