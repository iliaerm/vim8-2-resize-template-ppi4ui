import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IfViewportSizeDirective } from './if-viewport-size.directive';
import { ViewportSizeService } from './viewport-size.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [IfViewportSizeDirective],
  exports: [IfViewportSizeDirective],
  providers: [ViewportSizeService]
})
export class IfViewPortModule { }