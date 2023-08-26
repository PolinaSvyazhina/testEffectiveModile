import {ChangeDetectionStrategy, Component, Input, ViewChild} from "@angular/core";
import {IPost} from "../../../../modules/posts/interfaces/post.interface";
import {MatMenuTrigger} from "@angular/material/menu";
import {BehaviorSubject, debounceTime, finalize, takeUntil, tap} from "rxjs";
import {DestroyService} from "../../../../utils/destroy.service";

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./styles/post-card.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
  ]
})

export class PostCardComponent {

  @Input()
  public postModel!: IPost;

  @ViewChild(MatMenuTrigger)
  private _dropdownTrigger!:  MatMenuTrigger;

  private _menuEvent$: BehaviorSubject<'mouseenter' | 'mouseleave'> = new BehaviorSubject<'mouseenter' | 'mouseleave'>('mouseleave');
  constructor(
    private _destroy$: DestroyService
  ) {
    this.initializeDropdownProcessing();
  }

  /**
   * Обработка переключения стейта дропдауна автора
   * @param event
   */
  public showMenu(event: MouseEvent): void{
    if (event.type === 'mouseleave' && this._menuEvent$.value === 'mouseenter'){
      this._menuEvent$.next(event.type);
    }
    if (event.type === 'mouseenter' && this._menuEvent$.value === 'mouseleave'){
      this._menuEvent$.next(event.type);
    }
  }

  /**
   * Начать прослушку ивентов от хавера
   * Контроллирует состояние дропдауна close/open
   * @private
   */
  private initializeDropdownProcessing(): void{
    this._menuEvent$
      .pipe(
        /**
         * Делаем дебаунс, чтобы исключить лишние ивенты
         */
        debounceTime(300),
        tap((state: 'mouseenter' | 'mouseleave') => {
          if(state === 'mouseenter') {
            this._dropdownTrigger?.openMenu();
          }
          else {
            this._dropdownTrigger?.closeMenu();
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
  }
}
