const form = document.getElementById('eventForm');
const eventsDiv = document.getElementById('events');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const LS_KEY = 'aarambh_events_v1';

function load() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function save(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function render() {
  eventsDiv.innerHTML = '';
  const list = load();
  if (!list.length) {
    eventsDiv.innerHTML = '<p>No events yet. Add one above.</p>';
    return;
  }
  list.forEach((e, i) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div>
        <strong>${e.title}</strong>
        <div class="event-meta">${e.date}</div>
      </div>
      <button data-i="${i}" class="del">Delete</button>
    `;
    eventsDiv.appendChild(card);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const list = load();
  list.unshift({ title: titleInput.value, date: dateInput.value });
  save(list);
  titleInput.value = '';
  dateInput.value = '';
  render();
});

eventsDiv.addEventListener('click', e => {
  if (e.target.classList.contains('del')) {
    const i = +e.target.dataset.i;
    const list = load();
    list.splice(i, 1);
    save(list);
    render();
  }
});

render();
