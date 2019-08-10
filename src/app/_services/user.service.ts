import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    // return this.http.get<User[]>(`/users`);
    return this.http.get<User[]>(`https://localhost:44380/api/login`);
  }

  register(user: User) {
    // return this.http.post(`/users/register`, user);
    return this.http.post(`https://localhost:44380/api/login`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
