import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Post, Follow } from "../_models";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private currentPostSubject: BehaviorSubject<Post>;
  public currentPost: Observable<Post>;
  public post: Post;
  baseUrl: string = "https://localhost:44380/api/";

  constructor(private http: HttpClient) {
    this.currentPostSubject = new BehaviorSubject<Post>(
      JSON.parse(localStorage.getItem("currentPost"))
    );
    this.currentPost = this.currentPostSubject.asObservable();
  }

  public get currentUserValue(): Post {
    return this.currentPostSubject.value;
  }

  getPostByUserName(followingUsers: string[]) {
    // let followingUsers = ["user2", "user3","user4"];
    let params = new HttpParams();
    params = params.append("followingUsers", followingUsers.join(","));
    // followingUsers.forEach(user => {
    //   params = params.append("followingUsers", user);
    // });
    return this.http.get<Post[]>(`https://localhost:44380/api/posts`, {
      params: params
    });
  }

  // getPosts(currentUser: string) {
  //   let params = new HttpParams();
  //   params = params.append("currentUser", currentUser);
  //   return this.http.get<Post[]>(`https://localhost:44380/api/posts`, {
  //     params: params
  //   });
  // }

  getPosts(userId: number) {
    return this.http.get<Post[]>(this.baseUrl + `users/${userId}/posts`);
  }

  addPost(post: Post) {
    return this.http.post(`https://localhost:44380/api/posts`, post).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (post) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentPost", JSON.stringify(post));
          this.currentPostSubject.next(post);
        }
        return post;
      })
    );
  }

  addWorkTime(userId: number, content: string) {
    return this.http.post<Post>(this.baseUrl + `users/${userId}/posts`, {
      content: content
    });
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  deleteAll() {
    return this.http.delete(`https://localhost:44380/api/posts`);
  }
}
