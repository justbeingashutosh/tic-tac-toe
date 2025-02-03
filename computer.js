const symbolprompt = document.querySelector("#symbolchoice")
const shade = document.querySelector("#shade")
const alertbox = document.querySelector("#alert")
const alertmsg = document.querySelector("#alertmsg")
const playagain = document.querySelector("#playagain")
playagain.addEventListener('click', ()=>{
    window.location = "computer.html"
})

window.onload = ()=>{
    symbolprompt.style.zIndex= "20"
    symbolprompt.style.transform = "scale(1)"
    shade.style.zIndex="0"
    shade.style.opacity="1"
}
const symbolbtns = document.querySelectorAll(".symbol")
let userChoice = null
let computerChoice = null
symbolbtns.forEach(symbol =>{
    symbol.addEventListener('click', ()=>{
    symbolprompt.style.transform = "scale(0)"
    symbolprompt.style.zIndex = "-1"
    shade.style.zIndex="-1"
    shade.style.opacity="0"
    if(symbol.textContent=="X"){
        userChoice = "X"
        computerChoice = "O"
    }
    else{
        userChoice = "O"
        computerChoice = "X"
    }
    // console.log(userChoice)
    })
})


// --- These functions are used for both minimax evaluation and UI checking ---

function checkWinner(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    )
}

function isDraw(board) {
    return board.every(cell => cell !== "")
}

// --- Minimax algorithm implementation ---

function minimax(board, depth, isMaximizing) {
    if (checkWinner(board, computerChoice)) return 10 - depth
    if (checkWinner(board, userChoice)) return depth - 10
    if (isDraw(board)) return 0

    if (isMaximizing) {
        let bestScore = -Infinity
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = computerChoice
                let score = minimax(board, depth + 1, false)
                board[i] = ""
                bestScore = Math.max(score, bestScore)
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = userChoice
                let score = minimax(board, depth + 1, true)
                board[i] = ""
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore
    }
}

function computerMove() {
    let board = Array.from(cells).map(cell => cell.textContent)
    let bestMove = null
    let bestScore = -Infinity

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = computerChoice
            let score = minimax(board, 0, false)
            board[i] = ""
            if (score > bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    
    if (bestMove !== null) {
        if(computerChoice=="X"){
            cells[bestMove].style.color="rgb(255, 135, 135)"
        }else{
            cells[bestMove].style.color="rgb(120, 255, 120)"
        }
        cells[bestMove].textContent = computerChoice
        checkGameState()
    }
}

function checkGameState() {
    let board = Array.from(cells).map(cell => cell.textContent)
    if (checkWinner(board, userChoice)) {
        alertmsg.textContent = "You win!"
        alertbox.style.zIndex = "20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'
        alertbox.style.backgroundColor = 'rgb(169, 255, 129)'
        alertbox.style.border = "solid rgb(49, 164, 49) 4px"
        alertbox.style.color = "rgb(3, 80, 3)"
        shade.style.zIndex = "0"
        shade.style.opacity = "1"
    }
    else if (checkWinner(board, computerChoice)) {
        alertmsg.textContent = "I win!"
        alertbox.style.zIndex = "20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'
        alertbox.style.backgroundColor = 'rgb(169, 255, 129)'
        alertbox.style.border = "solid rgb(49, 164, 49) 4px"
        alertbox.style.color = "rgb(3, 80, 3)"
        shade.style.zIndex = "0"
        shade.style.opacity = "1"
    }
    else if (isDraw(board)) {
        alertmsg.textContent = "Draw!"
        alertbox.style.zIndex = "20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'
        alertbox.style.backgroundColor = 'rgb(252, 255, 75)'
        alertbox.style.border = "solid rgb(152, 145, 0) 4px"
        alertbox.style.color = "rgb(101, 95, 4)"
        shade.style.zIndex = "0"
        shade.style.opacity = "1"
    }
}

const cells = document.querySelectorAll(".cell")
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent === "") {
            if(userChoice=="X"){
                cell.style.color="rgb(255, 135, 135)"
            }else{
                cell.style.color="rgb(120, 255, 120)"
            }
            cell.textContent = userChoice
            checkGameState()
            let board = Array.from(cells).map(cell => cell.textContent)
            if (!checkWinner(board, userChoice) &&
                !checkWinner(board, computerChoice) &&
                !isDraw(board)) {
                setTimeout(computerMove, 200)
            }
        }
    })
})