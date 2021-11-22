import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Post } from '../models/post';

const API_ENDPOINT = 'http://localhost:3000/api';
const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/';
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private cache$: Observable<Array<Post>>;

  constructor(private http: HttpClient) {}

  getPosts():Observable<Array<Post>> {
    if (!this.cache$) {
      this.cache$ = this.requestPosts().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  refetchPosts():Observable<Array<Post>> {
    return this.requestPosts();
  }

  addPost( postData : Post):Observable<Post> {
    return this.http.post<Post>(JSON_PLACEHOLDER_URL + 'posts', postData);
  }

  editPost( postData : Post, postId : number):Observable<Post> {
    return this.http.patch<Post>(JSON_PLACEHOLDER_URL + 'posts/'+ postId + '/', postData);
  }

  deletePost( postId : number):Observable<any> {
    return this.http.delete(JSON_PLACEHOLDER_URL + 'posts/'+ postId);
  }

  private requestPosts() {
    return this.http.get<Array<Post>>(`${API_ENDPOINT}/posts`);
  }
}