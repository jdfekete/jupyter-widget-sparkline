'''
Sparkline widget for Jupyter


'''
import numbers
import ipywidgets as widgets
from traitlets import (Unicode, Dict, List, Bool, Enum,
                       validate, TraitError)


@widgets.register
class Sparkline(widgets.DOMWidget):
    """A Sparkline widget.

    See jQuery Sparklines at https://omnipotent.net/jquery.sparkline/
    """

    _view_name = Unicode('SparklineView').tag(sync=True)
    _model_name = Unicode('SparklineModel').tag(sync=True)
    _view_module = Unicode('jupyter-widget-sparkline').tag(sync=True)
    _model_module = Unicode('jupyter-widget-sparkline').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    type = Enum(['line', 'bar', 'tristate', 'discrete', 'bullet',
                 'pie', 'box'], default_value='line').tag(sync=True)
    values = List().tag(sync=True)
    options = Dict({}).tag(sync=True)
    region = Dict({}).tag(sync=True)
    continuous_update = Bool(False).tag(sync=True)

    @validate('options')
    def _valid_options(self, proposal):
        value = proposal['value']
        if 'type' in value:
            raise TraitError(
                f"Type {value['type']} should not be in options but in type")
        return value

    @validate('value')
    def _valid_values(self, proposal):
        values = proposal['value']
        if not all([isinstance(v, numbers.Number) for v in values]):
            raise TraitError(f"Invalid values '{values}', should be numbers")
        return values
