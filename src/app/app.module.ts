import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthorizeGuard} from "./guard/authorize.guard";
import {HttpClientModule} from "@angular/common/http";
import {AuthorizeService} from "./modules/authorize/services/authorize.service";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthorizeGuard,
    AuthorizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
