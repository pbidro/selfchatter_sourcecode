import { createStore } from 'vuex'
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'

export default createStore({
  state: {
    myFirestore: null,
    mensajes: null,
  },
  getters: {

  },
  mutations: {
    instanceFirestore(state, fs) {
      state.myFirestore = fs
    },
    getMessages(state, mesages) {
      state.mensajes = mesages
    }
  },
  actions: {
    async instanceFirestore({ commit }, fs) {
      commit("instanceFirestore", fs())
    },
    async getMessages({ commit }) {
      if (this.state.myFirestore) {
        const db = getFirestore();
        const q = query(collection(db, "mensajes"), orderBy("date"));
        onSnapshot(q, (querySnapshot) => {
          const mensajes = [];
          this.mensajes = [];
          querySnapshot.forEach((doc) => {
            mensajes.push({ id: doc.id, data: doc.data() });
          });
          commit('getMessages', mensajes)
        });
      }
    },
    async addMessage(commit,objeto) {
      if (objeto != "") {
        console.log(objeto)
        const db = getFirestore();
        await addDoc(collection(db, "mensajes"), objeto);
        commit
      }
    },
    async delMessage(commit,objeto) {
      if (objeto != "") {
        console.log(objeto)
        const db = getFirestore();
        await deleteDoc(doc(db, "mensajes", objeto));
        commit
      }
    },
    async editMessage(commit,objeto) {
      if (objeto != "") {
        console.log(objeto)
        const db = getFirestore();
        await setDoc(doc(db, "mensajes", objeto[0]), objeto[1]);
        commit
      }
    },

  },
  modules: {
  }
})
