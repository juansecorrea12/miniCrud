import { users } from './users.js'

// Genera las filas de la tabla para mostrar los usuarios
function htmlRowsUsers() {
    let idNumber = 0;
    const html = users.map((user) => {
        return `<tr>
                    <td>${idNumber += 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser(${idNumber})">Eliminar</button>
                    </td>
                </tr>`
    })
    return html.join("")
}

function htmlRowUser(newUserCallback) {
    const newUser = newUserCallback()
    const html = newUser.map((user) => {
        let idNumber = 0;
        return `<tr>
        <td>${idNumber += 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteUser(${idNumber})">Eliminar</button>
        </td>
    </tr>`
    });
    return html.join('');
}


// devuelve el body 
function getTablebody() {
    return document.getElementById('table-body')
}
// Imprime los usuarios en el documento
function printUsers() {
    const htmlDataUsers = htmlRowsUsers()
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}

function prinUsersUpdate(newUser) {
    const htmlDataUsers = newUser
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}
// Obtiene los datos del nuevo usuario
function getNewUser() {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputAge = document.getElementById('input-age')
    const inputGender = document.getElementById('select-age')
    const newUser = {
        id: users.length + 1,
        name: inputName.value,
        email: inputEmail.value,
        age: inputAge.value,
        gender: inputGender.value
    }
    return newUser
}
// Imprime los datos de un usuario nuevo en el documento
function addUser() {
    const newUser = getNewUser()
        // const tableBody = getTablebody()
        // const htmlNewUser = htmlRowUser(newUser)
        // tableBody.innerHTML += htmlNewUser
    users.unshift(newUser);
    printUsers();
    cleanForm();

}

function deleteUser(idUser) {
    users.splice(idUser - 1, 1);
    printUsers();
}

window.deleteUser = deleteUser;

// Borrar los campos
function cleanForm() {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputAge = document.getElementById('input-age')

    inputName.value = '';
    inputEmail.value = '';
    inputAge.value = '';
}

// Llamadas al cargar la página
printUsers()
    // Volvemos la función addUser parte del objeto window
window.addUser = addUser



// Filters
function filter() {
    const selectFilter = document.querySelector('.filtro');
    const idFilter = selectFilter.value;
    console.log(idFilter);

    switch (idFilter) {
        case 'woman':
            const result = users.filter(user => user.gender == 'female');
            return result;
            break;
        case 'email':
            const emailAca = users.filter(user => user.email.endsWith('@academlo.com'));
            return emailAca;
            break;
        case 'orderName':
            const orderName = users.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0;
                }
            });
            return orderName;
            break;
        default:
            console.log('---- ninguno ----- ');
    }
}

function printFilter() {
    let filtros = htmlRowUser(filter);
    prinUsersUpdate(filtros);
}

window.printFilter = printFilter;
window.deleteUser = deleteUser;