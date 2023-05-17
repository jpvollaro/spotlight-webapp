import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: any, searchTerm?: any): any {
    if (!value) {
      return '';
    }
    if (!searchTerm) {
      return value;
    }
    value = value.toString();
    // create regex expresion with searchTerm
    const regex = new RegExp(searchTerm, 'gi');
    // replace the search term in term with the <mark /> tag
    return value.replace(regex, (str: string) => '<mark>' + str + '</mark>');
  }

}
