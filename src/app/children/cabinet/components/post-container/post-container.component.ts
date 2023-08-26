import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";

@Component({
  selector: "post-container",
  templateUrl: './post-container.component.html',
  styleUrls: ['./styles/post-container.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostContainerComponent{

  @Input()
  public post!: IPost;

}
