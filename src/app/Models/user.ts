export class User{
    public fullName : String =  "";
    public email : String = "";
    public userName : String = "";
    public roles : String[] = [];
    public funds : number = 0;

    constructor (fullName? : String, email? : String, userName? : String, roles? : String[], funds? : number){
        this.fullName = fullName;
        this.email = email;
        this.userName = userName;
        this.roles = roles;
        this.funds = funds;
    }

}