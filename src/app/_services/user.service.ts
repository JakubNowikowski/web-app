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

  getFollowingsPromise(userName: string): Promise<Follow[]> {
    let params = new HttpParams().set("userName", userName);
    return this.http
      .get<Follow[]>(`https://localhost:44380/api/follow/followings`, {
        params: params
      })
      .toPromise();
  }

  // getPeople(): Promise<Array> {
  //   return this.http
  //     .get("api/people.json", {
  //       headers: {
  //         "X-Some-Header": "1234"
  //       }
  //     })
  //     .map(res => {
  //       // some manipulation
  //       return res.json();
  //     })
  //     .toPromise();
  // }

  follow(followItem: Follow) {
    return this.http.post<Follow[]>(
      `https://localhost:44380/api/follow`,
      followItem
    );
  }

  unfollow(follower: string, following: string) {
    let params = new HttpParams()
      .set("follower", follower)
      .set("following", following);
    return this.http.delete<Follow[]>(`https://localhost:44380/api/follow`, {
      params: params
    });
  }
}
