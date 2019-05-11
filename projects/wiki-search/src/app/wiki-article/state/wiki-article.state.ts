import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { AddFavorite, DeleteFavorite, LoadContent, ClearContent, SelectId } from './wiki-article.actions';
import { SearchItem, ParsePage } from '@wiki-search/models/search-result.model';
import { ApiService } from '@wiki-search/services/api.service';
import { tap, switchMapTo } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface WikiArticlesState {
  /** favorite list */
  favorites: SearchItem[];
  /** raw content */
  content: ParsePage;
  /** select article id */
  selectetId: number;
}

@State<WikiArticlesState>({
  name: 'wikiArticles',
  defaults: { favorites: [], content: null, selectetId: null }
})
export class WikiArticlesStore {
  /**
   * we can inject dependencies as in services or components,
   * but we can't use they for static methods
   */
  constructor(private api: ApiService) {}

  /**
   * we can give a part of state through clean function,
   * in current case we give away article title or status message
   */
  @Selector()
  static articleTitle(state: WikiArticlesState): string {
    if (state.selectetId && !state.content) {
      return 'Loading...';
    }

    return state.content ? state.content.parse.title : 'Empty';
  }

  /** give away raw article content */
  @Selector()
  static content(state: WikiArticlesState): string | null {
    return state.content && state.content.parse.text['*'];
  }

  /**
   * It is dangerous pacticle to give away part of the State as not primitive variable,
   * any component can unnoticed mutate it that is very bad for project.
   * For create immutable variable we can use popular library Immer.
   * For the more laconic code we can use decorator ImmutableSelector from the @ngxs-labs/immer-adapter library
   */
  @Selector()
  @ImmutableSelector()
  static favorites(state: WikiArticlesState): SearchItem[] {
    return state.favorites;
  }

  /** give away article content id */
  @Selector()
  static selectId(state: WikiArticlesState): number | null {
    return state.selectetId;
  }

  /**
   * add new favorite to favorite list,
   * array.push operator mutate State, so we use ImmutableContext decorator for get immutable variable of State
   */
  @Action(AddFavorite)
  @ImmutableContext()
  addFavorite({ setState }: StateContext<WikiArticlesState>, { favoriteItem }: AddFavorite) {
    setState(state => {
      const isUniqueFavorite = !state.favorites.some(favorite => favorite.pageid === favoriteItem.pageid);

      if (isUniqueFavorite) {
        state.favorites.push(favoriteItem);
      }

      return state;
    });
  }

  /** delete favorite from favorite list, and clear content if it link with favorite */
  @Action(DeleteFavorite)
  deleteFavorite({ patchState, getState, dispatch }: StateContext<WikiArticlesState>, { favoriteItem }: DeleteFavorite) {
    const favorites = getState().favorites.filter(favorite => favorite.pageid !== favoriteItem.pageid);

    if (getState().selectetId === favoriteItem.pageid) {
      dispatch([ClearContent, new SelectId(null)]);
    }

    patchState({ favorites });
  }

  /**
   * Typical case to use API request through NGXS Action.
   * It is very important return Observable to method.
   * NGXS subscribe to Observable himself and doing Action async.
   * This very help developer receiving statuses API requests, without adding extra entities in State
   */
  @Action(LoadContent)
  loadContent({ patchState, dispatch }: StateContext<WikiArticlesState>, { pageId }: LoadContent) {
    dispatch(new SelectId(pageId));

    return this.api.loadPage(pageId).pipe(
      // switchMapTo(throwError('Oops! I broked the Wiki!')),
      tap(content => {
        patchState({ content });
      })
    );
  }

  /** clear loaded article content */
  @Action(ClearContent)
  clearContent({ patchState }: StateContext<WikiArticlesState>) {
    patchState({ content: null });
  }

  /** select article id */
  @Action(SelectId)
  selectId({ patchState }: StateContext<WikiArticlesState>, { id }: SelectId) {
    patchState({ selectetId: id });
  }
}
