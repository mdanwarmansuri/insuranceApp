import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { policy } from '../types/policy';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  UserId:number=0;
  EmpId:number=0
  EmpName:string="";
  CompanyName:string="";

  policies:policy[]=[];

  constructor(private httpClient:HttpClient) { }

   setData(){
    let uid = sessionStorage.getItem("UserId");
    this.UserId=Number(uid)
    this.EmpId=Number(sessionStorage.getItem("EmpId"));
    this.EmpName=sessionStorage.getItem("EmpName")!;
    this.CompanyName=sessionStorage.getItem("CompanyName")!;

    this.httpClient.get(`https://localhost:7259/api/UserPolicies/${uid}`).subscribe((data:any)=>{
      console.log(data);
      for(let item of data){
        console.log(item);
        this.httpClient.get(`https://localhost:7259/api/Policies/${item.policyId}`).subscribe((p:any)=>{
          let policy={
            policyId:p.policyId,
            policyName:p.policyName,
            insurer:p.insurer,
            tpa:p.tpa,
            description:p.description,
            start:item.startDate.substring(0,10),
            end:item.endDate.substring(0,10)
          }
          this.policies.push(policy)
          // console.log(this.policies);
        })
      }
    })
    // console.log(this.policies);
  }

}
