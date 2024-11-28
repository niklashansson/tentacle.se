import { closeDropdown } from '@finsweet/ts-utils';

export const weglot = function () {
  Weglot.initialize({
    api_key: 'wg_b2c20877559e9c50f8efcef6f6c110511',
    // switchers: {
    //   hide_switcher: true,
    // },
  });

  Weglot.on('initialized', () => {
    const currentLang = Weglot.getCurrentLang();
    updateLangSwitcher(currentLang);
  });

  document.querySelectorAll('[weglot-element="wrapper"] [lang]').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const lang = this.getAttribute('lang');

      Weglot.switchTo(lang);
      updateLangSwitcher(lang);

      const dropdownEl = document.querySelector('[weglot-element="dropdown"]') as HTMLDivElement;

      closeDropdown(dropdownEl);
    });
  });
};

function updateLangSwitcher(currentLang) {
  const wrapper = document.querySelector('[weglot-element="wrapper"]');
  const toggle = wrapper?.querySelector('.w-dropdown-toggle');

  if (toggle?.getAttribute('lang') !== currentLang) {
    const activeLangLink = wrapper?.querySelector(`[lang="${currentLang}"]`);
    const toggleTxt = toggle?.querySelector('[weglot-element="active-lang-text"]')?.textContent;
    const activeLangLinkTxt = activeLangLink?.textContent;

    toggle.querySelector('[weglot-element="active-lang-text"]').textContent = activeLangLinkTxt;
    activeLangLink.textContent = toggleTxt;

    const lang = activeLangLink?.getAttribute('lang');
    const toggleLang = toggle?.getAttribute('lang');

    toggle?.setAttribute('lang', lang);
    activeLangLink?.setAttribute('lang', toggleLang);
  }

  //   if (wrapper?.querySelector('.w-dropdown-toggle')?.getAttribute('lang') !== currentLang) {
  //     const activeLangLink = wrapper?.querySelector(`[lang="${currentLang}"]`);

  //     // swap the dropdown toggle's text with current active lang link text
  //     const toggle = wrapper?.querySelector('.w-dropdown-toggle');
  //     const toggleTxt = toggle?.querySelector('[weglot-element="active-lang-text"]');

  //     const activeLangLinkText = activeLangLink?.textContent;

  //     toggleTxt.textContent = activeLangLinkText;
  //     activeLangLink.textContent = toggleTxt;

  //     // swap the dropdown toggle's lang attr with the current active lang link attr
  //     const lang = activeLangLink?.getAttribute('lang');
  //     const toggleLang = toggle?.getAttribute('lang');
  //     toggle?.setAttribute('lang', lang);
  //     activeLangLink?.setAttribute('lang', toggleLang);
  //   }
}
