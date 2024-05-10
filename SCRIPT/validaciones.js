var admin = "jp1punto5"; // variable global
var contra = "123456";

function cargarExcel(callback) {
    let archivo_claves = 'file:///D:/Juan_Pablo/Documents/ING_INFORMATICA_DUOC_UC_2023-2026/Semestre-3/PROGRAMACIÓN WEB/ARCHIVOS-EXCEL_DE-PRUEBA/user_claves.xlsx';
    alert("Ruta del archivo:", archivo_claves);

    const xhr = new XMLHttpRequest();

    xhr.open('GET', archivo_claves, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
        const data = new Uint8Array(xhr.response);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const datos = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1});
        callback(datos);
    };

    xhr.send();
}

// Función para validar el usuario y la contraseña
function validar(event) {
    // Detener el envío predeterminado del formulario
    event.preventDefault();

    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    let validar = 0;
    if (!user.trim()) {
        alert("Ingrese el Nombre de Usuario sin espacios vacíos.");
        return false;
    }

    if (!pass.trim()) {
        alert("Ingrese su clave sin espacios.");
        return false;
    }

    // Llamada a cargarExcel con una función de devolución de llamada
    cargarExcel(function(datos) {
        const usuarioEncontrado = datos.find(fila => fila[0] === user && fila[1] === pass);
        if (usuarioEncontrado) {
            alert("Se encontró el usuario.");
            // Realizar la acción deseada si el usuario es válido
            // Por ejemplo, redirigir a otra página
            document.getElementById("formulario1").submit();
        } else {
            alert("Usuario o contraseña incorrectos.");
            // Manejar el inicio de sesión incorrecto
        }
    });
}// fin funcion de validar campos y enviar el boton devuelta al formulario

//FIN DE LAS FUNCIONES QUE VALIDAN