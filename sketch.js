var points = [];
var pointsLabel = [];
var pointNumber = 0;
var canvasSize = 600;

function setup() {
  points = [];
  pointsLabel = ["A", "B", "C", "D"];
  createCanvas(canvasSize, canvasSize);
  /*
  * testando intersecao com segmento sobre segmento
  points[0] = [90,90];
  points[1] = [300,300]
  points[2] = [200,200];
  points[3] = [500,500]
  */
}

function draw() {
  background(220,220,255);
  drawCross();
  drawLines();
  drawPoints();
  drawPointsLabel();
  verificaIntersecao();

}

function drawCross() {
  strokeWeight(0.5)
  line(canvasSize / 2, 0, canvasSize / 2, canvasSize);
  line(0, canvasSize / 2, canvasSize, canvasSize / 2);
}

function mousePressed() {
  if (mouseX > 0 &&
    mouseX < canvasSize &&
    mouseY > 0 &&
    mouseY < canvasSize)
    addPoint(mouseX, mouseY)
}

function addPoint(x, y) {
  if (points.length > 3) {
    points = [];
    pointNumber = 0;
  }
  points[pointNumber] = [];
  points[pointNumber][0] = x;
  points[pointNumber][1] = y;
  pointNumber++;
}

function drawLines() {
  strokeWeight(2);
  if (points.length > 1)
    drawLineAB();  
  if (points.length > 3) 
    drawLineCD();
}

function drawLineAB() {
  stroke(255, 0, 0);
  line(points[0][0], points[0][1], points[1][0], points[1][1]);
}

function drawLineCD() {
  stroke(0, 150, 0);
  line(points[2][0], points[2][1], points[3][0], points[3][1]);
}

function drawPoints(){
  stroke(0,0,0)
  strokeWeight(5)
  for (let i = 0; i < points.length; i++) {
    point(points[i][0], points[i][1]);
  }
}

function drawPointsLabel() {
  textSize(25)
  strokeWeight(1)
  stroke(0, 0, 0)
  for (let i = 0; i < points.length; i++) {
    text(pointsLabel[i], points[i][0], points[i][1] - 10)
  }
}

function sub(u, v) {
  return [u[0] - v[0], u[1] - v[1]];
}

function dot(u, v) {
  return u[0] * v[0] + u[1] * v[1];
}

function calculaT(p1, p2, q, n) {
  return dot(sub(q, p1), n) / dot(sub(p2, p1), n)
}

function verificaIntersecao() {
  if (points.length <= 3)
    return;
  let cd = sub(points[3], points[2]);
  let n = [-cd[1], cd[0]]
  let t = calculaT(points[0], points[1], points[2], n);
  
  let ab = sub(points[1], points[0]);
  n = [-ab[1], ab[0]];
  let s = calculaT(points[2], points[3], points[0], n);
  textSize(25)
  if((t >= 0 && t <= 1 && s >= 0 && s <= 1) || (isNaN(t) && isNaN(s))){
    text("Interseção", 30, 30);
  }else{
    text("Não intercepta",30, 30);
  }
}
