import type { ContactField, ContactFormValues } from "@/interfaces/contact.interface";

export const CONTACT_RULES = {
    firstNameMinLength: 2,
    messageMinLength: 10,
} as const;

export const INITIAL_CONTACT_VALUES: ContactFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
};

/** Orden en que se enfoca el primer campo inválido al enviar. */
export const CONTACT_FIELD_ORDER: ContactField[] = ["firstName", "lastName", "email", "message"];

/** id de la sección de contacto (ancla de los botones "Contattaci"). */
export const CONTACT_SECTION_ID = "contatti";

/** Enlace absoluto: funciona también desde otras páginas (p. ej. /products). */
export const CONTACT_HREF = `/#${CONTACT_SECTION_ID}`;

/** Envío simulado (no hay backend). */
export const CONTACT_SUBMIT_DELAY_MS = 1000;
