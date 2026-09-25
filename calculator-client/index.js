const expressionInput = document.getElementById("expression");
const calculateBtn = document.getElementById("calculateBtn");
const resultText = document.getElementById("result");

calculateBtn.addEventListener("click", async () => {
    const expr = expressionInput.value;

    const response = await fetch(
        "http://127.0.0.1:8000/calculate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                expr: expr
            })
        }
    );

    const data = await response.json();

    if (data.ok) {
        resultText.innerText = `Result: ${data.result}`;
    } else {
        resultText.innerText = `Error: ${data.error}`;
    }
});