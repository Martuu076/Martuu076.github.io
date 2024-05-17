function agregarFicha2(imagen,nombre,descripcion){
    document.write('<div class="ficha_cine">');
    document.write('                    <img src="Imagenes/borde_cine.png" width="200" alt="Banda de pelicula de cine">');  
    document.write('                    <img src="');
    document.write(imagen);
    document.write('" width="200" height="170" alt="Foto de Gatito llamado '+nombre+'">');  
    document.write('                    <img src="Imagenes/borde_cine.png" width="200" alt="Banda de pelicula de cine">'); 
   /* document.write('                    <p><b>'+nombre+': </b>');*/
    document.write('                    <div class="descripcion" title="'+descripcion+'"><b>'+nombre+': </b>'+descripcion+ '<a href="Adopcion.html"> Adoptar </a> </div> ');
    /*document.write('                    <a href="#">mas info...</a>');*/
    /*document.write('                    </p>');*/
    document.write('</div>');
  }
//agrego una ficha
//  agregarFicha();38
//agrego varias fichas como si vinieran de un query (por ahora no se como hacerlo)

const fotos = ["Imagenes/Micho.png","Imagenes/Coral.png","Imagenes/Garfield.png","Imagenes/Nino.png","Imagenes/Turron.png","Imagenes/Hunter.png","Imagenes/Kimba.png","Imagenes/Antonia.png","Imagenes/Flaco.png","Imagenes/Calamity_James.png"];
const nombres = ["Micho","Coral","Garfield","Nino","Turron","Hunter","Kimba","Antonia","Flaco","Calamity James"];
const descripcion = [
  "Muy juguetón y cariñoso.",
  "Le encanta dormir en las tardes al sol.",
  "Sociable y amigable con otros animales.",
  "Le gusta explorar y descubrir nuevos lugares.",
  "Tierno y dulce, busca un hogar amoroso.",
  "Independiente pero disfruta de la compañía humana.",
  "Curioso y juguetón, ideal para una familia activa.",
  "Muy comunicativo y le encanta recibir mimos.",
  "Adora las caricias y busca un compañero de juegos.",
  "Cariñoso y tranquilo, perfecto para un hogar tranquilo."
];

//var cantidad = Number.parseInt(prompt("Ingrese cuantos gatitos"));//el usuario indica cuantos gatitos va a haber
var cantidad = Math.floor(2+Math.random() * 7); //entre 2 y 8 gatitos
for(i=0;i<cantidad;i++){
    agregarFicha2(fotos[i%10],nombres[i%10],descripcion[i%10]);
}

