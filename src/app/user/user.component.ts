import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  //declare varialbe 
  empId : number;

  constructor(public userService : UserService,
    private route : ActivatedRoute,
    private toastr: ToastrService,
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    //get departments
    this.userService.bindListHobby();

    this.userService.bindListFood();

    //get empid form activate route 
    this.empId = this.route.snapshot.params['Users1'];

    //getUserById
    if(this.empId!=0 || this.empId != null){
      //get  user
      this.userService.getUserById(this.empId).subscribe(
        result =>{
          console.log(result);
        },
        error =>{
          console.log(error);
        }
      );
    }
  }
  //submit form 
  onSubmit(form : NgForm){
    console.log(form.value);
    let addId = this.userService.formData.Users1;

    //insert or update
    if(addId == 0 || addId == null){
      //insert 
      this.insertUserRecord(form);
    }
    else{
      //update 
      this.updateUserRecord(form);
    }

  }

  //insert method
  insertUserRecord(form?:NgForm){
    console.log("Inserting a record...");
    this.userService.InsertUserById(form.value).subscribe(
      result =>{
        console.log(result);

        this.resetForm(form);
        this.toastr.success('User Record has been inserted','nirvana dating app')
      },
      error =>{
        console.log(error);
      }
    );
  }
  //Update method
  updateUserRecord(form?:NgForm){
    console.log("Updating a record...");
    this.userService.UpdtaeUserById(form.value).subscribe(
      result =>{
        console.log(result);
        //calling reset form for clear the contents
        this.resetForm(form);
        this.toastr.success('Employee Record has been inserted','EmpApp v2022');
      },
      (error) =>{
        console.log(error);
      }
    );
  }



   //clear all contents after submit --reinitialize 
   resetForm(form?: NgForm){
    if(form != null){
      form.resetForm();
    }
  }
  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
