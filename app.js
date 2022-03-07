const generator = document.querySelector(".generator");
generator.addEventListener("click", (e) => {
  generateAdvice();
});
document.addEventListener("DOMContentLoaded", () => {
  generateAdvice();
});
async function generateAdvice() {
  const adviseId = document.querySelector("[data-id]");
  if (Number(adviseId.innerText) > 0) {
    const id = Number(adviseId.innerText);
    const adviseText = await getAdvice(
      `https://api.adviceslip.com/advice/${Math.floor(Math.random() * 100)}`
    );
    adviseId.innerText = adviseText.slip.id;
    document.querySelector(
      ".advice-text"
    ).innerText = `"${adviseText.slip.advice}"`;
  } else {
    const adviseText = await getAdvice("https://api.adviceslip.com/advice");
    adviseId.innerText = adviseText.slip.id;
    document.querySelector(
      ".advice-text"
    ).innerText = `"${adviseText.slip.advice}"`;
  }
}
async function getAdvice(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
  });
  const adviseText = await dataFetch.json();
  if (adviseText.slip) {
    return adviseText;
  } else if (adviseText.message) {
    const dataFetch = await fetch("https://api.adviceslip.com/advice", {
      method: "GET",
    });
    const adviseText = await dataFetch.json();
    return adviseText;
  }
}
