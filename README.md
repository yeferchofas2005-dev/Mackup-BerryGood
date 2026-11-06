# BerryGood Mockup

## Acerca de BerryGood

BerryGood es una empresa fundada por tres ingenieros interesados en la ingeniería, el desarrollo de software, las tecnologías recientes y la inteligencia artificial. La empresa reúne esos conocimientos para ofrecer servicios a otras organizaciones.

Este repositorio contiene el **mockup frontend de BerryGood**. Su propósito es definir y probar la estructura, navegación y diseño visual de las páginas antes de avanzar con su implementación completa. Por ahora es un prototipo estático hecho con HTML, CSS y JavaScript; no incluye backend, bases de datos ni integraciones reales.

## Áreas de servicio

- **BananoMarketing:** marketing para empresas, gestión de redes sociales, estrategias para aumentar seguidores y herramientas de ingeniería aplicadas al marketing, como bots para encontrar posibles clientes y facilitar un primer contacto comercial.
- **OrangeDev:** desarrollo de software desde cero y soluciones a la medida, además de software existente ofrecido bajo un modelo de suscripción mensual.
- **Lemon.IA:** automatización de procesos mediante inteligencia artificial, agentes y asistentes de IA.

## Estructura del proyecto

```text
Mackup/
|-- index.html                         # Portada de BerryGood con el loader inicial
|-- README.md
|-- css/
|   |-- style.css                      # Estilos del loader raíz
|   |-- berryGoodcss/
|   |   `-- styleBerryGood.css
|   |-- bananoMarketingcss/
|   |   `-- styleBananoMarketing.css
|   |-- lemon.iacss/
|   `-- orangeDevcss/
|-- html/
|   |-- berryGoodhtml/
|   |   `-- indexBerryGood.html        # Redirige a la portada (index.html)
|   |-- bananoMarketinghtml/
|   |   `-- indexBananoMarketing.html
|   |-- lemon.iahtml/
|   |   `-- indexLemon.ia.html
|   `-- orangeDevhtml/
|       `-- indexOrangeDev.html
`-- js/
	|-- main.js                        # Temporizador y navegación del loader
	|-- berryGoodjs/
	|-- bananoMarketingjs/
	|-- lemon.iajs/
	`-- orangeDevjs/
```

Las carpetas de cada área agrupan los archivos de esa sección por tecnología: HTML en `html/`, CSS en `css/` y JavaScript en `js/`. Así se pueden diseñar y probar las áreas por separado sin mezclar sus estilos o comportamiento.

## Convención para nombrar archivos

Usar el nombre del área al final del nombre del archivo, respetando mayúsculas, puntos y escritura tal como aparecen aquí:

| Área | HTML | CSS | JavaScript |
| --- | --- | --- | --- |
| BerryGood | `indexBerryGood.html` | `styleBerryGood.css` | `mainBerryGood.js` |
| BananoMarketing | `indexBananoMarketing.html` | `styleBananoMarketing.css` | `mainBananoMarketing.js` |
| Lemon.IA | `indexLemon.ia.html` | `styleLemon.ia.css` | `mainLemon.ia.js` |
| OrangeDev | `indexOrangeDev.html` | `styleOrangeDev.css` | `mainOrangeDev.js` |

Guardar cada archivo en la carpeta correspondiente. Por ejemplo, el CSS de OrangeDev va en `css/orangeDevcss/styleOrangeDev.css`, y el HTML de Lemon.IA va en `html/lemon.iahtml/indexLemon.ia.html`.

Los archivos de la raíz son una excepción intencional: `index.html` es la portada de BerryGood, y `css/style.css` y `js/main.js` pertenecen al loader común. Mantienen esos nombres porque no son archivos de una subsección.

## Navegación y rutas

El flujo inicial es:

1. Abrir `index.html` en la raíz.
2. El loader muestra el progreso durante 3 segundos, solo la primera vez en cada sesión del navegador.
3. Al terminar, el loader desaparece y queda visible la portada en la misma dirección.
4. La portada de BerryGood enlaza con el index de cada área.

