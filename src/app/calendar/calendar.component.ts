import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin, interactionPlugin],
		initialView: 'dayGridMonth',
		events: [],
		dateClick: this.handleDateClick.bind(this),
		eventClick: this.handleEventClick.bind(this),
	}

	eventData = { title: '', start: '' };
	isEditing = false;
	editingEventId: number | null = null;

	constructor(private http: HttpClient) {}

	ngOnInit(){
		this.fetchEvents();
	}

	fetchEvents(){
		this.http.get<any[]>('http://localhost:3000/api/deliveries')
			.subscribe(events => {
				this.calendarOptions.events = events;
			});
	}

	handleDateClick(arg: any) {
    	this.eventData = {
      		title: '',
      		start: arg.dateStr
    	};
    	this.isEditing = false;
    	this.editingEventId = null;
    	this.openModal();
  	}

  	handleEventClick(arg: any) {
    	this.eventData = {
      		title: arg.event.title,
      		start: arg.event.startStr
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
  	}
}
