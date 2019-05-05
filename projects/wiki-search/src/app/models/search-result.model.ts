/**
 * Wiki search query response model
 */
export interface ISearchResult {
  query: {
    search: ISearchItem[];
  };
}

/**
 * Wiki brief article model
 */
export interface ISearchItem {
  title: string;
  pageid: number;
  snippet: string;
}

/**
 * Wiki full article model
 */
export interface IParsePage {
  parse: {
    text: { '*': string };
    title: string;
  };
}
