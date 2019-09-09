import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { User, Follow } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    // return this.http.get<User[]>(`/users`);
    return this.http.get<User[]>(`https://localhost:44380/api/users`);
  }

  register(user: User) {
    // return this.http.post(`/users/register`, user);
    return this.http.post(`https://localhost:44380/api/users`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  getFollowers(userName: string) {
    let params = new HttpParams().set("userName", userName);
    return this.http.get<Follow[]>(
      `https://localhost:44380/api/follow/followers`,
      {
        params: params
      }
    );
  }

  getFollowings(userName: string) {
    let params = new HttpParams().set("userName", userName);
    return this.http.get<Follow[]>(
      `https://localhost:44380/api/follow/followings`,
      {
        params: params
      }
    );
  }

  follow(follow: Follow) {
    return this.http.post<Follow[]>(
      `https://localhost:44380/api/follow`,
      follow
    );
  }
}
