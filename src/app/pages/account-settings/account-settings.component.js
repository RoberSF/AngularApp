"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AccountSettingsComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var AccountSettingsComponent = /** @class */ (function () {
    // esto vale para acceder a todo el DOM
    function AccountSettingsComponent(_document, SettingsService) {
        this._document = _document;
        this.SettingsService = SettingsService;
        this.SettingsService.loadSettings();
    }
    AccountSettingsComponent.prototype.ngOnInit = function () {
    };
    AccountSettingsComponent.prototype.changeColor = function (theme, link) {
        this.aplicarCheck(link);
        // // cojo la url que se hace referencia en el index.html
        var url = "assets/css/colors/" + theme + ".css";
        // // accedo al "id=theme" que está en el index y con set attribute le digo que a ese atributo le ponga el 2º parámetro(url)
        this._document.getElementById('theme').setAttribute('href', url);
        // // pasamos los datos de settings al servicio
        this.SettingsService.settings.theme = theme;
        this.SettingsService.settings.themeUrl = url;
        // // guardamos los ajustes en el localstorage
        this.SettingsService.saveSettings();
        // //hacemos que esto se cargue desde el principio, por tanto, vamos al app.component.ts 
        this.SettingsService.applyTheme(theme);
    };
    AccountSettingsComponent.prototype.aplicarCheck = function (link) {
        var selectores = document.getElementsByClassName('selector');
        for (var _i = 0, selectores_1 = selectores; _i < selectores_1.length; _i++) {
            var ref = selectores_1[_i];
            ref.classList.remove('working');
        }
        link.classList.add('working');
    };
    AccountSettingsComponent.prototype.checkAfterLoadTheme = function () {
        var selectors = document.getElementsByClassName('selector');
        var themeAfterLoad = this.SettingsService.settings.theme;
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var ref = selectors_1[_i];
            ref.classList.remove('working');
            if (ref.getAttribute('data-theme') === themeAfterLoad) {
                ref.classList.add('working');
                break; // sale del ciclo for
            }
        }
    };
    AccountSettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-account-settings',
            templateUrl: './account-settings.component.html',
            styleUrls: ['./account-settings.component.scss']
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT))
    ], AccountSettingsComponent);
    return AccountSettingsComponent;
}());
exports.AccountSettingsComponent = AccountSettingsComponent;
