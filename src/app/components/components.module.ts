import { NgModule } from "@angular/core";
import { PipesModule } from "../pipes/pipes.module";
import { FormsModule } from "@angular/forms";
import { DirectivesModule } from "../directives/directives.module";
import { BrowserModule } from "@angular/platform-browser";
import { AngularMaterialModule } from "../angular-material.module";
import { UsersCardListComponent } from './users-card-list/users-card-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserBeforeAndAfterDialogComponent } from './user-before-and-after-dialog/user-before-and-after-dialog.component';

@NgModule({
  declarations: [
    UsersCardListComponent,
    UserFormComponent,
    UserBeforeAndAfterDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularMaterialModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    UsersCardListComponent,
    UserFormComponent
  ]
})
export class ComponentsModule { }