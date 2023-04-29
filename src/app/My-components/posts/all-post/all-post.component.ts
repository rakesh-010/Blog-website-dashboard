import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/newPost/post.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  posts!:Observable<any>;

  onDelete(postImg:string,id:string){
    // console.log(postImg);
    this.postService.deleteImg(postImg,id);

  }

  isFeatured(id:string, status:boolean){
    const featured={
      isFeatured:status
    };
    this.postService.markFeatured(id,featured);
  }


  constructor(private postService:PostService){}
  ngOnInit(): void {
    this.postService.getData();
    this.posts=this.postService.posts;

  }
}
