import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { RegistrationPageComponent } from './components/auth/registration-page/registration-page.component';
import { DeleteConversationDialogComponent } from './components/modals/delete-conversation-dialog/delete-conversation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OverlayModule } from "@angular/cdk/overlay";
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormService } from "./services/form.service";
import { InfoDialogComponent } from './components/modals/info-dialog/info-dialog.component';
import { AddUserDialogComponent } from './components/modals/add-user-dialog/add-user-dialog.component';
import { ConversationPageComponent } from './components/main/conversation-page/conversation-page.component';
import { CreateConversationComponent } from './components/modals/create-conversation/create-conversation.component';
import { AuthGuard } from "./auth.guard";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    DeleteConversationDialogComponent,
    MainPageComponent,
    InfoDialogComponent,
    AddUserDialogComponent,
    ConversationPageComponent,
    CreateConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [FormService, MatSnackBar, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
