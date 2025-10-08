import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-logged-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(AuthService);

  openLogoutModal(){
    Swal.fire({
    title: "Desea cerrar sesión?",
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: false,
    denyButtonText: `Cerrar sesión`,
    cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isDenied) {
        this.authService.logout()
      }
    });
  }
}
