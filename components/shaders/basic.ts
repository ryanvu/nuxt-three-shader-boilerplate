export const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const fragmentShader = `
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  uniform float uTime;
  varying vec2 vUv;
 
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    // Four corners of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    // Smooth interpolation
    vec2 u = smoothstep(0.0, 1.0, f);
    
    // Mix the four corners
    return mix(mix(a, b, u.x),
               mix(c, d, u.x), u.y);
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 1.5;
    float frequency = .0;
    // Add multiple octaves of noise
    for(float i = 0.0; i < 9.0; i++) {
        value += amplitude * noise(st * frequency);
        frequency *= 1.0;
        amplitude *= .6;
    }
    return value;
}
  void main() {
    vec2 uv = vUv;
    float noiseValue = fbm(uv * 5.0 + uTime * 0.1) * 0.2; 

    float distortion = 0.02; // Controls how much the "glass" bends the view
    vec2 glassUv = uv + vec2(
        sin(uv.y * 50.0 + uTime * 25.) * distortion,
        cos(uv.x * 100.0 + uTime) * distortion
    );
    // Create organic waves
    float waves = 0.0;
    for(float i = 1.0; i < 4.0; i++) {
        waves += sin(glassUv.x * 5.0 * i + uTime + cos(glassUv.y * 2.0 + uTime * 0.5)) * (1.0/i);
        waves += cos(glassUv.y * 5.0 * i + uTime + sin(glassUv.x * 3.0 + uTime * 0.5)) * (1.0/i);
    }
    
    waves += noiseValue;
    // Add mouse interaction
    float mouseDistance = length(uv - (uMouse * 0.5 + 0.5));
    float mouseWave = sin(mouseDistance * 15.0 - uTime * 10.5) * exp(-mouseDistance * 1.0);
    
    vec3 color = vec3(
        waves * 0.5 + 0.7 + mouseWave * 0.25,
        sin(waves),
        uScrollProgress * 0.7
    );


    vec3 glassColor = vec3(0.5, 0.9, 0.23);
    float glassOpacity = 0.25;
    color = mix(color, glassColor, glassOpacity);

    gl_FragColor = vec4(color, 1.0);
}
`