# How to use this repo

### tl;dr

edit input.html

run:

```js
node run.js
```

This will produce index.html, this is the website to be used and hosted. Variables can be edited in import.js. The website's interactivity is in script.js. Refer below for the syntax in input.html


### Overview
Essentially the website is static site generated, same as jekyll or something. There is three parts to this process. HTML is written in input.html, the HTML in that file is embeded with javascript. Essentially this file is parsed and generates an output.js file that generates the index.html.

The syntax of input.html is as such:

```html
<!-- input.html --> 

<h1>%%+foo%%</h1>
<p>%%+bar%%</p>

<ul>
%% for (let i = 0; i < 5; i++) { %%
	<li> Item no. %%+ i %% </li>
%% } %%
</ul>

```

This will need an import file that will supply it the data (foo and bar), in this branch its called import.js and knowing what variables to import, compiling this will output a js file that looks something like:


```js
// output.js
import fs from 'fs'
import {foo, bar} from './import.js'

let html = ""

html += `<h1>`
html += foo
html += `</h1>
<p>`

html += bar
html += `</p>
<ul>
`
for (let i = 0; i < 5; i++) { 
		html += `<li> Item no. `
		html +=  i 
		html += `</li>`
} 

html += `</ul>`
fs.writeFileSync('./index.html', html);
```

one thing to note here is compare the syntax for %%+foo%% vs %% for (let ... %% lines. The + in the %%+foo%% line marks that expression as variable to be added to html variable whereas not adding the + puts the expression as it is into the javascript file. If we added 'for (let i = 0 ...' to html like, 'html += for (let i = 0 ...', it would produce an error, hence the distinction is important.

Which will generate:

```html
<h1>hello world</h1>
<p>this is a sentence and everything</p>

<ul>
	<li> Item no. 0 </li>
	<li> Item no. 1 </li>
	<li> Item no. 2 </li>
	<li> Item no. 3 </li>
	<li> Item no. 4 </li>
</ul>
```

This is essentially it. If you know javascript, you already know this :)

### Why do this?

There's a few reasons... for one I think it I really like how simple it is to implement as a static site generator. The whole generator with lots on comments and random utility fns in total amounts to about a 100 lines. Which I think is a very small and simple program. The other reason I really like it is, how transparent it is. There is not magic happening behind the back. There is no dependencies and you can look into exactly how it is working... I think that is very valuable, because then the program is actually editable and iterable...
