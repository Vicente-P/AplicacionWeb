
## Architecture Decision Record

# Titulo 

Uso de APIs REST para integración de servicios

## Contexto 

Actualmente, nuestro sistema está compuesto por diversos servicios independientes que necesitan comunicarse entre sí. Se requiere una solución para establecer la comunicación entre estos servicios de manera eficiente y flexible. Por lo que después de analizar los requisitos y las consideraciones técnicas, se ha determinado que el uso de APIs REST es la mejor opción para nuestra arquitectura.

## Decision 

Se ha decidido utilizar APIs REST para la integración de servicios debido a las siguientes razones:

1. **Flexibilidad:** Las APIs REST permiten una comunicación flexible y desacoplada entre los servicios. Cada servicio puede exponer una API REST con endpoints específicos para las operaciones que ofrece, lo que brinda libertad para evolucionar e iterar en cada servicio de manera independiente.

2. **Escalabilidad y rendimiento:** Las APIs REST permiten un enfoque escalable para la integración de servicios, ya que se pueden implementar técnicas como la caché, la distribución de carga y la escalabilidad horizontal para mejorar el rendimiento y la capacidad de respuesta del sistema.

## Status 

Aceptada e implementada, revisado. 

## Concecuencias 

1. **Mayor tiempo de desarrollo inicial:** La implementación de las APIs REST y la integración entre los servicios requerirán un esfuerzo adicional en comparación con enfoques más acoplados. Sin embargo, a largo plazo, esta inversión inicial se compensará con una mayor flexibilidad y escalabilidad.

2. **Mantenibilidad:** Como los servicios evolucionarán de manera independiente, será necesario establecer una estrategia de gestión de versiones para garantizar la compatibilidad entre los diferentes servicios y evitar problemas de integración.
