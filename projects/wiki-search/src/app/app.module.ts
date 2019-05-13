import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { WikiArticlesStore } from '@wiki-search/wiki-article/state/wiki-article.state';
import { AppComponent } from '@wiki-search/app.component';
import { SearchComponent } from '@wiki-search/wiki-article/search-component/search.component';
import { FavoritesComponent } from '@wiki-search/wiki-article/favorites-component/favorites.component';
import { ContentComponent } from '@wiki-search/wiki-article/content-component/content.component';
import { environment } from 'projects/wiki-search/src/environments/environment';

@NgModule({
  declarations: [AppComponent, SearchComponent, FavoritesComponent, ContentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([WikiArticlesStore], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
