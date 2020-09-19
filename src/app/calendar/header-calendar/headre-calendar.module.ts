import { headerCalendarComponent } from './header-calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  declarations: [headerCalendarComponent],
  exports: [headerCalendarComponent],
})
export class headerCalendarModule {}
