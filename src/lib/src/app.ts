import { NgModule,Component,Input,ViewChild, ViewChildren, QueryList, ElementRef,OnInit } from '@angular/core';
import { SaveDirective } from './save.directive';
import { BrowserModule } from '@angular/platform-browser';



@Component({
    selector: 'my-app',
    template: `
        <h1>Form Save Directive</h1>

	<div>
  		<input interval=10 appSave="1" userKey="k1"><br><br><br>
 		<input interval=10 appSave="2" userKey="k1"> <br><br><br>
 		<input interval=10 appSave="3" userKey="k1"><br><br><br> 
 		<input interval=10 appSave="4" userKey="k1"> 
 		<!-- <button (click)="saveAll()">save</button> -->
 		<button (click)="restore()">Restore</button>
	</div>
    `,
})
export class App {

    @ViewChildren(SaveDirective) saveDirs: QueryList<SaveDirective>;
    // saveAll(){
    //   this.saveDirs.forEach(p=> p.save())
    // }
    restore(){
        this.saveDirs.forEach( p => p.restore())
    }

}
@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        App,
        SaveDirective
    ],
    bootstrap: [ App ]
})
export class AppModule {
}
