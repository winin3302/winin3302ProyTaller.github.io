// @ts-check
// Verificar si auth ya está definido antes de declararlo nuevamente
if (typeof auth === "undefined") {
    /** Conexión al sistema de autenticación de Firebase. */
    // @ts-ignore
    const auth = firebase.auth();
  }

  /** Nombre de usuario autenticado por Firebase. */
  let usuario = "";
  let avatar = "";

  /** Conexión a la base de datos. */
  // @ts-ignore
  const firestore = firebase.firestore();

  /** esta funcion nos permitira agregar un usuario a la base de datos. */
  function agrega() {
    firestore.collection("MENSAJE").add({
      USUARIO: usuario,
      TEXTO: texto.value.trim(),
      TIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
      AVATAR: avatar,
    });
  }

  /** Muestra los mensajes de la colección "MENSAJE" y se actualiza de manera automatica */
  function mostrarMensajes() {
    firestore.collection("MENSAJE").orderBy("TIMESTAMP", "desc").onSnapshot(
      querySnapshot => {
        mensajes.innerHTML = "";
        querySnapshot.forEach(doc => {
          const data = doc.data();

          var d = data.TIMESTAMP.toDate(),
            dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' +
            [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

          mensajes.innerHTML += /* html */
            `<li><img id="Avatar" alt="Avatar" src="${cod(data.AVATAR)}"><div class="msg">${cod(data.TEXTO)}<br><span class="date"><u>${cod(data.USUARIO)}</u><br>${dformat}</span></li></div>`;
        })
      },
      e => {
        checaError(e);
        mostrarMensajes();
      }
    )
  }

  /** Procesa un error para despues mostrar el objeto en la consola y un cuadro de alerta con el mensaje. */
  function checaError(e) {
    console.log(e);
    alert(e.message);
  }

  /** Map que contiene el texto de escape de los caracteres especiales de HTML. */
  const codMap = Object.freeze(new Map([
    ['&', '&amp;'], ['<', '&lt;'],
    ['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']
  ]));

  /** Codifica un texto para que escape los caracteres especiales y no se pueda interpretar como HTML. */
  function cod(texto) {
    return (texto || "").replace(/[&<>"']/g, letra => codMap.get(letra));
  }

  // Inicia sesión automáticamente con Google para autenticar
  auth.onAuthStateChanged(
    async usuarioAuth => {
      if (usuarioAuth && usuarioAuth.email) {
        // Usuario aceptado.
        usuario = usuarioAuth.email;
        // mostrara la foto del Avatar
        avatar = usuarioAuth.photoURL;
        // Muestra los mensajes del chat
        mostrarMensajes();
      } else {
// detecta que no se ha iniciado sesion y pedira los datos para iniciar sesión.
        await auth.signInWithRedirect(provider);
      }
    },

    // esta función se activa si se presenta un error al verificar a los usuarios
    checaError
  );
  