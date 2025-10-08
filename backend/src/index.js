import os from 'os';
import express from 'express';
import { Job, Queue, Worker } from 'bullmq';
import redisConnection from './config/redis.js';

import cors from 'cors';

// BullMQ queue with Redis
const mainQueue = new Queue('main-queue', {
  connection: redisConnection,
});

const pdfQueue = new Queue('pdf-queue', {
  connection: redisConnection,
});

const mailQueue = new Queue('mail-queue', {
  connection: redisConnection,
});

const mainWorker = new Worker(
  'main-queue', 
  async (job) => {
    console.log(`Start job ${job.id} on backend ${id}`)
  },
  {connection: redisConnection}
);

const pdfWorker = new Worker(
  'pdf-queue', 
  async (job) => {
    console.log(`Start job ${job.id} on backend ${id}`)
  },
  {connection: redisConnection}
);

const mailWorker = new Worker(
  'mail-queue', 
  async (job) => {
    console.log(`Start job ${job.id} on backend ${id}`)
  },
  {connection: redisConnection}
);

mainWorker.on('completed', () => {
  console.log(`Completed job ${job.id} on backend ${id}`)
});
mainWorker.on('failed', () => {
  console.log(`Failed job ${job.id} on backend ${id} with error ${err.message}`)
});

pdfWorker.on('failed', () => {
  console.log(`Failed PDF job ${job.id} on backend ${id} with error ${err.message}`)
});
pdfWorker.on('failed', () => {
  console.log(`Failed PDF job ${job.id} on backend ${id} with error ${err.message}`)
});

mailWorker.on('failed', () => {
  console.log(`Failed MAIL job ${job.id} on backend ${id} with error ${err.message}`)
});
mailWorker.on('failed', () => {
  console.log(`Failed MAIL job ${job.id} on backend ${id} with error ${err.message}`)
});

const port = 3000;
const server = express()

const id = process.env.BACKEND_ID || 'backend-unkown'

server.use(cors())

server.use((req, res, next) => {
  res.setHeader('X-Backend-ID', id);
  next();
})

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

// Endpoint for Queue

server.post('/job-for-all', async (req, res) => {
    const job = await mainQueue.add('job', {name: req.body.name || 'default'})
    res.json({jobId: job.id})
  } 
)

server.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port} - PID: ${process.pid} - CPUs: ${os.cpus().length}`)
})