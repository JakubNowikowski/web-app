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

    console.log(this.currentPost.content);

    this.newPost = {
      username: this.currentPost.username,
      content: this.currentPost.content
    };

    this.posts.push(this.newPost);
    // console.log(this.isRequesting);

    // this.isRequesting = "true";
    // this.contentService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe(posts => {
    //     this.posts = posts;
    //   });
    // this.ref.detectChanges();
  }

  deleteAllPosts(): void {
    // console.log("delete all");

    console.log(this.currentPost.content);

    this.contentService
      .deleteAll()
      .pipe(first())
      .subscribe();
  }
}
