//********************************************LISTA SIMPLE (CLIENTES)*********************************** */

class Cliente{
    constructor(dpi, name, username, email, password, phone){
        this.dpi = dpi;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        
    }
}
////dpi, name, username, password, phone, admin
class NodoLista{
    constructor(cliente){
        this.cliente = cliente;
        this.siguiente = null;
    }

    
}

class Lista{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(nodo_cliente){
        var new_nodo = new NodoLista(nodo_cliente);
        if(this.primero == null){
            this.primero = new_nodo;
            this.ultimo = new_nodo;
        }else{
            this.ultimo.siguiente = new_nodo;
            this.ultimo = new_nodo;
        }
    }

    buscar(cliente, password){
        var temp = this.primero;

        while(temp != null){
            if(temp.cliente.username == cliente && temp.cliente.password == password){
                return temp; // encuentra el usuario
            }
            temp = temp.siguiente;
        }

        return null; // no encuentra el usuario
    }

    getUsuario(cliente){
        var temp = this.primero;

        while(temp != null){
            if(temp.cliente.name == cliente){
                return temp; // encuentra el usuario
            }
            temp = temp.siguiente;
        }

        return null; // no encuentra el usuario
    }

    print(){
        var temp = this.primero;
        console.log("imprimiendo lista de clientes")
        while(temp != null){
            console.log("nombre: "+temp.cliente.name, " dpi: "+temp.cliente.dpi);
            temp = temp.siguiente;
        }
    }

