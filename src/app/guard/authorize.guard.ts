import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {AuthorizeService} from "../modules/authorize/services/authorize.service";

@Injectable()
export class AuthorizeGuard implements CanActivate{
  constructor(
    private _router: Router,
    private _authorizeService: AuthorizeService,
  ) {
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authorizeService.isUserAuth()
      .pipe(
        map((isActivated: boolean) => {
          if (isActivated){
            return true;
          }
          return this._router.parseUrl('/cabinet/')
        }),
        catchError(() => {
          return of(this._router.parseUrl('/account/login'))
        })
      )
  }
}
