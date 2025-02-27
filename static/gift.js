let container = document.getElementById("container");
let lastOne = document.getElementById("lastOne");
let cuteText = document.getElementById(".cute");

document.getElementById("gift-box").addEventListener("click", function() {
    container.innerHTML = "";
    // Generate confetti
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.backgroundColor = ["gold", "red", "blue", "green", "purple"][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * 100 + "px";
        confetti.style.animationDuration = (1 + Math.random()) + "s";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1500);
    }
    // Hide the gift box and show the lastOne div
    container.style.display = "none";
    setTimeout(() =>cuteText.style.display = "flex" , 500);
    setTimeout(() =>lastOne.style.display = "flex" , 1500);
    
});
