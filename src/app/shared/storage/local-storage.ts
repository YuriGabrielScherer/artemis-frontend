export class CustomLocalStorage {

    private static readonly isMenuToggledProperty = 'isMenuToggled';

    static isMenuToggled(): boolean {
        return localStorage.getItem(this.isMenuToggledProperty) == 'true';
    }

    static toggleMenu(): void {
        localStorage.setItem(this.isMenuToggledProperty, this.isMenuToggled() ? 'true' : 'false');
    }

}