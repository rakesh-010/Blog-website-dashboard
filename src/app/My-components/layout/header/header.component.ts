import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData!:any;
  userEmail!:string;
  isLoggedIn$!:Observable<boolean>;

  constructor(private authService:AuthService){}
  ngOnInit():void{

    this.userData=localStorage.getItem('user');
    this.userEmail=JSON.parse(this.userData).email;

    this.isLoggedIn$=this.authService.isLoggedIn();

  }
  onLogout(){
    this.authService.logout();
  }
}
