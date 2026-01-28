let min = 0;
let sec = 0;
let ms = 0;
let timer = null;
let running = false;

function updateDisplay(){
    document.getElementById("min").innerText = String(min).padStart(2,"0");
    document.getElementById("sec").innerText = String(sec).padStart(2,"0");
    document.getElementById("ms").innerText  = String(ms).padStart(2,"0");
}

function start(){
    if(running) return;
    running = true;

    timer = setInterval(() => {
        ms++;
        if(ms === 100){
            ms = 0;
            sec++;
        }
        if(sec === 60){
            sec = 0;
            min++;
        }
        updateDisplay();
    },10);
}

function pause(){
    clearInterval(timer);
    running = false;
}

function reset(){
    clearInterval(timer);
    running = false;
    min = sec = ms = 0;
    updateDisplay();
    document.getElementById("lapList").innerHTML = "";
}

function lap(){
    if(!running) return;

    const time = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}.${String(ms).padStart(2,"0")}`;
    const li = document.createElement("li");
    li.innerText = time;
    document.getElementById("lapList").prepend(li);
}