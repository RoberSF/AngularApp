import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Post[] = [];
  sincePost = 0;
  totalPosts: number = 0;

  constructor(public postService: PostService, public modalService: ModalService) {
    this.getPosts();
   }

  ngOnInit() {
    this.modalService.notificacion.subscribe(() => this.getPosts());
  }

  getPosts() {

    //this.loading = true;

    this.postService.getPosts(this.sincePost).subscribe((data:any) => {

      this.totalPosts = this.postService.totalPosts;
      console.log(this.totalPosts);
      this.posts = data;
      //this.loading = false;
      console.log(data);
    });
  };

  searchPost(value: string) {

    if ( value.length <= 0 ) {
      this.getPosts() 
      return;
    }

    this.postService.searchPost(value).subscribe( (posts:any) => {
      this.posts = posts.tabla
    })
  };

  page(value:number) {
    let since = this.sincePost + value;

    if( since >= this.totalPosts) {
      return; //esto quiere decir que se sale
    };

    if ( since < 0 ) {
      return;
    };

    this.sincePost += value;
    this.getPosts();
  };

  //Crear hospital metodo iría aquí

}
