import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {IUserCredential} from "../../../../modules/authorize/interfaces/user-credential.interface";
import {AuthorizeService} from "../../../../modules/authorize/services/authorize.service";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable, Subject, take, tap} from "rxjs";
import {memoize} from "@angular/cli/src/utilities/memoize";

type LoginForm = {
  username: FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  templateUrl: './login.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit{
  constructor(
    private _authService: AuthorizeService,
    private _router: Router,
  ) {

  }

  public ngOnInit() {
    this.loginForm.controls.password.addValidators([this.validatorAuthorization()])
    this.loginForm.controls.username.addValidators([this.validatorAuthorization()])
  }

  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    password: new FormControl<string | null>('', [Validators.required]),
    username: new FormControl<string | null>('', [Validators.required])
  })

  private _isAuthorisationFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public onLoginUser(): void {
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

          this.loginForm.controls.username.updateValueAndValidity({emitEvent: true});
          this.loginForm.controls.password.updateValueAndValidity({emitEvent: true});

        }),
        take(1)
      ).subscribe();
  }

  public onRegister() {
    this._router.navigate(['account', 'register']);
  }

  @memoize
  public get isAuthorisationFailed(): Observable<boolean> {

    return this._isAuthorisationFailed.asObservable()
  }

  private validatorAuthorization(): ValidatorFn {
    return (ctr) => {
     return this._isAuthorisationFailed.value? {inv: true} : null;
    }
  }
}
