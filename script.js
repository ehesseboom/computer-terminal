// DOM Elements
const inputCommands = document.getElementById('input-commands')
const outputCommands = document.getElementById('output-commands')
let placeholderCommand = document.getElementById('placeholder')

// Event Listener
inputCommands.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const command = inputCommands.value.trim()
    if (command) {
      displayCommand(command)
      handleCommand(command)
      inputCommands.value = ''
    }
  }
})

// Display User Command
function displayCommand (command) {
  const commandItem = document.createElement('li')
  commandItem.textContent = '> ' + command
  outputCommands.appendChild(commandItem)

  if (placeholderCommand) {
    placeholderCommand.remove()
    placeholderCommand = null
  }
}

const commandHistory = []

// Handle Commands
function handleCommand (command) {
  const trimmedCommand = command.toLowerCase()
  commandHistory.push(command)

  switch (true) {
    case trimmedCommand === '.help':
      handleHelp()
      break
    case trimmedCommand === '.settings':
      handleSettings()
      break
    case trimmedCommand === '.clear':
      handleClear()
      break
    case trimmedCommand === '.about':
      handleAbout()
      break
    case trimmedCommand === '.github':
      handleGithub()
      break
    case trimmedCommand === '.time':
      handleTime()
      break
    case trimmedCommand === '.date':
      handleDate()
      break
    case trimmedCommand === '.coinflip':
      handleCoinFlip()
      break
    case trimmedCommand === '.history':
      handleHistory()
      break
    case trimmedCommand === '.history clear':
      handleHistoryClear()
      break
    case trimmedCommand === '.uptime':
      handleUptime()
      break
    case trimmedCommand.startsWith('.countdown'):
      handleCountdown(command)
      break
    case trimmedCommand.startsWith('.rolldice'):
      handleRollDice(command)
      break
    case trimmedCommand.startsWith('.weather'):
      handleWeather(command)
      break
    case trimmedCommand.startsWith('.google'):
      handleGoogleSearch(command)
      break
    case trimmedCommand.startsWith('.youtube'):
      handleYoutubeSearch(command)
      break
    default:
      handleCalculation(command)
      break
  }
}

// .help Command
function handleHelp () {
  const responseHelp = document.createElement('li')
  responseHelp.innerHTML =
    '> Available commands:<br>' +
    '&nbsp;.help – list available commands<br>' +
    '&nbsp;.settings – change the settings of the terminal<br>' +
    '&nbsp;.about – information about this terminal<br>' +
    '&nbsp;.time – current time<br>' +
    '&nbsp;.date – current day and date<br>' +
    '&nbsp;.countdown – set a countdown in seconds. E.g: .countdown 60<br>' +
    '&nbsp;.coinflip – coin flip heads or tails<br>' +
    '&nbsp;.rolldice – roll up to 5 dices. E.g: .rolldice 3<br>' +
    '&nbsp;.google – make a Google search. E.g: .google JavaScript Cheatsheet<br>' +
    '&nbsp;.youtube – make a YouTube search. E.g: .youtube JavaScript Tutorial<br>' +
    '&nbsp;.weather – current weather of a location. E.g: .weather Amsterdam<br>' +
    '&nbsp;.github – a link to my GitHub page<br>' +
    '&nbsp;.clear – clear the terminal<br>' +
    '&nbsp;.history – a history of used commands. To clear history: .history clear<br>' +
    '&nbsp;.uptime – time the terminal has been running since reload<br>' +
    '&nbsp;Basic calculations – addition (+), subtraction (-), multiplication (*) and division (/)'
  outputCommands.appendChild(responseHelp)
}

// .settings Command
function handleSettings () {
  setColor()
  setFontSize()
}

