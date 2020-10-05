
import { FormsModule } from '@angular/forms';
import { calendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/ca';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
  ],
  declarations: [calendarComponent],
  exports: [calendarComponent]
})
export class MyCalendarModule {}
