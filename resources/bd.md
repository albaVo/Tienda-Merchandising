# BASE DE DATOS

![tablas bd](./Tablas.png "bd" ) 


# TABLAS Y RELACIONES

## <span style="color:dodgerblue">**Usuarios**</span>
La tabla ***Usuarios*** contiene toda la información relacionada con el usuario para poder registrarse y logearse 

También aparece toda la información de dicho cliente al que pertenece el usuario. 

> Relación OneToOne entre las tablas Usuarios y Clientes

    > Un usuario sólo pertenece a un cliente y viceversa

---
## <span style="color:dodgerblue">**Clientes**</span>
La tabla ***Clientes*** contiene toda la información relacionada con los clientes.

> Relación OneToOne con la tabla Usuarios

> Relación OneToMany con la tabla Pedidos

---
## <span style="color:dodgerblue">**Pedidos**</span>
La tabla ***Pedidos*** contiene la información sobre cada pedido y sus detalles, además de la información del cliente que ha realizado dicho pedido.

> Relación ManyToOne con la tabla Clientes

    > Un cliente puede realizar muchos pedidos pero un pedido sólo puede ser realizado por un cliente

> Relación OneToOne con la tabla Detalles Pedidos

    > Un detalle sólo puede pertenecer a un pedido y viceversa

---
## <span style="color:dodgerblue">**Detalles Pedidos**</span>
La tabla ***Detalles Pedidos*** contiene todos los detalles de cada pedido.

> Relación OneToOne con la tabla Pedidos

> Relación ManyToMany con la tabla Detalles_Pedidos_Productos

---
## <span style="color:dodgerblue">**Detalles_Pedidos_Productos**</span>
La tabla ***Detalles_Pedidos_Productos*** contiene el codigo del detalle pedido y el codigo de cada producto que contine.

> Relación ManyToMany con la tabla Detalles Pedidos

> Relación ManyToMany con la tabla Productos

    > Un detalle pedido puede contener muchos productos y un producto puede aparecer en diferentes detalles pedidos

---
## <span style="color:dodgerblue">**Productos**</span>
La tabla ***Productos*** contiene toda la información de cada producto y la categoría a la que pertenece.

> Relación ManyToMany con la tabla Detalles_Pedidos_Productos

> Relación ManyToOne con la tabla Categorias

    > Una categoría puede contener muchos productos pero un producto sólo puede pertenecer a una categoría

---
## <span style="color:dodgerblue">**Categorias**</span>
La tabla ***Categorias*** contiene toda la información de cada categoría y el proveedor que nos la proporciona. 

> Relación OneToMany con la tabla Productos

> Relación OneToOne con la tabla Proveedores

    > Un proveedor sólo proporciona una categoría y viceversa


---
## <span style="color:dodgerblue">**Proveedores**</span>
La tabla ***Proveedores*** contiene toda la información de cada proveedor.

> Relación OneToOne con la tabla Categorias