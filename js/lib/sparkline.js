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
        data: '{}',
        region: '{}',
        continuous_update: false
    })
});

export
const SparklineView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {
        this.span = document.createElement('span');
        this.span.setAttribute('class', 'sparkline');
        this.el.appendChild(this.span);
        const that = this;
        $(this.span).on('sparklineClick', (ev) => {
            const sparkline = ev.sparklines[0],
                  region = sparkline.getCurrentRegionFields();
            that.model.set('region', region[0]);
            that.model.save_changes();
        });
        this.data_changed();

        this.model.on('change:data', this.data_changed, this);
        this.model.on('change:continuous_update',
                      this.continuous_update_changed, this);
    },

    data_changed: function() {
        const data = this.model.get('data');
        elementVisible(this.span).then(
            (span) => $(span).sparkline(data.values, data));
    },
    continuous_update_changed: function() {
        if (this.model.get('continuous_update')) {
            $(this.span).on('sparklineRegionChange', this.region_changed);
        }
        else {
            $(this.span).of('sparklineRegionChange');
        }
    }
});

function elementVisible(el) {
    return new Promise((resolve) => {
        if ($(el).is(":visible") && !$(el).parents().is(':hidden')) {
            resolve(el);
            return;
        }
        new MutationObserver((mutations, observer) => {
            if ($(el).is(":visible") && !$(el).parents().is(':hidden')) {
                observer.disconnect();
                resolve(el);
            }
        })
            .observe(document.documentElement, {
                childList: true,
                subtree: true
            });
    });
}
