// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPW_1c2bQx70gU_YDY1Bk54-o9OlSRxMU",
    authDomain: "groupproject-6fe29.firebaseapp.com",
    databaseURL: "https://groupproject-6fe29-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "groupproject-6fe29",
    storageBucket: "groupproject-6fe29.appspot.com",
    messagingSenderId: "298463974588",
    appId: "1:298463974588:web:eb43e45d1b285bb7226cb9",
    measurementId: "G-RWHJBX82B2"
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
            // Parse the score as a number to ensure proper sorting
            playerData.score = parseInt(playerData.score, 10);
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
