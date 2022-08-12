import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotePage } from './quote.page';

const routes: Routes = [
  {
    path: '',
    component: QuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotePageRoutingModule {}
