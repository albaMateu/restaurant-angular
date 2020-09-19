import { headerCalendarModule } from './header-calendar/headre-calendar.module';
import { calendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,                                                   
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    headerCalendarModule,
  ],
  declarations: [calendarComponent],
  exports: [calendarComponent],
})
export class MyCalendarModule {}
