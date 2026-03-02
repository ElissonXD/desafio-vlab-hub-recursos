from server.db.pool import conn

cursor = conn.cursor()


def create_initial_database():
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        type VARCHAR(255) CHECK(type IN ('Vídeo', 'PDF', 'Link')) NOT NULL,
        url VARCHAR(255) NOT NULL,
        tags VARCHAR(255)
    );""")

    conn.commit()


def create_card(title, description, type, url, tags):
    cursor.execute(
        """
    INSERT INTO cards (title, description, type, url, tags) VALUES (?, ?, ?, ? ,?)
    """,
        (title, description, type, url, tags),
    )

    conn.commit()


def update_card(id, title, description, type, url, tags):
    cursor.execute(
        """
    UPDATE cards SET title=?, description=?, type=?, url=?, tags=? WHERE id=?
    """,
        (title, description, type, url, tags, id),
    )

    conn.commit()


def delete_card(id):
    cursor.execute(
        """
    DELETE FROM cards WHERE id = ?                    
    """,
        (id,),
    )

    conn.commit()


def get_card_by_id(id):
    cursor.execute(
        """
    SELECT * FROM cards WHERE id = ?               
    """,
        (id,),
    )
    data = cursor.fetchone()
    return data


def get_all_cards(get_schema):
    query = "SELECT * FROM cards WHERE 1=1"
    count_query = "SELECT COUNT(*) FROM cards WHERE 1=1"
    params = []

    if get_schema.title:
        query += " AND title LIKE ?"
        count_query += " AND title LIKE ?"
        params.append(f"%{get_schema.title}%")

    if get_schema.type:
        query += " AND type = ?"
        count_query += " AND type = ?"
        params.append(get_schema.type)

    if get_schema.tags:
        query += " AND tags LIKE ?"
        count_query += " AND tags LIKE ?"
        params.append(f"%{get_schema.tags}%")

    query += " LIMIT ? OFFSET ?"
    params += [get_schema.limit, get_schema.offset]

    cursor.execute(query, params)
    data = cursor.fetchall()

    cursor.execute(count_query, params[:-2])
    count = cursor.fetchone()[0]
    return {"cards": data, "count": count}
