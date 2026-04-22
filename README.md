# m-mcp-rss

m-mcp-rss is the RSS adapter for the [m-mcp protocol](https://github.com/nothinginfinity/m-mcp).

It connects the open RSS/podcast ecosystem to m-mcp's signed envelope messaging layer — in both directions.

## What this is

A thin, mobile-safe format adapter. It does two things and nothing else:

1. **Ingest** — fetch an RSS feed, normalize each item into a `SignedEnvelope` and deliver it to an `.mmcp` inbox
2. **Emit** — take a stream of `SignedEnvelopes` from an `.mmcp` outbox and publish them as a standard `feed.xml` that any RSS reader or podcast app can subscribe to

No AI logic. No summarization. No content rewriting. Intelligence lives in the agent. This tool handles format translation and feed I/O only.

## Mental model

```text
External RSS feed (podcast, blog, YouTube, etc.)
  → m-mcp-rss ingest
  → SignedEnvelope per item
  → delivered to .mmcp inbox
  → AI agent reads + processes
  → agent writes SignedEnvelope to outbox
  → m-mcp-rss emit
  → feed.xml published at known repo path
  → subscribable by any RSS reader
```

## Address convention

Every RSS feed source gets a stable `.mmcp`-style address derived from its feed URL:

```
https://feeds.simplecast.com/rogan  →  sha256(feedUrl)[0..8].rss.mmcp
```

This address appears as the `from` field on all envelopes ingested from that feed. It is read-only — you cannot send to an RSS feed address, only receive from one.

Human-readable aliases can be assigned locally:

```
joerogan.rss.mmcp  →  https://feeds.simplecast.com/rogan
```

## Core concepts

### RssItem
A normalized, feed-agnostic representation of a single RSS entry. Maps cleanly to a `SignedEnvelope` payload.

### RssEnvelope
A `SignedEnvelope` where `payload.contentType` is `"application/rss-item+json"` and `payload.content` is a serialized `RssItem`. The `from` field is the feed's derived `.mmcp` address.

### FeedEmitter
Writes a `feed.xml` to a specified path from an array of outbound `SignedEnvelopes`. The resulting file is a valid RSS 2.0 feed, subscribable by any podcast app or RSS reader.

### FeedAddress
The stable `.mmcp`-style identifier for an RSS feed source. Derived from the feed URL. Used as `from` on ingested envelopes.

## What this repo does

- RSS feed fetch + parse (RSS 2.0 and Atom)
- `RssItem` normalization
- `RssEnvelope` creation from feed items
- `FeedAddress` derivation from feed URLs
- `feed.xml` emission from envelope arrays
- Local feed address alias resolution

## What this repo does not do

- No AI summarization or content rewriting
- No audio re-hosting or media storage
- No centralized feed index
- No authentication or paywalled feed access (v1)
- No monetary tokens

## Sibling repos

- [m-mcp](https://github.com/nothinginfinity/m-mcp) — core protocol runtime
- [m-mcp-messenger](https://github.com/nothinginfinity/m-mcp-messenger) — async signed messaging (dependency)
- m-mcp-voice — voice → transcription → envelope (coming soon)
- m-mcp-ocr — image → text → envelope (coming soon)

## Example use case: Podcast Soup

Point `m-mcp-rss` at a list of podcast RSS feeds. Each new episode becomes a `SignedEnvelope` delivered to an AI agent's inbox. The agent reads, summarizes, and clusters topics. Its output envelopes are emitted back as a new `feed.xml` — the Podcast Soup episode feed — subscribable on any podcast app.

## v1 scope

- RSS 2.0 + Atom ingest
- `RssItem` → `SignedEnvelope` mapping
- `FeedAddress` derivation
- `feed.xml` emission
- Local alias file for human-readable feed addresses
- No UI — protocol and runtime only

## Install

```
npm install
```

## Build

```
npm run build
```

## Test

```
npm run test
```

## License

MIT
