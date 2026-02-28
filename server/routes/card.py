from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.controllers import cardController

router = APIRouter()

# Pydantic models


class CardSchema(BaseModel):
    title: str
    description: str
    type: str
    url: str
    tags: str


@router.get("/card")
def get_cards():

    data = cardController.get_cards()
    return JSONResponse(status_code=200, content=data)


@router.post("/card")
def create_card(card: CardSchema):
    cardController.create_card(card)
    return JSONResponse(status_code=200, content={"success": True})


@router.put("/card")
def update_card(id: int, card: CardSchema):
    cardController.update_card(id, card)
    return JSONResponse(status_code=200, content={"success": True})


@router.delete("/card")
def delete_card(id: int):
    cardController.delete_card(id)
    return JSONResponse(status_code=200, content={"success": True})
