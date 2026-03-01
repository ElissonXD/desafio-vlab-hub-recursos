import sqlite3

conn = sqlite3.connect("database.db", check_same_thread=False)
conn.execute("PRAGMA foreign_keys = ON")
