import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  async ngOnInit(){
    if(this.idContacto()){
      this.contactoOriginal= await this.contactService.getContactById(this.idContacto()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      console.log(this.contactoOriginal)
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
