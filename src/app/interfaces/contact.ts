export interface Contact {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    number: string,
    image: string,
    email: string,
    company: string,
    userId: number,
    isFavorite: boolean 
}
/** interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact , "id" | "userId">;