import React from "react";

/**
 * Server component for embedding JSON-LD structured data.
 *
 * Renders one `<script type="application/ld+json">` per item. Using
 * separate scripts keeps each schema independently valid in tools like
 * Google's Rich Results Test.
 */

type JsonLdItem = Record<string, unknown>;

interface JsonLdProps {
  /** A single JSON-LD object or an array of them. */
  data: JsonLdItem | JsonLdItem[];
  /** Optional id prefix for the script tag(s). */
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          id={id ? `${id}-${index}` : undefined}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, replaceUndefined),
          }}
        />
      ))}
    </>
  );
}

/**
 * `JSON.stringify` replacer that removes `undefined` values so we don't
 * emit invalid JSON or noisy keys.
 */
function replaceUndefined(_key: string, value: unknown) {
  if (value === undefined) return undefined;
  return value;
}
