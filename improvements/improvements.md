# Table of Contents

- [Husky and eslint as actions #933](#husky-and-eslint-as-actions-933)

- [Task 1: Apply husky git hook to specific branch only #186](#task-1-apply-husky-git-hook-to-specific-branch-only-186)

- [Task 2: Import no cycle issue #1286](#task-2-import-no-cycle-issue-1286)

- [Task 3: Enable and connect react parser #1279](#task-3-enable-and-connect-react-parser-1279)

- [Task 4: Well it is not good. can be improved with lodash #1246](#task-4-well-it-is-not-good-can-be-improved-with-lodash-1246)

- [Task 5: I propose to move inner things of this method into Replace runConfigure #1166](#task-5-i-propose-to-move-inner-things-of-this-method-into-replace-runconfigure-1166)

- [Task 6: Replace this layout with plain v3 layout #1165](#task-6-replace-this-layout-with-plain-v3-layout-1165)

- [Task 7: Enable const messages #1110](#task-7-enable-const-messages-1110)

- [Task 8: Vadim wants to add issue templates, restrict who and how can do merges into the main branch #1109](#task-8-vadim-wants-to-add-issue-templates-restrict-who-and-how-can-do-merges-into-the-main-branch-1109)

- [Task 9: Add here error handlers from domain error handle #1021](#task-9-add-here-error-handlers-from-domain-error-handle-1021)

- [Task 10: #1038](#task-10-1038)

- [Husky and eslint as actions #9333](#husky-and-eslint-as-actions-9333)

- [Task 11: Logger](#task-11-logger)

- [Task 12](#task-12)

- [Task 13](#task-13)

- [Task 14](#task-14)

- [Task 15](#task-15)


# Husky and eslint as actions [#933](https://github.com/LLazyEmail/markdown-to-email/issues/933)

## Task 1: Apply husky git hook to specific branch only #186


link: 

- https://github.com/typicode/husky/issues/186

- https://stackoverflow.com/questions/53895745/use-git-hooks-for-certain-branches-with-husky-and-git-branch-is

- https://blog.theodo.com/2018/07/protect-git-branches-husky/

- https://blog.logrocket.com/build-robust-react-app-husky-pre-commit-hooks-github-actions/

- https://npm.io/package/validate-branch-name

- https://www.freecodecamp.org/news/how-to-add-commit-hooks-to-git-with-husky-to-automate-code-tasks/



## Husky and eslint as actions #9333

typicode/husky#186

https://stackoverflow.com/questions/53895745/use-git-hooks-for-certain-branches-with-husky-and-git-branch-is
https://blog.theodo.com/2018/07/protect-git-branches-husky/

https://blog.logrocket.com/build-robust-react-app-husky-pre-commit-hooks-github-actions/

https://npm.io/package/validate-branch-name

https://www.freecodecamp.org/news/how-to-add-commit-hooks-to-git-with-husky-to-automate-code-tasks/

---



## Task 2: Import no cycle issue #1286

![import/no-cycle issue #1286](https://user-images.githubusercontent.com/1469198/178752138-476b7e4d-f251-4887-94ce-b903f0621b5a.png "import/no-cycle issue #1286")

я пока просто уберу эту ошибку, но нужно будет подумать. вохможно моя структура хрень


## Task 3: Enable and connect react parser #1279

![5](https://user-images.githubusercontent.com/1469198/179402426-6952843f-ae94-4f1a-87c0-f8563c448eab.png "5")

## Task 4: Well it is not good can be improved with lodash #1246

markdown-to-email/src/callbacks/html/methods/br.js

Line 11 in 
```
 // TODO well, it's not good. can be improved with lodash 
 
 
import { newLine } from '../helpers';

import { commonReplace } from '../../../domain/replace-wrapper3.0';

// TODO figure out `text` argument
export function _br(text, newLines) {
  // TODO move out this regex into constants file.
  const regex = new RegExp(newLine, 'g');
  const arrNewLines = newLines.match(regex);

  // TODO well, it's not good. can be improved with lodash
  const result = arrNewLines.reduce(
    (acc, current, index) => (index > 0 ? `${acc}<br/>${current}` : current),
    '',
  );
  
  // console.log(result);
  return result;

  // TODO upgrade this method so it fix with out main logic
  
  
  // NOT FINISHED

  // debug: true
  // const params = {};

  // try {
  //   const replaced = commonReplace(config);

  //   return newLine + replaced;
  // } catch (error) {
  //   catch_error_trace_output(error);
  // }
}

export default _br;
```

## Task 5: I propose to move inner things of this method into Replace runConfigure #1166
```
Replacer.replaceMDBindedPreviewText = replaceMarkdownPreviewText.bind(state);

markdown-to-email/src/domain/replacer-class/configuration-plain.js

Line 13 

 // TODO I propose to move inner things of this method into Replace -> runConfigure() 
 

import {
    replaceMarkdown,
    // replaceMarkdownPreviewText,
  } from '../replace-markdown/replace-md';
  
  
   
  import Replacer from '../../parserMDHtml/replace';
  
  function configureReplacer(state) {


    // TODO I propose to move inner things of this method into Replace -> runConfigure()


    // CAN WE MOVE OUT CALLBACKS INTO REPLACER?????
    Replacer.replaceMDBinded = replaceMarkdown.bind(state);
  
    // I think this version isnt working well
    // Replacer.replaceMDBindedPreviewText = replaceMarkdownPreviewText.bind(state);
  
    // TODO crashed when here in FULL mode, needs to be fixed
    Replacer.previewText();
    // Replacer.replaceMDBindedPreviewText();
    // Replacer.comments();
    // ---
    Replacer.typography();
    Replacer.template();
  
    Replacer.miscellaneous();

  }

  export default configureReplacer;
```

## Task 6: Replace this layout with plain v3 layout #1165

markdown-to-email/src/domain/replace-markdown/pre-replace-objects.js
```
Line 54 in e0568c2

 // TODO replace this layout with plain v3 layout 
 

import _ from 'lodash';

import {
  _strong,
  _link,
  _blockquote,
  _meme,
  _header,
  _italic,
  _del,
  _q,
  _code,
  _hr,
  // _empty,
  //-----
  _ulList,
  _olList,
  getParsedSubList,
  //--------------
  _image,
  _paragraphWrapper,
  _sponsorship,
  _br,
  _separator,
  //
  _previewText,
} from '../../callbacks/callbacksHtml/index';

import {
  REGEXP_HEADER,
  REGEXP_IMAGE,
  REGEXP_LINK,
  REGEXP_STRONG,
  REGEXP_DEL,
  REGEXP_Q,
  REGEXP_CODE,
  REGEXP_UL_LIST,
  REGEXP_OL_LIST,
  REGEXP_BLOCKQUOTE,
  REGEXP_HR,
  REGEXP_BR,
  REGEXP_EM,
  REGEXP_SPONSORSHIP,
  REGEXP_MEM,
  REGEXP_PREVIEW_TEXT,
  REGEXP_PARAGRAPH,
  REGEXP_SEPARATOR,
} from '../../constants/index';

import { REGEXP_SUB_LISTS } from '../regular-expressions/';

// import misc from '../templates/OuterTemplate/layouts/misc';

// TODO replace this layout with plain v3 layout
import body from '../../templates/PlainJSOuterTemplate/layouts/body';
const { sponsorLiteral, previewTextLiteral } = body;

import objectBuilder from '../md/object-builder';


// TODO add here error handlers from domain/error-handle.
// removing them from this file

import {
  headingLiteral,
  titleLiteral,
  //---------
  imageLiteral,
  italicLiteral,
  linkLiteral,
  //-----
  listLiteral,
  listItemLiteral,
  //------------
  
  paragraphLiteral,
  strongLiteral,
  subtitleLiteral,
  separatorLiteral,
} from '../email-prototypes/plainjs/typography/index';





const strong = objectBuilder(REGEXP_STRONG, _strong, strongLiteral);
// console.log(strong);


const link = objectBuilder(REGEXP_LINK, _link, linkLiteral);

// delLiteral,
const del = objectBuilder(REGEXP_DEL, _del, false);


const image = objectBuilder(REGEXP_IMAGE, _image, imageLiteral);

const previewText = objectBuilder(
  REGEXP_PREVIEW_TEXT,
  _previewText,
  previewTextLiteral,
);





const listItem = objectBuilder(
  REGEXP_SUB_LISTS, 
  getParsedSubList, 
  listItemLiteral
);

// this object used only as a stupid way to add a parch for different cases of lists
// first two params never used
const list = objectBuilder(REGEXP_UL_LIST, getParsedSubList, listLiteral);

//  memeLiteral,
const memes = objectBuilder(REGEXP_MEM, _meme, false);


// 'REGEXP_EMPTY_UL': {
//   constant: REGEXP_EMPTY_UL,
//   replacer: emptyUl
// },

// 'REGEXP_EMPTY_OL': {
//   constant: REGEXP_EMPTY_OL,
//   replacer: emptyOl
// },

// 'REGEXP_EMPTY_BLOCKQUOTE': {
//   constant: REGEXP_EMPTY_BLOCKQUOTE,
//   replacer: emptyBlockQuote
// },

export default {
  strong,
  link,
 
};
```

## Task 7: Enable const messages #1110

```
import { WARNING_IMAGE_VERSION, ERROR_SOURCE_DONT_HAVE, FULL_TEMPLATE_ERROR, HTML_EMAIL_SUCCESS, HTML_EMAIL_ERROR } from './constants';

markdown-to-email/src/helper/command-line-methods.js

Line 9 in a052695

 // TODO enable const messages
 ```
 
```
/* eslint-disable no-use-before-define */
import chalk from 'chalk';
import { forEach } from 'lodash';

// import { readSourceFile } from './utils';

// TODO should we remake whole state as a class with "frozen" methods?

// TODO enable const messages
// import { WARNING_IMAGE_VERSION, ERROR_SOURCE_DONT_HAVE, FULL_TEMPLATE_ERROR, HTML_EMAIL_SUCCESS, HTML_EMAIL_ERROR } from './constants';

function checkWarnings(warnings) {
  forEach(warnings, (index, element) => {
    if (index) {
```

## Task 8: Vadim wants to add issue templates

from one of our last chats


## Task 9: Add here error handlers from domain error handle #1021

removing them from this file

markdown-to-email/src/domain/replace-markdown/pre-replace-objects.js

Line 80 in a7f26e5

 // TODO add here error handlers from domain/error-handle. 
 
```
import _ from 'lodash';
import { _previewText } from '../../callbacks/callbacksHtml/methods/simple';
import {
  _strong,
  
  _link,

  _br,
  _separator,
} from '../../callbacks/callbacksHtml/index';

import {
  REGEXP_HEADER,

  REGEXP_PARAGRAPH,
  REGEXP_SEPARATOR,
} from '../../constants/index';

// import misc from '../templates/OuterTemplate/layouts/misc';



import body from '../../templates/PlainJSOuterTemplate/layouts/body';

const { sponsorLiteral, previewTextLiteral } = body;



// import {
  // sponsor as sponsorLiteral 
  // sponsorComponent
  
  
  //strong as strongLiteral,

  //image as imageLiteral,
  //paragraph as paragraphLiteral,
  
// TODO add here error handlers from domain/error-handle.
// removing them from this file

import {
  headingLiteral,
  imageLiteral,


  subtitleLiteral,
  separatorLiteral 
} from '../plainjs-template/typography/index';

  
// console.log(paragraphLiteral);



  //strongLiteral,
const strong = objectBuilder(REGEXP_STRONG, _strong, strongLiteral);
// console.log(strong);


// as linkLiteral,  
const link = objectBuilder(REGEXP_LINK, _link, linkLiteral)

// console.log(header);

  //  qLiteral,
const q = objectBuilder(REGEXP_Q, _q, qLiteral)

  //   hrLiteral,

const hr = objectBuilder(REGEXP_HR, _hr, hrLiteral)


export default { 
  strong,   
  link, 

  memes ,
  separator, 
} 
```


## Task 11: Logger

- [Designing Error Messages and a Logging Strategy in Node.js](https://blog.appsignal.com/2021/11/03/designing-error-messages-and-a-logging-strategy-in-nodejs.html)
- [Npmlog](https://www.npmjs.com/package/npmlog)
- [How to use levels function in Logger](https://www.tabnine.com/code/javascript/functions/npmlog/Logger/levels)
- [Comparing Node.js logging tools](https://blog.logrocket.com/comparing-node-js-logging-tools/)
- [How to handle log events with the npmlog library?](https://stackoverflow.com/questions/72506435/how-to-handle-log-events-with-the-npmlog-library)



## Task 12

Почему я бы хотел чтобы мы быстрее разобрали mdx. Есть ощущение(которому больше чем год) - что возможно будет заменить работу нашего replacer`a.
но нужно подумать.



## Task 13

почему работа с подмодулями мне нравится. Потому что я легко могу раскидать модули на разные репозитории, настроить простые билды и легко дебажить и фиксить код.
делать коммиты и небоятся что все зафейлится.

нужно просто все настроить.



## Task 14

Почему хочется использовать реальный React components для быстрого запила templates.
таким макаром мы можем наконецто уйти от странных "темлпейтов" и делать блоки фронтенда с помощью тех средств, которые для этого предпочтительнее и реаль работают лучше.


## Task 15

Придумать как можно улучшить работу с кастомными реплейсерами:
sponsorship, memes, etc.

например sponsorship это блок текста + link, image + link

почему мы неможем сделать универсальный вариант, который внутрь _sponshorship бахнет text, link, image, link

наверное легче от этого не станет. Но мы сможем использовать эту логику в nmtg темплейте.

сборный replacer/callback

в nmtg есть блок рецептов. там 4 переменные внутри
- image
- link
- title
- subtitle

также можно посмотреть в markdown-it, но я думаю что это просто будет прожетуточный вариант и воможно нужно просто пропускать и сразу идти в MDX.
https://github.com/markdown-it/markdown-it#plugins-load


https://user-images.githubusercontent.com/1469198/180642690-d6ca3af5-f9eb-4a55-a7c3-cc851c342a3a.mp4




```
:::
![Recipe One](https://raw.githubusercontent.com/LLazyEmail/nomoretogo_email_template/main/data/images/recipe1.jpeg)
[recipe](https://www.nomoretogo.com/weekly-meal-plan-menu-122214/)
## Grilled Salmon with Chipotle Cream Sauce
### over Potato Poblano Hash and Broccolini

:::
```

**REGEXP_IMAGE, REGEXP_LINK, REGEXP_H2, REGEXP_H3**




---

## Task 16
Адаптер для подключения наших тем.
Например в основном генераторе нам не нужно устанавливать тысячу тем. Скорее это долно работать в обратном направлении.
Есть generator, есть тема, есть темплейт проекта который ты установил и там юзаешь.

---

## Task 17
Тесты приводить в порядок. 
- Есть централизация
- есть улучшение в процессе работы
- берем и дебажим



---


create a separated method that will generate a tree of components for content only case...



### create a custom tag that will skip our generator
sometimes everything is not ideal and i want to put something, like comment, that must be skipped and not wrapped with some blocks.

###

наверное нам нужно попробывать сделать\закончить отдельный метод, который позволит внутри текущего модуля генерировать DOM из react components. Основная идея простая - мне ненравится то что мы храним куски нашего email template в js файлах. это глупо. и в 2021 году есть гораздо более удобные и специфические задачи для этого. мы в ноябре начали подготовку к версии 2.0 генератора - которая темлейт будет хранить в react components и позволит нам играться
с другими вариантами layouts - при этом ничего не ломая.

Чуть позже нам нужно будет перегнать весь процесс на react - если захотите, можете посмотреть код внутри react ветки

чтобы не начинать переходить на версию 2.0 генератора и проверить - можем ли мы сделать дерево из react тегов - я перенес их в отдельную папку, с похожей структурой.

модуль, в котором хранится старая версия react components находится тут.
https://github.com/atherdon/markdown-to-email/blob/master/package/generator-react-components/package.json
нам этой версии сейчас будет достаточно, чтобы понять что эта идея работает, и что можно легко заменить на react components

probably it will be a great idea for doing it.


### validator of tags

https://github.com/pluralsight/htmlTagValidator
