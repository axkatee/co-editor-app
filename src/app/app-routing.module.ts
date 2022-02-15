import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./components/auth/login-page/login-page.component";
import { RegistrationPageComponent } from "./components/auth/registration-page/registration-page.component";
import { MainPageComponent } from "./components/main/main-page/main-page.component";
import { ConversationPageComponent } from "./components/main/conversation-page/conversation-page.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: RegistrationPageComponent
  },
  {
    path: 'conversations',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conversations/:id',
    component: ConversationPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
