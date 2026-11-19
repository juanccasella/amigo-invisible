// Servidor local para probar la página con un registro falso, sin Google.
// Uso: node tools/servidor-prueba.mjs  → http://127.0.0.1:8791
// Sirve index.html con REGISTRO_URL apuntando a /registro, que imita al script de la planilla (en memoria).
import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const PUERTO = Number(process.env.PORT || 8791);
const html = () => readFileSync(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8")
  .replace(/const REGISTRO_URL = "[^"]*";/, 'const REGISTRO_URL = "/registro";');
const vistos = []; // { sorteo, nombre, cuando }

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/registro") {
    const p = Object.fromEntries(url.searchParams);
    let out = { ok: false, error: "acción desconocida" };
    if (!/^[a-z0-9]{6,20}$/.test(p.sorteo || "")) out = { ok: false, error: "sorteo inválido" };
    else if (p.accion === "visto" && p.nombre) {
      if (!vistos.some(v => v.sorteo === p.sorteo && v.nombre === p.nombre)) vistos.push({ sorteo: p.sorteo, nombre: p.nombre, cuando: new Date().toISOString() });
      out = { ok: true };
    } else if (p.accion === "estado") {
      out = { ok: true, vistos: vistos.filter(v => v.sorteo === p.sorteo).map(({ nombre, cuando }) => ({ nombre, cuando })) };
    }
    console.log(req.url, "→", JSON.stringify(out));
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    return res.end(JSON.stringify(out));
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(html());
}).listen(PUERTO, "127.0.0.1", () => console.log(`Prueba en http://127.0.0.1:${PUERTO}`));
