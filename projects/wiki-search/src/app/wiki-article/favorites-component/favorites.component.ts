import { Component } from '@angular/core';
import { ISearchItem } from '@wikiSearch/models/search-result.model';
import { NgxsState } from '@wikiSearch/wiki-article/state/wiki-article.state';
import { DeleteFavorite, LoadContent, ClearContent, SelectId } from '@wikiSearch/wiki-article/state/wiki-article.actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

/**
 * This is favorites control component.
 * We can select article for read or remove it from a list.
 */
@Component({
  selector: 'one-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent {
  /**
   * bind NGXS Sate Selector "NgxsState.favorites" with property of component,
   * in current case we get a favorites list directly to "favorites$" as Observable
   */
  @Select(NgxsState.favorites)
  public favorites$: Observable<ISearchItem[]>;

  /** get id of selected article as Observable */
  @Select(NgxsState.selectId)
  public selectId$: Observable<number>;

  /** flag to see which article was uploaded */
  public loadId: number;

  constructor(private store: Store) {}

  /** start to loading article content */
  public loadContent(item: ISearchItem): void {
    this.store.dispatch([ClearContent, new LoadContent(item.pageid)]).subscribe(
      () => {
        /** the first callback means that Action was success done */
        this.loadId = item.pageid;
      },
      () => {
        /**
         * the second callback means that in stream of Action appeared exclude,
         * usually it may be API request error
         */
        this.store.dispatch(new SelectId(null));
      }
    );
  }

  /** remove article from Store */
  public deleteFavorite(item: ISearchItem): void {
    this.store.dispatch(new DeleteFavorite(item));
  }
}
