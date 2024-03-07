export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface IProductBuy {
  id: number;
  title: string;
  price: number;
  count: number;
}

export type orderState = {
  list: IProductBuy[];
  options: IProduct[];
  loading: boolean;
  error: string | null;
};

export type ProductOrder = {
  id: number;
  count: number;
};
