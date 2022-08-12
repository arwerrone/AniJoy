import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotePageRoutingModule } from './quote-routing.module';

import { QuotePage } from './quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotePageRoutingModule
  ],
  declarations: [QuotePage]
})
export class QuotePageModule {}
