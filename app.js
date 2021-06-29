const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; // 초기 색상 블랙 
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "INITIAL_COLOR"; // Context 안에 있는 색상을 구별
ctx.fillStyle = "INITIAL_COLOR"; // fill 채우기 색상 
ctx.lineWidth = 2.5; // Context 안에 존재하는 선들의 굷기를 의미

let painting = false;
let filling = false; 
    
    
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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;

}

function handleModeClick() { 
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"; // button --> Fill로 대체 
    } else {
        filling = true;
        mode.innerText = "Paint"; // button --> Paint로 대체 
        ctx.fillStyle = ctx.strokeStyle; 
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a"); // 가상의 a 태그 생성 
    link.href = image;         // .href = 이미지 파일 경로를 갖는다 
    link.download = "PaintingImg"; // .download = 이름을 갖고 
    link.click();
}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); // 가져온 colors를 array 배열로 만든 뒤 click 이벤트 추가 

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}