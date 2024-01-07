"use strict;"
const GoogleBtn=document.querySelector('#btn-google');
GoogleBtn.addEventListener('click', e =>{
    const provider= new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result=>{
            console.log('Inicio de sesion con Google exitoso');
            // Redirige a la página de inicio para el logeo
            window.location.href = 'inicio.html';
        })
        .catch(err=>{
            console.log('Error en el inicio de sesion con Google')
            console.log('Código de error:', err.code);
            console.log('Mensaje de error:', err.message);
        })
})
const FacebookBtn=document.querySelector('#btn-Facebook');
FacebookBtn.addEventListener('click', e =>{
    e.preventDefault();
    const provider= new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result=>{
            console.log('Inicio de sesion con Facebook exitoso');
            // Redirige a la página de inicio
            window.location.href = 'inicio.html';
        })
        .catch(err=>{
            console.log('Error en el inicio de sesion con Facebook')
            console.log('Código de error:', err.code);
            console.log('Mensaje de error:', err.message);
        })
})