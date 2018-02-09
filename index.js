var draw = (function() {
    var mouse=false;
    var canvas,context;
    var lastColor = 'black';
    var mbs = 2;
    var x=0,y=0,px=0,py=0;

    //Initializer
    init = function() {
        console.log('hello');

        //initializing canvas window
        canvas=document.getElementById("canvasview");
        var par=document.getElementById('board');
        context=canvas.getContext("2d");
        context.lineWidth=2*mbs;
        //console.log('H: '+par.offsetWidth);
        canvas.width=par.offsetWidth;
        canvas.height=par.offsetHeight;


        //add mouse event listeners
        canvas.addEventListener('mousedown',mouseStatus);
        canvas.addEventListener('mousemove',onMouseMove);
        canvas.addEventListener('mouseup',mouseStatus);
        //canvas.addEventListener('mouseout',mouseStatus);


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
        var clear=document.getElementById("clear");
        erase.addEventListener('click',onErase);
        save.addEventListener('click',onSave);
        clear.addEventListener('click',onClear);

        //current color border
        $('#'+lastColor).css("border","1px solid white");

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
            px=x;
            py=y;
            x=e.clientX;
            y=e.clientY;
            context.beginPath();
            context.arc(x,y,mbs,2,2*Math.PI);
            context.fill();
            context.closePath();
            onMouseMove(e);
        }
        else {
            mouse=false;
            //context.beginPath();
        }
    }

    //Handles mouse movement
    onMouseMove = function(e) {
        
        if(mouse) {
            px=x;
            py=y;
            x=e.clientX;
            y=e.clientY;
            context.lineWidth=2*mbs;
            context.beginPath();
            context.moveTo(px,py);
            context.lineTo(x,y);
            context.stroke();
            context.closePath();
        }
    }

    //Handles eraser tool function
    onErase = function(e) {
        context.strokeStyle="#576060";
        context.fillStyle="#576060";
        context.lineWidth=2*mbs;
    }

    //Handles saving
    onSave = function(e) {
        console.log('hello save');
        e.target.href=canvas.toDataURL();
        e.target.download="img.png";
    }

    onClear = function(e) {
        context.clearRect(0,0,canvas.width,canvas.height);
    }
})()

init();


