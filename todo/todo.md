## Table of Contents

- [Task 1: Add more messages here, and finally replace messages in our methods [#1393]](#task-1-add-more-messages-here-and-finally-replace-messages-in-our-methods-1393)

- [Task 2: Check cases when content can have empty lists or blockquote [#1390]](#task-2-check-cases-when-content-can-have-empty-lists-or-blockquote-1390)

- [Task 3: Move to domain error-handle [#1231]](#task-3-move-to-domain-error-handle-1231)

- [Task 4: This can be moved into a separate method [#1149]](#task-4-this-can-be-moved-into-a-separate-method-1149)

- [Task 5: Connect messages to their sources [#1144]](#task-5-connect-messages-to-their-sources-1144)

- [Task 6: We need make it work [#1020]](#task-6-we-need-make-it-work-1020)

- [Task 7: Later we can get rid of it completely [#989]](#task-7-later-we-can-get-rid-of-it-completely-989)

- [Task 8: Add typeof for checking replacer as a function [#959]](#task-8-add-typeof-for-checking-replacer-as-a-function-959)

- [Task 9: Looks interesting to implement [#1368]](#task-9-looks-interesting-to-implement-1368)

- [Task 10: Should we move away checks [#1366]](#task-10-should-we-move-away-checks-1366)

- [Task 11: Migration of small components [#197]](#task-11-migration-of-small-components-197)

## Task 1: Add more messages here, and finally replace messages in our methods [#1393](https://github.com/LLazyEmail/markdown-to-email/issues/1393)

```
import parse from '../../domain/parse';
import { configureReplacer } from '../../domain/react';
import { verification } from '../../domain/helper-methods';
import { generateTemplateName, printMessage } from '../../helper';
import { reactFullTemplate } from './components/reactFullTemplate';
import {
  writeHTML,
  // isFolderExists
} from '../../domain/write';

// TODO add more messages here, and finally replace messages in our methods
const MESSAGE_REACT_FULL_TEMPLATE =
  'The FullTemplate has been parsed successfully';
// const MESSAGE_REACT_CONTENT = 'The Content has been parsed successfully';

const parseReactContent = (source) => parse(source, configureReplacer)
```

## Task 2: Check cases when content can have empty lists or blockquote [#1390](https://github.com/LLazyEmail/markdown-to-email/issues/1390)

```

import { replaceMarkdownReact, Replacer } from '../index';

function configureReplacer(state, isFull) {
  Replacer.replaceMDBinded = replaceMarkdownReact.bind(state);

  // NOTE DON'T CHANGE ORDER OF FUNCTION CALLS
  if (isFull) {
    Replacer.previewText();
  }

  Replacer.comments();
  Replacer.typography();

  Replacer.ulList();
  // TODO UPDATE OLLIST CALLBACK, IT'S NOT WORKING
  //   Replacer.olList()

  // Replacer.blockquote();
  Replacer.hr();
  Replacer.paragraph();

  // TODO CHECK CASES WHEN CONTENT CAN HAVE EMPTY LISTS OR BLOCKQUOTE
  //   Replacer.emptyUl();
  //   Replacer.emptyOl();
  //   Replacer.emptyBlockquote();

}
```

## Task 3: Move to domain error-handle [#1231](https://github.com/LLazyEmail/markdown-to-email/issues/1231)

```

//----------------
// import { html } from 'lit-html'

// import body from '../../templates/PlainJSOuterTemplate/layouts/body';
// import misc from '../../templates/PlainJSOuterTemplate/layouts/misc';

import {
  getWrapper,
  generateNewString,
  _loopForWrapper,
} from '../../callbacks/helpers';

import { inspector } from '../error-handle';

import mainObj from '../replace-markdown/pre-replace-objects';

import CallbackFactory from '../callbacks-factory';

import { catch_error_trace_output } from '../error-handle';

const ERROR_REPLACER = `no params was passed`;



//--------------------------
//--------------------------
// TODO move to domain/error-handle
const inspectorCheck = (string) => {
  if (!inspector(string)) {
    throw new Error('replace wrapper 3.0 is blank');
  }
};

const inspector2 = (params) => {
  if (!inspector(params)){
    throw new Error(ERROR_REPLACER);
  }
}

function WR3_generateNewString(config) {

  inspector(config.params);

  const updatedString = _loopForWrapper(config.params, config.literal);

  if (config.debug) console.log(config);

  if (config.debug) console.log(updatedString);

  inspectorCheck(updatedString);

  return updatedString;
}

```

## Task 4: This can be moved into a separate method [#1149](https://github.com/LLazyEmail/markdown-to-email/issues/1149)

Problably at some point we'll have only one replacer method, but at this point we cant have it, so we better to optimize things

```

import body from '../../templates/PlainJSOuterTemplate/layouts/body';
import misc from '../../templates/PlainJSOuterTemplate/layouts/misc';


const replaceHeader = (config) => {
  // const { debug } = config || false;
  // TODO this can be moved into a separate method.
  // problably at some point we'll have only one replacer method
  // but at this point we cant have it, so we better to optimize things.
  if(!inspector(config.params)) throw new Error('no params was passed');


  const newString = WR3_generateNewString(configCopy);

  return newString;
};

```

## Task 5: Connect messages to their sources [#1144](https://github.com/LLazyEmail/markdown-to-email/issues/1144)

Eslint-disable-next-line no-undef

```

// TODO connect messages to their sources
// eslint-disable-next-line no-undef
export const WARNING_IMAGE_VERSION = (index, element) => `WARNING source.md has ${index} ${element}. Replace it with memes`;
// eslint-disable-next-line no-undef
export const ERROR_SOURCE_DONT_HAVE = (error) => `ERROR source.md doesn't have ${error}`;

export const FULL_TEMPLATE_ERROR = 'The full template has not been parsed!';
export const HTML_EMAIL_SUCCESS = 'Content has correct html!!!';
export const HTML_EMAIL_ERROR = 'Content has not correct html!!!';

// ---

export const CONST_FILE_CREATED = '';
export const CONST_FILE_NOT_WRITTEN = 'file not written';

```

## Task 6: We need make it work [#1020](https://github.com/LLazyEmail/markdown-to-email/issues/1020)

```

const ERROR_REGEX_CONSTANT = (value) => `something wrong with RegEx constant ${value}`;
const ERROR_REPLACER_FUNCTION = (value) =>  `something wrong with replacer function ${value}`;


function extractOptions(converter, key) {
  if (!converter.key) throw new Error('no options for this converter');
  return converter.key;
}


// TODO WE NEED MAKE IT WORK
function checkerr(variable = false) {

  // console.log( typeof element.replacer === 'undefined' );
  // console.log( element.replacer === null );

  if (typeof variable === 'undefined' || variable === null) {
    // variable is undefined or null
    return false;
  }
  return true;
}


// later we'll extend this method
// object assing will help us.
// const objectBuilder = (constant, replacer) => {constant, replacer}
function objectBuilder(constant, replacer, literal = false){

  // TODO add typeof for checking replacer as a function
  // console.log( typeof element.replacer === 'undefined' );
  if(!constant) throw new Error(ERROR_REGEX_CONSTANT)
  if(!replacer) throw new Error(ERROR_REPLACER_FUNCTION)


  
  // i want to replace it later with components
  return { constant, replacer, literal };
}
```

## Task 7: Later we can get rid of it completely [#989](https://github.com/LLazyEmail/markdown-to-email/issues/989)

```


//   // newLine,
import { replaceWrapper} from '';

generateNewString

function tracingVariables = () => {
  //   try {

  //       if (!regexp) throw new Error('regular expression is blank');
  //       if (!callback) throw new Error('no callback presented');

//       should we do something here?
  
  //       // ... add more here later

  //   } catch(err) {
  //       // we need to test how it actually work
  //       var caller_line = err.stack.split("\n")[4];
  //       var index = caller_line.indexOf("at ");
  //       var clean = caller_line.slice(index+2, caller_line.length);

  //       throw err;
  //   }
}


class Overhaul { 

  constructor() {

    
    this.replaceMarkdownNew = (key) => {

    }


/* function replaceMarkdownNew(key) {
  const { regexp, callback } = extractOptions(converter, key);

  // const {regexp, callback} = options;

  //   try {

  //       if (!regexp) throw new Error('regular expression is blank');
  //       if (!callback) throw new Error('no callback presented');

  //       // ... add more here later

  //   } catch(err) {
  //       // we need to test how it actually work
  //       var caller_line = err.stack.split("\n")[4];
  //       var index = caller_line.indexOf("at ");
  //       var clean = caller_line.slice(index+2, caller_line.length);

  //       throw err;
  //   }
} */



  this.extractOptions = (converter, key) => {
    if (!converter.key) throw new Error('no options for this converter');
    return converter.key;
  }



  /* eslint-disable */
  // basically, it's a copy of replaceWrapper functions

  // config.folder
  // config.type aka plain or react
  this.relieve = (name, config)  => {

    const folder = config.folder || 'typography';


  
    // we need to have an if, for passing plain or react stuff
    // let wrapper = getWrapper(layouts, folder, name)
  
    switch (config.type) {
      case 'plain':
        // let wrapper = getWrapper(layouts, folder, name)
        replaceWrapper(name, config, folder);
        break;
  
      case 'react':
        // let wrapper = getWrapper(reactLayouts, folder, name)
        replaceReactWrapper(name, config, folder);
        break;
  
      default:
        break;
    }

  }
  
  this.replaceReactWrapper = (name, config, folder = 'typography'){

  
  }


}
}




//-----------------

//-----------------
function repSponsor(name, config, folder = 'typography', debug = true){

 


}


// moving into separated callbacks



function EmployeeDetails() {
  
  var name: "Mayank";
  var age = 30;
  var designation = "Developer",
  var salary = 10000;

  var calculateBonus = function(amount) {
    salary = salary + amount;
  }

  return {
    name,
    age,
    designation: designation,
    calculateBonus: calculateBonus
  }
}

var newEmployee = EmployeeDetails()
```

## Task 8: Add typeof for checking replacer as a function [#959](https://github.com/LLazyEmail/markdown-to-email/issues/959)

```

import _ from 'lodash';
import { _previewText } from './callbacksHtml/methods/simple';
import {
  _strong,
    _sponsorship,
  _br,
  _separator,
} from './callbacksHtml/index';



import {
  REGEXP_HEADER,
  REGEXP_IMAGE,

  REGEXP_PARAGRAPH,
  REGEXP_SEPARATOR,
} from '../constants';


// Module Pattern

// later we'll extend this method
// object assing will help us.
function objectBuilder(constant, replacer){

  // TODO add typeof for checking replacer as a function
  if(!constant) throw new Error(`something wrong with RegEx constant ${constant}`)
  if(!replacer) throw new Error(`something wrong with replacer function ${replacer}`)

  return { constant, replacer };
}

// const objectBuilder = (constant, replacer) => {constant, replacer}


const strong = objectBuilder(REGEXP_STRONG, _strong);
// console.log(strong);

const link = objectBuilder(REGEXP_LINK, _link)

const del  = objectBuilder(REGEXP_DEL, _del)

const image  = objectBuilder(REGEXP_IMAGE, _image)

const previewText = objectBuilder(REGEXP_PREVIEW_TEXT, _previewText)

const italic  = objectBuilder(REGEXP_EM, _italic)

export default { 
  strong,   
  link, 
  del,  
  image,  
  br ,
  sponsorship,
  memes ,
  separator, 
} 
```

## Task 9: Looks interesting to implement [#1368](https://github.com/LLazyEmail/markdown-to-email/issues/1368)

```
class MissingFieldsError extends Error {

constructor(fields, ...params) {

super(...params);

this.fields_ = fields;

}

return this.fields_;

}

}

throw new MissingFieldsError("msg")
```

```

// TODO looks interesting to implement
// class MissingFieldsError extends Error {
//   constructor(fields, ...params) {
//     super(...params);
//     this.fields_ = fields;
//   }

//   getMissingFields() {
//     return this.fields_;
//   }
// }
// throw new MissingFieldsError("msg")

const ERROR_REGEX_CONSTANT = (value) =>
  `something wrong with RegEx constant ${value}`;

```

## Task 10: Should we move away checks [#1366](https://github.com/LLazyEmail/markdown-to-email/issues/1366)

```

import { forEach } from 'lodash';

import os from 'os';
import {
  // checkHtml,
  printMessage,
} from '../../helper';

const platform = os.platform();

// TODO enable const messages
// import { WARNING_IMAGE_VERSION, ERROR_SOURCE_DONT_HAVE, FULL_TEMPLATE_ERROR, HTML_EMAIL_SUCCESS, HTML_EMAIL_ERROR } from './constants';

// TODO make is as fat arrow function
const newLine = platform === 'win32' ? '\r\n' : '\n';

function checkWarnings(warnings) {
  forEach({ a: 1, b: 2 }, function (value, index) {
    if (index) {
      const message = `WARNING source.md has ${index} ${value}. Replace it with memes`;

      printMessage(message, 'yellow');
    }
  });
}

// TODO should we move away checks?
function checkHtml(content) {
  // eslint-disable-next-line prefer-regex-literals
  const searchPattern = new RegExp('(<table|<tr>|<td|<tbody>)', 'i');

  let ind;
  let tempStr = '';

  if (process.env.noAdv) {
    ind = content.indexOf('<h1 class="mc-toc-title"');
  } else {
    ind = content.indexOf('</table></span></span></div>');
  }

  // hmm, it can be a problem
  // TODO replace with lodash
  // eslint-disable-next-line no-plusplus
  for (let i = ind; i < ind + 5000; i++) {
    tempStr += content[i];
  }

  // we can extend these checks and add more

  if (searchPattern.test(tempStr)) {
    printMessage('Content has correct html!!!', 'green');
  } else {
    printMessage('Content has not correct html!!!', 'yellow');
  }
}

function verification(warnings, content = false) {
  if (warnings) checkWarnings(warnings);

  if (content) checkHtml(content);
}

export { verification, checkWarnings, checkHtml, newLine };
```

## Task 11: Migration of small components [#197](https://github.com/LLazyEmail/nomoretogo_email_template/issues/197)

В typography у нас сейчас мало компонентов. А Вадим хочет попробывать работу этого модуля и подклюить его к основному генератору.

Я создал пустые файлы, если будут вопросы -скажите, я детальнее сделаю описание.

Вначале надо перенести:

- image

- heading - там где Weekly Menu

![1](https://user-images.githubusercontent.com/1469198/180827517-63b945c7-0215-41c7-a7a1-5d7521fe433a.png "1")

- subheading

![2](https://user-images.githubusercontent.com/1469198/180827555-972da0cd-84d6-406b-95c3-aae75360aa05.png "2")

- paragraph

![3](https://user-images.githubusercontent.com/1469198/180827591-28046adb-cb22-4334-a5b1-6d1d22cefe47.png "3")

- strong

![4](https://user-images.githubusercontent.com/1469198/180827704-e67d8e22-79d3-4424-bb8d-ece5413a8990.png "4")


---
CHECK CASES WHEN CONTENT CAN HAVE EMPTY LISTS OR BLOCKQUOTE

Replacer.emptyUl();

Replacer.emptyOl();

Replacer.emptyBlockquote();

Replacer.separator();
