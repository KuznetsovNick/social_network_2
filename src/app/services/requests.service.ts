import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class RequestsService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:8443/update")
  }
  getUser(id: number): Observable<User> {
    return this.http.post<User>("https://localhost:8443/get_user", {id: id})
  }

  getFriends(id: number): Observable<User[]> {
    return this.http.post<User[]>("https://localhost:8443/get_friends", {id: id})
  }
}
