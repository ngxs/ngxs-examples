import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddFavorite, DeleteFavorite, LoadContent, ClearContent, SelectId } from './wiki-article.actions';
import { ISearchItem, IParsePage } from '@wikiSearch/models/search-result.model';
import { ApiService } from '@wikiSearch/services/api.service';
import { tap } from 'rxjs/operators';

export interface INgxsState {
  favorites: ISearchItem[];
  content: IParsePage;
  selectetId: number;
}

@State<INgxsState>({
  name: 'ngxs',
  defaults: { favorites: [], content: null, selectetId: null }
})
export class NgxsState {
  constructor(private api: ApiService) {}

  @Selector()
  static articleTitle(state: INgxsState): string {
    if (state.selectetId && !state.content) {
      return 'Loading...';
    }

    return state.content ? state.content.parse.title : 'Empty';
  }

  @Selector()
  static content(state: INgxsState) {
    return state.content;
  }

  @Selector()
  static favorites(state: INgxsState) {
    return state.favorites;
  }

  @Selector()
  static selectId(state: INgxsState) {
    return state.selectetId;
  }

  @Action(AddFavorite)
  addFavorite({ patchState, getState }: StateContext<INgxsState>, { payload }: AddFavorite) {
    const favorites = getState().favorites;
    favorites.push(payload);
    patchState({ favorites });
  }

  @Action(DeleteFavorite)
  deleteFavorite({ patchState, getState, dispatch }: StateContext<INgxsState>, { payload }: DeleteFavorite) {
    const favorites = getState().favorites.filter(favorite => favorite.pageid !== payload.pageid);

    if (getState().selectetId === payload.pageid) {
      dispatch([ClearContent, new SelectId(null)]);
    }

    patchState({ favorites });
  }

  @Action(LoadContent)
  loadContent({ patchState, dispatch }: StateContext<INgxsState>, { pageId }: LoadContent) {
    dispatch(new SelectId(pageId));

    return this.api.loadPage(pageId).pipe(
      tap(content => {
        patchState({ content });
      })
    );
  }

  @Action(ClearContent)
  clearContent({ patchState }: StateContext<INgxsState>) {
    patchState({ content: null });
  }

  @Action(SelectId)
  selectId({ patchState }: StateContext<INgxsState>, { id }: SelectId) {
    patchState({ selectetId: id });
  }
}
