import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://jsonplaceholder.typicode.com/posts/';
  usersApi = 'https://jsonplaceholder.typicode.com/users/';
  commentAPI = 'https://jsonplaceholder.typicode.com/comments?postId=';

  getAllPosts() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersApi}${id}`);
  }

  getCommentsByPostId(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentAPI}${postId}`);
  }

  updatePost(postId: number, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${postId}`, postData);
  }
}
