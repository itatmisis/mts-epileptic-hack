from fastapi import FastAPI
from pydantic import BaseModel
from prediction_model_adapter import Adapter

app = FastAPI()
adapter = Adapter()


class Request(BaseModel):
    input_string: str


@app.post("/predict/")
async def predict(request: Request):
    sentence = adapter.get_response(request.input_string)
    return {"result": sentence}
