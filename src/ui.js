import Tags from "tags.js"

Tags.init(true)

const numkeys = "1 2 3 4 5 6 7 8 9 00 0 .".split(" ")
const funckeys = "+ = - * /".split(" ")


const prevArea = input().$sa("readOnly", true)
                      .$sa("type", "text")
                      .$class("prev-area")

const echoArea = input().$sa("readOnly", true)
                      .$sa("type","text")
                      .$class("echo-area")

const keyboard = div().$class("keyboard").$$(
  div().$class("num-keys").$$(
    ...numkeys.map(n => input().$class("key numkey").$sa("type", "button").$sa("value", n))
  ),
  div().$class("func-keys").$$(
    ...funckeys.map(n => input().$class("key funckey").$sa("type", "button").$sa("value", n))
  )
)

const calc = div().$class("calc").$$(
  prevArea,
  echoArea,
  keyboard
)
export default calc
