import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc,deleteDoc } from '@angular/fire/firestore';
import {ToastrService} from'ngx-toastr';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:Firestore, private toastr:ToastrService) {
    // this.getData();
  }

  saveData(categoryData:any){
    const collectionInstance=collection(this.afs,'newCategory');

    addDoc(collectionInstance,categoryData).then(()=>{
      this.toastr.success("Data inserted Successfully")
      // console.log("Successfully added");
    })
    .catch((error)=>console.log(error));
  }

  userData!:Observable<any>;
  getData(){
    const collectionInstance=collection(this.afs,'newCategory');
    this.userData=collectionData(collectionInstance,{idField:'id'});
  };

  deleteData(id:string){
    const docInstance=doc(this.afs,'newCategory',id);
    deleteDoc(docInstance).then(()=>this.toastr.success("Deleted Successfully"))
    .catch(err=>console.log(err))
  }

  updateData(categoryData:any,id:string){
    const docInstance=doc(this.afs,'newCategory',id);
    updateDoc(docInstance,categoryData).then(()=> this.toastr.success("Category Updated"))
    .catch(err => console.log(err))
  };
}
