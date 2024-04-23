const quadrants = [
  {
    name: 'Techniques',
    id: 4,
    description:
      'are elements of a software process, such as experience design and/or code, methodologies, and ways of structuring the software as microservices.',
  },
  {
    name: 'Platforms',
    id: 1,
    description:
      'similar to the previous one, they are software that helps in the development; however, they are made available without direct team maintenance. Overall, they fit in as a PaaS and/or SaaS.',
  },
  {
    name: 'Languages & Frameworks',
    id: 2,
    description:
      'are the tools that we use directly in the development of projects',
  },
  {
    name: 'Tools',
    id: 3,
    description:
      'we use software directly for development, requiring direct maintenance. For example, a database, a container orchestrator, etc.',
  },
];

const rings = [
  { name: 'ADOPT', color: 'var(--color-accent-1)', id: 0 },
  { name: 'TRIAL', color: 'var(--color-accent-2)', id: 1 },
  { name: 'ASSESS', color: 'var(--color-accent-3)', id: 2 },
  { name: 'HOLD', color: 'var(--color-accent-4)', id: 3 },
];

let dataSet = [];

fetch('./config.json')
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

    radar_visualization({
      svg_id: 'radar',
      width: 1400,
      height: 1000,
      colors: {
        background: 'var(--bg-base-color)',
        grid: '#dddde0',
        inactive: '#ddd',
        bubble: 'var(--font-color-inverse)',
      },
      title: 'Finaps Tech Radar',
      date: data.date,
      quadrants: quadrants,
      rings: rings,
      print_rings: true,
      print_title: false,
      print_legend: true,
      print_layout: false,
      links_in_new_tabs: true,
      // zoomed_quadrant: 0,
      entries: data.entries,
    });

    dataSet.forEach(function (item) {
      let label = document.createElement('button');
      label.setAttribute(
        'class',
        'btn-transparent btn-sm text-left d-flex btn-image',
      );
      const params = `openTechDetails(${item.index})`;
      label.setAttribute('onClick', params);
      label.textContent = item.label;

      let favicon = document.createElement('img');
      favicon.setAttribute('class', 'img-circle');
      favicon.setAttribute('style', 'max-width: 1.5rem;');

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

window.addEventListener('load', function () {
  // close modals on background click
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal();
    }
  });
});

function openTechDetails(index) {
  const item = dataSet[index];

  openModal('modal-details');

  // favicon
  let favicon = document.createElement('img');
  favicon.setAttribute('class', 'img-circle');
  favicon.setAttribute('style', 'max-width: 2.5rem;');
  favicon.setAttribute(
    'src',
    `https://www.google.com/s2/favicons?domain=${item.link}&sz=128`,
  );

  // Append title
  let header = document.createElement('h3');
  header.setAttribute('class', 'm-0');
  header.textContent = item.label;

  const title = document.createElement('div');
  title.setAttribute('class', 'd-flex');
  title.appendChild(favicon);
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
