import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagepipe'
})
export class ImagepipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return value;
  }

}
