from fastapi import FastAPI
from pydantic import BaseModel

# Routes
from server.routes import card, gemini

app = FastAPI()

app.include_router(card.router)
app.include_router(gemini.router)


@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return {"error": str(exc)}