// .settings Terminal Color
function setColor () {
  const settingTerminalColor = document.createElement('li')
  settingTerminalColor.textContent = '> Terminal color: '
  outputCommands.appendChild(settingTerminalColor)

  const terminalColors = ['Amber', 'Blue', 'Green', 'Cyan', 'White']
  terminalColors.forEach(color => {
    const colorValue = {
      Amber: { background: '#140e04', text: '#ffb642' },
      Blue: { background: '#031014', text: '#2ecfff' },
      Green: { background: '#18221D', text: '#21FF9D' },
      Cyan: { background: '#142020', text: '#00ffc8' },
      White: { background: '#0f1414', text: '#c0ffff' }
    }

    const btnColor = document.createElement('button')
    const btnStyles = colorValue[color]
    btnColor.textContent = color
    btnColor.style.marginRight = '0.2rem'
    btnColor.style.backgroundColor = btnStyles.background
    btnColor.style.color = btnStyles.text
    btnColor.style.outline = 'none'
    btnColor.style.border = 'none'
    btnColor.style.width = '3.5rem'
    settingTerminalColor.appendChild(btnColor)

    btnColor.addEventListener('click', () => {
      const styles = colorValue[color]
      document.body.style.backgroundColor = styles.background
      document.body.style.color = styles.text
      localStorage.setItem('terminalColors', JSON.stringify(styles))
    })

    btnColor.addEventListener('focus', () => {
      btnColor.style.border = `1px solid ${btnStyles.text}`
    })

    btnColor.addEventListener('blur', () => {
      btnColor.style.border = 'none'
    })
  })
}

// applying saved colors on terminal reload
function applySavedColors () {
  const savedColors = localStorage.getItem('terminalColors')
  if (savedColors) {
    const { background, text } = JSON.parse(savedColors)
    document.body.style.backgroundColor = background
    document.body.style.color = text
  }
}

// .settings Terminal Font Size
function setFontSize () {
  const settingFontSize = document.createElement('li')
  settingFontSize.textContent = '> Terminal font size: '
  outputCommands.appendChild(settingFontSize)

  const terminalFontSizes = ['Small', 'Medium', 'Large']
  const fontSizeValue = {
    Small: { size: '0.9rem' },
    Medium: { size: '1rem' },
    Large: { size: '1.1rem' }
  }

  terminalFontSizes.forEach(fontSize => {
    const btnFontSize = document.createElement('button')
    const btnStyles = fontSizeValue[fontSize]
    btnFontSize.textContent = fontSize
    btnFontSize.style.background = 'none'
    btnFontSize.style.marginRight = '0.2rem'
    btnFontSize.style.border = 'none'
    btnFontSize.style.outline = 'none'
    btnFontSize.style.width = '4rem'
    btnFontSize.style.color = 'inherit'
    settingFontSize.appendChild(btnFontSize)

    btnFontSize.addEventListener('click', () => {
      document.body.style.fontSize = btnStyles.size
      localStorage.setItem('terminalFontSizes', JSON.stringify(btnStyles))
    })
    btnFontSize.addEventListener('focus', () => {
      btnFontSize.style.border = `1px solid ${
        getComputedStyle(document.body).color
      }`
    })

    btnFontSize.addEventListener('blur', () => {
      btnFontSize.style.border = 'none'
    })
  })
}

// applying saved font size on terminal reload
function applySavedFontSize () {
  const savedFontSize = localStorage.getItem('terminalFontSizes')
  if (savedFontSize) {
    const { size } = JSON.parse(savedFontSize)
    document.body.style.fontSize = size
  }
}

applySavedColors()
applySavedFontSize()

// .about Command
function handleAbout () {
  const responseAbout = document.createElement('li')
  responseAbout.textContent =
    '> Welcome to my Terminal! This custom web-based terminal was built using HTML, CSS, and JavaScript as a learning project. It simulates a basic command-line interface, allowing users to input commands like .help, .about, and perform simple calculations. The terminal dynamically updates the display by creating and appending HTML elements based on user input, providing an interactive experience within the browser. Enjoy!'
  outputCommands.appendChild(responseAbout)
}

// .clear Command
function handleClear () {
  outputCommands.innerHTML = ''
  const newPlaceholder = document.createElement('li')
  newPlaceholder.id = 'placeholder'
  newPlaceholder.textContent = '> Made by Ennio Esseboom | ©2025.'
  outputCommands.appendChild(newPlaceholder)
  placeholderCommand = newPlaceholder
}

