let chart; 

function plotChart(row) {
    const rowData = Array.from(row.cells).slice(1).map(cell => Number(cell.innerText)); 
    const labels = rowData.map((_, index) => `Adat ${index + 1}`);

    const ctx = document.getElementById('myChart').getContext('2d');


    if (chart) {
        chart.destroy();
    }


    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Kiválasztott sor adatai',
                data: rowData,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}