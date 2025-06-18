import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartsComponent } from './charts/charts.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

export const routes: Routes = [
    { path: '', component: ProductsListComponent},
    { path: 'add', component: AddEditProductComponent},
    { path: 'edit/:id', component: AddEditProductComponent},
    { path: 'map', component: MapComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'charts', component: ChartsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
