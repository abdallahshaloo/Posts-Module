import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  posts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  startIndex = 0;
  endIndex = 0;
  isLlastPage = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        // console.log('POSTS: ', this.posts);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getDisplayedPosts(): any[] {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    return this.posts.slice(this.startIndex, this.endIndex);
  }

  handlePageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('END:', this.endIndex);

    this.endIndex == 95
      ? (this.isLlastPage = true)
      : (this.isLlastPage = false);
  }
}
