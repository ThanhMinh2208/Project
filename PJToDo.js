document.querySelector("form").addEventListener("submit",event => {
    event.preventDefault()
    const name = document.getElementById("name").value
    const item = {
        id: new Date().toISOString(),
        name: name.trim()
    }
    addItemToUI(item)
    addItemToLS(item)
    document.getElementById("name").value = ""
})

// add to LocalStorage
const addItemToLS = (item) => {
    const list = getList()
    list.push(item)
    localStorage.setItem("list", JSON.stringify(list))
}
// add to UI
const addItemToUI = (item) => {
    const card = document.createElement("div")
    card.className = "card p-2 justify-content-between align-items-center flex-row mb-3 "
    card.innerHTML = `
    <span>${item.name}</span>
    <button class="btn btn-small btn-danger btn-remove"
    data-id=${item.id}>Remove</button>
    `
    document.querySelector(".list").appendChild(card)
}

//remove item from localstorage
const removeItemFromLS = (id) => {
    const list = getList()
    const index = list.findIndex(item => item.id === id)
    list.splice(index, 1)
    localStorage.setItem("list", JSON.stringify(list))
}

//listen click remove
document.querySelector(".list").addEventListener("click", event => {
    if(event.target.classList.contains("btn-remove")) {
        const name = event.target.previousElementSibling.textContent
        const isConPirmed = confirm(`Bạn có muốn xóa ${name}?`)
        if(isConPirmed) {
            const card = event.target.parentElement
            const id = event.target.dataset.id
            //remove form ui
            card.remove()
            // remove from LS
            removeItemFromLS(id)
        }
    }
})

//remove all 
document.getElementById("btn-remove-all").addEventListener("click", event => {
    const isConpirmed = confirm("Bạn có muốn xóa hết không?")
    if(isConpirmed) {
        localStorage.removeItem("list")
        document.querySelector(".list").innerHTML = ""
    }
})

//filter 
document.getElementById("filter").addEventListener("keyup",event => {
    const value = event.target.value.trim()
    const list = getList()
    const filteredList = list.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })
    document.querySelector(".list").innerHTML = ""
    filteredList.forEach(item => {
        addItemToUI(item)
    })
})

//get list
const getList = () => JSON.parse(localStorage.getItem("list")) || []
// Get list when reset
const init = () => {
    const list = getList()
    list.forEach(item => {
        addItemToUI(item)
    });
}

init()