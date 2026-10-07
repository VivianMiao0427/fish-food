let socket = io();

let tank = document.querySelector('#tank');
let fish = document.querySelector('#fish');

let foodItems = [
  { id: 'food1', x: 20, y: 20 },
  { id: 'food2', x: 75, y: 15 },
  { id: 'food3', x: 15, y: 75 },
  { id: 'food4', x: 80, y: 70 },
  { id: 'food5', x: 50, y: 85 },
];

foodItems.forEach((item) => {
  let foodEl = document.createElement('div');
  foodEl.className = 'food';
  foodEl.id = item.id;
  foodEl.style.left = item.x + '%';
  foodEl.style.top = item.y + '%';

  foodEl.addEventListener('click', () => {
    socket.emit('eatFood', item.id);
  });

  tank.appendChild(foodEl);
});

socket.on('fishMove', (foodId) => {
  let eatenFood = foodItems.find((item) => item.id === foodId);
  if (!eatenFood) return; // safety check, just in case

  fish.style.left = eatenFood.x + '%';
  fish.style.top = eatenFood.y + '%';

  setTimeout(() => {
    let foodEl = document.getElementById(foodId);
    if (foodEl) {
      foodEl.classList.add('eaten');
    }
  }, 1000);
});
