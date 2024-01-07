const db = firebase.firestore();
const clientesCollection = db.collection("PClientes");

const mostrarClientes = (snapshot) => {
  const listaClientes = document.getElementById("listaClientes");

  // Limpia la lista antes de agregar nuevos elementos
  listaClientes.innerHTML = "";

  snapshot.docChanges().forEach((change) => {
    const cliente = change.doc.data().PCliente;

    // Verifica cada campo antes de mostrarlo al usuario
    const nombre = cliente.nombre || "Sin nombre";
    const email = cliente.email || "Sin email";
    const descripcion = cliente.descripcion || "Sin descripción";
    const opciones = cliente.opciones || "Sin opciones";
    const fecha = cliente.fecha || "Sin fecha";

    // Crea un elemento de lista para cada cliente
    const li = document.createElement("li");
    li.textContent = `Nombre: ${nombre}, Email: ${email}, Descripción: ${descripcion}, Opciones: ${opciones}, Fecha elegida: ${fecha}`;

    // Agrega el elemento de lista a la lista principal
    listaClientes.appendChild(li);
  });
};

const unsubscribe = clientesCollection.onSnapshot(mostrarClientes);