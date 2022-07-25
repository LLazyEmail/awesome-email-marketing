# Table of Contents

- [Husky and eslint as actions #933](#husky-and-eslint-as-actions-933)

- [Apply husky git hook to specific branch only #186](#apply-husky-git-hook-to-specific-branch-only-186)

- [Import no cycle issue #1286](#import-no-cycle-issue-1286)

- [Enable and connect react parser #1279](#enable-and-connect-react-parser-1279)

- [Well it is not good. can be improved with lodash #1246](#well-it-is-not-good-can-be-improved-with-lodash-1246)

- [I propose to move inner things of this method into Replace runConfigure #1166](#i-propose-to-move-inner-things-of-this-method-into-replace-runconfigure-1166)

- [Replace this layout with plain v3 layout #1165](#replace-this-layout-with-plain-v3-layout-1165)

- [Enable const messages #1110](#enable-const-messages-1110)

- [Vadim wants to add issue templates, restrict who and how can do merges into the main branch #1109](#vadim-wants-to-add-issue-templates-restrict-who-and-how-can-do-merges-into-the-main-branch-1109)

- [Find a way to handle errors carefully [Important] #970](#find-a-way-to-handle-errors-carefully-important-970)

- [Add here error handlers from domain error handle #1021](#add-here-error-handlers-from-domain-error-handle-1021)

- [#1038](#1038)

- [Husky and eslint as actions #9333](#husky-and-eslint-as-actions-9333)

# Husky and eslint as actions [#933](https://github.com/LLazyEmail/markdown-to-email/issues/933)

## Task ## Apply husky git hook to specific branch only #186

Is there a way to configure husky to apply a specific git hook, i.e. prepush ONLY to a specific branch i.e. master?

I know I can modify the hooks in the package, but that makes it more complicated because husky installs its own hooks, then I have to go overwrite it with a modified version using some scripts.

Mainly the purpose is to only run e2e or unit tests before pushing to master, but not every time I push to dev (which gets annoying waiting and seeing the browsers popup every time).

I modified the pre-push hook like this and it works like a charm

#!/bin/sh
```
while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    if [ "master" == "$branch" ]; then

        # If we're on the Master branch, then Do something
        # Original Pre-push script from husky 0.14.3

      command_exists () {
        command -v "$1" >/dev/null 2>&1
      }

      has_hook_script () {
        [ -f package.json ] && cat package.json | grep -q "\"$1\"[[:space:]]*:"
      }

      cd "frontend"

      # Check if prepush script is defined, skip if not
      has_hook_script prepush || exit 0

      # Node standard installation
      export PATH="$PATH:/c/Program Files/nodejs"

      # Check that npm exists
      command_exists npm || {
        echo >&2 "husky > can't find npm in PATH, skipping prepush script in package.json"
        exit 0
      }

      # Export Git hook params
      export GIT_PARAMS="$*"

      # Run npm script
      echo "husky > npm run -s prepush (node `node -v`)"
      echo

      npm run -s prepush || {
        echo
        echo "husky > pre-push hook failed (add --no-verify to bypass)"
        exit 1
      }
    fi
done
```

Then I used this npm command line script to override the husky default hook
```
    "postinstall": "rimraf ../.git/hooks/pre-push && mklink /H \"../.git/hooks/pre-push\" \"config/git-hooks/pre-push.sh\"",
```
   
That deletes the original hook, then makes a hard link between the place where git looks for hooks and the new hook I created within my project directly. Works awesome.

It would be even nice if this can be some kind of config option. Just an idea. I hope this helps someone else.

Could you also accomplish this by checking what branch you're in within your package.json file? Something along the lines of this pseudo-code:

```
"prepush": "if branch is master; then npm run master_prepush; fi",
"master_prepush": "echo 'cool master stuff'"
```

I ended up using https://github.com/kevinoid/git-branch-is.
```
"prepush": "if git-branch-is master; then yarn test; fi"
```
When I try using git-branch-is i get the error "master was unexpected at this time." Any ideas?
```
"pre-commit": "if git-branch-is master; then lint-staged && git-authors-cli && npm run gen-docs && node tools/add-size-badge.js && git add package.json README.md docs/*; else echo 0; fi"
```
try this:
```
"pre-commit": "(git-branch-is master && lint-staged && git-authors-cli && npm run gen-docs && node tools/add-size-badge.js && git add package.json README.md docs/*) || true"
```
I ended up with this in order to limit the hooks to dev and master:
```
"husky": {
	"hooks": {
		"pre-commit": "branch=`git branch | grep \\* | cut -d ' ' -f2`;branchesToCheck=(\"dev\" \"master\"); [[ \" ${branchesToCheck[@]} \" =~ \" ${branch} \" ]] &&  yarn check-flow-lint || exit 0",
		"pre-push": "branch=`git branch | grep \\* | cut -d ' ' -f2`;branchesToCheck=(\"dev\" \"master\"); [[ \" ${branchesToCheck[@]} \" =~ \" ${branch} \" ]] &&  yarn check-flow-lint-test || exit 0"
	}
}
```
For some reason extracting into a variable didn't work for me (via $npm_package_myVar) so I had to duplicate large pieces of code.

I ended up with this in order to limit the hooks to dev and master:
```
"husky": {
	"hooks": {
		"pre-commit": "branch=`git branch | grep \\* | cut -d ' ' -f2`;branchesToCheck=(\"dev\" \"master\"); [[ \" ${branchesToCheck[@]} \" =~ \" ${branch} \" ]] &&  yarn check-flow-lint || exit 0",
		"pre-push": "branch=`git branch | grep \\* | cut -d ' ' -f2`;branchesToCheck=(\"dev\" \"master\"); [[ \" ${branchesToCheck[@]} \" =~ \" ${branch} \" ]] &&  yarn check-flow-lint-test || exit 0"
	}
}
```
For some reason extracting into a variable didn't work for me (via $npm_package_myVar) so I had to duplicate large pieces of code.

And this goes into package.json?

-----

- https://stackoverflow.com/questions/53895745/use-git-hooks-for-certain-branches-with-husky-and-git-branch-is

- https://blog.theodo.com/2018/07/protect-git-branches-husky/

- https://blog.logrocket.com/build-robust-react-app-husky-pre-commit-hooks-github-actions/

- https://npm.io/package/validate-branch-name

- https://www.freecodecamp.org/news/how-to-add-commit-hooks-to-git-with-husky-to-automate-code-tasks/

---

## Task # Import no cycle issue #1286

![import/no-cycle issue #1286](https://user-images.githubusercontent.com/1469198/178752138-476b7e4d-f251-4887-94ce-b903f0621b5a.png "import/no-cycle issue #1286")

я пока просто уберу эту ошибку, но нужно будет подумать. вохможно моя структура хрень

## Task # Enable and connect react parser #1279


![5](https://user-images.githubusercontent.com/1469198/179402426-6952843f-ae94-4f1a-87c0-f8563c448eab.png "5")

---

## Task # Well it is not good can be improved with lodash #1246

markdown-to-email/src/callbacks/html/methods/br.js

Line 11 in d11a401
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

## Task # I propose to move inner things of this method into Replace runConfigure #1166
```
Replacer.replaceMDBindedPreviewText = replaceMarkdownPreviewText.bind(state);

markdown-to-email/src/domain/replacer-class/configuration-plain.js

Line 13 in e0568c2

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

## Task # replace this layout with plain v3 layout #1165

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




const italic = objectBuilder(REGEXP_EM, _italic, italicLiteral);

// TODO header arent working as suppose too
const header = objectBuilder(REGEXP_HEADER, _header, headingLiteral);

// sub item for header. not ideal
const sibtitle = objectBuilder(REGEXP_HEADER, _header, subtitleLiteral);

// title for header. not sure if it's main title or not
const title = objectBuilder(REGEXP_HEADER, _header, titleLiteral);

// qLiteral,
const q = objectBuilder(REGEXP_Q, _q, false);

// codeLiteral,
const code = objectBuilder(REGEXP_CODE, _code, false);


const listItem = objectBuilder(
  REGEXP_SUB_LISTS, 
  getParsedSubList, 
  listItemLiteral
);

// this object used only as a stupid way to add a parch for different cases of lists
// first two params never used
const list = objectBuilder(REGEXP_UL_LIST, getParsedSubList, listLiteral);

//  ulListLiteral,
const ulList = objectBuilder(REGEXP_UL_LIST, _ulList, listLiteral);

//  olListLiteral,
const olList = objectBuilder(REGEXP_OL_LIST, _olList, false);

//  blockquoteLiteral,
const blockquote = objectBuilder(REGEXP_BLOCKQUOTE, _blockquote, false);

// hrLiteral,
const hr = objectBuilder(REGEXP_HR, _hr, false);


const paragraph = objectBuilder(
  REGEXP_PARAGRAPH,
  _paragraphWrapper,
  paragraphLiteral,
);

const br = objectBuilder(REGEXP_BR, _br);


const sponsorship = objectBuilder(
  REGEXP_SPONSORSHIP,
  _sponsorship,
  sponsorLiteral,
);

//  memeLiteral,
const memes = objectBuilder(REGEXP_MEM, _meme, false);

const separator = objectBuilder(
  REGEXP_SEPARATOR, 
  _separator, 
  separatorLiteral
  );


// empty as emptyLiteral,

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
  del,
  image,
  previewText,
  italic,

  blockquote,
  hr,
  paragraph,
  br,
  sponsorship,
  memes,
  separator,
};
```


## Task # enable const messages #1110

import { WARNING_IMAGE_VERSION, ERROR_SOURCE_DONT_HAVE, FULL_TEMPLATE_ERROR, HTML_EMAIL_SUCCESS, HTML_EMAIL_ERROR } from './constants';

markdown-to-email/src/helper/command-line-methods.js

Line 9 in a052695

 // TODO enable const messages
 
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

## Task # Vadim wants to add issue templates, restrict who and how can do merges into the main branch #1109

from one of our last chats




## Task ## add here error handlers from domain error handle #1021

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
  _blockquote,
  _meme,
  _header,
  _italic,
  _del,
  _q,
  _code,
  _hr,
  // _empty,
  _ulList,
  _olList,
  _image,
  _paragraphWrapper,

  _sponsorship,

  _br,
  _separator,
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

// import misc from '../templates/OuterTemplate/layouts/misc';



import body from '../../templates/PlainJSOuterTemplate/layouts/body';

const { sponsorLiteral, previewTextLiteral } = body;



// import {
  // sponsor as sponsorLiteral 
  // sponsorComponent
  
  
  //strong as strongLiteral,
  
  //link as linkLiteral,
  //blockquote as blockquoteLiteral,
  //meme as memeLiteral,
  //header as headerLiteral,
  //italic as italicLiteral,
  //del as delLiteral,
  //q as qLiteral,
  //code as codeLiteral,
  //hr  as hrLiteral,
  // empty as emptyLiteral,
  //ulList as ulListLiteral,
  //olList as olListLiteral,
  //image as imageLiteral,
  //paragraph as paragraphLiteral,
  
// TODO add here error handlers from domain/error-handle.
// removing them from this file

import {
  headingLiteral,
  imageLiteral,
  italicLiteral,
  linkLiteral,

  listLiteral,
  listItemLiteral,

  titleLiteral,

  paragraphLiteral,
  strongLiteral,

  subtitleLiteral,
  separatorLiteral 
} from '../plainjs-template/typography/index';

  
// console.log(paragraphLiteral);

const ERROR_REGEX_CONSTANT = (value) => `something wrong with RegEx constant ${value}`;
const ERROR_REPLACER_FUNCTION = (value) =>  `something wrong with replacer function ${value}`;


// const objectBuilder = (constant, replacer) => {constant, replacer}
function objectBuilder(constant, replacer, literal = false){

  // TODO add typeof for checking replacer as a function
  // console.log( typeof element.replacer === 'undefined' );
  
  if(!constant) throw new Error(ERROR_REGEX_CONSTANT)
  if(!replacer) throw new Error(ERROR_REPLACER_FUNCTION)



  // i want to replace it later with components
  return { constant, replacer, literal };
}


  //strongLiteral,
const strong = objectBuilder(REGEXP_STRONG, _strong, strongLiteral);
// console.log(strong);


// as linkLiteral,  
const link = objectBuilder(REGEXP_LINK, _link, linkLiteral)

  // as delLiteral,
const del  = objectBuilder(REGEXP_DEL, _del, delLiteral)

  // as imageLiteral,
const image  = objectBuilder(REGEXP_IMAGE, _image, imageLiteral)

const previewText = objectBuilder(REGEXP_PREVIEW_TEXT, _previewText, previewTextLiteral)

// empty as emptyLiteral,

  // as italicLiteral,
const italic  = objectBuilder(REGEXP_EM, _italic, italicLiteral)


  // as headerLiteral,
const header  = objectBuilder(REGEXP_HEADER, _header, headerLiteral)

// console.log(header);

  //  qLiteral,
const q = objectBuilder(REGEXP_Q, _q, qLiteral)

//  codeLiteral,

const code  = objectBuilder(REGEXP_CODE, _code, codeLiteral)
  //  ulListLiteral,

const ulList = objectBuilder(REGEXP_UL_LIST, _ulList, ulListLiteral)

  //  olListLiteral,

const olList = objectBuilder(REGEXP_OL_LIST, _olList, olListLiteral)

//  blockquoteLiteral,  
const blockquote = objectBuilder(REGEXP_BLOCKQUOTE, _blockquote, blockquoteLiteral)

  //   hrLiteral,

const hr = objectBuilder(REGEXP_HR, _hr, hrLiteral)

  //  paragraphLiteral

const paragraphWrapper = objectBuilder(REGEXP_PARAGRAPH, _paragraphWrapper, paragraphLiteral)

const br = objectBuilder(REGEXP_BR, _br)

// folder: 'body',
const sponsorship = objectBuilder(REGEXP_SPONSORSHIP, _sponsorship, sponsorLiteral)


//  memeLiteral,
const memes = objectBuilder(REGEXP_MEM, _meme, memeLiteral)

const separator = objectBuilder(REGEXP_SEPARATOR, _separator)




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
  del,  
  image,  
  previewText, 
  italic,  
  header,  
  q, 
  code ,
  ulList, 
  olList ,
  blockquote ,
  hr ,
  paragraphWrapper ,
  br ,
  sponsorship,
  memes ,
  separator, 
} 
```


## Task ## #1038

https://www.npmjs.com/package/debug

I installed winston, but didn't configure it https://github.com/winstonjs/winston

https://www.testim.io/pricing/

- https://homoly.me/posts/organizing-tests-with-jest-projects
- https://jestjs.io/docs/configuration#projects-arraystring--projectconfig

I'll move contents of this task into a separate place, organize it with help of Svitlana and later close these tasks.

We'll migrate it into our documentation website and then will discuss it
 
# husky and eslint as actions #9333

typicode/husky#186

https://stackoverflow.com/questions/53895745/use-git-hooks-for-certain-branches-with-husky-and-git-branch-is
https://blog.theodo.com/2018/07/protect-git-branches-husky/

https://blog.logrocket.com/build-robust-react-app-husky-pre-commit-hooks-github-actions/

https://npm.io/package/validate-branch-name

https://www.freecodecamp.org/news/how-to-add-commit-hooks-to-git-with-husky-to-automate-code-tasks/


## Task logger

- [Designing Error Messages and a Logging Strategy in Node.js](https://blog.appsignal.com/2021/11/03/designing-error-messages-and-a-logging-strategy-in-nodejs.html)
- [Npmlog](https://www.npmjs.com/package/npmlog)
- [How to use levels function in Logger](https://www.tabnine.com/code/javascript/functions/npmlog/Logger/levels)
- [Comparing Node.js logging tools](https://blog.logrocket.com/comparing-node-js-logging-tools/)
- [How to handle log events with the npmlog library?](https://stackoverflow.com/questions/72506435/how-to-handle-log-events-with-the-npmlog-library)


---

Почему я бы хотел чтобы мы быстрее разобрали mdx. Есть ощущение(которому больше чем год) - что возможно будет заменить работу нашего replacer`a.
но нужно подумать.

---

почему работа с подмодулями мне нравится. Потому что я легко могу раскидать модули на разные репозитории, настроить простые билды и легко дебажить и фиксить код.
делать коммиты и небоятся что все зафейлится.

нужно просто все настроить.

---

Почему хочется использовать реальный React components для быстрого запила templates.
таким макаром мы можем наконецто уйти от странных "темлпейтов" и делать блоки фронтенда с помощью тех средств, которые для этого предпочтительнее и реаль работают лучше.

---

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

---

Адаптер для подключения наших тем.
Например в основном генераторе нам не нужно устанавливать тысячу тем. Скорее это долно работать в обратном направлении.
Есть generator, есть тема, есть темплейт проекта который ты установил и там юзаешь.

---
