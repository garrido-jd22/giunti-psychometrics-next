import { CONTACT_SUBMIT_DELAY_MS } from "@/config/contact";
import type { ContactFormValues } from "@/interfaces/contact.interface";

/** Envío simulado del formulario de contacto. */
export async function sendContactMessage(values: ContactFormValues): Promise<void> {
    void values;
    await new Promise((resolve) => setTimeout(resolve, CONTACT_SUBMIT_DELAY_MS));
}
