import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Food } from './food';
import { Hobby } from './hobby';
import { Hobbyreport } from './hobbyreport'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User[];
  food : Food[];
  hobby : Hobby[];
  foodno : Hobbyreport;
  mostpreferredHobby : string = '';
  formData : User = new User();
  constructor(private httpClient : HttpClient) { }

  bindListUser(){
    this.httpClient.get(environment.apiUrl+'api/users/GetUsers')
    .toPromise().then(
      
      response =>{
        console.log("From Services");
        console.log(response);
        this.user = response as User[]
      }
      
    );
  }
  bindListHobby(){
    this.httpClient.get(environment.apiUrl+'api/hobbies/gethobbies')
    .toPromise().then(
      response =>{
        console.log("From Services");
        console.log(response);
        this.hobby = response as Hobby[]
      }
    );
  }
  bindListFood(){
    this.httpClient.get(environment.apiUrl+'api/food/getfood')
    .toPromise().then(
      response =>{
        console.log("From Services");
        console.log(response);
        this.food = response as Food[]
      }
    );
  }

  bgetnoofFood(){
    this.httpClient.get(environment.apiUrl+'api/users/getnooffood')
    .toPromise().then(
      response =>{
        console.log("From Services");
        console.log(response);
        this.foodno = response as Hobbyreport;
      }
    );
  }
  //getUserById
  getUserById(id:number) : Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/users'+id);
  }

  //insert User 
  InsertUserById(user: User):Observable<any>{
    return this.httpClient.post(environment.apiUrl+'api/users',user);
  }
  //UPdate User  
  UpdtaeUserById(user : User): Observable<any>{
    return this.httpClient.put(environment.apiUrl+'api/users',user);
  }

  deleteUserById(id:number) : Observable<any>{
    return this.httpClient.delete(environment.apiUrl+'api/users'+id);
  }

  getHobby(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/users/getmosthobby',{responseType: 'text'})
  }

  getNoOfFood(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/users/getnooffood',{responseType:'text'})
  }

  getAgeFood() :Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/users/getagefood',{responseType:'text'})
  }
}
