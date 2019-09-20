import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { User, Follow } from "../_models";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  baseUrl: string = "https://localhost:44380/api/";
  constructor(private http: HttpClient) {}

  //#region Users

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  addUser(user: User): Observable<Object> {
    return this.http.post(this.baseUrl + "users", user);
  }

  delete(id: number) {
    return this.http.delete(`users/${id}`);
  }

  //#endregion

  //#region Follows

  getFollowers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `users/${userId}/followers`);
  }

  getFollowing(userId: number): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + `users/${userId}/following`);
  }

  follow(userId:number,userToFollowId:number):Observable<object> {
    return this.http.post(this.baseUrl+`users/${userId}/following/${userToFollowId}`,null);
  }

  unfollow(follower: string, following: string) {
    let params = new HttpParams()
      .set("follower", follower)
      .set("following", following);
    return this.http.delete<Follow[]>(`https://localhost:44380/api/follow`, {
      params: params
    });
  }

  //#endregion
}
