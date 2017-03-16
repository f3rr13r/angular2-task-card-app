import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TempUnitPipe implements PipeTransform
{
    transform(temp: number, unitType: string)
    {
        switch(unitType)
        {
            case "celsius":
                const celsius = (temp - 32) * 5/9;
                return celsius;

            default:
                return temp;
        }
    }
}