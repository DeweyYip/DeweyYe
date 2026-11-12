(() => {
  const translations = new Map(Object.entries({
    'DeweyYe — Home': 'DeweyYe — 首頁',
    'DeweyYe — personal writing, projects and visual experiments.': 'DeweyYe 的個人寫作、專案和視覺實驗。',
    'Home': '首頁',
    'Writing': '寫作',
    'Projects': '專案',
    'About': '關於',
    'Contact': '聯絡',
    'Game': '遊戲',
    'Research': '研究',
    'Coming soon': '快來了',
    'COMING SOON': '快來了',
    'DEWEYYE / ABOUT': 'DEWEYYE / 關於',
    'ABOUT': '關於',
    'A NEW PAGE IS TAKING SHAPE.': '新頁面還在長。',
    'Story': '故事',
    'STORY': '故事',
    'Thoughts': '胡思亂想',
    'ARTICLE': '文章',
    'The Wind Blows': '風吹啊吹',
    '23 Therefore I am': '我二十三歲，故我在',
    'How do we not get lost in the age of AI': '在 AI 時代怎麼才不會迷路',
    'COMING IN 2027': '2027 年登場',
    'COMING IN DECEMBER': '十二月登場',
    'PLANET': '星球',
    'Slime Blindbox': '史萊姆盲盒',
    'I GOT': '我有',
    'OPINIONS,': '一些意見，',
    'UNFORTUNATELY': '很不幸。',
    'SOME OF THESE WILL AGE BADLY.': '有些話以後會很糗。',
    'Oh well': '唉，算了。',
    'u think ur so funny': '你覺得自己超好笑',
    'and cool huh????': '又超酷，是不是？？？？',
    'well u are': '欸，你還真的是',
    'love u': '愛你',
    '“The first draft of anything is shit”': '「任何東西的初稿都是一坨屎。」',
    '— Ernest Hemingway': '—— 海明威',
    'EST. 2026': '始於 2026',
    'DeweyYe home': '回 DeweyYe 首頁',
    'Main navigation': '主選單',
    'Featured writing': '精選寫作',
    'Read The wind blows': '閱讀〈風吹啊吹〉',
    'Read 23, Therefore I Am': '閱讀〈我二十三歲，故我在〉',
    'Read How do we not get lost in the age of AI': '閱讀〈在 AI 時代怎麼才不會迷路〉',
    'A hand-painted ice cream on cardboard': '紙板上手繪的冰淇淋',
    'A hand-painted robot on cardboard': '紙板上手繪的機器人',
    'A hand-painted typewriter on cardboard': '紙板上手繪的打字機',
    'Peel back the tape to reveal the space underneath': '撕開膠帶，看看下面寫了什麼',
    'Flip cardboard to reveal a Hemingway quote': '翻開紙板，看看海明威的話',
    'Open the cardboard seal to reveal a quote': '打開紙板封口，看看下面的引言',
    'Back to home': '返回首頁',
    'Back to writing': '返回寫作',
    'Back to projects': '返回專案',
    'A creature with a star-shaped tail glowing pink against deep blue': '深藍色背景上，一隻星形尾巴發著粉光的小生物',
    'Press to squish the cheesecake': '按下去壓扁起司蛋糕',
    'Blueberry cheesecake with glossy red topping': '淋著亮紅色果醬的藍莓起司蛋糕',
    'Language': '語言',
  }));

  const translate = (text) => {
    const titleSuffix = ' — DeweyYe';
    if (text.endsWith(titleSuffix)) {
      const name = text.slice(0, -titleSuffix.length);
      return (translations.get(name) ?? name) + titleSuffix;
    }
    return translations.get(text) ?? text;
  };

  const changes = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement.closest('script, style, [data-only-language], [data-language-picker]')) continue;
    const original = node.nodeValue;
    const english = original.trim();
    const chinese = translate(english);
    if (english !== chinese) changes.push((zh) => {
      node.nodeValue = zh ? original.replace(english, chinese) : original;
    });
  }
  for (const element of document.querySelectorAll('[aria-label], [alt], meta[name="description"]')) {
    for (const attribute of ['aria-label', 'alt', 'content']) {
      const english = element.getAttribute(attribute);
      if (!english) continue;
      const chinese = translate(english);
      if (english !== chinese) changes.push((zh) => element.setAttribute(attribute, zh ? chinese : english));
    }
  }

  const key = 'deweyye-language';
  const picker = document.querySelector('[data-language-picker]');
  const choices = [...document.querySelectorAll('[data-language]')];
  const apply = (language) => {
    const zh = language === 'zh-Hant';
    document.documentElement.lang = zh ? 'zh-Hant' : 'en';
    changes.forEach(update => update(zh));
    for (const element of document.querySelectorAll('[data-only-language]')) {
      element.hidden = element.dataset.onlyLanguage !== document.documentElement.lang;
    }
    for (const button of choices) {
      button.setAttribute('aria-pressed', String(button.dataset.language === document.documentElement.lang));
    }
  };

  let saved;
  try { saved = localStorage.getItem(key); } catch {}
  apply(saved);
  for (const button of choices) {
    button.addEventListener('click', () => {
      try { localStorage.setItem(key, button.dataset.language); } catch {}
      apply(button.dataset.language);
      picker.open = false;
      picker.querySelector('summary').focus();
    });
  }
  if (picker) {
    picker.addEventListener('keydown', event => {
      if (event.key === 'Escape' && picker.open) {
        picker.open = false;
        picker.querySelector('summary').focus();
      }
    });
    document.addEventListener('click', event => {
      if (!picker.contains(event.target)) picker.open = false;
    });
  }
  window.addEventListener('pageshow', () => {
    try { apply(localStorage.getItem(key)); } catch {}
  });
})();
