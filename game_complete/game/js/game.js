const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const buttonRestart = document.querySelector('.restart')

const characters = [
    'hinata',
    'naruto',
    'sasuke',
    'kakashi',
    'indra',
    'asura',
    'pain',
    'gaara',
    'madara',
    'hashirama',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEnd = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        setTimeout(() => {
            alert(`Parabéns, shinobi ${spanPlayer.innerHTML} 🐱‍👤!  seu tempo foi de ${timer.innerHTML} ⏱.`)

        }, 500)
    }
}

const checkCards = () => {

    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEnd()

    } else {

        setTimeout(() => {



            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''

        }, 500);
    }

}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.className.includes('reveal-card')
        firstCard = target.parentNode;

    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;

        checkCards();

    }


    target.parentNode.classList.add('reveal-card')
}

const createCard = (character) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../game/image/${character}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters]

    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    duplicateCharacters.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);
    });

}

const startTime = () => {
    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1

    }, 1000)
}

window.onload = () => {

    const playerName = localStorage.getItem('player')

    spanPlayer.innerHTML = playerName

    startTime();
    loadGame();

}

buttonRestart.addEventListener ('click',(event) => {
    window.location.reload();
})

