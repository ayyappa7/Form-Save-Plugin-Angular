import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SaveDirective} from './src';

@NgModule({
    imports: [BrowserModule],
    declarations: [SaveDirective],
    exports: [SaveDirective]
})
export class SaveDirective {
}

