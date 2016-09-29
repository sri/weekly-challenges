var canvas = null;
var context = null;
var step = null;

function apply(fn, args) {
  return fn.apply(null, args);
}

function draw(p1, p2) {
  context.beginPath();
  console.log("creating line from (" + p1.x + ", " + p1.y + ") to (" +
              p2.x + ", " + p2.y + ")");
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}

function cubicBezierCurve(t, a, b, c, d) {
  var t1 = (1 - t);
  var result = a*t1*t1*t1 + 3*b*t*t1*t1 + 3*c*t1*t*t + d*t*t*t;
  return result;
}

function quadraticBezierCurve(t, a, b, c) {
  var t1 = (1 - t);
  var result = a*t1*t1 + 2*b*t1*t + c*t*t;
  /*   console.log('bezierCurve', result, [t, a, b, c]);*/
  return result;
}

function args(nthStep, whichArg, args) {
  var a = [];
  for (var i = 0; i < args.length; i++) {
    a.push(args[i]);
  }
  var result = [nthStep].concat(a.map(function(pt) { return pt[whichArg] }));
  console.log('args', result);
  return result;
}

function bezierCurve() {
  var fn,cur, last = null;

  if (arguments.length === 4) {
    fn = cubicBezierCurve;
    console.log('using the cubicBezierCurve algorithm');
  } else {
    fn = quadraticBezierCurve;
    console.log('using the quadraticBezierCurve algorithm');
  }

  for (var i = 0; i < 1; i += step) {
    cur = {
      x: apply(fn, args(i, 'x', arguments)),
      y: apply(fn, args(i, 'y', arguments))
    };
    console.log('cur', cur);

    if (last !== null) {
      draw(last, cur)
    }

    last = cur;
  }

  cur = {
    x: apply(fn, args(1, 'x', arguments)),
    y: apply(fn, args(1, 'y', arguments))
  };
  draw(last, cur);
}

function parsePt(n) {
  var val = document.getElementById("pt" + n).value.trim();
  if (val === "") return null;
  var vals = val.split(',').map(
    function(x) { return parseInt(x.trim()); }
  );
  if (vals.length !== 2) return null;
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

  var pts = [
    parsePt(1),
    parsePt(2),
    parsePt(3)
  ];
  var pt4 = parsePt(4);
  if (pt4) pts.push(pt4);
  console.log('pts', pts);

  apply(bezierCurve, pts);
}

function showImage() {
  var url = canvas.toDataURL("image/png");
  window.open(url, "_blank");
}
