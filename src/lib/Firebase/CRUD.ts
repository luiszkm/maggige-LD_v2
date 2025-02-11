import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

type EmailModel = {
  confirmed: string[];
  email: string;
  presents: string[];
};

// Adicione um documento
export async function AddProduct(data: EmailModel) {
  try {
    // Adiciona um novo documento à coleção 'guests'
    const docRef = await addDoc(collection(db, 'guests'), data);
    console.log('Documento criado com ID:', docRef.id);

    
  } catch (error) {
    console.error('Erro ao adicionar documento:', error);
  }
}
