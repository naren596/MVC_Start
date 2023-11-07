import { getComplaintTrendsData} from "./fetch-api-data.js";

async function renderDropDownSource() {
  fetch('/Home/GetSubProducts')
  .then(response => response.json())
  .then(subProducts => {
      const dropdown = document.getElementById('categoryDropdownMenuSource');
      subProducts.forEach(subProduct => {
          const option = document.createElement('option');
          option.value = subProduct.id;
          option.textContent = subProduct.name;
          option.addEventListener('click', () => {
              loadComplaintsForSubProduct(subProduct.id, subProduct.name);
          });
          dropdown.appendChild(option);
      });
  })
  .catch(error => console.error('Error fetching subproducts:', error));
}

window.deleteComplaint = function(complaintId) {
  fetch(`/Home/DeleteComplaint/${complaintId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
      if(data.success) {
          window.location.reload();
      } else {
          alert('There was an error deleting the complaint.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function loadComplaintsForSubProduct(subProductId, subProductName) {
  const element = document.getElementById("categoryDropdownMenuSelected");
  element.innerText = subProductName;
  element.setAttribute("data-categoryDropdownMenuSelected", subProductId);
  fetch(`/Home/GetComplaintsForSubProduct?subProductId=${subProductId}`)
      .then(response => response.json())
      .then(complaints => {
          const complaintsTableBody = document.getElementById("complaintsTableBody");
          let counter = 1;

          const rows = complaints.reduce((rows, complaint) => {
            rows.push(
              `<tr>
                <th scope="row">${counter}</th>
                <td>${complaint.companyName}</td>
                <td>
                  <a href="/Home/ComplaintDetails?id=${complaint.complaintId}" class="link-underline-light">
                    <span class="icon-color">&#128279</span>
                  </a>
                </td>
                <td>${complaint.companyResponse}</td>
                <td>${complaint.state}</td>
                <td>${complaint.dateReceived}</td>
                <td>
                  <a href="/Home/EditComplaint?id=${complaint.complaintId}" class="btn btn-primary btn-sm">
                    Edit
                  </a>
                </td>
                <td>
                  <button onclick="deleteComplaint(${complaint.complaintId})" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            `
            );
            counter++;
            return rows;
          }, []);
        
          complaintsTableBody.innerHTML = rows.join(" ");
      })
      .catch(error => console.error('Error fetching complaints:', error));
}


(function () {
  renderDropDownSource();
  loadComplaintsForSubProduct(115, "Debt settlement")
})();

document.addEventListener('DOMContentLoaded', (event) => {
  const defaultSubProductId = document.getElementById('categoryDropdownMenuSource').value;
  if (defaultSubProductId) {
      loadComplaintsForSubProduct(115, "Debt settlement");
  }
});


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
              label: '# of Complaints By Subproduct',
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
