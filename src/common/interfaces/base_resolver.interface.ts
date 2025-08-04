export interface IBaseResolver<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
