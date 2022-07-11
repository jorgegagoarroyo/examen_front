<template>
  <div class="login">
    <formulario-ingreso @ingresar-user="pasarLogin"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormularioIngreso from '@/components/FormularioIngreso.vue'

export default {
  name: 'LoginView',
  components: {
    FormularioIngreso
  },
  methods:{
    pasarLogin(){
      console.log("pasando act user")
      this.$emit("ingresarUser")
    }
  }
}
</script>