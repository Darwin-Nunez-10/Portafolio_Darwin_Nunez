# Portafolio Personal - Darwin Nuñez Chavarría

Portfolio web moderno e interactivo construido con React, Vite y tecnologías de vanguardia.

**[Ver online](https://portafolio-darwin-nunez.netlify.app/)**

---

## Tecnologías

### Core
- **React 19** - Librería principal de UI
- **Vite 8** - Herramienta de build y desarrollo (HMR)
- **Tailwind CSS 4** - Framework CSS via `@tailwindcss/vite`

### 3D y Efectos Visuales
- **Three.js 0.183** - Sistema de partículas 3D interactivas (2000 partículas con interacción de mouse)
- **GSAP** - Animaciones avanzadas de carruseles en profundidad

### Animaciones
- **Framer Motion 12** - Animaciones fluidas y transiciones
- **react-magic-ui** - Componentes UI con efectos mágicos

### Texto y Renderizado
- **@chenglou/pretext** - Motor de renderizado ultra-rápido basado en Canvas (evita reflows del DOM, segmentación inteligente de texto)

### Iconos y UI
- **Lucide React** - Iconos modernos
- **Phosphor Icons** - Iconos adicionales
- **ESLint** - Linting con flat config

---

## Estructura del Proyecto

```
portafolio/
├── public/
│   ├── cv/                     # Currículums (español e inglés)
│   ├── fonts/                  # Tipografías
│   └── img/                    # Imágenes (photo.webp)
├── src/
│   ├── assets/                 # Logos e imágenes
│   ├── components/
│   │   ├── atoms/             # Componentes base
│   │   │   ├── Background3D.jsx     # Fondo con partículas 3D (Three.js)
│   │   │   ├── BlobButton.jsx       # Botones con morfismo fluido
│   │   │   ├── DepthCarousel.jsx    # Carrusel con profundidad 3D
│   │   │   ├── GlassCard.jsx        # Tarjetas glassmorphism
│   │   │   ├── GooeyButton.jsx      # Botones con efecto gooey
│   │   │   ├── Icons.jsx            # Iconos SVG personalizados
│   │   │   ├── LanguageSwitcher.jsx # Cambio de idioma
│   │   │   ├── MagneticButton.jsx   # Botones con efecto magnético
│   │   │   ├── ScrollReveal.jsx     # Animaciones al hacer scroll
│   │   │   ├── SkillCard.jsx        # Card de habilidad
│   │   │   └── TypeAsync.jsx        # Efecto typewriter asíncrono
│   │   ├── molecules/
│   │   │   ├── DraggableMarquee.jsx # Carrusel de skills arrastrable
│   │   │   ├── GlassDock.jsx        # Dock de redes sociales
│   │   │   ├── GlassToast.jsx       # Notificaciones
│   │   │   ├── ProjectCard.jsx      # Card de proyecto
│   │   │   └── SectionHeader.jsx    # Header con animaciones
│   │   └── organisms/
│   │       ├── AboutSection.jsx     # Sección "Sobre mí"
│   │       ├── BackgroundOrganism.jsx # Fondo 3D
│   │       ├── ContactSection.jsx   # Sección de contacto
│   │       ├── Footer.jsx           # Footer
│   │       ├── HeroSection.jsx      # Hero principal
│   │       ├── LiquidNav.jsx        # Navegación líquida con indicadores
│   │       ├── ProjectsSection.jsx  # Galería de proyectos
│   │       └── SkillsSection.jsx    # Sección de habilidades
│   ├── data/                   # Datos del portfolio
│   │   ├── navigation.js       # Rutas de navegación
│   │   ├── projects.js         # Información de proyectos
│   │   ├── skills.jsx          # Habilidades (backend, frontend, devops)
│   │   ├── social.js           # Redes sociales
│   │   └── translations/       # Traducciones (español e inglés)
│   ├── hooks/                  # Hooks personalizados
│   │   ├── useIntersectionObserver.js  # Lazy loading optimizado
│   │   ├── usePerformanceMonitor.js    # Monitor de FPS
│   │   ├── useReducedMotion.js         # Preferencias de movimiento reducido
│   │   ├── useThrottle.js            # Control de frecuencia de eventos
│   │   └── useTranslation.js         # Gestión de idioma
│   ├── utils/
│   │   ├── breakpoints.js      # Breakpoints responsivos
│   │   ├── performance.js      # Utilidades de rendimiento
│   │   └── typography.js       # Clases de tipografía compartidas
│   ├── App.jsx                 # Componente principal
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── eslint.config.mjs
├── index.html
├── package.json
├── tailwind.config.mjs
└── vite.config.mjs
```

---

## Comandos Disponibles

```bash
npm run dev      # Servidor desarrollo (http://localhost:5173)
npm run build    # Build de producción
npm run preview  # Previsualizar build
npm run lint     # Verificar código con ESLint
```

---

## Como Clonar y Ejecutar

```bash
# Clonar repositorio
git clone https://github.com/Darwin-Nunez-10/Portafolio_Darwin_Nunez.git
cd Portafolio_Darwin_Nunez

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

---

## Como Verlo en Móvil

### Opción 1: Ver online
**[https://portafolio-darwin-nunez.netlify.app/](https://portafolio-darwin-nunez.netlify.app/)**

### Opción 2: Ver en tu dispositivo local
1. Ejecuta `npm run dev` en tu computadora
2. Anota tu IP local (ej: `192.168.1.x`)
3. En tu móvil, conecta a la misma red WiFi
4. Abre `http://tu-ip:5173` en el navegador del móvil

### Opción 3: Usando ngrok (para testing externo)
```bash
npm run dev
# En otra terminal:
npx ngrok http 5173
# Abre la URL que ngrok te da en tu móvil
```

---

## Secciones del Portfolio

1. **Hero** - Introducción con efecto typewriter y fondo 3D interactivo
2. **Sobre Mí** - Información personal con animaciones scroll-reveal
3. **Habilidades** - Tecnologías divididas en backend, frontend y devops
4. **Proyectos** - Portfolio de trabajos con glassmorfismo
5. **Contacto** - Formulario y enlaces a redes sociales

---

## Detalle de Características Técnicas

### Three.js - Sistema de Partículas 3D
- 2000 partículas con interacción de mouse
- Efecto de niebla atmosférica (fog exp2)
- Optimización de memoria con cleanup adecuado
- Frame limiting a 60 FPS

### Carrusel en Profundidad (DepthCarousel)
- Carrusel con perspectiva 3D y tarjetas apiladas
- Interacción por arrastre, scroll y teclado
- Autoplay configurable y lightbox

### Liquid Navigation
- Navegación con efecto líquido
- Indicadores dinámicos animados
- Transiciones fluidas entre secciones

### Glass Cards
- Tarjetas con efecto glassmorfismo
- Transformaciones 3D (tilt) al interactuar
- Sombras y profundidad

### Scroll Reveal
- Animaciones de aparición al hacer scroll
- Uso de Intersection Observer para detección eficiente

### Bilingüe (ES/EN)
- Cambio de idioma entre español e inglés
- Descarga del CV según el idioma activo

---

## Uso y Créditos

Este proyecto fue creado por **Darwin Nuñez Chavarría**, basado en el portfolio de **Fabian Sanchez Salinas** (https://github.com/Fabian131).

Cualquier persona puede usar, modificar y adaptar este código para sus propios propósitos, dando el crédito apropiado al autor original.

---

Desarrollado por **Darwin Nuñez Chavarría**