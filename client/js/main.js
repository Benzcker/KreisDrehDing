
function e(x) 
{
    return Math.E**(-0.1*x);
}

function f(x) 
{
    return e(x)*Math.sin(x);
}
function g(x) 
{
    return e(x)*Math.cos(x);
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

window.onload = () =>
{
    const screen = document.querySelector('#screen');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    const context = screen.getContext('2d');

    const mouse = {x: 0, y: 0};

    (function() {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event) {
            var eventDoc, doc, body;
    
            event = event || window.event; // IE-ism
    
            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;
    
                event.pageX = event.clientX +
                  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                  (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                  (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }
    
            // Use event.pageX / event.pageY here
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        }
    })();


    let lastTime = 0;
    let x = screen.width/2;
    let y = screen.height/2;
    const update = time => 
    {
        let dt = (time - lastTime) / 1000;
        if (dt > 1) dt = 1;
        // context.fillStyle = '#00000001';
        // context.fillRect(0, 0, screen.width, screen.height);
        // context.clearRect(0, 0, screen.width, screen.height);

        x = f(time/1000) * screen.height*0.2 + screen.width/2;
        y = g(time/1000) * screen.height*0.2 + screen.height/2;
        context.fillStyle = hslToHex(time/50, 100, 50);
        context.beginPath();
        context.arc(x, y, e(time/1000)*screen.height*0.18, 0, 2 * Math.PI);
        context.fill();
        // context.stroke();
        
        requestAnimationFrame(update);
        lastTime = time;
    };
    update(0);
};

