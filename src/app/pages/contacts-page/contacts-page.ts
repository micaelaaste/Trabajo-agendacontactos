import { Component, inject, OnInit } from '@angular/core';
import {RouterModule } from '@angular/router';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactService } from '../../services/contact-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage implements OnInit {

  ngOnInit(): void{
    this.contactService.getContacts();
  }
  
  authService = inject(AuthService);
  contactService = inject(ContactService);

createContact(form: any){
    const nuevoContacto: NewContact ={
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavorite: form.isFavorite
    }
    
    this.contactService.createContact(nuevoContacto)
  }

}
  
  