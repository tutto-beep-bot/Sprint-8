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
import { ToastrService } from 'ngx-toastr';

import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

	private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

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

	constructor(private http: HttpClient, private toastr: ToastrService) {}

	ngOnInit(){
		this.fetchEvents();
	}

	// fetchEvents(){
	// 	this.http.get<any[]>('http://localhost:3000/api/deliveries')
	// 		.subscribe(events => {
	// 			const calendarApi = this.CalendarComponent.getApi();
    //     		calendarApi.removeAllEvents();
    //     		events.forEach(event => {
    //       			calendarApi.addEvent(event);
    //     		});
	// 		});
	// }

	async fetchEvents() {
  		const { data, error } = await this.supabase
			.from('deliveries')
			.select('*');
		if (error) {
			this.toastr.error('Failed to fetch deliveries.', 'Error');
			return;
		}
		const calendarApi = this.CalendarComponent.getApi();
		calendarApi.removeAllEvents();
		data.forEach((event: any) => {
			calendarApi.addEvent(event);
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
    	this.editingEventId = Number(arg.event.id);
    	this.openModal();
  	}

	openModal() {
    	const modal = new (window as any).bootstrap.Modal(
      		document.getElementById('deliveryModal')
    	);
    	modal.show();
  	}

	// saveEvent() {
    // 	const url = this.isEditing
    //   		? `http://localhost:3000/api/deliveries/${this.editingEventId}`
    //   		: 'http://localhost:3000/api/deliveries';

    // 	const method = this.isEditing ? 'put' : 'post';

    // 	this.http[method](url, this.eventData).subscribe(() => {
    //   		this.fetchEvents();
    //   		(window as any).bootstrap.Modal.getInstance(
    //     		document.getElementById('deliveryModal')
    //   		).hide();
    // 	});

	// 	this.toastr.success('Delivery saved successfully.', 'Delivery saved')

	// 	this.eventData = { title: '', start: '', description: '' };
	// 	this.isEditing = false;
	// 	this.editingEventId = null;
  	// }

	async saveEvent() {
		try {
			if (this.isEditing && this.editingEventId) {
				await this.supabase
					.from('deliveries')
					.update(this.eventData)
					.eq('id', this.editingEventId);
				} else {
				await this.supabase
					.from('deliveries')
					.insert([this.eventData]);
				}
    			await this.fetchEvents();
				(window as any).bootstrap.Modal.getInstance(
					document.getElementById('deliveryModal')
				).hide();
				this.toastr.success('Delivery saved successfully.', 'Delivery saved');
				this.eventData = { title: '', start: '', description: '' };
				this.isEditing = false;
				this.editingEventId = null;
				} catch (error) {
				this.toastr.error('Failed to save delivery.', 'Error');
				}
	}

	async deleteEvent() {
  		if (!this.editingEventId) return;

  		if (confirm('Are you sure you want to delete this delivery?')) {
    		try {
      			await this.supabase
					.from('deliveries')
					.delete()
					.eq('id', this.editingEventId);
      			await this.fetchEvents();
      			(window as any).bootstrap.Modal.getInstance(
        			document.getElementById('deliveryModal')
      			).hide();
				this.toastr.warning('Event was deleted successfully.', 'Event deleted');
				this.eventData = { title: '', start: '', description: '' };
				this.isEditing = false;
				this.editingEventId = null;
    			} catch (error) {
      			this.toastr.error('Failed to delete delivery.', 'Error');
    			}
  		}
	}
}
