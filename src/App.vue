<template>
  <!-- Logo superior cabezera -->
  <TitleLogo />

  <!-- Grilla superior -->

  <el-row :gutter="10">
    <!-- Columna invisible para centrar responsivo -->

    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"
      ><div class="grid-content bg-purple"></div
    ></el-col>

    <!-- Columna que contiene los mensajes -->

    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <div class="grid-content_up bg-purple-light">
        <!-- elemento que encapsula los mensajes para agregar un scrollbar-->
        <el-scrollbar always @scroll="200" height="600px">
          <!-- iterador de los mensajes de firebase -->
          <div class="mensaje" v-for="value in mensajes" :key="value.id">
            <li>
              <!-- burbuja de chat -->

              <div class="mensaje_burbuja">
                <!--controles editar y eliminar invisibles si no son hover -->
                <div class="mensaje_controls">
                  <!-- boton de editar -->
                  <el-button
                    @click="
                      (dialogFormVisible = true),
                        setEditMessage(value.data.texto)
                    "
                    type="primary"
                    :icon="Edit"
                    circle
                  />
                  <!-- modal del boton editar -->
                  <el-dialog v-model="dialogFormVisible">
                    <el-input v-model="editMessage" autocomplete="off" />
                    <span class="dialog-footer">
                      <!-- boton cancelar edicion -->
                      <el-button @click="dialogFormVisible = false"
                        >Cancel</el-button
                      >
                      <!-- boton que gatilla la edicion -->
                      <el-button
                        type="primary"
                        @click="
                          (dialogFormVisible = false),
                            editFireStoreMessage(value.id, {
                              texto: editMessage, date: value.data.date
                            })
                        "
                        >Confirm</el-button
                      >
                    </span>
                  </el-dialog>

                  <!-- boton de eliminar -->
                  <el-button
                    @click="delMessage(value.id)"
                    type="danger"
                    :icon="Delete"
                    circle
                  />
                </div>
                <!-- mensaje de la burbuja -->
                <a>{{ value.data.texto }}</a>
              </div>
            </li>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
    <!--columna invisible usada para centrar-->
    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"
      ><div class="grid-content bg-purple"
    /></el-col>
  </el-row>

  <!--grilla inferior -->
  <el-row :gutter="10">
    <!--columna invisible usada para centrar-->
    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"
      ><div class="grid-content bg-purple"></div
    ></el-col>

    <!--columna que contiene el cuadro de texto y el boton enviar-->
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <div class="grid-content_down bg-purple-light">
        <!-- grilla interior usada para ordenar elementos de caja de texto y boton enviar-->
        <el-row :gutter="10">
          <!--cajita de texto-->
          <el-col :xs="21" :sm="22" :md="22" :lg="22" :xl="22"
            ><el-input
              v-on:keyup.enter="
                addMessage({ texto: newMessage, date: Date.now() })
              "
              v-model="newMessage"
              autocomplete="off"
          /></el-col>
          <!--boton enviar-->
          <el-col :xs="3" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              @click="addMessage({ texto: newMessage, date: Date.now() })"
              type="primary"
              :icon="Message"
            />
          </el-col>
        </el-row>
      </div>
    </el-col>

    <!--columna invisible usada para centrar-->

    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"
      ><div class="grid-content bg-purple"
    /></el-col>
  </el-row>
</template>


<script  setup>
//Importación de librerias de firebase
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
  orderBy,
} from "firebase/firestore";

//importacion de complementos adicionales de element plus
import { ElMessage } from "element-plus";

//importacion de iconos de element plis
import { Delete, Edit, Message } from "@element-plus/icons-vue";

//importacion de referenciacion de vue necesaria para hacer compatible elementos de element plus vue2 con vue3
//en este caso solo se usa para el dialog (modal de edicion)

import { ref } from "vue";
const dialogFormVisible = ref(false);
</script>

<script>
//importo el componente donde tengo el logo y el nombre de la app
import TitleLogo from "./components/TitleLogo.vue";

export default {
  name: "App",
  components: { TitleLogo },
  data() {
    return {
      mensajes: [],
      newMessage: "",
      editMessage: "",
    };
  },
  methods: {
    //obtencion de mensajes ordenados de forma ascendiente dependiendo de la fecha ingresada
    async getMessajes() {
      const db = getFirestore();
      const q = query(collection(db, "mensajes"), orderBy("date"));
      onSnapshot(q, (querySnapshot) => {
        const mensajes = [];
        this.mensajes = [];
        querySnapshot.forEach((doc) => {
          mensajes.push({ id: doc.id, data: doc.data() });
        });
        this.mensajes = mensajes;
        this.newMessage = "";
      });
    },

    //añadir nuevos elementos a firestore siempre cuando algo sea escrito en el mensaje (en este caso no valide los trim son las 2:14 tengo sueño)
    async addMessage(objeto) {
      if (this.newMessage != "") {
        const db = getFirestore();
        await addDoc(collection(db, "mensajes"), objeto);
        ElMessage({ message: "Mensaje enviado", type: "success" });
      } else {
        ElMessage({
          message: "Mensaje no puede estar en blanco",
          type: "error",
        });
      }
    },

    //eliminar elemenntos de firestore utilizando el identificador iterado
    async delMessage(Identifier) {
      const db = getFirestore();
      await deleteDoc(doc(db, "mensajes", Identifier));
      ElMessage({ message: "Mensaje eliminado", type: "success" });
    },

    //metodo que sirve para asignar de forma dinamica el contenido del cuadro de texto de edición con el mensaje iterado seleccionado
    setEditMessage(Message) {
      this.editMessage = Message;
    },

    //editar elementos de firestore utilizando el identificador iterado
    editFireStoreMessage(Identifier, objeto) {
      const db = getFirestore();
      setDoc(doc(db, "mensajes", Identifier), objeto);
    },
  },
  mounted() {
    //carga inicial de los mensajes de firestore
    this.getMessajes();
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px 4px 0% 0%;
  min-height: 36px;
}

.grid-content_up {
  border-radius: 4px 4px 0% 0%;
  min-height: 36px;
}

.grid-content_down {
  border-radius: 0px 0px 4px 4px;
  min-height: 36px;
  padding: 10px;
}

.mensaje {
  padding: 10px;
}

li {
  border-radius: 10px;
  list-style-type: none;
  display: flex;
  justify-content: end;
}

.mensaje_burbuja {
  background-color: cornflowerblue;
  color: white;
  padding-right: 20px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  display: inline-block;
  min-width: 200px;
  text-align: right;
}

.mensaje_burbuja:hover {
  background-color: rgb(58, 111, 211);
}

.mensaje_burbuja:hover > .mensaje_controls {
  display: flex;
}
.mensaje_controls {
  display: none;
  margin-left: -10px;
  margin-top: -10px;
  padding: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  justify-content: center;
  align-items: center;
}

.mensaje_burbuja_eliminar {
  width: 20px;
  height: 20px;
  background-color: rgb(255, 152, 152);
  border-radius: 100%;
  float: right;
}

.mensaje_burbuja_editar {
  width: 20px;
  height: 20px;
  background-color: rgb(255, 227, 137);
  border-radius: 100%;
  float: right;
}

li:hover > .mensaje_burbuja_editar {
  display: block;
}
</style>