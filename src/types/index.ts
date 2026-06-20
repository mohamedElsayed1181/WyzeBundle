export interface Variant {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  quantity: number;
}

export interface Product {
  id: string;
  category: "cameras" | "sensors" | "accessories" | "plan";
  name: string;
  description: string;
  image: string;
  badge?: string;
  comparePrice?: number;
  price: number;
  quantity: number;
  variants?: Variant[];
  unit?: string;
  freeLabel?: string;
}
