import {NgModule} from "@angular/core";
import {LoginPage} from "./pages/login/login.page";
import {RouterModule, Routes} from "@angular/router";
import {LayoutPage} from "./pages/layout/layout.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, CommonModule} from "@angular/common";
import {RegisterPage} from "./pages/register/register.page";

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        component: RegisterPage
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: "full"
      }
    ]

  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    AsyncPipe,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LayoutPage,
    LoginPage,
    RegisterPage,
  ],
  providers: [

  ],
})

export class AccountModule {

}
