from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.controllers import cardController

router = APIRouter()

# Pydantic models


class CardSchema(BaseModel):
    id: int | None = None
    title: str
    description: str
    type: str
    url: str
    tags: str


class GetSchema(BaseModel):
    limit: int
    offset: int
    title: str
    type: str
    tags: str


class AllCardsSchema(BaseModel):
    cards: list[CardSchema] = []


@router.get("/card")
def get_cards(get_schema: GetSchema = Depends()):
    response = cardController.get_cards(get_schema)
    cards = AllCardsSchema(cards=response["cards"])
    count = response["count"]
    return JSONResponse(status_code=200, content={**cards.model_dump(), "count": count})


@router.post("/card")
def create_card(card: CardSchema):
    cardController.create_card(card)
    return JSONResponse(status_code=200, content={"success": True})
