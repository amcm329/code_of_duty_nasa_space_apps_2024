let chart2, chart3;

function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    document.getElementById(tabName).style.display = 'block';

    if (tabName === 'tab2' && !chart2) {
        createChart2();
    } else if (tabName === 'tab3' && !chart3) {
        createChart3();
    }
}

function createChart2() {
    const ctx = document.getElementById('myChart2').getContext('2d');
    chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => `Label ${i + 1}`),
            datasets: [{
                label: 'Dynamic Data 1',
                data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createChart3() {
    const ctx = document.getElementById('myChart3').getContext('2d');
    chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => `Label ${i + 1}`),
            datasets: [{
                label: 'Dynamic Data 2',
                data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateChart2() {
    const count = document.getElementById('data2').value;
    const newData = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
    chart2.data.datasets[0].data = newData;
    chart2.data.labels = Array.from({ length: count }, (_, i) => `Label ${i + 1}`);
    chart2.update();
}

function updateChart3() {
    const count = document.getElementById('data3').value;
    const newData = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
    chart3.data.datasets[0].data = newData;
    chart3.data.labels = Array.from({ length: count }, (_, i) => `Label ${i + 1}`);
    chart3.update();
}

// Open the first tab by default
//openTab('tab1');
