import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
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

    try {
      // Atualiza o mesmo documento recém-criado
      const userDocRef = doc(db, 'guests', docRef.id);
      await updateDoc(userDocRef, {
        products: arrayUnion(docRef.id),
        lastUpdate: new Date()
      });

      console.log(`Produto ${docRef.id} adicionado com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar o documento:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao adicionar documento:', error);
  }
}
