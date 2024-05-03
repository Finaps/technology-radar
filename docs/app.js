let dataSet = [];

fetch('./data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    dataSet = data.entries;
    let label = document.createElement('span');
    label.textContent = data.date;

    let span = document.createElement('span');
    span.appendChild(label);

    document.getElementById('version').appendChild(span);

    const radarInput = {
      ...RADAR_CONFIG,
      date: data.date,
      entries: data.entries,
    };
    radar_visualization(radarInput);

    setRadarScale();

    dataSet.forEach(function (item) {
      // create button
      const button = document.createElement('button');
      button.setAttribute(
        'class',
        'btn-transparent btn-sm text-left d-flex btn-image',
      );
      const params = `openTechDetails(${item.index})`;
      button.setAttribute('onClick', params);

      // create favicon
      const favicon = document.createElement('img');
      favicon.setAttribute('class', 'img-circle');

      if (!item.link) {
        favicon.setAttribute(
          'src',
          'https://www.google.com/s2/favicons?domain=https://www.finaps.nl/&sz=128',
        );
      } else {
        favicon.setAttribute(
          'src',
          `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`,
        );
      }
      item.favObjectUrl = favicon.getAttribute('src');
      button.appendChild(favicon);

      // create index + label
      const body = document.createElement('div');

      const index = document.createElement('span');
      index.setAttribute('class', 'text-gray mr-0_25');
      index.textContent = '#' + item.id;

      const label = document.createElement('span');
      label.textContent = item.label;

      body.appendChild(index);
      body.appendChild(label);
      button.appendChild(body);

      const li = document.createElement('li');
      li.appendChild(button);

      const id = item.quadrant + '-' + item.ring;
      document.getElementById(id).appendChild(li);
    });
  })
  .catch(function (err) {
    console.log('Error loading config.json', err);
  });

// open modal by id
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.classList.add('modal-open');
}

// close currently open modal
function closeModal() {
  document.querySelector('.modal.open').classList.remove('open');
  document.body.classList.remove('modal-open');
}

// close modals on background click
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
});

function openTechDetails(index) {
  const item = dataSet[index];

  document.getElementById('modal-fav').setAttribute('src', item.favObjectUrl);
  document.getElementById('modal-title').textContent = item.label;
  document.getElementById('modal-description').textContent = item.description;
  document.getElementById('modal-link').textContent = item.link;
  document.getElementById('modal-link').setAttribute('href', item.link);

  openModal('modal-details');
}

function setRadarScale() {
  const container = document.querySelector('.radar');
  const radar = document.querySelector('#radar > g');
  const scale = container.clientWidth > 804 ? 1 : container.clientWidth / 804;
  radar.setAttribute('style', `scale: ${scale};`);
}

addEventListener('resize', setRadarScale);