    graficar(){
        var codigodot = "digraph G{\nlabel=\" Lista Simple \";\nnode [shape=box];\n graph [rankdir = LR];";
        var temporal = this.primero;
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
    
        // grafo += '{rank=same;root;'
        while (temporal != null) {
            
            nodos+=  "N"+numnodo + "[label=\"" + temporal.cliente.name + "\"];\n";
            
            temporal = temporal.siguiente;
            numnodo++;  
                      
        }
        

        temporal = this.primero;
        numnodo = 0;
        while (temporal != null) {
            
            if(temporal.siguiente != null){
                conexiones += "N"+numnodo+ " -> N" +(numnodo+1)+ ";\n";
            }
            
            numnodo++; 
            temporal = temporal.siguiente;

        }
       

        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
}


//************************************************ARBOL AVL***************************************** */

class Pelicula{
    constructor(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_q, paginas, categoria){
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_q = precio_q;
        this.paginas = paginas;
        this.categoria = categoria;
    }
}

class NodoAVL{
    constructor(pelicula){
        this.pelicula=pelicula;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class AVL{
    constructor(){
        this.raiz = null;
        this.group = 0;
        this.codigodot;
    }
    //maximo
    MAXIMO(valor1,valor2){
        if(valor1>valor2) return valor1;
        return valor2;
    }
    //altura del arbol
    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }
    //insertar
    insertar(nodo_pelicula){ //el valor es un nodo Peliculass
        this.raiz = this.add(nodo_pelicula,this.raiz)

    }
    //insertar recursivo
    add(nodo_pelicula, nodo){
        if(nodo == null) return new NodoAVL(nodo_pelicula);
        else{
            if(nodo_pelicula.id_pelicula < nodo.pelicula.id_pelicula){
                nodo.izquierda = this.add(nodo_pelicula, nodo.izquierda)
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){
                    //programar los casos 
                    //rsi
                    if(nodo_pelicula.id_pelicula < nodo.izquierda.pelicula.id_pelicula){
                        nodo = this.rotacionizquierda(nodo);
                    }//rdi}
                    else{
                        nodo = this.Rotaciondobleizquierda(nodo);
                    }
                    
                }
            }else if(nodo_pelicula.id_pelicula > nodo.pelicula.id_pelicula){
                nodo.derecha = this.add(nodo_pelicula, nodo.derecha);
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda)== 2){
                    //otros dos casos
                    //rotacion simple derecha
                    if(nodo_pelicula.id_pelicula > nodo.derecha.pelicula.id_pelicula){
                        nodo = this.rotacionderecha(nodo);
                    }else{
                        nodo = this.Rotaciondoblederecha(nodo);
                    }
                    //rotacion doble derecha
                }
            }else{
                nodo.pelicula.id_pelicula = nodo_pelicula.id_pelicula;
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierda),this.altura(nodo.derecha))+1
        return nodo;
    }


    //rotacion simple izquierda
    rotacionizquierda(nodo){
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.izquierda), nodo.altura)+1;
        return aux;
    }
    //rotacion simple derecha
    rotacionderecha(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.derecha),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecho = this.rotacionizquierda(nodo.derecha);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles
    Rotaciondobleizquierda(nodo){
        nodo.izquierda = this.rotacionderecha(nodo.izquierda);
        return this.rotacionizquierda(nodo);
    }

    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo!=null){
            console.log("id_pelicula=" +nodo.pelicula.id_pelicula);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }

    buscar(id){
        var nodo =this.busqueda(this.raiz, id);
        return nodo
    }

    busqueda(nodo, id){
        if(nodo == null){
            return null
        }else if(id == nodo.pelicula.id_pelicula){
            //console.log("se encontro pelicula con id: "+nodo.pelicula.id_pelicula)
            return nodo
        }else if(id < nodo.pelicula.id_pelicula){
            return this.busqueda(nodo.izquierda, id);
        }else{
            return this.busqueda(nodo.derecha, id);
        }
        
    }


    graficar(){
        this.group = 0;
        this.codigodot = "digraph G{\nlabel=\" Arbol AVL \";\nnode [shape=circle fillcolor=\"white\" style=filled];\n graph [rankdir = TB];\n";
        /*
        'digraph { a[image="images/first.png"]; b[image="images/second.png"]; a -> b }'
        */
        // grafo += '{rank=same;root;'

        this.recorridoGrafica(this.raiz);
        this.group =0;
        this.apuntandoGrafica(this.raiz);
        
        this.codigodot += "}";

        console.log(this.codigodot);
        
        d3.select("#lienzo").graphviz()
            
            .width(900)
            .height(500)
            .renderDot(this.codigodot)
    }
    
    recorridoGrafica(pivote){
        
        if(pivote!= null){
            this.recorridoGrafica(pivote.izquierda);
            this.codigodot += pivote.pelicula.id_pelicula +"[label=\"pelicula: "+pivote.pelicula.nombre_pelicula+"\nid: "+pivote.pelicula.id_pelicula+"\", fontcolor= \"white\", fillcolor=\"green\"];\n";
            
            //console.log(this.codigodot);
            this.recorridoGrafica(pivote.derecha);
        }else{
            this.codigodot += pivote+""+this.group+"[label=\"nombre: null \"];\n";
            this.group += 1;
        }
        return;
    }

    apuntandoGrafica(pivote){
        if(pivote!=null){
            this.apuntandoGrafica(pivote.izquierda);
            
            
            if(pivote.izquierda != null){
                this.codigodot += pivote.pelicula.id_pelicula+"->"+pivote.izquierda.pelicula.id_pelicula+";\n";
                //console.log(this.codigodot);
            }else{
                this.codigodot += pivote.pelicula.id_pelicula+"->"+pivote.izquierda+""+this.group+";\n";
                this.group += 1;
            }
            
            if(pivote.derecha != null){
                this.codigodot += pivote.pelicula.id_pelicula+"->"+pivote.derecha.pelicula.id_pelicula+";\n";
                //console.log(this.codigodot);
            }else{
                this.codigodot += pivote.pelicula.id_pelicula+"->"+pivote.derecha+""+this.group+";\n";
                this.group += 1;
            }
            
            //cout<< pivote->dato<< " ";
            this.apuntandoGrafica(pivote.derecha);
        }
        return;
    }
    

}

