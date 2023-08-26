import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BehaviorSubject, take, tap} from "rxjs";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";
import {PostManagerService} from "../../../../modules/posts/post-manager.service";

@Component({
  templateUrl: './post.page.html',
  styleUrls: ['./styles/post.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostPage implements OnInit{

  private set postId(id: number){
    this._postId = id;
  }
  private get postId(): number {
    return this._postId;
  }

  public postModel$: BehaviorSubject<IPost| null> = new BehaviorSubject<IPost | null>(null);

  private _postId!: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postService: PostManagerService,
    private _router: Router,
  ) {
    this._activatedRoute.paramMap
      .pipe(
        tap((params: ParamMap) => {
          this.postId = Number(params.get('id'));
        }),
        take(1)
      ).subscribe();
  }
  public ngOnInit(): void {
    this._postService.getPost(this.postId)
      .pipe(
        tap((post: IPost): void => {
          this.postModel$.next(post)

        }),
        take(1)
      ).subscribe()
  }

  /**
   * Перейти к списку постов
   */
  public navigateToBackOnPostsPage(): void {
    this._router.navigate(['cabinet', 'posts'])
  }
}
