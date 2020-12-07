const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuote = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

const showLoading = () => {
  loader.hidden = false
  quoteContainer.hidden = true
}

const hideLoading = () => {
  if (!loader.hidden) {
    loader.hidden = true
    quoteContainer.hidden = false
  }
}

const proxyUrl = 'https://sleepy-fjord-31986.herokuapp.com/'
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

const getQuote = async () => {
  showLoading()
  try {
    const res = await fetch(proxyUrl + apiUrl)
    const data = await res.json()
    authorText.innerText = data.quoteAuthor ? data.quoteAuthor : 'Unknown' // Put 'Unknown' if there isn't any author.
    data.quoteText.length > 100 ? quote.classList.add('long-quote') : quote.classList.remove('long-quote')
    quoteText.innerText = data.quoteText
    // Stop Loader
    hideLoading()
  } catch (err) {
    getQuote()
  }
}

// Tweet Quote

const tweetQuote = () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl)
}

// Event Listeners

newQuote.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load

getQuote()