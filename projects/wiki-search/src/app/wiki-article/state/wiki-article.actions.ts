import { SearchItem } from '@wiki-search/models/search-result.model';

export class AddFavorite {
  static type = '[Wiki articles] Add favorite';
  constructor(public favoriteItem: SearchItem) {}
}

export class DeleteFavorite {
  static type = '[Wiki articles] Delete favorite';
  constructor(public favoriteItem: SearchItem) {}
}

export class LoadContent {
  static type = '[Wiki articles] Load article content';
  constructor(public pageId: number) {}
}

export class ClearContent {
  static type = '[Wiki articles] Clear article content';
}

export class SelectId {
  static type = '[Wiki articles] Select article Id';
  constructor(public id: number) {}
}
