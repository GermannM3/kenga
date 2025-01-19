// Пример простого скрипта для отправки данных формы
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Здесь можно добавить логику для отправки данных на сервер
    alert(`Спасибо, ${fullname}, за регистрацию! Мы отправили письмо на ${email}.`);
});
