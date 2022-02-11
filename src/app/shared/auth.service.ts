import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }


  public loginVerify(users : Users){
    //calling web service and passing username and password
    console.log(users.UserName);
    return this.httpClient.get(environment.roleUrl+"/api/user/login/"+users.UserName+"&"+users.UserPassword);
  }

  //logout
  public logout(){
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACESSROLE");
    sessionStorage.removeItem("USERNAME");
  }
}
