// =====================================
// 1. DATA DEFINITIONS
// =====================================

// ALL 25 photos for the Home Page
const homePhotos = [
    "photo_2026-10-31_14-02-40 (2).jpg",
    "photo_2026-10-31_14-02-40.jpg",
    "photo_2026-10-31_14-02-19.jpg",
    "photo_2026-10-31_14-01-27.jpg",
    "photo_2026-10-31_14-00-48.jpg",
    "photo_2026-10-31_13-59-48.jpg",
    "photo_2026-10-31_13-59-19.jpg",
    "photo_2026-10-31_13-58-54.jpg",
    "photo_2026-10-31_13-58-23.jpg",
    "photo_2026-10-31_13-57-56.jpg",
    "images.jpg",
    "photo_2026-11-02_22-33-42.jpg",
    "photo_2026-11-02_22-33-48.jpg",
    "photo_2026-11-02_22-33-53.jpg",
    "photo_2026-11-02_22-33-58.jpg",
    "photo_2026-11-02_22-34-04.jpg",
    "photo_2026-11-02_22-34-10.jpg",
    "photo_2026-11-02_22-34-15.jpg",
    "photo_2026-11-03_00-19-21.jpg",
    "photo_2026-11-03_00-19-30.jpg",
    "photo_2026-11-03_00-19-36.jpg",
    "photo_2026-11-03_00-19-41.jpg",
    "photo_2026-11-03_00-19-47.jpg",
    "photo_2026-11-03_00-19-57.jpg",
    "photo_2026-11-03_00-20-14.jpg"
];

// Collections for the Gallery Page
const collection1 = [
    "photo_2026-10-31_14-02-40 (2).jpg",
    "photo_2026-10-31_14-02-40.jpg",
    "photo_2026-10-31_14-02-19.jpg",
    "photo_2026-10-31_14-01-27.jpg",
    "photo_2026-10-31_14-00-48.jpg",
    "photo_2026-10-31_13-59-48.jpg",
    "photo_2026-10-31_13-59-19.jpg",
    "photo_2026-10-31_13-58-54.jpg",
    "photo_2026-10-31_13-58-23.jpg",
    "photo_2026-10-31_13-57-56.jpg",
    "images.jpg"
];

const collection2 = [
    "photo_2026-11-02_22-33-42.jpg",
    "photo_2026-11-02_22-33-48.jpg",
    "photo_2026-11-02_22-33-53.jpg",
    "photo_2026-11-02_22-33-58.jpg",
    "photo_2026-11-02_22-34-04.jpg",
    "photo_2026-11-02_22-34-10.jpg",
    "photo_2026-11-02_22-34-15.jpg"
];

const collection3 = [
    "photo_2026-11-03_00-19-21.jpg",
    "photo_2026-11-03_00-19-30.jpg",
    "photo_2026-11-03_00-19-36.jpg",
    "photo_2026-11-03_00-19-41.jpg",
    "photo_2026-11-03_00-19-47.jpg",
    "photo_2026-11-03_00-19-57.jpg",
    "photo_2026-11-03_00-20-14.jpg"
];

const collections = {
    1: collection1,
    2: collection2,
    3: collection3
};

// =====================================
// 2. STATE VARIABLES
// =====================================
let homeCurrentIndex = 0;
let currentPhotos = []; // Used for the Gallery page
let currentIndex = 0;

// =====================================
// 3. HOME PAGE FUNCTIONS
// =====================================
function openHomePhoto(index) {
    homeCurrentIndex = index;
    showHomePhoto();
    document.getElementById("lightbox").style.display = "flex";
}

function showHomePhoto() {
    const lightboxImage = document.getElementById("lightboxImage");
    const photoCount = document.getElementById("photoCount");
    const thumbnailList = document.getElementById("thumbnailList");

    if (!lightboxImage || !photoCount || !thumbnailList) return;

    lightboxImage.src = "images/" + homePhotos[homeCurrentIndex];
    photoCount.textContent = "Photo " + (homeCurrentIndex + 1) + " / " + homePhotos.length;

    thumbnailList.innerHTML = "";

    homePhotos.forEach(function(filename, index) {
        const thumb = document.createElement("img");
        thumb.src = "images/" + filename;
        thumb.alt = "Photo " + (index + 1);

        if (index === homeCurrentIndex) {
            thumb.classList.add("active-thumbnail");
        }

        thumb.onclick = function(event) {
            event.stopPropagation();
            homeCurrentIndex = index;
            showHomePhoto();
        };

        thumbnailList.appendChild(thumb);
    });
}

