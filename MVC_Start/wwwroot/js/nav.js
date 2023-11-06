document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname.toLowerCase();

  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = new URL(a.href).pathname.toLowerCase();
    if (path === href) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const regex = /\/Home\/About|\/Complaints\/ComplaintDetails\/\d+/;
  if (regex.test(document.location.href)) {
      document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('../img/bg-image-6.webp')";
  }
});
