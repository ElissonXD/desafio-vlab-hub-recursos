from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.db import query
from fastapi.middleware.cors import CORSMiddleware

# Routes
from server.routes import card, gemini, edit

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(card.router)
app.include_router(gemini.router)
app.include_router(edit.router)


@app.get("/")
def create_database():
    query.create_initial_database()
    return JSONResponse(status_code=200, content={"success": True})


@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return JSONResponse(status_code=500, content={"error": str(exc)})
