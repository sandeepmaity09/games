import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUser } from '../models/index'
import { ConfigService } from './config.service';

/**
 * Represents a user service
 * Deals with all api related to user
 * @Class 
 */

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient,private host: ConfigService) { }
    
    /**
     * user login function
     * use to login 
     * @function
     */
    public login(user:IUser) {
        let path = "api_end_point";
        return this.http.post<any>(this.host.hostname+path, { username:user.email, password: user.password }).map(user=>{
            // login successful if there's a token in the response
            if(user && user.token){
                // store user details and token'n in local storage to keep use logged in between page refreshes
                localStorage.setItem('loggedInUser',JSON.stringify(user));
            }
            return user;
        });
    }

    /**
     * user logout function
     * use to logout
     * @function
     */

    public logout(){
        // remove user from local storage to log user out
        localStorage.removeItem('loggedInUser');
    }

    public getAllUsers(){
        let path = "/user/list";
        console.log(this.host.hostname);
        return this.http.get<any>(this.host.hostname+path).map(result=>{
            return result.data;
        });
        // .subscribe(data=>{
        //     console.log(data);
        // },err=>{
        //     console.log(err);
        // })
    }

    public deleteUser(id){
        let path = "/user/delete";
        return this.http.delete<any>(this.host.hostname+path,{params:{userId:id}});
    }
}