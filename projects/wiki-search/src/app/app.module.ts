import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsState } from './wiki-article/state/wiki-article.state';
import { AppComponent } from './app.component';
import { SearchComponent } from './wiki-article/search-component/search.component';
import { FavoritesComponent } from './wiki-article/favorites-component/favorites.component';
import { ContentComponent } from './wiki-article/content-component/content.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, FavoritesComponent, ContentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([NgxsState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
