var draw = (function() {
    var mouse=false;
    var started=false;
    var canvas,context;
    var lastColor = 'white';
    var mbs = 2;

    //Initializer
    init = function() {
        console.log('hello');

        //initializing canvas window
        canvas=document.getElementById("canvasview");
        context=canvas.getContext("2d");
        context.lineWidth=2*mbs;
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        canvas.addEventListener('mousedown',mouseStatus);
        canvas.addEventListener('mousemove',onMouseMove);
        canvas.addEventListener('mouseup',mouseStatus);


        //initialing color pallete and their onclick events
        var colors = document.getElementsByClassName("color");
        var n=colors.length;
        console.log(n);
        for(var i=0;i<n;i++) {
            colors[i].addEventListener('click',onColorClick);
        }

        //Initializing brush sizes
        var bs = document.getElementsByClassName("bs");
        var m = bs.length;
        console.log(m);
        for(var i=0;i<m;i++) {
            bs[i].addEventListener('click',setBrushSize);
        }

        //setting up erase listener, loading save and erase div
        var erase=document.getElementById("erase");
        var save=document.getElementById("save");
        erase.addEventListener('click',onErase);
        save.addEventListener('click',onSave);
    }

    //Sets brush size
    setBrushSize = function(e) {
        var el = e.target.id;
        mbs=2*el;
    }

    //Sets color of the brush on clicking the color in pallete
    onColorClick = function(e) {

        context.closePath();
        context.beginPath();

        var color = e.target.id;
        context.strokeStyle=color;
        var border = 'white';
        if(color=='white') 
            border='black';
        
        $('#'+lastColor).css("border","none");
        $('#'+color).css("border","1px solid "+border);
        lastColor=color;

    }

    //Handles mouse status- up or down

    mouseStatus = function(e) {
        if(!mouse) {
            mouse=true;
            console.log(mouse);
            onMouseMove();
        }
        else {
            mouse=false;
        }
    }

    //Handles mouse movement
    onMouseMove = function(e) {
        
        if(mouse) {
            var x,y;

            x=e.pageX;
            y=e.pageY;
            context.lineWidth=2*mbs;

            if(!started) {
                started=true;
                context.beginPath();
                context.moveTo(x,y);
            }
            else {
                context.lineTo(x,y);
                context.stroke();
            }
        }
    }

    //Handles eraser tool function
    onErase = function(e) {
        context.strokeStyle="#576060";
        context.lineWidth=2*mbs;
    }

    //Handles saving
    onSave = function(e) {
        console.log('hello save');
        e.target.href=canvas.toDataURL();
        e.target.download="img.png";
    }
})()

init();


