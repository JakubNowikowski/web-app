import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "../_models";

@Injectable({ providedIn: "root" })
export class ContentService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Post[]>(`https://localhost:44380/api/posts`);
  }

  addPost(post: Post) {
    return this.http.post(`https://localhost:44380/api/posts`, post);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  deleteAll() {
    return this.http.delete(`https://localhost:44380/api/posts`);
  }
}
