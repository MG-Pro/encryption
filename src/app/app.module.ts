import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CesarComponent } from './components/cesar/cesar.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import { VizhenerComponent } from './components/vizhener/vizhener.component';
import { MethodViewComponent } from './components/method-view/method-view.component';
import { SteganographyComponent } from './components/steganography/steganography.component';
import { KjbSteganographyComponent } from './components/kjb-steganography/kjb-steganography.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    CesarComponent,
    FooterComponent,
    VizhenerComponent,
    MethodViewComponent,
    SteganographyComponent,
    KjbSteganographyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
