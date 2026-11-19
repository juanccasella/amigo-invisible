# Instalar el registro de quién abrió su link

Se hace una sola vez y lleva unos 5 minutos. Usá tu **Gmail personal**: la cuenta de Flock puede tener bloqueado Apps Script.

## 1. Crear la planilla

1. Entrá a **sheets.new** (crea una planilla vacía).
2. Ponele de nombre **Amigo invisible — registro**.

## 2. Pegar el script

1. En la planilla: **Extensiones → Apps Script**.
2. Borrá todo lo que aparece en el editor y pegá el contenido completo de [Codigo.gs](Codigo.gs).
3. Tocá el ícono de **Guardar** (disquete).

## 3. Publicarlo como aplicación web

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En el engranaje de "Seleccionar tipo", elegí **Aplicación web**.
3. Completá:
   - **Descripción:** registro amigo invisible
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
4. Tocá **Implementar**.
5. Google pide autorizar el acceso a la planilla: **Autorizar acceso** → elegí tu cuenta → si aparece "Google no verificó esta app", tocá **Configuración avanzada → Ir a (nombre del proyecto)** → **Permitir**. Es tu propio script y solo toca esta planilla.
6. Copiá la **URL de la aplicación web**. Empieza con `https://script.google.com/macros/s/` y termina en `/exec`.

## 4. Conectarla a la página

Pegá esa URL en `REGISTRO_URL`, al principio del script de `index.html`, y publicá el cambio en GitHub (o pasásela a Claude/Codex para que lo haga).

## Qué guarda

En la hoja **Vistos**: el código del sorteo, el nombre de quien abrió su link y cuándo. **Nunca a quién le regala.**

## Si cambiás el script después

Cada cambio en `Codigo.gs` requiere **Implementar → Gestionar implementaciones → editar (lápiz) → Versión: nueva versión → Implementar**. Así la URL sigue siendo la misma.
