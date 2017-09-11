
var gl;
var points;
var bufferId;
var vPosition;
var program;


var vertices = [
    vec2( -0.75, .15 ),
    vec2(  -0.75,  0.75 ),
    vec2(  0, 0.75 )
];

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
                var allText = rawFile.responseText;
                alert(allText);
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

    readTextFile("file:///home/quaczar/Documents/RPI/Computer Graphics/2/ncc1701b.data");
    
    

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
     //  Load shaders and initialize attribute buffers
    
     program = initShaders( gl, "vertex-shader", "fragment-shader" );
     gl.useProgram( program );
     
     // Load the data into the GPU
     
     bufferId = gl.createBuffer();
     gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
     gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

 
     render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );

}

