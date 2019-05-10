import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddFavorite, DeleteFavorite, LoadContent, ClearContent, SelectId } from './wiki-article.actions';
import { SearchItem, ParsePage } from '@wikiSearch/models/search-result.model';
import { ApiService } from '@wikiSearch/services/api.service';
import { tap } from 'rxjs/operators';

interface WikiArticlesState {
  favorites: SearchItem[];
  content: ParsePage;
  selectetId: number;
}

@State<WikiArticlesState>({
  name: 'ngxs',
  defaults: { favorites: [], content: null, selectetId: null }
})
export class WikiArticlesStore {
  constructor(private api: ApiService) {}

  @Selector()
  static articleTitle(state: WikiArticlesState): string {
    if (state.selectetId && !state.content) {
      return 'Loading...';
    }

    return state.content ? state.content.parse.title : 'Empty';
  }

  @Selector()
  static content(state: WikiArticlesState) {
    return state.content;
  }

  @Selector()
  static favorites(state: WikiArticlesState) {
    return state.favorites;
  }

  @Selector()
  static selectId(state: WikiArticlesState) {
    return state.selectetId;
  }

  @Action(AddFavorite)
  addFavorite({ patchState, getState }: StateContext<WikiArticlesState>, { payload }: AddFavorite) {
    const favorites = getState().favorites;
    favorites.push(payload);
    patchState({ favorites });
  }

  @Action(DeleteFavorite)
  deleteFavorite({ patchState, getState, dispatch }: StateContext<WikiArticlesState>, { payload }: DeleteFavorite) {
    const favorites = getState().favorites.filter(favorite => favorite.pageid !== payload.pageid);

    if (getState().selectetId === payload.pageid) {
      dispatch([ClearContent, new SelectId(null)]);
    }

    patchState({ favorites });
  }

  @Action(LoadContent)
  loadContent({ patchState, dispatch }: StateContext<WikiArticlesState>, { pageId }: LoadContent) {
    dispatch(new SelectId(pageId));

    return this.api.loadPage(pageId).pipe(
      tap(content => {
        patchState({ content });
      })
    );
  }

  @Action(ClearContent)
  clearContent({ patchState }: StateContext<WikiArticlesState>) {
    patchState({ content: null });
  }

  @Action(SelectId)
  selectId({ patchState }: StateContext<WikiArticlesState>, { id }: SelectId) {
    patchState({ selectetId: id });
  }
}
