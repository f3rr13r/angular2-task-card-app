import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform
{
    transform(speed: number, unitType: string)
    {
        switch(unitType)
        {
            case "mph":
                const miles = speed * 0.6;
                const milesRounded = Number(miles).toFixed(0);

                return milesRounded + "mph";

            default:
                const kilosRounded = Number(speed).toFixed(0);
                
                return kilosRounded+ "kph";
        }
    }
}