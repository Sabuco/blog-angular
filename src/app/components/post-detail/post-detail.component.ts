import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public identity;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Peticion ajax para sacar los datos del post
      this._postService.getPostById(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.post = response.posts;
            console.log(this.post);
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

}
