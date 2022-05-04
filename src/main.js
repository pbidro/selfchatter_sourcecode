import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhMjy88nkD64SBYlA0eAiehUXVH9rjt0s",
  authDomain: "selfchatter.firebaseapp.com",
  projectId: "selfchatter",
  storageBucket: "selfchatter.appspot.com",
  messagingSenderId: "794635535636",
  appId: "1:794635535636:web:1a1bbd20351afa19cbee01",
  measurementId: "G-MSKFYK5YMW"
};


createApp(App).use(initializeApp(firebaseConfig)).use(ElementPlus).mount('#app')

