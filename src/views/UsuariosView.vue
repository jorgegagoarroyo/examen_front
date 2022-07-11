<template>
  <div class="usuario">
    <lista-usuarios/>  
  </div>
</template>

<script>
import ListaUsuarios from '@/components/ListaUsuarios.vue'

export default {
    name: "UsuariosView",
    components: {
        ListaUsuarios
    }
}
</script>

<style>

</style>