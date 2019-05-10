/**
 * Wiki search query response model
 */
export interface SearchResult {
  query: {
    search: SearchItem[];
  };
}

/**
 * Wiki brief article model
 */
export interface SearchItem {
  title: string;
  pageid: number;
  snippet: string;
}

/**
 * Wiki full article model
 */
export interface ParsePage {
  parse: {
    text: { '*': string };
    title: string;
  };
}
