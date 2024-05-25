
const form_oculto = document.getElementById('ocultar__todo');
const h3_titulo = document.getElementById('h3__cambiar');
const p_cuerpo = document.getElementById('p__completar');
const btn_generar = document.getElementById('cambiar__btn');
const btn_reporte = document.getElementById('btn__reporte_ins');
const btn_crear_tabla = document.getElementById('btn__crear_tabla');
const btn_validar_tabla = document.getElementById('btn__validar_datos');
const btn_recorrer_vin = document.getElementById('btn__recorrer_vin');

let formulario_visible = false;

const estadosVisibilidad = 
{
    reporte: false,
    crearTabla: false,
    validarTabla: false,
    recorrerVin: false
};

function actualizarFormulario(estado, titulo, cuerpo)
{
    if(estado)
        {
            form_oculto.style.visibility = 'hidden';
           
        }else
        {
            form_oculto.style.visibility = 'visible';
            h3_titulo.textContent = titulo;
            p_cuerpo.textContent = cuerpo;  
        }
        return !estado;
}

//boton 1
btn_reporte.addEventListener('click', () => 
    {
        btn_generar.onclick = null;
       estadosVisibilidad.reporte = actualizarFormulario(estadosVisibilidad.reporte,btn_reporte.textContent,'Se tomara el archivo seleccionado y se creara un insertar para SQL');
       btn_generar.onclick = procesarPrimerExcel;
    }); // fin del primer boton de reporte

//boton 2
btn_crear_tabla.addEventListener('click', () => 
    {
        btn_generar.onclick = null;
        estadosVisibilidad.crearTabla = actualizarFormulario(estadosVisibilidad.crearTabla,btn_crear_tabla.textContent,'Vamos a Crear Tabla desde 0 formato SQL');
        btn_generar.onclick = procesarSegundoExcel;
    }) // fin del segundo boton

//boton 3

btn_validar_tabla.addEventListener('click', () => 
    {
        btn_generar.onclick = null;
        estadosVisibilidad.validarTabla = actualizarFormulario(estadosVisibilidad.validarTabla,btn_validar_tabla.textContent,'aqui se genera un archivo donde podremos validar datos');
        btn_generar.onclick = procesarTercerExcel;
    })// fin del tercer boton
//boton 4

btn_recorrer_vin.addEventListener('click', () => 
    {
        btn_generar.onclick = null;
        estadosVisibilidad.recorrerVin = actualizarFormulario(estadosVisibilidad.recorrerVin,btn_recorrer_vin.textContent,'Ingresar Archivo Excel con el que vamos a validar en base de datos');
        btn_generar.onclick = procesarCuartoExcel;
    }) // fin del cuarto boton