import { IProduct } from '../types';
import { client } from '../utils/fetchClient';

export const getPhones = async () => {
  const allProducts = await client.get<IProduct[]>('/api/products.json');

  return allProducts.filter(product => product.type === 'phone');
};