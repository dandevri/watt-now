var appliances = document.getElementsByClassName('charts');

for (let i = 0; i < appliances.length; i++) {
  new Chart(appliances[i], {
    type: 'doughnut',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'hsl(145, 67%, 60%)',
          'hsl(48, 90%, 65%)',
          'hsl(351, 87%, 65%)'
        ],
        hoverBackgroundColor: [
          'hsl(145, 67.4%, 46.9%)',
          'hsl(48, 90%, 51%)',
          'hsl(351, 87%, 56%)'
        ]
      }]
    }
  });
}
