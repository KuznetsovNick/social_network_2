import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {News} from "../../models/news";
import {SocketIoService} from "../../services/socket-io.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent {
  user: User
  news: News[]
  subs: Subscription[]
  evs:number[]
  constructor(private router: Router, private request: RequestsService,
              private socketService: SocketIoService) {
    let user = localStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user)
    }

    request.getNews(this.user.id).subscribe(news => {
      this.news = news
    })

    this.evs = []
    this.evs.push(this.user.id)
    for(let i of this.user.friends) {
      this.evs.push(i)
    }

    for(let i of this.evs) {
      this.socketService.listen_to_server(i.toString()).subscribe((data) => {
        for(let i =0 ; i < this.news.length; i++){
          if(this.news[i].id == data.id){
            this.news[i].posts.push(data.news)
          }
        }
      })
    }
  }

  close_news(){
    this.router.navigate(["menu"]).then(res => {})
  }

  add_news(){
    //@ts-ignore
    let news = document.getElementById("news").value
    this.socketService.emit_to_server(this.user.id.toString(), {id: this.user.id, news: news})
    //@ts-ignore
    document.getElementById("news").value = ""
  }
}
