const numberPattern = new RegExp("^[+-]?([0-9]*[.,])?[0-9]+$");
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const radius = width / 2.5;
const arrowSize = 20;
const axesColor = '#8a7070';
const figureColor = '#40495d';
const markSize = 30;

window.onload = function () {
    drawGraph();
    mouseMove();
}

function drawMarks() {
    ctx.beginPath();
    ctx.fillStyle = axesColor;
    ctx.strokeStyle = axesColor;
    ctx.fillText('X', width - markSize / 2, height / 2 - markSize);
    ctx.fillText('Y', width / 2 + markSize, markSize / 2);
    ctx.fillText('-R', width / 2 - radius, height / 2 + markSize + markSize / 2);
    ctx.moveTo(width / 2 - radius, height / 2 + markSize);
    ctx.lineTo(width / 2 - radius, height / 2 - markSize);
    ctx.fillText('-R/2', width / 2 - radius / 2, height / 2 + markSize + markSize / 2);
    ctx.moveTo(width / 2 - radius / 2, height / 2 + markSize);
    ctx.lineTo(width / 2 - radius / 2, height / 2 - markSize);
    ctx.fillText('R/2', width / 2 + radius / 2, height / 2 + markSize + markSize / 2);
    ctx.moveTo(width / 2 + radius / 2, height / 2 + markSize);
    ctx.lineTo(width / 2 + radius / 2, height / 2 - markSize);
    ctx.fillText('R', width / 2 + radius, height / 2 + markSize + markSize / 2);
    ctx.moveTo(width / 2 + radius, height / 2 + markSize);
    ctx.lineTo(width / 2 + radius, height / 2 - markSize);
    ctx.fillText('R', width / 2 - markSize - markSize / 2, height / 2 - radius);
    ctx.moveTo(width / 2 - markSize, height / 2 - radius);
    ctx.lineTo(width / 2 + markSize, height / 2 - radius);
    ctx.fillText('R/2', width / 2 - markSize - markSize / 2, height / 2 - radius / 2);
    ctx.moveTo(width / 2 - markSize, height / 2 - radius / 2);
    ctx.lineTo(width / 2 + markSize, height / 2 - radius / 2);
    ctx.fillText('-R/2', width / 2 - markSize - markSize / 2, height / 2 + radius / 2);
    ctx.moveTo(width / 2 - markSize, height / 2 + radius / 2);
    ctx.lineTo(width / 2 + markSize, height / 2 + radius / 2);
    ctx.fillText('-R', width / 2 - markSize - markSize / 2, height / 2 + radius);
    ctx.moveTo(width / 2 - markSize, height / 2 + radius);
    ctx.lineTo(width / 2 + markSize, height / 2 + radius);
    ctx.stroke();
}

function drawAxes() {
    ctx.beginPath();
    ctx.fillStyle = axesColor;
    ctx.strokeStyle = axesColor;
    ctx.moveTo(width / 2, height);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 - arrowSize, arrowSize);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + arrowSize, arrowSize);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.lineTo(width - arrowSize, height / 2 - arrowSize);
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - arrowSize, height / 2 + arrowSize);
    ctx.stroke();
    drawMarks();
}

function drawFigure() {
    ctx.beginPath();
    ctx.fillStyle = figureColor;
    ctx.arc(width / 2, height / 2, radius / 2, 0,1.5*Math.PI, true);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.fillRect(width / 2 - radius, height / 2, radius, radius / 2);
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + radius, height / 2);
    ctx.lineTo(width / 2, height / 2 + radius / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
}

function drawPoints() {
    let points = document.getElementById("results").tBodies[0];
    const r = parseFloat(document.getElementById("form:input_r_input").getAttribute("value"));
    if (!validateNumber("r", r, 2, 5)) {
        return;
    }
    for (let i = 0; i < points.rows.length; i++) {
        const point = points.rows.item(i).cells;
        // JS SUCKS
        const x = parseFloat(point.item(1).innerHTML);
        const y = parseFloat(point.item(2).innerHTML);
        const result = point.item(4).innerHTML;
        const a = (5 * r / 2);
        //console.log(width, height);
        const b = x + 1.25 * r;
        //console.log(b, width, a);
        const x_position = b * width / a;
        const y_position = (5 / 4 * r - y) * height / a;
        //console.log(x_position, y_position);

        //console.log(x, y, a);
        ///console.log(result);
       // console.log(x_position, y_position, r);
        //console.log(width, height);

        ctx.beginPath();
        ctx.moveTo(x_position, y_position);
        ctx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
        if (result === "HIT") {
            ctx.fillStyle = '#708868';
        } else {
            ctx.fillStyle = '#986363';
        }
        ctx.fill();

    }
}

function drawGraph() {
    ctx.clearRect(0, 0, width, height);
    drawFigure();
    drawAxes();
    drawPoints();
}

function mouseMove() {
    canvas.onmousemove = function (e) {
        drawGraph();
        ctx.beginPath();
        ctx.fillStyle = '#78cbef';
        ctx.arc(e.offsetX, e.offsetY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    canvas.onmouseleave = function () {
        drawGraph();
    }

    canvas.onmousedown = function (e) {
        console.log("Hiiiii" + e.offsetX + "  " + e.offsetY + "");
        const r = parseFloat(document.getElementById("form:input_r_hinput").getAttribute("value"));
        const x = ((e.offsetX / width) * (5 * r / 2) - (5 / 4) * r).toFixed(3)
        const y =  ((5 / 4) * r - (e.offsetY / height) * (5 * r / 2)).toFixed(3);
        if (!validateNumber("y", y, -3,5) || !validateNumber("r", r, 2, 5)) {
            console.log("HHHHHHHHEEEAR " + x + "  " + y + "");
            return;
        }
        document.getElementById("form:input_x").value = x;
        document.getElementById("form:input_y_hinput").setAttribute("value", y);
        document.getElementById("form:submit").disabled = false;
        document.getElementById("form:submit").click();
        document.getElementById("form").reset();
    }
}

function validateNumber(variable, number, min, max) {
    let error = document.getElementById("error_" + variable);
    if (number === "") {
        error.innerHTML = variable + " cannot be empty";
        return false;
    } else if (isNaN(parseFloat(number))) {
        error.innerHTML = variable + " must be a number";
        return false;
    } else if (!numberPattern.test(number)|| parseFloat(number) < Number(min) || parseFloat(number) > Number(max)) {
        error.innerHTML = variable + " must be in range [" + min + "; " + max + "]";
        return false;
    } else {
        error.innerHTML = "";
        console.log(variable + " is valid");
        return true;
    }
}

function validate(form) {
    let y = document.getElementById("form:input_y_hinput").getAttribute("value");
    let r = document.getElementById("form:input_r_hinput").getAttribute("value");
    return (validateNumber("y", y, -3,5) && validateNumber("r", r, 2, 5));
}

document.getElementById('form:input_x').value = 0;
document.getElementById("form").onsubmit = validate;

function selectFieldX(id) {
    let fieldX = document.getElementsByName("form:x");
    for (let i = 0; i < 9; i++) {
        if (fieldX[i].checked) {
             document.getElementById('form:input_x').value = (Number(-4) + Number(i)).toString();
            return;
        }
    }
    document.getElementById('form:input_x').value = 0;
}


