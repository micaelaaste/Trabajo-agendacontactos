import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact-services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact= input.required<Contact>()
  aleatorio = Math.random()
  contactsService = inject(ContactService)
}
