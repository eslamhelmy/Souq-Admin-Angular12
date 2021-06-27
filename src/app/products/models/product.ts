
export interface Product{
    id: number,
    name: string,
    description: string,
    price: number| undefined,
    categoryId:number|undefined,
    image?:string
}