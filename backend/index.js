const os = require('os')

const express = require('express')
const cors = require('cors')

const server = express();
const port = 3000;

server.use(cors())

const prodotti = [
  [
    "1",
    {
      "nome": "Maglietta",
      "taglia": "xl"
    }
  ],
  [
    "2",
    {
      "nome": "Pantaloni",
      "taglia": "L"
    }
  ],
  [
    "3",
    {
      "nome": "Felpa",
      "taglia": "M"
    }
  ]
]

server.get('/ping', (req, res) => {
    res.send('pong')
})

server.get('/prodotti', (req, res) => {
    res.json( 
        prodotti
    )
})

server.get('/prodotti/:id', (req, res) => {
    const id = req.params.id;
    const prodotto = prodotti.find(p => p[0] === id)

    if (prodotto) {
        res.json({ id : prodotto[0], ...prodotto[1] })
    } else {
        res.send(404).json("errore, non esiste!")
    }
})

server.get('/stresstest', (req, res) => {
  let sum = 0;
  for (let index = 0; index < 500000; index++) {
    sum += index;
  }
  res.send(`Count: ${sum}`)
})

server.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port} - PID: ${process.pid} - CPUs: ${os.cpus().length}`)
})