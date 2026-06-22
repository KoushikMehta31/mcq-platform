const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, 'data', 'questions.json');
const data = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf-8'));

// Remove old html-css subcategory
delete data.frontend.subCategories['html-css'];

// Add new html subcategory with proper HTML questions
data.frontend.subCategories.html = {
  beginner: [
    {"id":200000,"question":"What does HTML stand for?","options":["HyperText Modern Language","HyperText Markup Language","Home Tool Markup Language","High Tech Markup Language"],"correct":1,"explanation":"HTML is the standard markup language for creating web pages."},
    {"id":200001,"question":"Which tag is used for the largest heading?","options":["<h1>","<heading>","<head>","<h6>"],"correct":0,"explanation":"<h1> defines the most important heading."},
    {"id":200002,"question":"Which tag creates a paragraph?","options":["<p>","<para>","<pg>","<text>"],"correct":0,"explanation":"<p> defines a paragraph of text."},
    {"id":200003,"question":"What does <a> tag create?","options":["A table","A hyperlink","A list","An image"],"correct":1,"explanation":"<a> (anchor) creates hyperlinks to other pages."},
    {"id":200004,"question":"How do you insert an image?","options":["<image src=\"url\">","<img href=\"url\">","<pic src=\"url\">","<img src=\"url\">"],"correct":3,"explanation":"<img> uses src attribute to specify the image URL."},
    {"id":200005,"question":"Which tag creates a line break?","options":["<lb>","<br>","<break>","<newline>"],"correct":1,"explanation":"<br> inserts a line break without semantic meaning."},
    {"id":200006,"question":"Which tag creates a horizontal rule?","options":["<rule>","<hline>","<line>","<hr>"],"correct":3,"explanation":"<hr> creates a thematic break or horizontal line."},
    {"id":200007,"question":"What is the correct HTML doctype?","options":["<!DOCTYPE HTML5>","<!DOCTYPE html>","<DOCTYPE html>","<!DOCTYPE>"],"correct":1,"explanation":"<!DOCTYPE html> is the HTML5 doctype declaration."},
    {"id":200008,"question":"Which tag creates an unordered list?","options":["<list>","<ol>","<ulist>","<ul>"],"correct":3,"explanation":"<ul> creates a bulleted (unordered) list."},
    {"id":200009,"question":"Which tag creates an ordered list?","options":["<olist>","<ol>","<list>","<ul>"],"correct":1,"explanation":"<ol> creates a numbered (ordered) list."}
  ],
  intermediate: [
    {"id":200040,"question":"What is a semantic HTML element?","options":["A hidden element","An element with CSS styling","A deprecated element","An element with meaningful purpose"],"correct":3,"explanation":"Semantic elements describe their meaning."},
    {"id":200041,"question":"Which element is semantic for navigation?","options":["<div class=\"nav\">","<nav>","<links>","<menu>"],"correct":1,"explanation":"<nav> defines a navigation section with semantic meaning."},
    {"id":200042,"question":"Which element is semantic for main content?","options":["<body>","<content>","<div class=\"main\">","<main>"],"correct":3,"explanation":"<main> uniquely identifies the primary content area."},
    {"id":200043,"question":"Which element is semantic for an article?","options":["<div class=\"post\">","<section>","<content>","<article>"],"correct":3,"explanation":"<article> represents a self-contained composition in a document."},
    {"id":200044,"question":"What does the <picture> element do?","options":["Creates a photo gallery","Embeds video","Draws graphics","Provides responsive images"],"correct":3,"explanation":"<picture> with <source> elements enables responsive images."},
    {"id":200045,"question":"What does srcset attribute enable?","options":["Image dimensions","Image source URL","Image alt text","Responsive image selection"],"correct":3,"explanation":"srcset lets the browser choose the best image for the viewport."},
    {"id":200046,"question":"What does the loading attribute do?","options":["Sets image format","Controls lazy loading","Sets image border","Defines alignment"],"correct":1,"explanation":"loading=\"lazy\" defers offscreen image loading."},
    {"id":200047,"question":"What does the decoding attribute do?","options":["Controls image size","Controls image decoding","Controls image caching","Controls image format"],"correct":1,"explanation":"decoding=\"async\" allows the browser to decode images asynchronously."},
    {"id":200048,"question":"What does crossorigin attribute control?","options":["Cross-platform code","Cross-site scripting","CORS requests for resources","Cross-browser support"],"correct":2,"explanation":"crossorigin configures CORS behavior for fonts, scripts, images."},
    {"id":200049,"question":"What does integrity attribute do?","options":["Subresource integrity check","Code validation","File size validation","Image quality check"],"correct":0,"explanation":"integrity hash ensures the resource has not been tampered with."}
  ],
  advanced: [
    {"id":200075,"question":"What is the purpose of <canvas> element?","options":["Displaying video","Drawing graphics via JavaScript","Showing images","Creating forms"],"correct":1,"explanation":"<canvas> provides a pixel-based drawing surface for JS rendering."},
    {"id":200076,"question":"What does the defer attribute on <script> do?","options":["Delays indefinitely","Cancels loading","Defers execution until HTML parsed","Executes immediately"],"correct":2,"explanation":"defer preserves script order and runs after document parsing."},
    {"id":200077,"question":"Difference between async and defer?","options":["Both are identical","async runs when loaded, defer waits for parsing","async blocks parsing, defer does not","defer loads async, async waits"],"correct":1,"explanation":"async: download + execute ASAP. defer: download while parsing, execute after."},
    {"id":200078,"question":"What is the <picture> element for?","options":["Responsive images with multiple sources","Video player","Image map","Photo gallery"],"correct":0,"explanation":"<picture> with <source media=\"...\"> enables art-directed responsive images."},
    {"id":200079,"question":"What does sizes attribute do?","options":["Defines image display widths","Defines image quality","Defines image height","Defines image format"],"correct":0,"explanation":"sizes=\"(max-width: 600px) 100vw, 50vw\" tells the browser image display size."},
    {"id":200080,"question":"What is the purpose of preload?","options":["Fetches critical resources early","Prevents loading","Delays loading","Caches lazily"],"correct":0,"explanation":"Preload tells the browser to fetch a resource before it is discovered."},
    {"id":200081,"question":"What is prefetch?","options":["Fetches resources for future navigation","Validates cache","Fetches resource immediately","Blocks resource loading"],"correct":0,"explanation":"Prefetch hints the browser to fetch resources for the next page."},
    {"id":200082,"question":"What is prerender?","options":["Pre-renders entire page in background","Pre-loads images","Pre-processes CSS","Pre-compiles JS"],"correct":0,"explanation":"Prerender renders the entire page in background for instant navigation."},
    {"id":200083,"question":"What does the ping attribute on <a> do?","options":["Tests connectivity","Sends beacon on link click","Checks latency","Pings the server"],"correct":1,"explanation":"ping=\"url\" sends a POST beacon when the link is clicked for analytics."},
    {"id":200084,"question":"What does the download attribute do?","options":["Downloads images","Downloads the page","Downloads scripts","Triggers file download on click"],"correct":3,"explanation":"download=\"filename.pdf\" forces the linked resource to be downloaded."}
  ]
};

