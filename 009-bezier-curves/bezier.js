var canvas = null;
var context = null;
var step = null;

function draw(p1, p2) {
  context.beginPath();
  console.log("creating line from (" + p1.x + ", " + p1.y + ") to (" +
              p2.x + ", " + p2.y + ")");
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}

function bezierCurveFor(t, a, b, c) {
  var t1 = (1 - t);
  var result = a*t1*t1 + 2*b*t1*t + c*t*t;
  /*   console.log('bezierCurve', result, [t, a, b, c]);*/
  return result;
}

function bezierCurve(a, b, c) {
  var cur, last = null;

  for (var i = 0; i < 1; i += step) {
    cur = {
      x: bezierCurveFor(i, a.x, b.x, c.x),
      y: bezierCurveFor(i, a.y, b.y, c.y)
    };

    if (last !== null) {
      draw(last, cur)
    }

    last = cur;
  }

  cur = {
    x: bezierCurveFor(1, a.x, b.x, c.x),
    y: bezierCurveFor(1, a.y, b.y, c.y)
  };
  draw(last, cur);
}

function parsePt(n) {
  var vals = document.getElementById("pt" + n).value.split(',').map(
    function(x) { return parseInt(x.trim()); }
  );
  return {
    x: vals[0],
    y: vals[1]
  };
}

function main() {
  if (!canvas) {
    canvas = document.getElementById("c");
    context = canvas.getContext("2d");
  }

  // Clear the canvas.
  canvas.width = canvas.width;

  step = parseFloat(document.getElementById("step").value);

  bezierCurve(
    parsePt(1),
    parsePt(2),
    parsePt(3)
  );
}

function showImage() {
  var url = canvas.toDataURL("image/png");
  window.open(url, "_blank");
}
