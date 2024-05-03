function agregarFicha2(imagen,nombre,descripcion){
    document.write('<div class="ficha_cine">');
    document.write('                    <img src="../Imagenes/borde_cine.png" width="200" alt="Banda de pelicula de cine">');  
    document.write('                    <img src="');
    document.write(imagen);
    document.write('" width="200" height="170" alt="Foto de Gatito llamado '+nombre+'">');  
    document.write('                    <img src="../Imagenes/borde_cine.png" width="200" alt="Banda de pelicula de cine">'); 
    document.write('                    <p><b>'+nombre+': </b>');
    /*document.write('                    <div><p>'+descripcion+'</p></div> ')*/
    document.write('                    <a href="#">mas info...</a>');
    document.write('                    </p>');
    document.write('</div>')
  }
//agrego una ficha
//  agregarFicha();38
//agrego varias fichas como si vinieran de un query (por ahora no se como hacerlo)

const fotos = ["../Imagenes/Micho.png","../Imagenes/Coral.png","../Imagenes/Garfield.png","../Imagenes/Nino.png","../Imagenes/Turron.png","../Imagenes/Hunter.png","../Imagenes/Kimba.png","../Imagenes/Antonia.png","../Imagenes/Flaco.png","../Imagenes/Calamity James.png"];
const nombres = ["Micho","Coral","Garfield","Nino","Turron","Hunter","Kimba","Antonia","Flaco","Calamity James"];
const descripcion = [
  "Gatito blanco con manchas grises. Muy juguetón y cariñoso.",
  "Gatito negro de ojos amarillos. Le encanta dormir en las tardes al sol.",
  "Gatito atigrado de pelaje corto. Sociable y amigable con otros animales.",
  "Gatito gris con rayas blancas en el pecho. Le gusta explorar y descubrir nuevos lugares.",
  "Gatito blanco y negro de orejas grandes. Tierno y dulce, busca un hogar amoroso.",
  "Gatito naranja de pelo largo. Independiente pero disfruta de la compañía humana.",
  "Gatito tricolor de ojos verdes. Curioso y juguetón, ideal para una familia activa.",
  "Gatito siamés de ojos azules. Muy comunicativo y le encanta recibir mimos.",
  "Gatito gris con patitas blancas. Adora las caricias y busca un compañero de juegos.",
  "Gatito negro con una mancha blanca en la nariz. Cariñoso y tranquilo, perfecto para un hogar tranquilo."
];

var cantidad = Number.parseInt(prompt("Ingrese cuantos gatitos"));
for(i=0;i<cantidad;i++){
    agregarFicha2(fotos[i%10],nombres[i%10],descripcion[i%10]);
}

