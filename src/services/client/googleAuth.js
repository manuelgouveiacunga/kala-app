import User from '@/models/User'
import { loginWithGoogle as googleLoginService } from '@/services/auth'
import { db } from '@/services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export async function loginWithGoogleAndSyncProfile() {
    const firebaseUser = await googleLoginService()
    const userDocRef = doc(db, 'users', firebaseUser.uid)
    const userDoc = await getDoc(userDocRef)

    let userProfile

    if (userDoc.exists()) {
        userProfile = User.fromFirestore(userDoc)
    } else {
        const baseUsername = firebaseUser.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')
        const username = `${baseUsername}_${Math.floor(Math.random() * 1000)}`

        userProfile = new User({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            username,
            displayName: firebaseUser.displayName || username,
            isPremium: false,
            messageCount: 0
        })

        await setDoc(doc(db, 'users', userProfile.uid), userProfile.toJSON())
    }

    return {
        success: true,
        user: userProfile.toJSON()
    }
}
