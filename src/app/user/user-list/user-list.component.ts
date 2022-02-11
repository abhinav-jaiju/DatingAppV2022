import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  page: number = 1;
  filter: string;

  constructor(public userService: UserService, private router: Router,
    private authService : AuthService) {}

  ngOnInit(): void {
    this.userService.bindListUser();
  }

  //Update User
  updateUserById(UserId: number) {
    console.log(UserId);

    this.router.navigate(['users', UserId]);
  }

  //Delete Post
  deleteUser(UserId: number) {
    if (confirm('Are you sure, you want to delete this record')) {
      this.userService.deleteUserById(UserId).subscribe(
        (response) => {
          this.userService.bindListUser();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  addUser() {
    this.router.navigate(['user']);
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
