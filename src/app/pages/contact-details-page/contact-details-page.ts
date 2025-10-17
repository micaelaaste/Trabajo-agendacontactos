import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact-services';
@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage {
  contactsService = inject (ContactService)

  id = input<number>(); 

  contact: Contact | undefined = undefined;

  async ngOnInit(){
    console.log()
    this.contact = await this.contactsService.getContactById(this.id()!)
  }
  async toggleFavorite(){
    if(this.contact){
      const res= await this.contactsService.setFavourite(this.contact.id);
      if(res) this.contact.isFavorite = !this.contact.isFavorite;
    }
  }
}
