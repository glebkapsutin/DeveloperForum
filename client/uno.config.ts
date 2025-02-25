import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
    presets: [
        presetUno(), // Базовые классы
        presetAttributify(), // Альтернативная запись стилей через атрибуты
        presetIcons(), // Иконки (если нужны)
    ],
});
