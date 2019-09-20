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

  getPosts(userId: number) {
    return this.http.get<Post[]>(this.baseUrl + `users/${userId}/posts`);
  }      
  
  addPost(userId: number, content: string) {
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