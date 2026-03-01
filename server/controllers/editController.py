from server.db import query


def get_card_by_id(id):
    card = query.get_card_by_id(id)
    if not card:
        return []
    return {
        "id": card[0],
        "title": card[1],
        "description": card[2],
        "type": card[3],
        "url": card[4],
        "tags": card[5],
    }


def update_card(card):
    query.update_card(
        card.id, card.title, card.description, card.type, card.url, card.tags
    )


def delete_card(id):
    query.delete_card(id)
