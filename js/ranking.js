// ranking.js - Gráfico de barras horizontales apiladas
let rankingChart = null;

async function crearRanking() {
    const datos = await obtenerMedallas();
    
    if (!datos || datos.length === 0) {
        console.log('No hay datos');
        return;
    }

    const cervecerias = {};
    
    datos.forEach(item => {
        const nombre = item.cerveceria;
        const medalla = item.medalla_base;
        
        if (!nombre) return;
        
        if (!cervecerias[nombre]) {
            cervecerias[nombre] = { oro: 0, plata: 0, bronce: 0 };
        }
        
        if (medalla === 'Oro') cervecerias[nombre].oro++;
        else if (medalla === 'Plata') cervecerias[nombre].plata++;
        else if (medalla === 'Bronce') cervecerias[nombre].bronce++;
    });
    
    const ordenadas = Object.keys(cervecerias).sort((a, b) => {
        const totalA = cervecerias[a].oro + cervecerias[a].plata + cervecerias[a].bronce;
        const totalB = cervecerias[b].oro + cervecerias[b].plata + cervecerias[b].bronce;
        return totalB - totalA;
    });
    
    const top15 = ordenadas.slice(0, 15);
    const nombres = top15;
    const oroData = nombres.map(n => cervecerias[n].oro);
    const plataData = nombres.map(n => cervecerias[n].plata);
    const bronceData = nombres.map(n => cervecerias[n].bronce);
    
    if (rankingChart) {
        rankingChart.destroy();
    }
    
    const ctx = document.getElementById('rankingChart').getContext('2d');
    
    rankingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [
                {
                    label: '🥇 Oro',
                    data: oroData,
                    backgroundColor: '#f7c32f',
                    borderColor: '#f7c32f',
                    borderWidth: 1,
                    stack: 'stack'
                },
                {
                    label: '🥈 Plata',
                    data: plataData,
                    backgroundColor: '#94a3b8',
                    borderColor: '#94a3b8',
                    borderWidth: 1,
                    stack: 'stack'
                },
                {
                    label: '🥉 Bronce',
                    data: bronceData,
                    backgroundColor: '#d97706',
                    borderColor: '#d97706',
                    borderWidth: 1,
                    stack: 'stack'
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw;
                            return `${label}: ${value} medalla${value !== 1 ? 's' : ''}`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: { size: 14 }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Medallas',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Cervecerías',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', crearRanking);
