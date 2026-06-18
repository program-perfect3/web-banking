"use client"

import { useEffect, useRef } from "react"

/**
 * Animated pixel-art gradient rendered with a WebGL fragment shader.
 * The gradient is quantized into chunky pixel blocks and ordered-dithered
 * (Bayer 4x4) to give it an authentic 8-bit look. Brand amber -> orange -> gold.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

// 4x4 Bayer ordered-dither threshold map
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  float m[16];
  m[0]=0.0;  m[1]=8.0;  m[2]=2.0;  m[3]=10.0;
  m[4]=12.0; m[5]=4.0;  m[6]=14.0; m[7]=6.0;
  m[8]=3.0;  m[9]=11.0; m[10]=1.0; m[11]=9.0;
  m[12]=15.0;m[13]=7.0; m[14]=13.0;m[15]=5.0;
  float v = 0.0;
  for (int k = 0; k < 16; k++) { if (k == i) v = m[k]; }
  return (v + 0.5) / 16.0;
}

void main() {
  float px = 14.0; // size of one "pixel" block in device pixels
  vec2 block = floor(gl_FragCoord.xy / px) * px;
  vec2 uv = block / u_res;

  // moving diagonal gradient field
  float t = u_time * 0.25;
  float g = sin((uv.x + uv.y) * 3.0 + t) * 0.5 + 0.5;
  g = mix(g, uv.x * 0.6 + (1.0 - uv.y) * 0.6, 0.45);

  // brand palette: deep amber -> orange -> light gold
  vec3 c1 = vec3(0.85, 0.45, 0.07); // deep amber
  vec3 c2 = vec3(0.97, 0.68, 0.18); // orange-gold
  vec3 c3 = vec3(1.00, 0.87, 0.52); // light gold highlight
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.6, g));
  col = mix(col, c3, smoothstep(0.6, 1.0, g));

  // ordered dithering -> quantize into stepped color bands
  float d = bayer(block / px);
  float steps = 5.0;
  col = floor(col * steps + d) / steps;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

export function PixelShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    let raf = 0
    const start = performance.now()
    const render = () => {
      resize()
      const time = reduce ? 8 : (performance.now() - start) / 1000
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduce) raf = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