//************************************************ARBOL BINARIO ***************************************** */
//EN ESTE ARBOL SE ALMACENAN LOS ACTORES
class Actor{
    constructor(dni, nombre_actor, correo, descripcion){
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo = correo;
        this.descripcion = descripcion;
    }
}
class NodoArbol{
    constructor(actor){
        this.actor=actor;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
        this.codigodot;
        this.group = 0;
    }
    //metodo insertar
    insertar(obj_actor){
        this.raiz = this.agregar(obj_actor, this.raiz);
    }
    //metodo insertar recursivo
    agregar(obj_actor, nodo){
        if(nodo == null){
            return new NodoArbol(obj_actor);
        }else{
            
            if(obj_actor.dni > nodo.actor.dni){
                nodo.derecha = this.agregar(obj_actor, nodo.derecha);
            }else{
                nodo.izquierda = this.agregar(obj_actor, nodo.izquierda);
            }
        }
        return nodo;
    }
    
    //preorden
    preorden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("dni:",nodo.actor.dni);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("dni:",nodo.actor.dni);
            this.in_orden(nodo.derecha);
        }
    }

    //postorden
    posorden(){
        this.pos_orden(this.raiz);
    }
    
    pos_orden(nodo){
        if(nodo!=null){
            this.pos_orden(nodo.izquierda);
            this.pos_orden(nodo.derecha);
            console.log("dni:",nodo.actor.dni);           
        }
    }

    graficar(){
        this.group = 0;
        this.codigodot = "digraph G{\nlabel=\" Arbol Binario \";\nnode [shape=circle fillcolor=\"white\" style=filled];\n graph [rankdir = TB];";
    
        // grafo += '{rank=same;root;'

        this.recorridoGrafica(this.raiz);
        this.group = 0;
        this.apuntandoGrafica(this.raiz);
        
        this.codigodot += "}";

        console.log(this.codigodot);
        
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(500)
            .renderDot(this.codigodot)
    }
    
    recorridoGrafica(pivote){
        
        if(pivote!= null){
            this.recorridoGrafica(pivote.izquierda);
            this.codigodot += pivote.actor.dni +"[label=\"nombre: "+pivote.actor.nombre_actor+"\n"+pivote.actor.dni+"\", fontcolor=\"white\",  fillcolor=\"green\"];\n";
            
            //console.log(this.codigodot);
            this.recorridoGrafica(pivote.derecha);
        }else{
            this.codigodot += pivote+""+this.group+"[label=\"nombre: null \"];\n";
            this.group += 1;
        }
        return;
    }

    apuntandoGrafica(pivote){
        if(pivote!=null){
            this.apuntandoGrafica(pivote.izquierda);
            
            
            if(pivote.izquierda != null){
                this.codigodot += pivote.actor.dni+"->"+pivote.izquierda.actor.dni+";\n";
                //console.log(this.codigodot);
            }else{
                this.codigodot += pivote.actor.dni+"->"+pivote.izquierda+""+this.group+";\n";
                this.group += 1;
            }
            
            if(pivote.derecha != null){
                this.codigodot += pivote.actor.dni+"->"+pivote.derecha.actor.dni+";\n";
                //console.log(this.codigodot);
            }else{
                this.codigodot += pivote.actor.dni+"->"+pivote.derecha+""+this.group+";\n";
                this.group += 1;
            }
            
            //cout<< pivote->dato<< " ";
            this.apuntandoGrafica(pivote.derecha);
        }
        return;
    }
}


//************************************************TABLA HASH (CATEGORIAS) ***************************************** */

class NodoHash{
    constructor(id_categoria, company, index){
        this.id_categoria = id_categoria;
        this.company = company;
        this.index = index;
        this.lista_categorias = new ListaInterna();
        this.abajo = null;
    }
}



