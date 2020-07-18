import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { UserService } from "src/app/services/user.service";
import { global } from "src/app/services/global";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit {
  public url;
  public posts: Array<Post>;
  public identity;
  public token;
  public user : User;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this._route.params.subscribe( params => {
      let userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success') {
          this.user = response.user;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPosts(userId) {
    this._userService.getUserPosts(userId).subscribe(
      response => {
        if(response.status == 'success') {
          this.posts = response.posts;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
