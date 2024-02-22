import { Product } from '../types';
import { client } from '../utils/fetchClient';

export const getAccessories = async () => {
  const products = await client.get<Product[]>('/api/products.json');

  return products.filter(product => product.type === 'accessory');
};
