document.addEventListener('DOMContentLoaded', () => {
    const fuerzaInput = document.getElementById('fuerza');
    const longitudInput = document.getElementById('longitud');
    const calcularButton = document.getElementById('calcular');
    const restablecerButton = document.getElementById('restablecer');
    const resultadoDiv = document.getElementById('resultado');
    const ctx = document.getElementById('momentoChart').getContext('2d');

    const momentoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Fuerza (N)', 'Longitud (m)', 'Momento (Nm)'],
            datasets: [{
                label: 'Valores',
                data: [],
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
                lineTension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores',
                        color: '#333'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Variables',
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#333'
                    }
                }
            }
        }
    });

    calcularButton.addEventListener('click', () => {
        const fuerza = parseFloat(fuerzaInput.value);
        const longitud = parseFloat(longitudInput.value);
        if (isNaN(fuerza) || isNaN(longitud) || longitud === 0) {
            resultadoDiv.textContent = 'Por favor, ingrese valores válidos.';
            resultadoDiv.style.color = '#dc3545';
            return;
        }
        const momento = (fuerza * longitud) / 4;
        resultadoDiv.textContent = `Momento calculado: ${momento.toFixed(2)} Nm`;
        resultadoDiv.style.color = '#28a745';

        momentoChart.data.datasets[0].data = [fuerza, longitud, momento];
        momentoChart.update();
    });

    restablecerButton.addEventListener('click', () => {
        fuerzaInput.value = '';
        longitudInput.value = '';
        resultadoDiv.textContent = '';
        momentoChart.data.datasets[0].data = [];
        momentoChart.update();
    });
});
