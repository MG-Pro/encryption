import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {CesarComponent} from './components/cesar/cesar.component'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cesar', component: CesarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
