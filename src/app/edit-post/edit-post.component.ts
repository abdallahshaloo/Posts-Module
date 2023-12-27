import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent implements OnInit {
  postId: number = 0;
  post: any;
  editForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.fetchPostDetails();
    });

    this.editForm = this.formBuilder.group({
      title: [''],
      body: [''],
    });
  }

  fetchPostDetails() {
    this.postsService.getPostById(this.postId).subscribe(
      (post) => {
        this.post = post;
        this.editForm.patchValue({
          title: post.title,
          body: post.body,
        });
      },
      (error) => {
        console.error('Error fetching post details:', error);
      }
    );
  }

  onSubmit() {
    const updatedPostData = {
      title: this.editForm.value.title,
      body: this.editForm.value.body,
    };

    this.postsService.updatePost(this.postId, updatedPostData).subscribe(
      (updatedPost) => {
        this.router.navigate(['/posts', this.postId]);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
}
