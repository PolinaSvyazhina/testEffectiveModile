import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./styles/post-list.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutPostComponents {

  constructor(
    private _router: Router,
  ) {
  }

  @Input()
  public postModel!: IPost;

}
