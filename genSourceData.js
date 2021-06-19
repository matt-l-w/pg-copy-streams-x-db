const faker = require('faker')
const fs = require('fs')
const { Readable, Writable } = require('stream')

const dataStream = new Readable({
  read() {}
})
const outStream = fs.createWriteStream('people.csv', { flags: 'a' })
dataStream.pipe(outStream)

function main() {
  const data = []
  let count = 0 
  while (count < 1000000) {
    if (count % 1000 === 0) console.log("Count: " + count)
    generateData()
    count++
  }
}

function generateData() {
  dataStream.push(faker.fake("{{name.lastName}}, {{name.firstName}}, {{name.suffix}}\n"))
}

main()

