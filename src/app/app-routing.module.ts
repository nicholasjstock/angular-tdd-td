import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorsComponent} from './authors/authors.component'
import {AuthorComponent} from './authors/author.component'
import {AuthorsService} from './authors/authors.service'

import { NgxJsonapiModule } from 'ngx-jsonapi';


const routes: Routes = [
  {path: '', component: AuthorsComponent},
  {
    path: 'authors/:id',
    component: AuthorComponent
  }
];

@NgModule({
  providers: [AuthorsService],
  imports: [RouterModule.forRoot(routes),
    NgxJsonapiModule.forRoot({
    url: '//jsonapiplayground.reyesoft.com/v2/'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
