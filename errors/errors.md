# Find a way to handle errors carefully [Important] [#970](https://github.com/LLazyEmail/markdown-to-email/issues/970)

большинство вариантов, перечисленные внизу связанны с установкой тех или иных modules/tools, и проверкой гипотез.

основные слабые точки нашего проекта:
- вырезание контента с помощью RegEx
- обрамление контента с помощью callbacks
- сборка всего вместе
- работа с разными темами 


добавление мелких модулей можно сделать за пару выходных и посмотреть нравится нам функционал или нет.
для более сложных вещей прийдется переделывать нашу структуру. что хорошо, но потребует большего количества времени.

## Task  - Priority [ ]

модули которые я нагуглил, популярные для вывода ошибок.

Небольшие модули:
- https://www.npmjs.com/package/error
- https://www.npmjs.com/package/pretty-error
- https://www.npmjs.com/package/node-error-handler


Links:

- https://stackoverflow.com/questions/59575152/error-stack-displays-different-information-when-i-split-the-stack-into-array
- https://www.tabnine.com/code/javascript/functions/builtins/Error/stack
- https://stackoverflow.com/questions/9754735/is-it-a-best-practice-to-extract-string-literals-to-constants-in-javascript
- https://github.com/LLazyEmail/markdown-to-email/blob/main/src/domain/helper-methods/index.js

not sure if we can find a solution for everything, but we need to find a way to do things better:

- like more throw errors is good for debugging and building new things,
- logging will help us to be on the pulse of changes at one place, etc

---

### debug package 

Link: https://www.npmjs.com/package/debug

### Winston - Priority [ ]

Еще один модуль, логгер - https://github.com/winstonjs/winston

их пример

```
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```


### Stacktrace - Priority [ ]
 выглядит интересно и вроде как они делают центральную систему
 
- https://www.npmjs.com/package/error-stack-parser
- https://www.stacktracejs.com/
- https://www.npmjs.com/package/process-warning
- https://www.npmjs.com/package/stack-trace


### Sentry  - Priority [Low]
очень большая и широкая тема. самый простой вариант его использовать такой -  подключить sentry только для вывода длинного trace когда чтото реально крешится.
Тоесть например мы пихаем ошибки в sentry в каждом **catch error;** и просто используем его как логгер.
Но они предоставляют гораздо больше возможностей для вдумчивого девелопмента. там можно планировать и релизы и еще кучу всего.
большим плюсом для нас является то, что наш код лежит open-sourced. и нам ненужно платить за некоторые из их фич.

При этом желательно чтобы код, который покрыт Sentry был куда то задеплоен, т.е. постоянно крутился онлайн. тогда ROI будет выше.

Быстрый/простой вариант будет выделить какой то кусок нашего кода, который вызывает постоянные траблы - сделать его отдельным модулем и просто в мини репозиторий закинуть sentry. и посмотреть на результат.

Sentry я пользовался на api для groceristar и был очень доволен.

Возможно сейчас эта опция выглядит не на часi, але ...
Например в тот момент, когда мы 



# Try to use Testim - Priority [Low]

Тестим был спонсорром у хакернуна, поэтому о них знаю. в месяц бесплатно можно запускать тысячу "runs". 
Я думаю что можно было бы сделать так, чтобы мы например запускали их продукт например раз в неделю или еще реже и 

но нужно сделать рисерч и вообще посмотреть на то, нужен ли он нам или нет.

Link: https://www.testim.io/pricing/

---

### правильная организация


- https://homoly.me/posts/organizing-tests-with-jest-projects
- https://jestjs.io/docs/configuration#projects-arraystring--projectconfig


# Task 5: Best practices for error handling #63

Read a few of those articles, it might help you with cases, like this one: https://github.com/LLazyEmail/nomoretogo_email_template/blob/main/src/components/tableWithTwoRecipes.js#L72

- https://betterprogramming.pub/javascript-clean-code-error-handling-9cd7e87fdbe3
- https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
- https://blog.appsignal.com/2021/11/03/designing-error-messages-and-a-logging-strategy-in-nodejs.html
- https://www.valentinog.com/blog/error/

### add here error handlers from domain/error-handle
- https://github.com/LLazyEmail/markdown-to-email/blob/a7f26e56bc00693e254ad112103004d5eda26f84/src/domain/replace-markdown/pre-replace-objects.js#L80


### Table With Two Recipes

- простое улучшение может быть в том, что мы передаем не 6 аттрибутов а например 2 объекта.
- https://github.com/LLazyEmail/nomoretogo_email_template/blob/main/src/components/tableWithTwoRecipes.js#L72-L88
эта функция не очень "читабельна". я бы не экспортировал таким образом.

мы прийдем к тому, что наши компоненты будут собраться вместе в файлах display/display-* и там мы наверное будем передавать данные и вызывать функции.
я бы скорее назвал эту функцию как то, аля checking for errors, а кспортировал бы только компонент.


# Pictures

1. Generator is calling methods and saving files 

![Generator is calling methods and saving files](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/MindMap1.png "Generator is calling methods and saving files")

2. Default method with errors for protection

![Default method with errors for protection](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/default-method-with-errors-for-protection.png "Default method with errors for protection")

3. File just for organizing output warnings

![File just for organizing output warnings](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/file-just-for-organizing-output-warnings.png "File just for organizing output warnings")

4. Issue with jest because babel is not updated

![Issue with jest because babel is not updated](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/issue-with-jest-because-babel-is-not-updated.png "Issue with jest because babel is not updated")

5. Object init with lookout for errors

![Object init with lookout for errors](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/object-init-with-lookout-for-errors.png "Object init with lookout for errors")

6. Parser runs from build so hard to trace

![Parser runs from build so hard to trace](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/images%20folder/parser-runs-from-build-so-hard-to-trace.png "Parser runs from build so hard to trace")

## Task 6: More error handling [#930](https://github.com/LLazyEmail/markdown-to-email/issues/930)

markdown-to-email/src/callbacks/replace-md.js

Line 176 in dae7dbc

 throw new Error('name of callback is undefined or empty'); 
 
https://github.com/LLazyEmail/markdown-to-email/blob/my-name-is-debby/src/helper/command-line-methods.js


