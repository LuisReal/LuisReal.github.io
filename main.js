var lista_clientes = new Lista();
var avl_peliculas = new AVL();
var abb_actores = new ABB();
var tabla_hash = new TablaHash(20);
var lista_blockchain = new ListaBloque();
var merkle = new Merkle()
var lista_peliculas = new ListaPeliculas();
var index = 0
var previous_hash = 0
var nonce = 0
var reloj = document.getElementById('clock');
var cont = 0;
var tiempo_inicial = 300;
var intervalo;
var datos = "";
var new_time = document.getElementById('new-time');


setTime(tiempo_inicial);

function setTime(time){
    clearInterval(intervalo);
    console.log("\n\nEL NUEVO TIEMPO ES "+time)
    intervalo = setInterval(millamada, (1000*time));
    
}

function millamada(){
    
    blockchain()
}

function tiempo(){
    var tiempo_nuevo = parseInt(new_time.value);
    
    setTime(tiempo_nuevo)
    new_time.value=""
}

document.getElementById('btn-tiempo').addEventListener('click', tiempo);

var data ="";

var nombre_cliente = "";
//dpi, name, username, email, password, phone
lista_clientes.insertar(new Cliente(2354168452525, "Oscar Armin", "EDD", "","12345678", 12345678));



var div_login = document.getElementById('div-login');
var div_administrador = document.getElementById('div-administrador');
var div_usuario = document.getElementById('div-usuario');
var div_blockchain = document.getElementById('div-blockchain');
var div_pelicula = document.getElementById('div-pelicula');
var div_actores = document.getElementById('div-actores');
var div_categorias = document.getElementById('div-categorias');
/*
var div_navbar = document.getElementById('navbar-inicio');
*/


//**************************************************INTERFAZ LOGIN**************************************** */
function showLogin(){
    
    

    if(div_administrador.style.display == "block"){
        div_administrador.style.display = "none";
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_pelicula.style.display == "block"){
        div_pelicula.style.display = "none";
    }else if(div_blockchain.style.display == "block"){
        div_blockchain.style.display = "none";
    }else if(div_actores.style.display == "block"){
        div_actores.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        div_categorias.style.display = "none";
    }

    div_login.style.display="block";

}


document.getElementById('login').addEventListener('click', showLogin, false);



//**************************************************ACCEDER LOGIN**************************************** */
function login(){
    var username = document.getElementById('username-login');
    var password = document.getElementById('password-login');
    var boton_radio = document.getElementById('boton-radio');

    var nodo = lista_clientes.buscar(username.value, password.value);

    if(nodo != null){
        if(boton_radio.checked && nodo.cliente.username == "EDD"){
            username.value = "";
            password.value = "";
            boton_radio.checked = false;
            console.log("Bienvenido administrador");
            showAdministrator();
        }else if(nodo.cliente.username != "EDD"){
            console.log("Bienvenido Cliente");
            username.value = "";
            password.value = "";
            boton_radio.checked = false;
            nombre_cliente = nodo.cliente.name
            showUser();
        }
        

    }else{
        console.log("usuario o contrasena son incorrectos")
    }


}

document.getElementById('enviar-login').addEventListener('click', login, false);

function showUser(){
    if(div_login.style.display == "block"){
        div_login.style.display = "none"
    }else if(div_administrador.style.display == "block"){
        div_administrador.style.display = "none"
    }else if(div_pelicula.style.display == "block"){
        div_pelicula.style.display = "none";
    }else if(div_blockchain.style.display == "block"){
        div_blockchain.style.display = "none";
    }else if(div_actores.style.display == "block"){
        div_actores.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        div_categorias.style.display = "none";
    }

    div_usuario.style.display = "block";

    var usuario = document.getElementById('h-usuario')
    usuario.innerText = `Bienvenido `+ nombre_cliente

    

}

var tabla = document.getElementById('tabla-peliculas');
var tbody = document.createElement('tbody');

