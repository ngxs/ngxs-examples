import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { AddFavorite, DeleteFavorite, LoadContent, ClearContent, SelectId } from './wiki-article.actions';
import { SearchItem, ParsePage } from '@wiki-search/models/search-result.model';
import { ApiService } from '@wiki-search/services/api.service';
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
  @ImmutableSelector()
  static content(state: WikiArticlesState): ParsePage {
    return state.content;
  }

  @Selector()
  @ImmutableSelector()
  static favorites(state: WikiArticlesState): SearchItem[] {
    return state.favorites;
  }

  @Selector()
  static selectId(state: WikiArticlesState): number {
    return state.selectetId;
  }

  @Action(AddFavorite)
  @ImmutableContext()
  addFavorite({ setState }: StateContext<WikiArticlesState>, { payload }: AddFavorite) {
    setState((state: WikiArticlesState) => {
      state.favorites.push(payload);
      return state;
    });
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
