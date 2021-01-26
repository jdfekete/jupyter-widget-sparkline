import * as widgets from '@jupyter-widgets/base';
import _ from 'lodash';
import $ from 'jquery';
import 'jquery-sparkline';

require("../css/sparkline.css");

export
const SparklineModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
    _model_name : 'SparklineModel',
    _view_name : 'SparklineView',
    _model_module : 'jupyter-widget-sparkline',
    _view_module : 'jupyter-widget-sparkline',
    _model_module_version : '0.1.0',
    _view_module_version : '0.1.0',
    type: 'line',
    values: [],
    options: {},
    region: {},
    continuous_update: false
  })
});

export
const SparklineView = widgets.DOMWidgetView.extend({
  // Defines how the widget gets rendered into the DOM
  render: function() {
    this.setElement(document.createElement("span"));
    const that = this;
    $(this.el)
      .addClass('sparkline')
      .on('sparklineClick', (ev) => {
        const sparkline = ev.sparklines[0],
              region = sparkline.getCurrentRegionFields();
        that.model.set('region', region[0]);
        that.model.save_changes();
      });
    this.data_changed();

    this.model.on('change:type', this.data_changed, this);
    this.model.on('change:values', this.data_changed, this);
    this.model.on('change:options', this.data_changed, this);
    this.model.on('change:continuous_update',
                  this.continuous_update_changed, this);
  },

  data_changed: function() {
    const type = this.model.get('type');
    const values = this.model.get('values');
    const options = _.extend({type: type}, this.model.get('options'));
    const that = this;
    elementVisible(this.el).then(
      () => $(that.el).sparkline(values, options));
  },
  continuous_update_changed: function() {
    if (this.model.get('continuous_update')) {
      $(this.el).on('sparklineRegionChange', this.region_changed);
    }
    else {
      $(this.el).off('sparklineRegionChange');
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
