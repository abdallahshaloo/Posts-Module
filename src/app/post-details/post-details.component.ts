import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  postId: number = 0;
  post: any;
  user: any;
  userId: number = 0;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.fetchPostDetails();
    });
  }

  fetchPostDetails() {
    this.postsService.getPostById(this.postId).subscribe(
      (post) => {
        this.post = post;
        if (this.post && this.post.userId) {
          this.postsService.getUserById(this.post.userId).subscribe(
            (user) => {
              this.user = user;
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
          this.postsService.getCommentsByPostId(this.postId).subscribe(
            (comment) => {
              this.comments = comment;
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching post details:', error);
      }
    );
  }
}
