export class Value {

  key: string;
  value: number;
  clazz: string;

  constructor(key: string, value: number, clazz: string) {
    this.key = key;
    this.value = value;
    this.clazz = clazz;
  }

  updateValue(value: number) {
    this.value = value;
  }

  addToValue(value: number) {
    this.value = this.value + value;
  }

  public toString = (): string => {
    return `V-${this.key}:${this.value}`;
  }
}
