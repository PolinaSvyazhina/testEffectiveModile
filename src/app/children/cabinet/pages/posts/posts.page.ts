import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {memoize} from "@angular/cli/src/utilities/memoize";
import {PostService} from "../../../../modules/posts/post.service";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";

@Component({
  templateUrl: './posts.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostsPage {
  constructor(
    private _postsService: PostService
  ) {
  }
  @memoize
  public get posts(): Observable<IPost[]>{
   return this._postsService.getAllPosts()
      .pipe(
        map((posts: IPost[]) => {
          return posts
        }),
        take(1)
      )
  }

}
