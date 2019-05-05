import { Component } from '@angular/core';
import { ISearchItem } from '@wikiSearch/models/search-result.model';
import { NgxsState } from '@wikiSearch/wiki-article/state/wiki-article.state';
import { DeleteFavorite, LoadContent, ClearContent, SelectId } from '@wikiSearch/wiki-article/state/wiki-article.actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'one-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent {
  @Select(NgxsState.favorites)
  favorites$: Observable<ISearchItem[]>;

  @Select(NgxsState.selectId)
  selectId$: Observable<number>;

  loadId: number;

  constructor(private store: Store) {}

  loadContent(item: ISearchItem): void {
    this.store.dispatch([ClearContent, new LoadContent(item.pageid)]).subscribe(
      () => {
        this.loadId = item.pageid;
      },
      () => {
        this.store.dispatch(new SelectId(null));
      }
    );
  }

  deleteFavorite(item: ISearchItem): void {
    this.store.dispatch(new DeleteFavorite(item));
  }
}
