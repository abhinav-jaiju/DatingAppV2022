import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { Users } from 'src/app/shared/users'
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  errors = '';
  loginUser: any = new Users();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    //create a reactive form model
    this.loginForm = this.formBuilder.group({
      //formcontrol fields
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]]
    });
  }

  //get controll for validation
  get formControls(){
    return this.loginForm.controls;
  }

  //login verify for  credentials
  loginCredentials() {

    this.isSubmitted = true;
    console.log("Submitted form for credentials");

    if (this.loginForm.valid) {
      console.log("with Valid");
      this.errors = "";
      //calling method from auth service-- authentication and autherize
      this.authService.loginVerify(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            this.loginUser = data;

            //username, roleid and token
            sessionStorage.setItem('JWTTOKEN', this.loginUser.token);

            //check the role based on role roleId, it directs to the respective component
            if (this.loginUser.RoleId === 1) {

              console.log("Admin");
              localStorage.setItem("UserName", this.loginUser.UserName);
              localStorage.setItem("ACESSROLE", this.loginUser.RoleId);
              sessionStorage.setItem("USERNAME", this.loginUser.UserName);
              this.router.navigateByUrl('/admin');
            }
            else if (this.loginUser.RoleId === 2) {
              console.log("Manager");
              localStorage.setItem("UserName", this.loginUser.UserName);
              localStorage.setItem("ACESSROLE", this.loginUser.RoleId);
              sessionStorage.setItem("USERNAME", this.loginUser.UserName);
              this.router.navigateByUrl('/customer');
            }
            else if (this.loginUser.RoleId === 3) {
              console.log("Coordinator");
              localStorage.setItem("UserName", this.loginUser.UserName);
              localStorage.setItem("ACESSROLE", this.loginUser.RoleId);
              sessionStorage.setItem("USERNAME", this.loginUser.UserName);
              this.router.navigateByUrl('/coordinator');
            }
            else {
              this.errors = "Sorry! NOT Authenticate/authorize to access this module";
            }
          },
          errors => {
            this.errors = "invalid username and password, try again"
          }
        );

    }

    if (this.loginForm.invalid) {
      console.log("Is Invalid");
      return;
    }

  }


}


