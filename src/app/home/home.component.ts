import { Component, ChangeDetectionStrategy } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Post, Follow } from "../_models";
import { UserService, AuthenticationService, PostsService } from "../_services";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./home.component.html"
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
  follows: Follow[] = [];
  followings: string[] = [];
  isEmpty = false;


  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );

    this.postsService.currentPost.subscribe(x => (this.currentPost = x));
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.postsService
      .getFollowedPosts(this.currentUser.id)
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  // _inputContent: string;
  // get inputContent(): string {
  //   return this._inputContent;
  // }

  // set inputContent(value: string) {
  //   this._inputContent = value;
  // }

  _inputContent: string;
  get inputContent(): string {
    return this._inputContent;
  }
  set inputContent(value: string) {
    this._inputContent = value;
    this.isEmpty = this.inputContent
      ? false
      : true;
  }

  addPost(): void {
    if (!this.inputContent) {
      this.isEmpty = true;
    }
    else {
      this.postsService
        .addPost(this.currentUser.id, this.inputContent)
        .pipe(first())
        .subscribe(post => {
          this.post = post;
        });
        
        
        // TO DO after linking to real data base
        this.newPost = {
          username: this.currentUser.username,
          content: this.inputContent
        };
        
        this.posts.unshift(this.newPost);
        
        this.inputContent = null;
        this.isEmpty = false;
      }
  }

  deleteAllPosts(): void {
    console.log(this.follows);
    console.log(this.posts);

    // this.postsService
    //   .deleteAll()
    //   .pipe(first())
    //   .subscribe();

    // // TO DO after linking to real data base
    // this.posts.length = 0;
  }
}