function createTable(nodo){
    if(nodo != null){
        var fila = document.createElement('tr');
        
        var td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:center">`+nodo.pelicula.nombre_pelicula+`</p>`
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:justify"> `+nodo.pelicula.descripcion+`</p>`
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:center">Q `+nodo.pelicula.precio_q+`</p>`;
        fila.appendChild(td);
        
        td = document.createElement('td');
        td.innerHTML =`
        <button class="btn btn-danger botones-informacion" id="`+nodo.pelicula.id_pelicula+`" value="`+nodo.pelicula.id_pelicula+`">Informacion</button>`;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <button class="btn btn-primary botones-alquilar" id="`+nodo.pelicula.id_pelicula+`" value="`+nodo.pelicula.id_pelicula+`">Alquilar</button>`;
        fila.appendChild(td);

        tbody.appendChild(fila);
        
        createTable(nodo.izquierda)
        createTable(nodo.derecha)

    }
   
    tabla.appendChild(tbody);
}



function getPelicula(id){
    var id_pelicula = document.getElementById(id).value;
    console.log("\n\nid_pelicula: "+id_pelicula)
    var nodo = avl_peliculas.buscar(id_pelicula);
    if(nodo != null){
        console.log("el nombre pelicula es: "+nodo.pelicula.nombre_pelicula)
        data = nombre_cliente + nodo.pelicula.nombre_pelicula;
        datos += nombre_cliente +" "+ nodo.pelicula.nombre_pelicula +"\n";
        merkle.insertar(data);
        data = "";
        
    }
     
}



var nodo_pelicula;
var label_p =document.getElementById('p-comentario');
var btn_alquilar = document.getElementById('alquilar');

function showPelicula(id){
    if(div_login.style.display == "block"){
        div_login.style.display = "none"
    }else if(div_administrador.style.display == "block"){
        div_administrador.style.display = "none"
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_blockchain.style.display == "block"){
        div_blockchain.style.display = "none";
    }else if(div_actores.style.display == "block"){
        div_actores.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        div_categorias.style.display = "none";
    }


    div_pelicula.style.display = "block"

    

    var titulo = document.getElementById('titulo-pelicula')
    var descripcion = document.getElementById('descripcion-pelicula')
    var id = document.getElementById(id).value

    btn_alquilar.setAttribute("id", id)
    console.log("El id del boton alquilar es: "+document.getElementById(id).value)
    btn_alquilar.addEventListener('click', getPelicula.bind(document.getElementById(id)))

    nodo_pelicula = avl_peliculas.buscar(id)

    if(nodo_pelicula != null){
        titulo.innerHTML = nodo_pelicula.pelicula.nombre_pelicula
        descripcion.innerHTML = nodo_pelicula.pelicula.descripcion
    }

    //var div_comentarios = document.getElementById('comentarios');
    console.log("buscando pelicula en showPelicula con id: "+id)
    var busqueda = lista_peliculas.buscar(parseInt(id))
    label_p.innerText = ""
    if(busqueda != null){
        console.log("La pelicula buscada es: "+busqueda.id_pelicula)
        var temp = lista_peliculas.buscar(id).lista_comentarios.primero;
        while(temp != null){
            label_p.innerText += temp.usuario+ ` :  ` +temp.comentario+ `\n`;
            //div_comentarios.appendChild(label_p);
            temp = temp.siguiente;
        }
    }else{
        console.log("No se encontro la pelicula")
    }
    
    //lista_comentarios.buscar(nodo_pelicula.pelicula.id_pelicula);
    
}

function modificarPuntuacion(){
    var puntuacion = document.getElementById('puntuacion')

    nodo_pelicula.pelicula.puntuacion_star = parseInt(puntuacion.value);
    console.log("\n\nLa nueva puntuacion es: "+nodo_pelicula.pelicula.puntuacion_star);
    
    puntuacion.value = ""
}

document.getElementById('modificar-puntuacion').addEventListener('click', modificarPuntuacion);


function publicarComentario(){
    var id_comentario = document.getElementById('comentario');
    var comentario = id_comentario.value;
    //usuario, comentario, id_pelicula
    console.log("Insertando id pelicula a la lista: "+nodo_pelicula.pelicula.id_pelicula)
    lista_peliculas.insertar(parseInt(nodo_pelicula.pelicula.id_pelicula));
    var busqueda = lista_peliculas.buscar(parseInt(nodo_pelicula.pelicula.id_pelicula))
    console.log("Mostrando id pelicula recien insertada "+busqueda.id_pelicula)
    if(busqueda != null){
        busqueda.lista_comentarios.insertar(comentario, nombre_cliente);
    }
    

    id_comentario.value = "";

    //var div_comentarios = document.getElementById('comentarios');
    
    label_p.innerText += nombre_cliente+` :  `+comentario+`\n`
    //div_comentarios.appendChild(label_p);
        
}

document.getElementById('btn-publicar').addEventListener('click', publicarComentario);

function regresar(){
    
    if(div_pelicula.style.display == "block"){
        div_pelicula.style.display = "none";
    }

    div_usuario.style.display = "block"
}

document.getElementById('btn-regresar').addEventListener('click', regresar);

function regresarActores(){
    
    if(div_actores.style.display == "block"){
        div_actores.style.display ="none"
    }

    div_usuario.style.display = "block"
}

document.getElementById('btn-regresar-actores').addEventListener('click', regresarActores);

function regresarCategorias(){
    
    if(div_categorias.style.display == "block"){
        div_categorias.style.display ="none"
    }

    div_usuario.style.display = "block"
}

document.getElementById('btn-regresar-categorias').addEventListener('click', regresarCategorias);
//**************************************************SECCION ADMINISTRADOR**************************************** */

function showAdministrator(){
   
    if(div_login.style.display == "block"){
        div_login.style.display = "none";
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_pelicula.style.display == "block"){
        div_pelicula.style.display = "none";
    }else if(div_blockchain.style.display == "block"){
        div_blockchain.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        div_categorias.style.display = "none";
    }else if(div_actores.style.display == "block"){
        div_actores.style.display = "none";
    }


    //div_navbar.style.display = "none";
    div_administrador.style.display="block";
    
}

function cargaArchivo(){
    var archivo = document.getElementById('carga-archivo');
    archivo.click();
    archivo.addEventListener('change', readFile, false);
}

document.getElementById('btn-peliculas').addEventListener('click', cargaArchivo, false);
document.getElementById('btn-clientes').addEventListener('click', cargaArchivo, false);
document.getElementById('btn-actores').addEventListener('click', cargaArchivo, false);
document.getElementById('btn-categorias').addEventListener('click', cargaArchivo, false);

function readFile(e) { 
    var file = e.target.files[0]; // files[0] es cero porque solo se selecciona un archivo(el primero)
    var nombre = file.name;
    console.log("nombre del archivo: "+nombre);
    if (!file) { return; } 
    var reader = new FileReader(); 
    reader.onload = function(e) {
         
        var contents = e.target.result; // guarda un string
        
        var obj = JSON.parse(contents);
        //dpi, name, username, email, password, phone
        if(nombre =="Clientes.json"){
            for(a in obj){
                lista_clientes.insertar(new Cliente(obj[a].dpi, obj[a].nombre_completo, obj[a].nombre_usuario, obj[a].correo, obj[a].contrasenia, obj[a].telefono) );
            }
    
            //lista_clientes.print();
        }else if(nombre == "Peliculas.json"){
            //id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precion_Q, paginas, categoria
            for(a in obj){
                avl_peliculas.insertar(new Pelicula(obj[a].id_pelicula, obj[a].nombre_pelicula, obj[a].descripcion, obj[a].puntuacion_star, obj[a].precion_Q, obj[a].paginas, obj[a].categoria));

            }
            createTable(avl_peliculas.raiz);

            const botones_alquilar = document.querySelectorAll(".botones-alquilar");
            botones_alquilar.forEach(function(e) {

                e.addEventListener("click", function(){
                    getPelicula(e.id);
                });
            });

            const botones_informacion = document.querySelectorAll(".botones-informacion");
            botones_informacion.forEach(function(e) {

                e.addEventListener("click", function(){
                    showPelicula(e.id);
                });
            });
            
        }else if(nombre == "Actores.json"){
            //id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_q, paginas, categoria
            for(a in obj){
                abb_actores.insertar(new Actor(obj[a].dni, obj[a].nombre_actor, obj[a].correo, obj[a].descripcion));

            }

            
        }else if(nombre == "Categorias.json"){
            for(a in obj){
                
                tabla_hash.dispersion(obj[a].id_categoria, obj[a].company);
                
                //tablaHash(obj[a].id_categoria, obj[a].company);
            }
            
            
        }

    }; 
    reader.readAsText(file);
    
} 


function graficaPeliculas(){
    avl_peliculas.graficar();
}


document.getElementById('grafica-peliculas').addEventListener('click', graficaPeliculas, false);

function graficaClientes(){
    lista_clientes.graficar();
}


document.getElementById('grafica-clientes').addEventListener('click', graficaClientes, false);

function graficaActores(){
    abb_actores.graficar();
}
document.getElementById('grafica-actores').addEventListener('click', graficaActores, false);


function graficaCategorias(){
    tabla_hash.lista_tabla.graficar();
}
document.getElementById('grafica-categorias').addEventListener('click', graficaCategorias, false);


//*****************************************BLOCKCHAIN****************************************** */
function showBlockchain(){

    if(div_login.style.display == "block"){
        div_login.style.display = "none";
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_administrador.style.display =="block"){
        div_administrador.style.display = "none";
    }else if(div_pelicula.style.display =="block"){
        div_pelicula.style.display = "none";
    }else if(div_actores.style.display == "block"){
        div_actores.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        
        div_categorias.style.display = "none";
    }

    div_blockchain.style.display ="block";

    
}

document.getElementById('btn-blockchain').addEventListener('click', showBlockchain, false);


var hash ="";
function blockchain(){
    merkle.auth();
    merkle.graficar();
    var date = new Date()
    
    const formatDate = (date)=>{
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "-::" + date.getHours() + ":"+date.getMinutes() + ":" + date.getSeconds()
            return formatted_date;
    }
    
    var timestamp = formatDate(date)
    
    if(lista_blockchain.primero == null){
        console.log("el nodo raiz de blockchain es null")
        hash = index.toString() + timestamp + "00" + merkle.raiz.hash + nonce.toString()
        while(hash.substring(0,2) != "00"){
            hash = sha256(hash);
            nonce += 1
        }
        //index, timestamp, previous_hash, rootmerkle, nonce
        lista_blockchain.insertar(index, timestamp, "00", merkle.raiz.hash, nonce, hash, datos);
        nonce =0;
        
        
    }else{
        var nodo_anterior = lista_blockchain.ultimo
        
        index = nodo_anterior.index +1
       
        previous_hash = nodo_anterior.hash

        hash = index.toString() + timestamp + previous_hash + merkle.raiz.hash + nonce.toString()

        while(hash.substring(0,2) != "00"){
            hash = sha256(hash);
            nonce += 1
        }

        
        lista_blockchain.insertar(index, timestamp, previous_hash, merkle.raiz.hash, nonce, hash, datos);
        nonce = 0
        
        
    }
    datos = "";
    merkle = "";
    merkle = new Merkle(); // se crea un nuevo arbol merkle
    
    reloj.innerHTML = `Bloque ` +cont
    cont++
    lista_blockchain.graficar();
    
}


document.getElementById('btn-bloque').addEventListener('click', blockchain, false);


//*******************************************INTERFAZ ACTORES********************************* */
var boton_radio_preorden = document.getElementById('btn-preorden')
var boton_radio_inorden = document.getElementById('btn-inorden')
var boton_radio_postorden = document.getElementById('btn-postorden')

var tabla_actores;
var tbody_actor;



function showActores(){
    if(div_login.style.display == "block"){
        div_login.style.display = "none";
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_administrador.style.display =="block"){
        div_administrador.style.display = "none";
    }else if(div_pelicula.style.display =="block"){
        div_pelicula.style.display = "none";
    }else if(div_blockchain.style.display =="block"){
        div_blockchain.style.display = "none";
    }else if(div_categorias.style.display == "block"){
        div_categorias.style.display = "none";
    }

    div_actores.style.display ="block";

}


document.getElementById('btn-ver-actores').addEventListener('click', showActores, false);

function radioButtons(){
    if(document.getElementById("btn-preorden").checked) {
        if(!tabla_actores){
            console.log("No existe etiqueta tbody_actor")
        }else{
            console.log("Removiendo etiqueta tbody_actor")
            tabla_actores.removeChild(tabla_actores.getElementsByTagName("tbody")[0]);
        }

        tabla_actores = document.getElementById('tabla-actores');
        tbody_actor = document.createElement('tbody');
        crearTablaActoresPreorden(abb_actores.raiz)

    }else if(document.getElementById("btn-inorden").checked){
        
        if(!tabla_actores){
            console.log("No existe etiqueta tbody_actor")
        }else{
            console.log("Removiendo etiqueta tbody_actor")
            tabla_actores.removeChild(tabla_actores.getElementsByTagName("tbody")[0]);
        }

        tabla_actores = document.getElementById('tabla-actores');
        tbody_actor = document.createElement('tbody');
        crearTablaActoresInorden(abb_actores.raiz)

    }else if(document.getElementById("btn-postorden").checked){
        if(!tabla_actores){
            console.log("No existe etiqueta tbody_actor")
        }else{
            console.log("Removiendo etiqueta tbody_actor")
            tabla_actores.removeChild(tabla_actores.getElementsByTagName("tbody")[0]);
            
        }

        tabla_actores = document.getElementById('tabla-actores');
        tbody_actor = document.createElement('tbody');
        crearTablaActoresPostorden(abb_actores.raiz)
    }
}

document.getElementById('radio-validar').addEventListener('click', radioButtons, false);

function crearTablaActoresPreorden(nodo){
    if(nodo != null){
        var fila = document.createElement('tr');
        
        var td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:center">`+nodo.actor.nombre_actor+`</p>`
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:justify"> `+nodo.actor.descripcion+`</p>`
        fila.appendChild(td);

        tbody_actor.appendChild(fila);
        
        crearTablaActoresPreorden(nodo.izquierda)
        crearTablaActoresPreorden(nodo.derecha)

    }
   
    tabla_actores.appendChild(tbody_actor);
}

