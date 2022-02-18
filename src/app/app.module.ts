import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { RegistrationPageComponent } from './components/auth/registration-page/registration-page.component';
import { DeleteConversationDialogComponent } from './components/modals/delete-conversation-dialog/delete-conversation-dialog.component';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { InfoDialogComponent } from './components/modals/info-dialog/info-dialog.component';
import { AddUserDialogComponent } from './components/modals/add-user-dialog/add-user-dialog.component';
import { ConversationPageComponent } from './components/main/conversation-page/conversation-page.component';
import { CreateConversationComponent } from './components/modals/create-conversation/create-conversation.component';
import { SocketService } from "./services/socket.service";
import { FormService } from "./services/form.service";
import { AuthGuard } from "./auth.guard";

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
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule
    ],
  providers: [FormService, MatSnackBar, AuthGuard, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
