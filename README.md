# AppLogin

## Instalación
Requiere la instalación de node https://nodejs.org.
Tras clonar el repositorio, ejecutar `npm install`.
Ejecutar `ng serve` y navegar a `http://localhost:4200/`.

## Test manual
(1) Intentar loguearse con cualquier usuario. Si el usuario no está dado de alta se escribirá en consola el mensaje: "Credenciales no validas."
(2) Acceder a "Crear cuenta", se mostrará el formulario de `signup`.
(3) Crear un usuario nuevo, rellenar: nombre, e-mail y contraseña.
(4) Tras crear al usuario se redigirá a la home.
(5) Verificar el usuario creado en el Local Storage del navegador.
(6) Introducir las credenciales del usuario (email y contraseña) en el formulario de login.
(7) Si las credenciales son correctas aparecerá un diálogo pidiendo el código de validación.
(8) Para desarrollo el código es `1234`, si el código introducido es correcto se hará el login y se accederá al area privada. El token de sessión y uid se almacenarán en el Local Storage.


## TODO
- Validación input de los campos del formulario
- Test unitarios
- Hacer el log-out

