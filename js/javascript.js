// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPW_1c2bQx70gU_YDY1Bk54-o9OlSRxMU",
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
const auth = getAuth(app);



// Fetch data and display leaderboard once authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        const playerInfoRef = ref(db, 'playerinfo');
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
    } else {
        console.log("User is signed out");
    }
});

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

window.addToCart = function(product, price) {
    console.log(`Adding to cart: ${product} - €${price}`);
    cart.push({ product, price });
    total += price;
    console.log(`New total: €${total}`);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product} - €${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
        console.log(`Cart updated. Total: €${total}`);
    }
}

// Simulate checkout process
window.checkout = function() {
    alert('Proceed to payment information.');
    document.querySelector('.payment-form').style.display = 'block';
}

// Process payment (simulation)
window.processPayment = function(event) {
    event.preventDefault();
    alert('Payment successful! Thank you for your purchase.');
    cart = [];
    total = 0;
    localStorage.removeItem('cart');
    updateCart();
    document.querySelector('.payment-form').style.display = 'none';
}

// Call updateCart on page load to display cart items if any
updateCart();

// Other existing code...

export function toggleChatbot() {
    var chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.style.display = 'none';
    }
}

// Ensure the function is globally accessible
window.toggleChatbot = toggleChatbot;

// Other existing code...