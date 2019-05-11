import { Component } from '@angular/core';
import { ApiService } from '@wiki-search/services/api.service';
import { first, finalize, switchMapTo } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { SearchItem } from '@wiki-search/models/search-result.model';
import { Store } from '@ngxs/store';
import { AddFavorite } from '@wiki-search/wiki-article/state/wiki-article.actions';

/**
 * This is search component.
 * We can forming favorite list from search results.
 */
@Component({
  selector: 'one-search-article',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /** flag of search progress  */
  public inProgress: boolean;

  /** element of Reactive Form */
  public inputControl = new FormControl(null, Validators.required);

  /** search results array */
  public searchItems: SearchItem[] = [];

  /** error text when http request return not 200 status */
  public errorMsg: string;

  constructor(private api: ApiService, private store: Store) {}

  /** submit search request */
  public onSearch(): void {
    if (!this.inputControl.valid || this.inProgress) {
      return;
    }

    this.inProgress = true;
    this.searchItems = [];
    const tag: string = this.inputControl.value;
    this.errorMsg = '';

    this.api
      .search(tag)
      .pipe(
        // switchMapTo(throwError('Oops! I broked the Wiki!')),
        finalize(() => (this.inProgress = false)),
        first()
      )
      .subscribe(
        results => {
          this.searchItems = results.query.search;
        },
        () => {
          this.errorMsg = 'Something wrong with Wiki API 😬 Please check your code';
        }
      );
  }

  /** send choosed search result to store */
  public addFavorite(item: SearchItem): void {
    this.store.dispatch(new AddFavorite(item));
  }
}
