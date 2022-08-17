export interface UserForUpdateDto{
    id:number;
    firstName:string;
    lastName:string;
    oldPassword:string;
    newPassword:string;
    email:string;
}