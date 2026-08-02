/**
 * Til holatini sahifalar orasida saqlash.
 *
 * Astro komponent skriptlari ES modul sifatida yig'iladi, brauzer esa har bir
 * modulni sessiya davomida faqat BIR MARTA bajaradi. ClientRouter bilan
 * sahifaga qayta kirilganda skript qayta ishlamaydi — natijada sahifa o'zining
 * SSR holatida, ya'ni o'zbek tilida qolib ketadi.
 *
 * Shuning uchun `astro:page-load` ga ulanamiz — u har navigatsiyada ishlaydi.
 */

export type Lang = 'uz' | 'en';

export const currentLang = (): Lang =>
  (localStorage.getItem('lang') as Lang) || 'uz';

/**
 * `apply` uch holatda chaqiriladi: hozir, har sahifa yuklanganda va
 * til almashtirilganda. DOM tugunlari har navigatsiyada almashadi, shuning
 * uchun `apply` ichida elementlarni har safar qaytadan qidirish kerak —
 * tashqarida saqlangan havola eskirgan tugunga ishora qiladi.
 */
export function onLang(apply: (lang: Lang) => void): void {
  const run = () => apply(currentLang());
  run();
  document.addEventListener('astro:page-load', run);
  document.addEventListener('langchange', (e) => apply((e as CustomEvent).detail as Lang));
}
