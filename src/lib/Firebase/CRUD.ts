
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebaseConfig';


type EmailModel = {
  confirmed: string[]
  email: string
  presents: string[]
}

// Adicione um documento
export async function AddProduct(data: EmailModel) {
  try {

    const docRef = await addDoc(collection(db, 'guests'), data);
    console.log('Documento ref:', docRef.id);
    try {
      const userDocRef = doc(db, 'guests', );
      console.log('Documento user ID: ', userDocRef.id);
      // Atualiza o documento adicionando o novo produto ao array 'products'
      await updateDoc(userDocRef, {
        products: arrayUnion(docRef.id),
        lastUpdate: new Date()
      });

      console.log(`Produto ${docRef.id} adicionado ao usuário ${data} com sucesso.`);
    } catch (error) {
      console.error('Erro ao adicionar produto ao usuário: ', error);
      throw error; // Lance o erro para ser tratado pelo chamador da função
    }
  } catch (error) {
    console.error('Erro ao adicionar documento: ', error);
  }

}



