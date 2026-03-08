# Coffee Shop - Sistema de Pedidos Express (Backend)

Este es el servidor de la aplicación Coffee Shop, diseñado para ofrecer una experiencia de usuario fluida y sin fricciones. A diferencia de los sistemas tradicionales, esta API implementa un **"Registro Silencioso"**, permitiendo a los clientes realizar pedidos simplemente proporcionando su nombre y correo electrónico, sin necesidad de procesos de registro complejos o contraseñas visibles.

## Funcionalidades Actuales (Etapa 1)

- **Registro e Identificación Automática:** El sistema identifica si el usuario ya existe por su correo electrónico o crea uno nuevo de forma transparente al procesar la orden.
- **Gestión de Pedidos:** Almacena los detalles de la bebida, selecciones personalizadas (leche, azúcar, tamaño) y el precio total.
- **Seguridad y Auditoría:** - Implementación de **Winston** para el registro de solicitudes (`request.log`) y errores (`error.log`).
  - Manejo centralizado de errores para respuestas consistentes.
  - Validación de datos con **Celebrate/Joi** para asegurar la integridad de la información.

## Próximas Mejoras y Evolución (Etapa 2)

El proyecto está diseñado para escalar. Las siguientes funcionalidades convertirán la aplicación en una plataforma completa de fidelización:

- **Historial de Pedidos:** Implementación de una vista de usuario protegida para consultar compras anteriores.
- **Programa de Beneficios (Loyalty Program):**
  - Sistema de acumulación de puntos por cada café comprado.
  - Promociones automáticas (ej. "Bebida de cortesía por cada 5 pedidos").
- **Autenticación Segura:** Evolución hacia el uso de **JWT (JSON Web Tokens)** para permitir que los usuarios reclamen sus beneficios de forma segura en cualquier dispositivo.
- **Pasarela de Pagos:** Integración con servicios como Stripe para procesar pagos en línea al momento de confirmar la orden.

## Tecnologías utilizadas

- **Node.js & Express:** Framework del servidor.
- **MongoDB & Mongoose:** Base de datos NoSQL y modelado de datos.
- **Winston:** Gestión de logs.
- **Celebrate/Joi:** Validación de esquemas.

## Documentación de la API

### Crear una Orden / Registro Automático

- **URL:** `/orders`
- **Método:** `POST`
- **Cuerpo de la petición (JSON):**

```json
{
  "name": "Nombre del cliente",
  "email": "correo@ejemplo.com",
  "drinkName": "Latte",
  "totalPrice": 55,
  "selections": {
    "size": "Grande",
    "milk": "Almendra",
    "sweetness": "Stevia"
  }
}
```
