<template>
<div class="container ">
    <div class="row overflow-hidden" v-show="registrado && !nueva" @click="crearNueva">
        <button class="btn btn-success col-2 offset-5 ">+</button>
    </div>
    <div class="row border rounded mt-4 mb-4 p-2" v-show="nueva">
        <form>
            <div class="row">
                <label>Nombre</label>
                <input type="text" v-model="nombre">
            </div>
            <div class="row">
                <label >Descripción</label>
                <input type="text" v-model="descp">
            </div>
            <div class="row mt-2 mb-2">
                <!-- <label>Foto</label>
                <input class="form-control " ref="foto_mascota" type="file" @change="subirImagen">todavia no implementado -->
            </div>
            <div class="row overflow-hidden d-flex justify-content-center ">
                <div class="col-3 ">
                    <button class="btn btn-secondary" @click="finCrearMascota">Cancelar</button>
                </div>
                <div class="col-3">
                    <button class="btn btn-primary"  @click="agregarMascota">Agregar</button>
                </div>
            </div>
        </form>
    </div>

    <div class="row d-flex">
        <div class="mt-2 col-sm-12 col-md-6  col-xl-4" v-for="mascota in mascotas" :key="mascota._id">
            <div class="card">
                <img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_960_720.png" class="card-img-top  img-mascota" alt="img mascota">
                <div v-if="editando === mascota._id">
                    <div class="card-body">
                        <!-- <input class="form-control m-2" type="file"> -->
                        <h5 class="card-title">
                            <input type="text" class="col" v-model="mascota.nombre">
                            </h5>
                        <h5 class="card-text">
                            <input type="text" class="col " v-model="mascota.descripcion">
                        </h5>
                        <div class="card-text" v-show=" registrado == 'pasas'" >
                            <button class="btn btn-primary m-4 col-4" @click="editarMascota(mascota)">Guardar</button>
                            <button class="btn btn-secondary m-4 col-4" @click="finEditar(mascota)">Cancelar</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="card-body">
                        <h5 class="card-title">{{mascota.nombre}}</h5>
                        <p class="card-text">{{mascota.descripcion}}</p>
                        <div class="card-text" v-show=" registrado == 'pasas'" >

                            <button class="btn btn-primary m-4 col-4" @click="iniciarEdicion(mascota)">Editar</button>
                            <button class="btn btn-danger m-4 col-4" @click="borrarMascota(mascota)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  
</template>

<script>
export default {
name:"ListaMascotas",
data() {
    return {
        mascotas: [],
        registrado : "",
        nueva: false,
        nombre :"",
        descp:"", 
        editando : null,
        nombre_foto: "",
        datos : ""
    }
},
methods:{
    crearNueva(){
        this.nueva = true
    },
    finCrearMascota(){
        this.nueva = false
        this.nombre = "",
        this.descp = ""
    },
    async obtenerMascotas(){
        let listaMas = await fetch('https://api-mascotas-jorge.herokuapp.com/api/mascotas', {
            method:'GET'
        }),
        listaMas2 = await listaMas.json()
        //console.log(listaMas2.mascotas)
        this.mascotas =  listaMas2.mascotas
    },
    async agregarMascota(){
        try{
            let local =localStorage.getItem("mascotas")
            let localToken = (JSON.parse(local).token)
            if(!localToken){
                throw "no token"
            }
            await fetch('https://api-mascotas-jorge.herokuapp.com/api/mascotas', {
                method:'POST',
                headers: { 
                    'authorization': `Bearer ${localToken}`,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body:JSON.stringify({
                    'nombre': `${this.nombre}`,
                    'desc': `${this.descp}`,
                    // 'foto': `${this.nombre_foto}`

                }),
                
            }),
            this.finCrearMascota()
            this.obtenerMascotas()
        }catch(error){
            console.log(error)
        }
    },
    iniciarEdicion(mascota){
        this.editando = mascota._id
    },
    async editarMascota(mascota){
        //console.log("mascota ", mascota.nombre, mascota.descripcion)

        try{
            
            let local =localStorage.getItem("mascotas")
            let localToken = (JSON.parse(local).token)
            if(!localToken){
                throw "no token"
            }
            //let nuevosDatos = ""
            let editado = await fetch(`https://api-mascotas-jorge.herokuapp.com/api/mascotas/${mascota._id}`, {
                method:'PUT',
                body:
                    JSON.stringify({
                        'nombre' : `${mascota.nombre}`,
                        'desc': `${mascota.descripcion}`
                    })
                ,
                headers:{
                    'authorization': `bearer ${localToken}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            //console.log(editado)
            if( editado.status != 200){
                throw "error al editar"
            }
            this.editando = null
            this.obtenerMascotas()
        }catch(error){
            console.log(error)
        }
    },
    finEditar(mascota){
        //console.log(mascota)
        mascota
        this.editando = null
        this.obtenerMascotas()
    },

    async borrarMascota(mascota){
        try{
            
            let local =localStorage.getItem("mascotas")
            let localToken = (JSON.parse(local).token)
            if(!localToken){
                throw "no token"
            }
            let editado = await fetch(`https://api-mascotas-jorge.herokuapp.com/api/mascotas/${mascota._id}`, {
                method:'DELETE',
                headers:{
                    authorization: `bearer ${localToken}`
                }
            })
            if( editado.status != 200){
                throw "error al borrar"
            }
            this.obtenerMascotas()
        }catch(error){
            console.log("borrar error "+error)
        }
    },
    async estadoUser(){
        let valor = localStorage.getItem("mascotas")
        if(valor){
            valor = await JSON.parse(valor)
            this.registrado = valor.rolAct
        }
    },
    async subirImagen(){
        console.log("enviamos")
        console.log(this.$refs.foto_mascota.value)
        let local =localStorage.getItem("mascotas")
        let localToken = (JSON.parse(local).token)
        const formData = new FormData()
        let file = this.$refs.foto_mascota.files[0]
        formData.append( 'foto_subir', file)

        console.log("foto_subir ",file)
        try{
            let name_foto = await fetch("https://api-mascotas-jorge.herokuapp.com/api/upload", {
            method: "post",

            body: formData,
            headers:{
                    authorization: `bearer ${localToken}`
                }
        })
        name_foto = await name_foto.json()
        this.nombre_foto = name_foto.name
        console.log(this.nombre_foto)

        }catch(error){
            console.log(error)
        }

        
    }
},
mounted(){
    this.obtenerMascotas()
    this.estadoUser()
}
}
</script>

<style scope>
.img-mascota{
    background-color: lightgray;
    height: 250px;
}
</style>













 <!-- <div v-if="editando === mascota._id">
            <input type="text" class="col" v-model="mascota.nombre">
            <input type="text" class="col m-1" v-model="mascota.descripcion">
            <div class="col-3  ms-4">
                <div class="row" v-show=" registrado == 'pasas'">
                    <div class="col-4">
                        <button class="btn btn-primary" @click="editarMascota(mascota)">Guardar</button>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-secondary" @click="finEditar(mascota)">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="col">{{mascota.nombre}}</div>
            <div class="col m-1">{{mascota.descripcion}}</div>
            <div class="col-3  ms-4">
                <div class="row" v-show=" registrado == 'pasas'">
                    <div class="col-4">
                        <button class="btn btn-primary" @click="iniciarEdicion(mascota)">Editar</button>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-danger" @click="borrarMascota(mascota)">Eliminar</button>
                    </div>
                </div>
            </div>
        </div> -->