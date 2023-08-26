import {ChangeDetectionStrategy, Component} from "@angular/core";
import {map, Observable, take} from "rxjs";
import {memoize} from "@angular/cli/src/utilities/memoize";
import {PostManagerService} from "../../../../modules/posts/post-manager.service";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";

@Component({
  templateUrl: './posts.page.html',
  styleUrls: ['./styles/posts.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostsPage {
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
  constructor(
    private _postsService: PostManagerService
  ) {
  }
}
