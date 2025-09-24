import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { RegisterPage } from './pages/register-page/register-page';
import { GroupsPage } from './pages/groups/groups';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { AddContact } from './pages/add-contact/add-contact';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
    path: "register",
    component: RegisterPage,
    canActivate: [onlyPublicUserGuard]
  },
  {
    path: "",
    component: LoggedLayout,
    canActivateChild: [onlyLoggedUserGuard],
    children: [
      {
        path: "",
        component: ContactsPage
      },
      {
        path: "addContact",
        component: AddContact
      },
      {
        path: "contacts/:id",
        component: ContactDetailsPage
      },
      {
        path: "contacts/:idContacto/edit",
        component: AddContact
      },
      {
        path: "groups",
        component: GroupsPage
      },
    ]
  },
];