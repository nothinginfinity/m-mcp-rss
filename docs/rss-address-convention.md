# RSS Address Convention

Every external RSS feed gets a stable, derived `.mmcp` address so it can participate in the m-mcp envelope system as a first-class sender.

## Derivation

```
FeedAddress = sha256(feedUrl).slice(0, 8) + '.rss.mmcp'
```

Example:

```
feedUrl      →  https://feeds.simplecast.com/rogan
sha256(url)  →  a3f9c8124e7b...
address      →  a3f9c812.rss.mmcp
```

## Properties

- **Stable** — same feed URL always produces the same address
- **Read-only** — you cannot send TO a feed address, only receive FROM one
- **No private key** — RSS feeds are not authenticated agents; the ingesting agent signs envelopes on their behalf
- **Globally unique** — collision probability with 8 hex chars is acceptable for v1

## Human aliases

Any agent can maintain a local `aliases.json` mapping human-readable names to feed URLs:

```json
{
  "alias": "joerogan.rss.mmcp",
  "feedUrl": "https://feeds.simplecast.com/rogan",
  "displayName": "The Joe Rogan Experience"
}
```

Aliases are local only. They are never transmitted in envelopes. The `from` field in any envelope always uses the derived address, not the alias.

## Why not use the feed URL directly?

- URLs are mutable (feeds move)
- URLs are too long for the `from` field convention
- The `.mmcp` suffix signals protocol membership clearly
- Derived addresses survive feed URL migrations if an alias is updated locally

## v2 considerations

- A shared alias registry (a GitHub-hosted `aliases.json`) would allow global human-readable feed names
- Longer hash prefix (16 chars) for lower collision probability at scale
- Feed URL migration records to preserve address continuity
