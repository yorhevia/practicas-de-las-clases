// creacion de selectores

const nombreDESTINO = document.querySelector('#destino');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const emailInput = document.querySelector('#email');
const contenedorCitas = document.querySelector('#citas');
const formulario = document.querySelector('#nueva-cita');
let editar;

class citas{
    //vamos a iniciar la estructura donde vamos a almacenar la clase citas
    constructor(){
        this.citas = []
    }
    // metodo tambien conocidoa como funciones dentro de la clase
    agregarCita(cita){
    
        this.citas = [...this.citas,cita]
        // para ir viendo como se va agreagndo las citas 
        console.log(this.citas)
    }
    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id);

    }
    editarCita(citaAct){
        this.citas = this.citas.map(citas=>citas.id === citaAct.id ? citaAct : citas)
    }
   
}

class iu{
    imprimirAlert(mensaje,tipo){
        const divMensajes = document.createElement('div');
        divMensajes.classList.add('text-center', 'alert','d-block','col-12');
             
        if(tipo==='error'){
            divMensajes.classList.add('alert-danger');

        }else{
            divMensajes.classList.add('alert-success');
        }
        //mostrar el mensaje de error en la interfaz
        divMensajes.textContent = mensaje;
        // agregar el mensaje 
        document.querySelector('#contenido').insertBefore(divMensajes,document.querySelector('.agregar-cita'))
        setTimeout(()=>{
            divMensajes.remove();
        },3000);
    }

    imprimirCitas({citas}){
       // console.log('imprimir citas')
       this.limpiarHTML()
       citas.forEach(citas => {
        const { destino, propietario, telefono, fecha, hora, email, id} = citas;
        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        //estoy creando un atribito persolanizado
        divCita.dataset.id = id;
        // generar los textos para las fichas de las citas

        const destinoParrafo = document.createElement('h2');
        destinoParrafo.classList.add('card-title','font-weight-bolder')
        destinoParrafo.textContent = destino;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario:${propietario}</span>
        `
       const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono:${telefono}</span>

        `
        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha:${fecha}</span>

        `
        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora:${hora}</span>

        `
        const emailParrafo = document.createElement('p');
        emailParrafo.innerHTML = `
        <span class="font-weight-bolder">Email:${email}</span>

        `
        
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        // al hacer click al boton se llama la funcion
        btnEliminar.onclick = ()=> eliminarCita(id);

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = ()=> cargarEdicion(citas);
         
        divCita.appendChild(destinoParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(emailParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        contenedorCitas.appendChild(divCita);



    })
       
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
    
}
//crear instacias de clases 
const administrarCitas = new citas();
const useri = new iu();




//eventos para guardar 

Eventos();

function Eventos(){
    nombreDESTINO.addEventListener('input',datosCita)
    propietarioInput.addEventListener('input',datosCita)
    telefonoInput.addEventListener('input',datosCita)
    fechaInput.addEventListener('input',datosCita)
    horaInput.addEventListener('input',datosCita)
    emailInput.addEventListener('input',datosCita)
    formulario.addEventListener('submit',nuevacita)
  




}


//objetos para guardar

const objtCitas = {
    destino: '',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    email:''
    
}

function datosCita(e){
   // console.log(e.target.value)
   //como guardar en el objeto
   objtCitas[e.target.name] = e.target.value
  // console.log(objtCitas)
}



function nuevacita(e){
    e.preventDefault();
    console.log(objtCitas)

   const {destino,propietario,telefono,fecha,hora,email} = objtCitas

   //validar
   if(destino==="" || propietario==="" ||  telefono==="" ||  fecha==="" ||  hora==="" || email===""){
   //console.log('obligatorio todos los campos')
   useri.imprimirAlert('Todos los campo son requeridos', 'error');
   return;
   }
   if(editar){
   // console.log('estoy editando')
   formulario.querySelector('button[type=submit]').textContent = 'Crear cita'
   editar = true;

   administrarCitas.editarCita({...objtCitas});

    // mensaje de aviso
    useri.imprimirAlert('se ha editado correctamente la cita')

   }else{
     // datos para crear un nueva cita
     console.log('creando una nueva cita')
     objtCitas.id = Date.now();
     administrarCitas.agregarCita({...objtCitas});
     useri.imprimirAlert('se ha agregado su cita correctamnete')
     console.log(objtCitas)
   }  
       // reset al formulario
       formulario.reset();
       reiniciarObj();
       useri.imprimirCitas(administrarCitas)
  
}

function reiniciarObj(){
    objtCitas.destino = '',
    objtCitas.propietario = '',
    objtCitas.telefono = '',
    objtCitas.fecha = '',
    objtCitas.hora = '',
    objtCitas.email = ''
}

function eliminarCita(id){
   // console.log('eliminando cita')
   administrarCitas.eliminarCita(id)

   useri.imprimirAlert('La cita se ha eliminado correctamente') 
   // actualizar
   useri.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita){
    // console.log('editar')
   const {destino, propietario, telefono, fecha, hora, email, id} = cita;
   
    //llenar los input
   
     nombreDESTINO.value = destino;
     propietarioInput.value = propietario;
     telefonoInput.value = telefono;
     fechaInput.value = fecha;
     horaInput.value =hora;
     emailInput.value = email;
   
       // vamos a llenar el objeto
       
       objtCitas.destino = destino
       objtCitas.propietario = propietario
       objtCitas.telefono = telefono
       objtCitas.fecha = fecha
       objtCitas.hora = hora
       objtCitas.email = email
       
       objtCitas.id = id;
   
   
   
       // cambira el texto del boton
   
       formulario.querySelector('button[type=submit]').textContent = 'Actualizar reserva';
       editar = true;
   
}