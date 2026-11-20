/** Servicio de tema (claro / oscuro). */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
const DARK_CLASS = "dark";
const THEME_CHANGE_EVENT = "theme-change";

function isTheme(value: unknown): value is Theme {
    return value === "light" || value === "dark";
}

/** Tema guardado por el usuario, o null si nunca eligió uno. */
export function getStoredTheme(): Theme | null {
    try {
        const value = localStorage.getItem(THEME_STORAGE_KEY);
        return isTheme(value) ? value : null;
    } catch {
        return null;
    }
}

/** Preferencia del sistema operativo. */
export function getSystemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Tema que debería estar activo (guardado > sistema). */
export function resolveTheme(): Theme {
    return getStoredTheme() ?? getSystemTheme();
}

/** Tema actualmente aplicado en el DOM. */
export function getAppliedTheme(): Theme {
    return document.documentElement.classList.contains(DARK_CLASS) ? "dark" : "light";
}

/** Pone o quita la clase `dark` en <html>. */
export function applyTheme(theme: Theme): void {
    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, theme === "dark");
    root.style.colorScheme = theme;
}

/** Aplica, persiste y notifica a los suscriptores. */
export function setTheme(theme: Theme): void {
    applyTheme(theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Sin localStorage: el tema solo dura la sesión.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function toggleTheme(): Theme {
    const next: Theme = getAppliedTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    return next;
}

/** Suscripción a cambios de tema (esta pestaña y otras pestañas). */
export function subscribeToTheme(callback: () => void): () => void {
    const onStorage = (event: StorageEvent) => {
        if (event.key !== THEME_STORAGE_KEY) return;
        applyTheme(resolveTheme());
        callback();
    };
    window.addEventListener(THEME_CHANGE_EVENT, callback);
    window.addEventListener("storage", onStorage);
    return () => {
        window.removeEventListener(THEME_CHANGE_EVENT, callback);
        window.removeEventListener("storage", onStorage);
    };
}

/** Script inline que se ejecuta en <head> antes del primer pintado para evitar el parpadeo (FOUC). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY
)});if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.toggle(${JSON.stringify(
    DARK_CLASS
)},t==="dark");r.style.colorScheme=t}catch(e){}})()`;
