## Table of Contents


- [Task 2: Explore mdx stuff deeper](#task-2-explore-mdx-stuff-deeper)

- [Task 3: Design system](#task-3-design-system)

- [Task 4: Storybook](#task-4-storybook)

- [Task 5: Display on preview](#task-5-display-on-preview)

- [Task 6: Test table components and freeze development](#task-6-test-table-components-and-freeze-development)

- [Task 7: Basic React components working without a lotof efforts](#task-7-basic-react-components-working-without-a-lotof-efforts)

- [Table](#table)

- [Misc](#misc)

- [Simple templates without complex styles in head](#simple-templates-without-complex-styles-in-head)

- [Task 8: Remark research for Markdown to Html generator #754](#task-8-remark-research-for-markdown-to-html-generator-754)

- [Task 9: Try to make "full-template" work #385](#task-9-try-to-make-full-template-work-385)


## Task 2: Explore mdx stuff deeper

explore mdx stuff deeper

- https://github.com/mdx-js/mdx/issues/197
- https://egghead.io/lessons/react-use-mdxprovider-to-control-the-rendering-of-markdown-elements-with-gatsby-mdx
- https://mdxjs.com/guides/wrapper-customization/

https://app.asana.com/0/1201360899207493/1201361028365043

## Task 3: Design system

should we think about `design system` or just have quick itterations and generate more templates instead.
- https://blog.bitsrc.io/independent-components-the-webs-new-building-blocks-59c893ef0f65
- https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833
- https://martinfowler.com/articles/micro-frontends.html


## Task 4: Storybook

https://app.asana.com/0/1201360899207493/1201361028365055

will storybook generation help us to move components forward?

as we have a lot of similar repositories - by making it work - we can simply make a great improvement

Link: https://github.com/LLazyEmail/react-email-table/issues/85 I also need to find a way to share a video

https://user-images.githubusercontent.com/1469198/180625210-f9cc8abf-7fb8-4596-8904-22458886f800.mp4


## Task 5: Display on preview

display on a previewjs 3 different letters from a billing folder
- https://github.com/LLazyEmail/react-email-letter-components/tree/main/email-templates/--empty/billing

amazon

google



## Task 6: Test table components and freeze development

https://app.asana.com/0/1201360899207493/1201391597060836


----

## Task 7: Basic React components working without a lotof efforts 
https://app.asana.com/0/1201360899207493/1201391597060794

## Table


## Misc


## Simple templates without complex styles in head

---

## Task 8: Remark research for Markdown to Html generator [#754](https://github.com/LLazyEmail/markdown-to-email/issues/754)

React module issue: [#142](https://github.com/LLazyEmail/markdown-to-email/issues/142)

https://github.com/remarkjs/remark/tree/main/packages/remark-parse

[#751](https://github.com/LLazyEmail/markdown-to-email/discussions/751)

https://github.com/atherdon/markdown-to-email/tree/remark_research

- read article https://www.ryanfiller.com/blog/remark-and-rehype-plugins
- find great tutorial for remark parser
- find out how to create custom md elements and change markup

https://astexplorer.net/

https://braincoke.fr/blog/2020/03/an-introduction-to-unified-and-remark/#syntax-trees

https://github.com/unifiedjs/handbook#writing-a-plugin-to-modify-headings

Links that can help in future:
https://swizec.com/blog/custom-markdown-extensions-with-remark-and-hast-handlers/

## Task 9: Try to make "full-template" work [#385](https://github.com/LLazyEmail/markdown-to-email/issues/385)

__atherdon:__

![1](https://user-images.githubusercontent.com/1469198/116010103-b8d68780-a625-11eb-8acc-67b9c96a7f37.png "1")

получается что мы начали работу над этими темплейтами, но она явно не очень была закончена.
предлагаю попробывать вывести какие то данные и посмотреть, как все работает в реакт ветке

сс @coder-do

__coder-do:__

да full template не работает, вот почему - файл https://github.com/atherdon/markdown-to-email/blob/react-components-stage-zero/templates/full/Body/BodyPrototype.js пустой и поэтому кроме ошибок ничего не выводилось - я для теста взял контент этого же файла из `first` страницы и фулл тоже запустился. Я просто не знаю что должно быть в фулл темплейте(контент имею ввиду) если заполнить этот файл все сработает норм

Плюс в full template нету компонентя для футера!

__atherdon:__

да, я тоже уже успел покопаться в full темплейте. его текущая версия - это я уже нашаманил. но т.к. мне сложно нормально делать код - я начал пытаться вытащить папку misc в отдельный модуль. но пока что - не очень работает
