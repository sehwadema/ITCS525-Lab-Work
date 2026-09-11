from datetime import datetime

from pydantic import BaseModel

from calculator import expand_percent


class Expression(BaseModel):
    expr: str

    def expand_percent(self):
        return expand_percent(self.expr)


class CalculatorLog(BaseModel):
    timestamp: datetime
    expr: str
    result: float