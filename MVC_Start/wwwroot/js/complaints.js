import { getComplaintTrendsData, getComplaintsData} from "./fetch-api-data.js";

async function renderComplaintsTableBody() {
  const with_complaints = document
    .getElementById("categoryDropdownMenuSelected")
    .getAttribute("data-categoryDropdownMenuSelected");
  const sort_by = document
    .getElementById("sortDropdownMenuSelected")
    .getAttribute("data-sortDropdownMenuSelected");

  const with_limit = "size=20"
  const data = await getComplaintsData({"sort": sort_by, "product": with_complaints, "size": 20, "no_aggs": true});
  const complaints = data?.hits?.hits ?? [];

  const complaintsTableBody = document.getElementById("complaintsTableBody");

  let counter = 1;

  const rows = complaints.reduce((rows, complaint) => {
    complaint = complaint._source
    rows.push(
      `<tr>
        <th scope="row">${counter}</th>
        <td>${complaint.company}</td>
        <td>
          <a href="/Home/ComplaintDetails?id=${complaint.complaint_id}" class="link-underline-light">
            <span class="icon-color">&#128279</span>
          </a>
        </td>
        <td>${complaint.company_response}</td>
        <td>${complaint.state}</td>
        <td>${complaint.date_received}</td>
      </tr>
    `
    );
    counter++;
    return rows;
  }, []);

  complaintsTableBody.innerHTML = rows.join(" ");
}

function onCategoryChange(name, id) {
  const element = document.getElementById("categoryDropdownMenuSelected");
  element.innerText = name;
  element.setAttribute("data-categoryDropdownMenuSelected", id);

  renderComplaintsTableBody();
}

async function renderDropDownSource() {
  const dropdownMenuSource = document.getElementById("categoryDropdownMenuSource");

  let categories = (await getComplaintTrendsData()) ?? {};
  categories = Object.keys(categories)
  for (const category of categories) {
    const element = document.createElement("button");
    element.classList.add("dropdown-item");
    element.appendChild(document.createTextNode(category.split("•").slice(-1)[0]));
    dropdownMenuSource.appendChild(element);
    element.onclick = function () {
      onCategoryChange(category, category);
    };
  }
}

const SORT_ELEMENTS_INNER_HTML = {
  "relevance_desc": `Relevance <span class="sort-icon-color">&#8593;</span>`,
  "relevance_asc": `Relevance <span class="sort-icon-color">&#8595;</span>`,
  "created_date_desc": `CreatedDate <span class="sort-icon-color">&#8593;</span>`,
  "created_date_asc": `CreatedDate <span class="sort-icon-color">&#8595;</span>`
};

function onSortChange(value) {
  const element = document.getElementById("sortDropdownMenuSelected");
  element.innerHTML = SORT_ELEMENTS_INNER_HTML[value] ?? "";
  element.setAttribute("data-sortDropdownMenuSelected", value);

  renderComplaintsTableBody();
}

function renderSortDropdownMenuSource() {
  const dropdownMenuSource = document.getElementById("sortDropdownMenuSource");

  const sortables = Object.entries(SORT_ELEMENTS_INNER_HTML);

  for (const [sort_by, innerHtml] of sortables) {
    const element = document.createElement("button");
    element.classList.add("dropdown-item");
    element.innerHTML = innerHtml;
    dropdownMenuSource.appendChild(element);
    element.onclick = function () {
      onSortChange(sort_by);
    };
  }
}

(function () {
  renderDropDownSource();
  renderSortDropdownMenuSource();
  renderComplaintsTableBody();
})();


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

function getRandomBorderColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function generateColors(size) {
  return Array.from({ length: size }, getRandomColor);
}

function generateBorderColors(size) {
  return Array.from({ length: size }, getRandomBorderColor);
}

function renderChart(chartType, data) {
  const ctx = document.getElementById('category-count-chart').getContext('2d');
  const labels = Object.keys(data);
  const counts = Object.values(data);
  
  const colors = generateColors(labels.length);
  const borderColors = generateBorderColors(labels.length);

  const chart = new Chart(ctx, {
      type: chartType,
      data: {
          labels: labels,
          datasets: [{
              label: '# of Complaints By Category',
              data: counts,
              backgroundColor: colors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
                beginAtZero: chartType === 'bar',
                ticks: {
                    color: '#FFC106'
                },
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    color: '#FFC106'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FFC106',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
      }
  });
}

getComplaintTrendsData().then(data => {
  let new_data = {}
  for (let key in data) {
      let sub_category = key.split("•")[1];
      new_data[sub_category] = data[key];
  }
  
  renderChart('bar', new_data);
});
