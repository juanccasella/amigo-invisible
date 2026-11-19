# AGENTS.md — Amigo invisible familiar

Instrucciones para Codex u otro agente que continúe este proyecto. Ver `README.md` para qué hace la página y cómo se usa.

## Contexto

- Proyecto personal y chico: un único `index.html` con HTML, CSS y JS inline, sin build ni dependencias. Solo carga las fuentes de Google Fonts.
- Fue un artifact de claude.ai. No se pudo compartir por la política de seguridad de la empresa, así que falta publicarlo en otro lado.
- Se responde en español rioplatense. Prioridad: que sea simple de usar para la familia desde el celular.

## Cómo está armado `index.html`

- **Vistas**: `#org` (organizador, cuando la URL no tiene hash), `#part` (participante, cuando el hash es un código válido) y `#bad` (código inválido, con un campo para pegar el link). `route()` elige la vista en la carga y en `hashchange`.
- **Sorteo**: `parse()` arma la lista con un nombre por línea. `draw()` mezcla al azar hasta que nadie se tenga a sí mismo. Los nombres repetidos dan error.
- **Código del link**: `encode()` toma `{g: quien regala, r: a quien, e: evento, m: presupuesto, f: fecha}`, lo pasa a JSON, le agrega un byte de control, lo ofusca con XOR y lo escribe en base32 en minúsculas (solo `a-z2-7`). `decode()` hace el camino inverso y rechaza códigos alterados. No es seguridad real, solo evita que se lea a simple vista.
- **WhatsApp**: `https://wa.me/?text=...` con el mensaje armado en `message()`. Hay un botón **Copiar** de respaldo.
- **Registro**: `REGISTRO_URL` apunta a la aplicación web de Apps Script (`planilla/Codigo.gs`). Al revelar, el participante hace `GET ?accion=visto&sorteo=<id>&nombre=<quien regala>` (`no-cors`, sin esperar respuesta). El organizador consulta `GET ?accion=estado&sorteo=<id>` cada 30 s. El código del link lleva el id del sorteo en `s`. Nunca mandar el nombre de quien recibe.
- **Sorteo guardado**: en `localStorage` (`amigo-invisible-sorteo`) se guarda `{id, ev, items:[{g, code, enviado, visto}]}` para poder volver y ver el estado.
- **Prueba local**: `node tools/servidor-prueba.mjs` sirve la página en http://127.0.0.1:8791 con un registro falso en memoria.
- **Link base**: `DEFAULT_LINK` toma `location.origin + location.pathname` cuando la página está servida por http(s). Abierta como archivo local, el campo queda vacío.

## Publicación

Publicada en https://juanccasella.github.io/amigo-invisible/ (GitHub Pages, rama `main`, repo público). Cada push a `main` publica: confirmar con Cruz antes de pushear.

## Reglas

- No cambiar el formato del código del link sin avisar: invalida los links que ya se mandaron.
- Mantener todo en un solo archivo y sin dependencias nuevas.
- No guardar en el repo nombres reales de la familia ni resultados de sorteos.
