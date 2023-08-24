import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostPage} from "./pages/post/post.page";
import {PostsPage} from "./pages/posts/posts.page";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {LayoutPage} from "./pages/layout/layout.page";
import {PostService} from "../../modules/posts/post.service";
import {MatButtonModule} from "@angular/material/button";
import {LayoutPostComponents} from "./components/post-list/post-list.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'posts',
        component: PostsPage
      },
      {
        path: 'post/:id',
        component: PostPage
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AsyncPipe,
    MatTableModule,
    CommonModule,
    MatButtonModule,
  ],
  declarations: [
    PostPage,
    PostsPage,
    LayoutPage,
    LayoutPostComponents
  ],
  providers: [
    PostService
  ]
})

export class CabinetModule {

}
