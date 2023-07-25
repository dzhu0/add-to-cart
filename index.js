import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e3130-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFormEl = document.getElementById("input-form")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

inputFormEl.addEventListener("submit", addItemToShoppingList)

onValue(shoppingListInDB, snapshot => {
    if (snapshot.exists()) {
        clearShoppingListEl()

        Object.entries(snapshot.val()).forEach(appendItemToShoppingListEl)
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function addItemToShoppingList(e) {
    e.preventDefault()

    const inputValue = inputFieldEl.value
    inputValue && push(shoppingListInDB, inputValue)

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
        remove(ref(database, `shoppingList/${itemID}`))
    })

    shoppingListEl.append(newEl)
}
