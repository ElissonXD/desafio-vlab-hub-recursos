from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from server.controllers import geminiController

router = APIRouter()


class GeminiRequest(BaseModel):
    title: str
    type: str


@router.post("/gemini")
async def get_gemini_response(request: GeminiRequest):
    data = await geminiController.get_gemini_response(request)
    return JSONResponse(status_code=200, content=data)
