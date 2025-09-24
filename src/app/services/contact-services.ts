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
  async getContactById(id: string | number) {
      const res = await fetch("https://agenda-api.somee.com/api/Contacts" + "/" + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: Contact = await res.json()
    this.contacts.push(resJson);
    return resJson
   }

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

  async editContact(contactoEditado: Contact) {
    const res = await fetch("https://agenda-api.somee.com/api/Contacts" + "/" + contactoEditado, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token
      },
      body: JSON.stringify(contactoEditado)
    });
    if (!res.ok) return; 
    const resContact:Contact = await res.json()
    this.contacts = this.contacts.map(contact => {
      if (contact.id == resContact.id) return resContact;
      return contact
    })
    return resContact;
  }

  async deleteContact(id: number | string) {
    const res = await fetch("https://agenda-api.somee.com/api/Contacts/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if(!res.ok) return; 
    if (res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id) /** this. contacts se iguala a la funcionalidad de lo escrito: revisa cada contacto y se fija se el id del contacto es igual al id del que se desea borrar. si es igual, lo borra, si no, no lo filtra */
    }
    return true; 
  }

  async setFavourite(id: string | number) {
    const res = await fetch("https://agenda-api.somee.com/api/Contacts" + "/" + id + "favorite",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    this.contacts = this.contacts.map(contact => { /** el map genera un ..... */
      if(contact.id === id){
        return {...contact, isFavorite: !contact.isFavorite};
      };
      return contact; 
    });
    return true;
  }
}
