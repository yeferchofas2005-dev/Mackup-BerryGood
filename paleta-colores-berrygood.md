# Paleta de colores - BerryGood

Esta es la paleta base que define la identidad visual de BerryGood y debe usarse como referencia para aplicaciones, landing pages y materiales del ecosistema.

## 1) Paleta principal

| Nombre | Hex | Uso recomendado |
|---|---|---|
| Ink | `#212126` | Texto principal, títulos, contrastes fuertes |
| Purple | `#4b0b78` | Color de marca principal, botones, enlaces destacados, acentos |
| Lime | `#c7ef54` | Acento secundario, puntos visuales, detalles y resaltar elementos |
| Paper | `#f5f7f2` | Fondo principal claro, cartas, áreas de contenido |
| Line | `#e0e6dc` | Bordes, separadores, contenedores suaves |
| Muted | `#625f64` | Texto secundario, subtítulos, navegación secundaria |
| White | `#ffffff` | Espacios de alta legibilidad y contrastes sobre fondos oscuros |

## 2) Variables CSS sugeridas

```css
:root {
  --ink: #212126;
  --muted: #625f64;
  --purple: #4b0b78;
  --lime: #c7ef54;
  --paper: #f5f7f2;
  --line: #e0e6dc;
  --white: #ffffff;
}
```

## 3) Guía de uso

### Color principal
- `#4b0b78` (Purple): este es el color institucional de BerryGood.
- Se recomienda usarlo en:
  - encabezados principales
  - botones CTA
  - enlaces activos
  - marca y branding

### Color de apoyo
- `#c7ef54` (Lime): aporta energía, movimiento y contraste suave.
- Se usa para:
  - puntos de marca
  - detalles visuales
  - pequeñas acentuaciones y elementos decorativos

### Fondos y texto
- `#f5f7f2` (Paper): fondo neutro y limpio ideal para elegancia minimalista.
- `#212126` (Ink): texto principal para máxima legibilidad.
- `#625f64` (Muted): texto complementario y navegación secundaria.

### Bordes y separación
- `#e0e6dc` (Line): para líneas divisorias, cards y elementos sutiles.

## 4) Ejemplo de composición visual

```css
body {
  background: #f5f7f2;
  color: #212126;
}

.primary-btn {
  background: #4b0b78;
  color: #ffffff;
}

.accent-pill {
  background: #c7ef54;
  color: #212126;
}
```

## 5) Recomendación general

BerryGood usa una estética clara, sobria y premium con una combinación de morado intenso + verde lima para equilibrar profesionalismo y energía. La base visual funciona muy bien en interfaces web, presentaciones, piezas de marketing y aplicaciones internas.

> Esta paleta es la base para futuras aplicaciones del proyecto. Si se trabaja en otros productos del ecosistema, se debe mantener la misma lógica visual para conservar la identidad de marca.
