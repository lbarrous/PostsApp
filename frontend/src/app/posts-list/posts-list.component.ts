import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { PostsDialogComponent } from '../posts-dialog/posts-dialog.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Array<Post>>;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.posts$ = this.postService.getPosts();
  }

  ngOnInit() {
    this.posts$ = this.postService.getPosts();
  }

  openPostDialog(mode: string, post: Post | null = null) {
    const dialogRef = this.matDialog.open(PostsDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.post = mode === 'edit' ? post : null;
    dialogRef.componentInstance.postMode = mode;

    // Getting new Post after closing dialog
    dialogRef.afterClosed().subscribe((result) => {
      this.posts$ = this.postService.refetchPosts();
    });
  }
}
