# Isogrid.js #


### The Isotope Manager you need! ###

* Manage dynamic isotope content via webservices.
* last version : 2.0.0

**Note**
If you do not already use jQuery in your project you will need to install as Isogrid need it to work preperly.
 - [jQuery library](http://jquery.com/). (2.2.1 minimum)


## Installation

###Bower
Install using this line:
```shell
bower install isogrid.js

```

###Including files:
```html
<script src="bower_components/isotope/dist/isotope.pkgd.min.js"></script>
<script src="bower_components/imagesloaded/imagesloaded.pkgd.min.js"></script>
<script src="bower_components/isogrid/dist/isogrid.min.js"></script>
```

###Adding tags in HTML:
```html
   <!-- This is where the isotope items are gonna be loaded -->
   <div data-isogrid-container></div>

   <!-- This is the button to load more items -->
   <a data-isogrid-load-more>Load more</a>
```

## Exemple

```html
<script type="text/javascript">
    jQuery(document).ready(function($) {
        var iso = new Isogrid({ ws_getItems: "{{ url('ws_more_projects') }}" });
 
        iso.getIsoItems().then(function(){
            // callback function if needed
        });


        // Options functions
        $('[data-isogrid-load-more]').on('click', showMoreTiles);
        function showMoreTiles (e) {
            e.preventDefault();
            iso.getIsoItems();
        }
    });
</script>
```

## Bootstrap utils
If you are using Bootstrap you can add the following to have a perfect layout.
```html
[data-isogrid-container] {
     .list-unstyled;
     .make-row();
     overflow: hidden;
 }
```
