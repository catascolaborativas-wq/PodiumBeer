// table.js - Tabla con efecto BLUR
async function crearTabla() {
    const datos = await obtenerMedallas();
    const tbody = document.getElementById('tableBody');
    
    if (!datos || datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">No hay datos para mostrar</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    const mostrar = datos.slice(0, 100);
    
    mostrar.forEach(item => {
        const fila = document.createElement('tr');
        
        let colorMedalla = '';
        if (item.medalla_base === 'Oro') colorMedalla = 'color: #f7c32f; font-weight: bold;';
        else if (item.medalla_base === 'Plata') colorMedalla = 'color: #94a3b8; font-weight: bold;';
        else if (item.medalla_base === 'Bronce') colorMedalla = 'color: #d97706; font-weight: bold;';
        
        fila.innerHTML = `
            <td>${item.certamen || '-'}</td>
            <td>${item.pais || '-'}</td>
            <td>${item.estilo || '-'}</td>
            <td style="${colorMedalla}">${item.medalla_base || '-'}</td>
            <td>${item.fecha || '-'}</td>
            <td class="blur-column">${item.cerveceria || '-'}</td>
            <td class="blur-column">${item.cerveza_ganadora || '-'}</td>
        `;
        
        tbody.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', crearTabla);
