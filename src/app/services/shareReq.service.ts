import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ShareReqService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange() {
    this.emitChangeSource.next("do");
  }
}
