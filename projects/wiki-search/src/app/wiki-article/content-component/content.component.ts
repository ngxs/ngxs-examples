import { Component, OnInit } from '@angular/core';
import { IParsePage } from '@wikiSearch/models/search-result.model';
import { NgxsState } from '@wikiSearch/wiki-article/state/wiki-article.state';
import { Select, Actions, ofActionDispatched, ofActionCompleted, ofActionErrored } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadContent } from '@wikiSearch/wiki-article/state/wiki-article.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'one-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Select(NgxsState.content)
  content$: Observable<IParsePage>;

  inProgress = false;
  errorString: string;

  constructor(private actions$: Actions) {}

  ngOnInit(): void {
    this.actions$.pipe(ofActionDispatched(LoadContent)).subscribe(() => {
      this.inProgress = true;
      this.errorString = null;
    });

    this.actions$.pipe(ofActionCompleted(LoadContent)).subscribe(() => {
      this.inProgress = false;
    });

    this.actions$.pipe(ofActionErrored(LoadContent)).subscribe((error: HttpErrorResponse) => {
      this.errorString = `Ошибка загрузки контента: ${error.message}`;
    });
  }
}
