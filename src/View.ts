export default class View {
  formatType(arr) {
    return arr.join(', ');
  }

  formatYield(arr) {
    return `${arr[0]} - ${arr[1]}%`;
  }

  formatArea(arr) {
    return `${arr[0]} - ${arr[1]}`;
  }
}
