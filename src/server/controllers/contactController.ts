import { Request, Response } from 'express';
import { ContactForm } from '../types/contact';

export const handleContactForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const formData: ContactForm = req.body;
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            res.status(400).json({ 
                success: false,
                error: 'Tous les champs sont obligatoires' 
            });
            return;
        }


        console.log('Message reçu :', formData);

        res.status(200).json({ 
            success: true,
            message: 'Votre message a été envoyé avec succès',
            data: {
                reference: `MSG-${Date.now()}`,
                receivedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erreur lors du traitement du formulaire:', error);
        res.status(500).json({ 
            success: false,
            error: 'Une erreur est survenue lors du traitement de votre message' 
        });
    }
}; 