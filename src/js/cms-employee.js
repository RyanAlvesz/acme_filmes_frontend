'use strict'

import { getEmployees, postEmployee, updateEmployee, deleteEmployee, updateEmployeePassword } from './functions.js'
import { closeLoading } from './loading.js'

const employeesSection = document.getElementById('employees-section')
const buttonCreateEmployee = document.getElementById('create-employee')
const postEmployeeContainer = document.getElementById('post-employee-container')
const buttonClosePostEmployeeContainer = document.getElementById('close-post-employee')
const editEmployeeContainer = document.getElementById('edit-employee-container')
const buttonCloseEditEmployeeContainer = document.getElementById('close-edit-employee')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const buttonRegisterEmployee = document.getElementById('button-register-employee')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const editEmailInput = document.getElementById('edit-email')
const editPasswordInput = document.getElementById('edit-password')
const buttonSaveEditEmployee = document.getElementById('button-edit-employee')
const buttonDeleteEmployee = document.getElementById('button-delete-employee')

let employeesARRAY

const createGenreCard = (employee) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditEmployee(employee)
        localStorage.setItem('editEmployeeId', employee.id)
        editEmployeeContainer.classList.remove('hidden')
        editEmployeeContainer.classList.add('fixed')
    })

    const employeeName = document.createElement('h2')
    employeeName.classList.add('text-white','font-semibold', 'text-xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    employeeName.textContent = employee.nome

    const employeeEmail = document.createElement('h2')
    employeeEmail.classList.add('text-white','font-semibold', 'text-base', 'drop-shadow-[-1px_1px_0px_#3064B4]','text-center')
    employeeEmail.textContent = employee.email

    card.replaceChildren(employeeName, employeeEmail)

    return card

}

const setEmployees = (employees) => {

    employeesSection.replaceChildren('')
    employees.forEach((employee) => {
        if(employee.id != 1){
            const employeeCard = createGenreCard(employee)
            employeesSection.appendChild(employeeCard)
        }
    })

}

const addPostEmployeeContainer = () => {
    postEmployeeContainer.classList.add('fixed')
    postEmployeeContainer.classList.remove('hidden')
}

const closePostEmployeeContainer = () => {
    postEmployeeContainer.classList.remove('fixed')
    postEmployeeContainer.classList.add('hidden')
    clearPostEmployeeContainer()
}

const clearPostEmployeeContainer = () => {

    nameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''

}

const closeEditEmployeeContainer = () => {
    editEmployeeContainer.classList.add('hidden')
    editEmployeeContainer.classList.remove('fixed')
}

const postEmployeeFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Funcionário... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const employee = {
            nome: nameInput.value,
            email: emailInput.value,
            senha: passwordInput.value
        }
        
        const rsPost = await postEmployee(employee)
        
        const employees = await getEmployees()
        employeesARRAY = employees.funcionarios
        setEmployees(employees.funcionarios)
        
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Funcionário cadastrado com sucesso! <p>',
            icon: 'success',
            iconColor: '#FF0000',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    }


}

const postInputValidation = () => {

    let validation = false

    if (
        nameInput.value == '' ||
        emailInput.value == '' ||
        passwordInput.value == '' 
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    } else {

        validation = true

    }

    return validation

}

const setEditEmployee = (employee) => {

    editPasswordInput.value = ''

    editNameInput.value = employee.nome
    editEmailInput.value = employee.email

}

const deleteEmployeeFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse funcionário? </p>',
        html: '<p class="text-dark_gray"> Essa ação não poderá ser desfeita </p>',
        icon: 'warning',
        iconColor: '#FD3131',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
        width: '35%',
        padding: '0 0 28px 0',
        heightAuto: false,
        reverseButtons: true

    }).then(async (result) => {

        if (result.isConfirmed) {

            const rsDelete = await deleteEmployee(localStorage.getItem('editEmployeeId'))
            const employees = await getEmployees()
            employeesARRAY = employees.funcionarios
            setEmployees(employees.funcionarios)
            closeEditEmployeeContainer()

        }

    }) 

}

const editInputValidation = () => {

    let validation = false

    if (
        editNameInput.value == '' ||
        editEmailInput.value == '' 
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    }  else {

        validation = true

    }

    return validation

}

const updateEmployeeFun = async() => {
 
    if(editInputValidation()){

        let employee = {
            nome: editNameInput.value,
            email: editEmailInput.value
        }

        if(editPasswordInput.value == ''){
            const rsUpdate = await updateEmployee(employee, localStorage.getItem('editEmployeeId'))
        }else{
            employee.senha = editPasswordInput.value
            const rsUpdate = await updateEmployeePassword(employee, localStorage.getItem('editEmployeeId'))
        }

        const employees = await getEmployees()
        employeesARRAY = employees.funcionarios
        setEmployees(employees.funcionarios)    
            
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Funcionário atualizado com sucesso <p>',
            icon: 'success',
            iconColor: '#3064B4',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })


    }

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredEmployees = employeesARRAY.filter((employee) => {
        return (
            employee.nome.toLowerCase().includes(search)
        )
    })
    setEmployees(filteredEmployees)

})

buttonCreateEmployee.addEventListener('click', addPostEmployeeContainer)
buttonClosePostEmployeeContainer.addEventListener('click', closePostEmployeeContainer)
buttonCloseEditEmployeeContainer.addEventListener('click', closeEditEmployeeContainer)
buttonRegisterEmployee.addEventListener('click', postEmployeeFun)
buttonDeleteEmployee.addEventListener('click', deleteEmployeeFun)
buttonSaveEditEmployee.addEventListener('click', updateEmployeeFun)

window.addEventListener('load', async () => {

    const employees = await getEmployees()
    employeesARRAY = employees.funcionarios
    setEmployees(employees.funcionarios)
    closeLoading()

})
