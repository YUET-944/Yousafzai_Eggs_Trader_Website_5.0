import React from 'react';

const KNOWN_HEADINGS = [
  'job overview',
  'role overview',
  'overview',
  'key responsibilities',
  'responsibilities',
  'required qualifications and experience',
  'required qualifications',
  'qualifications and experience',
  'qualifications',
  'requirements',
  'how to apply',
  'application process',
];

function normalizeHeading(line) {
  const mdMatch = line.match(/^\s*#{1,6}\s+(.+?)\s*:?\s*$/);
  if (mdMatch) {
    return mdMatch[1].trim();
  }

  const trimmed = line.trim().replace(/:$/, '').trim();
  if (KNOWN_HEADINGS.includes(trimmed.toLowerCase())) {
    return trimmed;
  }

  return null;
}

function parseListLine(line) {
  const match = line.match(/^\s*(?:\d+\.|[-*•])\s+(.+)$/);
  return match ? match[1].trim() : null;
}

/**
 * Safely parses raw job description text (including Markdown headings, plain headings,
 * numbered lists, bullet lists, and paragraphs) into structured sections.
 */
export function parseJobSections(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  let currentSection = { heading: null, blocks: [] };
  let currentParagraph = [];
  let currentList = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      currentSection.blocks.push({
        type: 'paragraph',
        content: currentParagraph.join(' '),
      });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      currentSection.blocks.push({
        type: 'list',
        items: currentList,
      });
      currentList = [];
    }
  };

  const pushCurrentSection = () => {
    flushParagraph();
    flushList();
    if (currentSection.heading || currentSection.blocks.length > 0) {
      sections.push(currentSection);
    }
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingText = normalizeHeading(rawLine);
    if (headingText) {
      pushCurrentSection();
      currentSection = { heading: headingText, blocks: [] };
      continue;
    }

    const listItem = parseListLine(rawLine);
    if (listItem) {
      flushParagraph();
      currentList.push(listItem);
      continue;
    }

    flushList();
    currentParagraph.push(trimmed);
  }

  pushCurrentSection();

  // Ensure the initial section always has a clear heading
  if (sections.length > 0 && !sections[0].heading) {
    sections[0].heading = 'Job Overview';
  }

  return sections;
}

/**
 * Parses standalone requirements/responsibilities strings or arrays into clean list items.
 */
export function parseListItems(rawItems) {
  if (!rawItems) return [];
  const rawArray = Array.isArray(rawItems)
    ? rawItems
    : String(rawItems).replace(/\r\n/g, '\n').split('\n');

  return rawArray
    .map((line) => String(line).trim())
    .filter(Boolean)
    .map((line) => parseListLine(line) || line);
}

/**
 * Safely renders inline **bold** segments and http/https URLs without dangerouslySetInnerHTML.
 */
export function renderInlineText(text) {
  if (!text || typeof text !== 'string') return text;

  const tokenRegex = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }

    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-job-link"
        >
          {part}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Extracts a Google Form URL from text if the dedicated field is empty.
 */
export function extractGoogleFormUrl(text) {
  if (!text || typeof text !== 'string') return null;
  const match = text.match(/https?:\/\/(?:docs\.google\.com\/forms\/[^\s)]+|forms\.gle\/[^\s)]+)/i);
  return match ? match[0] : null;
}
