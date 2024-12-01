import { Roles } from "./roles/user-role.enum"

export interface jwtPayload{
    email:any

    sub:number

    roles:Roles
}