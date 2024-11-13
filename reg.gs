// ID de la hoja de asistencia (Segundo Excel)
var hojaAsistenciaId = 'ID_DE_LA_HOJA_DE_ASISTENCIA';  // Reemplaza con el ID real de tu hoja de asistencia


// Función para verificar las coordenadas y registrar la asistencia
function verificarYRegistrarAsistencia(latPersona, lonPersona, accion, rut) {
  var usuario = obtenerUsuarioPorRut(rut);
  
  if (!usuario) {
    return { success: false, message: "Usuario no encontrado." };
  }

  var coordenadas = usuario.coordenadas.split(',');
  var latReferencia = parseFloat(coordenadas[0].trim());
  var lonReferencia = parseFloat(coordenadas[1].trim());

  var distancia = calcularDistancia(latPersona, lonPersona, latReferencia, lonReferencia);
  
  if (distancia <= 100) {
    var fechaHora = new Date();
    var horaEntradaSalida = (accion === 'entrada') ? fechaHora : '';
    var horaSalida = (accion === 'salida') ? fechaHora : '';

    var sheet = SpreadsheetApp.openById(hojaAsistenciaId).getSheetByName("Asistencia");
    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;
    var todayDate = Utilities.formatDate(fechaHora, Session.getScriptTimeZone(), 'yyyy-MM-dd');  // Fecha en formato YYYY-MM-DD

    // Buscar la fila del usuario y el día actual
    for (var i = 1; i < data.length; i++) { // Empezar desde la fila 2
      if (data[i][0] === usuario.rut && isSameDay(data[i][4], fechaHora)) {  // Comparar RUT y la misma fecha
        rowIndex = i;
        break;
      }
    }

    // Si se encontró la fila, actualizamos la hora de entrada o salida
    if (rowIndex !== -1) {
      if (accion === 'entrada') {
        sheet.getRange(rowIndex + 1, 5).setValue(horaEntradaSalida);  // Columna 5 es Hora Entrada
      } else if (accion === 'salida') {
        sheet.getRange(rowIndex + 1, 6).setValue(horaSalida);  // Columna 6 es Hora Salida
      }
      return { success: true, message: "¡Hora registrada correctamente!" };
    } else {
      // Si no se encuentra la fila, agregamos una nueva fila
      sheet.appendRow([usuario.rut, usuario.nombre, usuario.apellido, usuario.empresa, horaEntradaSalida, horaSalida]);
      return { success: true, message: "¡Nueva entrada registrada correctamente!" };
    }
  } else {
    return { success: false, message: "Estás fuera del área permitida para registrar " + accion + "." };
  }
}

// Función auxiliar para verificar si dos fechas son del mismo día
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}
