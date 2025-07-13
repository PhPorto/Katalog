function ToggleMode() {
  const html = document.documentElement;
  html.classList.toggle("light");

  const img = document.getElementById("profileImage");

  if (html.classList.contains("light")) {
    img.src = "./assets/Nicoleescuro.png";
    img.alt = "Nicole Cruz Souza (modo claro)";
  } else {
    img.src = "./assets/Nicoleclaro.png";
    img.alt = "Nicole Cruz Souza (modo escuro)";
  }
}