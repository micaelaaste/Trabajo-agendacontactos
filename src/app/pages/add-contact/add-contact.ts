import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactService } from '../../services/contact-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact {
  authService = inject(AuthService);
  contactService = inject(ContactService);
  router = inject(Router);

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