// .history Command
function handleHistory () {
  if (commandHistory.length === 0) {
    const noHistoryMessage = document.createElement('li')
    noHistoryMessage.textContent = '> No commands in history.'
    outputCommands.appendChild(noHistoryMessage)
    return
  }

  commandHistory.forEach((cmd, index) => {
    const responseHistory = document.createElement('li')
    responseHistory.textContent = `> ${index + 1}: ${cmd}`
    outputCommands.appendChild(responseHistory)
  })
}

// .history clear Command
function handleHistoryClear () {
  commandHistory.length = 0
  const clearHistoryMessage = document.createElement('li')
  clearHistoryMessage.textContent = '> Command history cleared.'
  outputCommands.appendChild(clearHistoryMessage)
}

const startTime = Date.now()

// .uptime Command
function handleUptime () {
  const currentTime = Date.now()
  const terminalUptime = currentTime - startTime
  const seconds = Math.floor((terminalUptime / 1000) % 60)
  const minutes = Math.floor((terminalUptime / (1000 * 60)) % 60)
  const hours = Math.floor(terminalUptime / (1000 * 60 * 60))

  let uptimeMessage = '> Terminal uptime: '
  if (hours > 0) {
    uptimeMessage += `${hours} hour${hours > 1 ? 's' : ''}, `
  }
  if (minutes > 0 || hours > 0) {
    uptimeMessage += `${minutes} minute${minutes > 1 ? 's' : ''}, `
  }
  uptimeMessage += `${seconds} second${seconds > 1 ? 's' : ''}`

  const responseUptime = document.createElement('li')
  responseUptime.textContent = uptimeMessage
  outputCommands.appendChild(responseUptime)
}

// .github Command
function handleGithub () {
  const responseGithub = document.createElement('li')
  const link = document.createElement('a')
  link.href = 'https://github.com/ehesseboom'
  link.textContent = 'Check out my GitHub!'
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  responseGithub.appendChild(document.createTextNode('> '))
  responseGithub.appendChild(link)
  outputCommands.appendChild(responseGithub)
}

// .time Command
function handleTime () {
  const currentTime = new Date()
  const timeString = currentTime.toLocaleTimeString()
  const timeItem = document.createElement('li')
  timeItem.textContent = '> Current time: ' + timeString
  outputCommands.appendChild(timeItem)
}

// .date Command
function handleDate () {
  const currentDate = new Date()
  const dateString = currentDate.toLocaleDateString()
  const dayIndex = currentDate.getDay()
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const dayName = days[dayIndex]
  const dateItem = document.createElement('li')
  dateItem.textContent = '> Current date: ' + dayName + ', ' + dateString
  outputCommands.appendChild(dateItem)
}

// .countdown Command
function handleCountdown (command) {
  let countdownTimer = parseInt(command.slice(11).trim())
  const responseCountdown = document.createElement('li')

  if (isNaN(countdownTimer) || countdownTimer <= 0) {
    responseCountdown.textContent =
      '> Please provide a valid positive number. E.g: .countdown 60'
    outputCommands.appendChild(responseCountdown)
    return
  }

  responseCountdown.textContent = `> Countdown: ${countdownTimer}`
  outputCommands.appendChild(responseCountdown)

  const intervalId = setInterval(() => {
    countdownTimer--
    responseCountdown.textContent = `> Countdown: ${countdownTimer}`

    if (countdownTimer <= 0) {
      clearInterval(intervalId)
      responseCountdown.textContent = '> Time is up!'
    }
  }, 1000)
}

// .rolldice Command
function handleRollDice (command) {
  const randomNumberOne = Math.floor(Math.random() * 6) + 1
  const randomNumberTwo = Math.floor(Math.random() * 6) + 1
  const randomNumberThree = Math.floor(Math.random() * 6) + 1
  const randomNumberFour = Math.floor(Math.random() * 6) + 1
  const randomNumberFive = Math.floor(Math.random() * 6) + 1
  const amountDice = command.slice(10).trim()
  const responseRollDice = document.createElement('li')
  outputCommands.appendChild(responseRollDice)
  if (amountDice === '1') {
    responseRollDice.textContent = '> You rolled: ' + randomNumberOne
  } else if (amountDice === '2') {
    responseRollDice.textContent =
      '> You rolled: ' + randomNumberOne + ' | ' + randomNumberTwo
  } else if (amountDice === '3') {
    responseRollDice.textContent =
      '> You rolled: ' +
      randomNumberOne +
      ' | ' +
      randomNumberTwo +
      ' | ' +
      randomNumberThree
  } else if (amountDice === '4') {
    responseRollDice.textContent =
      '> You rolled: ' +
      randomNumberOne +
      ' | ' +
      randomNumberTwo +
      ' | ' +
      randomNumberThree +
      ' | ' +
      randomNumberFour
  } else if (amountDice === '5') {
    responseRollDice.textContent =
      '> You rolled: ' +
      randomNumberOne +
      ' | ' +
      randomNumberTwo +
      ' | ' +
      randomNumberThree +
      ' | ' +
      randomNumberFour +
      ' | ' +
      randomNumberFive
  } else {
    responseRollDice.textContent =
      '> Please enter the amount of dice (1-5) you want to roll. E.g: .rolldice 5'
  }
}

