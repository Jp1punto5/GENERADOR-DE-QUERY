var admin = "jp1punto5"; // variable global
var contra = "123456";
//AQUI COMIENZAN LAS VALIDACIONES
function validar(boton_enviar)

{

    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    let validar = 0;
    if(user == null || !user.trim())
    {
        alert("Ingrese el Nombre Usuario sin espacios vacios..");
        validar = 1;
    }

    if(pass == null || !pass.trim())
    {
        alert("ingrese su clave sin espacios...")    
        validar = 1;
    }

    if (validar == 0) 
    {
        if (user!== admin) {
            alert("ingrese un usuario existente..");
            validar = 2;
        }
    
        if (pass !== contra) {
            alert("la clave ingresada es incorrecta..");
            validar = 2;
        }

        if (validar == 2) 
        {
            return false;    
        }else 
        {
            return boton_enviar;
        }

    }else
    {
        return false;
    }

}// fin funcion de validar campos y enviar el boton devuelta al formulario

//FIN DE LAS FUNCIONES QUE VALIDAN