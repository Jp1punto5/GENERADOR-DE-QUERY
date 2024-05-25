
const form_validar = document.getElementById("formulario1");
const mostrar_exito = document.getElementById("mostrar_ingreso");
const btn_acceder = document.getElementById("btn__login");


form_validar.addEventListener('submit',(e) => {

    e.preventDefault();
    let usuario = form_validar.user.value;
    let password = form_validar.pass.value;
    let validar = 0;
   if(usuario==='')
    {
      alert('no se aceptan campos vacios, ...ingrese datos en campo USUARIO.');
    }
    else if (usuario.trim()==='') 
      {
        alert('no se aceptan espacios vacios en el campo usuario...');
        form_validar.user.value = '';
     } 

   else if (password==='') 
      {
        alert('no se aceptan campos vacios... ingrese datos en campo CLAVE..');
     }

    else if (password.trim()==='') 
      {
        alert('no se aceptan espacios en el campo clave..');
        form_validar.pass.value = '';
     }

     else {

      usuario = usuario.substring(0,3) + 'rtfg'+usuario.substring(3);
      password = password.substring(0,3) +'erty'+password.substring(3);
      if (validar2(usuario,password)) {
        mostrar_exito.style.visibility = 'visible';
        btn_acceder.addEventListener('click',() => {
          window.location.href = 'menu.html';
        });
      }else
      {
        alert('Usuario o contraseña incorrectos. ');
        form_validar.user.value = '';
        form_validar.pass.value = '';
      }
     }

});





// Función para validar el usuario y la contraseña


// fin funcion de validar campos y enviar el boton devuelta al formulario

//FIN DE LAS FUNCIONES QUE VALIDAN