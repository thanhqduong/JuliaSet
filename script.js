function heightToPixel(x, canvas) {
    var h = canvas.height;
    x += 2;
    return x * h / 4;
}

function widthToPixel(x, canvas) {
    var w = canvas.width;
    x += 2;
    return x * w / 4;
}

function pixelToHeight(x, h) {
    return (x - (h/2)) / (h/4);
}

function pixelToWidth(x, w) {
    return (x - (w/2)) / (w/4);
}

function drawPoint(x, y, canvas, ctx, color, imageData) {
    true_x = widthToPixel(x, canvas);
    true_y = heightToPixel(y, canvas);
    ctx.fillStyle = 'rgb('+ color + ', ' + color + ', ' + color + ')';
    ctx.fillRect( true_x, true_y, 2, 2 );
}

function init(e) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    const iter = 40;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    var rect = canvas.getBoundingClientRect();
    var base_x = e.clientX - rect.left;
    var base_y = e.clientY - rect.top;
    base_x = pixelToWidth(base_x, canvas.width);
    base_y = pixelToHeight(base_y, canvas.height);
    var output_string = 'c = (' + base_x.toFixed(3) + ', ' + base_y.toFixed(3) + ').';
    let count = 0;
    document.getElementById('coor').innerHTML = output_string;
    for (let r = 0; r < canvas.height; r ++) {
        for (let c = 0; c < canvas.width; c++) {
            draw(r,c, base_x, base_y, iter, canvas, ctx);
        }
    }
}

function draw(true_x, true_y, base_x, base_y, iter, canvas, ctx) {
    color = 0
    var cur_x = pixelToWidth(true_x, canvas.width);
    var cur_y = pixelToHeight(true_y, canvas.height);
        
    var n = 0;
    while (n < iter) {
        var temp_x = cur_x;
        var temp_y = cur_y;
        cur_x = base_x + temp_x * temp_x - temp_y * temp_y;
            cur_y = base_y + 2 * temp_x * temp_y;
        if (cur_x * cur_x + cur_y * cur_y >= 2) {
            break;
        }
        n += 1;

    }
    if (n === iter) {
        color =  0;
    }
    else {
        color = Math.floor(Math.sqrt(Math.sqrt(n / 255)) * 255);
    }
        


    ctx.fillStyle = 'rgb('+ color + ', ' + color + ', ' + color + ')';
    ctx.fillRect( true_x, true_y, 2, 2 );

}