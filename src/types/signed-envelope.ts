/**
 * SignedEnvelope — re-exported from m-mcp-messenger for local use.
 * Keep this in sync with:
 * https://github.com/nothinginfinity/m-mcp-messenger/blob/main/src/types/envelope.ts
 *
 * When m-mcp-messenger is published to npm this file should be removed
 * and replaced with: import type { SignedEnvelope } from 'm-mcp-messenger';
 */

export interface MessagePayload {
  /** Arbitrary content — text, structured data, capability result */
  content: string;
  /** Optional MIME hint */
  contentType?: string;
  /** Optional subject line (email metaphor) */
  subject?: string;
}

export interface SignedEnvelope {
  /** Unique message ID */
  id: string;
  /** Sender .mmcp address (or 0x address) */
  from: string;
  /** Recipient .mmcp address (or 0x address) */
  to: string;
  /** Message payload */
  payload: MessagePayload;
  /** ISO timestamp of creation */
  sentAt: string;
  /** EIP-191 signature of canonical envelope hash */
  signature: string;
  /** Optional thread ID for reply chains */
  threadId?: string;
  /** Optional cognitive work token attached to this message */
  cognitiveWorkToken?: CognitiveWorkToken;
}

export interface CognitiveWorkToken {
  tokenId: string;
  mintedBy: string;
  mintedAt: string;
  envelopeId: string;
  proof: string;
}
