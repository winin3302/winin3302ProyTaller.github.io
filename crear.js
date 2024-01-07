const db=firebase.firestore();
const guardarFormulario = (PCliente) => {
    db.collection("PClientes").add({
        PCliente
    })
    .then(() => {
        //borrara los datos recabados del formulario
        formaV.reset();
        // Muestra un mensaje sobre el guardado de los datos de manera correcta
        alert('Los datos se han guardado en la base de datos.');
        console.log('Datos guardados de manera exitosa en la base de datos.');
    })
    .catch(err => {
        alert('No se han podido guardar los datos');
        console.log('Upss no se han podido guardar los datos');
        console.log('Código de error:', err.code);
        console.log('Mensaje de error:', err.message);
    });
};


const formaV=document.getElementById('crearCliente');

formaV.addEventListener('submit',(e)=>{
    e.preventDefault();
  //para evitar que la ventana se actualice, se asignan valores a los datos del formulario
    const nombre=formaV['nombreCliente'].value;
    const email=formaV['emailCliente'].value;
    const descripcion=formaV['descripcionCliente'].value;
    const opciones=formaV['opcionesCliente'].value;
    const fecha=formaV['fechaCliente'].value;
   const PCliente={
    nombre,
    email,
    descripcion,
    opciones,
    fecha,
   }
    guardarFormulario(PCliente);
})