class ListaTablaHash{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id_categoria, company, index){
        var nuevo_nodo = new NodoHash(id_categoria, company, index);
        //nuevo_nodo.index+=1;
        if(this.primero == null){
            this.primero = nuevo_nodo;
            this.ultimo = nuevo_nodo;
        }else{
            this.ultimo.abajo = nuevo_nodo;
            this.ultimo = nuevo_nodo;
        }

    }

    getEncabezado(index){
        var aux = this.primero;
        while(aux != null){
            if(index == aux.index ){
                return aux;
            }
            aux = aux.abajo;
        }
        return null;
    }

    printLista(){
        var temp = this.primero;
        while(temp != null){
            console.log("categoria: "+temp.id_categoria);
            temp = temp.abajo;
        } 
    }

    mostrarTodo(){
        var temp1 = this.primero;
        var lista = "";

        while(temp1 != null){
            lista += "categoria: "+temp1.id_categoria+" indice: "+temp1.index+"->";
            
            if(temp1.lista_categorias.primero != null){
                var temp2 = temp1.lista_categorias.primero;
                while(temp2 != null){
                    
                    lista +="categoria: "+temp2.id_categoria+" indice: "+temp2.index+"->";
                    temp2 = temp2.siguiente;
                }
            }
           
            
            temp1 = temp1.abajo;
            console.log(lista);
            lista = "";
        }
        
    }
    /*
    ascendenteBubbleSort(){
        var aux2 = this.primero;

        while(aux2 !=null){
            var aux1 = aux2.abajo;
            while(aux1 != null){
                if(aux1.artista.name < aux2.artista.name){
                    var temp = aux2.artista.name;

                    aux2.artista.name = aux1.artista.name;
                    aux1.artista.name = temp;
                    
                    var lista_canciones = aux2.lista_canciones;
                    aux2.lista_canciones = aux1.lista_canciones;
                    aux1.lista_canciones = lista_canciones;

                    
                }
                aux1 = aux1.abajo;
            }
            aux2 = aux2.abajo;
        }  

        
    }*/

    graficar(){
        var nodos ="";
        var codigodot = "digraph G{\nlabel=\" TABLA HASH \";\n";
        
        codigodot += "fontname=\"Helvetica,Arial,sans-serif\"\n";
        codigodot += "node [fontname=\"Helvetica,Arial,sans-serif\"]\n";
        codigodot += "a0 [shape=none label=< \n";
        codigodot += "<TABLE border=\"0\" cellspacing=\"0\" cellpadding=\"10\">\n";
        
        var nodos ="";

        var temp1 = this.primero;
        while (temp1 != null) {
            
            nodos += `
            <TR>
                <TD border="1" >`+temp1.index+`</TD>
                <TD border="1" >`+temp1.id_categoria+`</TD>`
            
            if(temp1.lista_categorias.primero != null){
                var temp2 = temp1.lista_categorias.primero;
                
                while(temp2 != null){
                    nodos+=  `
                        <TD border="1" >`+temp2.id_categoria+`</TD>
                    
                    </TR>
                    `
                    temp2 = temp2.siguiente;
                }

            }else{
                nodos += `</TR>`
            }

            temp1 = temp1.abajo;  
              
        }
        
        
        codigodot += nodos+"\n"
        codigodot += "</TABLE>>];"
        codigodot += "}"
        console.log(codigodot)
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(300)
            .renderDot(codigodot)
    }
    
    /*
    graficar(){
        var codigodot = "digraph G{\nlabel=\" Lista de Listas \";\nnode [shape=box];\ngraph [rankdir = \"TB\"];";
        var temp1 = this.primero;
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var contador2 = 0;
        // grafo += '{rank=same;root;'
        while (temp1 != null) {
            
            nodos+=  "NE"+numnodo + "[label=\""+temp1.index+"\n" + temp1.id_categoria + "\", group=\""+numnodo+"\"];\n";
            
            if(temp1.lista_categorias.primero != null){
                var temp2 = temp1.lista_categorias.primero;
                
                while(temp2 != null){
                    nodos+=  "NL"+numnodo+""+contador2 + "[label=\"" + temp2.id_categoria + "\", group=\""+numnodo+"\" ];\n";
                    contador2 += 1;
                    temp2 = temp2.siguiente;
                }
                
                contador2 = 0;
            }
            numnodo += 1;
            temp1 = temp1.abajo;  
              
        }

        var tempo = this.primero;
        numnodo = 0;
        nodos += "{rank=same;";
        while(tempo != null){
            nodos += "NE"+numnodo+";";
            numnodo += 1;
            tempo = tempo.abajo;
        }
        nodos+= "}\n";

        temp1 = this.primero;
        numnodo = 0;
        contador2 = 0;
        var auxnum2 = 0;

        while (temp1 != null) {
            
            if(temp1.abajo != null){
                conexiones += "NE"+numnodo+ " -> NE" +(numnodo+1)+ ";\n";
            }
            
            
            if(temp1.lista_categorias.primero != null){
                var temp2 = temp1.lista_categorias.primero;
                
                conexiones += "NE"+numnodo+ " -> NL" +numnodo+""+auxnum2+ ";\n";
                
                while(temp2 != null){
                    if(temp2.siguiente != null){
                        conexiones += "NL"+numnodo+""+auxnum2+ " -> NL" +numnodo+""+(auxnum2+1)+ ";\n";
                    }
                    
                    auxnum2 += 1;
                    temp2 = temp2.siguiente;
                }
                auxnum2 = 0;
            }
            numnodo += 1;
            
            temp1 = temp1.abajo;

        }
       

        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(300)
            .renderDot(codigodot)
    }*/
}


