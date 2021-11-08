const obj1 = require('./logger')
const obj2 = require('./util/helper')
const formatterObj = require('../validator/formatter')
const obj = require('underscore')
const obj3 = require('lodash')

obj1.printName('Rohit Negi')
obj1.printWelcomeMessage()
console.log(``+obj1.loggerendpoint )

obj2.getDate()
obj2.getMonth()
obj2.getBatchInfo()

formatterObj.trimInput()
formatterObj.changeTolowerCase()
formatterObj.changeToUpperCase()

console.log(obj.first(["apple","orange", "melon"], 4))
console.log(obj.last(["apple","orange", "melon"],2))
console.log(obj.rest(["monday", "tuesday","wednesday","thursday","friday"],3))

console.log(obj3.chunk(["jan", "feb", "march", "april","may","june","july","aug","sept","oct","nov","dec"],4))
console.log(obj3.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ]))
console.log(obj3.union([1,2,3],[2,3,4],[4,5,6],[5,6,7],[7,8,9]))
console.log(obj3.fromPairs([['horror','the shining'],['drama','titanic'],['thriller','shutter island'],['fantasy','pans']]))



