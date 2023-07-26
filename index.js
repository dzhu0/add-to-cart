import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e3130-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const addToCart = ref(database, "add-to-cart")

const inputFormEl = document.getElementById("input-form")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

inputFormEl.addEventListener("submit", addItemToCart)

onValue(addToCart, snapshot => {
    if (snapshot.exists()) {
        clearShoppingListEl()

        Object.entries(snapshot.val()).forEach(appendItemToShoppingListEl)
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function addItemToCart(e) {
    e.preventDefault()

    const inputValue = inputFieldEl.value
    inputValue && push(addToCart, inputValue)

    clearInputFieldEl()
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
    inputFieldEl.focus()
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item) {
    const [itemID, itemValue] = item
    const newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", () => {
        remove(ref(database, `add-to-cart/${itemID}`))
    })

    shoppingListEl.append(newEl)
}
