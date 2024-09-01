// selectors
const button = document.getElementById("color-picker");
const clearAllBtn = document.querySelector(".clear-all");
const Allcolors = document.querySelector(".all-colors");
const title = document.querySelector(".title");

// array
// let arry = [];
let arry = JSON.parse(localStorage.getItem("item") || "[]");
showColor();

// let getLocalStorage = localStorage.getItem("item");
// if (getLocalStorage) {
//   arry = JSON.parse(getLocalStorage);
//   showColor();
// }

// getColor
async function getColor() {
  try {
    const eyeDropper = new EyeDropper();
    const dropper = await eyeDropper.open();
    const colorCode = dropper.sRGBHex;
    // copy to click

    navigator.clipboard.writeText(colorCode);
    arry.push(colorCode);
    localStorage.setItem("item", JSON.stringify(arry));

    showColor();
  } catch (error) {
    alert("failed");
  }
}

function showColor() {
  Allcolors.innerHTML = arry
    .map(
      (color) =>
        `
    <li class="color">
                <span class="rect" style="background-color:${color}"></span>
                <span class="value hex">${color}</span>
              </li>`
    )
    .join("");
  title.innerText = `Picked color`;

  // copy when click on text
  const colors = document.querySelectorAll(".color");
  console.log(colors);
  colors.forEach((li) => {
    li.addEventListener("click", (e) => {
      const colorValue = e.target.innerText;
      navigator.clipboard.writeText(colorValue);
      e.target.innerText = `Copied`;
      setTimeout(() => (e.target.innerText = colorValue), 1000);
    });
  });

  if (arry.length != 0) {
  } else {
    Allcolors.innerHTML = " No color here, ";
  }
}
function myFunction() {
  document.getElementById("myCheck").click();
}
// delete
function AllClear() {
  Allcolors.innerHTML = " No color here, Please picked a color";
  title.innerText = `👇👇`;
  arry.length = 0;
  localStorage.setItem("item", JSON.stringify(arry));
  console.log(arry.length);
}

// AllClear()
button.addEventListener("click", getColor);
clearAllBtn.addEventListener("click", AllClear);
