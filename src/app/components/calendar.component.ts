import {Component, ChangeDetectionStrategy, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK, CalendarDateFormatter } from 'angular-calendar';
import { subMonths, addMonths, addDays, addWeeks, subDays, subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';


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
  encapsulation: ViewEncapsulation.None,
})
export class calendarComponent {
  //@Input() view: CalendarView;

  //@Input() viewDate: Date;

  //@Input() locale: string = 'en';

  @Output() viewDateChange = new EventEmitter<Date>();

  @Output() clickedDateEvent = new EventEmitter<Date>();

  clickedDate: Date;

  CalendarView = CalendarView;

  view: CalendarView | CalendarPeriod = CalendarView.Month;

  viewDate: Date = new Date();

  locale: string = 'ca';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  minDate: Date = subMonths(new Date(), 0);

  maxDate: Date = addMonths(new Date(), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  constructor() {
    this.dateOrViewChanged();
    console.log(this.clickedDate);
  }

  sendDate(){
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

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

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

