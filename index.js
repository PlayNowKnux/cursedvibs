var c = document.getElementById("c");
var ctx = c.getContext("2d");

var settings = {
    base: 0,
    eye: {
        num: rand_default[0],
        position: {
            x: 0,
            y: 550,
            distance: 50
        }
    },
    mouth: {
        num: rand_default[1],
        position: {
            x: 0,
            y: 850
        }
    },
    debug: {
        drawEyeLine: false
    }
}

const baseEyeHeight = settings.eye.position.y;
const baseEyeDist = settings.eye.position.distance;

const baseMouthHeight = settings.mouth.position.y;

function resetInputs() {
    document.getElementById("eyetype").value = settings.eye.num;
    document.getElementById("eyetype").max = eyes_amount - 1;
    document.getElementById("eyeheight").value = (settings.eye.position.y - baseEyeHeight) * -1;
    document.getElementById("eyespacing").value = settings.eye.position.distance - baseEyeDist;

    document.getElementById("mouthtype").value = settings.mouth.num;
    document.getElementById("mouthtype").max = mouths_amount - 1;
    document.getElementById("mouthheight").value = (settings.mouth.position.y - baseMouthHeight) * -1;
}

resetInputs()

function eyePos(useX, flipped = false) {
    // useX true? get x
    // useX false? get y
    if (useX) {
        if (flipped) {
            return ((c.width / 2) + (eyes[settings.eye.num].width) + settings.eye.position.distance)
        } else {
            return ((c.width / 2) - (eyes[settings.eye.num].width) - settings.eye.position.distance)
        }
    } else {
        return settings.eye.position.y - (eyes[settings.eye.num].height / 2)
    }
}

function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false){
    // https://www.py4u.net/discuss/323903
    ctx.save();  // save the current canvas state
    ctx.setTransform(
        horizontal ? -1 : 1, 0, // set the direction of x axis
        0, vertical ? -1 : 1,   // set the direction of y axis
        eyePos(true, true),eyePos(false)
    );
    ctx.drawImage(image,0,0);
    ctx.restore(); // restore the state as it was when this function was called
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.drawImage(bases[settings.base], 0, 0);
   
    ctx.drawImage(
        eyes[settings.eye.num], 
        ((c.width / 2) - (eyes[settings.eye.num].width) - settings.eye.position.distance), 
        settings.eye.position.y - (eyes[settings.eye.num].height / 2)
    )
    
    mirrorImage(
        ctx,
        eyes[settings.eye.num], 
        ((c.width / 2) + (eyes[settings.eye.num].width) + settings.eye.position.distance), 
        settings.eye.position.y - (eyes[settings.eye.num].height / 2),
        true,
        false
    )

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.drawImage(
        mouths[settings.mouth.num], 
        ((c.width / 2) - (mouths[settings.mouth.num].width / 2)), 
        settings.mouth.position.y - (eyes[settings.mouth.num].height / 2)
    )

    if (settings.debug.drawEyeLine) {
        ctx.strokeStyle = "#00FF00";
        ctx.beginPath();
        ctx.moveTo(0, settings.eye.position.y);
        ctx.lineTo(c.width, settings.eye.position.y);
        ctx.stroke();
    }
    
}

function applySettings() {
    settings.eye.num = document.getElementById("eyetype").value;
    settings.eye.position.y = parseInt(document.getElementById("eyeheight").value)* -1 + baseEyeHeight ;
    settings.eye.position.distance = parseInt(document.getElementById("eyespacing").value) + baseEyeDist;

    settings.mouth.num = document.getElementById("mouthtype").value;
    settings.mouth.position.y = parseInt(document.getElementById("mouthheight").value)* -1 + baseMouthHeight;
    resetInputs()
    draw();
}

function randomize() {
    settings.eye.num = Math.floor(Math.random() * eyes_amount)
    settings.mouth.num = Math.floor(Math.random() * mouths_amount)
    resetInputs();
    draw();
}

//draw();