class NodoInternoCategoria{
    constructor(id_categoria, company){
        this.id_categoria = id_categoria;
        this.company = company;
        this.head = null;
        this.siguiente = null;

    }
}

class ListaInterna{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id_categoria, company){
        var nuevo_nodo = new NodoInternoCategoria(id_categoria, company);
        if(this.primero == null){
            this.primero = nuevo_nodo;
            this.ultimo = nuevo_nodo;
        }else{
            this.ultimo.siguiente = nuevo_nodo;
            this.ultimo = nuevo_nodo;
        }

    }

    print(){
        var temp = this.primero;
        while(temp != null){
            console.log("categoria: "+temp.id_categoria);
            temp = temp.siguiente;
        }
    }
}

class TablaHash{
    constructor(tamano){
        this.tamano = tamano;
        this.lista_tabla = new ListaTablaHash();
        for(var i=0; i<tamano; i++){
                                    //id_categoria, company, index
            this.lista_tabla.insertar(-1,"", i);
        }
    }

    dispersion(id_categoria, company){
        var index = id_categoria % this.tamano;
        console.log("Categoria "+id_categoria + " index: "+index)

        var nodo_encabezado = this.lista_tabla.getEncabezado(index);

        if(nodo_encabezado.id_categoria == -1){
            nodo_encabezado.id_categoria = id_categoria;
            nodo_encabezado.company = company;
            console.log("Se inserto en la tabla hash");
        }else{
            nodo_encabezado.lista_categorias.insertar(id_categoria, company);
            console.log("Se inserto en la lista enlazada de la tabla hash");
        }

        if(this.maximo() == "lleno"){ // si la tabla esta llena se hara un rehashing
            console.log("la tabla esta llena al 75%");
            var m_anterior = this.tamano;
            
            var nuevo_tamano = Math.round((this.tamano*75)/(100));
            this.tamano = (nuevo_tamano+1)*5; // calculando tamano de la nueva tabla(rehashing)
            console.log("El tamano de la nueva tabla es: "+ this.tamano);

            while(m_anterior < this.tamano){  //esto aumenta la lista(rehashing)
                this.lista_tabla.insertar(-1,"",m_anterior); //id_categoria, company, index
                m_anterior += 1;

            }

        }else{
            console.log("");
        }
    }

    maximo(){
        var num = (this.tamano*75)/(100);
        var max = Math.round(num); // 
        var contador = 0;
        
        var aux = this.lista_tabla.primero;

        while(aux != null){
            if(aux.id_categoria != -1){ // lo que significa que la celda esta llena
                contador +=1;
            }
            aux = aux.abajo;
        }
        
        if(contador == max){
            
            return "lleno";
        }
        else{
            
            return "vacio";
        }

        
    }

    
}


//************************************************ARBOL MERKLE ***************************************** */




class HashNode {
  constructor(hash, num) {
    this.hash  = hash;
    this.izquierda  = null;
    this.derecha = null;
    this.num = num;
  }
}


class Merkle {
    constructor() {
      this.raiz = null;
      this.datablock = [];  
      this.dot = '';
      this.group = 0;
      this.codigodot;
      this.contador_num = 0;
    }
  
