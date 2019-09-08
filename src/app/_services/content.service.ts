import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Post, Follow } from "../_models";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ContentService {
  private currentPostSubject: BehaviorSubject<Post>;
  public currentPost: Observable<Post>;
  public post: Post;

  constructor(private http: HttpClient) {
    this.currentPostSubject = new BehaviorSubject<Post>(
      JSON.parse(localStorage.getItem("currentPost"))
    );
    this.currentPost = this.currentPostSubject.asObservable();
  }

  public get currentUserValue(): Post {
    return this.currentPostSubject.value;
  }

  getAll(userName: string) {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("userName", userName);
    let params = new HttpParams().set("userName", userName);
    return this.http.get<Post[]>(`https://localhost:44380/api/posts`, {
      params: params
    });
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

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  deleteAll() {
    return this.http.delete(`https://localhost:44380/api/posts`);
  }
}
