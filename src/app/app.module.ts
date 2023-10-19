import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FriendsComponent} from "./components/friends/friends.component";
import {MenuComponent} from "./components/menu/menu.component";
import {RouterModule, Routes} from "@angular/router";
import {EnteringComponent} from "./components/entering/entering.component";
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './components/news/news.component';

const appRoutes: Routes = [
  {path: '', component: EnteringComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'friends', component: FriendsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    MenuComponent,
    EnteringComponent,
    ProfileComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
