// Get all the html elements

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote-button");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loader at start
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Loader ends
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Fetch quotes

function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   console.log(quote.text);
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   author is null or not
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  complete();
  quoteText.textContent = quote.text;
}
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

// onload
getQuotes();
