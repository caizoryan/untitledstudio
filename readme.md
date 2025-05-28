# How to use this repo

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

### Why do this?

There's a few reasons...
