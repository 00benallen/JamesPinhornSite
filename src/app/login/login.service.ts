import { Injectable } from "@angular/core";
//import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService {

    constructor(/*httpClient: HttpClient*/) {}

    loginUser(username: string, password: string): boolean {

        if(username == 'jamespinhorn' && password == 'admin') {
            console.log("Login successful")
            return true
        } else {
            console.log('Invalid credentials')
            return false
        } 
    }
}