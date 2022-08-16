export interface UserForUpdateDto{
    userId:number;
    firstName:string;
    lastName:string;
    oldPassword:string;
    newPassword:string;
    email:string;
}