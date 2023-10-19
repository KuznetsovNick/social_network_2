import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {News} from "../../models/news";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent {
  user: User
  news: News[]
  constructor(private router: Router, private request: RequestsService) {
    let user = localStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user)
    }

    request.getNews(this.user.id).subscribe(news => {
      this.news = news
    })
  }

  close_news(){
    this.router.navigate(["menu"]).then(res => {})
  }
}
