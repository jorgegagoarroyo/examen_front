
<template>
<div class="container mt-4">
        <div class="row border rounded m-1 elemento d-flex aling-items-center" v-for="usuario in usuarios" :key="usuario._id">
        <div class="circulo border mt-2 mb-2 ms-4"></div>
        <div class="col d-flex justify-content-center align-items-center">{{usuario.nombre}}</div>
        <div class="col d-flex justify-content-center align-items-center">{{usuario.email}}</div>
        <div class="col-3  ms-4 d-flex justify-content-center align-items-center">
            <div class="row">
                <!-- <div class="col-4">
                    <button class="btn btn-primary">Editar</button>
                </div> -->
                <div class="col-4">
                    <button class="btn btn-danger " @click="borrarUsuario(usuario)">Eliminar</button>
                </div>
            </div>
        </div>
        </div>
</div>
</template>

<script>
export default {
name: "ListaUsuarios",
data() {
    return {
        usuarios: ""
    }
},
methods:{
    async listaUsuarios(){
        try{
            let local = localStorage.getItem("mascotas")
            let localToken = JSON.parse(local).token
            let response = await fetch ("https://api-mascotas-jorge.herokuapp.com/api/usuarios",{
                method: "get",
                headers: {
                    'authorization' : `Bearer ${localToken}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            let users = await response.json()
            this.usuarios = users.usuarios
            //console.log(users)
        }catch(error){
            console.log(error)
        }
    },
    async borrarUsuario(usuario){
        //console.log(usuario)
        try{
            let local = localStorage.getItem("mascotas")
            let localToken = JSON.parse(local).token
            await fetch (`https://api-mascotas-jorge.herokuapp.com/api/usuarios/${usuario._id}`,{
                method: "DELETE",
                headers:{
                    'authorization' : `Bearer ${localToken}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
        })
        }catch(error){
            console.log(error)
        }
        this.listaUsuarios()
    } 
},
mounted(){
    this.listaUsuarios()
}
}
</script>

<style scope>
.circulo{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin: 5 15px;
    background-color: cadetblue;
}

</style>