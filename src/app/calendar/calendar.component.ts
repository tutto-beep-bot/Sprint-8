import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

	@ViewChild('calendar') CalendarComponent!: FullCalendarComponent;

	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin, interactionPlugin],
		initialView: 'dayGridMonth',
		eventDisplay: 'block',
		displayEventTime: false,
		events: [],
		dateClick: this.handleDateClick.bind(this),
		eventClick: this.handleEventClick.bind(this),
	}

	eventData = { title: '', start: '', description: '' };
	isEditing = false;
	editingEventId: number | null = null;

	constructor(private http: HttpClient) {}

	ngOnInit(){
		this.fetchEvents();
	}

	fetchEvents(){
		this.http.get<any[]>('http://localhost:3000/api/deliveries')
			.subscribe(events => {
				const calendarApi = this.CalendarComponent.getApi();
        		calendarApi.removeAllEvents();
        		events.forEach(event => {
          			calendarApi.addEvent(event);
        		});
			});
	}

	handleDateClick(arg: any) {
    	this.eventData = {
      		title: '',
      		start: arg.dateStr,
			description: ''
    	};
    	this.isEditing = false;
    	this.editingEventId = null;
    	this.openModal();
  	}

  	handleEventClick(arg: any) {
    	this.eventData = {
      		title: arg.event.title,
      		start: arg.event.startStr,
			description: arg.event.extendedProps.description || ''
    	};
    	this.isEditing = true;
    	this.editingEventId = arg.event.id;
    	this.openModal();
  	}

	openModal() {
    	const modal = new (window as any).bootstrap.Modal(
      		document.getElementById('deliveryModal')
    	);
    	modal.show();
  	}

	saveEvent() {
    	const url = this.isEditing
      		? `http://localhost:3000/api/deliveries/${this.editingEventId}`
      		: 'http://localhost:3000/api/deliveries';

    	const method = this.isEditing ? 'put' : 'post';

    	this.http[method](url, this.eventData).subscribe(() => {
      		this.fetchEvents();
      		(window as any).bootstrap.Modal.getInstance(
        		document.getElementById('deliveryModal')
      		).hide();
    	});

		this.eventData = { title: '', start: '', description: '' };
		this.isEditing = false;
		this.editingEventId = null;
  	}
}
