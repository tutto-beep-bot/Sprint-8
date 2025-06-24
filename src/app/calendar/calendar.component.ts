import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin, interactionPlugin],
		initialView: 'dayGridMonth',
		events: [],
		dateClick: this.handleDateClick.bind(this),
		eventClick: this.handleEventClick.bind(this),
	}

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get<any[]>('http://localhost:3000/api/deliveries')
			.subscribe(events => {
				this.calendarOptions.events = events;
			});
	}

	handleDateClick(arg: any) {
    	alert('Clicked on date: ' + arg.dateStr);
  	}

  	handleEventClick(arg: any) {
    	alert('Clicked event: ' + arg.event.title);
  	}

	handleAddEvent() {
  		alert('Modal coming soon...');
	}
}
