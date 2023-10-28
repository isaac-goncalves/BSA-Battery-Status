// static/chart.js
document.addEventListener('DOMContentLoaded', () => {
    const chargeRateCtx = document.getElementById('chargeRateChart').getContext('2d');
    const dischargeRateCtx = document.getElementById('dischargeRateChart').getContext('2d');
    const voltageCtx = document.getElementById('voltageChart').getContext('2d');

    const dataLenght = 150;  // Number of data points to show on the charts

    // Create initial data structures for each chart
    const chargeRateData = {
        labels: [],
        datasets: [{
            label: 'ChargeRate',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    const dischargeRateData = {
        labels: [],
        datasets: [{
            label: 'DischargeRate',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }]
    };

    const voltageData = {
        labels: [],
        datasets: [{
            label: 'Voltage',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    };

    // Create initial chart instances
    const chargeRateChart = new Chart(chargeRateCtx, {
        type: 'line',
        data: chargeRateData,
        options: {
            responsive: true,
        }
    });

    const dischargeRateChart = new Chart(dischargeRateCtx, {
        type: 'line',
        data: dischargeRateData,
        options: {
            responsive: true,
        }
    });

    const voltageChart = new Chart(voltageCtx, {
        type: 'line',
        data: voltageData,
        options: {
            responsive: true,
        }
    });

    // Function to update the charts
    function updateCharts() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                const timestamp = new Date().toLocaleTimeString();

                // Update ChargeRate chart
                chargeRateData.labels.push(timestamp);
                chargeRateData.datasets[0].data.push(data.chargeRate);
                if (chargeRateData.labels.length > dataLenght) {
                    chargeRateData.labels.shift();
                    chargeRateData.datasets[0].data.shift();
                }
                chargeRateChart.update();

                // Update DischargeRate chart
                dischargeRateData.labels.push(timestamp);
                dischargeRateData.datasets[0].data.push(data.dischargeRate);
                if (dischargeRateData.labels.length > dataLenght) {
                    dischargeRateData.labels.shift();
                    dischargeRateData.datasets[0].data.shift();
                }
                dischargeRateChart.update();

                // Update Voltage chart
                voltageData.labels.push(timestamp);
                voltageData.datasets[0].data.push(data.voltage);
                if (voltageData.labels.length > dataLenght) {
                    voltageData.labels.shift();
                    voltageData.datasets[0].data.shift();
                }
                voltageChart.update();
            });

        setTimeout(updateCharts, 1000);  // Update the charts every second

    }

    updateCharts();  // Start updating the charts
});
