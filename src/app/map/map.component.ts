import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { Location } from '../interfaces/location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  imports: [FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  map!: mapboxgl.Map;
  newMarkerName: string = ''
  newMarkerCoords: [number, number] | null = null;

  constructor(private _mapService: MapService) {}

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZGF2aXR1dHRvIiwiYSI6ImNtYzlmaWlscTAyYzMyanNkeXRlMGRpeGYifQ.ZUPsfuvZNp45KVF9fnH0uw',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12
    });

    this._mapService.getLocations().subscribe((locations: Location[]) => {
      locations.forEach(loc => {
        new mapboxgl.Marker()
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(new mapboxgl.Popup().setText(loc.name))
          .addTo(this.map)
      });
    });

    this.map.on('click', (e: mapboxgl.MapMouseEvent)  => {
      const mouseEvent = e.originalEvent as MouseEvent | undefined;

      if(!mouseEvent) return;

      const target = mouseEvent.target as HTMLElement | null;

      if (target?.closest('.mapboxgl-marker') || target?.closest('.mapboxgl-popup')) {
        return;
      }

      const { lng, lat } = e.lngLat;
      this.newMarkerCoords = [lng, lat];
      
    });
  }

  submitNewLocation() {
    if (!this.newMarkerCoords || !this.newMarkerCoords) return;

    const [lng, lat] = this.newMarkerCoords;
    const location = {
      name: this.newMarkerName,
      latitude: lat,
      longitude: lng
    };

    this._mapService.createLocation(location).subscribe((saved) => {
      new mapboxgl.Marker()
        .setLngLat([saved.longitude, saved.latitude])
        .setPopup(new mapboxgl.Popup().setText(saved.name))
        .addTo(this.map);

      this.newMarkerCoords = null;
      this.newMarkerName = ''
    });
  }

  cancelNewMarker() {
    this.newMarkerCoords = null;
    this.newMarkerName = '';
}

}
