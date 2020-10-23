import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { IfViewPortModule } from './if-viewport-size/if-viewport.module';
import { CONFIG_TOKEN } from './if-viewport-size/viewport-size.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, IfViewPortModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: CONFIG_TOKEN, useValue: { medium: 600, large: 900} }
  ]
})
export class AppModule { }
