import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { LittleSpinnerComponent } from './little-spinner/little-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    SpinnerComponent,
    LittleSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerComponent,
    LittleSpinnerComponent,
    NgxPaginationModule
  ]
})
export class SharedModule { }
