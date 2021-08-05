import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminComponent, ModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