Como las páginas están en carpetas diferentes, sus enlaces y referencias a CSS/JS deben ser relativos a la ubicación del HTML. Después de mover o renombrar un archivo, revisar todos los enlaces que lo referencian. Mantener también el uso de mayúsculas y minúsculas exacto en cada ruta.

## Pautas de colaboración

- Antes de editar, actualizar la rama de trabajo y revisar los cambios existentes para evitar sobrescribir el trabajo de otra persona.
- Coordinar quién trabaja en cada área. Cada integrante puede enfocarse en una subsección y sus carpetas, mientras los cambios de navegación global se coordinan con el equipo.
- Mantener cada página, estilos y scripts dentro de las carpetas de su área. No agregar estilos particulares de una subsección a `css/style.css`, que está reservado para el loader raíz.
- Si se crea una página, hoja de estilos o script, seguir la tabla de nombres y enlazarlo desde el HTML de esa misma área.
- Mantener HTML semántico, diseños adaptables a móvil y escritorio, y navegación que funcione con teclado.
- Usar rutas relativas y probar los enlaces después de mover archivos o carpetas.
- No agregar dependencias, servicios externos o backend al mockup sin acordarlo con el equipo. Si se incorporan, explicar cómo se ejecutan en este README.
- Antes de compartir cambios, abrir las páginas modificadas en el navegador y comprobar estilos, enlaces y consola del navegador.

## Logo oficial

El logo oficial de BerryGood es la berry hexagonal frambuesa con dos hojas verdes. Úsalo en todos los diseños nuevos.

| Uso | Archivo |
| --- | --- |
| Logo en páginas (menú, pie, tarjetas) | `html/berryGoodhtml/logo-oficial-berryGood.png` (192 × 192, fondo transparente) |
| Favicon | `favicon.ico` (16 y 32 px) y `favicon.png` (192 px) |
| Ícono en iPhone/iPad | `apple-touch-icon.png` (180 px) |

No redibujes el logo ni le cambies los colores. Si necesitas otro tamaño, genéralo a partir de `favicon.png`.

## Diseño nuevo (propuesta)

En la portada, el botón ✦ junto al sol/luna alterna entre el diseño actual y un diseño nuevo. La elección se recuerda, y el enlace `index.html?diseno=nuevo` abre la página directamente en la propuesta. El diseño actual no cambia.

- `js/design.js`: aplica `data-design` en `<html>` y carga las animaciones solo cuando el diseño nuevo está activo.
- `css/designToggle.css`: estilos del botón ✦.
- `css/berryGoodcss/styleBerryGoodNuevo.css`: estilos del diseño nuevo. Todas sus clases empiezan con `nd-`.
- `js/berryGoodjs/mainBerryGoodNuevo.js`: scroll horizontal de servicios (GSAP desde cdnjs, solo en el diseño nuevo), confeti y apariciones.

## Modo día y noche

La primera visita sigue el modo del dispositivo. El botón del encabezado lo cambia y la elección se recuerda en todas las páginas. `js/theme.js` aplica `data-theme` en `<html>`, y `css/theme.css` contiene solo los estilos del botón.

Los colores del modo día de cada área van al final de su propia hoja de estilos, en la sección `Modo día`, con el selector `:root[data-theme="light"]`. Al agregar un color fijo o una imagen con letras blancas, revisar la página en ambos modos.

## Estado actual

La portada de BerryGood, la página de BananoMarketing y la página de OrangeDev están implementadas. BananoMarketing presenta servicios de marketing, automatización e inteligencia artificial; OrangeDev presenta sus servicios de desarrollo web, software personalizado y escalabilidad, además de sus beneficios y metodología ágil. La página de Lemon.IA todavía requiere su diseño.

## Cómo probar el mockup

No se requiere instalación de paquetes. Para revisar el flujo completo, abrir el `index.html` de la raíz. También se pueden abrir directamente `html/bananoMarketinghtml/indexBananoMarketing.html` y `html/orangeDevhtml/indexOrangeDev.html` para revisar sus páginas.
