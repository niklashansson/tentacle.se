export default class View {
  _data: any;

  formatType(arr: Array<string>) {
    return arr.join(', ');
  }
  formatYield(arr: Array<number>) {
    return `${arr[0]} - ${arr[1]}%`;
  }
  formatArea(arr: Array<number>) {
    return `${arr[0]} - ${arr[1]}`;
  }
}
