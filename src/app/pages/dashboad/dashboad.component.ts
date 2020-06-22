import { Component, OnInit, ViewChild, TemplateRef, Inject, ChangeDetectionStrategy, ViewEncapsulation, } from '@angular/core';
import { CalendarEvent, CalendarEventAction, 
          CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent,
           CalendarMonthViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent,
            CalendarDayViewBeforeRenderEvent, CalendarDateFormatter} from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, parseISO} from 'date-fns';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import * as moment from 'moment';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-dashboad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss'],
  styles: [
    `
      .cal-month-view .bg-pink,
      .cal-week-view .cal-day-columns .bg-pink,
      .cal-day-view .bg-pink {
        background-color: hotpink !important;
      }
    `,
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class DashboadComponent implements OnInit {

  constructor(public dialog: MatDialog, public modalService:ModalService) { this.getDataEvents() }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  locale: string = 'es';
  clickedDate: Date;
  clickedColumn: number;
  eventsArray;
  activeDayIsOpen = false;
  // exclude weekends
  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
  ];




  events: CalendarEvent[] = [ ];

  //****************************************************************************************************** */
    // Podría hacer una consulta para ver que día es el que quiero bloquear  y a partir de ahí que 
    // añadir ese día y horas al método para que bloquee
  //****************************************************************************************************** */

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      if (dayOfMonth > 5 && dayOfMonth < 10) {
        day.cssClass = 'bg-pink';
      }
    });
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (
            segment.date.getHours() >= 2 &&
            segment.date.getHours() <= 5 &&
            segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }



  addEvent(): void {
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  // *************************************************************************************************
//        conseguir que se abra y se cierre el día con los eventos // disable-slide-animation
// ***************************************************************************************************


dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  if (isSameMonth(date, this.viewDate)) {
    if (
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }
};

dateClickedF(event) {
  console.log(event);
  this.modalService.mostrarModalCalendar(event);
  this.clickedDate = event;
}

clickedColumnF(event) {
  console.log(event);
  this.clickedColumn = event
}

// *************************************************************************************************
//       Muestra la info del evento en consola si le hago click al evento
// ***************************************************************************************************

eventClicked({ event }: { event: CalendarEvent }): void {
  console.log('Event clicked', event); // si clicko en el evento me da la info
}

handleEvent(action: string, event: CalendarEvent): void {
  this.modalData = { event, action };
  this.openDialog(this.modalData);
  // this.modal.open(this.modalData, { size: 'lg' });
}

closeOpenMonthViewDay() {
  this.activeDayIsOpen = false;
}



setView(view: CalendarView) {
  this.view = view;
}

eventTimesChanged({
  event,
  newStart,
  newEnd,
}: CalendarEventTimesChangedEvent): void {
  this.events = this.events.map((iEvent) => {
    if (iEvent === event) {
      return {
        ...event,
        start: newStart,
        end: newEnd,
      };
    }
    return iEvent;
  });
  this.handleEvent('Dropped or resized', event);
}



// *************************************************************************************************
//                                     Pop-Up
// ***************************************************************************************************

openDialog(modalData: any) {
  // const dialogRef = this.dialog.open(eventInfoPopUp);

  // let dialogRef = this.dialog.open(eventInfoPopUp, {
  //   data: { modalData },
  // });

}


refresh: Subject<any> = new Subject();

  ngOnInit() {}

  getDataEvents() {
   
      this.modalService.getDates().subscribe( resp => {
        this.eventsArray = resp;
        // console.log(this.eventsArray);
        const dataEvent = [];

        var date = new Date().getTime() + 3600000;

        var endDate =  parseISO(moment(this.eventsArray[0].date).utc().local(true).add(1, 'h').format());
        console.log(endDate)

        for (let value of this.eventsArray) {
          
          var startDate =  parseISO(moment(value.date).utc().local(true).format());
          var endDate =  parseISO(moment(value.date).utc().local(true).add(1, 'h').format());

          
  
          dataEvent.push(
            {
            // start: parseISO(value.date),
            start: startDate,
            end: endDate,
            title: value.nombre,
            allDay: false,
            color: colors.yellow,
            draggable: false,
            actions: this.actions,
            // meta: {
            //       control_id: value.CTRL_ID,
            //       risk_id: value.RISK_ID,
            //       responsable: value.RESPONSABLE,
            //       executed: value.CTRL_CHECK
            // },
          })
        }
          
    
         this.events = dataEvent;
         console.log(dataEvent)
        });
  }

}


@Component({
  selector: 'eventInfoPopUp',
  templateUrl: 'eventInfoPopUp.html',
  styleUrls: ['./dashboad.component.scss'],
})
export class eventInfoPopUp implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<eventInfoPopUp>) {  }



  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
