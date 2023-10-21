import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {Subscription} from "rxjs";

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

  open_profile(){
    this.router.navigate(["profile"]).then(res => {})
  }

  open_news(){
    this.router.navigate(["news"]).then(res => {})
  }

  open_messenger(){
    this.router.navigate(["messenger"]).then(res => {})
  }

  protected readonly document = document;
}
