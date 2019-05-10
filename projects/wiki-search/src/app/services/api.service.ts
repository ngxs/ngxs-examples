import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchResult, ParsePage } from '@wiki-search/models/search-result.model';

/**
 * Service for sending API requests
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(srsearch: string): Observable<SearchResult> {
    return this.http.get<SearchResult>('/wiki-api', {
      params: {
        action: 'query',
        list: 'search',
        srsearch,
        format: 'json'
      }
    });
  }

  loadPage(pageId: number): Observable<ParsePage> {
    return this.http.get<ParsePage>('/wiki-api', {
      params: {
        action: 'parse',
        pageid: String(pageId),
        format: 'json'
      }
    });
  }
}
