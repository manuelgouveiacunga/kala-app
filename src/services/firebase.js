/**
 * Firebase Service
 * Configuração e inicialização do Firebase
 * 
 * NOTA: Este arquivo está preparado para integração futura.
 * Adicione as credenciais no arquivo .env quando estiver pronto.
 */

// TODO: Descomentar quando adicionar credenciais Firebase
// import { initializeApp } from 'firebase/app'
// import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'

// Configuração do Firebase (a ser preenchida com credenciais reais)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
}

// Verificar se as credenciais estão configuradas
const isConfigured = () => {
    return firebaseConfig.apiKey && firebaseConfig.projectId
}

// TODO: Descomentar quando adicionar credenciais
// let app = null
// let auth = null
// let db = null
// let googleProvider = null

// if (isConfigured()) {
//   app = initializeApp(firebaseConfig)
//   auth = getAuth(app)
//   db = getFirestore(app)
//   googleProvider = new GoogleAuthProvider()
// }

// Exportar serviços (mock até configurar Firebase)
export const auth = null
export const db = null
export const googleProvider = null

export const isFirebaseConfigured = isConfigured

/**
 * Instruções para configurar Firebase:
 * 
 * 1. Criar projeto em https://console.firebase.google.com
 * 2. Ativar Authentication (Google + Email/Password)
 * 3. Criar Firestore Database
 * 4. Copiar credenciais e adicionar ao .env:
 * 
 *    NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
 *    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
 *    NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
 *    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
 *    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
 *    NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
 * 
 * 5. Instalar dependências:
 *    yarn add firebase
 * 
 * 6. Descomentar imports e código acima
 */

export default {
    auth,
    db,
    googleProvider,
    isConfigured: isFirebaseConfigured
}
