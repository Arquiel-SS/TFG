<!-- DOCUMENTACIÓN DE ESTILOS CSS - PROYECTO TFG -->

=============================================================================
SISTEMA DE DISEÑO CSS - PROYECTO CATÁLOGO DE VIDEOJUEGOS (TFG)
=============================================================================

📋 ESTRUCTURA DE ARCHIVOS CSS
─────────────────────────────────────────────────────────────────────────

1. **css/dashboard.css** (Principal)
   - Estilos de dashboard.html
   - Navbar con filtros
   - Catálogo de juegos (carrusel)
   - Información del juego
   - Sistema de tabs (Información/Foro)
   - Interfaz del foro integrado
   - Estilos responsivos completos

2. **css/auth.css** (Autenticación)
   - Estilos de login.html
   - Estilos de register.html
   - Diseño centrado minimalista
   - Animaciones suaves
   - Mensajes de error/éxito
   - Optimizado para móvil

3. **css/foro.css** (Foro Independiente)
   - Estilos de foro.html
   - Estilos de hilo.html
   - Tarjetas de hilos
   - Visualización de mensajes
   - Formulario de respuestas
   - Diseño responsivo completo

─────────────────────────────────────────────────────────────────────────

🎨 PALETA DE COLORES (Acromática con Fríos)
─────────────────────────────────────────────────────────────────────────

FONDO:
  • --color-bg-primary:     #ffffff (Blanco puro)
  • --color-bg-secondary:   #f8f9fa (Gris muy claro)
  • --color-bg-tertiary:    #f0f2f5 (Gris claro)

TEXTO:
  • --color-text-primary:   #1a1a1a (Negro casi puro)
  • --color-text-secondary: #4a4a4a (Gris oscuro)
  • --color-text-tertiary:  #7a7a7a (Gris medio)
  • --color-text-light:     #a0a0a0 (Gris claro)

ACENTOS (Azules muy oscuros - Colores fríos):
  • --color-accent-dark:    #0d3b66 (Azul muy oscuro)
  • --color-accent-light:   #2c5aa0 (Azul oscuro)
  • --color-accent-hover:   #052d52 (Azul oscuro más intenso)

BORDES:
  • --color-border:         #e0e0e0 (Gris muy claro)
  • --color-border-dark:    #d0d0d0 (Gris claro)
  • --color-border-light:   #f0f0f0 (Gris casi blanco)

ESTADOS:
  • Error:   #c1121f (Rojo oscuro) con fondo #fee
  • Éxito:   #06a77d (Verde oscuro) con fondo #efe

SOMBRAS:
  • --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08)
  • --shadow-md:  0 2px 8px rgba(0, 0, 0, 0.12)
  • --shadow-lg:  0 4px 16px rgba(0, 0, 0, 0.15)
  • --shadow-xl:  0 8px 24px rgba(0, 0, 0, 0.18)

─────────────────────────────────────────────────────────────────────────

📏 ESPACIADO Y TIPOGRAFÍA
─────────────────────────────────────────────────────────────────────────

ESPACIADO:
  • --spacing-xs:   0.25rem (4px)
  • --spacing-sm:   0.5rem  (8px)
  • --spacing-md:   1rem    (16px)
  • --spacing-lg:   1.5rem  (24px)
  • --spacing-xl:   2rem    (32px)
  • --spacing-2xl:  3rem    (48px)

TIPOGRAFÍA:
  • Familia: System UI, Segoe UI, Helvetica, Arial (Moderna y limpia)
  • --font-size-sm:   0.875rem  (14px)
  • --font-size-base: 1rem      (16px)
  • --font-size-lg:   1.125rem  (18px)
  • --font-size-xl:   1.25rem   (20px)
  • --font-size-2xl:  1.5rem    (24px)
  • --font-size-3xl:  2rem      (32px)

BORDER RADIUS:
  • --radius-sm:  0.375rem (6px)
  • --radius-md:  0.5rem   (8px)
  • --radius-lg:  0.75rem  (12px)
  • --radius-xl:  1rem     (16px)

─────────────────────────────────────────────────────────────────────────

🎯 ELEMENTOS CLAVE ESTILIZADOS
─────────────────────────────────────────────────────────────────────────

NAVBAR:
  ✓ Fija en la parte superior
  ✓ Dropdown de perfil de usuario
  ✓ Selectores de filtro y búsqueda
  ✓ Sombra sutil
  ✓ Responsive

