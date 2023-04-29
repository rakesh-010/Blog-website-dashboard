import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories/categories.service';
import { Category } from '../models/caltegory-component/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  userData!:Observable<any>;
  formCategory!:string;
  formStatus:string="Add";//used as the 2-way binding variable

  constructor(private catergoryService:CategoriesService){
  }
  ngOnInit(): void {
    this.catergoryService.getData();
    this.userData=this.catergoryService.userData;
  }
  categoryData!:Category;
  categoryId!:string;//used for the editing part.

  onAdd(form:NgForm):any{
    this.categoryData={
      category:form.value.newCategory
    }
    if(this.formStatus==="Edit"){
      this.catergoryService.updateData(this.categoryData,this.categoryId);
      this.formStatus="Add";
    }
    else{
      this.catergoryService.saveData(this.categoryData);
    }
    form.reset();
  };

  onDelete(id:string){
    this.catergoryService.deleteData(id);
  };

  onEdit(newCategory:string,id:string){
    this.formCategory=newCategory;
    this.formStatus="Edit";
    this.categoryId=id;
    // this.catergoryService.updateData(id);
  }






}
