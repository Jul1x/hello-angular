# La Barra Oculta - Proyecto Angular & Firebase

Bienvenido al repositorio de **La Barra Oculta**, una aplicación web construida con Angular (versión 20+) y respaldada por Firebase para base de datos en tiempo real, autenticación y hosting.

---

## 🛠️ Tecnologías Principales

*   **Frontend:** Angular (Standalone Components)
*   **Base de Datos & Backend:** Firebase Firestore (Base de datos NoSQL en la nube)
*   **Autenticación:** Firebase Authentication (Email y Contraseña)
*   **Alojamiento Web:** Firebase Hosting
*   **Estilos:** CSS puro (Mobile-Responsive mediante Media Queries)

---

## 🚀 Comandos Esenciales (¡No olvidar!)

### 1. Desarrollo Local (Probar cambios en tu PC)

Si haces cambios en el código (colores, letras, nuevos componentes) y quieres ver cómo quedan, corre este comando en la terminal:

```bash
npm start
```
*O alternativamente:* `ng serve`

Esto levantará un servidor local. Abre tu navegador en `http://localhost:4200/`. **Cualquier cambio que guardes en el código se reflejará ahí automáticamente.**

### 2. Actualizar Datos (Productos, Precios, etc.)

**NO necesitas subir código para esto.** 
La aplicación lee directamente de Firestore. Si modificas, agregas o eliminas un producto desde tu **Panel de Administrador (`/admin/login`)**, los cambios se verán reflejados *al instante* tanto en tu `localhost` como en la página pública en Internet.

### 3. Subir Cambios de Diseño a Internet (Despliegue)

Si el diseño o las funciones nuevas que probaste en tu `localhost` te gustaron y quieres que el mundo entero las vea en `la-barra-oculta.web.app`, debes **construir y desplegar** el proyecto. 

Abre una terminal y ejecuta estos dos comandos en orden:

```bash
# 1. Empaqueta tu código y lo optimiza
ng build

# 2. Sube el paquete optimizado a los servidores de Google
npx firebase-tools deploy
```
*(Espera a que diga "Deploy complete!". Puede tardar un par de minutos en refrescarse en los navegadores de tus clientes debido a la memoria caché).*

---

## 🔐 Acceso al Panel de Administrador

*   **Ruta local:** `http://localhost:4200/admin/login`
*   **Ruta pública:** `https://la-barra-oculta.web.app/admin/login` (O en el botón oculto "Admin" en el pie de página).
*   **Seguridad:** Las rutas de administrador están protegidas por un `AuthGuard`. Solo usuarios creados manualmente desde la consola de Firebase Authentication pueden acceder.

---

## 💻 Notas para el Desarrollo Futuro

*   **Firebase Config:** Las llaves de conexión a Firebase viven en `src/environments/environment.ts`.
*   **Responsive Design:** La aplicación usa *Media Queries* en CSS (`@media (max-width: 768px)`) para asegurar que el contenido, como el carrito de compras y los paneles de control, se apilen correctamente en pantallas de teléfonos móviles.
