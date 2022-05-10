import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr7XeHu-77DiYpJaKtfObo8BEOtUaBMHc",
  authDomain: "solterinders.firebaseapp.com",
  projectId: "solterinders",
  storageBucket: "solterinders.appspot.com",
  messagingSenderId: "950430812906",
  appId: "1:950430812906:web:11089e6689122f420ee593",
  measurementId: "G-GPZRPLLMRG"
};


createApp(App).use(initializeApp(firebaseConfig)).use(ElementPlus).use(store).use(router).mount('#app')



