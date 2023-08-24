import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AuthorizeService} from "../../../../modules/authorize/services/authorize.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUserCredential} from "../../../../modules/authorize/interfaces/user-credential.interface";
import {Router} from "@angular/router";


type RegisterForm = {
  username: FormControl<string|null>,
  password: FormControl<string|null>,
}
@Component({
  templateUrl: './register.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class RegisterPage {
  constructor(
    private _authService: AuthorizeService,
    private _router: Router,
  ) {
  }

  public registerForm: FormGroup<RegisterForm>  = new FormGroup<RegisterForm>({
    password: new FormControl<string | null>('', [Validators.required]),
    username: new FormControl<string | null>('', [Validators.required])
  })

  public onRegisterUser(): void{
    const user: IUserCredential = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
    }
    this._authService.registerUser(user)
    this._router.navigate(['account','login'])
  }
}
