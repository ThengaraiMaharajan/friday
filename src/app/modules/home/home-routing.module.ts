import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedsComponent } from './components/feeds/feeds.component';

const routes: Routes = [
  {
    path : '',
    component : FeedsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
