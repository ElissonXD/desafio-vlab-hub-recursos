from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.controllers import geminiController

router = APIRouter()


class GeminiRequest(BaseModel):
    title: str
    type: str


@router.post("/gemini")
def get_gemini_response(request: GeminiRequest):
    data = geminiController.get_gemini_response(request)
    return JSONResponse(status_code=200, content=data)
