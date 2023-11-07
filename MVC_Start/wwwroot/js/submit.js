document.addEventListener('DOMContentLoaded', function() {
    let complaintForm = document.getElementById('complaint-form');

    if (complaintForm) {
        // complaintForm.addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     const issue = document.getElementById('issue').value;
        //     const description = document.getElementById('description').value;

        //     document.getElementById('modal-issue').textContent = issue;
        //     document.getElementById('modal-description').textContent = description;

        //     const modal = new bootstrap.Modal(document.getElementById('complaint-modal'));
        //     modal.show()
        // });
    }
});

function updateReview() {
    $('#complaint-modal').modal('show');
}