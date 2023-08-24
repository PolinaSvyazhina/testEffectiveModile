import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AuthorizeService} from "../../../../modules/authorize/services/authorize.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './layout.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPage {

  constructor(
    private _authService: AuthorizeService,
    private _router: Router,
  ) {
  }

  public logout(): void{
    this._authService.logoutUser();
    this._router.navigate(['account', 'login'])
  }
}
