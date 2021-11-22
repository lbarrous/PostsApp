import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-dialog',
  templateUrl: './posts-dialog.component.html',
  styleUrls: ['./posts-dialog.component.scss'],
})
export class PostsDialogComponent implements OnInit {
  pageTitle: string = 'New Post';
  postForm: FormGroup;
  post: Post | null;
  postMode: string = '';

  constructor(
    public dialogRef: MatDialogRef<PostsDialogComponent>,
    private matSnackbar: MatSnackBar,
    private postService: PostService
  ) {
    this.initForm();
  }

  // Initializing Post Form
  initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
    });
  }

  // Creating New Post
  createPost() {
    let data = this.postForm.value;

    this.postService.addPost(data).subscribe((result) => {
      if (result != null && result != undefined && result) {
        this.matSnackbar.open('Post created successfully.', '', {
          duration: 2000,
        });
        this.dialogRef.close();
      } else {
        this.matSnackbar.open('Try after some time.', 'Retry', {
          duration: 2000,
        });
      }
    });
  }

  // Editing Post
  editPost() {
    let data = this.postForm.value;

    this.postService.editPost(data, this.post?.id || 0).subscribe((result) => {
      if (result != null && result != undefined && result) {
        this.matSnackbar.open('Post edited successfully.', '', {
          duration: 2000,
        });
        this.dialogRef.close();
      } else {
        this.matSnackbar.open('Try after some time.', 'Retry', {
          duration: 2000,
        });
      }
    });
  }

  ngOnInit() {
    this.pageTitle = this.postMode === 'new' ? 'New Post' : 'Edit Post';

    if (
      this.postMode === 'edit' &&
      this.post != null &&
      this.post != undefined
    ) {
      this.postForm.reset({
        title: this.post.title,
        body: this.post.body,
        userId: this.post.user.id,
      });
    }
  }
}
