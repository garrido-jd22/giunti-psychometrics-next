import { CONTACT_RULES } from "@/config/contact";
import type { ContactFormErrors, ContactFormValues } from "@/interfaces/contact.interface";

// Algo@algo.dominio (dominio de al menos 2 letras), sin espacios.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validación pura: devuelve solo los campos con error. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
    const errors: ContactFormErrors = {};
    const firstName = values.firstName.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!firstName) {
        errors.firstName = "Il nome è obbligatorio.";
    } else if (firstName.length < CONTACT_RULES.firstNameMinLength) {
        errors.firstName = `Il nome deve contenere almeno ${CONTACT_RULES.firstNameMinLength} caratteri.`;
    }

    if (!email) {
        errors.email = "L'email è obbligatoria.";
    } else if (!EMAIL_PATTERN.test(email)) {
        errors.email = "Inserisci un indirizzo email valido (es. nome@dominio.it).";
    }

    if (!message) {
        errors.message = "Il messaggio è obbligatorio.";
    } else if (message.length < CONTACT_RULES.messageMinLength) {
        errors.message = `Il messaggio deve contenere almeno ${CONTACT_RULES.messageMinLength} caratteri.`;
    }

    return errors;
}
