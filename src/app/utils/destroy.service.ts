import {Injectable, OnDestroy} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy{

  constructor() {
    super();
  }

  public ngOnDestroy() {
    this.next();
    this.complete();
  }
}
