import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { policy } from '../types/policy';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
 
  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.setData();
  }

  getPolicies():policy[]{
    return this.dashboardService.policies;
  }

  getUserId():number{
    return this.dashboardService.UserId;
  }

  getEmpId():number{
    return this.dashboardService.EmpId;
  }

  getEmpName():string{
    return this.dashboardService.EmpName;
  }
  getCompanyName():string{
    return this.dashboardService.CompanyName;
  }
  
}
