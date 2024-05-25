
// AQUI COMIENZAN LAS FUNCIONES // 

const archivo_oculto = document.getElementById('primer__ar');
const btn__subir_archivo = document.getElementById('btn__subir-archivo');
btn__subir_archivo.addEventListener('click', () => {

    archivo_oculto.click();// aqui hacemos que se presione el input oculto tipo file 

});

// AQUI COMIENZAN LAS FUNCIONES QUE MANIPULAN LOS ARCHIVOS DE EXCEL
//FUNCION 1


function procesarPrimerExcel()
{
    
    let archivo_file = document.getElementById('primer__ar');
    let file = archivo_file.files[0];
    let  leer_archivo;
    if (archivo_file.files.length === 0) {
        alert("Seleccione un archivo antes de generar su hoja de SQL..");
    
    }else 
    {
        
        leer_archivo = new FileReader();
        leer_archivo.onload = function (e) 
            {
                let data = new Uint8Array(e.target.result);
                let worbook = XLSX.read(data, {type: 'array'});
                // aqui obtengo la primera hoja del excel (podemos manipular cualquier hoja)
                let first_hoja = worbook.SheetNames[0];
                let worksheet = worbook.Sheets[first_hoja];

                // aqui obtengo la posicion de la primera columna y la primera fila 1:1
                let dataRows = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1});

                // genero el archivo SQL

                let sql = `CREATE TABLE ##TEMPORAL_PATENTE_IDGPS (PATENTE VARCHAR(100), IDGPS VARCHAR(100))\n`;

                // ahora vamos a sumar en la linea anterior con todos los datos que existan el el archivo

                dataRows.forEach(row => 
                    {
                        // todo esto sucede en la primera fila del archivo excel
                        let PATENTE = row[0]; // columna 1
                        let IDGPS = row[1]; // columna 2
                       // let rut_cli = row[2]; // columna 3
                       // let nom_cli = row[3]; // columna 4

                        sql += `INSERT INTO ##TEMPORAL_PATENTE_IDGPS (PATENTE,IDGPS) VALUES
                        ('${PATENTE}','${IDGPS}')\n`;
                    }
                ); // fin del for que recorre todo el archivo 
                 
                // se crea el archivo con los datos nuevos
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'TABLA_PATENTE_IDGPS.sql';
                a.click();

                // 
             document.getElementById('primer__ar').value = '';
            };// fin leer archivo excel
    }
    
    leer_archivo.readAsArrayBuffer(file);
}// FIN DE LA FUNCION 1

// FUNCION 2

function procesarSegundoExcel()
{
    
    let archivo_file = document.getElementById('primer__ar');
    let file = archivo_file.files[0];
    let  leer_archivo;
    if (archivo_file.files.length === 0) {
        alert("Seleccione un archivo antes de generar su hoja de SQL..");
    
    }else 
    {
        
        leer_archivo = new FileReader();
        leer_archivo.onload = function (e) 
            {
                let data = new Uint8Array(e.target.result);
                let worbook = XLSX.read(data, {type: 'array'});
                // aqui obtengo la primera hoja del excel (podemos manipular cualquier hoja)
                let first_hoja = worbook.SheetNames[0];
                let worksheet = worbook.Sheets[first_hoja];

                // aqui obtengo la posicion de la primera columna y la primera fila 1:1
                let dataRows = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1});

                // genero el archivo SQL

                let sql = `CREATE TABLE ##TEMPORAL_PATENTE_SIMCARD (PATENTE VARCHAR(100), SIMCARD VARCHAR(100))\n`;

                // ahora vamos a sumar en la linea anterior con todos los datos que existan el el archivo

                dataRows.forEach(row => 
                    {
                        // todo esto sucede en la primera fila del archivo excel
                        let PATENTE = row[0]; // columna 1
                        let SIMCARD = row[1]; // columna 2
                       // let rut_cli = row[2]; // columna 3
                       // let nom_cli = row[3]; // columna 4

                        sql += `INSERT INTO ##TEMPORAL_PATENTE_SIMCARD (PATENTE,SIMCARD) VALUES
                        ('${PATENTE}','${SIMCARD}')\n`;
                    }
                ); // fin del for que recorre todo el archivo 
                 
                // se crea el archivo con los datos nuevos
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'TABLA_PATENTE_SIMCARD.sql';
                a.click();

                // 
             document.getElementById('primer__ar').value = '';
            };// fin leer archivo excel
    }
    
    leer_archivo.readAsArrayBuffer(file);
}// FIN FUNCION 2


// FUNCION 3

