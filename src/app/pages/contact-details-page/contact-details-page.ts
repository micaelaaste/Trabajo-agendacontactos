import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact-services';
@Component({
  selector: 'app-contact-details-page',
  imports: [],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage {
  contactsService = inject (ContactService)

  idContacto = input<number>(); 

  contact: Contact | undefined = undefined;

  async ngOnInit(){
    this.contact = await this.contactsService.getContactById(this.id()!)
  }
}
