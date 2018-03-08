import { Directive,ElementRef,Input,QueryList,ViewChildren,OnInit } from '@angular/core';

@Directive({
    selector: '[appSave]'
})
export class SaveDirective implements OnInit{
    @Input('appSave') appSave: string;
    @Input('interval') interval: number;
    @Input('userKey') userKey: string ;
    constructor(private el:ElementRef) {
    }
    ngOnInit() {
        if (this.interval > 0) {
            setInterval(() => {
                this.save();
            }, this.interval * 1000);
        }else{
            if(localStorage.getItem(this.userKey)!=null){
                let map=JSON.parse(localStorage.getItem(this.userKey))
                map[this.appSave]=btoa("")
                localStorage.setItem(this.userKey,JSON.stringify(map))
            }
        }
    }

    save(){
        console.log("saved")
        if(this.el.nativeElement.value!=""){
            let map={}
            if(localStorage.getItem(this.userKey)==null){
                map[this.appSave]=btoa(this.el.nativeElement.value);
                // console.log(map)
                localStorage.setItem(this.userKey,JSON.stringify(map))
            }else{
                map=JSON.parse(localStorage.getItem(this.userKey))
                map[this.appSave]=btoa(this.el.nativeElement.value);
                localStorage.setItem(this.userKey,JSON.stringify(map))
                // console.log(map)
            }
        }
        // localStorage.setItem(this.appSave,this.el.nativeElement.value)
    }


    restore( ){
        console.log(" restored")
        if(JSON.parse(localStorage.getItem(this.userKey))!=null) {
            let map = JSON.parse(localStorage.getItem(this.userKey))
            if(map[this.appSave]!=null){}
            {
                let val = atob(map[this.appSave]);
                this.el.nativeElement.value = val;
            }
        }
            // this.el.nativeElement.value=localStorage.getItem(this.appSave);
    }

}
