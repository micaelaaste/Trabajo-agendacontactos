import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactService } from '../../services/contact-services';
import { Router } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';


@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact implements OnInit {
  authService = inject(AuthService);
  contactService = inject(ContactService);
  router = inject(Router);
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false; 
  contact: Contact | undefined; 


  async ngOnInit() {
    console.log(this.idContacto());
    if (this.idContacto()) {
      this.contactoOriginal = await this.contactService.getContactById(this.idContacto()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavorite: this.contactoOriginal!.isFavorite
      }) 
    }
  }

  async handleFormSubmission(newContact: NewContact) {
    let res;
    this.isLoading= true
    if (this.idContacto()) {
      res = await this.contactService.editContact({ ...newContact, id: this.idContacto()!.toString()});
    } else {
      res = await this.contactService.createContact(newContact);
    }
    this.isLoading = false;
    this.router.navigate(["/"])
    }

    async toggleFavorite(){
    if(this.contact){
      const res= await this.contactService.setFavourite(this.contact.id);
      if(res) this.contact.isFavorite = !this.contact.isFavorite;
    }
  }
  }



