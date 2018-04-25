import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, filterString: string, catName: string): any {
if(value.length === 0){
  catName='';
  return value;
}

for(const item of value){
  const resultArray = [];
  if(item[catName] === filterString){
    resultArray.push(item);
  }
  return resultArray;
}





    return null;
  }

}
