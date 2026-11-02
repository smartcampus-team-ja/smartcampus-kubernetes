from datetime import date, time

from sqlalchemy import JSON, Date, ForeignKey, Integer, String, Time
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


# Modelo de aula.
class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    nombre: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    edificio: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    capacidad: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    equipamiento: Mapped[list[str]] = mapped_column(
        JSON,
        default=list,
    )


# Modelo de reserva.
class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Aula reservada. La tabla rooms debe existir.
    aula_id: Mapped[int] = mapped_column(
        ForeignKey("rooms.id"),
        nullable=False,
        index=True,
    )

    usuario: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    fecha: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    hora_inicio: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    hora_fin: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )