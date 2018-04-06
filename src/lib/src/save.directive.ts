import {
    Directive,
    ElementRef,
    Input,
    QueryList,
    ViewChildren,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output
} from '@angular/core';

@Directive({
    selector: '[saveField]'
})
export class SaveDirective implements OnInit, OnDestroy {
    @Input('saveField') saveField: string;
    @Input('interval') interval: number;
    @Input('userKey') userKey: string;
    @Output() onSave = new EventEmitter<string>();
    intervalId: number;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        if (this.interval > 0) {
            this.intervalId = setInterval(() => {
                this.save();
            }, this.interval * 1000);
        } else {
            if (localStorage.getItem(this.userKey) != null) {
                let map = JSON.parse(localStorage.getItem(this.userKey))
                map[this.saveField] = btoa("")
                localStorage.setItem(this.userKey, JSON.stringify(map))
            }
        }
    }


    save() {
        let currValue = this.el.nativeElement.value;
        if (currValue != "") {
            let map = {};
            if (localStorage.getItem(this.userKey) == null) {
                map[this.saveField] = btoa(currValue);
                localStorage.setItem(this.userKey, JSON.stringify(map))
            } else {
                map = JSON.parse(localStorage.getItem(this.userKey));
                let mapValue = atob(map[this.saveField]);
                if (currValue != mapValue) {
                    map[this.saveField] = btoa(currValue);
                    localStorage.setItem(this.userKey, JSON.stringify(map))
                    this.onSave.emit("Saved ")
                }
            }
        }
    }


    restore() {

        if (JSON.parse(localStorage.getItem(this.userKey)) != null) {
            let map = JSON.parse(localStorage.getItem(this.userKey))
            if (map[this.saveField] != null) {
                let val = atob(map[this.saveField]);
                this.el.nativeElement.value = val;
                this.onSave.emit("Restored ");
            }
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
