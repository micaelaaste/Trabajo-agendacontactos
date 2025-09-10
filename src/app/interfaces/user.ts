export interface User{
    id:number
    firstname: string
    lastname: string
    email: string
    password: string
}
export type NewUser = Omit<User, "id">; 