const db = firebase.firestore();
const clientesCollection = db.collection("PClientes");

const mostrarClientes = (snapshot) => {
  const listaClientes = document.getElementById("listaClientes");

  listaClientes.innerHTML = "";

  snapshot.docChanges().forEach((change) => {
    const cliente = change.doc.data().PCliente;
    const nombre = cliente.nombre || "Sin nombre";
    const email = cliente.email || "Sin email";
    const descripcion = cliente.descripcion || "Sin descripción";
    const opciones = cliente.opciones || "Sin opciones";
    const fecha = cliente.fecha || "Sin fecha";

    const li = document.createElement("li");
    li.textContent = `Nombre: ${nombre}, Email: ${email}, Descripción: ${descripcion}, Opciones: ${opciones}, Fecha: ${fecha}`;

    const botonEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => confirmarEliminarCliente(change.doc.id, cliente));

    const botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar";
    botonModificar.addEventListener("click", () => mostrarFormularioModificacion(change.doc.id, cliente));

    li.appendChild(botonEliminar);
    li.appendChild(botonModificar);

    listaClientes.appendChild(li);
  });
};

const unsubscribe = clientesCollection.onSnapshot(mostrarClientes);

const confirmarEliminarCliente = (docId, cliente) => {
  const confirmacion = window.confirm(`¿Deseas eliminar a este cliente?\nNombre: ${cliente.nombre}\nEmail: ${cliente.email}`);
  if (confirmacion) {
    eliminarCliente(docId);
  }
};

const eliminarCliente = (docId) => {
  clientesCollection.doc(docId).delete()
    .then(() => {
      console.log("El Cliente se ha eliminado correctamente");
      location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar al Cliente:", error);
    });
};

const mostrarFormularioModificacion = (docId, cliente) => {
  // esto no ayudara a redirigirnos a la página de modificación con el ID del documento y los datos que tenemos sobre el cliente en cuestion
  window.location.href = `modificado.html?id=${docId}&nombre=${cliente.nombre}&email=${cliente.email}&descripcion=${cliente.descripcion}&opciones=${cliente.opciones}&fecha=${cliente.fecha}`;
};

