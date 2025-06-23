import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  map!: mapboxgl.Map;

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGF2aXR1dHRvIiwiYSI6ImNtYzlmaWlscTAyYzMyanNkeXRlMGRpeGYifQ.ZUPsfuvZNp45KVF9fnH0uw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12
    });

    new mapboxgl.Marker().setLngLat([-8.61099, 41.14961]).addTo(this.map);
  }
}
