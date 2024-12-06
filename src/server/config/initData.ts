import { db } from './database';

async function initializeProducts() {
  try {
    const count = await db.get('SELECT COUNT(*) as count FROM products');
    
    if (count.count === 0) {
      await db.run(`
        INSERT INTO products (name, price, description, image) VALUES 
        ('Produit 1', 99.99, 'Description détaillée du produit 1...', '/assets/images/car5.jpg'),
        ('Produit 2', 149.99, 'Description détaillée du produit 2...', '/assets/images/car5.jpg'),
        ('Produit 3', 199.99, 'Description détaillée du produit 3...', '/assets/images/car5.jpg')
      `);
      console.log('Produits de démonstration ajoutés avec succès');
    }
  } catch (error) {
    console.error('Erreur', error);
  }
}

export { initializeProducts }; 