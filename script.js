// ==========================================
// QR Generator App - Versión Optimizada
// ==========================================

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    app.focusFirstField();
});

// Configuración de la aplicación
const CONFIG = {
    MUNICIPALITY: 'MUNICIPALIDAD DE QUETZALTENANGO',
    QR_API: 'https://quickchart.io/chart',
    QR_OPTIONS: {
        cht: 'qr',
        chs: '520x520',
        chld: 'L|0'
    }
};

// Aplicación principal
const app = new Vue({
    el: '#app',
    data: {
        codigo: '',
        dependencia: '',
        ddescripcion: '',
        valor: '',
        descripcion: '',
        expediente: '',
        renglon: '',
        contabilidad: '',
        periodo: '',
        frame: ''
    },
    methods: {
        // Actualizar QR cuando cambia algún campo
        apiQR() {
            this.updateFrameImage();
            this.updateQRCode();
        },

        // Actualizar imagen de fondo con el período
        updateFrameImage() {
            if (this.periodo) {
                const frameImage = `images/${this.periodo}.png`;
                document.getElementById('base').src = frameImage;
                this.frame = frameImage;
            }
        },

        // Generar y actualizar el código QR
        updateQRCode() {
            const qrContent = this.formatQRContent();
            const encodedContent = encodeURIComponent(qrContent);
            
            const qrUrl = `${CONFIG.QR_API}?cht=${CONFIG.QR_OPTIONS.cht}&chl=${encodedContent}&chs=${CONFIG.QR_OPTIONS.chs}&chld=${CONFIG.QR_OPTIONS.chld}`;
            
            const qrElement = document.querySelector('.qr-code');
            if (qrElement) {
                qrElement.src = qrUrl;
            }
        },

        // Formatear contenido del QR
        formatQRContent() {
            return `${CONFIG.MUNICIPALITY}: PERIODO: ${this.periodo} DEPENDENCIA: ${this.dependencia}; CÓDIGO: ${this.codigo}; DESCRIPCIÓN: ${this.ddescripcion}; VALOR: ${this.valor}; EXPEDIENTE: ${this.expediente}; RENGLON: ${this.renglon}; CONTABILIDAD: ${this.contabilidad}`;
        },

        // Descargar el QR como imagen
        generarQR() {
            const container = document.getElementById('capture');
            const filename = `${this.codigo || 'QR'}.png`;

            html2canvas(container, { 
                allowTaint: true, 
                useCORS: true 
            }).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = filename;
                link.click();
            }).catch(error => {
                console.error('Error generando QR:', error);
                alert('Hubo un error al generar el QR');
            });
        },

        // Limpiar formulario
        limpiarFormulario() {
            this.codigo = '';
            this.dependencia = '';
            this.ddescripcion = '';
            this.valor = '';
            this.descripcion = '';
            this.expediente = '';
            this.renglon = '';
            this.contabilidad = '';
            this.periodo = '';
            this.frame = '';
            
            // Limpiar imágenes
            document.getElementById('base').src = 'images/Frame_01.png';
            document.querySelector('.qr-code').src = '';
            
            // Enfocar el primer campo
            this.focusFirstField();
        },

        // Enfocar el primer campo
        focusFirstField() {
            const firstInput = document.getElementById('Periodo');
            if (firstInput) firstInput.focus();
        }
    },
    computed: {
        // Descripción completa para mostrar
        midescripcion() {
            return this.formatQRContent();
        }
    },
    watch: {
        // Observar cambios en los campos principales
        periodo() { this.apiQR(); },
        dependencia() { this.apiQR(); },
        codigo() { this.apiQR(); },
        ddescripcion() { this.apiQR(); },
        valor() { this.apiQR(); },
        expediente() { this.apiQR(); },
        renglon() { this.apiQR(); },
        contabilidad() { this.apiQR(); }
    }
});