import json
from google import genai
from pydantic import BaseModel

client = genai.Client()

# Pydantic models


async def get_gemini_response(request):
    response = await client.models.generate_content(
        model="gemini-3.1-pro-preview",
        contents=f"""
        Você é um assistente pedagógico especializado em organizar materiais didáticos.
        Sua tarefa é gerar descrições úteis para alunos com base no 'Título' e no 'Tipo' do material fornecido.
        
        A descrição deve ser clara, concisa, engajadora e explicar o que o aluno pode esperar aprender ou encontrar neste recurso.
        Além disso, sugira 3 tags relevantes para categorizar o material. As tags devem ser palavras únicas, separadas por vírgula.

        Título do Material: {request.title}
        Tipo do Material: {request.type}

        Responda indiscutivelmente com um objeto JSON válido e bem formatado, seguindo exatamente esta estrutura:
        {{
            "description": "sua descrição aqui",
            "tags": "tag1, tag2, tag3"
        }}
        """,
        generation_config={"response_mime_type": "application/json"},
    )

    text = response.text

    json_response = json.loads(text)

    return json_response
