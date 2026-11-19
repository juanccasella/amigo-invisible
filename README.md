# Amigo invisible familiar

Página web de un solo archivo (`index.html`) para sortear el amigo invisible de la familia y mandarle a cada uno, por WhatsApp, un link que le muestra solo a quién le regala.

## Cómo funciona

1. El organizador abre la página, carga un nombre por línea, el presupuesto y la fecha, y toca **Sortear**.
2. Por cada persona aparece un botón **WhatsApp**, que abre WhatsApp con el mensaje ya escrito, y un botón **Copiar**.
3. Cada participante abre su link (`<url-de-la-página>#<código>`), toca "Ver mi amigo invisible" y ve el nombre que le tocó.

- No hay servidor ni base de datos: el resultado de cada persona va codificado en el `#código` de su link.
- El organizador no ve a quién le toca cada uno, así que también puede jugar.
- La única regla del sorteo es que nadie se regale a sí mismo.
- Si se vuelve a sortear, los links anteriores siguen mostrando el sorteo viejo: hay que mandar los nuevos a todos. La página pide confirmación si ya se mandó algún link.
- El sorteo queda guardado en el navegador del organizador (nombres, links y estado), así puede volver a la página más tarde.

## Registro de quién abrió su link

Cuando alguien toca "Ver mi amigo invisible", la página avisa a una planilla de Google del organizador. En la lista del sorteo, cada persona muestra **Sin enviar**, **Enviado, todavía no lo abrió** o **✓ Ya lo vio** con fecha y hora, y arriba un resumen ("3 de 5 ya vieron su amigo invisible"). Se actualiza solo cada 30 segundos o con el botón **Actualizar quién lo vio**.

Se guarda solo quién abrió su link y cuándo, nunca a quién le regala. Instalación: [planilla/INSTALAR.md](planilla/INSTALAR.md). Si `REGISTRO_URL` está vacía, la página funciona igual pero sin registro.

Para probarlo sin Google: `node tools/servidor-prueba.mjs` y abrir http://127.0.0.1:8791 (simula la planilla en memoria).

## Probarlo en la PC

Abrí `index.html` con doble clic. Al abrirla como archivo local, el campo "Link de esta página" queda vacío y hay que completarlo a mano. Publicada en internet, se completa solo.

Para ver la vista de un participante: sorteá con nombres de prueba, tocá **Copiar**, pegá en la barra del navegador el link que está en el mensaje y abrilo.

## Dónde está publicada

**https://juanccasella.github.io/amigo-invisible/**, en GitHub Pages desde la rama `main` del repo público `juanccasella/amigo-invisible`. Se abre sin iniciar sesión. Cada push a `main` la actualiza en uno o dos minutos.

No se usa claude.ai porque la política de Flock no permite compartir artifacts: ese link siempre pide iniciar sesión.

El código no tiene nombres ni datos de la familia. Los nombres solo viajan dentro de los links.

## Prueba antes del sorteo real

1. Sortear con `Prueba 1`, `Prueba 2` y `Prueba 3`.
2. Tocar **WhatsApp** y mandarse el mensaje a uno mismo (chat "Mensaje a mí mismo").
3. Abrir el link desde el celular en incógnito: tiene que decir "Hola, Prueba 1" y mostrar el nombre al tocar el botón.
4. Si anda, recargar la página y sortear con los nombres reales.
