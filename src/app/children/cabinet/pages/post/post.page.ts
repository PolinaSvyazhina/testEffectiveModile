import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {tap} from "rxjs";

@Component({
  templateUrl: './post.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostPage implements OnInit{

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {
    this._activatedRoute.paramMap
      .pipe(
        tap((params: ParamMap) => {
          console.log(params.get('id'));
        })
      ).subscribe()
  }

  public ngOnInit(): void{
    this._activatedRoute.paramMap
      .pipe(
        tap((params: ParamMap) => {
          console.log(params.get('id') + 'DELTAONINIT');
        })
      ).subscribe()
  }

}
