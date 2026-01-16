import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDoc
} from "firebase/firestore";

// Adicionar documento a uma coleção
export const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: new Date()
        });
        console.log("Documento escrito com ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        throw e;
    }
};

// Pegar todos documentos de uma coleção
export const getAllData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return data;
    } catch (e) {
        console.error("Erro ao buscar documentos: ", e);
        throw e;
    }
};

// Pegar documentos com filtro simples (ex: buscar usuário por email)
export const getDataByField = async (collectionName, field, value) => {
    try {
        const q = query(collection(db, collectionName), where(field, "==", value));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return data;
    } catch (e) {
        console.error("Erro ao buscar documentos filtrados: ", e);
        throw e;
    }
};

// Atualizar um documento específico
export const updateData = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date()
        });
    } catch (e) {
        console.error("Erro ao atualizar documento: ", e);
        throw e;
    }
};

// Deletar um documento
export const deleteData = async (collectionName, docId) => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
    } catch (e) {
        console.error("Erro ao deletar documento: ", e);
        throw e;
    }
};
