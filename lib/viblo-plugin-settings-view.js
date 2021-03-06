(function () {
  var $,
    $$,
    Disposable,
    VibloPluginSettingsView,
    SettingsPanel,
    PostsPanel,
    AboutPanel,
    ScrollView,
    shell,
    VibloAPI,
    vibloAPI,
    PostManager,

    _, path, ref,
    extend = function (child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) {
          child[key] = parent[key];
        }
      }
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    },
    hasProp = {}.hasOwnProperty;

  path = require('path');
  var fs = require('fs-plus');
  var vibloPostsStorageDir = fs.getHomeDirectory() + '/.viblo/';

  _ = require('underscore-plus');

  ref = require('atom-space-pen-views'), $ = ref.$, $$ = ref.$$, ScrollView = ref.ScrollView;

  Disposable = require('atom').Disposable;

  SettingsPanel = require('./settings-panel');

  shell = require('electron').shell;

  VibloAPI = require('./viblo-api');

  vibloAPI = new VibloAPI();

  PostsPanel = require('./posts-panel');

  AboutPanel = require('./about-panel');

  PostManager = require('./post-manager');

  var isVibloFile = function(path) {
    if (!path) {
      return;
    }
    return path.indexOf(vibloPostsStorageDir) === 0;
  }

  module.exports = VibloPluginSettingsView = (function (superClass) {
    extend(VibloPluginSettingsView, superClass);

    function VibloPluginSettingsView() {
      return VibloPluginSettingsView.__super__.constructor.apply(this, arguments);
    }

    VibloPluginSettingsView.content = function () {
      return this.div({
        "class": 'viblo-atom-plugin settings-view pane-item',
        tabindex: -1
      }, (function (_this) {
        return function () {
          _this.div({
            "class": 'config-menu',
            outlet: 'sidebar'
          }, function () {
            _this.ul({
              "class": 'panels-menu nav nav-pills nav-stacked',
              outlet: 'panelMenu'
            }, function () {
              return _this.div({
                "class": 'panel-menu-separator',
                outlet: 'menuSeparator'
              });
            });
            return _this.div({
              "class": 'button-area'
            }, function () {
              return _this.button({
                "class": 'btn btn-default icon icon-link-external',
                outlet: 'vibloLink'
              }, 'Go to Viblo');
            });
          });
          return _this.div({
            "class": 'panels',
            tabindex: -1,
            outlet: 'panels'
          });
        };
      })(this));
    };

    VibloPluginSettingsView.prototype.initialize = function (arg) {
      var activePanel, ref1;
      ref1 = arg != null ? arg : {}, this.uri = ref1.uri, this.postManager = ref1.postManager, activePanel = ref1.activePanel;
      VibloPluginSettingsView.__super__.initialize.apply(this, arguments);
      if (this.postManager == null) {
        this.postManager = new PostManager();
      }
      this.deferredPanel = activePanel;
      return process.nextTick((function (_this) {
        return function () {
          return _this.initializePanels();
        };
      })(this));
    };

    VibloPluginSettingsView.prototype.onDidChangeTitle = function () {
      return new Disposable();
    };

    VibloPluginSettingsView.prototype.dispose = function () {
      var name, panel, ref1;
      ref1 = this.panelsByName;
      for (name in ref1) {
        panel = ref1[name];
        if (typeof panel.dispose === "function") {
          panel.dispose();
        }
      }
    };

    VibloPluginSettingsView.prototype.initializePanels = function () {
      if (this.panels.size() > 1) {
        return;
      }
      this.panelsByName = {};

      this.on('click', '.panels-menu li a, .panels-packages li a', (function (_this) {
        return function (e) {
          return _this.showPanel($(e.target).closest('li').attr('name'));
        };
      })(this));

      this.vibloLink.on('click', function () {
        return shell.openExternal(vibloAPI.getServerHost());
      });

      this.addCorePanel('Settings', 'icon-settings', function () {
        return new SettingsPanel('viblo-atom-plugin');
      });

      this.addCorePanel('Posts', 'icon-pencil', (function(_this){
        return function () {
          var panel = new PostsPanel(_this.postManager);
          _this.postManager.on('post-published post-saved-as-draft post-saved-as-draft-public', (function(_that) {
            return function(result) {
                panel.loadPosts();
                if (!result.error) {
                  if (!isVibloFile(atom.workspace.getActivePaneItem().getURI())) {
                    atom.workspace.getActivePane().destroyActiveItem();
                    atom.commands.dispatch(atom.views.getView(atom.workspace.getActivePane()), 'viblo:posts');
                  }
                }
              };
          })(_this))
          return panel;
        }
      })(this));

      this.addCorePanel('About', 'viblo-logo', (function(_this){
        return function () {
          return new AboutPanel();
        }
      })(this));

      this.on('focus', (function(_this) {
        return function() {
          return _this.focusActivePanel();
        };
      })(this));

      this.showDeferredPanel();
      if (!this.activePanel) {
        this.showPanel('Posts');
      }
      if (this.isOnDom()) {
        return this.sidebar.width(this.sidebar.width());
      }
    };

    VibloPluginSettingsView.prototype.serialize = function () {
      var ref1;
      return {
        deserializer: 'VibloPluginSettingsView',
        version: 1,
        activePanel: (ref1 = this.activePanel) != null ? ref1 : this.deferredPanel,
        uri: this.uri
      };
    };

    VibloPluginSettingsView.prototype.addCorePanel = function (name, iconName, panel) {
      var panelMenuItem;
      panelMenuItem = $$(function () {
        return this.li({
          name: name
        }, (function (_this) {
          return function () {
            return _this.a({
              "class": "icon " + iconName
            }, name);
          };
        })(this));
      });
      this.menuSeparator.before(panelMenuItem);
      return this.addPanel(name, panelMenuItem, panel);
    };

    VibloPluginSettingsView.prototype.addPanel = function (name, panelMenuItem, panelCreateCallback) {
      var ref1;
      if (this.panelCreateCallbacks == null) {
        this.panelCreateCallbacks = {};
      }
      this.panelCreateCallbacks[name] = panelCreateCallback;
      if (((ref1 = this.deferredPanel) != null ? ref1.name : void 0) === name) {
        return this.showDeferredPanel();
      }
    };

    VibloPluginSettingsView.prototype.getOrCreatePanel = function (name, options) {
      var callback, panel, ref1, ref2, ref3;
      panel = (ref1 = this.panelsByName) != null ? ref1[name] : void 0;
      if (panel == null) {
        callback = (ref2 = this.panelCreateCallbacks) != null ? ref2[name] : void 0;
        if ((options != null ? options.pack : void 0) && !callback) {
          callback = (function (_this) {
            return function () {
              return null;
            };
          })(this);
        }
        if (callback) {
          panel = callback();
          if (this.panelsByName == null) {
            this.panelsByName = {};
          }
          this.panelsByName[name] = panel;
          if ((ref3 = this.panelCreateCallbacks) != null) {
            delete ref3[name];
          }
        }
      }
      return panel;
    };

    VibloPluginSettingsView.prototype.makePanelMenuActive = function (name) {
      this.sidebar.find('.active').removeClass('active');
      return this.sidebar.find("[name='" + name + "']").addClass('active');
    };

    VibloPluginSettingsView.prototype.focusActivePanel = function () {
      var child, i, len, panel, ref1, view;
      ref1 = this.panels.children();
      for (i = 0, len = ref1.length; i < len; i++) {
        panel = ref1[i];
        child = $(panel);
        if (child.isVisible()) {
          if (view = child.view()) {
            view.focus();
          } else {
            child.focus();
          }
          return;
        }
      }
    };

    VibloPluginSettingsView.prototype.showDeferredPanel = function () {
      var name, options, ref1;
      if (this.deferredPanel == null) {
        return;
      }
      ref1 = this.deferredPanel, name = ref1.name, options = ref1.options;
      return this.showPanel(name, options);
    };

    VibloPluginSettingsView.prototype.showPanel = function (name, options) {
      var panel;
      if (panel = this.getOrCreatePanel(name, options)) {
        this.appendPanel(panel, options);
        this.makePanelMenuActive(name);
        this.setActivePanel(name, options);
        return this.deferredPanel = null;
      } else {
        return this.deferredPanel = {
          name: name,
          options: options
        };
      }
    };

    VibloPluginSettingsView.prototype.appendPanel = function (panel, options) {
      this.panels.children().hide();
      if (!$.contains(this.panels[0], panel[0])) {
        this.panels.append(panel);
      }
      if (typeof panel.beforeShow === "function") {
        panel.beforeShow(options);
      }
      panel.show();
      return panel.focus();
    };

    VibloPluginSettingsView.prototype.setActivePanel = function (name, options) {
      if (options == null) {
        options = {};
      }
      return this.activePanel = {
        name: name,
        options: options
      };
    };

    VibloPluginSettingsView.prototype.removePanel = function (name) {
      var panel, ref1;
      if (panel = (ref1 = this.panelsByName) != null ? ref1[name] : void 0) {
        panel.remove();
        return delete this.panelsByName[name];
      }
    };

    VibloPluginSettingsView.prototype.getTitle = function () {
      return "Viblo";
    };

    VibloPluginSettingsView.prototype.getIconName = function () {
      return "viblo-logo";
    };

    VibloPluginSettingsView.prototype.getURI = function () {
      return this.uri;
    };

    VibloPluginSettingsView.prototype.isEqual = function (other) {
      return other instanceof VibloPluginSettingsView;
    };

    return VibloPluginSettingsView;

  })(ScrollView);

}).call(this);
