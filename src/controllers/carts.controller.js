import { carts } from '../data/carts.js';
import { successResponse } from '../utils/apiResponse.js';

export function createCart(req, res) {
  const newCart = {
    id: carts.length + 1,
    products: [],
    createdAt: new Date(),
  };

  carts.push(newCart);

  return successResponse(res, {
    statusCode: 201,
    message: 'Cart created',
    payload: newCart
  });
};