    insertar(valor) {
      this.datablock.push(new HashNode(valor, this.contador_num));
      this.contador_num +=1;
    }
  
    crearArbol(exp) {
      this.raiz = new HashNode("0", this.contador_num);
      this.contador_num +=1;
      this._crearArbol(this.raiz, exp );
    }
  
    _crearArbol(tmp, exp) {
      if (exp > 0) {
        tmp.izquierda = new HashNode("0", this.contador_num);
        this.contador_num +=1;
        tmp.derecha = new HashNode("0", this.contador_num);
        this.contador_num += 1;
        this._crearArbol(tmp.izquierda, exp - 1);
        this._crearArbol(tmp.derecha, exp - 1);
      }
    }

    generarHash(tmp, n) { // postorder
        if (tmp != null) {
            this.generarHash(tmp.izquierda, n);
            this.generarHash(tmp.derecha, n);
            
            if (tmp.izquierda == null && tmp.derecha == null) {
                tmp.izquierda = this.datablock[n-index--];
                //console.log("el hash izquierdo es "+tmp.izquierda.hash);
                tmp.hash = sha256(tmp.izquierda.hash);
            } else {
                
                tmp.hash = sha256(tmp.izquierda.hash+tmp.derecha.hash);
            }      
        }
    }

    auth() {
        var exp = 1;
        while (Math.pow(2, exp) < this.datablock.length) {
            exp += 1;
        }

        for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
            this.datablock.push(new HashNode("1", this.contador_num));
            this.contador_num +=1;
        }

        index = Math.pow(2, exp);
        this.crearArbol(exp);
        this.generarHash(this.raiz, Math.pow(2, exp));
        //this.preorder(this.tophash);
    }

    graficar(){
        this.group = 0;
        this.codigodot = "digraph G{\nlabel=\" Arbol Merkle \";\nnode [shape=circle fillcolor=\"white\" style=filled];\n graph [rankdir = TB];";
    
        // grafo += '{rank=same;root;'

        this.recorridoGrafica(this.raiz);
        this.group = 0;
        this.apuntandoGrafica(this.raiz);
        
        this.codigodot += "}";

        //console.log(this.codigodot);
        
        d3.select("#lienzo-merkle").graphviz()
            .width(900)
            .height(500)
            .renderDot(this.codigodot)
    }
    
    recorridoGrafica(pivote){
        
        if(pivote!= null){
            this.recorridoGrafica(pivote.izquierda);
            this.codigodot += "N"+pivote.num +"[label=\""+pivote.hash+"\", fontcolor=\"white\",  fillcolor=\"green\"];\n";
            
            //console.log(this.codigodot);
            this.recorridoGrafica(pivote.derecha);
        }else{
            //this.codigodot += pivote+""+this.group+"[label=\"nombre: null \"];\n";
            this.group += 1;
        }
        return;
    }

    apuntandoGrafica(pivote){
        if(pivote!=null){
            this.apuntandoGrafica(pivote.izquierda);
                
                if(pivote.izquierda != null){
                    
                    if(pivote.derecha == null){
                        this.codigodot += "N"+pivote.num+"->N"+pivote.izquierda.num+"[dir=back];\n";
                    }else{
                        this.codigodot += "N"+pivote.num+"->N"+pivote.izquierda.num+";\n";
                    }  
                            
                }

                if(pivote.derecha != null){
                    
                    this.codigodot += "N"+pivote.num+"->"+"N"+pivote.derecha.num+";\n";
                     
                }
                
            this.apuntandoGrafica(pivote.derecha);
        }
        return;
    }

}

var index=0;

//************************************************BLOCKCHAIN***************************************** */

class NodoBloque{
    constructor(index, timestamp, previous_hash, rootmerkle, nonce, hash, data){
        this.index = index;
        this.timestamp = timestamp;
        this.previous_hash = previous_hash;
        this.rootmerkle = rootmerkle;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.siguiente = null;
    }

    
}