function procesarTercerExcel()
{
    
    let archivo_file = document.getElementById('primer__ar');
    let file = archivo_file.files[0];
    let  leer_archivo;
    if (archivo_file.files.length === 0) {
        alert("Seleccione un archivo antes de generar su hoja de SQL..");
    
    }else 
    {
        
        leer_archivo = new FileReader();
        leer_archivo.onload = function (e) 
            {
                let data = new Uint8Array(e.target.result);
                let worbook = XLSX.read(data, {type: 'array'});
                // aqui obtengo la primera hoja del excel (podemos manipular cualquier hoja)
                let first_hoja = worbook.SheetNames[0];
                let worksheet = worbook.Sheets[first_hoja];

                // aqui obtengo la posicion de la primera columna y la primera fila 1:1
                let dataRows = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1});

                // genero el archivo SQL

                let sql = `CREATE TABLE ##TEMPORAL_ALERTAS_CORREOS (MOV_CODIGO VARCHAR(100), FECHA_INSERTADO VARCHAR(100), ALERTA_ONLINE VARCHAR(10),ALERTA_DIARIA VARCHAR(10),CORREOS VARCHAR(300), FECHA_ULTIMOENVIO VARCHAR(100), ESTADO VARCHAR(10))\n`;

                // ahora vamos a sumar en la linea anterior con todos los datos que existan el el archivo

                dataRows.forEach(row => 
                    {
                        // todo esto sucede en la primera fila del archivo excel
                        let MOV_CODIGO = row[0]; // columna 1
                        let FECHA_INSERTADO = row[1]; // columna 2
                        let ALERTA_ONLINE = row[2]; // columna 3
                        let ALERTA_DIARIA = row[3]; // columna 4
                        let CORREOS = row[4];  // columna 5
                        let FECHA_ULTIMOENVIO = [5];// columna 6
                        let ESTADO = [6];// columna 7

                        sql += `INSERT INTO ##TEMPORAL_ALERTAS_CORREOS (MOV_CODIGO,FECHA_INSERTADO,ALERTA_ONLINE,ALERTA_DIARIA,CORREOS,FECHA_ULTIMOENVIO,ESTADO) VALUES
                        ('${MOV_CODIGO}','${FECHA_INSERTADO}','${ALERTA_ONLINE}','${ALERTA_DIARIA}','${CORREOS}','${FECHA_ULTIMOENVIO}','${ESTADO}')\n`;
                    }
                ); // fin del for que recorre todo el archivo 
                 
                // se crea el archivo con los datos nuevos
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'TABLA_ALERTAS_CORREOS.sql';
                a.click();

                // 
             document.getElementById('primer__ar').value = '';
            };// fin leer archivo excel
    }
    
    leer_archivo.readAsArrayBuffer(file);
}// FIN DE LA FUNCION 3


// FUNCION 4

function procesarCuartoExcel()
{
    
    let archivo_file = document.getElementById('primer__ar');
    let file = archivo_file.files[0];
    let  leer_archivo;
    if (archivo_file.files.length === 0) {
        alert("Seleccione un archivo antes de generar su hoja de SQL..");
    
    }else 
    {
        
        leer_archivo = new FileReader();
        leer_archivo.onload = function (e) 
            {
                let data = new Uint8Array(e.target.result);
                let worbook = XLSX.read(data, {type: 'array'});
                // aqui obtengo la primera hoja del excel (podemos manipular cualquier hoja)
                let first_hoja = worbook.SheetNames[0];
                let worksheet = worbook.Sheets[first_hoja];

                // aqui obtengo la posicion de la primera columna y la primera fila 1:1
                let dataRows = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1});

                // genero el archivo SQL

                let sql = `CREATE TABLE ##TEMPORAL_CLIENTE_ICB (PATENTE VARCHAR(50), VEL_MAX VARCHAR(10), CORREOS_NUEVOS VARCHAR(300));\n`;

                // ahora vamos a sumar en la linea anterior con todos los datos que existan el el archivo

                dataRows.forEach(row => 
                    {
                        // todo esto sucede en la primera fila del archivo excel
                        let CODIGO = row[0]; // columna 1
                        let VEL_MAX = row[1]; // columna 2
                        let CORREOS_NUEVOS = row[2]; // columna 3
                      

                        sql += `INSERT INTO ##TEMPORAL_CLIENTE_ICB (PATENTE,VEL_MAX,CORREOS_NUEVOS) VALUES
                        ('${CODIGO}','${VEL_MAX}','${CORREOS_NUEVOS}');\n`;
                    }
                ); // fin del for que recorre todo el archivo 
                 
                // se crea el archivo con los datos nuevos
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'TABLA_CLIENTE_ICB.sql';
                a.click();

                // 
             document.getElementById('primer__ar').value = '';
            };// fin leer archivo excel
    }
    
    leer_archivo.readAsArrayBuffer(file);
}// FIN DE LA FUNCION 4

// AQUI TERMINAN LAS FUNCIONES DE MANIPULACION DE ARCHIVOS





