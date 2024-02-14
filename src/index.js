import calc from "./ui.js"

const body = document.querySelector("body")
body.appendChild(calc)


const keys = document.querySelector(".keyboard")
const echoArea = document.querySelector(".echo-area")
const prevExprArea = document.querySelector(".prev-area")

const operators = "+-*/"



const State = {
  currExpr: [],
  currToken: "",
  evalJustFinished: false,
  lastResult: 0
}


function write(value, elem) {
  elem.value += value.toString()
}

function exprToString(expr) {
  let str = ""
  for (let i = 0; i < expr.length; i++) {
    if (i == expr.length - 1) {
      if (!operators.includes(expr[i])) {
        str += expr[i]
        return str
      }
    }
    else {
      str += expr[i]
    }
  }
  return str
}

// TODO: implement correct parsing etc
// ["123" "+" "13123" ]
function safeEval(expr) {
  let flat = ""
  for (var token of expr) {
    flat += token
  }
  let result = eval(flat)
  if (result === expr) {
    //TODO: handle error in eval
    return -1
  }
  return result
}

function clear(...elems) {
  for (var elem of elems) {
    elem.value = ""
  }
}


keys.onclick = (event) => {
  const keyEl = event.target
  const value = event.target.value
  if (keyEl.classList.contains("numkey")) {
    if (State.evalJustFinished) {
      clear(echoArea, prevExprArea)
      write(State.lastResult, prevExprArea)
      State.evalJustFinished = false
    }
    State.currToken += value.toString()
    // TODO: update view
    write(value, echoArea)

  }
  if (keyEl.classList.contains("funckey")) {
    if (State.evalJustFinished) {
      clear(echoArea, prevExprArea)
      write(State.lastResult, prevExprArea)
      State.currExpr.push(State.lastResult.toString())
      State.evalJustFinished = false
    }
    clear(echoArea)
    State.currExpr.push(State.currToken)
    if (value != "=") State.currExpr.push(value)
    State.currToken = ""
    clear(prevExprArea)
    write(exprToString(State.currExpr), prevExprArea)
    write(value, echoArea)
    switch (value) {
      case "=":
        // evaluate current expression
        let result = safeEval(State.currExpr)
        State.currExpr = []
        State.lastResult = result
        State.evalJustFinished = true
        clear(echoArea)
        write(result, echoArea)
        break;
      default:
    }
  }
}
