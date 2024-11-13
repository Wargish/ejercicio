// Función para verificar las credenciales de login
function verificarCredenciales(email, password) {
  // Aquí puedes reemplazar estos valores con los datos que desees verificar.
  var emailCorrecto = "usuario@dominio.com";  // Email de prueba
  var passwordCorrecto = "123456";            // Contraseña de prueba
  
  // Verificar si el email y la contraseña coinciden
  if (email === emailCorrecto && password === passwordCorrecto) {
    return 'success';  // Si las credenciales son correctas, devolver "success"
  } else {
    return 'failure';  // Si las credenciales son incorrectas, devolver "failure"
  }
}

// Función para mostrar la página de login cuando se acceda al script
function doGet() {
  return HtmlService.createHtmlOutputFromFile('login');
}
