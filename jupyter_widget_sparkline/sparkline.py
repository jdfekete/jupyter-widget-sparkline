import ipywidgets as widgets
from traitlets import (Unicode, Dict, List, Bool, Float,
                       validate, TraitError)
import numbers


@widgets.register
class Sparkline(widgets.DOMWidget):
    """An example widget."""
    TYPES = set(['line', 'bar', 'tristate', 'discrete',
                 'bullet', 'pie', 'box'])

    # Name of the widget view class in front-end
    _view_name = Unicode('SparklineView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('SparklineModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('jupyter-widget-sparkline').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('jupyter-widget-sparkline').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    values = List().tag(sync=True)
    options = Dict({}).tag(sync=True)
    progress = Float(100, min=0, max=100).tag(sync=True)
    region = Dict({}).tag(sync=True)
    continuous_update = Bool(False).tag(sync=True)

    @validate('options')
    def _valid_options(self, proposal):
        value = proposal['value']
        if 'type' in value and value['type'] not in Sparkline.TYPES:
            raise TraitError(
                f"Invalid Type '{value['type']}' not in {Sparkline.TYPES}")
        return value

    @validate('value')
    def _valid_values(self, proposal):
        values = proposal['value']
        if not all([isinstance(v, numbers.Number) for v in values]):
            raise TraitError(f"Invalid values '{values}', should be numbers")
        return values
