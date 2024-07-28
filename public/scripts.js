document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript here
  });
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    if (!name || !password) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('evaluationScheduleForm')?.addEventListener('submit', function(event) {
    var course = document.getElementById('course').value;
    var date = document.getElementById('date').value;

    if (!course || !date) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('facultyEvaluationForm')?.addEventListener('submit', function(event) {
    var facultyName = document.getElementById('facultyName').value;
    var evaluation = document.getElementById('evaluation').value;

    if (!facultyName || !evaluation) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('peerReviewForm')?.addEventListener('submit', function(event) {
    var peerName = document.getElementById('peerName').value;
    var review = document.getElementById('review').value;

    if (!peerName || !review) {
        alert('All fields are required!');
        event.preventDefault();
    }
});

document.getElementById('selfAssessmentForm')?.addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var selfAssessment = document.getElementById('selfAssessment').value;

    if (!name || !selfAssessment) {
        alert('All fields are required!');
        event.preventDefault();
    }
});
 
