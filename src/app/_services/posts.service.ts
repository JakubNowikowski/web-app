import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "../_models";
import { BehaviorSubject, Observable } from "rxjs";

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

  getFollowedPosts(userId: number) {
    return this.http.get<Post[]>(
      this.baseUrl + `users/${userId}/followedPosts`
    );
  }

  getPosts(userId: number) {
    return this.http.get<Post[]>(this.baseUrl + `users/${userId}/posts`);
  }

  addPost(userId: number, content: string): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + `users/${userId}/posts`, {
      content: content
    });
  }

  delete(userId: number, postId: number):Observable<object> {
    return this.http.delete(this.baseUrl + `users/${userId}/posts/${postId}`);
  }
}
