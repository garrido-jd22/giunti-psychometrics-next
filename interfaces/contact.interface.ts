export interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export type ContactField = keyof ContactFormValues;

/** Un mensaje de error por campo; si no hay clave, el campo es válido. */
export type ContactFormErrors = Partial<Record<ContactField, string>>;

export type ContactFormStatus = "idle" | "submitting" | "success";
