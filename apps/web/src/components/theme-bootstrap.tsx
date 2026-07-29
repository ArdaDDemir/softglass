/**
 * Runs before paint to avoid theme flash.
 * Keep this tiny — only sets data-softglass-theme from localStorage.
 */
export function ThemeBootstrap() {
  const code = `(function(){try{var k='softglass-theme';var t=localStorage.getItem(k);var ok=['aurora','obsidian','mist','pearl'];if(ok.indexOf(t)===-1)t='aurora';document.documentElement.setAttribute('data-softglass-theme',t);}catch(e){document.documentElement.setAttribute('data-softglass-theme','aurora');}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
