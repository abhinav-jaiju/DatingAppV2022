import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hobby } from './hobby';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  hobby : Hobby[]

  constructor(private httpClient : HttpClient) { }

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
}
