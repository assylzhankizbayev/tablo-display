import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    let newValue = '';
    const numberLenght = 4;
    const valueLength = value.toString().length;
    
    if (valueLength) {
      for(let i = 0; i < numberLenght - valueLength; i++) {
       newValue += '0';
      }      
      newValue += value;
    }

    return newValue;
  }
}