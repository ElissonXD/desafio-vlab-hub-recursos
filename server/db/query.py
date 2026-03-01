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


def get_all_cards():
    cursor.execute("SELECT * FROM cards")
    data = cursor.fetchall()
    return data
