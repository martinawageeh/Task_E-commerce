export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: any;
  category?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