BOTONES:
  ✓ Primario: Azul oscuro (#2c5aa0)
  ✓ Secundario: Gris con borde
  ✓ Peligroso: Rojo oscuro
  ✓ Hover: Elevación y cambio de color
  ✓ Transiciones suaves 0.25s

INPUTS Y FORMS:
  ✓ Bordes suaves gris claro
  ✓ Focus: Borde azul + sombra sutil
  ✓ Placeholders grises claros
  ✓ 100% de ancho por defecto

CATÁLOGO:
  ✓ Grid responsivo
  ✓ Tarjetas con sombra y borde
  ✓ Hover: Elevación y zoom de imagen
  ✓ Aspect ratio 3:4 para portadas

FORO:
  ✓ Tarjetas de hilos con hover interactivo
  ✓ Mensajes con borde izquierdo azul
  ✓ Metadata en gris claro
  ✓ Transiciones suaves

─────────────────────────────────────────────────────────────────────────

📱 BREAKPOINTS RESPONSIVOS
─────────────────────────────────────────────────────────────────────────

DESKTOP:
  • Anchura máxima: 1400px
  • Navbar: Flex horizontal
  • Catálogo: Grid multi-columna

TABLET (máx 768px):
  • Navbar flexible en columnas
  • Inputs crecen a 100%
  • Grid catálogo se ajusta

MOBILE (máx 480px):
  • UI completamente apilada
  • Botones 100% ancho
  • Padding reducido
  • Font-size accesible (16px mínimo en inputs)

─────────────────────────────────────────────────────────────────────────

✨ CARACTERÍSTICAS DE DISEÑO
─────────────────────────────────────────────────────────────────────────

✓ Minimalista y elegante: Sin distracciones visuales innecesarias
✓ Acromático puro: Solo escala de grises + azules fríos
✓ Accesible: Colores con suficiente contraste
✓ Moderno: Bordes redondeados, sombras suaves, transiciones
✓ Consistente: Variables CSS en todo el proyecto
✓ Performante: Sin animaciones pesadas, Shadow DOM eficiente
✓ Responsive: Mobile-first design
✓ Transiciones suaves: 0.2s - 0.3s para interacciones

─────────────────────────────────────────────────────────────────────────

🔧 CÓMO USAR LAS VARIABLES CSS
─────────────────────────────────────────────────────────────────────────

Para agregar nuevo estilo, utiliza las variables definidas en :root

Ejemplo:
```css
.mi-elemento {
    background: var(--color-bg-primary);
    color: var(--color-text-secondary);
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    font-size: var(--font-size-base);
}

.mi-elemento:hover {
    background: var(--color-bg-secondary);
    box-shadow: var(--shadow-lg);
}
```

─────────────────────────────────────────────────────────────────────────

📝 ARCHIVOS HTML Y CSS ASOCIADOS
─────────────────────────────────────────────────────────────────────────

dashboard.html    →  css/dashboard.css
login.html        →  css/auth.css
register.html     →  css/auth.css
foro.html         →  css/foro.css
hilo.html         →  css/foro.css

─────────────────────────────────────────────────────────────────────────

✅ VALIDACIÓN Y TESTING
─────────────────────────────────────────────────────────────────────────

Para verificar que los estilos funcionan correctamente:

1. ✓ Navega a cada página HTML y verifica la apariencia
2. ✓ Prueba en navegador a diferentes tamaños (Desktop, Tablet, Mobile)
3. ✓ Verifica que los hover effects funcionen en botones e items
4. ✓ Comprueba que los inputs tengan buen foco visual
5. ✓ Valida que no haya parpadeos innecesarios
6. ✓ Revisa el contraste de colores (especialmente en textos claros)
7. ✓ Prueba la navegación en móvil con dedos (45px mínimo para touches)

─────────────────────────────────────────────────────────────────────────

🎓 NOTAS DE DISEÑO
─────────────────────────────────────────────────────────────────────────

• La paleta acromática transmite profesionalismo y modernidad
• Los azules oscuros (fríos) son menos agresivos que azules puros
• Las sombras suaves dan profundidad sin cargar visualmente
• El espaciado generoso hace la interfaz más respirada
• Las transiciones de 0.25s crean fluidez sin quedar lentas
• Los border-radius medios (8-12px) son modernos sin ser redondeados
• El sistema respeta el principio de jerarquía visual

─────────────────────────────────────────────────────────────────────────

💡 CONSEJOS PARA MANTENER LA CONSISTENCIA
─────────────────────────────────────────────────────────────────────────

1. SIEMPRE usa las variables CSS de :root
2. Mantén el mismo nivel de sombra para elementos similares
3. Usa --spacing-* para todos los márgenes y paddings
4. Respeta los border-radius: sm para pequeños, xl para grandes
5. Las transiciones deben ser 0.2s - 0.3s
6. No agregues colores personalizados, usa la paleta definida
7. Verifica responsivo con cada cambio
8. Prueba el contraste en https://webaim.org/resources/contrastchecker/

═════════════════════════════════════════════════════════════════════════
Última actualización: Marzo 2024
Versión: 1.0 - Sistema de diseño minimalista acromático
═════════════════════════════════════════════════════════════════════════
