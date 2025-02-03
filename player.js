const cells = document.querySelectorAll(".cell")
let moves = 0
const alertbox = document.querySelector("#alert")
const alertmsg = document.querySelector("#alertmsg")
const playagain = document.querySelector("#playagain")
const shade = document.querySelector("#shade")
const switchmode = document.querySelector("#switchmode")
let audio = new Audio("assets/8-bit-music-on-245249.mp3")
audio.autoplay = true
audio.volume = 0.5
audio.loop = true
playagain.addEventListener('click', ()=>{
    window.location = "player.html"
})
switchmode.addEventListener('click', ()=>{
    window.location = "computer.html"
})

function check(){
    
    const cell1 = document.getElementById("1").textContent
const cell2 = document.getElementById("2").textContent
const cell3 = document.getElementById("3").textContent
const cell4 = document.getElementById("4").textContent
const cell5 = document.getElementById("5").textContent
const cell6 = document.getElementById("6").textContent
const cell7 = document.getElementById("7").textContent
const cell8 = document.getElementById("8").textContent
const cell9 = document.getElementById("9").textContent
    
    if ((cell1==cell2 && cell2==cell3&& cell3=='X') || (cell4==cell5 && cell5==cell6&&cell6=="X") || (cell7==cell8 && cell8==cell9&&cell9=="X")||(cell1==cell4 && cell4==cell7&&cell7=="X")||(cell2==cell5 && cell5==cell8&&cell8=="X")||(cell3==cell6 && cell6==cell9&&cell9=="X")||(cell1==cell5 && cell5==cell9&&cell9=="X")||(cell3==cell5 && cell5==cell7&&cell7=="X")){
        alertmsg.textContent = "X wins!"
        alertbox.style.zIndex="20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'
        alertbox.style.backgroundColor = 'rgb(169, 255, 129)'
        alertbox.style.border = "solid rgb(49, 164, 49) 4px"
        alertbox.style.color="rgb(3, 80, 3)"        
        shade.style.zIndex = "0"
        shade.style.opacity = "1"

        // window.location="player.html"

    }
    else if((cell1==cell2 && cell2==cell3&& cell3=='O') || (cell4==cell5 && cell5==cell6&&cell6=="O") || (cell7==cell8 && cell8==cell9&&cell9=="O")||(cell1==cell4 && cell4==cell7&&cell7=="O")||(cell2==cell5 && cell5==cell8&&cell8=="O")||(cell3==cell6 && cell6==cell9&&cell9=="O")||(cell1==cell5 && cell5==cell9&&cell9=="O")||(cell3==cell5 && cell5==cell7&&cell7=="O")){
        alertmsg.textContent = "O wins!"
        alertbox.style.zIndex="20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'
        alertbox.style.backgroundColor = 'rgb(169, 255, 129)'
        alertbox.style.border = "solid rgb(49, 164, 49) 4px"
        alertbox.style.color="rgb(3, 80, 3)"  
        shade.style.zIndex = "0"
        shade.style.opacity = "1"
    }
    else if(moves==9){
        alertmsg.textContent = "Draw!"
        alertbox.style.zIndex="20"
        alertbox.style.opacity = '1'
        alertbox.style.transform = 'translateY(0px)'

        alertbox.style.backgroundColor = 'rgb(252, 255, 75)'
        alertbox.style.border = "solid rgb(152, 145, 0) 4px"
        alertbox.style.color="rgb(101, 95, 4)"
        shade.style.zIndex = "0"
        shade.style.opacity = "1"

        // window.location="player.html"
    }

}



cells.forEach(element => {
    turn = "player-1"
    element.addEventListener('click', ()=>{
        if(turn==="player-1"){
        

            if(element.textContent==""){
            element.style.color = "rgb(255, 135, 135)"
            element.textContent = 'X'
            turn = "player-2"
            moves ++;
            
            }
            check()

        }
        else{
        

            if(element.textContent==""){
            element.style.color = "rgb(120, 255, 120)"
            element.textContent = 'O'
            turn = "player-1"
            moves++;
            }
            check()
        }
    })
});



