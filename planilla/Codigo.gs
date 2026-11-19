// Registro de quién abrió su link del amigo invisible.
// Va pegado en Extensiones > Apps Script de una planilla de Google (ver planilla/INSTALAR.md).
// Guarda solo el sorteo, el nombre de quien abrió su link y cuándo. Nunca a quién le regala.

const HOJA = "Vistos";

function doGet(e) {
  const p = (e && e.parameter) || {};
  const sorteo = String(p.sorteo || "");
  if (!/^[a-z0-9]{6,20}$/.test(sorteo)) return json({ ok: false, error: "sorteo inválido" });

  const hoja = obtenerHoja();

  if (p.accion === "visto") {
    const nombre = limpiar(p.nombre);
    if (!nombre) return json({ ok: false, error: "falta el nombre" });
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const filas = hoja.getDataRange().getValues();
      const comparar = nombre.replace(/^'/, "");
      const yaEsta = filas.some((f) => f[0] === sorteo && String(f[1]) === comparar);
      if (!yaEsta) hoja.appendRow([sorteo, nombre, new Date()]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  }

  if (p.accion === "estado") {
    const vistos = hoja.getDataRange().getValues().slice(1)
      .filter((f) => f[0] === sorteo)
      .map((f) => ({ nombre: String(f[1]).replace(/^'/, ""), cuando: new Date(f[2]).toISOString() }));
    return json({ ok: true, vistos: vistos });
  }

  return json({ ok: false, error: "acción desconocida" });
}

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) hoja.appendRow(["Sorteo", "Nombre", "Abrió su link"]);
  return hoja;
}

// Corta nombres largos y evita que un nombre que empiece con = + - @ se tome como fórmula.
function limpiar(texto) {
  const t = String(texto || "").trim().slice(0, 60);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
