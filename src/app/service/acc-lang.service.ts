import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccLangService {
  private defaultLang = 'en';

  getLanguage(): string {
    return localStorage.getItem('language') || this.defaultLang;
  }

  setLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
