
var gl;
var points;
var bufferId = [];
var vPosition;
var program;
var allText;
var lines;
var coordinates;


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
                var numLines = 1;
                for(count = 0; count < numLines; ++count){
                    coordinates = lines[count].split(" ");
                    for(i = 0; i < 3; ++i){
                        vertices.push(vec3(coordinates[i*3]/3, coordinates[i*3 + 1]/3, coordinates[i*3 + 2]/3));
                    }
                    bufferId.push(gl.createBuffer());
                    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId[count] );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices[count]), gl.STATIC_DRAW );
                }
                render(numLines);
                
            }
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

    readTextFile("file:///home/quaczar/Documents/RPI/Computer Graphics/2/ncc1701b.data");
    
};


function render(num) {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(i = 0; i < num; ++i){
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId[i]);
        alert(bufferId[i]);
        vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
    }

}

