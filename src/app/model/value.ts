export class Value {

  key: string;
  value: number;
  clazz: string;

  constructor(key: string, value: number, clazz: string) {
    this.key = key;
    this.value = value;
    this.clazz = clazz;
  }

  valueOf(): number {
    return this.value;
  }

  updateValue(value: number): void {
    this.value = value;
  }

  addToValue(value: number): void {
    this.value = this.value + value;
  }

  public toString = (): string => {
    return `V-${this.key}:${this.value}`;
  }
}
