import math
from datetime import datetime

from fastapi import APIRouter, Depends
from asteval import Interpreter

from app.dependencies import expand_percent, get_history
from app.schemas import Expression, CalculatorLog


router = APIRouter()

aeval = Interpreter(minimal=True, usersyms={"pi": math.pi, "e": math.e})


@router.post("/calculate")
def calculate(
    expression: Expression,
    code: str = Depends(expand_percent),
    history=Depends(get_history)
):
    try:
        result = aeval(code)

        if aeval.error:
            msg = "; ".join(str(e.get_error()) for e in aeval.error)
            aeval.error.clear()
            return {"ok": False, "expr": expression.expr, "result": "", "error": msg}

        history.appendleft(
            CalculatorLog(
                timestamp=datetime.now(),
                expr=expression.expr,
                result=result
            )
        )

        return {"ok": True, "expr": expression.expr, "result": result, "error": ""}

    except Exception as e:
        return {"ok": False, "expr": expression.expr, "error": str(e)}