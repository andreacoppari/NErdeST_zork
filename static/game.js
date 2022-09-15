const textElement = document.getElementById('story')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = { floor: 0 }
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId < 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 0,
    text: 'Stai per iniziare una sessione di gioco testuale estremamente importante per le sorti del NEST. Sabato, ore 12:30, in questo momento ti trovi al piano terra, nella hall del NEST, front office chiuso. Uscire dal NEST non è un\'opzione.',
    options: [
      {
        text: 'Vai verso le scale',
        nextText: 2
      },
      {
        text: 'Vai verso il corridoio',
        nextText: 3
      }
    ]
  },
  {
    id: 1,
    text: 'Ti trovi al piano terra, nella hall del NEST, front office chiuso. Uscire dal NEST non è un\'opzione.',
    options: [
      {
        text: 'Vai verso le scale',
        nextText: 2
      },
      {
        text: 'Vai verso il corridoio',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Sei davanti agli ascensori a che piano vuoi andare?',
    options: [
      {
        text: '0',
        requiredState: (currentState) => currentState.floor !== 0,
        setState: { floor: 0 },
        nextText: 1
      },
      {
        text: '1',
        requiredState: (currentState) => currentState.floor !== 1,
        setState: { floor: 1 },
        nextText: 1
      },
      {
        text: '2',
        requiredState: (currentState) => currentState.floor !== 2,
        setState: { floor: 2 },
        nextText: 1
      },
      {
        text: '3',
        requiredState: (currentState) => currentState.floor !== 3,
        setState: { floor: 3 },
        nextText: 1
      },
      {
        text: '4',
        requiredState: (currentState) => currentState.floor !== 4,
        setState: { floor: 4 },
        nextText: 1
      },
    ]
  },
  {
    id: 3,
    text: 'Ti trovi nel corridoio del piano terra, nella bacheca a muro non ci sono avvisi importanti.',
    options: [
      {
        text: 'Entra in sala corsi',
        requiredState: (currentState) => !currentState.pennarello,
        nextText: 4
      },
      {
        text: 'Entra in aula studio B',
        nextText: 5
      },
      {
        text: 'Entra in aula studio A',
        nextText: 6
      },
      {
        text: 'Vai più avanti',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'La stanza è deserta, siamo ancora lontani dalla sessione invernale dopotutto. Le finestre sono chiuse, sulla lavagna ci sono scritte sul fantacalcio, il pennarello è sul tavolo più vicino.',
    options: [
      {
        text: 'Prendi il pennarello ed esci',
        setState: { pennarello: true },
        nextText: 3
      },
      {
        text: 'Torna al corridoio',
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: 'L\'aula per eccellenza occupata dagli informatici. In questo momento ci sono Toni e Fabio Megatron, due "senior" del NEST.',
    options: [
      {
        text: 'Torna nel corridoio',
        nextText: 3
      },
      {
        text: 'Chiedi informazioni su questo gioco',
        nextText: 6
      },
    ]
  },
  {
    id: 6,
    text: 'Toni ti punta il ferro, che fai?',
    options: [
      {
        text: 'Scappa in corridoio',
        nextText: 3
      },
      {
        text: 'Rimani impassibile',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Non si scherza con Toni.',
    options: [
      {
        text: 'Ricomincia il gioco',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()