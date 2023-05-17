import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformCamelCase'
})
export class TransformCamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value !== 'string') {
      return value;
    }

    return value.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase());
  }

}
