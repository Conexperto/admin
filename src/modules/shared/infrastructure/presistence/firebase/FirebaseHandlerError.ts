import { FirebaseError } from "firebase/app";

export class FirebaseHandlerError extends FirebaseError {
  get description(): string {
    switch (this.code) {
      case "auth/requires-recent-login":
        return "Se require re-autentificacion";
      case "auth/email-change-needs-verification":
        return "Cambio necesitan verificacion";
      case "auth/email-already-in-use":
        return "Correo electronico en uso";
      case "auth/user-not-found":
        return "Usuario no encontrado";
      case "auth/user-disabled":
        return "Usuarios desactivado";
      case "auth/user-token-expired":
        return "Token ha expirado";
      case "auth/timeout":
        return "Tiempo de conexion agotado";
      case "auth/wrong-password":
        return "Contraseña invalida";
      case "auth/invalid-email":
        return "Correo electronico invalido";
      case "auth/invalid-phone-number":
        return "Numero de telefono invalido";
      case "auth/weak-password":
        return "Contraseña debil";
      default:
        return "Error interno";
    }
  }
}
