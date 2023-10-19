import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "./models/user";
import {ShareService} from "./services/share.service";
import {RequestsService} from "./services/requests.service";
import {Router} from "@angular/router";
import {ShareReqService} from "./services/shareReq.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent{
  title = 'Root';
  user: User
}
