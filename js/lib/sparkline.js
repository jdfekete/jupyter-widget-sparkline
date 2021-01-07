import * as widgets from '@jupyter-widgets/base';
import _ from 'lodash';
import $ from 'jquery';
import 'jquery-sparkline';

export
const SparklineModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'SparklineModel',
        _view_name : 'SparklineView',
        _model_module : 'jupyter-widget-sparkline',
        _view_module : 'jupyter-widget-sparkline',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        data: '{}'
    })
});

export
const SparklineView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {
        this.span = document.createElement('span');
        this.span.setAttribute('class', 'sparkline');
        this.el.appendChild(this.span);
        this.data_changed();

        this.model.on('change:data', this.data_changed, this);
    },

    data_changed: function() {
        const data = this.model.get('data');
        elementVisible(this.span).then(
            (span) => $(span).sparkline(data.values, data));
    }
});

function elementVisible(element) {
    return new Promise((resolve) => {
        if ($(element).is(":visible")) {
            resolve(element);
            return;
        }
        new MutationObserver((mutations, observer) => {
            if ($(element).is(":visible")) {
                observer.disconnect();
                resolve(element);
            }
        })
            .observe(document.documentElement, {
                childList: true,
                subtree: true
            });
    });
}
