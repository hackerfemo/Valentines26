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
    const x = Math.random() * (window.innerWidth - 150) - (window.innerWidth / 2 - 75);
    const y = Math.random() * (window.innerHeight - 150) - (window.innerHeight / 2 - 75);
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener('mouseover', () => {
    if (counter > 3){
        moveButton()
    } 
});    

noBtn.addEventListener('click', () => {
    let messages = ["Wrong button! x", "Nice try... 😉", "Are you sure? lol", "Try again x", "You're stuck with me!"];
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
    }, 600);
}

function revealSurprise() {
    if (hasBeenClicked) return;
    hasBeenClicked = true;

    surpriseContent.innerHTML = `
        <h1 class="fade-in">Hahahaha! 😂</h1>
        <p class="fade-in">You really think I wouldn't let it be a surprise?</p>
    `;

    setTimeout(() => {
        surpriseContent.innerHTML = `
            <h1 class="fade-in">Just kidding... mostly. ❤️</h1>
            <p class="fade-in">We're getting away from Cambridge for a lil bit! Leaving at 10 ish. xx</p>
            <p class="fade-in">Don't worry — we'll have a chance to get some work done too.</p>
            <p class="fade-in" style="margin-top:20px; font-weight:bold; color:#b0005b; font-size: 1.1rem;">
                Check back Saturday morning to find out more x
            </p>
        `;
    }, 3500);
}

yesBtn.addEventListener('click', clicked_yes);