import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IPost} from "./interfaces/post.interface";

@Injectable()

export class PostManagerService {
  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public getAllPosts():Observable<IPost[]>{
    return this._httpClient.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
  }

  public getPost(id: number): Observable<IPost>{
    return this._httpClient.get<IPost[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {id}
    })
      .pipe(
        map((posts: IPost[]) => posts[0])
      )
  }
}