// .coinflip command
function handleCoinFlip () {
  const responseCoinFlip = document.createElement('li')
  const randomNumber = Math.floor(Math.random() * 2) + 1
  if (randomNumber === 1) {
    responseCoinFlip.textContent = '> Heads'
  } else {
    responseCoinFlip.textContent = '> Tails'
  }
  outputCommands.appendChild(responseCoinFlip)
}

// .weather Command
async function handleWeather (command) {
  const city = command.slice(8).trim()

  if (!city) {
    const errorItem = document.createElement('li')
    errorItem.textContent =
      '> Please prodive a city name, e.g: .weather Amsterdam'
    outputCommands.appendChild(errorItem)
    return
  }

  const apiKey = '3e3cb535bc72efe258803f2dbf3b7b3a'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Location not found')
    }
    const data = await response.json()

    const cityName = data.name
    const temperature = data.main.temp
    const weatherDescription = data.weather[0].description

    const weatherItem = document.createElement('li')
    weatherItem.textContent = `> ${cityName}, ${Math.round(
      temperature
    )}°C - ${weatherDescription}`
    outputCommands.appendChild(weatherItem)
  } catch (error) {
    const errorItem = document.createElement('li')
    errorItem.textContent = `> Error: ${error.message}`
    outputCommands.appendChild(errorItem)
  }
}

// .google Command
function handleGoogleSearch (command) {
  const searchQuery = command.slice(8).trim()

  if (!searchQuery) {
    const errorItem = document.createElement('li')
    errorItem.textContent =
      '> Please provide a search term, e.g: .google Siberian Tiger'
    outputCommands.appendChild(errorItem)
    return
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchQuery
  )}`
  window.open(googleSearchUrl, '_blank')
}

// .youtube Command
function handleYoutubeSearch (command) {
  const searchQuery = command.slice(8).trim()

  if (!searchQuery) {
    const errorItem = document.createElement('li')
    errorItem.textContent =
      '> Please provide a search term, e.g: .youtube JavaScript Tutorial'
    outputCommands.appendChild(errorItem)
    return
  }

  const youtubeSearchUrl = `https://www.youtube.com/search?q=${encodeURIComponent(
    searchQuery
  )}`
  window.open(youtubeSearchUrl, '_blank')
}

// Handle Calculations
function handleCalculation (command) {
  if (
    command.includes('+') ||
    command.includes('-') ||
    command.includes('*') ||
    command.includes('/')
  ) {
    if (!isValidCalculation(command)) {
      const errorMessage = document.createElement('li')
      errorMessage.textContent = '> Error: Invalid characters in calculation.'
      outputCommands.appendChild(errorMessage)
      return
    }

    try {
      const result = eval(command)
      const calculation = document.createElement('li')
      calculation.textContent = '> ' + result
      outputCommands.appendChild(calculation)
    } catch (error) {
      const errorMessage = document.createElement('li')
      errorMessage.textContent = '> Error: Unable to perform calculation.'
      outputCommands.appendChild(errorMessage)
    }
  } else {
    const unknownCommand = document.createElement('li')
    unknownCommand.textContent = '> Error: Unknown command.'
    outputCommands.appendChild(unknownCommand)
  }
}

// Validate Calculation Input
function isValidCalculation (input) {
  const validPattern = /^[0-9+\-*/().\s]+$/
  return validPattern.test(input)
}
