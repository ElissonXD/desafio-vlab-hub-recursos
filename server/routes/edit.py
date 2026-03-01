from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.controllers import editController

router = APIRouter()

# Pydantic models


class CardSchema(BaseModel):
    id: int
    title: str
    description: str
    type: str
    url: str
    tags: str


@router.get("/edit/{id}")
def get_card_by_id(id: int):
    card = editController.get_card_by_id(id)
    if not card:
        return JSONResponse(status_code=200, content={"card": []})
    formated_card = CardSchema(**card)
    return JSONResponse(status_code=200, content={"card": formated_card.model_dump()})


@router.put("/edit/{id}")
def update_card(card: CardSchema):
    editController.update_card(card)
    return JSONResponse(status_code=200, content={"success": True})


@router.delete("/edit/{id}")
def delete_card(id: int):
    editController.delete_card(id)
    return JSONResponse(status_code=200, content={"success": True})
