# Paleta de colores - BananoMarketing

Esta es la paleta base para BananoMarketing, una marca enfocada en marketing digital, crecimiento y conversión.

## 1) Paleta principal

| Nombre | Hex | Uso recomendado |
|---|---|---|
| Banana | `#F5C542` | Color principal, botones, íconos y llamadas a la acción |
| Yellow Light | `#FFD95A` | Acentos brillantes, hover y detalles de enfoque |
| Banana Dark | `#B8860B` | Profundidad y contraste para elementos secundarios |
| Green Accent | `#8DB600` | Detalle complementario, resaltes verdes de apoyo |
| Berry Purple | `#6D16C7` | Conexión con la marca madre BerryGood |
| Background principal | `#111318` | Fondo general oscuro |
| Background secundario | `#191C23` | Bloques y paneles secundarios |
| Cards | `#222631` | Tarjetas y contenedores |
| Texto principal | `#F5F5F7` | Títulos y texto principal |
| Texto secundario | `#A7ABB5` | Texto complementario |

## 2) Variables CSS sugeridas

```css
:root {
  --banana: #F5C542;
  --banana-light: #FFD95A;
  --banana-dark: #B8860B;
  --green-accent: #8DB600;
  --berry: #6D16C7;
  --bg-primary: #111318;
  --bg-secondary: #191C23;
  --surface: #222631;
  --text-primary: #F5F5F7;
  --text-secondary: #A7ABB5;
}
```

## 3) Guía de uso

### Color principal
- `#F5C542` transmite energía, crecimiento y movimiento comercial.
- Ideal para:
  - CTA principales
  - elementos promocionales
  - íconos y indicadores
  - mensajes de conversión

### Color de apoyo
- `#FFD95A` funciona como brillo y punto focal.
- Se recomienda para:
  - hover
  - glow visual
  - detalles decorativos

### Fondo y texto
- Fondo oscuro para reforzar la marca y darle una estética premium.
- El texto claro mantiene legibilidad y un aspecto moderno.

## 4) Ejemplo de composición visual

```css
body {
  background: #111318;
  color: #F5F5F7;
}

.primary-btn {
  background: #F5C542;
  color: #111318;
}

.highlight-card {
  background: linear-gradient(135deg, #F5C542, #6D16C7);
  color: #F5F5F7;
}
```

## 5) Recomendación general

BananoMarketing debe sentirse dinámico, comercial y energizante, manteniendo la sobriedad del ecosistema BerryGood. El amarillo es el elemento diferenciador, mientras que los fondos oscuros y el morado corporativo mantienen la identidad general del grupo.
