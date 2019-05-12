export class Value {

  key: string;
  value: number;
  color: string;

  constructor(key: string, value: number, color: string) {
    this.key = key;
    this.value = value;
    this.color = color;
  }

  public toString = (): string => {
    return `V-${this.key}:${this.value}`;
  }
}
