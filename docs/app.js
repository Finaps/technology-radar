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

    dataSet.forEach(function (item) {
      let label = document.createElement('button');
      label.setAttribute(
        'class',
        'btn-transparent btn-sm text-left d-flex btn-image',
      );
      const params = `openTechDetails(${item.index})`;
      label.setAttribute('onClick', params);
      label.textContent = item.label;

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
      item.favObject = favicon;
      label.appendChild(favicon);

      let li = document.createElement('li');
      li.appendChild(label);

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
  // document.getElementsById('tech-details-header').remove();
}

// close modals on background click
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
});

function openTechDetails(index) {
  const item = dataSet[index];

  openModal('modal-details');

  // favicon
  // let favicon = document.createElement('img');
  // favicon = object.favObject;
  // favicon.setAttribute('class', 'img-circle img-lg');
  // favicon.setAttribute(
  //   'src',
  //   `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`,
  // );

  // Append title
  let header = document.createElement('h3');
  header.setAttribute('class', 'm-0');
  header.textContent = item.label;

  const title = document.createElement('div');
  title.setAttribute('class', 'd-flex align-center');

  title.appendChild(item.favObject.cloneNode(true));
  title.appendChild(header);

  document.getElementById('tech-details-header').replaceChildren(title);

  // Create content
  const content = document.createElement('div');

  // Create description
  const description = document.createElement('p');
  description.setAttribute('class', 'mb-1');
  description.textContent = item.description;
  content.appendChild(description);

  // Create link
  const link = document.createElement('a');
  link.setAttribute('href', item.link);
  link.setAttribute('target', '_blank');
  link.setAttribute('class', '');
  link.textContent = item.link;
  content.appendChild(link);

  // Append content
  document.getElementById('tech-details-content').replaceChildren(content);
}
