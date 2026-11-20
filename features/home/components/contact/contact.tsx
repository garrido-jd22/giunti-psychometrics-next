"use client";

import { ArrowRight, Check, CheckCircle2, LoaderCircle } from "lucide-react";
import FormField, { fieldControlClass } from "@/components/ui/form-field";
import { CONTACT_RULES, CONTACT_SECTION_ID } from "@/config/contact";
import { useContactForm } from "@/hooks/use-contact-form";
import { toast } from "@/lib/services/toast.service";

function describedBy(id: string, error?: string, hasHint = false) {
    if (error) return `${id}-error`;
    return hasHint ? `${id}-hint` : undefined;
}

export default function Contact() {
    const { values, status, getError, handleChange, handleBlur, handleSubmit } = useContactForm({
        onSuccess: ({ firstName }) =>
            toast.success("Messaggio inviato", {
                description: `Grazie ${firstName.trim()}, ti risponderemo entro 24 ore lavorative.`,
            }),
        onInvalid: () =>
            toast.warning("Controlla i campi del modulo", {
                description: "Alcuni campi obbligatori sono vuoti o non validi.",
            }),
        onError: () =>
            toast.error("Invio non riuscito", {
                description: "Si è verificato un problema. Riprova tra qualche istante.",
            }),
    });

    const isSubmitting = status === "submitting";
    const isSuccess = status === "success";

    const firstNameError = getError("firstName");
    const emailError = getError("email");
    const messageError = getError("message");
    const messageLength = values.message.trim().length;

    return (
        <section
            id={CONTACT_SECTION_ID}
            className="scroll-mt-24 w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans"
        >
            <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
                <div className="lg:col-span-5 flex flex-col items-start motion-safe:animate-fade-up">
                    <h2 className="text-4xl sm:text-5xl md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.06] text-[#0F2D52] dark:text-[#EFF6FF]">
                        Mettiti in <span className="text-[#1B4F8A] dark:text-[#0EA5E9]">—</span>
                        <br />
                        contatto con noi
                    </h2>

                    <p className="mt-5 text-[14.5px] leading-[1.65] text-[#0F2D52]/80 dark:text-[#EFF6FF]/80 max-w-[430px]">
                        Siamo qui per aiutarti! Che tu abbia una domanda sui nostri test
                        psicometrici, necessiti di assistenza con il tuo account o voglia
                        maggiori informazioni sui corsi, il nostro team è pronto a
                        supportarti.
                    </p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <span className="block text-[12.5px] font-medium text-[#0F2D52]/60 dark:text-[#EFF6FF]/60 mb-1">
                                Email:
                            </span>
                            <a
                                href="mailto:info@giuntipsy.com"
                                className="text-[19px] sm:text-[21px] font-semibold tracking-tight text-[#0F2D52] hover:text-[#0EA5E9] dark:text-[#EFF6FF] dark:hover:text-[#0EA5E9] transition-colors"
                            >
                                info@giuntipsy.com
                            </a>
                        </div>

                        <div>
                            <span className="block text-[12.5px] font-medium text-[#0F2D52]/60 dark:text-[#EFF6FF]/60 mb-1">
                                Telefono:
                            </span>
                            <a
                                href="tel:+390556236501"
                                className="block text-[19px] sm:text-[21px] font-semibold tracking-tight text-[#0F2D52] hover:text-[#0EA5E9] dark:text-[#EFF6FF] dark:hover:text-[#0EA5E9] transition-colors"
                            >
                                +39 055 623 6501
                            </a>
                            <span className="block mt-1 text-[12px] text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">
                                Disponibile dal lunedì al venerdì, 09:00 – 18:00 CET
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]">
                    <div className="relative overflow-hidden rounded-[28px] p-6 sm:p-9 bg-white/85 dark:bg-[#11223A]/85 backdrop-blur-md shadow-[0_10px_35px_rgb(15,45,82,0.06)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.3)]">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full hidden dark:block dark:bg-[radial-gradient(circle,rgba(56,189,248,0.55)_0%,rgba(14,165,233,0.30)_35%,rgba(125,211,252,0.12)_55%,transparent_72%)] blur-2xl"
                        />

                        <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField id="firstName" label="Nome" required error={firstNameError}>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-required="true"
                                        aria-invalid={Boolean(firstNameError)}
                                        aria-describedby={describedBy("firstName", firstNameError)}
                                        placeholder="Inserisci il tuo nome..."
                                        className={fieldControlClass(Boolean(firstNameError), "h-11 px-4")}
                                    />
                                </FormField>

                                <FormField id="lastName" label="Cognome">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Inserisci il tuo cognome..."
                                        className={fieldControlClass(false, "h-11 px-4")}
                                    />
                                </FormField>
                            </div>

                            <FormField id="email" label="Email" required error={emailError}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-required="true"
                                    aria-invalid={Boolean(emailError)}
                                    aria-describedby={describedBy("email", emailError)}
                                    placeholder="Inserisci il tuo indirizzo email..."
                                    className={fieldControlClass(Boolean(emailError), "h-11 px-4")}
                                />
                            </FormField>

                            <FormField
                                id="message"
                                label="Come possiamo aiutarti?"
                                required
                                error={messageError}
                                hint={`Minimo ${CONTACT_RULES.messageMinLength} caratteri · ${messageLength} scritti`}
                            >
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-required="true"
                                    aria-invalid={Boolean(messageError)}
                                    aria-describedby={describedBy("message", messageError, true)}
                                    placeholder="Scrivi qui il tuo messaggio..."
                                    className={fieldControlClass(Boolean(messageError), "p-4 resize-none")}
                                />
                            </FormField>

                            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                {isSuccess ? (
                                    <div
                                        role="status"
                                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[14px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                                    >
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        <span>Messaggio inviato correttamente. Ti risponderemo presto.</span>
                                    </div>
                                ) : (
                                    <span className="text-[13px] text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">
                                        Risposta garantita entro 24 ore lavorative.
                                    </span>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting}
                                    className={`inline-flex items-center justify-center gap-3 h-11 pl-6 pr-2 rounded-full text-[15px] font-semibold text-white disabled:opacity-70 disabled:cursor-wait transition-colors shadow-sm self-end cursor-pointer ${isSuccess ? "bg-emerald-600 hover:bg-emerald-500" : "bg-[#1B4F8A] hover:bg-[#0EA5E9]"}`}
                                >
                                    <span>
                                        {isSubmitting ? "Invio in corso..." : isSuccess ? "Inviato" : "Invia Messaggio"}
                                    </span>
                                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                                        {isSubmitting ? (
                                            <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                                        ) : isSuccess ? (
                                            <Check className="w-3.5 h-3.5" />
                                        ) : (
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
