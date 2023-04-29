import { Component,OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Post } from '../../models/newPost/post';
import { PostService } from '../../services/newPost/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  newPostForm!:any;

  permaLink:string="";
  imgSrc!:any;
  selectedImg!:any;
  userData!:Array<any>;
  formStatus="Add New";

  newPost!:Post;
  post!:any;
  id='';
  constructor(private categoryService:CategoriesService,
    private fb:FormBuilder,
    private postService:PostService,
    private activeRoute:ActivatedRoute
  ){


    //edit part ke liye hai ye
    this.activeRoute.queryParams.subscribe((val)=>{
      // console.log(val);

      if(Object.keys(val).length!=0){//we are checking if a query paramter has been passed... kyunki agar
        //pass nahi huab hoga to ye length zero ayega nahi to 1 hoga


        this.postService.loadOneData(val['id']).subscribe((post)=>{
          // console.log(post);

          this.formStatus="Edit";
          this.post=post
          this.newPostForm=fb.group({
            title:[this.post.title,[Validators.required,Validators.minLength(10)]],
            permalink:[{value:this.post.permaLink,disabled:true},Validators.required],
            excerpt:[this.post.excerpt,[Validators.required,Validators.minLength(50)]],
            category:[`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
            postImg:['',Validators.required],
            content:[this.post.content,Validators.required]
          })
          this.imgSrc=this.post.postImg;
          this.id=this.post.id;

        })
      }else{
        this.newPostForm=fb.group({
          title:['',[Validators.required,Validators.minLength(10)]],
          permalink:[{value:'',disabled:true},Validators.required],
          excerpt:['',[Validators.required,Validators.minLength(50)]],
          category:['',Validators.required],
          postImg:['',Validators.required],
          content:['',Validators.required]
        })
      }

    })
  }

  onTitleChange($event:any):void{
    const Title=$event.target.value;
    this.permaLink=Title.replaceAll(' ','-');
  }

  onSelectImage($event:any){//we have to use js file reader class.
    const reader=new FileReader();
    reader.onload=(eve)=>{
      this.imgSrc=eve.target?.result
    }
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImg=$event?.target.files[0];
  }

  onSubmit(){
    console.log("submit clicked");

    const splitCategory=this.newPostForm.value.category.split('-');
    // console.log(splitCategory);

    this.newPost={
      title:this.newPostForm.value.title,
      permaLink:this.permaLink,
      category:{
        categoryId:splitCategory[0],
        category:splitCategory[1]
      },
      postImg:'',
      excerpt:this.newPostForm.value.excerpt,
      content:this.newPostForm.value.content,
      isFeatured:false,
      views:10000,
      status:'new',
      createdAt:Date.now()
    }
    this.postService.uploadFile(this.selectedImg,this.newPost,this.formStatus,this.id);
    this.newPostForm.reset();
    this.imgSrc="";

    // console.log(this.newPost);
  }

  get formControls(){
    return this.newPostForm.controls;
  }

  ngOnInit():void{
    this.categoryService.getData();
    this.categoryService.userData.subscribe(val=>{
      this.userData=val;
    });



  }

}
