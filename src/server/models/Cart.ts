interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export { CartItem, Cart }; 