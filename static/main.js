const form = document.getElementById("giftForm");
const giftsContainer = document.getElementById("gifts");

async function loadGifts() {
  const response = await fetch("/gifts");
  const gifts = await response.json();

  giftsContainer.innerHTML = "";
  gifts.forEach((gift) => {
    const item = document.createElement("div");
    const name = document.createElement("h3");
    const giftDesc = document.createElement("p");
    const button = document.createElement("button");
    const buttonIcon = document.createElement("img");

    name.textContent = gift.name;
    name.classList.add("mountains-of-christmas-bold");
    giftDesc.textContent = gift.gift;
    giftDesc.classList.add("mountains-of-christmas-regular");
    button.classList.add("remove-gift");
    buttonIcon.src = "button-icon.png";
    buttonIcon.alt = "Remove Gift";
    buttonIcon.classList.add("button-icon");
    button.appendChild(buttonIcon);

    button.addEventListener("click", async () => {
      await fetch(`/gifts/${gift.id}`, {
        method: "DELETE",
      });
      await loadGifts();
    });

    item.appendChild(name);
    item.appendChild(giftDesc);
    item.appendChild(button);
    item.classList.add("gift-item");
    giftsContainer.appendChild(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.elements.name.value;
  const gift = form.elements.gift.value;

  await fetch("/gifts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, gift }),
  });

  form.reset();
  await loadGifts();
});

loadGifts();
