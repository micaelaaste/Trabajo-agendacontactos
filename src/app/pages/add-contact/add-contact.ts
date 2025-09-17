import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewContact } from '../../interfaces/contact';
import { Contact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactService } from '../../services/contact-services';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact {
authService = inject(AuthService);
  contactService = inject(ContactService);

createContact(form: any){
    const nuevoContacto: NewContact ={
      firstname: form.firstName,
      lastname: form.lastName,
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
