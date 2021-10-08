import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/reponseModel';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../enums/responseCode';
import { User } from '../Models/user';
import { Constants } from '../Helper/constants';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL: string = "https://localhost:5001/api/User";
  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    const body = {
      Email: email,
      Password: password
    }
    return this.httpClient.post<ResponseModel>(this.baseURL + "/Login", body);
  }

  public register(fullname: string, email: string, password: string, roles: string[], funds : number) {
    const body = {
      FullName: fullname,
      Email: email,
      Password: password,
      Roles: roles,
      Funds: funds,
    }
    return this.httpClient.post<ResponseModel>(this.baseURL + "/RegisterUser", body);
  }

  public getAllUsers() {

    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    console.log(userInfo);
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userInfo?.token}`
    })
    return this.httpClient.get<ResponseModel>(this.baseURL + "/GetAllUsers", { headers: headers }).pipe(map((res: any) => {
      let userList = new Array<User>();
      if (res.responseCode == 1) {
        if (res.dataSet) {
          res.dataSet.map((x: User) => {
            userList.push(new User(x.fullName, x.email, x.userName, x.roles, x.funds));
          })
        }

      }
      return userList;
    }));
  }

  public GetUserList() {

    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    console.log(userInfo);
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userInfo?.token}`
    })
    return this.httpClient.get<ResponseModel>(this.baseURL + "/GetUserList", { headers: headers }).pipe(map((res: any) => {
      let userList = new Array<User>();
      if (res.responseCode == 1) {
        if (res.dataSet) {
          res.dataSet.map((x: User) => {
            userList.push(new User(x.fullName, x.email, x.userName, x.roles, x.funds));
          })
        }

      }
      return userList;
    }));
  }

  public getAllRole() {

    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    console.log(userInfo);
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userInfo?.token}`
    })
    //console.log("arriba return");
    return this.httpClient.get<ResponseModel>(this.baseURL + "/GetRoles", { headers: headers }).pipe(map((res: any) => {
      let roleList = new Array<Role>();
      if (res.responseCode == 1) {
        if (res.dataSet) {
          res.dataSet.map((x: string) => {
            roleList.push(new Role(x));
          })
        }

      }
      return roleList;
    }));
  }

  public getCurrentUser() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    let email = userInfo.email;

    return this.httpClient.get<ResponseModel>(this.baseURL + '/GetCurrentUser/' + email).pipe(map((res: any) => {
      let userList = new User();
      if (res.responseCode == 1) {
        if (res.dataSet) {
          userList = (new User(res.dataSet.fullName, res.dataSet.email, res.dataSet.userName, res.dataSet.roles, res.dataSet.funds));
        }
      }
      return userList;
    }));
  }

  public addFunds(){
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    let email = userInfo.email;

    /*
    const body = {
      FullName: fullname,
      Email: email,
      Password: password,
      Roles: roles,
      Funds: funds,
    }
    */

  }

}
