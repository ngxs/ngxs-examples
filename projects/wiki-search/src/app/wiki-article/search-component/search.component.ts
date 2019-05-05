import { Component } from '@angular/core';
import { ApiService } from '@wikiSearch/services/api.service';
import { first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ISearchItem } from '@wikiSearch/models/search-result.model';
import { Store } from '@ngxs/store';
import { AddFavorite } from '@wikiSearch/wiki-article/state/wiki-article.actions';

@Component({
  selector: 'one-search-article',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private api: ApiService, private store: Store) {}

  inputControl = new FormControl('');

  searchItems: ISearchItem[] = [];

  onSearch(): void {
    const tag: string = this.inputControl.value;

    this.api
      .search(tag)
      .pipe(first())
      .subscribe(result => {
        this.searchItems = result.query.search;
      });
  }

  addFavorite(item: ISearchItem): void {
    this.store.dispatch(new AddFavorite(item));
  }
}
