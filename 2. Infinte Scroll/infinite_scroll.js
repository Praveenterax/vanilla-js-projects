// Target elements for DOM manipulation
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
// initial count 5 for better loading
let count = 5;
const apiKey = "API_KEY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Image loaded function

function imageLoaded() {
  // console.log("loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // count = 10;
    // console.log("totalImages", totalImages);
    // console.log(ready);
  }
}

// DRY code --- DO NOT REPEAT YOURSELF ---- setattribute function

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// DisplayPhotos function

function displayPhotos() {
  imagesLoaded = 0;

  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Create <a> and img tags, and set attributes
    const item = document.createElement("a");

    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    // Using Set attributes function
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create img tag
    const img = document.createElement("img");

    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    // Using Set attributes function
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check if all images are loaded
    imageLoaded();

    // Appending to the parent items

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos function

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
  } catch (error) {
    alert(error);
  }
}

// infinite scroll,scroll till bottom to load

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("scrolled");
  }
});

// Onload
getPhotos();
