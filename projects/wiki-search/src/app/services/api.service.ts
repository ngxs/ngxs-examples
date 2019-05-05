import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchResult, IParsePage } from '@wikiSearch/models/search-result.model';

/**
 * Service for sending API requests
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(srsearch: string): Observable<ISearchResult> {
    return this.http.get<ISearchResult>('/wiki-api', {
      params: {
        action: 'query',
        list: 'search',
        srsearch,
        format: 'json'
      }
    });
  }

  loadPage(pageId: number): Observable<IParsePage> {
    return this.http.get<IParsePage>('/wiki-api', {
      params: {
        action: 'parse',
        pageid: String(pageId),
        format: 'json'
      }
    });
  }
}
