jupyter-widget-sparkline
===============================

Jupyter Widget Sparkline encapsulates [jQuery Sparklines](https://omnipotent.net/jquery.sparkline/) as a jupyter notebook widget.

![Sparklines in a notebook](jupyter_widget_sparkline.png)

The following example creates a simple Sparkline barchart widget:

``` python
from jupyter_widget_sparkline import Sparkline
sparkline = Sparkline()
sparkline.data = { 'values': [10,8,5,7,4,4,1], 'type':'bar'}
display(sparkline)
```

Options and values are passed throught the `data` field. 

See the [documentation of the jQuery Sparklines](https://omnipotent.net/jquery.sparkline/#s-docs) for all the options.

The `region` field is updated when users click on the content of a sparkline, as shown in the example:

``` python
sparkline2 = Sparkline()
output2 = widgets.Output()
def region_changed2(change):
    with output2:
    output2.clear_output()
        print(change['new'])
sparkline2.data = { 'values': [10,8,5,7,4,4,1], 'type':'bar'}
sparkline2.observe(region_changed2, names='region')

widgets.VBox([sparkline2, output2])
```

The widget is dynamic so when the `data` field is changed, the widget is updated.

Installation
------------

To install use pip:

    $ pip install jupyter_widget_sparkline
    $ jupyter nbextension enable --py --sys-prefix jupyter_widget_sparkline

To install for jupyterlab

    $ jupyter labextension install jupyter_widget_sparkline

For a development installation (requires npm),

    $ git clone https://github.com/Inria/jupyter-widget-sparkline.git
    $ cd jupyter-widget-sparkline
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_widget_sparkline
    $ jupyter nbextension enable --py --sys-prefix jupyter_widget_sparkline
    $ jupyter labextension install js

When actively developing your extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This takes a minute or so to get started, but then automatically rebuilds JupyterLab when your javascript changes.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open.

