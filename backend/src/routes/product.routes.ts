import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;