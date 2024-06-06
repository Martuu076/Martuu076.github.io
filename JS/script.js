const fotos = ["Imagenes/Micho.png","Imagenes/Coral.png","Imagenes/Nino.png","Imagenes/Garfield.png","Imagenes/Turron.png","Imagenes/hunter.png","Imagenes/Kimba.png"];
const nombres = ["Micho","Coral","Nino","Garfield","Turron","Hunter","Kimba"];
function mostrarFormulario(caso){ 
  switch(caso){
    case 0:
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      break
    case 1:
      var img = document.getElementById("1"); 
      var nom = document.getElementById("a"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 2:
      var img = document.getElementById("2"); 
      var nom = document.getElementById("b"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 3:
      var img = document.getElementById("3"); 
      var nom = document.getElementById("c"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 4:
      var img = document.getElementById("4"); 
      var nom = document.getElementById("d"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 5:
      var img = document.getElementById("5"); 
      var nom = document.getElementById("e"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 6:
      var img = document.getElementById("6"); 
      var nom = document.getElementById("f"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
    case 7:
      var img = document.getElementById("7"); 
      var nom = document.getElementById("g"); 
      var formulario = document.getElementById("Formulario"); 
      formulario.style.display="flex";
      img.style.display="flex";
      nom.style.display="flex";
      break
  }
}
function cerrarFormulario(){
var formulario = document.getElementById("Formulario");
formulario.style.display="none";
var img1 = document.getElementById("1"); 
var nom1 = document.getElementById("a"); 
var img2 = document.getElementById("2"); 
var nom2 = document.getElementById("b"); 
var img3 = document.getElementById("3"); 
var nom3 = document.getElementById("c"); 
var img4 = document.getElementById("4"); 
var nom4 = document.getElementById("d"); 
var img5 = document.getElementById("5"); 
var nom5 = document.getElementById("e"); 
var img6 = document.getElementById("6"); 
var nom6 = document.getElementById("f"); 
var img7 = document.getElementById("7"); 
var nom7 = document.getElementById("g"); 
img1.style.display="none";
nom1.style.display="none";
img2.style.display="none";
nom2.style.display="none";
img3.style.display="none";
nom3.style.display="none";
img4.style.display="none";
nom4.style.display="none";
img5.style.display="none";
nom5.style.display="none";
img6.style.display="none";
nom6.style.display="none";
img7.style.display="none";
nom7.style.display="none";
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