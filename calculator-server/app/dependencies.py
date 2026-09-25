from collections import deque
from fastapi import HTTPException

from app.schemas import Expression
from calculator import expand_percent as _expand_percent

HISTORY_MAX = 1000

history = deque(maxlen=HISTORY_MAX)


def get_history():
    return history

def expand_percent(expression: Expression) -> str:
    try:
        return _expand_percent(expression.expr)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to expand expression: {e}"
        )