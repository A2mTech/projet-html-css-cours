import { Request, Response } from 'express';
import { db } from '../config/database';

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400).json({
        success: false,
        error: 'ProductId et quantity sont requis'
      });
      return;
    }

    const product = await db.get('SELECT * FROM products WHERE id = ?', productId);
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
      return;
    }

    await db.run(
      'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
      [productId, quantity]
    );

    res.status(200).json({
      success: true,
      message: 'Produit ajouté au panier'
    });

  } catch (error) {
    console.error('Erreur lors de ajout au panier:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de ajout au panier'
    });
  }
};

export const getCartCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await db.get('SELECT SUM(quantity) as count FROM cart_items');
        res.json({ count: result.count || 0 });
    } catch (error) {
        console.error('Erreur lors du comptage des articles:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const getCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await db.all(`
            SELECT c.id, p.name, p.price, p.image, c.quantity
            FROM cart_items c
            JOIN products p ON c.product_id = p.id
        `);
        
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.json({
            items,
            total: total.toFixed(2)
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}; 