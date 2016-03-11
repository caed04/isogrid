# Isogrid #


### The Isotope Manager you need! ###

* Manage dynamic isotope content via webservices.
* last version : 2.0.0

**Note**
If you do not already use jQuery in your project you will need to install as Isogrid need it to work preperly.
 - [jQuery library](http://jquery.com/). (2.2.1 minimum)


## Installation

###Bower
In the `bower.json` file add the line below as a `dependencies`:
```shell
"v10-isogrid": "https://CFvAfVwp8LKIXemMEGfADquDCgStFSBV@bitbucket.org/version10/v10-isogrid.git",

```

###Including files:
```html
<script src="bower_components/isotope/dist/isotope.pkgd.min.js"></script>
<script src="bower_components/imagesloaded/imagesloaded.pkgd.min.js"></script>
<script src="bower_components/v10-isogrid/dist/Isogrid.min.js"></script>
```

###Adding tags:
```html
   <!-- This is where the isotope items are gonna be loaded -->
   <div data-isogrid-containeur></div>

   <!-- This is the button to load more items -->
   <a data-isogrid-load-more>Load more</a>
```

## Exemple

```html
<script type="text/javascript">
        jQuery(document).ready(function($) {

            // ----------------------------------------------------------------
            // Isogrid - projects
            // ----------------------------------------------------------------
            var projects = new Isogrid({
                paginationLimit:(isMobile.phone) ? 3 : 10,
                ws_getItems: "{{ url('ws_more_projects') }}"
            });
            projects.getIsoItems().then(function(){

            });


            // Options functions
            $('[data-isogrid-load-more]').on('click', showMoreTiles);
            function showMoreTiles (e) {
                e.preventDefault();
                projects.getIsoItems();
            }
        });
    </script>
```