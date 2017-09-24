
var gl;
var points;
var bufferId = [];
// var vPosition = [];
var program;
var allText;
var lines;
var coordinates;
var numLines;

var Rotation= [0,0,0];

var xAddr;
var yAddr;
var zAddr;


var vertices = [];

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                lines = allText.split("\n");
                numLines = lines.length;
                var scaleFactor = 5;
                // alert(allText);
                for(count = 0; count < numLines; ++count){
                    coordinates = lines[count].split(" ");
                    for(i = 0; i < 3; ++i){
                        vertices.push(vec3(coordinates[i*3]/scaleFactor, coordinates[i*3 + 1]/scaleFactor, coordinates[i*3 + 2]/scaleFactor));
                    }
                    bufferId.push(gl.createBuffer());
                    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId[count] );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
                    vertices = [];
                }                
            }
            render(numLines);
        }
    }
    rawFile.send(null);
}


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    var w = window.File && window.FileReader && window.FileList && window.Blob;
    if  ( !w ) {alert( "File API Not Supported" );}


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
     //  Load shaders and initialize attribute buffers
    
     program = initShaders( gl, "vertex-shader", "fragment-shader" );
     gl.useProgram( program );

    readTextFile("./ncc1701b.data");
    document.getElementById("xRotation").onchange = function(event){
        Rotation[0] = event.target.value;
        render(numLines);
    };
    document.getElementById("yRotation").onchange = function(event){
        Rotation[1] = event.target.value;
        render(numLines);
    };
    document.getElementById("zRotation").onchange = function(event){
        Rotation[2] = event.target.value;
        render(numLines);
    };


    rotAddr = gl.getUniformLocation(program, "rotation_var");
    
};


function render(num) {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform4f(rotAddr, Rotation[0], Rotation[1], Rotation[2], 0);

    for(i = 0; i < num; ++i){
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId[i]);
        // vPosition.push(gl.getAttribLocation( program, "vPosition" ));
        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
    }

}

