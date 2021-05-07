import { Component, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { subMonths, addMonths, addDays, addWeeks, subDays, subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { LANG } from '../services/global';


/* CALENDAR TRET DE : https://angular-calendar.com/#/min-max-date */

type CalendarPeriod = 'day' | 'week' | 'month';


function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: '../views/calendar.html',
  styleUrls: ['../../assets/css/calendar.css'],

  // es tracta d'un hack per aconseguir estils que s'apliquin al component intern. La vostra aplicació només hauria d’utilitzar un full d’estil global
  encapsulation: ViewEncapsulation.None
})
export class calendarComponent {

  @Output() viewDateChange = new EventEmitter<Date>();

  @Output() clickedDateEvent = new EventEmitter<Date>();

  clickedDate: Date;
  CalendarView = CalendarView;
  view: CalendarView | CalendarPeriod = CalendarView.Month;
  viewDate: Date = new Date();
  locale: string = LANG.actual;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  minDate: Date = subDays(new Date(), 1); //deja seleccionar desde hoy
  maxDate: Date = addDays(new Date(), 32); //deja seleccionar hasta dentro de 1 mes
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  back = faBackward;
  next = faForward;


  constructor() {
    this.dateOrViewChanged();
  }

  sendDate() {
    this.clickedDateEvent.emit(this.clickedDate);
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());

  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  /*   changeView(view: CalendarPeriod): void {
      this.view = view;
      this.dateOrViewChanged();
    } */

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
}

