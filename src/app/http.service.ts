import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private postsObs = new BehaviorSubject([]);
  posts$ = this.postsObs.asObservable();

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  // Pobieramy wszystkie posty
  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      posty => {
        this.postsObs.next(posty);
      },
      err => {
        console.log(err);
      }
    );
  }

  // Pobieramy jeden post podając id
  getPost(id: number) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  // Pobieramy wszystkie posty usera podając w parametrze jego userID
  getPostsByUser(userId: number) {
    const par = new HttpParams().set('userId', userId + '');
    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      params: par
    });
  }

  // Dodajemy nowy post
  addPost(post: Post) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', post);
  }

  // Aktualizujemy/podmieniamy post
  updatePost(post: Post) {
    return this.http.put('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

  // Usuwamy post
  deletePost(id: number) {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  // Aktualizujemy pola w post
  changePost(post: Post) {
    return this.http.patch('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }
}
