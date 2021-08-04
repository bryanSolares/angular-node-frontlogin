import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '@app/material.module';
import { UtilsService } from '../../services/utils.service';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SidebarComponent],
  providers: [UtilsService]
})
export class SidebarModule { }
