import ipywidgets as widgets
from traitlets import Unicode, Any


@widgets.register
class Sparkline(widgets.DOMWidget):
    """An example widget."""

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

    data = Any('{}').tag(sync=True)
