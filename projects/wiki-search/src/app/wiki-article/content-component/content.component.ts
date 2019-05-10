import { Component, OnInit, OnDestroy } from '@angular/core';
import { IParsePage } from '@wikiSearch/models/search-result.model';
import { NgxsState } from '@wikiSearch/wiki-article/state/wiki-article.state';
import { Select, Actions, ofActionDispatched, ofActionCompleted, ofActionErrored } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { LoadContent } from '@wikiSearch/wiki-article/state/wiki-article.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

/**
 * This is component for show content of selected article.
 * With help NGXS Action Handler the component in course all of upload etapes.
 */
@Component({
  selector: 'one-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  /**
   * bind NGXS Sate Selector "NgxsState.articleTitle" with property of component,
   * in current case we get article title directly to "articleTitle$" as Observable
   */
  @Select(NgxsState.articleTitle)
  public articleTitle$: Observable<string>;

  /** get content of selected article as Observable */
  @Select(NgxsState.content)
  public content$: Observable<IParsePage>;

  /** flag of load content progress */
  public inProgress = false;

  /** error text when http request return not 200 status */
  public errorString: string;

  private unsubscriber$ = new Subject<void>();

  constructor(private actions$: Actions) {}

  ngOnInit(): void {
    this.subscribeToActionDispatched();
    this.subscribeToActionCompleted();
    this.subscribeToActionErrored();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  /** mark the start of download content */
  private subscribeToActionDispatched(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscriber$),
        ofActionDispatched(LoadContent)
      )
      .subscribe(() => {
        this.inProgress = true;
        this.errorString = null;
      });
  }

  /** mark successful content download */
  private subscribeToActionCompleted(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscriber$),
        ofActionCompleted(LoadContent)
      )
      .subscribe(() => {
        this.inProgress = false;
      });
  }

  /** mark unsuccessful content download */
  private subscribeToActionErrored(): void {
    this.actions$
      .pipe(
        takeUntil(this.unsubscriber$),
        ofActionErrored(LoadContent)
      )
      .subscribe((error: HttpErrorResponse) => {
        /**
         * Why Action has an http error body?
         * Because it received this from HttpClient stream
         */
        this.errorString = `Something wrong with Wiki API: ${error.message}`;
      });
  }
}
