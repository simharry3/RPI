
var gl;
var points;
var bufferId, bufferId2, bufferId3;
var vPosition, vPosition2, vPosition3;
var program;


var vertices = [
    vec2( -0.75, .15 ),
    vec2(  -0.75,  0.75 ),
    vec2(  0, 0.75 ),
    vec2( 0, .15)
];
var vertices2 = [
    vec2( .25, 0 ),
    vec2(  .75,  -1 ),
    vec2(  1, -1 ),
    vec2( 1, 1),
    vec2( .25, 1)
];
var vertices3 = [
    vec2( -.75, -1 ),
    vec2(  .4,  -1 ),
    vec2(  0, -.25 ),
    vec2( -.75, -.25)
];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    

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

     bufferId2 = gl.createBuffer();
     gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
     gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );

     bufferId3 = gl.createBuffer();
     gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
     gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices3), gl.STATIC_DRAW );
 
     // Associate out shader variables with our data buffer
     
    //  var vPosition = gl.getAttribLocation( program, "vPosition" );
    //  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    //  gl.enableVertexAttribArray( vPosition );
 
     render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2);
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3);
    var vPosition3 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition3 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

