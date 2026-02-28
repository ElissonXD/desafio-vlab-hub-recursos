from server.db import query
from pydantic import BaseModel

def get_cards():
    data = query.get_all_cards()
    return {"cards": data}

def create_card(card):
    query.create_card(card.title, card.description, card.type, card.url, card.tags)

def update_card(id, card):
    query.update_card(id, card.title, card.description, card.type, card.url, card.tags)

def delete_card(id):
    query.delete_card(id)