class ListaBloque{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(index, timestamp, previous_hash, rootmerkle, nonce, hash, data){
        var new_nodo = new NodoBloque(index, timestamp, previous_hash, rootmerkle, nonce, hash, data);
        if(this.primero == null){
            this.primero = new_nodo;
            this.ultimo = new_nodo;
        }else{
            this.ultimo.siguiente = new_nodo;
            this.ultimo = new_nodo;
        }
    }

    buscar(index){
        var temp = this.primero;

        while(temp != null){
            if(temp.index == index){
                return temp; // encuentra el usuario
            }
            temp = temp.siguiente;
        }

        return null; // no encuentra el usuario
    }


    print(){
        var temp = this.primero;
        console.log("imprimiendo blockchain")
        while(temp != null){
            console.log("index: "+temp.index+" hash: "+temp.hash);
            temp = temp.siguiente;
        }
    }

    graficar(){
        var codigodot = "digraph G{\nlabel=\" Blockchain \";\nnode [shape=box];\n graph [rankdir = LR];";
        var temporal = this.primero;
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
    
        // grafo += '{rank=same;root;'
        while (temporal != null) {
            
            nodos+=  "N"+numnodo + "[label=\"Bloque " + temporal.index + "\nhash: "+temporal.hash+"\nprev_hash: "+temporal.previous_hash+"\nroot_merkle: "+temporal.rootmerkle+"\nfecha: "+temporal.timestamp+"\ndata: "+temporal.data+"\"];\n";
            
            temporal = temporal.siguiente;
            numnodo++;  
                      
        }
        

        temporal = this.primero;
        numnodo = 0;
        while (temporal != null) {
            
            if(temporal.siguiente != null){
                conexiones += "N"+numnodo+ " -> N" +(numnodo+1)+ ";\n";
            }
            
            numnodo++; 
            temporal = temporal.siguiente;

        }
       

        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{\n"+conexiones+"\n}\n}"
        //console.log(codigodot)
        d3.select("#lienzo-blockchain").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
}

//**************************************LISTA COMENTARIOS PELICULAS**************************** */
class NodoComentario{
    constructor(comentario, usuario){
        this.comentario = comentario;
        this.usuario = usuario;
        this.siguiente = null;
    }

    
}

class ListaComentarios{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(comentario, usuario){
        var new_nodo = new NodoComentario(comentario, usuario);
        if(this.primero == null){
            this.primero = new_nodo;
            this.ultimo = new_nodo;
        }else{
            this.ultimo.siguiente = new_nodo;
            this.ultimo = new_nodo;
        }
    }


    print(){
        var temp = this.primero;
        console.log("imprimiendo lista de comentarios")
        while(temp != null){
            console.log("comentario: "+temp.comentario);
            temp = temp.siguiente;
        }
    }


}


class NodoPelicula{
    constructor(id_pelicula, usuario){
        this.id_pelicula = id_pelicula;
        this.usuario = usuario;
        this.lista_comentarios = new ListaComentarios();
        this.abajo = null;
    }
}

class ListaPeliculas{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id_pelicula){
        var new_nodo = new NodoPelicula(id_pelicula);
        if(this.primero == null){
            this.primero = new_nodo;
            this.ultimo = new_nodo;
        }else{
            this.ultimo.abajo = new_nodo;
            this.ultimo = new_nodo;
        }
    }

    buscar(id){
        var temp = this.primero;
        while(temp != null){
            if(temp.id_pelicula == id){
                return temp;
            }
            temp = temp.abajo;
        }

        return null;
    }

    mostrarTodo(){
        var temp1 = this.primero;
        var lista = "";

        while(temp1 != null){
            lista += "id_pelicula: "+temp1.id_pelicula+"->"+" usuario: "+temp1.usuario+"->";
            
            if(temp1.lista_comentarios.primero != null){
                var temp2 = temp1.lista_comentarios.primero;
                while(temp2 != null){
                    
                    lista +="comentario: "+temp2.comentario+"->";
                    temp2 = temp2.siguiente;
                }
            }
           
            
            temp1 = temp1.abajo;
            console.log(lista);
            lista = "";
        }
    }
}



