import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Car } from '../models/car';

@Pipe({
  name: 'carfilterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value
      .filter((c: Car) => c.name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
