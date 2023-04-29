import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers/subscribers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  constructor(private subService:SubscribersService){}

  subList!:Observable<any>;
  ngOnInit(): void {

    this.subService.getData();
    this.subList=this.subService.subList;
  }

  onDelete(id:string){
    this.subService.deleteData(id);
  }


}
