import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort-by.pipe';
import { CircularPreLoaderComponent } from './circular-pre-loader/circular-pre-loader.component';
import { CircularModalComponent } from './circular-modal/circular-modal.component';
import { ItemFormComponentComponent } from './item-form-component/item-form-component.component';
import { ItemsComponentComponent } from './items-component/items-component.component';
import { ItemCategoriesModalComponent } from './item-categories-modal/item-categories-modal.component';

const appRoutes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'Item', component: ItemsComponentComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    PaginationComponent,
    FilterPipe,
    SortByPipe,
    CircularPreLoaderComponent,
    CircularModalComponent,
    ItemFormComponentComponent,
    ItemsComponentComponent,
    ItemCategoriesModalComponent
  ],
  imports: [
    BrowserModule, DataTablesModule ,HttpModule, FormsModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
