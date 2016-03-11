# Isogrid #


### An Isotope Manager ###

* Manage dynamic isotope content via webservices.
* 2.0.0

## Usage
As you can see in the example files, you will need to include:
 - [jQuery library](http://jquery.com/). (1.6.0 minimum)
 - The JavaScript file `jquery.fullPage.js` (or its minified version `jquery.fullPage.min.js`)
 - The css file `jquery.fullPage.css`

 **Optionally**, when using `css3:false`, you can add the [jQuery UI library](http://jqueryui.com/) in case you want to use other easing effects apart from the ones included in the jQuery library (`linear`, `swing` and `easeInOutCubic`) or the one included by default in fullPage.js (`easeInQuart`).

### Install using bower or npm
**Optionally**, you can install fullPage.js with bower or npm if you prefer:

Terminal:
```shell
// With bower
bower install fullpage.js

// With npm
npm install fullpage.js
```

###Including files:
```html
<link rel="stylesheet" type="text/css" href="jquery.fullPage.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!-- This following line is optional. Only necessary if you use the option css3:false and you want to use other easing effects rather than "linear", "swing" or "easeInOutCubic". -->
<script src="vendors/jquery.easings.min.js"></script>


<!-- This following line is only necessary in the case of using the plugin option `scrollOverflow:true` -->
<script type="text/javascript" src="vendors/jquery.slimscroll.min.js"></script>

<script type="text/javascript" src="jquery.fullPage.js"></script>
```