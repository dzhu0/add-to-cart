// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Firebase configuration settings
const appSettings = {
    databaseURL: "https://playground-e3130-default-rtdb.firebaseio.com/"
}

// Initialize Firebase app
const app = initializeApp(appSettings)
const database = getDatabase(app)

// Reference to the "add-to-cart" node in the database
const addToCart = ref(database, "add-to-cart")

// DOM element references
const inputFormEl = document.getElementById("input-form")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

// Object to store timeout IDs for removal delay
const timeoutIDs = {}

// Event listener for form submission
inputFormEl.addEventListener("submit", addItemToCart)

// Firebase listener for changes in the "add-to-cart" node
onValue(addToCart, snapshot => {
    if (snapshot.exists()) {
        // If there are items, clear the shopping list and append new items
        clearShoppingListEl()
        Object.entries(snapshot.val()).forEach(appendItemToShoppingListEl)
    } else {
        // If no items, display a message
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

// Function to handle form submission
function addItemToCart(e) {
    e.preventDefault()

    // Get the input value and push it to the database if not empty
    const inputValue = inputFieldEl.value
    inputValue && push(addToCart, inputValue)

    // Clear the input field after submission
    clearInputFieldEl()
}

// Function to clear the input field
function clearInputFieldEl() {
    inputFieldEl.value = ""
    inputFieldEl.focus()
}

// Function to clear the shopping list
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

// Function to append an item to the shopping list
function appendItemToShoppingListEl(item) {
    // Destructure item array into itemID and itemValue
    const [itemID, itemValue] = item

    // Create a new list element
    const newEl = document.createElement("li")

    // Set the text content of the new element
    newEl.textContent = itemValue

    // Add a click event listener to toggle the "remove" class
    newEl.addEventListener("click", () => {
        newEl.classList.toggle("remove")

        // Manage removal timeout for each item
        if (!timeoutIDs[itemID]) {
            timeoutIDs[itemID] = setTimeout(() => {
                remove(ref(database, `add-to-cart/${itemID}`))
                delete timeoutIDs[itemID]
            }, 1500)
        } else {
            clearTimeout(timeoutIDs[itemID])
            delete timeoutIDs[itemID]
        }
    })

    // Append the new element to the shopping list
    shoppingListEl.append(newEl)
}
