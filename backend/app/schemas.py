from datetime import date, time

from pydantic import BaseModel, ConfigDict, Field


# Datos necesarios para crear un aula.
class RoomCreate(BaseModel):
    nombre: str
    edificio: str
    capacidad: int = Field(gt=0)
    equipamiento: list[str] = Field(default_factory=list)


# Datos que devuelve la API para un aula.
class RoomResponse(RoomCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


# Datos necesarios para crear una reserva.
class BookingCreate(BaseModel):
    aula_id: int = Field(gt=0)
    usuario: str = Field(min_length=1)
    fecha: date
    hora_inicio: time
    hora_fin: time


# Datos que devuelve la API para una reserva.
class BookingResponse(BookingCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)