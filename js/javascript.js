// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "groupproject-6fe29.firebaseapp.com",
    databaseURL: "https://groupproject-6fe29-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "groupproject-6fe29",
    storageBucket: "groupproject-6fe29.appspot.com",
    messagingSenderId: "298463974588",
    appId: "1:298463974588:web:eb43e45d1b285bb7226cb9",
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to player data
const playerInfoRef = ref(db, 'playerinfo');

// Fetch data and display leaderboard
get(child(playerInfoRef, '/')).then((snapshot) => {
    if (snapshot.exists()) {
        const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
        const players = [];

        snapshot.forEach((childSnapshot) => {
            const playerData = childSnapshot.val();
            playerData.score = parseInt(playerData.score, 10); // Convert score to integer
            players.push(playerData);
        });




        // Sort players by score in descending order
        players.sort((a, b) => b.score - a.score);

        // Display each player on the leaderboard
        players.forEach((player, index) => {
            const row = leaderboardTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td>${player.age}</td>
            `;
        });
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error("Error fetching data: ", error);
});


// FILE: js/javascript.js

let cart = [];
let total = 0;

function addToCart(product, price) {
    cart.push({ product, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}