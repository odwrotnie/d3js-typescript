export class Value {

  key: string;
  value: number;
  clazz: string;

  constructor(key: string, value: number, clazz: string) {
    this.key = key;
    this.value = value;
    this.clazz = clazz;
  }

  public toString = (): string => {
    return `V-${this.key}:${this.value}`;
  }
}
