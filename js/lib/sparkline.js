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
        if (!this.sparklineid)
            this.sparklineid = `sparkline-${count++}`;
        this.el.innerHTML = `<span class='sparkline' id='${this.sparklineid}'></span>`;
        this.data_changed();

        // Observe changes in the value traitlet in Python, and define
        // a custom callback.
        this.model.on('change:data', this.data_changed, this);
    },

    data_changed: function() {
        if (this.sparklineid) {
            const data = this.model.get('data');
            elementReady(`#${this.sparklineid}`).then(
                () => $(`#${this.sparklineid}`).sparkline(data.values, data));
        }
    }
});

function elementReady(selector) {
  return new Promise((resolve) => {
    let el = document.querySelector(selector);
    if (el) {resolve(el);}
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
}

let count = 1;
