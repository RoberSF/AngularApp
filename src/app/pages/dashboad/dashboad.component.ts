import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from '@angular/material/dialog';
import { Subject } from 'rxjs';


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
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss']
})
export class DashboadComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  clickedDate: Date;
  clickedColumn: number;
  eventsArray;
  activeDayIsOpen = true;
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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];


  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
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

  let dialogRef = this.dialog.open(eventInfoPopUp, {
    data: { modalData },
  });

}


refresh: Subject<any> = new Subject();

  ngOnInit() {
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
