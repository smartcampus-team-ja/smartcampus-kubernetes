const loadRoomsButton = document.getElementById("load-rooms");
const roomsContainer = document.getElementById("rooms");
const roomsStatus = document.getElementById("rooms-status");

const loadBookingsButton = document.getElementById("load-bookings");
const bookingsContainer = document.getElementById("bookings");
const bookingsStatus = document.getElementById("bookings-status");


async function loadRooms() {
    roomsStatus.textContent = "Cargando aulas...";
    roomsContainer.innerHTML = "";

    try {
        const response = await fetch("/api/rooms");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const rooms = await response.json();

        if (rooms.length === 0) {
            roomsStatus.textContent = "No hay aulas registradas.";
            return;
        }

        roomsStatus.textContent = `${rooms.length} aula(s) encontrada(s).`;

        rooms.forEach((room) => {
            const element = document.createElement("article");
            element.className = "card";

            const equipment = room.equipamiento.length > 0
                ? room.equipamiento.join(", ")
                : "Sin equipamiento";

            element.innerHTML = `
                <h3>${room.nombre}</h3>
                <p><strong>Edificio:</strong> ${room.edificio}</p>
                <p><strong>Capacidad:</strong> ${room.capacidad}</p>
                <p><strong>Equipamiento:</strong> ${equipment}</p>
            `;

            roomsContainer.appendChild(element);
        });
    } catch (error) {
        roomsStatus.textContent = "No se ha podido conectar con el backend.";
        console.error(error);
    }
}


async function loadBookings() {
    bookingsStatus.textContent = "Cargando reservas...";
    bookingsContainer.innerHTML = "";

    try {
        const response = await fetch("/api/bookings");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const bookings = await response.json();

        if (bookings.length === 0) {
            bookingsStatus.textContent = "No hay reservas registradas.";
            return;
        }

        bookingsStatus.textContent = `${bookings.length} reserva(s) encontrada(s).`;

        bookings.forEach((booking) => {
            const element = document.createElement("article");
            element.className = "card";

            element.innerHTML = `
                <h3>Reserva #${booking.id}</h3>
                <p><strong>Aula:</strong> ${booking.aula_id}</p>
                <p><strong>Usuario:</strong> ${booking.usuario}</p>
                <p><strong>Fecha:</strong> ${booking.fecha}</p>
                <p><strong>Horario:</strong> ${booking.hora_inicio} - ${booking.hora_fin}</p>
            `;

            bookingsContainer.appendChild(element);
        });
    } catch (error) {
        bookingsStatus.textContent = "No se han podido cargar las reservas.";
        console.error(error);
    }
}


loadRoomsButton.addEventListener("click", loadRooms);
loadBookingsButton.addEventListener("click", loadBookings);