<script>
function smartyi() {
            let inputFile = document.getElementById('smarty');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `\n`;
 
 
                dataRows.forEach(row => {
                    let MOV_CODIGO = row[0];
                    let MOV_PATENTE = row[1];
                    let MOV_IDGPS = row[2];
                    let MOV_NOMBRE = row[3];
                    let MOV_FOTO = row[4];
                    let MOV_RUT = row[5];
                    let MOV_GRUPO3 = row[6];
                    let MOV_GRUPO4 = row[7];
                    sql += `INSERT INTO MOVILES ( MOV_CODIGO,MOV_PATENTE,MOV_IDGPS,MOV_NOMBRE,MOV_FOTO,MOV_RUT,MOV_GRUPO3, MOV_GRUPO4) VALUES
                ('${MOV_CODIGO}', '${MOV_PATENTE}', '${MOV_IDGPS}', '${MOV_NOMBRE}', '${MOV_FOTO}', '${MOV_RUT}', '${MOV_GRUPO3}', '${MOV_GRUPO4}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_TEMPORALZRACc.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
 
        function procesarPrimerExcel() {
            let inputFile = document.getElementById('excelFile1');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `CREATE TABLE ##TEMPORALZRACc (PATENTE VARCHAR(255), SERIE VARCHAR(255));\n`;
 
                dataRows.forEach(row => {
                    let patente = row[0];
                    let serie = row[1];
                    sql += `INSERT INTO ##TEMPORALZRACc (PATENTE, SERIE) VALUES ('${patente}', '${serie}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_TEMPORALZRACc.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
        function procesarSegundoExcel() {
            let inputFile = document.getElementById('ONLINE_Excel');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la hoja "FIELDBEAT"
                let sheetName = 'CONSOLIDADO_2024';
                let worksheet = workbook.Sheets[sheetName];
 
                // Modificar las opciones para leer las columnas AQ y BH.
                let options = {
                    header: 1,
                    range: 1, // Esto especifica el rango de columnas AQ a BH.
                };
 
                // Leer los datos de la hoja "FIELDBEAT" y las columnas AQ y BH.
                let dataRows2 = XLSX.utils.sheet_to_json(worksheet, options);
 
                // Genera el archivo SQL
                let sql = ` CREATE TABLE ##TEMP_INSTALACIO_SALFA (SERIE VARCHAR(255), IDGPS VARCHAR(255), fecha_soli VARCHAR(255), fecha_ins VARCHAR(255), instalacion VARCHAR(255), MANTENCION VARCHAR(255));\n`;
 
                dataRows2.forEach(row => {
                    let patente = row[3];
                    let fechaNumero_soli = row[7];
                    let fechaNumero_ins = row[8];
                    // let fecha = new Date((fechaNumero - (25567 + 2)) * 86400 * 1000); // Convertir el número de Excel a fecha
                    // fecha = fecha.toISOString().split('T')[0]; // Formatear la fecha como 'YYYY-MM-DD'
                    let fecha1 = new Date((fechaNumero_soli - (25567 + 1)) * 86400 * 1000); // Convertir el número de Excel a fecha
                    // Obtener día, mes y año
                    let dia1 = fecha1.getDate().toString().padStart(2, '0');
                    let mes1 = (fecha1.getMonth() + 1).toString().padStart(2, '0');
                    let ano1 = fecha1.getFullYear().toString().slice(-2);
                    // Formatear la fecha como 'DD-MM-YY'
                    let fechaFormateada1 = `${dia1}-${mes1}-${ano1}`;
 
                    let fecha = new Date((fechaNumero_ins - (25567 + 1)) * 86400 * 1000); // Convertir el número de Excel a fecha
                    // Obtener día, mes y año
                    let dia = fecha.getDate().toString().padStart(2, '0');
                    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                    let ano = fecha.getFullYear().toString().slice(-2);
                    // Formatear la fecha como 'DD-MM-YY'
                    let fechaFormateada2 = `${dia}-${mes}-${ano}`;
 
                    let serie = row[12];
                    let instalacion = row[9] ? row[9] : 'S/D'; // Validar si hay datos en la columna de instalación
                    let MANTENCION = row[10] ? row[10] : 'S/D';
                    sql += `INSERT INTO ##TEMP_INSTALACIO_SALFA (SERIE, IDGPS,fecha_soli,fecha_ins, instalacion , MANTENCION) VALUES ('${patente}', '${serie}', '${fechaFormateada1}', '${fechaFormateada2}', '${instalacion}', '${MANTENCION}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'TEMP_INSTALACIO_SALFA.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
        function procesarTercerExcel() {
            let inputFile = document.getElementById('excelFile3');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `CREATE TABLE ##TEMPORAL_Daniel (vin VARCHAR(255), gps VARCHAR(255), fecha VARCHAR(255));\n`;
 
                dataRows.forEach(row => {
                    let vin = row[4];
                    let gps = row[11];
                    let FECHA = row[24];
                    // let vin = row[0];
                    // let gps = row[1];
                    // let FECHA = row[2];
                    sql += `INSERT INTO ##TEMPORAL_Daniel (vin, gps,fecha) VALUES ('${vin}', '${gps}', '${FECHA}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_Daniel.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
        function procesar4Excel() {
            let inputFile = document.getElementById('4Excel');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `CREATE TABLE ##TEMPORAL_Daniel (vin VARCHAR(255), gps VARCHAR(255), fecha VARCHAR(255));\n`;
 
                dataRows.forEach(row => {
 
                    let vin = row[0];
                    let gps = row[1];
                    let FECHA = row[2];
                    sql += `INSERT INTO ##TEMPORAL_Daniel (vin, gps,fecha) VALUES ('${vin}', '${gps}', '${FECHA}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_Daniel.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
        function procesar5Excel() {
            let inputFile = document.getElementById('5Excel');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `CREATE TABLE ##temporal_data_Instalacion (patente VARCHAR(255), Solucion VARCHAR(255) );\n`;
 
                dataRows.forEach(row => {
 
                    let vin = row[0];
                    let gps = row[1];
                    sql += `INSERT INTO ##temporal_data_Instalacion (patente, Solucion) VALUES ('${vin}', '${gps}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_Instalacion.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
 
        function procesar2Excel() {
            let inputFile = document.getElementById('excelFile2');
 
            let file = inputFile.files[0];
            if (!file) {
                alert('Selecciona un archivo Excel antes de procesar.');
                return;
            }
 
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
 
                // Obtén la primera hoja del libro
                let firstSheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[firstSheetName];
 
                // Extrae datos de las dos primeras filas
                let dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
 
                // Genera el archivo SQL
                let sql = `CREATE TABLE ##temporal_data_programacion (patente VARCHAR(255), VIN VARCHAR(255) );\n`;
 
                dataRows.forEach(row => {
 
                    let patente = row[0];
                    let VIN = row[1];
                    sql += `INSERT INTO ##temporal_data_programacion (patente, VIN) VALUES ('${VIN}', '${patente}');\n`;
                });
 
                // Crea un archivo SQL y lo descarga
                let blob = new Blob([sql], { type: 'application/sql' });
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'temporal_data_programacion.sql';
                a.click();
            };
 
            reader.readAsArrayBuffer(file);
        }
 
    </script>