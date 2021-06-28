const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
 
console.log(Array.from(colors)); // Object 에서 부터 배열을 만듦 

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // Context 안에 있는 색상을 구별 
ctx.lineWidth = 2.5; // Context 안에 존재하는 선들의 굷기를 의미 

let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); // 선 
        ctx.moveTo();
    } else {
        ctx.lineTo(x, y); // lineTo + stroke :: 움직이는 내내 발생하는 
        ctx.stroke();
    }

}

function startPainting() { // 페인팅 시작
    painting = true;
}

function stopPainting() { // 페인팅 멈추기 
    painting = false;
}

function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if (canvas) {
    
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick)); // 가져온 colors를 array 배열로 만든 뒤 click 이벤트 추가 
