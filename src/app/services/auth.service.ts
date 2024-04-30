import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../types/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router,private toastr: ToastrService) { }

  isLoading:boolean=false;
  isLoggedIn():boolean{
    let loggedIn=sessionStorage.getItem('loggedIn');
    if(loggedIn==='true')
      return true;
    
    return false;
  }

  readonly apiUrl = 'https://localhost:7259/api/Users/api/users';
  login(form:LoginForm){
    this.isLoading=true;
    let uname=form.email;
    let password=form.password;
    this.httpClient.get(`${this.apiUrl}/${uname}/password`).subscribe((data:any)=>{
      console.log(data);
      console.log(data.empName);
      if(data.password==password){
        sessionStorage.setItem('loggedIn','true');
        sessionStorage.setItem('UserId',data.userId.toString());
        sessionStorage.setItem('EmpId',data.empId.toString());
        sessionStorage.setItem('EmpName',data.empName);
        sessionStorage.setItem('CompanyName',data.companyName);

        alert("Logged in Successfully");
        this.toastr.success('Logged in successfully','Success');

        this.router.navigate(['dashboard']);
      }
      else{
        alert("Credentials does not match");
        this.isLoading=false;
      }
    },(error:any)=>{
      this.isLoading=false;
      console.log(error)
      alert("Credentials does not match");
    });
  }

  logOut(){
    this.isLoading=false;
    sessionStorage.clear();
    alert("Logged out successfully");
    this.router.navigate(['login']);
  }
}
