export interface Contact {
    id: string,
    firstname: string,
    lastname: string,
    address: string,
    number: string,
    image: string,
    email: string,
    company: string
    isFavorite: boolean 
}
/** interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact , "id">;