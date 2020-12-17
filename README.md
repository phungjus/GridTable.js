# GridTable.js Library

Landing Page Link: <a href="https://secret-badlands-58288.herokuapp.com/">https://secret-badlands-58288.herokuapp.com/</a>

Documentation Link: <a href="https://secret-badlands-58288.herokuapp.com/documentation">https://secret-badlands-58288.herokuapp.com/documentation</a>

<h2>Getting Started:</h2>
<p>To begin using GridTable.js you need to place the following scripts inside your HTML document as follows:</p>
<code class="language-js">&lt;head&gt;</code>
<br>
<code class="language-js">
    &nbsp;&nbsp;&nbsp;&lt;script defer type="text/javascript" src='gridtable.js'&gt;&lt;/script&gt;
</code>
<br>
<code class="language-js">
    &nbsp;&nbsp;&nbsp;&lt;link href="stylesheet.css" rel="stylesheet" type="text/css"&gt;
</code>
<br>
<code class="language-js">
    &lt;/head&gt;
</code>

<p>Then inside the body tag of your HTML Code you must have a &lt;div&gt; tag with a unique ID for each new GridTable you create as follows:</p>
<code class="language-js">
    &lt;body&gt;
</code>
<br>
<code class="language-js">
    &nbsp;&nbsp;&nbsp;&lt;div id='uniqueID'&gt;&lt;/div&gt;
</code>
<br>
<code class="language-js">
    &lt;/body&gt;
</code>
<p>After completing the two steps above you are ready to start using the GridTable.js library, it is now simply just instantiating the GridTable object in your Javascript file as follows:</p>
<code class="language-js">
    const newGridTable = new GridTable()
</code>