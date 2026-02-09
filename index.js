const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const surpriseContent = document.getElementById("surpriseContent");

let counter = 0;
let hasBeenClicked = false;

// Chaotic movement logic
function moveButton() {
    // Allows the button to move nearly anywhere on the screen
    const padding = 20; // Keeps the button 20px away from the screen edge
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    // Calculate the available space on the phone screen
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    // Ensure it doesn't go negative or off-screen
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    // Calculate the offset from the center of the screen (where the card is)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const finalX = randomX - centerX + (buttonWidth / 2);
    const finalY = randomY - centerY + (buttonHeight / 2);

    noBtn.style.transform = `translate(${finalX}px, ${finalY}px)`;
}

noBtn.addEventListener('mouseover', () => {
    if (counter > 3){
        moveButton()
    } 
});    

noBtn.addEventListener('click', () => {
    let messages = ["Wrong button! x", "Nice try... 😉", "Are you sure?", "Try again x", "You're stuck with me!"];
    message.textContent = messages[counter % messages.length];
    counter++;

    if (counter > 5) { // Becomes a Yes button after 5 attempts
        noBtn.classList.replace("no", "yes");
        noBtn.textContent = "Yes! ❤️";
        noBtn.style.transform = "translate(0,0)";
        noBtn.onclick = clicked_yes;
    } else {
        moveButton();
    }
});

function clicked_yes() {
    // Slide card 1 out to the left
    card1.style.transform = "translate(-150%, -50%) rotate(-5deg)";
    card1.style.opacity = "0";
  
    // Slide card 2 in from the right
    setTimeout(() => {
        card1.style.display = "none";
        card2.classList.remove("hidden");
        setTimeout(() => {
            card2.style.transform = "translate(-50%, -50%)";
            card2.style.opacity = "1";
        }, 50);
    }, 2000);
}

function revealSurprise() {
    if (hasBeenClicked) return;
    hasBeenClicked = true;

    // Phase 1: The "Real" Reveal (The Tease)
    surpriseContent.innerHTML = `
        <h1 class="fade-in">Accessing Secret Plans...</h1>
        <div class="spinner"></div> 
        <p class="fade-in" style="font-style: italic;">Syncing itinerary to calendar...</p>
    `;

    // Phase 2: The "Gotcha" Joke
    setTimeout(() => {
        surpriseContent.innerHTML = `
            <h1 class="fade-in">Hahahaha! 😂</h1>
            <p class="fade-in">You really think I wouldn't let it be a surprise?</p>
        `;

        // Phase 3: The Actual Details
        setTimeout(() => {
            surpriseContent.innerHTML = `
                <h1 class="fade-in">Here's a lil hint for now x</h1>
                <img src="photo1.jpeg" class="fade-in polaroid" alt="Us">
                <p class="fade-in">We're getting away from Cambridge for a lil bit! Leaving at 10 ish.</p>
                <p class="fade-in">Don't worry — we'll have a chance to get some work done too.</p>
                <p class="fade-in" style="margin-top:20px; font-weight:bold; color:#b0005b; font-size: 1.1rem;">
                    Check back Saturday morning to find out more x
                </p>
            `;
        }, 4000); // 4 seconds of the joke
    }, 5000); // 3 seconds of the "Fake Loading"
}

yesBtn.addEventListener('click', clicked_yes);