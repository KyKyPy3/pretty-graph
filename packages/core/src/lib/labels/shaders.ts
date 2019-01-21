export const vertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec2 spriteDim;
  uniform vec2 textureDim;
  uniform float scale;
  uniform float nodeScalingFactor;

  attribute vec3 position;
  attribute vec3 translation;
  attribute float image;
  attribute float size;
  attribute vec2 uv;

  varying highp vec4 v_sprite;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    highp vec2 sp = vec2(mod((image * spriteDim.x), textureDim.x), floor((image * spriteDim.x) / textureDim.y) * spriteDim.y);
    v_sprite = vec4(sp.x / textureDim.x, sp.y / textureDim.y, spriteDim.x / textureDim.x, spriteDim.y / textureDim.y);

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x + nodeScalingFactor * (size / 2.0), pos.y, pos.z, 1.0);
  }
`;

export const fragmentShader: string = `
  precision highp float;

  uniform sampler2D textureMap;

  varying highp vec4 v_sprite;
  varying vec2 vUv;

  void main() {
    vec2 uv = vec2( vUv.x, 1.0 - vUv.y );
    gl_FragColor = texture2D(textureMap, vec2((v_sprite.s + v_sprite.p * uv.x), (v_sprite.t + v_sprite.q * uv.y)));
  }
`;
