import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactService } from '../../services/contact-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact implements OnInit {
  authService = inject(AuthService);
  contactService = inject(ContactService);
  router = inject(Router);
  idContacto= input<number>();
  contactoOriginal:Contact|undefined = undefined;
  form = viewChild <NgForm> ('newContactForm')

  async ngOnInit(){
    if(this.idContacto()){
      this.contactoOriginal= await this.contactService.getContactById(this.idContacto()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
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

  async createContact(form: any) {
    const nuevoContacto: NewContact = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavorite: form.isFavorite
    }

    if (await this.contactService.createContact(nuevoContacto)) {
      this.router.navigate(["/"]);
    }
  }

}
