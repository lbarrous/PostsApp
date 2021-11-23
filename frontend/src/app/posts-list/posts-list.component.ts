import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post';
import { PostsDialogComponent } from '../posts-dialog/posts-dialog.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  storedPosts: Array<Post>;
  posts$: Array<Post>;
  showLoader: boolean = false;
  search: string;

  constructor(
    private postService: PostService,
    private matSnackbar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.fetchPosts();
  }

  searchPosts() {
    this.posts$ = this.storedPosts.filter((post) => {
      return post.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  fetchPosts() {
    this.showLoader = true;
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts$ = posts;
        this.storedPosts = posts;
        this.showLoader = false;
      },
      (error) => {
        //Error callback
        this.matSnackbar.open('Error: Try after some time.', 'Error', {
          duration: 3000,
        });
        this.showLoader = false;
      }
    );
  }

  ngOnInit() {
    this.fetchPosts();
  }

  openPostDialog(mode: string, post: Post | null = null) {
    const dialogRef = this.matDialog.open(PostsDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.post = mode === 'edit' ? post : null;
    dialogRef.componentInstance.postMode = mode;

    // Getting new Post after closing dialog
    dialogRef.afterClosed().subscribe((result) => {
      this.showLoader = true;
      this.postService.refetchPosts().subscribe(
        (posts) => {
          this.posts$ = posts;
          this.storedPosts = posts;
          this.showLoader = false;
        },
        (error) => {
          //Error callback
          this.matSnackbar.open('Error: Try after some time.', 'Retry', {
            duration: 3000,
          });
          this.showLoader = false;
        }
      );
    });
  }
}
