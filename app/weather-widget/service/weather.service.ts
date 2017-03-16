import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_API_KEY, FORECAST_ROOT_URL } from '../constants/constants';

@Injectable()

export class WeatherService {

    latitude: number;
    longitude: number;


    constructor(private jsonp: Jsonp) { 
        this.latitude = 51.517230077032615;
        this.longitude = -3.2531671183587507;

    }

    getCurrentWeather() : Observable<any>
    {
        const url: string = FORECAST_ROOT_URL + FORECAST_API_KEY + "/" + this.latitude + "," + this.longitude;
        const queryParams: string = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
        .map(data => data.json())
        .catch(err => {
            console.error("Unable to get weather data -", err);
            return Observable.throw(err.json())
        });
    }
}