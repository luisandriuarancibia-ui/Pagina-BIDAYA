// Carrito de compras
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    
    // Notificación
    Swal.fire({
        title: "¡Agregado!",
        text: `${nombre} se agregó al carrito`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#3B2A1A",
        color: "#F8F5E6"
    });
}

function actualizarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalPrecio = document.getElementById('total-precio');
    
    // Calcular total de items
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        totalPrecio.textContent = 'Bs. 0';
        return;
    }
    
    // Renderizar items del carrito
    itemsCarrito.innerHTML = carrito.map((item, index) => `
        <div class="item-carrito">
            <div class="item-carrito-header">
                <h4>${item.nombre}</h4>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
            </div>
            <div class="item-carrito-cantidad">
                <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                <span class="cantidad-numero">${item.cantidad}</span>
                <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
            <div class="item-precio">Bs. ${item.precio * item.cantidad}</div>
        </div>
    `).join('');
    
    // Calcular precio total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalPrecio.textContent = `Bs. ${total}`;
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8B2E1A",
        cancelButtonColor: "#555",
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar",
        background: "#3B2A1A",
        color: "#F8F5E6"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            Swal.fire({
                title: "Carrito vaciado",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                background: "#3B2A1A",
                color: "#F8F5E6"
            });
        }
    });
}

function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    const overlay = document.getElementById('overlay');
    
    panel.classList.toggle('activo');
    overlay.classList.toggle('activo');
}

function finalizarPedido() {
    if (carrito.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "Agrega productos antes de finalizar",
            icon: "warning",
            confirmButtonColor: "#8B2E1A",
            background: "#3B2A1A",
            color: "#F8F5E6"
        });
        return;
    }
    
    // Crear mensaje para WhatsApp
    let mensaje = "🍖 *PEDIDO BIDAYA STEAK HOUSE* 🍖\n\n";
    
    carrito.forEach(item => {
        mensaje += `• ${item.nombre}\n`;
        mensaje += `  Cantidad: ${item.cantidad}\n`;
        mensaje += `  Subtotal: Bs. ${item.precio * item.cantidad}\n\n`;
    });
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mensaje += `💰 *TOTAL: Bs. ${total}*\n\n`;
    mensaje += "¿Está disponible para entregar?";
    
    const telefono = "59169630059";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, "_blank");
    
    Swal.fire({
        title: "¡Perfecto!",
        text: "Te redirigimos a WhatsApp para confirmar tu pedido",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#3B2A1A",
        color: "#F8F5E6"
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});function eliminarDelCarrito(index) {
    const producto = carrito[index];
    
    Swal.fire({
        title: "¿Eliminar producto?",
        html: `<strong>${producto.nombre}</strong><br>Cantidad: ${producto.cantidad}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8B2E1A",
        cancelButtonColor: "#555",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        background: "#3B2A1A",
        color: "#F8F5E6"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.splice(index, 1);
            actualizarCarrito();
            
            Swal.fire({
                title: "¡Eliminado!",
                text: `${producto.nombre} se eliminó del carrito`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                background: "#3B2A1A",
                color: "#F8F5E6"
            });
        }
    });
}