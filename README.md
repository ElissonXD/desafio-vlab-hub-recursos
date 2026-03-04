# Hub Inteligente de Recursos Educacionais

---

## 📘 Sobre o projeto

Este repositório contém a solução desenvolvida para o **desafio técnico do processo seletivo da VLAB UFPE**, para a vaga de **Desenvolvedor Fullstack**.

O objetivo do desafio foi criar uma aplicação **Fullstack** capaz de armazenar materiais educacionais a partir de um cadastro simples, utilizando **modelos de linguagem (LLMs)** para gerar automaticamente **descrições e categorizações** dos materiais inseridos.

Para isso, foi utilizada a **API do Gemini**, escolhida por oferecer um plano gratuito e por sua facilidade de integração.

---

## 🚀 Funcionalidades

- Interface limpa, intuitiva e de fácil navegação  
- Cadastro de materiais educacionais  
- Edição e remoção de materiais cadastrados  
- Geração automática de descrição e categorização via Gemini  
- Sistema de busca com filtros  
- Tags clicáveis para navegação rápida entre materiais relacionados  
- Banco de dados integrado, sem necessidade de configuração adicional  

---

## 🛠️ Especificações técnicas

A stack utilizada no desenvolvimento foi:

### Frontend
- **JavaScript** com **React + Vite**
  - React Hot Toast
  - React Router DOM

### Backend
- **Python** com **FastAPI**
  - Pydantic para validação de dados
- Uvicorn
- Google Genai
- Banco de dados: **SQLite3**

---

## ▶️ Como executar o projeto

### 1. Instalação das dependências
- No **frontend**, instale os pacotes definidos no `package.json`
- No **backend**, instale os pacotes listados no `requirements.txt`

### 2. Configuração das variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com a seguinte variável:
```env
GEMINI_API_KEY=sua_key_do_gemini
```
### 3. Executando o frontend

Em um terminal, acesse a pasta client e execute:

```terminal
cd client
npm run dev -- --port 5173
```
### 4. Executando o backend

Em outro terminal, na raiz do projeto, execute:

```terminal
python -m uvicorn server.app:app --port 8000 --reload
```
---
# Esquema do Banco de Dados
- O projeto utiliza um banco de dados simples, **composto por uma única tabela**, conforme ilustrado abaixo:
<img width="723" height="411" alt="image" src="https://github.com/user-attachments/assets/ce36c82f-0a64-44eb-8dea-870a852ce8d6" />

---
# Uso de LLM para o desenvolvimento
O uso de IA foi permitido durante o desafio e ocorreu de forma ética e transparente:
- A IA foi utilizada como ferramenta de apoio, principalmente para:
  - Revisões e melhorias pontuais no código
  - Sugestões de otimização
  - Detecção de possíveis erros
  - Auxílio em tarefas repetitivas
- **A maior parte da implementação foi desenvolvida manualmente**
- Também foi utilizada para compreender conceitos técnicos menos familiares, especialmente relacionados a **DevOps e Observabilidade**

# Considerações finais
- Agradeço à VLab pela oportunidade de avançar para a segunda etapa do processo seletivo e pelo desafio proposto.
- Independentemente do resultado, o desenvolvimento deste projeto trouxe aprendizados importantes, como:
  - Paginação via limit e offset
  - DevOps e Observabilidade
  - Boas práticas de organização e otimização de código
- Optei por ir além do mínimo solicitado, implementando funcionalidades extras (como filtros e tags) para tornar a aplicação mais próxima de um cenário real
- Estou satisfeito com o resultado final e com a evolução técnica adquirida ao longo do desenvolvimento

Feito por ElissonXD
