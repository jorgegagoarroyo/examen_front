"use strict";(self["webpackChunkexamen_front"]=self["webpackChunkexamen_front"]||[]).push([[592],{592:function(t,s,a){a.r(s),a.d(s,{default:function(){return y}});var e=a(252);const o={class:"usuario"};function r(t,s,a,r,i,n){const c=(0,e.up)("lista-usuarios");return(0,e.wg)(),(0,e.iD)("div",o,[(0,e.Wm)(c)])}var i=a(577);const n={class:"container mt-4"},c=(0,e._)("div",{class:"circulo border mt-2 mb-2 ms-4"},null,-1),l={class:"col d-flex justify-content-center align-items-center"},u={class:"col d-flex justify-content-center align-items-center"},m={class:"col-3 ms-4 d-flex justify-content-center align-items-center"},d={class:"row"},h={class:"col-4"},p=["onClick"];function f(t,s,a,o,r,f){return(0,e.wg)(),(0,e.iD)("div",n,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(r.usuarios,(t=>((0,e.wg)(),(0,e.iD)("div",{class:"row border rounded m-1 elemento d-flex aling-items-center",key:t._id},[c,(0,e._)("div",l,(0,i.zw)(t.nombre),1),(0,e._)("div",u,(0,i.zw)(t.email),1),(0,e._)("div",m,[(0,e._)("div",d,[(0,e._)("div",h,[(0,e._)("button",{class:"btn btn-danger",onClick:s=>f.borrarUsuario(t)},"Eliminar",8,p)])])])])))),128))])}var g={name:"ListaUsuarios",data(){return{usuarios:""}},methods:{async listaUsuarios(){try{let t=localStorage.getItem("mascotas"),s=JSON.parse(t).token,a=await fetch("https://api-mascotas-jorge.herokuapp.com/api/usuarios",{method:"get",headers:{authorization:`Bearer ${s}`,"Content-type":"application/json; charset=UTF-8"}}),e=await a.json();this.usuarios=e.usuarios}catch(t){console.log(t)}},async borrarUsuario(t){try{let s=localStorage.getItem("mascotas"),a=JSON.parse(s).token;await fetch(`https://api-mascotas-jorge.herokuapp.com/api/usuarios/${t._id}`,{method:"DELETE",headers:{authorization:`Bearer ${a}`,"Content-type":"application/json; charset=UTF-8"}})}catch(s){console.log(s)}this.listaUsuarios()}},mounted(){this.listaUsuarios()}},v=a(744);const w=(0,v.Z)(g,[["render",f]]);var b=w,k={name:"UsuariosView",components:{ListaUsuarios:b}};const _=(0,v.Z)(k,[["render",r]]);var y=_}}]);
//# sourceMappingURL=592.29155981.js.map