import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {RequestsService} from "../../services/requests.service";
import {Router} from "@angular/router";
import {ShareService} from "../../services/share.service";
import {Subscription} from "rxjs";
import {ShareReqService} from "../../services/shareReq.service";

@Component({
  selector: "app-friends",
  templateUrl: "friends.component.html"
})

export class FriendsComponent{
  title: string = "Users"
  friends: User[]
  user: User
  sub: Subscription

  constructor(private request: RequestsService, private router: Router) {
    let user = localStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user)
    }
    request.getFriends(this.user.id).subscribe(friends => {
      this.friends = friends
    })
  }

  close_friends(){
    this.router.navigate(["menu"]).then(res => {})
  }
}
