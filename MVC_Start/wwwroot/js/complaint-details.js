import { getComplaintDetails } from "./fetch-api-data.js";

export async function renderComplaintOverview(id) {
  const complaintOverviewSection = document.getElementById(
    "complaintOverviewSection"
  );

  if (id != null) {
    console.log(id)
    let complaint = await getComplaintDetails(id);
    complaint = complaint.hits.hits[0]._source

    complaintOverviewSection.innerHTML = `
      <div class="row pt-2">
        <div class="col-sm-9 offset-1">
          <div class="row">
            <div class="col company-overview-title text-warning h1">${complaint.issue}</div>
          </div>
          <div class="row text-white">
            <div class="col complaint-overview-details h6">${complaint.complaint_what_happened || ""}</div>
          </div>
        </div>
      </div>
      <div class="row py-1">
        <div class="row text-white">
          <div class="col-5 offset-1">
            <div class="row py-1"><div class="col"> <strong>Company</strong>: ${complaint.company || ""} </div></div>
            <div class="row py-1"><div class="col"> <strong>Product</strong>: ${complaint.product || ""} </div></div>
            <div class="row py-1"><div class="col"> <strong>Sub Product</strong>: ${complaint.sub_product || ""} </div></div>
            <div class="row py-1"><div class="col"> <strong>Submitted Via</strong>: ${complaint.submitted_via || "NA"} </div></div>
            <div class="row py-1"><div class="col"> <strong>Consumer Disputed</strong>: ${complaint.consumer_disputed || "NA"} </div></div>
            <div class="row py-1"><div class="col"> <strong>Consumer Consent</strong>: ${complaint.consumer_consent_provided || "NA"} </div></div>
            <div class="row py-1"><div class="col"> <strong>Timely </strong>: ${complaint.timely || "NA"} </div></div>
            <div class="row py-1"><div class="col"> <strong>State</strong>: ${complaint.state || "NA"} </div></div>
            <div class="row py-1"><div class="col"> <strong>Zip Code</strong>: ${complaint.zip_code || "NA"} </div></div>
          </div>
          <div class="col">
            <div class="row py-1"><div class="col"> <strong>Date Received</strong>: ${complaint.date_received_formatted || ""} </div></div>
            <div class="row py-1"><div class="col"> <strong>Date Sent</strong>: ${complaint.date_sent_to_company_formatted || ""} </div></div>
            <div class="row py-1"><div class="col"> <strong>Date Indexed</strong>: ${complaint.date_indexed_formatted || ""} </div></div>
          </div>
        </div>
        <div class="row text-white py-1">
          <div class="col offset-1 complaint-overview-details"><strong>Company Response</strong>: ${complaint.company_response || "No Response"}</div>
        </div>
      </div>
      `;
  } else {
    complaintOverviewSection.innerHTML = `<div class="row pt-2 text-white">
      <p><strong> Please visit <a href="/Home/Complaints" class="text-warning">Complaints</a> page to select a complaint for details</strong></p>
    </div>`
  }
}

