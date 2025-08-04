// Responsive nav menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Contact form AJAX for Formspree
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                const msg = document.getElementById('form-message');
                if (data.ok) {
                    msg.textContent = 'Message sent! Thank you.';
                    msg.style.color = 'green';
                    form.reset();
                } else if (data.errors && data.errors.length > 0) {
                    msg.textContent = data.errors.map(e => e.message).join(", ");
                    msg.style.color = '#ff7f50';
                } else {
                    msg.textContent = 'Error sending message.';
                    msg.style.color = '#ff7f50';
                }
            })
            .catch(() => {
                document.getElementById('form-message').textContent = 'Error sending message.';
                document.getElementById('form-message').style.color = '#ff7f50';
            });
        });
    }
});