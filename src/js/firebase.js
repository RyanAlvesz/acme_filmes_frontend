'use strict'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js'

const firebaseConfig = {
    apiKey: "AIzaSyCKkCQ-cVoXz_kZhtOBLxEYIvxswenzeKU",
    authDomain: "acme-filmes.firebaseapp.com",
    projectId: "acme-filmes",
    storageBucket: "acme-filmes.appspot.com",
    messagingSenderId: "862781194919",
    appId: "1:862781194919:web:f0a107e712ab6e78555182"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage()

export const uploadImage = (file) => {
    
    const storageRef = ref(storage, 'images/'+file.name)
    uploadBytes(storageRef, file)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('Download URL', downloadURL)
                return  downloadURL
            })
        })

}