function changeHomePhoto(direction, event) {
    if (event) event.stopPropagation();
    homeCurrentIndex = (homeCurrentIndex + direction + homePhotos.length) % homePhotos.length;
    showHomePhoto();
}

// =====================================
// 4. GALLERY PAGE FUNCTIONS
// =====================================
function openAlbum(number) {
    
    // --- PASSWORD CHECK ---
    let code = prompt("Please enter the code to view this collection:");
    
    // If the user clicks Cancel, leaves it blank, or types the wrong code
    if (code == null || code !== "1111") {
        alert("Required failed! Incorrect code.");
        return; // Stops the function so the album doesn't open
    }
    // -------------------------------------

    const albumContainer = document.getElementById("albumContainer");
    const albumView = document.getElementById("albumView");
    const albumTitle = document.getElementById("albumTitle");
    const albumPhotos = document.getElementById("albumPhotos");

    if (!albumContainer || !albumView || !albumTitle || !albumPhotos) {
        console.error("Gallery HTML elements are missing.");
        return;
    }

    currentPhotos = collections[number];

    if (!currentPhotos) {
        console.error("Collection not found.");
        return;
    }

    currentIndex = 0;
    albumPhotos.innerHTML = "";

    albumTitle.textContent = "Collection " + number + " - " + currentPhotos.length + " Photos";

    currentPhotos.forEach(function(filename, index) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const caption = document.createElement("figcaption");

        img.src = "images/" + filename;
        img.alt = "Photo " + (index + 1);

        img.onclick = function() {
            openLightbox(index);
        };

        caption.textContent = "Photo " + (index + 1);

        figure.appendChild(img);
        figure.appendChild(caption);
        albumPhotos.appendChild(figure);
    });

    albumContainer.style.display = "none";
    albumView.style.display = "block";
}

function closeAlbum() {
    const albumView = document.getElementById("albumView");
    const albumContainer = document.getElementById("albumContainer");
    
    if (albumView) albumView.style.display = "none";
    if (albumContainer) albumContainer.style.display = "flex";
    
    closeLightbox();
}

function openLightbox(index) {
    currentIndex = index;
    showGalleryPhoto();
    document.getElementById("lightbox").style.display = "flex";
}

function showGalleryPhoto() {
    const lightboxImage = document.getElementById("lightboxImage");
    const photoCount = document.getElementById("photoCount");
    const thumbnailList = document.getElementById("thumbnailList");

    if (!lightboxImage || !photoCount || !thumbnailList) return;

    lightboxImage.src = "images/" + currentPhotos[currentIndex];
    photoCount.textContent = "Photo " + (currentIndex + 1) + " / " + currentPhotos.length;

    thumbnailList.innerHTML = "";

    currentPhotos.forEach(function(filename, index) {
        const thumb = document.createElement("img");
        thumb.src = "images/" + filename;
        thumb.alt = "Photo " + (index + 1);

        if (index === currentIndex) {
            thumb.classList.add("active-thumbnail");
        }

        thumb.onclick = function(event) {
            event.stopPropagation();
            currentIndex = index;
            showGalleryPhoto();
        };

        thumbnailList.appendChild(thumb);
    });
}

function changePhoto(direction, event) {
    if (event) event.stopPropagation();
    if (currentPhotos.length === 0) return;
    currentIndex = (currentIndex + direction + currentPhotos.length) % currentPhotos.length;
    showGalleryPhoto();
}

// =====================================
// 5. SHARED FUNCTION (Lightbox Close)
// =====================================
function closeLightbox(event) {
    if (event) event.stopPropagation();
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
    }
}

// =====================================
// 6. KEYBOARD CONTROLS
// =====================================
document.addEventListener("keydown", function(event) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox || lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    // Detect if we are on the Gallery page or Home page
    if (document.getElementById("albumView") && document.getElementById("albumView").style.display === "block") {
        if (currentPhotos.length === 0) return;
        if (event.key === "ArrowRight") changePhoto(1);
        if (event.key === "ArrowLeft") changePhoto(-1);
    } else {
        if (event.key === "ArrowRight") changeHomePhoto(1);
        if (event.key === "ArrowLeft") changeHomePhoto(-1);
    }
});

// =====================================
// 7. URL ROUTING (FOR CONTACT PAGE LINKS)
// =====================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Check if the URL has a hash (like index.html#gallery)
    const hash = window.location.hash;

    if (hash === '#gallery') {
        // Scroll to Gallery
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            setTimeout(() => {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }, 100); // slight delay ensures page is fully loaded
        }
    } 
    else if (hash === '#about') {
        // Scroll to About
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            setTimeout(() => {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});