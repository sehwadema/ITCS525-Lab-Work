from fastapi import APIRouter, Depends

from app.dependencies import get_history
from app.schemas import CalculatorLog


router = APIRouter()


@router.get("/history")
def read_history(
    limit: int = 50,
    history=Depends(get_history)
) -> list[CalculatorLog]:
    limit = max(0, min(limit, 1000))
    return list(history)[:limit]


@router.delete("/history")
def clear_history(
    history=Depends(get_history)
):
    history.clear()
    return {"ok": True, "cleared": True}