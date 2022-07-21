# Find a way to handle errors carefully [Important] [#970](https://github.com/LLazyEmail/markdown-to-email/issues/970)

модули которые я нагуглил, они популярные для вывода ошибок.

- https://www.npmjs.com/package/error
- https://www.npmjs.com/package/pretty-error
- https://www.npmjs.com/package/node-error-handler

stacktrace выглядит интересно и вроде как они делают центральную систему

- https://www.npmjs.com/package/error-stack-parser
- https://www.stacktracejs.com/
- https://www.npmjs.com/package/process-warning
- https://www.npmjs.com/package/stack-trace

---

or maybe we should go all-in and install sentry here? as we have an open-source project it can be used for free

- https://stackoverflow.com/questions/59575152/error-stack-displays-different-information-when-i-split-the-stack-into-array

- https://www.tabnine.com/code/javascript/functions/builtins/Error/stack

- https://stackoverflow.com/questions/9754735/is-it-a-best-practice-to-extract-string-literals-to-constants-in-javascript

- https://github.com/LLazyEmail/markdown-to-email/blob/main/src/domain/helper-methods/index.js

not sure if we can find a solution for everything, but we need to find a way to do things better

like more throw errors is good for debugging and building new things,

logging will help us to be on the pulse of changes at one place, etc

---

## try Winston 

I installed winston, but didn't configure it https://github.com/winstonjs/winston

## try to use Testim

- https://www.testim.io/pricing/

- https://homoly.me/posts/organizing-tests-with-jest-projects
- https://jestjs.io/docs/configuration#projects-arraystring--projectconfig

I'll move contents of this task into a separate place, organize it with help of Svitlana and later close these tasks.

We'll migrate it into our documentation website and then will discuss it

# best practices for error handling #63

Read a few of those articles, it might help you with cases, like this one: https://github.com/LLazyEmail/nomoretogo_email_template/blob/main/src/components/tableWithTwoRecipes.js#L72

- https://betterprogramming.pub/javascript-clean-code-error-handling-9cd7e87fdbe3
- https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
- https://blog.appsignal.com/2021/11/03/designing-error-messages-and-a-logging-strategy-in-nodejs.html
- https://www.valentinog.com/blog/error/



### TableWithTwoRecipes

- простое улучшение может быть в том, что мы передаем не 6 аттрибутов а например 2 объекта.
- https://github.com/LLazyEmail/nomoretogo_email_template/blob/main/src/components/tableWithTwoRecipes.js#L72-L88
эта функция не очень "читабельна". я бы не экспортировал таким образом.
мы прийдем к тому, что наши компоненты будут собраться вместе в файлах display/display-* и там мы наверное будем передавать данные и вызывать функции.
я бы скорее назвал эту функцию как то, аля checking for errors, а кспортировал бы только компонент.

можете посмотреть как я начал делать футер в репозитории https://github.com/LLazyEmail/_trying-lit/blob/main/src/components/footer.js

это не конечный вариант, но позволят легко читать как работают некоторые блоки в теплейте.



### Get-recipe.js

файл внутри выглядит красивее. за cчет того что разбили на несколько частей - проще ловить ошибки будет.

- я бы переименовал файл
- добавил бы простые проверки в getTitle, getText, getImage
- переименовал бы эти три метода тоже - можно сделать textComponent, titleComponent, imageComponent - чтобы мы со временем пришли к единой логике в названиях наших методов
- создал бы 3 константы вначале этого файла в которых бы хранил сообщения
пример того, как я начал организовывать ошибки в основном репозитории, потому что там их много

https://github.com/LLazyEmail/markdown-to-email/blob/main/src/helper/constants.js



### Get-supportContact.js

предлагаю сделать похожие шаги как я указал выше, а потом уже по-факту посмотрю еще раз

сделать функцией https://github.com/LLazyEmail/nomoretogo_email_template/blob/main/src/components/get-supportContact.js#L24

# try Debug pkg from npm - markdown-to-email#1038

Issue https://www.npmjs.com/package/debug #1038

https://www.npmjs.com/package/debug



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
