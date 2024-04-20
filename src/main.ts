const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card") as HTMLDivElement;
const btn = document.getElementById("btn") as HTMLButtonElement;

const colorType = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

let getPokeData = async () => {
  let id = Math.floor(Math.random() * 150 + 1);
  const finalUrl = url + id;
  let response = await fetch(finalUrl);
  if (!response.ok) {
    throw new Error("couldnt fetch data");
  } else {
    const data = await response.json();
    generateCard(data);
  }
};

btn.addEventListener("click", getPokeData);
// window.addEventListener("load", getPokeData);

function generateCard(data: object) {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  const statAttack = data.stats[1].base_stat;
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  const themeColor = colorType[data.types[0].type.name];
  console.log(themeColor);

  card.innerHTML = `<p class="hp">
  <span>HP</span>
    ${hp}
  </p>
  <img src="${imgSrc}" alt="photoNotFound" />
  <h2 class="poke-name">${pokeName}</h2>
  <div class="types">
    
  </div>
  <div class="stats">
    <div>
      <h3>${statAttack}</h3>
      <p>Attack</p>
    </div>
    <div>
      <h3>${statDefence}</h3>
      <p>Defence</p>
    </div>
    <div>
      <h3>${statSpeed}</h3>
      <p>Speed</p>
    </div>
  </div>`;
  appendTypes(data.types);
  styleCard(themeColor);
}

let appendTypes = (types: Array<string>) => {
  types.forEach((element) => {
    let span = document.createElement("SPAN");
    span.textContent = element.type.name;
    document.querySelector(".types")?.appendChild(span);
  });
};

let styleCard = (themeColor: string) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%);
  `;
};
