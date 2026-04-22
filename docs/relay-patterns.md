# Relay Patterns

This document describes the supported transport patterns for m-mcp-rss.
A relay is any storage layer that both sender and receiver can read/write.

## Pattern 1: GitHub File Relay

The simplest relay. Envelopes are written as fenced JSON blocks in a Markdown file in a GitHub repo.

```
Ingest layer writes to:
  spaces/<recipient>.mmcp/inbox.md  (in nothinginfinity/Studio-OS-Chat)

Emit layer writes to:
  feeds/<feed-name>.xml  (in the same or a different repo)
```

**Use case:** Perplexity Space ↔ Perplexity Space messaging. AI agent ↔ AI agent across repos.

**Pros:** Zero infrastructure. Works from a mobile phone. Human-readable.

**Cons:** No push notification. Polling only. Not suitable for high-frequency message rates.

## Pattern 2: Cross-Repo Relay

Alice's inbox lives in Repo A. Bob's inbox lives in Repo B. Each agent reads and writes only its own repo. The protocol connects them.

```
Alice (Space A) → writes to Repo A (alice outbox)
                        ↓
                m-mcp-rss relay
                        ↓
Bob (Space B)   ← reads from Repo B (bob inbox)
```

**Use case:** Independent agents on separate repos exchanging signed envelopes.

## Pattern 3: RSS Broadcast Relay

An agent's outbox is published as a `feed.xml`. Any subscriber (human or agent) can read it via standard RSS.

```
Agent outbox (SignedEnvelopes)
  → FeedEmitter
  → feed.xml committed to repo
  → subscribable at raw.githubusercontent.com URL
  → consumed by podcast apps, RSS readers, other agents
```

**Use case:** Podcast Soup episode feed. Agent broadcast channels.

## Choosing a relay

| Pattern | Setup | Latency | Scale |
|---|---|---|---|
| GitHub file | Zero | Minutes | Low |
| Cross-repo | Zero | Minutes | Low-medium |
| RSS broadcast | Zero | Minutes | Unlimited readers |

All patterns require zero server infrastructure.
