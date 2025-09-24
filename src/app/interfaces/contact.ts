export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    number: string,
    image: string,
    email: string,
    company: string,
    isFavorite: boolean 
}
/** interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact , "id" | "userId">;