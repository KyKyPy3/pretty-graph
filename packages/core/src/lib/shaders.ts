export const vertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float scale;
  uniform vec2 spriteDim;
  uniform vec2 textureDim;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 color;       // only used for raycasting
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float size;
  attribute float image;

  varying vec3 vColor;
  varying float vScale;
  varying float vSize;
  varying highp vec4 v_sprite;

  void main() {
    vColor = color;
    vScale = scale;
    vSize = size;

    highp vec2 sp = vec2(mod((image * spriteDim.x), textureDim.x), floor((image * spriteDim.x) / textureDim.y) * spriteDim.y);
    v_sprite = vec4(sp.x / textureDim.x, sp.y / textureDim.y, spriteDim.x / textureDim.x, spriteDim.y / textureDim.y);

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = size * scale * 10.0;
  }
`;

export const fragmentShader: string = `
  #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
  #endif

  precision highp float;

  uniform sampler2D textureMap;

  varying float vScale;
  varying float vSize;
  varying vec3 vColor;
  varying highp vec4 v_sprite;

  void main() {
    vec2 uv = vec2( gl_PointCoord.x, gl_PointCoord.y );
    float distance = 0.2;
    float border = 0.2;
    float radius = 0.5;

    if (vSize * 10.0 * vScale > 75.0) {
      distance = 0.02;
      if (vScale < 3.0) {
        border = distance + 0.025;
      } else {
        border = distance + 0.02;
      }
      vec2 m = uv - vec2(0.5, 0.5);
      float dist = radius - sqrt(dot(m, m));

      float sm = smoothstep(0.0, distance, dist);
      float sm2 = smoothstep(border, border - distance, dist);
      float alpha = sm*sm2;

      float tm = smoothstep(border, border + distance, dist);

      if (dist > border)
        gl_FragColor = vec4(texture2D(textureMap, vec2((v_sprite.s + v_sprite.p * uv.x), (v_sprite.t + v_sprite.q * uv.y))).rgb, tm);
      else if (dist > 0.0)
        gl_FragColor = vec4(vColor, alpha);
      else discard;
    } else {
      if (vScale < 0.3) {
        vec2 m = uv - vec2(0.5, 0.5);
        float dist = radius - sqrt(dot(m, m));
        if (dist > border || dist > 0.0)
          gl_FragColor = vec4(0.8, 0.8, 0.8, 1.0);
        else discard;
      } else if (vScale < 1.5) {
        distance = 0.25;
        if (vScale > 1.2) {
          border = 0.5 - (vScale / 10.0) * 1.9;
        } else {
          border = 0.25;
        }

        vec2 m = uv - vec2(0.5, 0.5);
        float dist = radius - sqrt(dot(m, m));

        float sm = smoothstep(0.0, distance, dist);
        float sm2 = smoothstep(border, border - distance, dist);
        float alpha = sm*sm2;

        float tm = smoothstep(border, border + distance, dist);

        if (dist > border || dist > 0.0)
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        else discard;
      }
    }
  }
`;

export const pickingVertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float scale;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 color;       // only used for raycasting
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float size;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = size * scale * 10.0;
  }
`;

export const pickingFragmentShader: string = `
  #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
  #endif

  precision highp float;

  varying vec3 vColor;

  void main() {
    float r = 0.0, delta = 0.0, alpha = 1.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    if (r > 1.0) {
      discard;
    }

    gl_FragColor = vec4(vColor, 1.0) * alpha;
  }
`;
