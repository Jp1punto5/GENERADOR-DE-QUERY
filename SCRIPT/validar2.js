// EN ESTA PARTE DEL CODIGO, VAMOS A CREAR UNA FUNCION QUE REVISARA EL LOGIN

function validar2(user,pass)
{
    //alert(user+'esto se ingreso');
    let u1 = user.substring(0,3);
    let u2 = user.substring(7);
    let us = u1+u2;
    let p1 = pass.substring(0,3);
    let p2 = pass.substring(7);
    let p = p1+p2; 
   // alert('el usuario es: ' + us+'  la clave es: ' +p);
    if(us=='jp1punto5' && p ==='123456')
        {
            return true;
        }else
        {
            return false;
        }
}
