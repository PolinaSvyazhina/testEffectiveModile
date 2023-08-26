import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostPage} from "./pages/post/post.page";
import {PostsPage} from "./pages/posts/posts.page";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {LayoutPage} from "./pages/layout/layout.page";
import {PostManagerService} from "../../modules/posts/post-manager.service";
import {MatButtonModule} from "@angular/material/button";
import {PostContainerComponent} from "./components/post-container/post-container.component";
import {PostCardComponent} from "./components/post-card/post-card.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

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
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    PostPage,
    PostsPage,
    LayoutPage,
    PostCardComponent,
    PostContainerComponent,
  ],
  providers: [
    PostManagerService,
  ]
})

export class CabinetModule {

}
