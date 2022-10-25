function onSubmit(event) {
  event.preventDefault();

  const w = parseFloat(event.target[0].value);
  const h = parseFloat(event.target[1].value);
  
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    alert("숫자를 입력해 주세요")
    return;
  }
  
  const bmi = w / (h*h)

  const res = document.querySelector("#res");
  res.style.display = "flex"

  document.querySelector("#bmi").innerText = bmi.toFixed(2)
  document.querySelector("#meter").value = bmi

  let state = "정상"
  let common = true
  if (bmi < 18.5)
    state = "저체중"
    common = false;
  if (bmi >= 25)
    state = "과체중"
    common = false;

  const stateEl = document.querySelector("#state");
  stateEl.innerText = state
  stateEl.style.color = common ? "red" : "green"
}