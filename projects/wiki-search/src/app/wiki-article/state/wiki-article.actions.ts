import { ISearchItem } from '@wikiSearch/models/search-result.model';

export class AddFavorite {
  static type = '[NGXS] Add Favorite';
  constructor(public payload: ISearchItem) {}
}

export class DeleteFavorite {
  static type = '[NGXS] Delete Favorite';
  constructor(public payload: ISearchItem) {}
}

export class LoadContent {
  static type = '[NGXS] Load Content';
  constructor(public pageId: number) {}
}

export class ClearContent {
  static type = '[NGXS] Clear Content';
}

export class SelectId {
  static type = '[NGXS] Select Id';
  constructor(public id: number) {}
}
