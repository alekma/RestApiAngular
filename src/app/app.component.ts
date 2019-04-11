import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  allPosts$;

  constructor(private httpService: HttpService) {}


  getPosts() {
    this.allPosts$ = this.httpService.posts$;
  }
  getPost() {
    this.httpService.getPost(1).subscribe(post => {
      console.log(post);
    });
  }
  getPostsByUser() {
    this.httpService.getPostsByUser(2).subscribe(post => {
      console.log(post);
    });
  }
  addPost() {
    const post: Post = ({
      userId: 1,
      id: null,
      title: 'Mój post',
      body: 'Pierwszy post o angularze'
    });
    this.httpService.addPost(post).subscribe(posts => {
      console.log(posts);
    });
  }
  updatePost() {
    const p: Post = ({
      userId: 1,
      id: 1,
      title: 'tetetete',
      body: 'nowy wpis'
    });
    this.httpService.updatePost(p).subscribe(post => {
      console.log(post);
    });
  }
  deletePost() {
    this.httpService.deletePost(1).subscribe(post => {
      console.log(post);
    });
  }
  changePost() {
    const p: Post = ({
      id: 1,
      body: 'Zmieniam tylko wpis'
    });
    this.httpService.changePost(p).subscribe(post => {
      console.log(post);
    });
  }
}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
