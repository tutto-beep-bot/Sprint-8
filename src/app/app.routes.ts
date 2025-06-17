import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartsComponent } from './charts/charts.component';

export const routes: Routes = [
    { path: '', component: ProductsListComponent},
    { path: 'map', component: MapComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'charts', component: ChartsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
