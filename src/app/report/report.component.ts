import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  mostpreferredHobby : string = '';
  noOfFood : string = '';
  agefood : string = '';

  constructor(public userService: UserService,private authService : AuthService, 
    private router : Router) { }

  ngOnInit(): void {
    this.userService.getHobby().subscribe(
      result =>{
        console.log(result);
        this.mostpreferredHobby = result;
      }
    );
    this.userService.getNoOfFood().subscribe(
      result =>{
        console.log(result);
        this.noOfFood = result;
      }
    )

    this.userService.getAgeFood().toPromise().then(
      result =>{
        console.log(result);
        this.agefood = result;
      }
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
