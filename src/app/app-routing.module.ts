import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {CesarComponent} from './components/cesar/cesar.component'
import {VizhenerComponent} from './components/vizhener/vizhener.component'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cesar', component: CesarComponent},
  {path: 'vizhener', component: VizhenerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