function crearTablaActoresInorden(nodo){
    if(nodo != null){
        
        crearTablaActoresInorden(nodo.izquierda)
        
        var fila = document.createElement('tr');
        
        var td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:center">`+nodo.actor.nombre_actor+`</p>`
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:justify">`+nodo.actor.descripcion+`</p>`
        fila.appendChild(td);

        tbody_actor.appendChild(fila);
        
        crearTablaActoresInorden(nodo.derecha)

    }
   
    tabla_actores.appendChild(tbody_actor);
}


function crearTablaActoresPostorden(nodo){
    if(nodo != null){
        
        crearTablaActoresPostorden(nodo.izquierda)
        crearTablaActoresPostorden(nodo.derecha)

        var fila = document.createElement('tr');
        
        var td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:center" > `+nodo.actor.nombre_actor+`</p>`
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerHTML =`
        <p style="text-align:justify">`+nodo.actor.descripcion+`</p>`
        fila.appendChild(td);

        tbody_actor.appendChild(fila);

    }
   
    tabla_actores.appendChild(tbody_actor);
}

//*******************************************INTERFAZ CATEGORIAS********************************* */


function showCategorias(){
    if(div_login.style.display == "block"){
        div_login.style.display = "none";
    }else if(div_usuario.style.display == "block"){
        div_usuario.style.display = "none";
    }else if(div_administrador.style.display =="block"){
        div_administrador.style.display = "none";
    }else if(div_pelicula.style.display =="block"){
        div_pelicula.style.display = "none";
    }else if(div_blockchain.style.display =="block"){
        div_blockchain.style.display = "none";
    }else if(div_actores.style.display =="block"){
        div_actores.style.display = "none";
    }

    div_categorias.style.display ="block";

    var temp1 = tabla_hash.lista_tabla.primero;
    var contador =0;

    var fila = document.createElement('tr');
    var tabla_categorias = document.getElementById('tabla-categorias');
    var tbody_categorias = document.createElement('tbody')

    while(temp1 != null){
        
        if(temp1.lista_categorias.primero != null){
            var temp2 = temp1.lista_categorias.primero;
            while(temp2 != null){
                console.log("Estoy en ciclo while de categorias")
                if(contador < 3){
                    var td = document.createElement('td');
                    
                    td.innerHTML =`<div class="card" style="width: 10rem;">
                        <img src="pelicula.jpg" class="card-img-top" >
                        <div class="card-body">
                            <h5 class="card-title">ID: `+temp2.id_categoria+`</h5>
                            <p class="card-text">Company: `+temp2.company+`</p>
                            
                        </div>
                    </div>`;
                    
                    fila.appendChild(td);

                    contador += 1;
                }else{
                    tbody_categorias.appendChild(fila);
                    fila = document.createElement('tr');
                    contador = 0;
                }
                temp2 = temp2.siguiente;
            }
        }
        
        temp1 = temp1.abajo;
    
    }
    tbody_categorias.appendChild(fila);
    tabla_categorias.appendChild(tbody_categorias);

}

document.getElementById('btn-ver-categoria').addEventListener('click', showCategorias)





d3.select("#descargar-grafo")
.on('click', function(){
    // Get the d3js SVG element and save using saveSvgAsPng.js
    saveSvgAsPng(document.getElementsByTagName("svg")[0], "grafo_img.png", {scale: 3});
})