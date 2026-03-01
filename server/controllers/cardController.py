from server.db import query


def get_cards():
    data = query.get_all_cards()
    mapped_data = []
    for row in data:
        mapped_data.append(
            {
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "type": row[3],
                "url": row[4],
                "tags": row[5]
            }
        )
    return {"cards": mapped_data}


def create_card(card):
    query.create_card(card.title, card.description, card.type, card.url, card.tags)

