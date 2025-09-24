import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contact';
import { AuthService } from './auth-service';
import { AddContact } from '../pages/add-contact/add-contact';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  aleatorio = Math.random()
  authService = inject(AuthService)

  contacts: Contact[] = []

  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
  }

  /** devuelve un contacto en particular segun su ID*/
  getContactById() { }

  async createContact(nuevoContacto: NewContact) {
    const res = await fetch("https://agenda-api.somee.com/api/Contacts",
      {
        method: "POST",
        body: JSON.stringify(nuevoContacto),
        headers: {
          "Content-Type": "application/json", Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: Contact = await res.json()
    this.contacts.push(resJson);
    return resJson
  }

  editContact() { }

  async deleteContact(id: number) {
    const res = await fetch("https://agenda-api.somee.com/api/Contacts/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id) /** this. contacts se iguala a la funcionalidad de lo escrito: revisa cada contacto y se fija se el id del contacto es igual al id del que se desea borrar. si es igual, lo borra, si no, no lo filtra */
    }
  }

  setFavourite() { }
}
