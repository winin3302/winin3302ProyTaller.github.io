"use strict";
//debemos esperar a que la página se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
//es necesario agregar un observador para detectar cambios los cambios en estado de la autenticación
    firebase.auth().onAuthStateChanged(function (user) {
   // sera para verificar la autenticacion de usuario
        if (user) {
  // y actualiza el DOM con la información del mismo
            const nombreOutput = document.getElementById('nombreOutput');
            const emailOutput = document.getElementById('emailOutput');
            const avatarImg = document.getElementById('avatar'); 

            nombreOutput.textContent = user.displayName;
            emailOutput.textContent = user.email;

 // Verificamos cual es el proveedor de autenticación y si hay una URL de del avatar 
            if ((user.providerData[0].providerId === 'google.com' || user.providerData[0].providerId === 'facebook.com') && user.photoURL) {
// Si es Google o Facebook, utiliza la URL de avatar del mismo
                avatarImg.src = user.photoURL;
            } 

  // Agrega un evento al botón de cerrar sesión
            const cerrarSesionBtn = document.getElementsByName('cerrarSesion')[0];
            cerrarSesionBtn.addEventListener('click', function () {
    // Cierra la sesión y nos redirige a la página inicio 
                firebase.auth().signOut().then(function () {
                    window.location.href = 'login.html';
                }).catch(function (error) {
                    console.error('Error al cerrar la sesion:', error);
                });
            });
        } else {
// en caso de wue el usuario no tenga autenticacion, nos enviara a inicio de sesion 
            window.location.href = 'login.html';
        }
    });
});