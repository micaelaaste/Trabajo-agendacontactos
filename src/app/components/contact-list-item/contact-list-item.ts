import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact-services';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
  router = inject(Router)

  openDeleteModal(){
      Swal.fire({
      title: "Desea borrar contacto?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isDenied) {
          this.contactsService.deleteContact(this.contact().id)
          this.router.navigate(["/"])
        }
      });
    }
}
  

