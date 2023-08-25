const navigation = document.querySelector('.navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')
// const switchSum = document.querySelector('.turnkey-station-sum')
const date = document.querySelector('.footer-copyright')
const request = document.querySelectorAll('.leaveRequest')
const navigationLinks = document.querySelectorAll('.nav-link')

const visibility = navigation.getAttribute('data-visible')

navToggle.addEventListener('click', () => {
  const visibility = navigation.getAttribute('data-visible')
  if (visibility === 'false') {
    navigation.setAttribute('data-visible', true)
    navToggle.setAttribute('aria-expended', true)
    navToggle.style.background = `url('./src/assets/hamburger_close.svg') no-repeat center`
    document.body.style.overflow = 'hidden'
  } else {
    navigation.setAttribute('data-visible', false)
    navToggle.setAttribute('aria-expended', false)
    navToggle.style.background = `url('./src/assets/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
})

// function switchBtnClick(index) {
//   const switchBtn = Array.from(
//     document.querySelectorAll('.turnkey-station-switch')
//   )

//   switchBtn.forEach((btn, i) => {
//     btn.classList.toggle('turnkey-station-switch-active', i === index)
//   })

//   switchSum.innerHTML = getSwitchSumText(index)
// }

// function getSwitchSumText(index) {
//   const switchSumText = {
//     0: '10 000 $',
//     1: '5 000 $',
//     2: '2 000 $',
//   }

//   return switchSumText[index] || ''
// }

document.addEventListener('DOMContentLoaded', () => {
  date.innerHTML = `Romstal Ukraine © ${new Date().getFullYear()}`
})

function scrollToSection(e, offset) {
  e.preventDefault()

  const targetId = e.target.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const targetPosition = targetSection.offsetTop + offset
    window.scrollTo({
      top: targetPosition,
    })
  }

  if (visibility) {
    navToggle.setAttribute('aria-expanded', 'false')
    navigation.setAttribute('data-visible', false)
    navToggle.style.background = `url('./src/assets/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
}

function scrollToCall(sectionId, offset) {
  const section = document.getElementById(sectionId)
  const topPos =
    section.getBoundingClientRect().top + window.pageYOffset + offset
  window.scrollTo({ top: topPos })

  if (visibility) {
    navToggle.setAttribute('aria-expanded', 'false')
    navigation.setAttribute('data-visible', false)
    navToggle.style.background = `url('./src/assets/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
}

navigationLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    scrollToSection(e, -83)
  })
})

request.forEach((item) => {
  item.addEventListener('click', () => {
    scrollToCall('callForm', -83)
  })
})

function toggleHeaderStyle() {
  let previousScroll = window.pageYOffset
  const header = document.querySelector('#header')
  const headerHeight = header.offsetHeight
  let headerTopPosition = 0

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset

    if (currentScroll > previousScroll && currentScroll > headerHeight) {
      headerTopPosition = -headerHeight
    } else if (currentScroll < previousScroll && currentScroll > 100) {
      headerTopPosition = 0
    }

    header.style.top = headerTopPosition + 'px'
    previousScroll = currentScroll
  })
}
toggleHeaderStyle()

/* Slider Photo*/
const sliderPhoto = document.querySelector('.slider-photo')
const carouselPhoto = document.querySelector('.carousel')
const firstCardWidth = carouselPhoto.querySelector('.card').offsetWidth
const arrowBtns = document.querySelectorAll('.turn-btn-photo')
const carouselChildren = [...carouselPhoto.children]

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId

let cardPerView = Math.round(carouselPhoto.offsetWidth / firstCardWidth)

carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouselPhoto.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildren.slice(0, cardPerView).forEach((card) => {
  carouselPhoto.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselPhoto.classList.add('no-transition')
carouselPhoto.scrollLeft = carouselPhoto.offsetWidth
carouselPhoto.classList.remove('no-transition')

arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselPhoto.scrollLeft +=
      btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = (e) => {
  isDragging = true
  carouselPhoto.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carouselPhoto.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return
  carouselPhoto.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false
  carouselPhoto.classList.remove('dragging')
}

const infiniteScroll = () => {
  if (carouselPhoto.scrollLeft === 0) {
    carouselPhoto.classList.add('no-transition')
    carouselPhoto.scrollLeft =
      carouselPhoto.scrollWidth - 2 * carouselPhoto.offsetWidth
    carouselPhoto.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselPhoto.scrollLeft) ===
    carouselPhoto.scrollWidth - carouselPhoto.offsetWidth
  ) {
    carouselPhoto.classList.add('no-transition')
    carouselPhoto.scrollLeft = carouselPhoto.offsetWidth
    carouselPhoto.classList.remove('no-transition')
  }

  clearTimeout(timeoutId)
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return
  timeoutId = setTimeout(
    () => (carouselPhoto.scrollLeft += firstCardWidth),
    1000
  )
}
autoPlay()

carouselPhoto.addEventListener('mousedown', dragStart)
carouselPhoto.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carouselPhoto.addEventListener('scroll', infiniteScroll)
sliderPhoto.addEventListener('mouseenter', () => clearTimeout(timeoutId))
sliderPhoto.addEventListener('mouseleave', autoPlay)
/* End Of Slider Photo */

// /* Slider Video  */
// const sliderVideo = document.querySelector('.slider-video')
// const carouselVideo = document.querySelector('.carousel-video')
// const firstCardVideoWidth =
//   carouselVideo.querySelector('.card-video').offsetWidth
// const arrowVideoBtns = document.querySelectorAll('.turn-btn-video')
// const carouselVideoChildren = [...carouselVideo.children]

// let isDraggingVideo = false,
//   isAutoPlayVideo = true,
//   startXVideo,
//   startScrollLeftVideo,
//   timeoutIdVideo

// let cardPerViewVideo = Math.round(
//   carouselVideo.offsetWidth / firstCardVideoWidth
// )

// carouselVideoChildren
//   .slice(-cardPerViewVideo)
//   .reverse()
//   .forEach((card) => {
//     carouselVideo.insertAdjacentHTML('afterbegin', card.outerHTML)
//   })

// carouselVideoChildren.slice(0, cardPerViewVideo).forEach((card) => {
//   carouselVideo.insertAdjacentHTML('beforeend', card.outerHTML)
// })

// carouselVideo.classList.add('no-transition')
// carouselVideo.scrollLeft = carouselVideo.offsetWidth
// carouselVideo.classList.remove('no-transition')

// arrowVideoBtns.forEach((btn) => {
//   btn.addEventListener('click', () => {
//     carouselVideo.scrollLeft +=
//       btn.id === 'left' ? -firstCardVideoWidth : firstCardVideoWidth
//   })
// })

// const dragStartVideo = (e) => {
//   isDraggingVideo = true
//   carouselVideo.classList.add('dragging')
//   startXVideo = e.pageX
//   startScrollLeftVideo = carouselVideo.scrollLeft
// }

// const draggingVideo = (e) => {
//   if (!isDraggingVideo) return
//   carouselVideo.scrollLeft = startScrollLeftVideo - (e.pageX - startXVideo)
// }

// const dragStopVideo = () => {
//   isDraggingVideo = false
//   carouselVideo.classList.remove('dragging')
// }

// const infiniteScrollVideo = () => {
//   if (carouselVideo.scrollLeft === 0) {
//     carouselVideo.classList.add('no-transition')
//     carouselVideo.scrollLeft =
//       carouselVideo.scrollWidth - 2 * carouselVideo.offsetWidth
//     carouselVideo.classList.remove('no-transition')
//   } else if (
//     Math.ceil(carouselVideo.scrollLeft) ===
//     carouselVideo.scrollWidth - carouselVideo.offsetWidth
//   ) {
//     carouselVideo.classList.add('no-transition')
//     carouselVideo.scrollLeft = carouselVideo.offsetWidth
//     carouselVideo.classList.remove('no-transition')
//   }

//   clearTimeout(timeoutIdVideo)
// }

// const autoPlayVideo = () => {
//   if (window.innerWidth < 800 || !isAutoPlayVideo) return
//   timeoutIdVideo = setTimeout(
//     () => (carouselVideo.scrollLeft += firstCardVideoWidth),
//     1500
//   )
// }
// autoPlayVideo()

// carouselVideo.addEventListener('mousedown', dragStartVideo)
// carouselVideo.addEventListener('mousemove', draggingVideo)
// document.addEventListener('mouseup', dragStopVideo)
// carouselVideo.addEventListener('scroll', infiniteScrollVideo)
// sliderVideo.addEventListener('mouseenter', () => clearTimeout(timeoutIdVideo))
// sliderVideo.addEventListener('mouseleave', autoPlayVideo)
// /* End Of Slider Video */

/* Slider Cooperate*/
const sliderCooperate = document.querySelector('.slider-cooperate')
const carouselCooperate = document.querySelector('.carousel-cooperate')
const firstCarCooperatedWidth =
  carouselCooperate.querySelector('.card-cooperate').offsetWidth
const arrowCooperateBtns = document.querySelectorAll('.turn-btn-cooperate')
const carouselCooperateChildren = [...carouselCooperate.children]

let isDraggingCooperate = false,
  isAutoPlayCooperate = true,
  startXCooperate,
  startScrollLeftCooperate,
  timeoutIdCooperate

let cardPerViewCooperate = Math.round(
  carouselCooperate.offsetWidth / firstCarCooperatedWidth
)

carouselCooperateChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouselCooperate.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselCooperateChildren.slice(0, cardPerView).forEach((card) => {
  carouselCooperate.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselCooperate.classList.add('no-transition')
carouselCooperate.scrollLeft = carouselCooperate.offsetWidth
carouselCooperate.classList.remove('no-transition')

arrowCooperateBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselCooperate.scrollLeft +=
      btn.id === 'left' ? -firstCarCooperatedWidth : firstCarCooperatedWidth
  })
})

const dragStartCooperate = (e) => {
  isDraggingCooperate = true
  carouselCooperate.classList.add('dragging')
  startXCooperate = e.pageX
  startScrollLeftCooperate = carouselCooperate.scrollLeft
}

const draggingCooperate = (e) => {
  if (!isDraggingCooperate) return
  carouselCooperate.scrollLeft =
    startScrollLeftCooperate - (e.pageX - startXCooperate)
}

const dragStopCooperate = () => {
  isDraggingCooperate = false
  carouselCooperate.classList.remove('dragging')
}

const infiniteScrollCooperate = () => {
  if (carouselCooperate.scrollLeft === 0) {
    carouselCooperate.classList.add('no-transition')
    carouselCooperate.scrollLeft =
      carouselCooperate.scrollWidth - 2 * carouselCooperate.offsetWidth
    carouselCooperate.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselCooperate.scrollLeft) ===
    carouselCooperate.scrollWidth - carouselCooperate.offsetWidth
  ) {
    carouselCooperate.classList.add('no-transition')
    carouselCooperate.scrollLeft = carouselCooperate.offsetWidth
    carouselCooperate.classList.remove('no-transition')
  }

  clearTimeout(timeoutIdCooperate)
}

const autoPlayCooperate = () => {
  if (window.innerWidth < 800 || !isAutoPlayCooperate) return
  timeoutIdCooperate = setTimeout(
    () => (carouselCooperate.scrollLeft += firstCarCooperatedWidth),
    1500
  )
}
autoPlayCooperate()

carouselCooperate.addEventListener('mousedown', dragStartCooperate)
carouselCooperate.addEventListener('mousemove', draggingCooperate)
document.addEventListener('mouseup', dragStopCooperate)
carouselCooperate.addEventListener('scroll', infiniteScrollCooperate)
sliderCooperate.addEventListener('mouseenter', () =>
  clearTimeout(timeoutIdCooperate)
)
sliderCooperate.addEventListener('mouseleave', autoPlayCooperate)
/* End Of Slider Cooperate */

if (window.matchMedia('(min-width: 577px)').matches) {
  carouselChildren.forEach((card) => {
    card.addEventListener('click', openFullScreen)
  })
}

function openFullScreen() {
  const clickedCard = this
  document.body.style.overflow = 'hidden'
  const fullScreenCard = clickedCard.cloneNode(true)
  fullScreenCard.classList.add('full-screen-card')

  const closeButton = document.createElement('button')
  closeButton.classList.add('close-gallery-button')
  closeButton.addEventListener('click', closeFullScreen)

  const fullScreenContainer = document.createElement('div')
  fullScreenContainer.classList.add('full-screen-container')
  fullScreenContainer.appendChild(fullScreenCard)
  fullScreenCard.appendChild(closeButton)

  document.body.appendChild(fullScreenContainer)

  fullScreenCard.addEventListener('click', closeFullScreen)
  document.addEventListener('keydown', handleKeyDown)
}

function closeFullScreen() {
  const fullScreenContainer = document.querySelector('.full-screen-container')

  document.body.removeChild(fullScreenContainer)
  document.body.style.overflow = ''

  document.removeEventListener('keydown', handleKeyDown)
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeFullScreen()
  }
}

/* Oleksandr Rumiantsev, GITHub - https://github.com/olekrumian */

const callFormInput = document.querySelector('.call-form-input')

callFormInput.addEventListener('keypress', (e) => {
  let newValue = e.target.value
  if (!newValue.startsWith('+38')) {
    newValue = `+38${newValue}`
  }
  callFormInput.value = newValue
})

/* Counter */
async function fetchCurrencyData() {
  const url = 'https://api.monobank.ua/bank/currency'

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch currency data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getRateSell() {
  const currencyData = await fetchCurrencyData()
  if (!currencyData || currencyData.length === 0) {
    const defaultCurrency = 37 //!FIXME: change to default currency if you need
    return defaultCurrency
  }

  const rateSell = currencyData[0].rateSell
  return rateSell
}

;(async () => {
  const rateSellValue = await getRateSell()

  const dividedPower = () => {
    const usedInputValue = document.getElementById('used-input').value
    let result = usedInputValue / 157.5
    return result
  }

  const calculateValue = () => {
    const resultPower = dividedPower()
    let result

    if (resultPower < 5) {
      result = Math.floor(resultPower * 780)
    } else if (resultPower < 12) {
      result = Math.floor(resultPower * 740)
    } else if (resultPower < 21) {
      result = Math.floor(resultPower * 675)
    } else if (resultPower < 33) {
      result = Math.floor(resultPower * 660)
    } else if (resultPower < 52) {
      result = Math.floor(resultPower * 625)
    } else if (resultPower < 60) {
      result = Math.floor(resultPower * 615)
    } else {
      result = Math.floor(resultPower * 605)
    }

    document.getElementById('field2-input').innerHTML = `${result} $`
    return result
  }

  const calculateGenerationEnergy = () => {
    const resultPower = dividedPower()
    return resultPower * 1131.5
  }

  const calculateEconomy = () => {
    const tariffInputValue = document.getElementById('tariff-input').value
    const generationEnergy = calculateGenerationEnergy()
    let economy = Math.floor(tariffInputValue * generationEnergy)

    document.getElementById('field1-input').innerHTML = `${economy} ₴`
    return economy
  }

  const calculatePayback = () => {
    const value = calculateValue()
    const economy = calculateEconomy()
    let payback = ((value * rateSellValue) / economy).toFixed(1)

    document.getElementById('field3-input').innerHTML = `${payback} років`
    return payback
  }

  /* Counter 2 */

  //? LEGEND
  //? ГН - yearGeneration
  //? РСЕС - document.getElementById('power-input-commerce').value
  //? ВВС - selfUsedPower
  //? ВЗТ - calculateCostGreenTariff
  //? Д - calculateCostGreenTariff + selfUsedPower * 12

  function yearGeneration() {
    return document.getElementById('power-input-commerce').value * 1131.5
  }

  function selfUsedPower() {
    return document.getElementById('used-input-commerce').value * 2.56
  }

  function calculateCostGreenTariff() {
    const yearGen = yearGeneration()
    const usedInputValue = document.getElementById('used-input-commerce').value
    const tariffValue = yearGen - usedInputValue * 12
    let greenTariffCost = 0

    if (tariffValue > 0) {
      greenTariffCost = tariffValue * 5.22
    } else {
      greenTariffCost = 0
    }
    return greenTariffCost
  }

  function profitPerYear() {
    const value = calculateCostGreenTariff()
    let income = 0

    if (value === 0) {
      income = yearGeneration() * 2.56
    } else if (value !== 0) {
      income = value + selfUsedPower() * 12
    }

    document.getElementById(
      'field1-input-commerce'
    ).innerHTML = `${income.toFixed(0)} ₴`
    return income
  }

  function calculateCostSolarStation() {
    const powerValue = document.getElementById('power-input-commerce').value
    let costSolarStation = 0

    if (powerValue <= 5) {
      costSolarStation = powerValue * 780
    } else if (powerValue > 5 && powerValue < 12) {
      costSolarStation = powerValue * 740
    } else if (powerValue >= 12 && powerValue < 21) {
      costSolarStation = powerValue * 675
    } else if (powerValue >= 21 && powerValue <= 33) {
      costSolarStation = powerValue * 660
    }
    document.getElementById(
      'field2-input-commerce'
    ).innerHTML = `${costSolarStation} $`
    return costSolarStation
  }

  function calculatePaybackIncome() {
    const defaultCurrency = rateSellValue //!FIXME: change to default currency if you need

    const convertToHrn = calculateCostSolarStation() * defaultCurrency

    //!TODO - Строк окупності. Розкоментувати при необхідності відображати, замість ЄДБ.
    // const paybackIncome = convertToHrn / profitPerYear()
    // document.getElementById(
    //   'field3-input-commerce'
    // ).innerHTML = `${paybackIncome.toFixed(1)}`
    // return paybackIncome

    //!TODO - ЄДБ. Закоментувати 613-618 рядки і розкоментувати 606-610
    const percentOfIncomePerYear = (profitPerYear() * 100) / convertToHrn
    const edb = (percentOfIncomePerYear * 100) / 80.5
    document.getElementById('field3-input-commerce').innerHTML = `${edb.toFixed(
      1
    )} %`
    return edb
  }

  /* End of Counter 2 */

  document.addEventListener('input', () => {
    const tariffInputValue = document.getElementById('tariff-input').value
    const usedInputValue = document.getElementById('used-input').value

    if (!tariffInputValue || !usedInputValue) {
      document.getElementById('field1-input').innerHTML = '0 ₴'
      document.getElementById('field2-input').innerHTML = '0 $'
      document.getElementById('field3-input').innerHTML = '0 років'
      document.getElementById('field1-input-commerce').innerHTML = '0 ₴'
      document.getElementById('field2-input-commerce').innerHTML = '0 $'
      document.getElementById('field3-input-commerce').innerHTML = '0 років'
    } else {
      dividedPower()
      calculateValue()
      calculateGenerationEnergy()
      calculateEconomy()
      calculatePayback()
      profitPerYear()
      calculatePaybackIncome()
    }
  })
})()
/* End of Counter */
