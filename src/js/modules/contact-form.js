/**
 * src/js/modules/contact-form.js
 * Arquitectura: ES6 Modular | Frontend nativo
 *
 * 1. Precarga del servicio (flujo heredado de la versión antigua):
 *    servicios.html (modal "Cotizar este servicio") y suscripcion-floral.html
 *    ("Seleccionar Plan") enlazan a contacto.html?service=<nombre>. Este módulo
 *    lee ese parámetro y preselecciona la opción en el <select>.
 *
 * 2. Envío por WhatsApp (plan original de la web antigua):
 *    al enviar el formulario se arma un mensaje ordenado con todos los datos
 *    y se abre wa.me con el texto listo. El cliente solo pulsa "Enviar".
 *
 * Seguridad: todo lo que viene de la URL o del formulario se trata como texto
 * (textContent / value / encodeURIComponent), nunca como HTML.
 */

const WHATSAPP_NUMBER = '56997702832';
const MAX_SERVICE_LENGTH = 80;
const OTHER_VALUE = 'Otro';

export function initContactForm() {
    const form = document.getElementById('contact-form');
    const select = document.getElementById('contact-service');
    if (!form || !select) return;

    preselectService(select);
    form.addEventListener('submit', (event) => handleSubmit(event, form));
}

/* ---------- 1. Precarga desde ?service= ---------- */

function preselectService(select) {
    const raw = new URLSearchParams(window.location.search).get('service');
    const service = raw?.trim().slice(0, MAX_SERVICE_LENGTH);
    if (!service) return;

    const options = Array.from(select.options);
    const match = options.find((opt) => opt.value === service);
    if (match) {
        select.value = match.value;
    } else {
        // Nombre desconocido: se agrega como opción para no perder la intención.
        const other = options.find((opt) => opt.value === OTHER_VALUE);
        select.insertBefore(new Option(service, service, true, true), other ?? null);
    }

    const notice = document.getElementById('service-notice');
    const noticeName = document.getElementById('service-notice-name');
    if (notice && noticeName) {
        noticeName.textContent = service;
        notice.classList.remove('hidden');
    }
}

/* ---------- 2. Envío por WhatsApp ---------- */

function handleSubmit(event, form) {
    event.preventDefault();

    // Red de seguridad: el navegador ya valida los "required" antes del
    // evento submit, pero se revalida por si el formulario se envió por código.
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (name) => String(data.get(name) ?? '').trim();

    const message = buildMessage({
        nombre: value('nombre'),
        email: value('email'),
        telefono: value('telefono'),
        servicio: value('servicio'),
        fecha: formatDate(value('fecha')),
        mensaje: value('mensaje'),
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Se abre en una pestaña nueva dentro del mismo gesto del usuario (clic),
    // así los bloqueadores de ventanas emergentes lo permiten. Si aun así se
    // bloquea, se navega en la misma pestaña para no perder el mensaje.
    const win = window.open(url, '_blank');
    if (win) {
        win.opener = null;
    } else {
        window.location.href = url;
    }

    const status = document.getElementById('form-status');
    if (status) {
        status.textContent = 'Abrimos WhatsApp con tu mensaje. Solo falta que pulses "Enviar" allí.';
    }
}

/**
 * Arma el texto con el formato de WhatsApp (*negrita*). Los campos
 * opcionales vacíos se omiten para que el mensaje quede limpio.
 */
function buildMessage({nombre, email, telefono, servicio, fecha, mensaje}) {
    const lines = [
        '*Nueva consulta desde el sitio web* 🌿',
        '',
        `*Nombre:* ${nombre}`,
        `*Email:* ${email}`,
    ];

    if (telefono) lines.push(`*Teléfono:* ${telefono}`);
    if (servicio) lines.push(`*Servicio de interés:* ${servicio}`);
    if (fecha) lines.push(`*Fecha del evento o entrega:* ${fecha}`);

    lines.push('', '*Mensaje:*', mensaje);

    return lines.join('\n');
}

/** "2026-09-25" (formato del <input type="date">) → "25-09-2026" */
function formatDate(isoDate) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
}