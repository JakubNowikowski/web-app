import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Post } from "../_models";
import {
  UserService,
  AuthenticationService,
  ContentService
} from "../_services";

@Component({
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  public pageTitle = "Home";
  currentUser: User;
  users: User[] = [];
  posts: Post[] = [];
  post: Post;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });

    this.contentService
      .getAll()
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  _inputContent: string;
  get inputContent(): string {
    return this._inputContent;
  }
  set inputContent(value: string) {
    this._inputContent = value;
  }

  addPost(): void {
    this.post = {
      username: this.currentUser.username,
      content: this.inputContent
    };
    this.contentService
      .addPost(this.post)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success("Registration successful", true);
          // this.router.navigate(["/login"]);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        }
      );

    this.contentService
      .getAll()
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  deleteAllPosts(): void {
    console.log("delete all");

    this.contentService
      .deleteAll()
      .pipe(first())
      .subscribe();

    this.contentService
      .getAll()
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}
