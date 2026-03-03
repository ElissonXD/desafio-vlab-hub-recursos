import json
from google import genai
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import logging
import time

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
logging.basicConfig(level=logging.INFO)

# Pydantic models
class GeminiResponse(BaseModel):
    description: str
    tags: list[str]

class AIException(Exception):
    def __init__(self, name):
        self.name = name

def get_gemini_response(request):
        start_time = time.time()
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=f"""
            Você é um assistente pedagógico especializado em organizar materiais didáticos.
            Sua tarefa é gerar descrições úteis para alunos com base no 'Título' e no 'Tipo' do material fornecido.
            
            A descrição deve ser clara, concisa, engajadora e explicar o que o aluno pode esperar aprender ou encontrar neste recurso.
            Além disso, sugira 3 tags relevantes para categorizar o material. As tags devem ser palavras únicas, contidas em um array

            Título do Material: {request.title}
            Tipo do Material: {request.type}

            Responda indiscutivelmente com um objeto JSON válido e bem formatado, seguindo exatamente esta estrutura, deixe sua mensagem OBRIGATORIAMENTE em formato de texto:
            {{
                "description": "sua descrição aqui",
                "tags": ["tag1", "tag2", "tag3"]
            }}
            """,
        )

        latency = round(time.time() - start_time, 2)

        text = response.text

        json_response = json.loads(text)
        validated_response = GeminiResponse(**json_response)

        logging.info(f'[INFO] AI Request: Title="{request.title}", TokenUsage={response.usage_metadata.total_token_count}, Latency={latency}s.')

        return validated_response.model_dump()
