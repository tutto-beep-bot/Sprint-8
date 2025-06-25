import { Routes, provideRouter } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChartsComponent } from './charts/charts.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', component: ProductsListComponent, canActivate: [authGuard]},
    { path: 'add', component: AddEditProductComponent, canActivate: [authGuard]},
    { path: 'edit/:id', component: AddEditProductComponent},
    { path: 'map', component: MapComponent, canActivate: [authGuard]},
    { path: 'calendar', component: CalendarComponent, canActivate: [authGuard]},
    { path: 'charts', component: ChartsComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
