const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = input.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else if (!data) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.city;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
