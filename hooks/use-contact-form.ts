"use client";

import {
    useCallback,
    useMemo,
    useState,
    type ChangeEvent,
    type FocusEvent,
    type FormEvent,
} from "react";
import { CONTACT_FIELD_ORDER, INITIAL_CONTACT_VALUES } from "@/config/contact";
import type {
    ContactField,
    ContactFormStatus,
    ContactFormValues,
} from "@/interfaces/contact.interface";
import { sendContactMessage } from "@/lib/services/contact.service";
import { validateContactForm } from "@/lib/validation/contact";

interface UseContactFormOptions {
    onSuccess?: (values: ContactFormValues) => void;
    onInvalid?: () => void;
    onError?: () => void;
}

/** Estado y validación del formulario de contacto. */
export function useContactForm({ onSuccess, onInvalid, onError }: UseContactFormOptions = {}) {
    const [values, setValues] = useState<ContactFormValues>(INITIAL_CONTACT_VALUES);
    const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [status, setStatus] = useState<ContactFormStatus>("idle");

    const errors = useMemo(() => validateContactForm(values), [values]);
    const isValid = Object.keys(errors).length === 0;

    const getError = useCallback(
        (field: ContactField) => (touched[field] || submitAttempted ? errors[field] : undefined),
        [errors, touched, submitAttempted]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;
            setValues((prev) => ({ ...prev, [name]: value }));
            // Si el usuario vuelve a escribir tras enviar, se quita el estado de éxito.
            setStatus((prev) => (prev === "success" ? "idle" : prev));
        },
        []
    );

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as ContactField;
        setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === "submitting") return;
        setSubmitAttempted(true);

        if (!isValid) {
            // Lleva el foco al primer campo con error.
            const firstInvalid = CONTACT_FIELD_ORDER.find((field) => errors[field]);
            const element = firstInvalid && event.currentTarget.elements.namedItem(firstInvalid);
            if (element instanceof HTMLElement) element.focus();
            onInvalid?.();
            return;
        }

        setStatus("submitting");
        try {
            await sendContactMessage(values);
            setStatus("success");
            onSuccess?.(values);
            setValues(INITIAL_CONTACT_VALUES);
            setTouched({});
            setSubmitAttempted(false);
        } catch {
            setStatus("idle");
            onError?.();
        }
    };

    return {
        values,
        status,
        getError,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}
