import {Injectable} from "@angular/core";
import {IUserCredential} from "../interfaces/user-credential.interface";
import {BehaviorSubject, map, Observable, of, switchMap, take, tap} from "rxjs";

@Injectable()

export class AuthorizeService {

  private _isSuccessAuth$: BehaviorSubject<IUserCredential | null> = new BehaviorSubject<IUserCredential | null>(null);
  private _userArray$: BehaviorSubject<IUserCredential[]> = new BehaviorSubject<IUserCredential[]>(this.getCredentialLocalStorage());

  /**
   * Зарегистрировтаь пользователя в localStorage
   * @param userCredential
   */
  public registerUser(userCredential: IUserCredential): void {
    this._userArray$.next([...this._userArray$.value, userCredential]);

    localStorage.setItem('userCredential', JSON.stringify(this._userArray$.value))
  }

  /**
   * Авторизовать пользователя через localStorage
   * @param userCredential
   */
  public loginUser(userCredential: IUserCredential): Observable<boolean> {
    return of(null)
      .pipe(
        tap(() => {
          const isCredentialRight: boolean = !!this._userArray$.value
            .find((user: IUserCredential) => {

              return user.username === userCredential.username && user.password === userCredential.password
            })
          if (isCredentialRight) {
            localStorage.setItem('userAuth', JSON.stringify(userCredential))
            this._isSuccessAuth$.next(userCredential)

            return
          }
          this._isSuccessAuth$.next(null)
        }),
        take(1),
        switchMap(() => {

          return this._isSuccessAuth$
            .pipe(
              map((user: IUserCredential | null) => !!user)
            )
        })
      )
  }


  /**
   * Удалить пользователя из LocalStorage
   */
  public removeUser(): void {
    localStorage.removeItem('userAuth')
  }


  public isUserAuth(): Observable<boolean> {
    return  this._isSuccessAuth$
      .pipe(
        map((user: IUserCredential | null) => {

          return !!user || this.isUserAuthorized();
        })
      )
  }

  private getCredentialLocalStorage(): IUserCredential[] {
    return JSON.parse(localStorage.getItem('userCredential') ?? '[]');
  }

  private isUserAuthorized(): boolean {
    const stringifiedUser: string | null = localStorage.getItem('userAuth');
    if(stringifiedUser){
      const user: IUserCredential = JSON.parse(stringifiedUser);
      this._isSuccessAuth$.next(user);

      return true;
    }

    return false;
  }
}
