import { Injectable, OnInit } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc,deleteDoc, docData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService implements OnInit {

  constructor(private afs:Firestore,private toastr:ToastrService) { }
  ngOnInit(): void {

  }

  subList!:Observable<any>;
  getData(){
    const collInstance=collection(this.afs,'Subscribers');
    this.subList=collectionData(collInstance,{idField:'id'});
  }

  deleteData(id:string){
    const docInstance=doc(this.afs,'Subscribers',id);
    deleteDoc(docInstance).then(()=>{
      this.toastr.success("Subscriber Deleted");
    })
    .catch((err)=>{
      console.log(err);

    })
  }
}
