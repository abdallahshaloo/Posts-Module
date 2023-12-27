import { Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';

export const routes: Routes = [
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'posts', component: PostsListComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
