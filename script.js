
const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");

const welcomeScreen = document.getElementById("welcomeScreen");
const letterScreen = document.getElementById("letterScreen");

// Background music
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.35;

let isOpened = false;

// Open the envelope and start the music
function openLetter() {
    if (isOpened) return;

    isOpened = true;

    // Start music only when the letter button is clicked
    backgroundMusic.play().catch((error) => {
        console.log("Music playback was blocked:", error);
    });

    envelope.classList.add("open");
    openButton.textContent = "Opening your letter... ♡";

    setTimeout(() => {
        welcomeScreen.style.display = "none";
        letterScreen.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1200);
}

envelope.addEventListener("click", openLetter);
openButton.addEventListener("click", openLetter);


// =================================
// RANDOM FLOATING HEARTS
// =================================

const heartContainer = document.getElementById("floatingHearts");

const heartSymbols = ["♡", "♥"];

function createHeart() {
    const heart = document.createElement("span");

    heart.classList.add("random-heart");

    heart.innerHTML =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 22) + "px";

    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 650);


// =================================
// CHAPTER 02 - MEMORY INTERACTIONS
// =================================

const continueButton = document.getElementById("continueButton");
const memoriesSection = document.getElementById("memoriesSection");

continueButton.addEventListener("click", () => {
    letterScreen.style.display = "none";
    memoriesSection.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Open individual memory cards

const memoryCards = document.querySelectorAll(".memory-card");
const memoryModal = document.getElementById("memoryModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalMessage = document.getElementById("modalMessage");

memoryCards.forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalCaption.textContent = card.dataset.caption;
        modalMessage.textContent = card.dataset.message;

        memoryModal.classList.add("active");
    });
});

// Close memory popup

function closeMemory() {
    memoryModal.classList.remove("active");
}

closeModal.addEventListener("click", closeMemory);

memoryModal.addEventListener("click", (event) => {
    if (event.target === memoryModal) {
        closeMemory();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMemory();
    }
});


// CHAPTER 02 → CHAPTER 03

const memoriesContinueButton =
    document.getElementById("memoriesContinueButton");

const gallerySection =
    document.getElementById("gallerySection");

memoriesContinueButton?.addEventListener("click", () => {
    memoriesSection.classList.remove("show");
    memoriesSection.style.display = "none";

    gallerySection.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Filter photos by category

const filterButtons = document.querySelectorAll(".filter-button");
const photoCards = document.querySelectorAll(".photo-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        photoCards.forEach(card => {
            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


// Enlarge photos when clicked

const photoModal = document.getElementById("photoModal");
const expandedPhoto = document.getElementById("expandedPhoto");

const closePhotoModal =
    document.getElementById("closePhotoModal");

photoCards.forEach(card => {
    card.addEventListener("click", () => {
        const image = card.querySelector("img");

        expandedPhoto.src = image.src;
        expandedPhoto.alt = image.alt;

        photoModal.classList.add("active");
    });
});

function closeExpandedPhoto() {
    photoModal.classList.remove("active");
    expandedPhoto.src = "";
}

closePhotoModal.addEventListener("click", closeExpandedPhoto);

photoModal.addEventListener("click", event => {
    if (event.target === photoModal) {
        closeExpandedPhoto();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeExpandedPhoto();
    }
});


// CHAPTER 03 → CHAPTER 04

const letterChapter = document.getElementById("letterChapter");

document.getElementById("galleryContinueButton")
    ?.addEventListener("click", () => {

        document.getElementById("gallerySection")
            .classList.remove("show");

        letterChapter.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

// CHAPTER 04 → CHAPTER 05
const letterContinueButton = document.getElementById("letterContinueButton");
const birthdayFinale = document.getElementById("birthdayFinale");

letterContinueButton?.addEventListener("click", () => {
    document.getElementById("letterChapter").classList.remove("show");
    birthdayFinale.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// BIRTHDAY CAKE COUNTDOWN
const startCakeButton = document.getElementById("startCakeButton");
const countdown = document.getElementById("countdown");
const finalBirthdayMessage = document.getElementById("finalBirthdayMessage");

startCakeButton?.addEventListener("click", () => {

    // Prevent clicking the button more than once
    startCakeButton.disabled = true;
    startCakeButton.style.display = "none";

    let count = 3;
    countdown.textContent = count;

    const timer = setInterval(() => {
        count--;

        if (count > 0) {
            countdown.textContent = count;
        } else {
            clearInterval(timer);

            countdown.textContent = "Make a wish! 💗";

            // Blow out all three candles
            document.querySelectorAll(".candle").forEach(candle => {
                candle.classList.add("blown");
            });

            // Reveal the birthday message
            setTimeout(() => {
                finalBirthdayMessage.classList.add("show");

                finalBirthdayMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 1800);
        }
    }, 1000);
});

/* BIRTHDAY CONFETTI */

function createBirthdayConfetti() {
    const container = document.getElementById("confettiContainer");

    if (!container || container.dataset.started === "true") return;

    container.dataset.started = "true";

    const symbols = [
        { symbol: "♡", type: "heart" },
        { symbol: "♥", type: "heart" },
        { symbol: "✦", type: "star" },
        { symbol: "✧", type: "star" }
    ];

    const colors = [
        "#f4a6c1",
        "#e88eac",
        "#ffd6a5",
        "#f7c8d8",
        "#d9b5e8",
        "#fff0b3"
    ];

    for (let i = 0; i < 90; i++) {
        const piece = document.createElement("span");

        const randomType = Math.random();

        if (randomType < 0.55) {
            const item = symbols[Math.floor(Math.random() * symbols.length)];
            piece.textContent = item.symbol;
            piece.classList.add(item.type);
        } else {
            piece.classList.add("square");
        }

        piece.classList.add("confetti-piece");

        piece.style.left = Math.random() * 100 + "%";
        piece.style.color = colors[Math.floor(Math.random() * colors.length)];
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const duration = 3 + Math.random() * 4;
        piece.style.animationDuration = duration + "s";
        piece.style.animationDelay = Math.random() * 1.5 + "s";
        piece.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");
        piece.style.setProperty("--spin", (Math.random() * 1000 - 500) + "deg");

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, (duration + 2) * 1000);
    }
}
