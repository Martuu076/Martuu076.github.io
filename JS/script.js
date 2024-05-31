function mostrarFormulario(){ 
  var formulario = document.getElementById('Formulario'); 
  formulario.style.display="flex";
}
function cerrarFormulario(){
var formulario = document.getElementById('Formulario');
formulario.style.display="none";
}
function showInp(){
  getSelectValue = document.getElementById("reason").value;
  if(getSelectValue=="Donacion"){
    document.getElementById("eco").style.display = "flex";
    document.getElementById("vol").style.display = "none";
    document.getElementById("obj").style.display = "none";
  }else if(getSelectValue=="Voluntariado"){
    document.getElementById("eco").style.display = "none";
    document.getElementById("vol").style.display = "flex";
    document.getElementById("obj").style.display = "none";
  }else if(getSelectValue=="Donacion Material"){
    document.getElementById("eco").style.display = "none";
    document.getElementById("vol").style.display = "none";
    document.getElementById("obj").style.display = "flex";
  }
}