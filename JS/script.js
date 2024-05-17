function mostrarFormulario(){ 
    var formulario = document.getElementById('Formulario'); 
    formulario.style.visibility="visible";
    formulario.style.display="flex";
  }
function cerrarFormulario(){
  var formulario = document.getElementById('Formulario');
  formulario.style.visibility="hidden";
  formulario.style.display="none";
}