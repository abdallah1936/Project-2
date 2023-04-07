// node.js's built in crypto lib
const crypto = require('crypto')

// hashing
// one way process -- a string that has been hashed
// regardless of the input, the hash is always the same size 
// cannot be 'un hashed'

// sha256
// const hash = crypto.createHash('sha256')

// hash.update('a') // create a hash out of the letter 'a'

// const digest = hash.digest('hex')
// console.log('sha256:', digest)

// const userPass = 'abcd123'

// function makeHash(string) {
//     const hash = crypto.createHash('sha256')

//     hash.update(string) // create a hash out of the letter 'a'

//     const digest = hash.digest('hex')
//     return digest
// }

// const loginPassword = 'wrong'

// console.log(makeHash(userPass) === makeHash(loginPassword))

// const bcrypt = require('bcrypt')

// const userPassword = 'hello123'
// const hashedPassword = bcrypt.hashSync(userPassword, 12)

// console.log(bcrypt.compareSync('wrong', hashedPassword))

// encryption
// two way process where data is 'locked' in an encrypted string using a 'key' and that key can remove the data from the string
const cryptoJs = require('crypto-js')

const stringToEncrypt = 'hello i am a secret message'

const encryptionKey = 'myKey'

// Advace Encryption Standard
const myEncryption = cryptoJs.AES.encrypt(stringToEncrypt, encryptionKey)
console.log(myEncryption.toString())
const decryptedMessge = cryptoJs.AES.decrypt(myEncryption.toString(), 'myKey')
console.log(decryptedMessge.toString(cryptoJs.enc.Utf8))