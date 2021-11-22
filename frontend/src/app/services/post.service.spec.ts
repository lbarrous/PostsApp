import { inject, TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Post } from '../models/post';

describe('PostService', () => {
  let postService: PostService;


  let httpTestingController: HttpTestingController;
  let post: Post;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
 
    httpTestingController = TestBed.get(HttpTestingController);
    post = {
      id: 1,
      user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'a@a.com',
          address: {
              street: 'Street',
              suite: 'Suite',
              city: 'City',
              zipcode: 'Zipcode',
              geo: {
                  lat: 'Lat',
                  lng: 'Lng'
              }
          }
      },
      title: 'Title',
      body: 'Body',
      comments: [
          {
              id: 1,
              postId: 1,
              name: 'John Doe',
              email: 'a@a.com',
              body: 'Body'
          }
      ]
  }
  });
 
  beforeEach(inject(
    [PostService],
    (service: PostService) => {
      postService = service;
    }
  ));

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });
  it("should return data", () => {
    let result: Post[] = [];
    postService.getPosts().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: "http://localhost:3000/api/posts"
    });
   
    req.flush([post]);
   
    expect(result[0]).toEqual(post);
  });

  it("should call POST API to create a new post", () => {
    postService.addPost(post).subscribe();
   
    let req = httpTestingController.expectOne({ method: "POST", url: "https://jsonplaceholder.typicode.com/posts" });
    expect(req.request.body).toEqual(post);
  });

  it("should call patch API to update a post", () => {
    postService.editPost(post, post.id).subscribe();
   
    let req = httpTestingController.expectOne({
      method: "PATCH",
      url: `https://jsonplaceholder.typicode.com/posts/${post.id}/`
    });
    expect(req.request.body).toEqual(post);
  });
  it("should call delete API to delete a post", () => {
    postService.deletePost(post.id).subscribe();
   
    let req = httpTestingController.expectOne({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/" + post.id
    });
  });
});
