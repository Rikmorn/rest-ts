export interface IRunTimeType<T> {
  validate(data: any): Promise<T> | T;
}
