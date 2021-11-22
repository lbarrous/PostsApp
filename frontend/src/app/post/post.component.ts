import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostsDialogComponent } from '../posts-dialog/posts-dialog.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postId$: number;
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.postId$ = params.id));
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.post = posts.find((post) => post.id == this.postId$);
    });
  }

  openPostDialog(mode: string, post: Post) {
    const dialogRef = this.matDialog.open(PostsDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.post = mode === 'edit' ? post : null;
    dialogRef.componentInstance.postMode = mode;

    // Getting new Post after closing dialog
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/posts']);
    });
  }

  deletePost(postId: number) {
    if (postId != null && postId != undefined) {
      this.postService.deletePost(postId).subscribe((result: any) => {
        if (result != null && result != undefined) {
          this.snackBar
            .open('Post deleted successfully.', '', {
              duration: 2000,
            })
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate(['/posts']);
            });
        }
      });
    }
  }
}
