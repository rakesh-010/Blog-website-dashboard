import { Injectable, OnInit } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc,deleteDoc, docData } from '@angular/fire/firestore';
import { Storage,deleteObject,getDownloadURL,ref, uploadBytesResumable } from '@angular/fire/storage';
import { Post } from '../../models/newPost/post';
import {ToastrService} from'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  async uploadFile(input: any,postData:Post, formStatus:string,id:string) {
    const filePath=`postIMG/${Date.now()}`;
    const storageRef = ref(this.storage,filePath);
    uploadBytesResumable(storageRef, input).then(()=>{//yahan pe pehle const upload= tha
      this.toastr.success("Image successfully uploaded");
      getDownloadURL(storageRef).then((val)=>{
        postData.postImg=val;

        if(formStatus==="Edit"){
          this.updateData(postData,id);
        }
        else{
          this.saveData(postData);
        }
      });

    })
    .catch(err=>{ console.log(err) })
  }

  saveData(postData:Post){
    //inserting the whole thing into the db
    const collectionInstance=collection(this.afs,'Posts');
    addDoc(collectionInstance,postData).then(()=>{
    this.toastr.success("Data inserted Successfully");
    this.router.navigate(['/posts']);
    })
    .catch((error)=>console.log(error));
  }

  posts!:Observable<any>
  getData(){
    const collectionInstance=collection(this.afs,'Posts');
    this.posts=collectionData(collectionInstance,{idField:'id'});
  };

  loadOneData(id:string){
    const docInstance= doc(this.afs,'Posts',id);
    return docData(docInstance,{idField:'id'})

  }

  updateData(postData:any,id:string){
    const docInstance=doc(this.afs,'Posts',id);
    updateDoc(docInstance,postData).then(()=> {
      this.toastr.success("Post Updated");
      this.router.navigate(['/posts']);
    })
    .catch(err => console.log(err))
  };

  deleteImg(imgUrl:string,id:string){
    const storageRef = ref(this.storage,imgUrl);
    deleteObject(storageRef).then(()=>{
      // this.toastr.success("Image Deleted");
      this.deleteData(id);
    })
    .catch((err)=>{
      console.log(err);

    })
  }

  deleteData(id:string){
    const docInstance=doc(this.afs,'Posts',id);
    deleteDoc(docInstance).then(()=>this.toastr.warning("Deleted Successfully"))
    .catch(err=>console.log(err))
  }

  markFeatured(id:string,featuredData:any){
    const docInstance= doc(this.afs,'Posts',id);
    updateDoc(docInstance,featuredData).then(()=>{
      this.toastr.info("Featured Status updated");
    })
  }


  constructor(private storage:Storage,
    private toastr:ToastrService,
    private afs:Firestore,
    private router:Router) {
  }
  ngOnInit():void{}
}
