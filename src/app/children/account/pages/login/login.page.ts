import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {IUserCredential} from "../../../../modules/authorize/interfaces/user-credential.interface";
import {AuthorizeService} from "../../../../modules/authorize/services/authorize.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {memoize} from "@angular/cli/src/utilities/memoize";

type LoginForm = {
  username: FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./styles/login.page.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {

  @memoize
  public get isAuthorisationFailed(): Observable<boolean> {

    return this._isAuthorisationFailed.asObservable()
  }

  public hide: boolean = true;

  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(4)]),
    username: new FormControl<string | null>('', [Validators.required, Validators.minLength(5)])
  });

  private _isAuthorisationFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _authService: AuthorizeService,
    private _router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.loginForm.controls.password.addValidators([this.validatorAuthorization()])
    this.loginForm.controls.username.addValidators([this.validatorAuthorization()])
  }

  /**
   * Авторизоваться
   */
  public login(): void {
    const user: IUserCredential = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    }
    this._authService.loginUser(user)
      .pipe(
        tap((isSuccessfulAuth: boolean) => {
          if (isSuccessfulAuth) {
            this._router.navigate(['cabinet', 'posts']);

            return;
          }

          this._isAuthorisationFailed.next(!isSuccessfulAuth);
          this.loginForm.setValidators([this.validatorSnapshot(this.getCredentialSnapshot(this.loginForm))])

          this.loginForm.controls.username.updateValueAndValidity({emitEvent: true});
          this.loginForm.controls.password.updateValueAndValidity({emitEvent: true});

        }),
        take(1)
      ).subscribe();
  }

  /**
   * Перейти к регистрации
   */
  public navigateToRegister(): void {
    this._router.navigate(['account', 'register']);
  }

  /**
   * Валидатор успешного совпадения пары login/password
   * @return ValidatorFn - делегат валидации
   * @private
   */
  private validatorAuthorization(): ValidatorFn {
    return (ctr) => {
     return this._isAuthorisationFailed.value? {inv: true} : null;
    }
  }

  private validatorSnapshot(compareString: string): ValidatorFn {
    return (ctr) => {
      if(this.getCredentialSnapshot(ctr) === compareString){
        return  {inv: true};
      }
      this._isAuthorisationFailed.next(false);
      this.loginForm.controls.username.updateValueAndValidity({emitEvent: true, onlySelf: true});
      this.loginForm.controls.password.updateValueAndValidity({emitEvent: true, onlySelf: true});

      return null;
    }
  }

  private getCredentialSnapshot(form: AbstractControl): string {
    return form.value.password + form.value.username
  }

}
