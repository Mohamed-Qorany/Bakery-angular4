import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort-by.pipe';
import { CircularPreLoaderComponent } from './circular-pre-loader/circular-pre-loader.component';
import { CircularModalComponent } from './circular-modal/circular-modal.component';

const appRoutes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'Favorites', component: FavoritesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    FavoritesComponent,
    PaginationComponent,
    FilterPipe,
    SortByPipe,
    CircularPreLoaderComponent,
    CircularModalComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
