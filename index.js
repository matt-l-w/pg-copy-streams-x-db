const { Client } = require('pg')
const { from: copyFrom, to: copyTo } = require('pg-copy-streams')

const source = new Client({
  user: 'matt',
  host: 'localhost',
  database: 'source',
  password: 'password',
  port: 5432
})
const destination = new Client({
  user: 'matt',
  host: 'localhost',
  database: 'destination',
  password: 'password',
  port: 5432
})

async function copy() {
  function exit() {
    source.end()
    destination.end()
  }
  await source.connect()
  await destination.connect()
  const sourceStream = source.query(copyTo('COPY people TO STDOUT')) 
  const destinationStream = destination.query(copyFrom('COPY people FROM STDIN'))
  sourceStream.on('error', () => exit())
  destinationStream.on('error', () => exit())
  destinationStream.on('finish', () => exit())

  sourceStream.pipe(destinationStream)
}

copy()

