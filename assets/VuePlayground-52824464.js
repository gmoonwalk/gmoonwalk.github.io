import{g as p,i as v,h as c,s as n,j as g,v as m,k as y,l as a,I as f,m as w}from"./app-dc26d074.js";const R=e=>JSON.parse(decodeURIComponent(e));var V=p({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(e){const i=v(),o=c(!0),t=n(),l=n(),s=g(()=>m({},i,R(e.settings))),u=async()=>{const{ReplStore:r,Repl:d}=await w(()=>import("./vue-repl-81895ec7.js"),["assets/vue-repl-81895ec7.js","assets/app-dc26d074.js","assets/commonjs-dynamic-modules-302442b1.js","assets/commonjsHelpers-042e6b4d.js"]);t.value=d,l.value=new r({serializedState:decodeURIComponent(e.files)}),s.value.vueVersion&&await l.value.setVueVersion(s.value.vueVersion)};return y(async()=>{await u(),o.value=!1}),()=>[a("div",{class:"vue-playground-wrapper"},[e.title?a("div",{class:"header"},decodeURIComponent(e.title)):null,a("div",{class:"repl-container"},[o.value?a(f,{class:"preview-loading",height:192}):null,t.value?a(t.value,{store:l.value,autoResize:!0,...s.value,layout:"horizontal"}):null])])]}});export{V as default};