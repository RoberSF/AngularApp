import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-blog-read',
  templateUrl: './blog-read.component.html',
  styleUrls: ['./blog-read.component.scss']
})
export class BlogReadComponent implements OnInit {


  post: Post = new Post('','' , '', '', '','','','');

  constructor(public activatedRoute: ActivatedRoute, public postService: PostService) {

    this.activatedRoute.params.subscribe(params => { //Esto es para acceder a los parametros de la url 

      let id = params['id'] // como sabemos que es id? por que en el routing.module pusimos "":id"

      if ( id !== 'nuevo') {
        this.cargarPost(id)
      }
    })
   }

  ngOnInit() {
  }

  cargarPost(id :string) {
    this.postService.cargarPost(id).subscribe( post => {
      this.post = post ;
      console.log(this.post)
  })
};

}
