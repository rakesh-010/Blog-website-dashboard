import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth,private toastr:ToastrService,private router:Router) { }

  loggedIn:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  isLoggInGuard:boolean=false;

  login(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password).then(()=>{
      this.toastr.success("Login Successfull");
      this.loadUser();
      this.loggedIn.next(true);//this is to display the email and log out button
      this.isLoggInGuard=true;//router-gaurd
      this.router.navigate(['/']);
    })
    .catch((err)=>this.toastr.warning("Incorrect Email id or Password"));
  }

  loadUser(){
    authState(this.auth).subscribe((val)=>{
      // console.log(JSON.parse(JSON.stringify(val)) );
      localStorage.setItem('user',JSON.stringify(val));
    })
  };

  logout(){
    signOut(this.auth).then(()=>{
      this.toastr.success("Logged Out");
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggInGuard=false;//router-gaurd

      this.router.navigate(['/login']);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
