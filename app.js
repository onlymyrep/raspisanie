document.getElementById('add-row').addEventListener('click', () => {
  const tbody = document.querySelector('#schedule-table tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input type="text" class="name" placeholder="Ваше имя"></td>
    <td>
      <select class="day">
        <option value="Понедельник">Понедельник</option>
        <option value="Вторник">Вторник</option>
        <option value="Среда">Среда</option>
        <option value="Четверг">Четверг</option>
        <option value="Пятница">Пятница</option>
        <option value="Суббота">Суббота</option>
        <option value="Воскресенье">Воскресенье</option>
      </select>
    </td>
    <td>
      <input type="time" class="time-start" min="07:00" max="00:00">
    </td>
    <td>
      <input type="time" class="time-end" min="07:00" max="00:00">
    </td>
  `;
  tbody.appendChild(newRow);
});

document.getElementById('submit').addEventListener('click', () => {
  const rows = document.querySelectorAll('#schedule-table tbody tr');
  const data = [];

  rows.forEach(row => {
    const name = row.querySelector('.name').value;
    const day = row.querySelector('.day').value;
    const timeStart = row.querySelector('.time-start').value;
    const timeEnd = row.querySelector('.time-end').value;

    if (name && day && timeStart && timeEnd) {
      data.push({ name, day, timeStart, timeEnd });
    }
  });

  if (data.length > 0) {
    sendEmail(data);
  } else {
    alert('Заполните хотя бы одну строку!');
  }
});

function sendEmail(data) {
  const tableContent = data.map(row => `
    <tr>
      <td>${row.name}</td>
      <td>${row.day}</td>
      <td>${row.timeStart}</td>
      <td>${row.timeEnd}</td>
    </tr>
  `).join('');

  const emailBody = `
    <h1>Итоговая таблица</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Имя</th>
          <th>День недели</th>
          <th>Время (от)</th>
          <th>Время (до)</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  // Используйте EmailJS или другой сервис для отправки почты
  // Пример с EmailJS:
  emailjs.send('your_service_id', 'your_template_id', {
    to_email: 'recipient@example.com',
    subject: 'Итоговая таблица расписания',
    message: emailBody
  })
  .then(() => alert('Таблица отправлена на почту!'))
  .catch(() => alert('Ошибка при отправке.'));
}
