import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {ShareService} from "../../services/share.service";
import {Subscription} from "rxjs";
import {ShareReqService} from "../../services/shareReq.service";

@Component({
  selector: "app-menu",
  templateUrl: "menu.component.html"
})

export class MenuComponent{
  user: User
  constructor(private request: RequestsService, private router: Router) {
    let user = localStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user)
    }
  }

  open_friends(){
    this.router.navigate(["friends"]).then(res => {})
  }
}
