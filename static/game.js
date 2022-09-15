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
  // GROUND FLOOR
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
        nextText: 15
      },
      {
        text: '2',
        requiredState: (currentState) => currentState.floor !== 2,
        setState: { floor: 2 },
        nextText: 19
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
        nextText: 8
      },
      {
        text: 'Vai più avanti',
        nextText: 10
      },
      {
        text: 'Torna nella hall',
        nextText: 1
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
    text: 'Ci sono persone che mangiano, la finestra è leggermente aperta.',
    options: [
      {
        text: 'Prova ad uscire dalla finestra',
        nextText: 9
      },
      {
        text: 'Torna nel corridoio',
        nextText: 3
      }
    ]
  },
  {
    id: 9,
    text: 'Come detto prima uscire non è un\'opzione',
    options: [
      {
        text: 'Ricomincia il gioco',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Proseguendo nel corridoio inizi a sentire dei rumori.',
    options: [
      {
        text: 'Entra in aula studio C',
        nextText: 11
      },
      {
        text: 'Entra in sala video',
        nextText: 12
      },
      {
        text: 'Vai in auditorium',
        nextText: 14
      },
      {
        text: 'Torna indietro',
        nextText: 3
      },
    ]
  },
  {
    id: 11,
    text: 'La stanza non è stata igienizzata sufficientemente, solo entrando hai contratto il covid. Non possiamo permetterci una quarantena come quella dell\'anno scorso.',
    options: [
      {
        text: 'Ricomincia il gioco',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'Non c\'è nessuno, il mobile sotto il televisore sembra aperto...',
    options: [
      {
        text: 'Torna indietro',
        nextText: 10
      },
      {
        text: 'Controlla il mobiletto',
        requiredState: (currentState) => !currentState.bigliettino,
        nextText: 13
      },
    ]
  },
  {
    id: 13,
    text: 'C\'è un sacco nero pieno di salsicce, sopra un bigliettino con scritto sopra "Giardino Zen".',
    options: [
      {
        text: 'Prendi il bigliettino e torna indietro',
        setState: { bigliettino: true },
        nextText: 12
      }
    ]
  },
  {
    id: 14,
    text: 'Davanti alla porta dell\'auditorium vedi un tastierino numerico, come se per entrare servisse una password.',
    options: [
      {
        text: 'Torna indietro',
        nextText: 10
      },
      {
        text: '(non ho la password)',
        requiredState: (currentState) => !currentState.password,
        nextText: 10
      },
      {
        text: 'Immetti 146 come password',
        requiredState: (currentState) => currentState.password,
        nextText: 100
      },
    ]
  },

  // FLOOR: 1
  {
    id: 15,
    text: 'Ti trovi al primo piano, l\'aula studio 1 è ancora chiusa perché usata come deposito pacchi.',
    options: [
      {
        text: 'Entra in aula relax 1',
        nextText: 16
      },
      {
        text: 'Di chi è quella bandiera in fondo al corridoio?',
        nextText: 18
      },
      {
        text: 'Torna agli ascensori',
        nextText: 2
      }
    ]
  },
  {
    id: 16,
    text: 'Ci sono persone che studiano, meglio non disturbare.',
    options: [
      {
        text: 'Torno indietro e prometto che non disturberò mai nessuno durante la sessione di esami',
        nextText: 15
      },
      {
        text: 'Mia madre lavora in via del Brennero',
        nextText: 17
      }
    ]
  },
  {
    id: 17,
    text: 'Niente di personale, ma non meriti di finire il gioco.',
    options: [
      {
        text: 'Ricomincia il gioco',
        nextText: -1
      }
    ]
  },
  {
    id: 18,
    text: 'Bussa più forte che puoi alle 2 di notte per scoprirlo.',
    options: [
      {
        text: 'Lo farò!',
        nextText: 15
      }
    ]
  },

  // FLOOR: 2
  {
    id: 19,
    text: 'Ti trovi al secondo piano',
    options: [
      {
        text: 'Entra in aula studio 2',
        nextText: 20
      },
      {
        text: 'Entra in aula relax 2',
        nextText: 21
      },
      {
        text: 'Torna agli ascensori',
        nextText: 2
      },
    ]
  },
  {
    id: 20,
    text: 'La stanza è vuota, ma piccolo easter egg: il gioco è stato creato qui!',
    options: [
      {
        text: 'Torna indietro',
        nextText: 19
      },
    ]
  },
  {
    id: 21,
    text: 'La stanza è vuota, ma piccolo easter egg: il gioco è stato creato qui!',
    options: [
      {
        text: 'Torna indietro',
        nextText: 19
      },
    ]
  },
]

startGame()