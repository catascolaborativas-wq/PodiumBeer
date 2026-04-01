// Configuración de Supabase
const SUPABASE_URL = "https://jqinutwfunthyzhklqeig.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaW51dHdmdW10eWh6a2xxZWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMTg5MTAsImV4cCI6MjA5MDU5NDkxMH0.GJY8bnuYi556G4mZW1Tx-c7eFeTXSN8TM22bXtiUVMs";

// Crear cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener datos de medallas
async function obtenerMedallas() {
    try {
        const { data, error } = await supabase
            .from('medallas')
            .select('*');
        
        if (error) {
            console.error('Error de Supabase:', error);
            return [];
        }
        
        console.log('Datos cargados:', data ? data.length : 0);
        return data || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
