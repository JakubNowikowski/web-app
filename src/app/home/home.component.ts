import { Component, ChangeDetectionStrategy } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Post } from "../_models";
import {
  UserService,
  AuthenticationService,
  ContentService
} from "../_services";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./home.component.html"
  // changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent {
  public pageTitle = "Home";
  currentUser: User;
  currentPost: Post;
  users: User[] = [];
  posts: Post[] = [];
  post: Post;
  newPost: Post;
  isRequesting: string;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );

    this.contentService.currentPost.subscribe(x => (this.currentPost = x));
  }

  ngOnInit() {
    this.getAllUsers();

    this.contentService
      .getAll()
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  private getAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
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

    console.log(this.currentPost.content);

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

    this.contentService.currentPost.subscribe(x => (this.currentPost = x));

    // TO DO after linking to real data base
    this.newPost = {
      username: this.currentUser.username,
      content: this.inputContent
    };

    this.posts.unshift(this.newPost);
  }

  deleteAllPosts(): void {
    this.contentService
      .deleteAll()
      .pipe(first())
      .subscribe();

    // TO DO after linking to real data base
    this.posts.length = 0;
  }
}
