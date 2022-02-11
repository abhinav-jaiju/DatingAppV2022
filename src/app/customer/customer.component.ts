import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  page: number = 1;
  filter: string;

  constructor(public userService: UserService, private authService : AuthService, 
    private router : Router) { }

  ngOnInit(): void {
      this.userService.bindListUser();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
