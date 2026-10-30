from datetime import datetime
from pydantic import BaseModel


class Expression(BaseModel):
    expr: str


class CalculatorLog(Expression):
    timestamp: datetime
    result: float