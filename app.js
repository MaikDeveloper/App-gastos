const button = document.getElementById("button")
const modal = document.getElementById("modal")
const form = document.getElementById("expense-form")

const totalGastos = document.getElementById("balance")
const transactionsContainer = document.querySelector(".transactions")
const emptyMessage = document.querySelector(".empty")


let balance = 0;
const listaTransacciones = [];

button.addEventListener("click" , ()=> {
    modal.classList.add("active")
}) 


document.addEventListener("click", (e) => {   
    if(e.target === modal) {
        modal.classList.remove("active")
        button.focus()
        form.reset()
    }
})

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active")
        button.focus()
        form.reset()
    }
})

form.addEventListener("submit" ,(e)=> {
    e.preventDefault();

    const tipoGasto = document.getElementById("select").value
    const cantidadGasto = Number(document.getElementById("amount").value)
    const categeoriaGasto = document.getElementById("category").value
    const descripcionGasto = document.getElementById("description").value

    const newTransaction = {
        tipoGasto,
        cantidadGasto,
        categeoriaGasto,
        descripcionGasto
    }

    renderTransactions(newTransaction)
    listaTransacciones.push(newTransaction)
    updateBalance(tipoGasto, cantidadGasto)

    form.reset();
    modal.classList.remove("active")

})

function renderTransactions({tipoGasto, cantidadGasto, categeoriaGasto, descripcionGasto}) {
    emptyMessage.style.display = "none"

    const div = document.createElement("div")
    div.classList.add("transaction" , tipoGasto) 

    div.innerHTML = `
        <div>
            <strong>${categeoriaGasto}</strong>
            <small>${descripcionGasto}</small>
        </div>
        <span>${tipoGasto === "spent" ? "-" : "+"} ${cantidadGasto} €</span>`

    transactionsContainer.appendChild(div)
}

function updateBalance(tipoGasto, cantidadGasto) {
    balance+= tipoGasto === "spent" ? -cantidadGasto : cantidadGasto
    totalGastos.textContent = `${balance} €`
}