// Add new css subcategory with proper CSS questions
data.frontend.subCategories.css = {
  beginner: [
    {"id":200110,"question":"Which CSS property changes text color?","options":["color","font-color","foreground","text-color"],"correct":0,"explanation":"color sets the foreground/text color of an element."},
    {"id":200111,"question":"Which CSS property changes background color?","options":["background","color","background-color","bg-color"],"correct":2,"explanation":"background-color sets the background color of an element."},
    {"id":200112,"question":"Which CSS property changes font size?","options":["font-size","text-size","size","font-height"],"correct":0,"explanation":"font-size controls the size of text, using px, em, rem, etc."},
    {"id":200113,"question":"Which CSS property changes font family?","options":["font-type","font-family","font-style","font-name"],"correct":1,"explanation":"font-family specifies the typeface (e.g., Arial, sans-serif)."},
    {"id":200114,"question":"Which CSS property makes text bold?","options":["font-bold","font-weight","text-bold","bold"],"correct":1,"explanation":"font-weight: bold makes text bold; numeric values 100-900."},
    {"id":200115,"question":"Which CSS property aligns text?","options":["text-position","horizontal-align","text-align","align"],"correct":2,"explanation":"text-align: left/center/right/justify controls horizontal alignment."},
    {"id":200116,"question":"Which CSS property adds space outside element?","options":["padding","gap","spacing","margin"],"correct":3,"explanation":"margin creates space outside the element border."},
    {"id":200117,"question":"Which CSS property adds space inside element?","options":["gap","padding","spacing","margin"],"correct":1,"explanation":"padding creates space between the content and the border."},
    {"id":200118,"question":"Which CSS property adds a border?","options":["edge","border","stroke","outline"],"correct":1,"explanation":"border: width style color (e.g., 1px solid black)."},
    {"id":200119,"question":"Which CSS property controls element display?","options":["display","position","float","visibility"],"correct":0,"explanation":"display: block/inline/flex/grid/none controls element layout behavior."}
  ],
  intermediate: [
    {"id":200166,"question":"What is CSS specificity?","options":["Speed of CSS loading","Weight of selectors determining applied styles","Number of CSS rules","Size of CSS file"],"correct":1,"explanation":"Specificity: inline > id > class > element. Higher specificity wins."},
    {"id":200167,"question":"What does !important do?","options":["Makes property optional","Overrides all other declarations","Increases priority","Marks as deprecated"],"correct":1,"explanation":"!important forces a declaration to override any other, breaking normal cascade."},
    {"id":200168,"question":"What is the CSS cascade?","options":["CSS preprocessor","CSS animation library","Algorithm resolving conflicting declarations","CSS framework"],"correct":2,"explanation":"The cascade determines which styles apply based on origin, specificity, order."},
    {"id":200169,"question":"What does inherit keyword do?","options":["Resets to default","Forces inheritance from parent","Sets to auto","Creates new value"],"correct":1,"explanation":"inherit explicitly sets a property to the computed value of the parent."},
    {"id":200170,"question":"What does initial keyword do?","options":["Resets to CSS spec default","Sets to zero","Removes property","Resets to parent value"],"correct":0,"explanation":"initial resets to the property initial value as defined in CSS specs."},
    {"id":200171,"question":"What does unset keyword do?","options":["Always inherits","Removes styling","Inherits if inheritable, otherwise initial","Always resets"],"correct":2,"explanation":"unset acts as inherit for inherited properties, initial for non-inherited."},
    {"id":200172,"question":"What does revert keyword do?","options":["Reverts to inherit","Reverts to parent","Reverts to initial","Reverts to browser/user stylesheet value"],"correct":3,"explanation":"revert rolls back to the value from the previous cascade origin."},
    {"id":200173,"question":"What is the difference between em and rem?","options":["rem is parent-relative","em relative to parent, rem to root","Both are same","em is viewport-relative"],"correct":1,"explanation":"em compounds with nesting; rem always references the root font-size."},
    {"id":200174,"question":"What does 1rem equal by default?","options":["12px","14px","16px (browser default font-size)","10px"],"correct":2,"explanation":"The default root font-size in most browsers is 16px, so 1rem = 16px."},
    {"id":200175,"question":"What does vw unit represent?","options":["1% of element width","1% of parent width","Viewport height","1% of viewport width"],"correct":3,"explanation":"1vw = 1% of the viewport width. 100vw = full viewport width."}
  ],
  advanced: [
    {"id":200201,"question":"What are CSS custom properties?","options":["CSS functions","CSS mixins","Variables defined with -- prefix, accessed via var()","CSS classes"],"correct":2,"explanation":"Custom properties enable dynamic style reuse and theming."},
    {"id":200202,"question":"How do you define a CSS custom property?","options":["--main-color: blue","main-color: blue","@main-color: blue","$main-color: blue"],"correct":0,"explanation":"Custom properties are defined on elements with -- prefix."},
    {"id":200203,"question":"How do you use a custom property?","options":["get(--main-color)","use(--main-color)","var(--main-color)","ref(--main-color)"],"correct":2,"explanation":"var() function retrieves the value of a custom property."},
    {"id":200204,"question":"What is the cascade layers (@layer)?","options":["Explicit cascade control with named layers","CSS animations","CSS grid layer","Z-index layers"],"correct":0,"explanation":"@layer lets authors control the cascade order explicitly."},
    {"id":200205,"question":"What is container queries?","options":["Media queries","Viewport-based queries","Styles based on container size","Element queries"],"correct":2,"explanation":"@container queries elements based on their container size."},
    {"id":200206,"question":"What is the scope of container queries?","options":["Document scope","Restricted to container descendants","Component scope","Global scope"],"correct":1,"explanation":"Container query styles only apply within the container element."},
    {"id":200207,"question":"What does container-type establish?","options":["Defines container type","Sets container height","Sets container width","Creates a containment context for queries"],"correct":3,"explanation":"container-type: inline-size creates a query container."},
    {"id":200208,"question":"What is the has() selector?","options":["Parent selector based on children","Sibling selector","Child selector","Descendant selector"],"correct":0,"explanation":":has() selects a parent element if it contains certain children."},
    {"id":200209,"question":"What does :has() enable?","options":["Style child based on parent","Style descendants","Style siblings","Style parent based on child state"],"correct":3,"explanation":":has() finally enables parent selection in CSS without JS."},
    {"id":200210,"question":"What is the :where() pseudo-class?","options":["High-specificity grouping","Negation grouping","Zero-specificity selector grouping","Conditional grouping"],"correct":2,"explanation":":where() groups selectors but contributes zero specificity."}
  ]
};

fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log('questions.json updated successfully!');
console.log('Frontend subcategories now include: html, css, ' + Object.keys(data.frontend.subCategories).join(', '));
