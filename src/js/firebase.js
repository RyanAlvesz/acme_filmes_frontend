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


export const uploadImage = async (file) => {
    let url
    const storageRef = ref(storage, 'images/' + file.name)
    await uploadBytes(storageRef, file)
        .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                url = await downloadURL
            })
        })
    return url
}


