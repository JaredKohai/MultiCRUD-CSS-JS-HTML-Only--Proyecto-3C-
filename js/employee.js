// Comprobamos si existen datos de usuarios en el almacenamiento local, si no existen, creamos una lista predeterminada
let usersData = localStorage.getItem('usersData');
if (!usersData) {
  usersData = [
    { id: 1, name: "John Doe", username: "john.doe", email: "john@example.com", userType: "Administrador" },
    { id: 2, name: "Jane Smith", username: "jane.smith", email: "jane@example.com", userType: "Empleado" }
  ];
  saveToLocalStorage();
} else {
  usersData = JSON.parse(usersData);
}

// Función para guardar la lista de usuarios en el almacenamiento local
function saveToLocalStorage() {
  localStorage.setItem('usersData', JSON.stringify(usersData));
}

// Función para cargar la tabla con los datos de los usuarios
function loadTable() {
  var trHTML = '';
  for (let user of usersData) {
    // Creamos una fila por cada usuario
    trHTML += '<tr>';
    trHTML += '<td>' + user['id'] + '</td>';
    // Mostramos el avatar correspondiente según el tipo de usuario
    trHTML += '<td><img width="50px" src="' + getAvatarPath(user['userType']) + '" class="avatar"></td>';
    trHTML += '<td>' + user['name'] + '</td>';
    trHTML += '<td>' + user['username'] + '</td>';
    trHTML += '<td>' + user['email'] + '</td>';
    trHTML += '<td>' + user['userType'] + '</td>';
    // Botones de editar y eliminar para cada usuario
    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + user['id'] + ')">Editar</button>';
    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + user['id'] + ')">Eliminar</button></td>';
    trHTML += '</tr>';
  }
  // Mostramos las filas en la tabla
  document.getElementById("mytable").innerHTML = trHTML;
}

// Función para obtener la ruta del avatar según el tipo de usuario
function getAvatarPath(userType) {
  const avatarMap = {
    "Administrador": "../img/admin.png",
    "Base de datos": "../img/database.png",
    "Moderador": "../img/moderator.png",
    "Empleado": "../img/avatar.png"
  };
  return avatarMap[userType] || "../img/avatar.png";
}

// Función para mostrar el cuadro de diálogo de creación de usuario
function showUserCreateBox() {
  Swal.fire({
    title: 'Crear usuario',
    html:
      '<input id="fname" class="swal2-input" placeholder="Nombre">' +
      '<input id="lname" class="swal2-input" placeholder="Apellido">' +
      '<input id="username" class="swal2-input" placeholder="Nombre de Usuario">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<select id="userType" class="swal2-input">' +
      '  <option value="Administrador">Administrador</option>' +
      '  <option value="Base de datos">Base de datos</option>' +
      '  <option value="Moderador">Moderador</option>' +
      '  <option value="Empleado">Empleado</option>' +
      '</select>',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  });
}

// Función para validar el formato del correo electrónico
function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// Función para crear un nuevo usuario
function userCreate() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const userType = document.getElementById("userType").value;

  // Validamos que todos los campos estén completos
  if (!fname || !lname || !username || !email) {
    Swal.fire('Error', 'Complete todos los datos.', 'error');
    return;
  }

  // Creamos el nuevo usuario con los datos proporcionados
  const newUser = {
    id: usersData.length + 1,
    name: fname + ' ' + lname,
    username: username,
    email: email,
    userType: userType
  };

  // Agregamos el nuevo usuario a la lista y actualizamos la tabla
  usersData.push(newUser);
  saveToLocalStorage();
  loadTable();
  // Mostramos un mensaje de éxito
  Swal.fire("Éxito", "Datos enviados con éxito.", "success");
}

// Función para mostrar el cuadro de diálogo de edición de usuario
function showUserEditBox(id) {
  const user = usersData.find(u => u.id === id);
  Swal.fire({
    title: 'Editar usuario',
    html:
      '<input id="id" type="hidden" value=' + user['id'] + '>' +
      '<input id="fname" class="swal2-input" placeholder="Nombre" value="' + user['name'] + '">' +
      '<input id="username" class="swal2-input" placeholder="Nombre de Usuario" value="' + user['username'] + '">' +
      '<input id="email" class="swal2-input" placeholder="Email" value="' + user['email'] + '">' +
      '<select id="userType" class="swal2-input">' +
      '<option value="Administrador">Administrador</option>' +
      '<option value="Base de datos">Base de datos</option>' +
      '<option value="Moderador">Moderador</option>' +
      '<option value="Empleado">Empleado</option>' +
      '</select>',
    focusConfirm: false,
    preConfirm: () => {
      userEdit();
    }
  })
}

// Función para editar los datos de un usuario
function userEdit() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const userType = document.getElementById("userType").value;

  // Buscamos el usuario por su ID en la lista
  const userIndex = usersData.findIndex(u => u.id === Number(id));
  if (userIndex !== -1) {
    // Actualizamos la información del usuario
    usersData[userIndex].name = fname;
    usersData[userIndex].username = username;
    usersData[userIndex].email = email;
    usersData[userIndex].userType = userType;
    // Guardamos los cambios y actualizamos la tabla
    saveToLocalStorage();
    loadTable();
    // Si se cumple las condiciones se completo con exito y se muestra el mensaje. Swalfire es del script personalizado
    Swal.fire("Usuario editado exitosamente!");
  } else {
    // Error message del script si no encuentra el usuario
    Swal.fire("No se encontró el usuario.");
  }
}

// Función para eliminar un usuario
function userDelete(id) {
  const userIndex = usersData.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    // Para eliminar usuario y actualizar con la id con la que se elimino
    usersData.splice(userIndex, 1);
    saveToLocalStorage();
    loadTable();
    // Exito
    Swal.fire("Usuario eliminado exitosamente!");
  } else {
    // Error
    Swal.fire("No se encontró el usuario.");
  }
}

// Cargamos la tabla al cargar la página
loadTable();
