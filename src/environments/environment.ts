/**
 * environment.ts - CREDENCIALES DE FIREBASE (Conexión a la Nube de Google) 🔐
 *
 * Este archivo contiene los datos que identifican tu proyecto de Firebase.
 * Sin estos datos, la app no sabría dónde buscar los productos ni dónde validar el login.
 *
 * ⚠️ NOTA SOBRE SEGURIDAD:
 * Estas llaves SON públicas por diseño en aplicaciones web de Firebase.
 * La seguridad real la dan las "Reglas de Seguridad" configuradas en la consola de Firebase,
 * NO el hecho de esconder estas llaves. (Google te las detectó en GitHub y envió un aviso,
 * pero es normal. Lo que hicimos fue restringir la llave a nuestros dominios autorizados.)
 *
 * Cada campo significa:
 * - apiKey:           Llave única que identifica tu proyecto
 * - authDomain:       Dominio que Firebase usa para el sistema de login
 * - projectId:        Nombre interno del proyecto en Google Cloud
 * - storageBucket:    Dirección del almacenamiento de archivos (no lo usamos por ahora)
 * - messagingSenderId: ID para notificaciones push (no lo usamos)
 * - appId:            Identificador interno de la aplicación web
 */
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCDDi54jOOTicbxn6P5EK6w8jWB0LrMCiU",
    authDomain: "la-barra-oculta.firebaseapp.com",
    projectId: "la-barra-oculta",
    storageBucket: "la-barra-oculta.firebasestorage.app",
    messagingSenderId: "1010100555551",
    appId: "1:1010100555551:web:413f73c52852f3b261ea2a"
  }
};
