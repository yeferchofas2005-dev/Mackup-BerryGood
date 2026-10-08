# Paleta de colores - Lemon.ia

Esta es la paleta base para Lemon.ia, alineada con la identidad visual de BerryGood y pensada para comunicar innovación, automatización e inteligencia artificial.

## 1) Paleta principal

| Nombre | Hex | Uso recomendado |
|---|---|---|
| Lemon | `#DFFF3F` | Color principal, botones, acentos, elementos interactivos, resaltes |
| Electric Lime | `#F0FF70` | Acento brillante para hover, glow, detalles y enfoque visual |
| Lime Green | `#A8D900` | Variante secundaria para profundidad, indicadores y líneas |
| Lime Dark | `#6E8F00` | Tono oscuro para profundidad y contrastes elegantes |
| Berry Purple | `#6D16C7` | Color de conexión con la marca madre BerryGood, usado en degradados y contrastes |
| Deep Berry | `#3B0870` | Fondo oscuro complementario para realzar el verde limón |
| Background principal | `#111318` | Base oscura general |
| Background secundario | `#191C23` | Superficies y bloques secundarios |
| Cards | `#222631` | Tarjetas, paneles y contenedores |
| Texto principal | `#F5F5F7` | Títulos y textos principales |
| Texto secundario | `#A7ABB5` | Descripciones, textos menos relevantes |

## 2) Variables CSS sugeridas

```css
:root {
  --lemon: #DFFF3F;
  --electric-lime: #F0FF70;
  --lime-green: #A8D900;
  --lime-dark: #6E8F00;
  --berry: #6D16C7;
  --berry-dark: #3B0870;
  --bg-primary: #111318;
  --bg-secondary: #191C23;
  --surface: #222631;
  --text-primary: #F5F5F7;
  --text-secondary: #A7ABB5;
}
```

## 3) Guía de uso

### Color principal
- `#DFFF3F` (Lemon): es el color sintético de la marca.
- Se recomienda usarlo en:
  - CTA principal
  - indicadores de IA
  - botones de acción
  - líneas de enfoque
  - resaltes de procesos automatizados

### Color de energía
- `#F0FF70` (Electric Lime): aporta luminosidad y sensación futurista.
- Úsalo para:
  - hover
  - glows
  - elementos destacados
  - micro-interacciones

### Color de soporte
- `#A8D900` y `#6E8F00`: refuerzan la identidad tecnológica sin saturar.
- Se usan en:
  - estados activos
  - íconos
  - bordes
  - acentos de profundidad

### Fondo y texto
- Fondo principal oscuro: `#111318`
- Fondo secundario: `#191C23`
- Cards: `#222631`
- Texto principal: `#F5F5F7`
- Texto secundario: `#A7ABB5`

Esto permite que el verde limón destaque sin perder seriedad ni legibilidad.

## 4) Ejemplo de composición visual

```css
body {
  background: #111318;
  color: #F5F5F7;
}

.primary-btn {
  background: #DFFF3F;
  color: #111318;
}

.accent-panel {
  background: linear-gradient(135deg, #DFFF3F, #6D16C7);
  color: #F5F5F7;
}
```

## 5) Recomendación de diseño

Lemon.ia debe sentirse:
- futurista
- tecnológica
- brillante
- inteligente
- automatizada

La mejor combinación es usar el verde limón sobre fondos oscuros, reforzados con morado corporativo en degradados y puntos de conexión con BerryGood.

> Esta paleta debe mantenerse coherente con el ecosistema general del proyecto para que Lemon.ia se sienta parte del mismo sistema visual, pero con identidad propia.
