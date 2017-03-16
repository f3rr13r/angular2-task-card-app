import { Component, OnInit } from "@angular/core";

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

// Stop IDE complaining about lack of Skycons typescript.
declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit
{
    currentSpeedUnit = "kph";
    currentTempUnit = "fahrenheit";
    icons = new Skycons();
    weatherData = new Weather(null, null, null, null, null);
    dataReceived = false;



    constructor(private service: WeatherService) { }



    ngOnInit()
    {
        this.getCurrentWeather();
    }



    getCurrentWeather()
    {
        this.service.getCurrentWeather()
            .subscribe(weather => 
            {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"]

                this.setWeatherIcon();
                this.dataReceived = true;
            },
            err => console.error(err));
    }



    toggleUnits()
    {
        this.toggleTempUnits()
        this.toggleSpeedUnits()   
    }



    toggleTempUnits()
    {
        if (this.currentTempUnit == "celsius")
        {
            this.currentTempUnit = "fahrenheit";
        }
        else
        {
            this.currentTempUnit = "celsius";
        }
    }



    toggleSpeedUnits()
    {
        if (this.currentSpeedUnit == "mph")
        {
            this.currentSpeedUnit = "kph";
        }
        else
        {
            this.currentSpeedUnit = "mph";
        }
    }



    setWeatherIcon()
    {
        this.icons.add("icon", this.weatherData.icon)
        this.icons.play();
    }



    setStyles(): Object
    {
        if (this.weatherData.icon)
        {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        }
        else
        {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }


    refreshWeatherData()
    {
        this.dataReceived = false;
        this.getCurrentWeather();
    }
}
