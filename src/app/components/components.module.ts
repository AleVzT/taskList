import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TaskFormularioComponent } from './task-formulario/task-formulario.component';
import { TaskTableComponent } from './task-table/task-table.component';


@NgModule({
  declarations: [
    TaskFormularioComponent,
    TaskTableComponent,
  ],
  exports: [
    TaskFormularioComponent,
    TaskTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule { }