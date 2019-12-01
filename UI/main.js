webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var RouteBinder = __webpack_require__(50);
	var SignalRBroadcaster = __webpack_require__(51);
	var NavbarLayout = __webpack_require__(55);
	var AppLayout = __webpack_require__(68);
	var MoviesController = __webpack_require__(74);
	var Router = __webpack_require__(178);
	var ModalController = __webpack_require__(457);
	var ControlPanelController = __webpack_require__(483);
	var ServerStatusModel = __webpack_require__(25);
	var Tooltip = __webpack_require__(484);
	var UiSettingsController = __webpack_require__(485);
	//We need this for filters to work, fuck you backbone.
	var SeriesCollection = __webpack_require__(486);
	
	__webpack_require__(488);
	__webpack_require__(3);
	__webpack_require__(489);
	__webpack_require__(490);
	__webpack_require__(492);
	__webpack_require__(493);
	
	new MoviesController();
	//new SeriesCollection();
	new ModalController();
	new ControlPanelController();
	new Router();
	
	var app = new Marionette.Application();
	
	app.addInitializer(function() {
	    console.log("starting application");
	});
	
	app.addInitializer(SignalRBroadcaster.appInitializer, { app : app });
	
	app.addInitializer(Tooltip.appInitializer, { app : app });
	
	app.addInitializer(function() {
	    Backbone.history.start({
	        pushState : true,
	        root      : ServerStatusModel.get("urlBase")
	    });
	    RouteBinder.bind();
	    AppLayout.navbarRegion.show(new NavbarLayout());
	    $("body").addClass("started");
	});
	
	app.addInitializer(UiSettingsController.appInitializer);
	
	app.addInitializer(function() {
	    var isDebug = ServerStatusModel.get("isDebug");
	    var isProduction = ServerStatusModel.get("isProduction");
	
	    if (isDebug === true) {
	        $("body").addClass("debug");
	    }
	
	    if (isProduction === true) {
	        $("body").addClass("production");
	    }
	});
	
	app.addInitializer(function() {
	    var footerText = ServerStatusModel.get("version");
	    if (ServerStatusModel.get("branch") !== "master") {
	        footerText += "<br>" + ServerStatusModel.get("branch");
	    }
	    $("#footer-region .version").html(footerText);
	});
	
	app.start();
	
	module.exports = app;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var $ = __webpack_require__(1);
	var StatusModel = __webpack_require__(25);
	
	//This module will automatically route all relative links through backbone router rather than
	//causing links to reload pages.
	
	var routeBinder = {
	
	    bind : function() {
	        var self = this;
	        $(document).on('click contextmenu', 'a[href]', function(event) {
	            self._handleClick(event);
	        });
	    },
	
	    _handleClick : function(event) {
	        var $target = $(event.target);
	
	        //check if tab nav
	        if ($target.parents('.nav-tabs').length) {
	            return;
	        }
	
	        var linkElement = $target.closest('a').first();
	        var href = linkElement.attr('href');
	
	        if (href && href.startsWith('http')) {
	            // Set noreferrer for external links.
	            if (!linkElement.attr('rel')) {
	                linkElement.attr('rel', 'noreferrer');
	            }
	            // Open all external links in new windows.
	            if (!linkElement.attr('target')) {
	                linkElement.attr('target', '_blank');
	            }
	        }
	
	        if (linkElement.hasClass('no-router') || event.type !== 'click') {
	            return;
	        }
	
	        if (!href) {
	            throw 'couldn\'t find route target';
	        }
	
	        if (!href.startsWith('http')) {
	            event.preventDefault();
	
	            if (event.ctrlKey) {
	                window.open(href, '_blank');
	            }
	
	            else {
	                var relativeHref = href.replace(StatusModel.get('urlBase'), '');
	
	                Backbone.history.navigate(relativeHref, { trigger : true });
	            }
	        }
	    }
	};
	
	module.exports = routeBinder;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var $ = __webpack_require__(1);
	var Messenger = __webpack_require__(52);
	var StatusModel = __webpack_require__(25);
	__webpack_require__(38);
	
	module.exports = {
	    appInitializer : function() {
	        console.log('starting signalR');
	
	        var getStatus = function(status) {
	            switch (status) {
	                case 0:
	                    return 'connecting';
	                case 1:
	                    return 'connected';
	                case 2:
	                    return 'reconnecting';
	                case 4:
	                    return 'disconnected';
	                default:
	                    throw 'invalid status ' + status;
	            }
	        };
	
	        var tryingToReconnect = false;
	        var messengerId = 'signalR';
	
	        this.signalRconnection = $.connection(StatusModel.get('urlBase') + '/signalr', { apiKey: window.NzbDrone.ApiKey });
	
	        this.signalRconnection.stateChanged(function(change) {
	            console.debug('SignalR: [{0}]'.format(getStatus(change.newState)));
	        });
	
	        this.signalRconnection.received(function(message) {
	            vent.trigger('server:' + message.name, message.body);
	        });
	
	        this.signalRconnection.reconnecting(function() {
	            if (window.NzbDrone.unloading) {
	                return;
	            }
	
	            tryingToReconnect = true;
	        });
	
	        this.signalRconnection.reconnected(function() {
	            tryingToReconnect = false;
	        });
	
	        this.signalRconnection.disconnected(function() {
	            if (tryingToReconnect) {
	                $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
	
	                Messenger.show({
	                    id        : messengerId,
	                    type      : 'error',
	                    hideAfter : 0,
	                    message   : 'Connection to backend lost',
	                    actions   : {
	                        cancel : {
	                            label  : 'Reload',
	                            action : function() {
	                                window.location.reload();
	                            }
	                        }
	                    }
	                });
	            }
	        });
	
	        this.signalRconnection.start({ transport : ['longPolling'] });
	
	        return this;
	    }
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	
	var messenger = __webpack_require__(53);
	module.exports = {
	    show : function(options) {
	        if (!options.type) {
	            options.type = 'info';
	        }
	
	        if (options.hideAfter === undefined) {
	            switch (options.type) {
	                case 'info':
	                    options.hideAfter = 5;
	                    break;
	
	                case 'success':
	                    options.hideAfter = 5;
	                    break;
	
	                default:
	                    options.hideAfter = 5;
	            }
	        }
	
	        options.hideOnNavigate = options.hideOnNavigate || false;
	
	        return messenger().post({
	            message         : options.message,
	            type            : options.type,
	            showCloseButton : true,
	            hideAfter       : options.hideAfter,
	            id              : options.id,
	            actions         : options.actions,
	            hideOnNavigate  : options.hideOnNavigate
	        });
	    },
	
	    monitor : function(options) {
	        if (!options.promise) {
	            throw 'promise is required';
	        }
	
	        if (!options.successMessage) {
	            throw 'success message is required';
	        }
	
	        if (!options.errorMessage) {
	            throw 'error message is required';
	        }
	
	        var self = this;
	
	        options.promise.done(function() {
	            self.show({ message : options.successMessage });
	        });
	
	        options.promise.fail(function() {
	            self.show({
	                message : options.errorMessage,
	                type    : 'error'
	            });
	        });
	
	        return options.promise;
	    }
	};

/***/ },
/* 53 */,
/* 54 */,
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var $ = __webpack_require__(1);
	var HealthView = __webpack_require__(56);
	var QueueView = __webpack_require__(59);
	__webpack_require__(60);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Navbar/NavbarLayoutTemplate',
	
	    regions : {
	        health : '#x-health',
	        queue  : '#x-queue-count'
	    },
	
	    ui : {
	        search   : '.x-movies-search',
	        collapse : '.x-navbar-collapse'
	    },
	
	    events : {
	        'click a' : 'onClick'
	    },
	
	    onRender : function() {
	        this.ui.search.bindSearch();
	        this.health.show(new HealthView());
	        this.queue.show(new QueueView());
	    },
	
	    onClick : function(event) {
	        var target = $(event.target);
	        var linkElement = target;
	        //look down for <a/>
	        var href = event.target.getAttribute('href');
	
	        if (!href && target.closest('a') && target.closest('a')[0]) {
	
	            linkElement = target.closest('a')[0];
	
	            href = linkElement.getAttribute('href');
	        }
	
	        if (href && href.startsWith("http")) {
	            return;
	        }
	
	        event.preventDefault();
	
	        //if couldn't find it look up'
	        this.setActive(linkElement);
	
	        if ($(window).width() < 768) {
	            this.ui.collapse.collapse('hide');
	        }
	    },
	
	    setActive : function(element) {
	        //Todo: Set active on first load
	        this.$('a').removeClass('active');
	        $(element).addClass('active');
	    }
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var HealthCollection = __webpack_require__(57);
	
	module.exports = Marionette.ItemView.extend({
	    tagName : 'span',
	
	    initialize : function() {
	        this.listenTo(HealthCollection, 'sync', this._healthSync);
	        HealthCollection.fetch();
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        if (HealthCollection.length === 0) {
	            return this;
	        }
	
	        var count = HealthCollection.length;
	        var label = 'label-warning';
	        var errors = HealthCollection.some(function(model) {
	            return model.get('type') === 'error';
	        });
	
	        if (errors) {
	            label = 'label-danger';
	        }
	
	        this.$el.html('<span class="label {0}">{1}</span>'.format(label, count));
	        return this;
	    },
	
	    _healthSync : function() {
	        this.render();
	    }
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var HealthModel = __webpack_require__(58);
	__webpack_require__(37);
	
	var Collection = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/health',
	    model : HealthModel
	});
	
	var collection = new Collection().bindSignalR();
	collection.fetch();
	
	module.exports = collection;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var QueueCollection = __webpack_require__(28);
	
	module.exports = Marionette.ItemView.extend({
	    tagName : 'span',
	
	    initialize : function() {
	        this.listenTo(QueueCollection, 'sync', this.render);
	        QueueCollection.fetch();
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        if (QueueCollection.length === 0) {
	            return this;
	        }
	
	        var count = QueueCollection.fullCollection.length;
	        var label = 'label-info';
	
	        var errors = QueueCollection.fullCollection.some(function(model) {
	            return model.has('trackedDownloadStatus') && model.get('trackedDownloadStatus').toLowerCase() === 'error';
	        });
	
	        var warnings = QueueCollection.fullCollection.some(function(model) {
	            return model.has('trackedDownloadStatus') && model.get('trackedDownloadStatus').toLowerCase() === 'warning';
	        });
	
	        if (errors) {
	            label = 'label-danger';
	        } else if (warnings) {
	            label = 'label-warning';
	        }
	
	        this.$el.html('<span class="label {0}">{1}</span>'.format(label, count));
	        return this;
	    }
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Backbone = __webpack_require__(6);
	var FullMovieCollection = __webpack_require__(61);
	__webpack_require__(65);
	
	vent.on(vent.Hotkeys.NavbarSearch, function() {
	    $('.x-movies-search').focus();
	});
	
	var substringMatcher = function() {
	    return function findMatches (q, cb) {
	        var matches = _.select(FullMovieCollection.toJSON(), function(movie) {
	            return movie.title.toLowerCase().indexOf(q.toLowerCase()) > -1;
	        });
	        cb(matches);    
	    };
	};
	
	$.fn.bindSearch = function() {
	    $(this).typeahead({
	        hint      : true,
	        highlight : true,
	        minLength : 1
	    }, {
	        name       : 'movie',
	        displayKey : function(movie) {
	           return movie.title + ' (' + movie.year + ')';
	        },
	        templates  : {
	          empty : function(input) {
	            var escapedQuery = _.escape(input.query);
	
	            return "<div class='tt-dataset-series'><span class='tt-suggestions' style='display: block;'><div class='tt-suggestion'><p style='white-space: normal;'><a class='no-movies-found' href='/addmovies/search/'" + escapedQuery + "'>Search for " + escapedQuery + "</a></p></div></span></div>";
	          },
	        },
	        source     : substringMatcher()
	    });
	
	    $(this).on('typeahead:selected typeahead:autocompleted', function(e, movie) {
	        this.blur();
	        $(this).val('');
	        Backbone.history.navigate('/movies/{0}'.format(movie.titleSlug), { trigger : true });
	    });
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var movieCollection = __webpack_require__(62);
	
	var fullCollection = movieCollection.clone();
	fullCollection.reset();
	fullCollection.bindSignalR();
	fullCollection.state.pageSize = -1;
	fullCollection.state.page = 0;
	//fullCollection.mode = "client";
	fullCollection.parseRecords = function(resp) {
	    return resp;
	};
	
	fullCollection.fetch({reset : true});
	module.exports = fullCollection;
	
	/*var movieCollection = require('./MoviesCollectionClient');
	
	movieCollection.bindSignalR();
	module.exports = movieCollection.fullCollection;*/


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backbone = __webpack_require__(6);
	var PageableCollection = __webpack_require__(29);
	var MovieModel = __webpack_require__(31);
	var ApiData = __webpack_require__(23);
	var AsFilteredCollection = __webpack_require__(63);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	var moment = __webpack_require__(17);
	var UiSettings = __webpack_require__(22);
	__webpack_require__(37);
	var Config = __webpack_require__(33);
	
	var pageSize = parseInt(Config.getValue("pageSize")) || 250;
	
	var filterModes = {
	    'all'        : [
	        null,
	        null
	    ],
	    'continuing' : [
	        'status',
	        'continuing'
	    ],
	    'ended'      : [
	        'status',
	        'ended'
	    ],
	    'monitored'  : [
	        'monitored',
	        true
	    ],
	    'unmonitored'  : [
	        'monitored',
	        false
	    ],
	    'missing'  : [
	        'downloaded',
	        false
	    ],
	    'released'  : [
	        "status",
	        "released",
	        //function(model) { return model.getStatus() == "released"; }
	    ],
	    'announced'  : [
	        "status",
	        "announced",
	        //function(model) { return model.getStatus() == "announced"; }
	    ],
	    'cinemas'  : [
	        "status",
	        "inCinemas",
	        //function(model) { return model.getStatus() == "inCinemas"; }
	    ]
	}; //Hacky, I know
	
	
	var Collection = PageableCollection.extend({
	    url       : window.NzbDrone.ApiRoot + '/movie',
	    model     : MovieModel,
	    tableName : 'movie',
	
	    origSetSorting : PageableCollection.prototype.setSorting,
	    origAdd : PageableCollection.prototype.add,
	    origSort : PageableCollection.prototype.sort,
	
	    state : {
	        sortKey            : 'sortTitle',
	        order              : -1,
	        pageSize           : pageSize,
	        secondarySortKey   : 'sortTitle',
	        secondarySortOrder : -1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	    parseState : function(resp) {
		  if (this.mode === 'client') {
		  	return {};
		  }
	
		  if (this.state.pageSize === -1) {
		      return this.state;
	      }
	
	      var direction = -1;
	      if (resp.sortDirection.toLowerCase() === "descending") {
	        direction = 1;
	      }
	        return { totalRecords : resp.totalRecords, order : direction, currentPage : resp.page };
	    },
	
	    parseRecords : function(resp) {
	        if (resp && this.mode !== 'client' && this.state.pageSize !== 0 && this.state.pageSize !== -1) {
	            return resp.records;
	        }
	
	        return resp;
	    },
	
	    mode : 'server',
	
	    setSorting : function(sortKey, order, options) {
	        return this.origSetSorting.call(this, sortKey, order, options);
	    },
	
	    sort : function(options){
	    	//if (this.mode == 'server' && this.state.order == '-1' && this.state.sortKey === 'sortTitle'){
	        //    this.origSort(options);
	        //}
	    },
	
	    save : function() {
	        var self = this;
			var t= self;
			if (self.mode === 'client') {
				t = self.fullCollection;
				}
	        var proxy = _.extend(new Backbone.Model(), {
	            id : '',
	
	            url : self.url + '/editor',
	
	            toJSON : function() {
	                return self.filter(function(model) {
	                    return model.edited;
	                });
	            }
	        });
	        this.listenTo(proxy, 'sync', function(proxyModel, models) {
				if (self.mode === 'client') {
	            	this.fullCollection.add(models, { merge : true });
				} else {
					this.add(models, { merge : true });
				}
	            this.trigger('save', this);
	        });
	
	        return proxy.save();
	    },
	
	    importFromList : function(models) {
	        var self = this;
	
	        var proxy = _.extend(new Backbone.Model(), {
	            id : "",
	
	            url : self.url + "/import",
	
	            toJSON : function() {
	                return models;
	            }
	        });
	
	        this.listenTo(proxy, "sync", function(proxyModel, models) {
	            this.add(models, { merge : true});
	            this.trigger("save", this);
	        });
	
	        return proxy.save();
	    },
	
	    filterModes : filterModes,
	
	    sortMappings : {
	        movie : {
	            sortKey : 'movie.sortTitle'
	        },
	        title : {
	            sortKey : 'sortTitle'
	        },
	        statusWeight : {
	          sortValue : function(model, attr) {
	            if (model.getStatus().toLowerCase() === "released") {
	              return 3;
	            }
	            if (model.getStatus().toLowerCase() === "incinemas") {
	              return 2;
	            }
	            if (model.getStatus().toLowerCase() === "announced") {
		      return 1;
		    }
	            return -1;
	          }
	        },
	        downloadedQuality : {
	          sortValue : function(model, attr) {
	            if (model.get("movieFile")) {
	              return model.get("movieFile").quality.quality.name;
	            }
	
	            return "";
	          }
	        },
	        nextAiring : {
	            sortValue : function(model, attr, order) {
	                var nextAiring = model.get(attr);
	
	                if (nextAiring) {
	                    return moment(nextAiring).unix();
	                }
	
	                if (order === 1) {
	                    return 0;
	                }
	
	                return Number.MAX_VALUE;
	            }
	        },
	        status: {
	          sortValue : function(model, attr) {
	            if (model.get("downloaded")) {
	              return -1;
	            }
	            return 0;
	          }
	        },
	        inCinemas : {
	
	          sortValue : function(model, attr) {
	            var monthNames = ["January", "February", "March", "April", "May", "June",
	            "July", "August", "September", "October", "November", "December"
	          ];
	            if (model.get("inCinemas")) {
	              return model.get("inCinemas");
	            }
	            return "2100-01-01";
	          }
	        },
	        path : {
	            sortValue : function(model) {
	                var path = model.get('path');
	
	                return path.toLowerCase();
	            }
	        }
	    },
	
	    add : function(model, options) {
	      if (this.length >= this.state.pageSize && this.state.pageSize !== -1) {
	        return;
	      }
	      this.origAdd.call(this, model, options);
	    },
	
	    setFilterMode : function(mode){
	      var arr = this.filterModes[mode];
	      this.state.filterKey = arr[0];
	      this.state.filterValue = arr[1];
	      this.fetch();
	    },
	
	    isFiltered : function() {
	        return this.state.filterKey && this.state.filterKey !== 'all';
	    },
	
	    comparator: function (model) {
			return model.get('sortTitle');
	    }
	});
	
	Collection = AsFilteredCollection.call(Collection);
	Collection = AsSortedCollection.call(Collection);
	Collection = AsPersistedStateCollection.call(Collection);
	
	var filterMode = Config.getValue("movie.filterMode", "all");
	var sortKey = Config.getValue("movie.sortKey", "sortTitle");
	var sortDir = Config.getValue("movie.sortDirection", -1);
	var sortD = "asc";
	if (sortDir === 1) {
	  sortD = "desc";
	}
	
	var values = filterModes[filterMode];
	
	var data = ApiData.get("movie?page=1&pageSize={0}&sortKey={3}&sortDir={4}&filterKey={1}&filterValue={2}".format(pageSize, values[0], values[1], sortKey, sortD));
	
	module.exports = new Collection(data.records, { full : false, state : { totalRecords : data.totalRecords} }).bindSignalR();


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backbone = __webpack_require__(6);
	
	module.exports = function() {
	
	    this.prototype.setFilter = function(filter, options) {
	        options = _.extend({ reset : true }, options || {});
	
	        this.state.filterKey = filter[0];
	        this.state.filterValue = filter[1];
	        this.state.filterType = filter[2] || 'equal';
	
	        if (options.reset) {
	            if (this.mode !== 'server') {
	                this.fullCollection.resetFiltered();
	            } else {
	                return this.fetch();
	            }
	        }
	    };
	
	    this.prototype.setFilterMode = function(mode, options) {
	        return this.setFilter(this.filterModes[mode], options);
	    };
	
	    var originalMakeFullCollection = this.prototype._makeFullCollection;
	
	    this.prototype._makeFullCollection = function(models, options) {
	        var self = this;
	
	        self.shadowCollection = originalMakeFullCollection.call(this, models, options);
	
	        var filterModel = function(model) {
	            if (_.isFunction(self.state.filterType)) {
	                return self.state.filterType(model);
	            }
	
	            if (!self.state.filterKey) {
	                return true;
	            }
	            else if (self.state.filterType === 'contains') {
	                return model.get(self.state.filterKey).toLowerCase().indexOf(self.state.filterValue.toLowerCase()) > -1;
	            }
	            else {
	                return model.get(self.state.filterKey) === self.state.filterValue;
	            }
	        };
	
	        self.shadowCollection.filtered = function() {
	            return this.filter(filterModel);
	        };
	
	        var filteredModels = self.shadowCollection.filtered();
	        var fullCollection = originalMakeFullCollection.call(this, filteredModels, options);
	
	        fullCollection.resetFiltered = function(options) {
	            Backbone.Collection.prototype.reset.call(this, self.shadowCollection.filtered(), options);
	        };
	
	        fullCollection.reset = function(models, options) {
	            self.shadowCollection.reset(models, options);
	            self.fullCollection.resetFiltered();
	        };
	
	        return fullCollection;
	    };
	
	    _.extend(this.prototype.state, {
	        filterKey   : null,
	        filterValue : null,
			filterType  : null
	    });
	
	    _.extend(this.prototype.queryParams, {
	        filterKey   : 'filterKey',
	        filterValue : 'filterValue',
			filterType  : 'filterType'
	    });
	
	    return this;
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Config = __webpack_require__(33);
	
	module.exports = function() {
	
	    var originalInit = this.prototype.initialize;
	    var _setInitialState, _storeStateFromBackgrid, _storeState, _convertDirectionToInt;
	    this.prototype.initialize = function(options) {
	
	        options = options || {};
	
	        if (options.tableName) {
	            this.tableName = options.tableName;
	        }
	
	        if (!this.tableName && !options.tableName) {
	            throw 'tableName is required';
	        }
	
	        _setInitialState.call(this);
	
	        this.on('backgrid:sort', _storeStateFromBackgrid, this);
	        this.on('drone:sort', _storeState, this);
	
	        if (originalInit) {
	            originalInit.call(this, options);
	        }
	    };
	
	    if (!this.prototype._getSortMapping) {
	        this.prototype._getSortMapping = function(key) {
	            return {
	                name    : key,
	                sortKey : key
	            };
	        };
	    }
	
	    _setInitialState = function() {
	        var key = Config.getValue('{0}.sortKey'.format(this.tableName), this.state.sortKey);
	        var direction = Config.getValue('{0}.sortDirection'.format(this.tableName), this.state.order);
	        var order = parseInt(direction, 10);
	
	        this.state.sortKey = this._getSortMapping(key).sortKey;
	        this.state.order = order;
	    };
	
	    _storeStateFromBackgrid = function(column, sortDirection) {
	        var order = _convertDirectionToInt(sortDirection);
	        var sortKey = this._getSortMapping(column.get('name')).sortKey;
	
	        Config.setValue('{0}.sortKey'.format(this.tableName), sortKey);
	        Config.setValue('{0}.sortDirection'.format(this.tableName), order);
	    };
	
	    _storeState = function(sortModel, sortDirection) {
	        var order = _convertDirectionToInt(sortDirection);
	        var sortKey = this._getSortMapping(sortModel.get('name')).sortKey;
	
	        Config.setValue('{0}.sortKey'.format(this.tableName), sortKey);
	        Config.setValue('{0}.sortDirection'.format(this.tableName), order);
	    };
	
	    _convertDirectionToInt = function(dir) {
	        if (dir === 'ascending') {
	            return '-1';
	        }
	
	        return '1';
	    };
	
	    return this;
	};


/***/ },
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ModalRegion = __webpack_require__(69);
	var ModalRegion2 = __webpack_require__(72);
	var ControlPanelRegion = __webpack_require__(73);
	
	var Layout = Marionette.Layout.extend({
	    regions : {
	        navbarRegion : '#nav-region',
	        mainRegion   : '#main-region'
	    },
	
	    initialize : function() {
	        this.addRegions({
	            modalRegion        : ModalRegion,
	            modalRegion2       : ModalRegion2,
	            controlPanelRegion : ControlPanelRegion
	        });
	    }
	});
	module.exports = new Layout({ el : 'body' });

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var ModalRegionBase = __webpack_require__(70);
	
	var region = ModalRegionBase.extend({
	    el : '#modal-region'
	});
	
	module.exports = region;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	__webpack_require__(71);
	var region = Marionette.Region.extend({
	    el : '#modal-region',
	
	    constructor : function() {
	        Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
	        this.on('show', this.showModal, this);
	    },
	
	    getEl : function(selector) {
	        var $el = $(selector);
	        $el.on('hidden', this.close);
	        return $el;
	    },
	
	    showModal : function() {
	        this.trigger('modal:beforeShow');
	        this.$el.addClass('modal fade');
	
	        //need tab index so close on escape works
	        //https://github.com/twitter/bootstrap/issues/4663
	        this.$el.attr('tabindex', '-1');
	        this.$el.modal({
	            show     : true,
	            keyboard : true,
	            backdrop : true
	        });
	
	        this.$el.on('hide.bs.modal', $.proxy(this._closing, this));
	        this.$el.on('hidden.bs.modal', $.proxy(this._closed, this));
	
	        this.currentView.$el.addClass('modal-dialog');
	
	        this.$el.on('shown.bs.modal', _.bind(function() {
	            this.trigger('modal:afterShow');
	            this.currentView.trigger('modal:afterShow');
	        }, this));
	    },
	
	    closeModal : function() {
	        $(this.el).modal('hide');
	        this.reset();
	    },
	
	    _closing : function() {
	        if (this.$el) {
	            this.$el.off('hide.bs.modal');
	            this.$el.off('shown.bs.modal');
	        }
	
	        this.reset();
	    },
	
	    _closed: function () {
	        if (this.$el) {
	            this.$el.off('hidden.bs.modal');
	        }
	    }
	});
	
	module.exports = region;

/***/ },
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var ModalRegionBase = __webpack_require__(70);
	
	var region = ModalRegionBase.extend({
	    el : '#modal-region2',
	
	    initialize : function () {
	        this.listenTo(this, 'modal:beforeShow', this.onBeforeShow);
	    },
	
	    onBeforeShow : function () {
	        this.$el.addClass('modal fade');
	        this.$el.attr('tabindex', '-1');
	        this.$el.css('z-index', '1060');
	
	        this.$el.on('shown.bs.modal', function() {
	            $('.modal-backdrop:last').css('z-index', 1059);
	        });
	    },
	
	    _closed : function () {
	        ModalRegionBase.prototype._closed.apply(this, arguments);
	
	        if (__webpack_require__(68).modalRegion.currentView) {
	            $('body').addClass('modal-open');
	        }
	    }
	});
	
	module.exports = region;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var region = Marionette.Region.extend({
	    el : '#control-panel-region',
	
	    constructor : function() {
	        Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
	        this.on('show', this.showPanel, this);
	    },
	
	    getEl : function(selector) {
	        var $el = $(selector);
	
	        return $el;
	    },
	
	    showPanel : function() {
	        $('body').addClass('control-panel-visible');
	        this.$el.animate({
	            'margin-bottom' : 0,
	            'opacity'       : 1
	        }, {
	            queue    : false,
	            duration : 300
	        });
	    },
	
	    closePanel : function() {
	        $('body').removeClass('control-panel-visible');
	        this.$el.animate({
	            'margin-bottom' : -100,
	            'opacity'       : 0
	        }, {
	            queue    : false,
	            duration : 300
	        });
	        this.reset();
	    }
	});
	module.exports = region;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneController = __webpack_require__(75);
	var AppLayout = __webpack_require__(68);
	var MoviesCollection = __webpack_require__(62);
	var FullMovieCollection = __webpack_require__(61);
	var MoviesIndexLayout = __webpack_require__(77);
	var MoviesDetailsLayout = __webpack_require__(117);
	var $ = __webpack_require__(1);
	
	module.exports = NzbDroneController.extend({
			_originalInit : NzbDroneController.prototype.initialize,
	
			initialize : function() {
					this.route('', this.movies);
					this.route('movies', this.movies);
					this.route('movies/:query', this.movieDetails);
	
					this._originalInit.apply(this, arguments);
			},
	
			movies : function() {
					this.setTitle('Movies');
					this.showMainRegion(new MoviesIndexLayout());
			},
	
			movieDetails : function(query) {
	
				if(FullMovieCollection.length > 0) {
					this._renderMovieDetails(query);
				} else {
					var self = this;
					$.getJSON(window.NzbDrone.ApiRoot + '/movie/titleslug/'+query, { }, function(data) {
							FullMovieCollection.add(data);
							self._renderMovieDetails(query);
						});
					this.listenTo(FullMovieCollection, 'sync', function(model, options) {
						this._renderMovieDetails(query);
					});
				}
			},
	
	
			_renderMovieDetails: function(query) {
				var movies = FullMovieCollection.where({ titleSlug : query });
				if (movies.length !== 0) {
						var targetMovie = movies[0];
	
						this.setTitle(targetMovie.get('title'));
						this.showMainRegion(new MoviesDetailsLayout({ model : targetMovie }));
				} else {
						this.showNotFound();
				}
			}
	});


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var NotFoundView = __webpack_require__(76);
	var Messenger = __webpack_require__(52);
	var Config = __webpack_require__(33);
	
	module.exports = Marionette.AppRouter.extend({
	    initialize : function() {
	        this.listenTo(vent, vent.Events.ServerUpdated, this._onServerUpdated);
	    },
	
	    showNotFound : function() {
	        this.setTitle('Not Found');
	        this.showMainRegion(new NotFoundView(this));
	    },
	
	    setTitle : function(title) {
	        title = title;
	        if (title === 'Radarr') {
	            document.title = 'Radarr';
	        } else {
	            document.title = title + ' - Radarr';
	        }
	
	        if (window.NzbDrone.Analytics && window.Piwik) {
	            try {
	                var piwik = window.Piwik.getTracker(window.location.protocol + '//radarr.video/piwik/piwik.php', 1);
	                piwik.setReferrerUrl('');
	                piwik.setCustomUrl('http://local' + window.location.pathname);
	                piwik.setCustomVariable(1, 'version', window.NzbDrone.Version, 'page');
	                piwik.setCustomVariable(2, 'branch', window.NzbDrone.Branch, 'page');
	                piwik.trackPageView(title);
	            }
	            catch (e) {
	                console.error(e);
	            }
	        }
	    },
	
	    _onServerUpdated : function() {
	        var label = window.location.pathname === window.NzbDrone.UrlBase + '/system/updates' ? 'Reload' : 'View Changes';
	
	        Messenger.show({
	            message   : 'Radarr has been updated, some UI configuration has been reset',
	            hideAfter : 0,
	            id        : 'sonarrUpdated',
	            actions   : {
	                viewChanges : {
	                    label  : label,
	                    action : function() {
	                        window.location = window.NzbDrone.UrlBase + '/system/updates';
	                    }
	                }
	            }
	        });
	
	        // Only for pre-release development
	        var pageSize = Config.getValue("pageSize");
	        window.localStorage.clear();
	        Config.setValue("pageSize", pageSize);
	        // Remove above when out of pre-release :)
	
	        this.pendingUpdate = true;
	    },
	
	    showMainRegion : function(view) {
	        if (this.pendingUpdate) {
	            window.location.reload();
	        } else {
	            AppLayout.mainRegion.show(view);
	        }
	    }
	});


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Shared/NotFoundViewTemplate'
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var PosterCollectionView = __webpack_require__(81);
	var ListCollectionView = __webpack_require__(89);
	var EmptyView = __webpack_require__(91);
	var MoviesCollection = __webpack_require__(62);
	
	var FullMovieCollection = __webpack_require__(61);
	var InCinemasCell = __webpack_require__(92);
	
	var RelativeDateCell = __webpack_require__(95);
	
	var MovieTitleCell = __webpack_require__(96);
	var TemplatedCell = __webpack_require__(93);
	var ProfileCell = __webpack_require__(97);
	var MovieLinksCell = __webpack_require__(98);
	var MovieActionCell = __webpack_require__(99);
	var MovieStatusCell = __webpack_require__(100);
	var MovieDownloadStatusCell = __webpack_require__(101);
	var DownloadedQualityCell = __webpack_require__(102);
	var FooterView = __webpack_require__(103);
	var GridPager = __webpack_require__(104);
	var FooterModel = __webpack_require__(107);
	var ToolbarLayout = __webpack_require__(108);
	__webpack_require__(37);
	var Config = __webpack_require__(33);
	
	//var MoviesCollectionClient = require('../MoviesCollectionClient');
	
	
	//this variable prevents double fetching the FullMovieCollection on first load
	//var shownOnce = false;
	//require('../Globals');
	window.shownOnce = false;
	module.exports = Marionette.Layout.extend({
	    template : 'Movies/Index/MoviesIndexLayoutTemplate',
	
	    regions : {
	        moviesRegion : '#x-movies',
	        toolbar      : '#x-toolbar',
	        toolbar2     : '#x-toolbar2',
	        footer       : '#x-movies-footer',
	        pager : "#x-movie-pager",
	        pagerTop : "#x-movie-pager-top"
	    },
	
	    columns : [
	        {
	            name  : 'status',
	            label : '',
	            cell  : MovieStatusCell
	        },
	        {
	            name      : 'title',
	            label     : 'Title',
	            cell      : MovieTitleCell,
	            cellValue : 'this',
	        },
	        {
	            name  : 'added',
	            label : 'Date Added',
	            cell  : RelativeDateCell
	        },
	        {
	          name : "movieFile.quality",
	          label : "Downloaded",
	          cell : DownloadedQualityCell,
	          sortable : true
	        },
	        {
	            name  : 'profileId',
	            label : 'Profile',
	            cell  : ProfileCell
	        },
	        {
	            name  : 'inCinemas',
	            label : 'In Cinemas',
	            cell  : RelativeDateCell
	        },
	        {
	            name      : 'this',
	            label     : 'Links',
	            cell      : MovieLinksCell,
	            className : "movie-links-cell",
	            sortable : false,
	        },
	        {
	          name        : "this",
	          label       : "Status",
	          cell        : MovieDownloadStatusCell,
	          sortable : false,
	          sortValue : function(m, k) {
	            if (m.get("downloaded")) {
	              return -1;
	            }
	            return 0;
	          }
	        },
	        {
	            name     : 'this',
	            label    : '',
	            sortable : false,
	            cell     : MovieActionCell
	        }
	    ],
	
	    leftSideButtons : {
	        type       : 'default',
	        storeState : false,
	        collapse   : true,
	        items      : [
	            {
	                title : 'Add Movie',
	                icon  : 'icon-radarr-add',
	                route : 'addmovies'
	            },
	            {
	                title : 'Movie Editor',
	                icon  : 'icon-radarr-edit',
	                route : 'movieeditor'
	            },
	            {
	                title        : 'RSS Sync',
	                icon         : 'icon-radarr-rss',
	                command      : 'rsssync',
	                errorMessage : 'RSS Sync Failed!'
	            },
	            {
	              title : "PreDB Sync",
	              icon : "icon-radarr-refresh",
	              command : "predbsync",
	              errorMessage : "PreDB Sync Failed!"
	            },
	            {
	                title          : 'Update Library',
	                icon           : 'icon-radarr-refresh',
	                command        : 'refreshmovie',
	                successMessage : 'Library was updated!',
	                errorMessage   : 'Library update failed!'
	            }
	        ]
	    },
	
	    initialize : function() {
	    	//this variable prevents us from showing the list before moviesCollection has been fetched the first time
	        this.moviesCollection = MoviesCollection.clone();
	        this.moviesCollection.bindSignalR();
			var pageSize = parseInt(Config.getValue("pageSize")) || 10;
			if (this.moviesCollection.state.pageSize !== pageSize) {
	        	this.moviesCollection.setPageSize(pageSize);
			}
	        //this.listenTo(MoviesCollection, 'sync', function() {
			//	this.moviesCollection.fetch();
			//});
	
	 		this.listenToOnce(this.moviesCollection, 'sync', function() {
	            this._showToolbar();
	            //this._fetchCollection();
	            if (window.shownOnce) {
	                //this._fetchCollection();
	                this._showFooter();
	            }
	            window.shownOnce = true;
	        });
	
	
	
		    this.listenTo(FullMovieCollection, 'sync', function() {
				this._showFooter();
			});
	
	        /*this.listenTo(this.moviesCollection, 'sync', function(model, collection, options) {
	            this._renderView();
				//MoviesCollectionClient.fetch();
	        });*/
	        this.listenTo(this.moviesCollection, "change", function(model) {
				if (model.get('saved'))	{
					model.set('saved', false);
					this.moviesCollection.fetch();
					//FullMovieCollection.fetch({reset : true });
					//this._showFooter();
					var m = FullMovieCollection.findWhere( { tmdbId : model.get('tmdbId') });
					m.set('monitored', model.get('monitored'));
					m.set('minimumAvailability', model.get('minimumAvailability'));
					m.set( {profileId : model.get('profileId') } );
	
					this._showFooter();
				}
			});
	
	
	        this.listenTo(this.moviesCollection, 'remove', function(model, collection, options) {
				if (model.get('deleted')) {
					this.moviesCollection.fetch(); //need to do this so that the page shows a full page and the 'total records' number is updated
					//FullMovieCollection.fetch({reset : true}); //need to do this to update the footer
					FullMovieCollection.remove(model);
					this._showFooter();
				}
	
	        });
			//this.moviesCollection.setPageSize(pageSize);
	
	
	        this.sortingOptions = {
	            type           : 'sorting',
	            storeState     : false,
	            viewCollection : this.moviesCollection,
	            callback : this._sort,
	            items          : [
	                {
	                    title : 'Title',
	                    name  : 'title'
	                },
	                {
	                    title: 'Downloaded',
	                    name: 'movieFile.quality'
	                },
	                {
	                    title : 'Profile',
	                    name  : 'profileId'
	                },
	                {
	                    title : 'In Cinemas',
	                    name  : 'inCinemas'
	                },
	                /*{
	                  title : "Status",
	                  name : "status",
	                }*/
	            ]
	        };
	
	        this.filteringOptions = {
	            type          : 'radio',
	            storeState    : true,
	            menuKey       : 'movie.filterMode',
	            defaultAction : 'all',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'monitored',
	                    title    : '',
	                    tooltip  : 'Monitored Only',
	                    icon     : 'icon-radarr-monitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'unmonitored',
	                    title    : '',
	                    tooltip  : 'UnMonitored Only',
	                    icon     : 'icon-radarr-unmonitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'missing',
	                    title    : '',
	                    tooltip  : 'Missing Only',
	                    icon     : 'icon-radarr-missing',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'released',
	                    title    : '',
	                    tooltip  : 'Released',
	                    icon     : 'icon-radarr-movie-released',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'announced',
	                    title    : '',
	                    tooltip  : 'Announced',
	                    icon     : 'icon-radarr-movie-announced',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'cinemas',
	                    title    : '',
	                    tooltip  : 'In Cinemas',
	                    icon     : 'icon-radarr-movie-cinemas',
	                    callback : this._setFilter
	                }
	            ]
	        };
	
	        this.viewButtons = {
	            type          : 'radio',
	            storeState    : true,
	            menuKey       : 'moviesViewMode',
	            defaultAction : 'listView',
	            items         : [
	                {
	                    key      : 'posterView',
	                    title    : '',
	                    tooltip  : 'Posters',
	                    icon     : 'icon-radarr-view-poster',
	                    callback : this._showPosters
	                },
	                {
	                    key      : 'listView',
	                    title    : '',
	                    tooltip  : 'Overview List',
	                    icon     : 'icon-radarr-view-list',
	                    callback : this._showList
	                },
	                {
	                    key      : 'tableView',
	                    title    : '',
	                    tooltip  : 'Table',
	                    icon     : 'icon-radarr-view-table',
	                    callback : this._showTable
	                }
	            ]
	        };
	
	            //this._showToolbar();
	            var self = this;
	            setTimeout(function(){self._showToolbar();}, 0); // jshint ignore:line
	            //this._renderView();
	    },
	
	    onShow : function() {
	/*		this.listenToOnce(this.moviesCollection, 'sync', function() {
	        	this._showToolbar();
				//this._fetchCollection();
				if (window.shownOnce) {
					//this._fetchCollection();
					this._showFooter();
				}
				window.shownOnce = true;
			});
	  */  },
	
	    _showTable : function() {
	        this.currentView = new Backgrid.Grid({
	            collection : this.moviesCollection,
	            columns    : this.columns,
	            className  : 'table table-hover'
	        });
	
	        //this._showPager();
	    	this._renderView();
	    },
	
	    _showList : function() {
	        //this.current = "list";
	        this.currentView = new ListCollectionView({
	            collection : this.moviesCollection
	        });
	
	        this._renderView();
	    },
	
	    _showPosters : function() {
	        this.currentView = new PosterCollectionView({
	            collection : this.moviesCollection
	        });
	
	        this._renderView();
	    },
	
	    _sort : function() {
	      console.warn("Sorting");
	    },
	
	    _renderView : function() {
	        if (MoviesCollection.length === 0 && !this.moviesCollection.isFiltered()) {
	            this.moviesRegion.show(new EmptyView());
	
	            this.toolbar.close();
	            this.toolbar2.close();
	        } else {
	            this.renderedOnce = true;
	            this.moviesRegion.show(this.currentView);
				this.listenTo(this.currentView.collection, 'sync', function(eventName){
					this._showPager();
				});
	            this._showToolbar();
	        }
	    },
	
		_fetchCollection : function() {
			this.moviesCollection.fetch();
		},
	
	    _setFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	        this.moviesCollection.setFilterMode(mode);
	    },
	
	    _showToolbar : function() {
	        if (this.toolbar.currentView) {
	            return;
	        }
	
	        this.toolbar2.show(new ToolbarLayout({
	            right   : [
	                this.filteringOptions
	            ],
	            context : this
	        }));
	
	        this.toolbar.show(new ToolbarLayout({
	            right   : [
	                this.sortingOptions,
	                this.viewButtons
	            ],
	            left    : [
	                this.leftSideButtons
	            ],
	            context : this
	        }));
	    },
	
	    _showPager : function() {
	      var pager = new GridPager({
	          columns    : this.columns,
	          collection : this.moviesCollection,
	      });
	      var pagerTop = new GridPager({
	          columns    : this.columns,
	          collection : this.moviesCollection,
	      });
	      this.pager.show(pager);
	      this.pagerTop.show(pagerTop);
	    },
	
	    _showFooter : function() {
	        var footerModel = new FooterModel();
	        var movies = FullMovieCollection.models.length;
	        //instead of all the counters could do something like this with different query in the where...
	        //var releasedMovies = FullMovieCollection.where({ 'released' : this.model.get('released') });
	        //    releasedMovies.length
	
	        var announced = 0;
			var incinemas = 0;
			var released = 0;
	
	    	var monitored = 0;
	
			var downloaded =0;
			var missingMonitored=0;
			var missingNotMonitored=0;
			var missingMonitoredNotAvailable=0;
			var missingMonitoredAvailable=0;
	
	        var downloadedMonitored=0;
			var downloadedNotMonitored=0;
	
	        _.each(FullMovieCollection.models, function(model) {
	
	        	if (model.get('status').toLowerCase() === 'released') {
	        		released++;
		    	}
		    	else if (model.get('status').toLowerCase() === 'incinemas') {
	            	incinemas++;
	        	}
		    	else if (model.get('status').toLowerCase() === 'announced') {
	            	announced++;
	        	}
	
	        	if (model.get('monitored')) {
	            		monitored++;
	  			if (model.get('downloaded')) {
					downloadedMonitored++;
				}
		    	}
		    	else { //not monitored
					if (model.get('downloaded')) {
						downloadedNotMonitored++;
					}
					else { //missing
						missingNotMonitored++;
					}
		    	}
	
		    	if (model.get('downloaded')) {
					downloaded++;
		    	}
	        	else { //missing
					if (!model.get('isAvailable')) {
	   					if (model.get('monitored')) {
							missingMonitoredNotAvailable++;
						}
					}
	
					if (model.get('monitored')) {
			    		missingMonitored++;
			    		if (model.get('isAvailable')) {
			        		missingMonitoredAvailable++;
			    		}
					}
	        	}
	    	});
	
	        footerModel.set({
	            movies      				    : movies,
	            announced   				    : announced,
		    	incinemas   				    : incinemas,
		    	released     				    : released,
	            monitored   				    : monitored,
	            downloaded  				    : downloaded,
				downloadedMonitored			    : downloadedMonitored,
		    	downloadedNotMonitored 		    : downloadedNotMonitored,
		    	missingMonitored 			    : missingMonitored,
	            missingMonitoredAvailable       : missingMonitoredAvailable,
		    	missingMonitoredNotAvailable    : missingMonitoredNotAvailable,
		    	missingNotMonitored 		    : missingNotMonitored
	        });
	
	        this.footer.show(new FooterView({ model : footerModel }));
	    }
	});


/***/ },
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var PosterItemView = __webpack_require__(82);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : PosterItemView,
	    itemViewContainer : '#x-movie-posters',
	    template          : 'Movies/Index/Posters/MoviePostersCollectionViewTemplate'
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var MoviesIndexItemView = __webpack_require__(83);
	
	module.exports = MoviesIndexItemView.extend({
	    tagName  : 'li',
	    template : 'Movies/Index/Posters/MoviePostersItemViewTemplate',
	
	    initialize : function() {
	        this.events['mouseenter .x-movie-poster-container'] = 'posterHoverAction';
	        this.events['mouseleave .x-movie-poster-container'] = 'posterHoverAction';
	
	        this.ui.controls = '.x-movie-controls';
	        this.ui.title = '.x-title';
	    },
	
	    posterHoverAction : function() {
	        this.ui.controls.slideToggle();
	        this.ui.title.slideToggle();
	    }
	});


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var CommandController = __webpack_require__(84);
	
	module.exports = Marionette.ItemView.extend({
	    ui : {
	        refresh : '.x-refresh',
	        search  : '.x-search'
	    },
	
	    events : {
	        'click .x-edit'    : '_editMovie',
	        'click .x-refresh' : '_refreshMovie',
	        'click .x-search'  : '_searchMovie'
	    },
	
	    onRender : function() {
	        CommandController.bindToCommand({
	            element : this.ui.refresh,
	            command : {
	                name     : 'refreshMovie',
	                movieId : this.model.get('id')
	            }
	        });
	
	        CommandController.bindToCommand({
	            element : this.ui.search,
	            command : {
	                name     : 'moviesSearch',
	                movieIds : [this.model.get('id')]
	            }
	        });
	    },
	
	    _editMovie : function() {
	        vent.trigger(vent.Commands.EditMovieCommand, { movie : this.model });
	    },
	
	    _refreshMovie : function() {
	        CommandController.Execute('refreshMovie', {
	            name     : 'refreshMovie',
	            movieId : this.model.id
	        });
	    },
	
	    _searchMovie : function() {
	        CommandController.Execute('moviesSearch', {
	            name     : 'moviesSearch',
	            movieIds : [this.model.id]
	        });
	    }
	});


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var CommandModel = __webpack_require__(85);
	var CommandCollection = __webpack_require__(86);
	var CommandMessengerCollectionView = __webpack_require__(87);
	var _ = __webpack_require__(8);
	var moment = __webpack_require__(17);
	var Messenger = __webpack_require__(52);
	__webpack_require__(4);
	
	CommandMessengerCollectionView.render();
	
	var singleton = function() {
	
	    return {
	
	        _lastCommand : {},
	
	        Execute : function(name, properties) {
	
	            var attr = _.extend({ name : name.toLocaleLowerCase() }, properties);
	            var commandModel = new CommandModel(attr);
	
	            if (this._lastCommand.command && this._lastCommand.command.isSameCommand(attr) && moment().add(-5, 'seconds').isBefore(this._lastCommand.time)) {
	
	                Messenger.show({
	                    message   : 'Please wait at least 5 seconds before running this command again',
	                    hideAfter : 5,
	                    type      : 'error'
	                });
	
	                return this._lastCommand.promise;
	            }
	
	            var promise = commandModel.save().success(function() {
	                CommandCollection.add(commandModel);
	            });
	
	            this._lastCommand = {
	                command : commandModel,
	                promise : promise,
	                time    : moment()
	            };
	
	            return promise;
	        },
	
	        bindToCommand : function(options) {
	
	            var self = this;
	            var existingCommand = CommandCollection.findCommand(options.command);
	
	            if (existingCommand) {
	                this._bindToCommandModel.call(this, existingCommand, options);
	            }
	
	            CommandCollection.bind('add', function(model) {
	                if (model.isSameCommand(options.command)) {
	                    self._bindToCommandModel.call(self, model, options);
	                }
	            });
	
	            CommandCollection.bind('sync', function() {
	                var command = CommandCollection.findCommand(options.command);
	                if (command) {
	                    self._bindToCommandModel.call(self, command, options);
	                }
	            });
	        },
	
	        _bindToCommandModel : function bindToCommand (model, options) {
	
	            if (!model.isActive()) {
	                options.element.stopSpin();
	                return;
	            }
	
	            model.bind('change:status', function(model) {
	                if (!model.isActive()) {
	                    options.element.stopSpin();
	
	                    if (model.isComplete()) {
	                        vent.trigger(vent.Events.CommandComplete, {
	                            command : model,
	                            model   : options.model
	                        });
	                    }
	                }
	            });
	            console.warn(options);
	            options.element.startSpin();
	        }
	    };
	};
	module.exports = singleton();


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	    url : window.NzbDrone.ApiRoot + '/command',
	
	    parse : function(response) {
	        response.name = response.name.toLocaleLowerCase();
	        response.body.name = response.body.name.toLocaleLowerCase();
	
	        for (var key in response.body) {
	            response[key] = response.body[key];
	        }
	
	        delete response.body;
	
	        return response;
	    },
	
	    isSameCommand : function(command) {
	
	        if (command.name.toLocaleLowerCase() !== this.get('name').toLocaleLowerCase()) {
	            return false;
	        }
	
	        for (var key in command) {
	            if (key !== 'name') {
	                if (Array.isArray(command[key])) {
	                    if (_.difference(command[key], this.get(key)).length > 0) {
	                        return false;
	                    }
	                }
	
	                else if (command[key] !== this.get(key)) {
	                    return false;
	                }
	            }
	        }
	
	        return true;
	    },
	
	    isActive : function() {
	        return this.get('status') !== 'completed' && this.get('status') !== 'failed';
	    },
	
	    isComplete : function() {
	        return this.get('status') === 'completed';
	    }
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var CommandModel = __webpack_require__(85);
	__webpack_require__(37);
	
	var CommandCollection = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/command',
	    model : CommandModel,
	
	    findCommand : function(command) {
	        return this.find(function(model) {
	            return model.isSameCommand(command);
	        });
	    }
	});
	
	var collection = new CommandCollection().bindSignalR();
	
	collection.fetch();
	
	module.exports = collection;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var commandCollection = __webpack_require__(86);
	var CommandMessengerItemView = __webpack_require__(88);
	
	var CollectionView = Marionette.CollectionView.extend({
	    itemView : CommandMessengerItemView
	});
	
	module.exports = new CollectionView({
	    collection : commandCollection
	});


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Messenger = __webpack_require__(52);
	
	module.exports = Marionette.ItemView.extend({
	    initialize : function() {
	        this.listenTo(this.model, 'change', this.render);
	    },
	
	    render : function() {
	        if (!this.model.get('message') || !this.model.get('sendUpdatesToClient')) {
	            return;
	        }
	
	        var message = {
	            type      : 'info',
	            message   : '[{0}] {1}'.format(this.model.get('name'), this.model.get('message')),
	            id        : this.model.id,
	            hideAfter : 0
	        };
	
	        var isManual = this.model.get('manual');
	
	        switch (this.model.get('state')) {
	            case 'completed':
	                message.hideAfter = 4;
	                break;
	            case 'failed':
	                message.hideAfter = isManual ? 10 : 4;
	                message.type = 'error';
	                break;
	            default :
	                message.hideAfter = 0;
	        }
	
	        if (this.messenger) {
	            this.messenger.update(message);
	        }
	
	        else {
	            this.messenger = Messenger.show(message);
	        }
	
	        console.log(message.message);
	    }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ListItemView = __webpack_require__(90);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ListItemView,
	    itemViewContainer : '#x-movie-list',
	    template          : 'Movies/Index/Overview/MovieOverviewCollectionViewTemplate'
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var MoviesIndexItemView = __webpack_require__(83);
	
	module.exports = MoviesIndexItemView.extend({
	    template : 'Movies/Index/Overview/MovieOverviewItemViewTemplate'
	});


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'Movies/Index/EmptyTemplate'
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var moment = __webpack_require__(17);
	var FormatHelpers = __webpack_require__(20);
	var UiSettingsModel = __webpack_require__(22);
	
	module.exports = TemplatedCell.extend({
	    className : 'in-cinemas-cell',
	
	    render : function() {
	      this.$el.html("");
	
	      if (this.model.get("inCinemas")) {
	        var cinemasDate = this.model.get("inCinemas");
	        this.$el.html(moment(cinemasDate).format(UiSettingsModel.shortDate()));
	      }
	
	      return this;
	    }
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    render : function() {
	        var templateName = this.column.get('template') || this.template;
	
	        this.templateFunction = Marionette.TemplateCache.get(templateName);
	        this.$el.empty();
	
	        if (this.cellValue) {
	            var data = this.cellValue.toJSON();
	            var html = this.templateFunction(data);
	            this.$el.html(html);
	        }
	
	        this.delegateEvents();
	        return this;
	    }
	});


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var Backbone = __webpack_require__(6);
	
	module.exports = Backgrid.Cell.extend({
	
	    _originalInit : Backgrid.Cell.prototype.initialize,
	
	    initialize : function() {
	        this._originalInit.apply(this, arguments);
	        this.cellValue = this._getValue();
	
	        this.listenTo(this.model, 'change', this._refresh);
	
	        if (this._onEdit) {
	            this.listenTo(this.model, 'backgrid:edit', function(model, column, cell, editor) {
	                if (column.get('name') === this.column.get('name')) {
	                    this._onEdit(model, column, cell, editor);
	                }
	            });
	        }
	    },
	
	    _refresh : function() {
	        this.cellValue = this._getValue();
	        this.render();
	    },
	
	    _getValue : function() {
	        var cellValue = this.column.get('cellValue');
	
	        if (cellValue) {
	            if (cellValue === 'this') {
	                return this.model;
	            }
	
	            else {
	                return this.model.get(cellValue);
	            }
	        }
	
	        var name = this.column.get('name');
	
	        if (name === 'this') {
	            return this.model;
	        }
	
	        var value = this.model.get(name);
	
	        if (!value) {
	            return undefined;
	        }
	
	        //if not a model
	        if (!value.get && typeof value === 'object') {
	            value = new Backbone.Model(value);
	        }
	
	        return value;
	    }
	});


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	var FormatHelpers = __webpack_require__(20);
	var UiSettings = __webpack_require__(22);
	
	module.exports = NzbDroneCell.extend({
	    className : 'relative-date-cell',
	
	    render : function() {
	
	        var dateStr = this.model.get(this.column.get('name'));
	
	        if (dateStr) {
	            var date = moment(dateStr);
	            var diff = date.diff(moment().utcOffset(date.utcOffset()).startOf('day'), 'days', true);
	            var result = '<span title="{0}">{1}</span>';
	            var tooltip = date.format(UiSettings.longDateTime());
	            var text;
	
	            if (diff > 0 && diff < 1) {
	                text = date.format(UiSettings.time(true, false));
	            } else {
	                if (UiSettings.get('showRelativeDates')) {
	                    text = FormatHelpers.relativeDate(dateStr);
	                } else {
	                    text = date.format(UiSettings.get('shortDateFormat'));
	                }
	            }
	
	            this.$el.html(result.format(tooltip, text));
	        }
	        return this;
	    }
	});


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
	    className : 'movie-title-cell',
	    template  : 'Cells/MovieTitleTemplate',
	
	});


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var ProfileCollection = __webpack_require__(41);
	var _ = __webpack_require__(8);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'profile-cell',
	
	    _originalInit : Backgrid.Cell.prototype.initialize,
	
	    initialize : function () {
	        this._originalInit.apply(this, arguments);
	
	        this.listenTo(ProfileCollection, 'sync', this.render);
	    },
	
	    render : function() {
	
	        this.$el.empty();
	        var profileId = this.model.get(this.column.get('name'));
	
	        var profile = _.findWhere(ProfileCollection.models, { id : profileId });
	
	        if (profile) {
	            this.$el.html(profile.get('name'));
	        }
	
	        return this;
	    }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
	    className : 'movie-links-cell',
	    template  : 'Cells/MovieLinksTemplate'
	});


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	var CommandController = __webpack_require__(84);
	
	module.exports = NzbDroneCell.extend({
	    className : 'movie-actions-cell',
	
	    ui : {
	        refresh : '.x-refresh',
	        search  : '.x-search'
	    },
	
	    events : {
	        'click .x-edit'    : '_editMovie',
	        'click .x-refresh' : '_refreshMovie',
	        'click .x-search'  : '_searchMovie'
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        this.$el.html('<i class="icon-radarr-refresh x-refresh hidden-xs" title="" data-original-title="Update movie info and scan disk"></i> ' +
	                      '<i class="icon-radarr-edit x-edit" title="" data-original-title="Edit Movie"></i> ' +
	                      '<i class="icon-radarr-search x-search" title="" data-original-title="Search Movie"></i>');
	
	        CommandController.bindToCommand({
	            element : this.$el.find('.x-refresh'),
	            command : {
	                name     : 'refreshMovie',
	                movieId : this.model.get('id')
	            }
	        });
	
	        CommandController.bindToCommand({
	            element : this.$el.find('.x-search'),
	            command : {
	                name     : 'moviesSearch',
	                movieIds : [this.model.get('id')]
	            }
	        });
	
	        this.delegateEvents();
	        return this;
	    },
	
	    _editMovie : function() {
	        vent.trigger(vent.Commands.EditMovieCommand, { movie : this.model });
	    },
	
	    _refreshMovie : function() {
	        CommandController.Execute('refreshMovie', {
	            name     : 'refreshMovie',
	            movieId : this.model.id
	        });
	    },
	
	    _searchMovie : function() {
	        CommandController.Execute('moviesSearch', {
	            name     : 'moviesSearch',
	            movieIds : [this.model.id]
	        });
	    }
	});


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'movie-status-cell',
	
	    render : function() {
	        this.$el.empty();
	        var monitored = this.model.get('monitored');
	        var status = this.model.get('status');
	        var inCinemas = this.model.get("inCinemas");
	        var date = new Date(inCinemas);
	        var timeSince = new Date().getTime() - date.getTime();
	        var numOfMonths = timeSince / 1000 / 60 / 60 / 24 / 30;
	
	
	        if (status === 'released') {
			  this.$el.html('<i class="icon-radarr-movie-released grid-icon" title="Released"></i>');
			  this._setStatusWeight(3);
			}
	        if (status === 'inCinemas') {
	          this.$el.html('<i class="icon-radarr-movie-cinemas grid-icon" title="In Cinemas"></i>');
	          this._setStatusWeight(2);
	        }
	
	        if (status === "announced") {
	          this.$el.html('<i class="icon-radarr-movie-announced grid-icon" title="Announced"></i>');
	          this._setStatusWeight(1);
	        }
	
	        return this;
	    },
	
	    _setStatusWeight : function(weight) {
	        this.model.set('statusWeight', weight, { silent : true });
	    }
	});


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
	    className : 'movie-title-cell',
	    template  : 'Cells/MovieDownloadStatusTemplate',
	    sortKey : function(model) {
	      return 0;
	    }
	});


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var ProfileCollection = __webpack_require__(41);
	var _ = __webpack_require__(8);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'profile-cell',
	
	    _originalInit : Backgrid.Cell.prototype.initialize,
	
	    initialize : function () {
	        this._originalInit.apply(this, arguments);
	
	        this.listenTo(ProfileCollection, 'sync', this.render);
	    },
	
	    render : function() {
	
	        this.$el.empty();
	        if (this.model.get("movieFile")) {
	          var profileId = this.model.get("movieFile").quality.quality.id;
	            this.$el.html(this.model.get("movieFile").quality.quality.name);
	
	        }
	
	
	        return this;
	    }
	});


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'Movies/Index/FooterViewTemplate'
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Marionette = __webpack_require__(11);
	var Paginator = __webpack_require__(105);
	
	module.exports = Paginator.extend({
	    template : 'Shared/Grid/PagerTemplate',
	
	    events : {
	        'click .pager-btn'      : 'changePage',
	        'click .x-page-number'  : '_showPageJumper',
	        'change .x-page-select' : '_jumpToPage',
	        'blur .x-page-select'   : 'render'
	    },
	
	    windowSize : 1,
	
	    fastForwardHandleLabels : {
	        first : 'icon-radarr-pager-first',
	        prev  : 'icon-radarr-pager-previous',
	        next  : 'icon-radarr-pager-next',
	        last  : 'icon-radarr-pager-last'
	    },
	
	    changePage : function(e) {
	        e.preventDefault();
	
	        var target = this.$(e.target);
	
	        if (target.closest('li').hasClass('disabled')) {
	            return;
	        }
	
	        var icon = target.closest('li i');
	        var iconClasses = icon.attr('class').match(/(?:^|\s)icon\-.+?(?:$|\s)/);
	        var iconClass = $.trim(iconClasses[0]);
	
	        icon.removeClass(iconClass);
	        icon.addClass('icon-radarr-spinner fa-spin');
	
	        var label = target.attr('data-action');
	        var ffLabels = this.fastForwardHandleLabels;
	
	        var collection = this.collection;
	
	        if (ffLabels) {
	            switch (label) {
	                case 'first':
	                    collection.getFirstPage();
	                    return;
	                case 'prev':
	                    if (collection.hasPrevious()) {
	                        collection.getPreviousPage();
	                    }
	                    return;
	                case 'next':
	                    if (collection.hasNext()) {
	                        collection.getNextPage();
	                    }
	                    return;
	                case 'last':
	                    collection.getLastPage();
	                    return;
	            }
	        }
	
	        var state = collection.state;
	        var pageIndex = target.text();
	        collection.getPage(state.firstPage === 0 ? pageIndex - 1 : pageIndex);
	    },
	
	    makeHandles : function() {
	        var handles = [];
	
	        var collection = this.collection;
	
	        
	        var state = collection.state;
	
	        // convert all indices to 0-based here
	        var firstPage = state.firstPage;
	        var lastPage = +state.lastPage;
	        lastPage = Math.max(0, firstPage ? lastPage - 1 : lastPage);
	        var currentPage = Math.max(state.currentPage, state.firstPage);
	        currentPage = firstPage ? currentPage - 1 : currentPage;
	        var windowStart = Math.floor(currentPage / this.windowSize) * this.windowSize;
	        var windowEnd = Math.min(lastPage + 1, windowStart + this.windowSize);
	
	        if (true/*collection.mode !== 'infinite'*/) {
	            for (var i = windowStart; i < windowEnd; i++) {
	                handles.push({
	                    label      : i + 1,
	                    title      : 'No. ' + (i + 1),
	                    className  : currentPage === i ? 'active' : undefined,
	                    pageNumber : i + 1,
	                    lastPage   : lastPage + 1
	                });
	            }
	        }
	
	        var ffLabels = this.fastForwardHandleLabels;
	        if (ffLabels) {
	            if (ffLabels.prev) {
	                handles.unshift({
	                    label     : ffLabels.prev,
	                    className : collection.hasPrevious() ? void 0 : 'disabled',
	                    action    : 'prev'
	                });
	            }
	
	            if (ffLabels.first) {
	                handles.unshift({
	                    label     : ffLabels.first,
	                    className : collection.hasPrevious() ? void 0 : 'disabled',
	                    action    : 'first'
	                });
	            }
	
	            if (ffLabels.next) {
	                handles.push({
	                    label     : ffLabels.next,
	                    className : collection.hasNext() ? void 0 : 'disabled',
	                    action    : 'next'
	                });
	            }
	
	            if (ffLabels.last) {
	                handles.push({
	                    label     : ffLabels.last,
	                    className : collection.hasNext() ? void 0 : 'disabled',
	                    action    : 'last'
	                });
	            }
	        }
	
	        return handles;
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        var templateFunction = Marionette.TemplateCache.get(this.template);
	
	        this.$el.html(templateFunction({
	            handles : this.makeHandles(),
	            state   : this.collection.state
	        }));
	
	        this.delegateEvents();
	
	        return this;
	    },
	
	    _showPageJumper : function(e) {
	        if ($(e.target).is('select')) {
	            return;
	        }
	
	        var templateFunction = Marionette.TemplateCache.get('Shared/Grid/JumpToPageTemplate');
	        var state = this.collection.state;
	        var currentPage = Math.max(state.currentPage, state.firstPage);
	        currentPage = state.firstPage ? currentPage - 1 : currentPage;
	
	        var pages = [];
	
	        for (var i = 0; i < this.collection.state.lastPage; i++) {
	            if (i === currentPage) {
	                pages.push({
	                    page    : i + 1,
	                    current : true
	                });
	            } else {
	                pages.push({ page : i + 1 });
	            }
	        }
	
	        this.$el.find('.x-page-number').html(templateFunction({ pages : pages }));
	    },
	
	    _jumpToPage : function() {
	        var target = this.$el.find('.x-page-select');
	
	        //Remove event handlers so the blur event is not triggered
	        this.undelegateEvents();
	
	        var selectedPage = parseInt(target.val(), 10);
	
	        this.$el.find('.x-page-number').html('<i class="icon-radarr-spinner fa-spin"></i>');
	        this.collection.getPage(selectedPage);
	    }
	});


/***/ },
/* 105 */,
/* 106 */,
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ButtonCollection = __webpack_require__(109);
	var ButtonModel = __webpack_require__(110);
	var RadioButtonCollectionView = __webpack_require__(111);
	var ButtonCollectionView = __webpack_require__(113);
	var SortingButtonCollectionView = __webpack_require__(115);
	var _ = __webpack_require__(8);
	
	module.exports = Marionette.Layout.extend({
	    template  : 'Shared/Toolbar/ToolbarLayoutTemplate',
	    className : 'toolbar',
	
	    ui : {
	        left_x  : '.x-toolbar-left',
	        right_x : '.x-toolbar-right'
	    },
	
	    initialize : function(options) {
	        if (!options) {
	            throw 'options needs to be passed';
	        }
	
	        if (!options.context) {
	            throw 'context needs to be passed';
	        }
	
	        this.templateHelpers = {
	            floatOnMobile : options.floatOnMobile || false
	        };
	
	        this.left = options.left;
	        this.right = options.right;
	        this.toolbarContext = options.context;
	    },
	
	    onShow : function() {
	        if (this.left) {
	            _.each(this.left, this._showToolbarLeft, this);
	        }
	        if (this.right) {
	            _.each(this.right, this._showToolbarRight, this);
	        }
	    },
	
	    _showToolbarLeft : function(element, index) {
	        this._showToolbar(element, index, 'left');
	    },
	
	    _showToolbarRight : function(element, index) {
	        this._showToolbar(element, index, 'right');
	    },
	
	    _showToolbar : function(buttonGroup, index, position) {
	        var groupCollection = new ButtonCollection();
	
	        _.each(buttonGroup.items, function(button) {
	            if (buttonGroup.storeState && !button.key) {
	                throw 'must provide key for all buttons when storeState is enabled';
	            }
	
	            var model = new ButtonModel(button);
	            model.set('menuKey', buttonGroup.menuKey);
	            model.ownerContext = this.toolbarContext;
	            groupCollection.add(model);
	        }, this);
	
	        var buttonGroupView;
	
	        switch (buttonGroup.type) {
	            case 'radio':
	            {
	                buttonGroupView = new RadioButtonCollectionView({
	                    collection : groupCollection,
	                    menu       : buttonGroup
	                });
	                break;
	            }
	            case 'sorting':
	            {
	                buttonGroupView = new SortingButtonCollectionView({
	                    collection     : groupCollection,
	                    menu           : buttonGroup,
	                    viewCollection : buttonGroup.viewCollection
	                });
	                break;
	            }
	            default:
	            {
	                buttonGroupView = new ButtonCollectionView({
	                    collection : groupCollection,
	                    menu       : buttonGroup
	                });
	                break;
	            }
	        }
	
	        var regionId = position + '_' + (index + 1);
	        var region = this[regionId];
	
	        if (!region) {
	            var regionClassName = 'x-toolbar-' + position + '-' + (index + 1);
	            this.ui[position + '_x'].append('<div class="toolbar-group ' + regionClassName + '" />\r\n');
	            region = this.addRegion(regionId, '.' + regionClassName);
	        }
	
	        region.show(buttonGroupView);
	    }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var ButtonModel = __webpack_require__(110);
	
	module.exports = Backbone.Collection.extend({
	    model : ButtonModel
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	    defaults : {
	        'target'  : '/nzbdrone/route',
	        'title'   : '',
	        'active'  : false,
	        'tooltip' : undefined
	    }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var RadioButtonView = __webpack_require__(112);
	var Config = __webpack_require__(33);
	
	module.exports = Marionette.CollectionView.extend({
	    className : 'btn-group',
	    itemView  : RadioButtonView,
	
	    attributes : {
	        'data-toggle' : 'buttons'
	    },
	
	    initialize : function(options) {
	        this.menu = options.menu;
	
	        this.setActive();
	    },
	
	    setActive : function() {
	        var storedKey = this.menu.defaultAction;
	
	        if (this.menu.storeState) {
	            storedKey = Config.getValue(this.menu.menuKey, storedKey);
	        }
	
	        if (!storedKey) {
	            return;
	        }
	        this.collection.each(function(model) {
	            if (model.get('key').toLocaleLowerCase() === storedKey.toLowerCase()) {
	                model.set('active', true);
	            } else {
	                model.set('active, false');
	            }
	        });
	    }
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Config = __webpack_require__(33);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Shared/Toolbar/RadioButtonTemplate',
	    className : 'btn btn-default',
	
	    ui : {
	        icon : 'i'
	    },
	
	    events : {
	        'click' : 'onClick'
	    },
	
	    initialize : function() {
	        this.storageKey = this.model.get('menuKey') + ':' + this.model.get('key');
	    },
	
	    onRender : function() {
	        if (this.model.get('active')) {
	            this.$el.addClass('active');
	            this.invokeCallback();
	        }
	
	        if (!this.model.get('title')) {
	            this.$el.addClass('btn-icon-only');
	        }
	
	        if (this.model.get('tooltip')) {
	            this.$el.attr('title', this.model.get('tooltip'));
	        }
	    },
	
	    onClick : function() {
	        Config.setValue(this.model.get('menuKey'), this.model.get('key'));
	        this.invokeCallback();
	    },
	
	    invokeCallback : function() {
	        if (!this.model.ownerContext) {
	            throw 'ownerContext must be set.';
	        }
	
	        var callback = this.model.get('callback');
	        if (callback) {
	            callback.call(this.model.ownerContext, this);
	        }
	    }
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ButtonView = __webpack_require__(114);
	
	module.exports = Marionette.CollectionView.extend({
	    className : 'btn-group',
	    itemView  : ButtonView,
	
	    initialize : function(options) {
	        this.menu = options.menu;
	        this.className = 'btn-group';
	
	        if (options.menu.collapse) {
	            this.className += ' btn-group-collapse';
	        }
	    },
	
	    onRender : function() {
	        if (this.menu.collapse) {
	            this.$el.addClass('btn-group-collapse');
	        }
	    }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var _ = __webpack_require__(8);
	var CommandController = __webpack_require__(84);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Shared/Toolbar/ButtonTemplate',
	    className : 'btn btn-default btn-icon-only-xs',
	
	    ui : {
	        icon : 'i'
	    },
	
	    events : {
	        'click' : 'onClick'
	    },
	
	    initialize : function() {
	        this.storageKey = this.model.get('menuKey') + ':' + this.model.get('key');
	    },
	
	    onRender : function() {
	        if (this.model.get('active')) {
	            this.$el.addClass('active');
	            this.invokeCallback();
	        }
	
	        if (!this.model.get('title')) {
	            this.$el.addClass('btn-icon-only');
	        }
	
	        if (this.model.get('className')) {
	            this.$el.addClass(this.model.get('className'));
	        }
	
	        if (this.model.get('tooltip')) {
	            this.$el.attr('title', this.model.get('tooltip'));
	        }
	
	        var command = this.model.get('command');
	        if (command) {
	            var properties = _.extend({ name : command }, this.model.get('properties'));
	
	            CommandController.bindToCommand({
	                command : properties,
	                element : this.$el
	            });
	        }
	    },
	
	    onClick : function() {
	        if (this.$el.hasClass('disabled')) {
	            return;
	        }
	
	        this.invokeCallback();
	        this.invokeRoute();
	        this.invokeCommand();
	    },
	
	    invokeCommand : function() {
	        var command = this.model.get('command');
	        if (command) {
	            CommandController.Execute(command, this.model.get('properties'));
	        }
	    },
	
	    invokeRoute : function() {
	        var route = this.model.get('route');
	        if (route) {
	            Backbone.history.navigate(route, { trigger : true });
	        }
	    },
	
	    invokeCallback : function() {
	        if (!this.model.ownerContext) {
	            throw 'ownerContext must be set.';
	        }
	
	        var callback = this.model.get('callback');
	        if (callback) {
	            callback.call(this.model.ownerContext, this);
	        }
	    }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var PageableCollection = __webpack_require__(29);
	var Marionette = __webpack_require__(11);
	var ButtonView = __webpack_require__(116);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ButtonView,
	    template          : 'Shared/Toolbar/Sorting/SortingButtonCollectionViewTemplate',
	    itemViewContainer : '.dropdown-menu',
	
	    initialize : function(options) {
	        this.viewCollection = options.viewCollection;
	        this.listenTo(this.viewCollection, 'drone:sort', this.sort);
	    },
	
	    itemViewOptions : function() {
	        return {
	            viewCollection : this.viewCollection
	        };
	    },
	
	    sort : function(sortModel, sortDirection) {
	        var collection = this.viewCollection;
	
	        var order;
	        if (sortDirection === 'ascending') {
	            order = -1;
	        } else if (sortDirection === 'descending') {
	            order = 1;
	        } else {
	            order = null;
	        }
	
	        collection.setSorting(sortModel.get('name'), order);
	        if (collection.mode.toLowerCase() === "server"){
	          collection.fetch({reset: true});
	        } else {
	          collection.fullCollection.sort();
	        }
	
	        return this;
	    }
	});


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var _ = __webpack_require__(8);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Shared/Toolbar/Sorting/SortingButtonViewTemplate',
	    tagName  : 'li',
	
	    ui : {
	        icon : 'i'
	    },
	
	    events : {
	        'click' : 'onClick'
	    },
	
	    initialize : function(options) {
	        this.viewCollection = options.viewCollection;
	        this.listenTo(this.viewCollection, 'drone:sort', this.render);
	        this.listenTo(this.viewCollection, 'backgrid:sort', this.render);
	    },
	
	    onRender : function() {
	        if (this.viewCollection.state) {
	            var sortKey = this.viewCollection.state.sortKey;
	            var name = this.viewCollection._getSortMapping(sortKey).name;
	            var order = this.viewCollection.state.order;
	
	            if (name === this.model.get('name')) {
	                this._setSortIcon(order);
	            } else {
	                this._removeSortIcon();
	            }
	        }
	    },
	
	    onClick : function(e) {
	        e.preventDefault();
	
	        var collection = this.viewCollection;
	        var event = 'drone:sort';
	
	        var direction = collection.state.order;
	        if (direction === 'ascending' || direction === -1) {
	            direction = 'descending';
	        } else {
	            direction = 'ascending';
	        }
	
	        collection.setSorting(this.model.get('name'), direction);
	        collection.trigger(event, this.model, direction);
	    },
	
	    _convertDirectionToIcon : function(dir) {
	        if (dir === 'ascending' || dir === -1) {
	            return 'icon-radarr-sort-asc';
	        }
	
	        return 'icon-radarr-sort-desc';
	    },
	
	    _setSortIcon : function(dir) {
	        this._removeSortIcon();
	        this.ui.icon.addClass(this._convertDirectionToIcon(dir));
	    },
	
	    _removeSortIcon : function() {
	        this.ui.icon.removeClass('icon-radarr-sort-asc icon-radarr-sort-desc');
	    }
	});


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var reqres = __webpack_require__(118);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var MoviesCollection = __webpack_require__(62);
	var InfoView = __webpack_require__(119);
	var CommandController = __webpack_require__(84);
	var LoadingView = __webpack_require__(120);
	// var EpisodeFileEditorLayout = require('../../EpisodeFile/Editor/EpisodeFileEditorLayout');
	var HistoryLayout = __webpack_require__(121);
	var SearchLayout = __webpack_require__(133);
	var AllFilesLayout = __webpack_require__(156);
	var TitlesLayout = __webpack_require__(170);
	__webpack_require__(177);
	__webpack_require__(37);
	
	module.exports = Marionette.Layout.extend({
			itemViewContainer : '.x-movie-seasons',
			template          : 'Movies/Details/MoviesDetailsTemplate',
	
			regions : {
					info    	: '#info',
					search  	: '#movie-search',
					history 	: '#movie-history',
					filesTabs	: '#movie-files-tabs',
					titles  	: "#movie-titles",
			},
	
	
			ui : {
					header    	: '.x-header',
					monitored 	: '.x-monitored',
					edit      	: '.x-edit',
					refresh   	: '.x-refresh',
					rename    	: '.x-rename',
					searchAuto  : '.x-search',
					poster    	: '.x-movie-poster',
					manualSearch: '.x-manual-search',
					history   	: '.x-movie-history',
					search    	: '.x-movie-search',
					filesTabs 	: '.x-movie-files-tabs',
					titles    	: ".x-movie-titles",
			},
	
			events : {
					'click .x-monitored'           : '_toggleMonitored',
					'click .x-edit'                : '_editMovie',
					'click .x-refresh'             : '_refreshMovies',
					'click .x-rename'              : '_renameMovies',
					'click .x-search'              : '_moviesSearch',
					'click .x-manual-search'       : '_showSearch',
					'click .x-movie-history'       : '_showHistory',
					'click .x-movie-search'        : '_showSearch',
					'click .x-movie-files-tabs'    : '_showFileTabs',
					"click .x-movie-titles"        : "_showTitles",
			},
	
			initialize : function() {
					this.moviesCollection = MoviesCollection.clone();
					this.moviesCollection.bindSignalR();
	
					this.listenTo(this.model, 'change:monitored', this._setMonitoredState);
					this.listenTo(this.model, 'remove', this._moviesRemoved);
					this.listenTo(this.model, "change:movieFile", this._refreshFiles);
	
					this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	
					this.listenTo(this.model, 'change', function(model, options) {
							if (options && options.changeSource === 'signalr') {
									this._refresh();
							}
					});
	
					this.listenTo(this.model,  'change:images', this._updateImages);
			},
	
			_refreshFiles : function() {
				this._showFileTabs();
			},
	
			onShow : function() {
					this.searchLayout = new SearchLayout({ model : this.model });
					this.searchLayout.startManualSearch = true;
					this.allFilesLayout = new AllFilesLayout({ model : this.model });
	            	this.titlesLayout = new TitlesLayout({ model : this.model });
	
					this._showBackdrop();
					this._showSeasons();
					this._setMonitoredState();
					this._showInfo();
					this._showHistory();
			},
	
			onRender : function() {
					CommandController.bindToCommand({
							element : this.ui.refresh,
							command : {
									name : 'refreshMovie'
							}
					});
	
					CommandController.bindToCommand({
							element : this.ui.searchAuto,
							command : {
									name : 'moviesSearch'
							}
					});
	
					CommandController.bindToCommand({
							element : this.ui.rename,
							command : {
									name         : 'renameMovieFiles',
									movieId      : this.model.id,
									seasonNumber : -1
							}
					});
			},
	
			onClose : function() {
					if (this._backstrech) {
							this._backstrech.destroy();
							delete this._backstrech;
					}
	
					$('body').removeClass('backdrop');
					reqres.removeHandler(reqres.Requests.GetEpisodeFileById);
			},
	
			_getImage : function(type) {
					var image = _.where(this.model.get('images'), { coverType : type });
	
					if (image && image[0]) {
							return image[0].url;
					}
	
					return undefined;
			},
	
			_showHistory : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.history.tab('show');
					this.history.show(new HistoryLayout({
							model  : this.model
					}));
			},
	
			_showSearch : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.search.tab('show');
					this.search.show(this.searchLayout);
			},
	
			_showFileTabs : function(e) {
				if (e) {
					e.preventDefault();
				}
	
				this.ui.filesTabs.tab('show');
				this.filesTabs.show(this.allFilesLayout);
			},
	
			_showTitles : function(e) {
	            if (e) {
	                e.preventDefault();
	            }
	
	            this.ui.titles.tab("show");
	            this.titles.show(this.titlesLayout);
			},
	
			_toggleMonitored : function() {
					var savePromise = this.model.save('monitored', !this.model.get('monitored'), { wait : true });
	
					this.ui.monitored.spinForPromise(savePromise);
			},
	
			_setMonitoredState : function() {
					var monitored = this.model.get('monitored');
	
					this.ui.monitored.removeAttr('data-idle-icon');
					this.ui.monitored.removeClass('fa-spin icon-radarr-spinner');
	
					if (monitored) {
							this.ui.monitored.addClass('icon-radarr-monitored');
							this.ui.monitored.removeClass('icon-radarr-unmonitored');
							this.$el.removeClass('movie-not-monitored');
					} else {
							this.ui.monitored.addClass('icon-radarr-unmonitored');
							this.ui.monitored.removeClass('icon-radarr-monitored');
							this.$el.addClass('movie-not-monitored');
					}
			},
	
			_editMovie : function() {
					vent.trigger(vent.Commands.EditMovieCommand, { movie : this.model });
			},
	
			_refreshMovies : function() {
					CommandController.Execute('refreshMovie', {
							name     : 'refreshMovie',
							movieId : this.model.id
					});
			},
	
			_moviesRemoved : function() {
					Backbone.history.navigate('/', { trigger : true });
			},
	
			_renameMovies : function() {
					vent.trigger(vent.Commands.ShowRenamePreview, { movie : this.model });
			},
	
			_moviesSearch : function() {
					CommandController.Execute('moviesSearch', {
							name     : 'moviesSearch',
							movieIds : [this.model.id]
					});
			},
	
			_showSeasons : function() {
					var self = this;
	
					return;
			},
	
			_showInfo : function() {
					this.info.show(new InfoView({
							model                 : this.model
					}));
			},
	
			_commandComplete : function(options) {
					if (options.command.get('name') === 'renameMoviefiles') {
							if (options.command.get('moviesId') === this.model.get('id')) {
									this._refresh();
							}
					}
			},
	
			_refresh : function() {
					this._setMonitoredState();
					this._showInfo();
			},
	
			_updateImages : function () {
					var poster = this._getImage('poster');
	
					if (poster) {
							this.ui.poster.attr('src', poster);
					}
	
					this._showBackdrop();
			},
	
			_showBackdrop : function () {
					$('body').addClass('backdrop');
					var fanArt = this._getImage('fanart');
	
					if (fanArt) {
							this._backstrech = $.backstretch(fanArt);
					} else {
							$('body').removeClass('backdrop');
					}
			},
	
			_manualSearchM : function() {
					console.warn("Manual Search started");
					console.warn(this.model.id);
					console.warn(this.model);
					console.warn(this.episodeCollection);
					vent.trigger(vent.Commands.ShowEpisodeDetails, {
							episode        : this.model,
							hideMoviesLink : true,
							openingTab     : 'search'
					});
			}
	});


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var Wreqr = __webpack_require__(35);
	
	var reqres = new Wreqr.RequestResponse();
	
	reqres.Requests = {
	    GetEpisodeFileById                  : 'GetEpisodeFileById',
	    GetAlternateNameBySeasonNumber      : 'GetAlternateNameBySeasonNumber'
	};
	
	module.exports = reqres;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Details/InfoViewTemplate',
	
	    initialize : function(options) {
	        //this.episodeFileCollection = options.episodeFileCollection;
	
	        this.listenTo(this.model, 'change', this.render);
	        //this.listenTo(this.episodeFileCollection, 'sync', this.render); TODO: Update this;
	    },
	
	    templateHelpers : function() {
	        return {
	            fileCount : 0
	        };
	    }
	});


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Shared/LoadingViewTemplate',
	    className : 'nz-loading row'
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var HistoryCollection = __webpack_require__(122);
	var EventTypeCell = __webpack_require__(124);
	var QualityCell = __webpack_require__(125);
	var RelativeDateCell = __webpack_require__(95);
	var EpisodeHistoryActionsCell = __webpack_require__(128);
	var EpisodeHistoryDetailsCell = __webpack_require__(129);
	var NoHistoryView = __webpack_require__(132);
	var LoadingView = __webpack_require__(120);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Movies/History/MovieHistoryLayoutTemplate',
	
	    regions : {
	        historyTable : '.history-table'
	    },
	
	    columns : [
	        {
	            name      : 'eventType',
	            label     : '',
	            cell      : EventTypeCell,
	            cellValue : 'this'
	        },
	        {
	            name  : 'sourceTitle',
	            label : 'Source Title',
	            cell  : 'string'
	        },
	        {
	            name  : 'quality',
	            label : 'Quality',
	            cell  : QualityCell
	        },
	        {
	            name  : 'date',
	            label : 'Date',
	            cell  : RelativeDateCell
	        },
	        {
	            name     : 'this',
	            label    : '',
	            cell     : EpisodeHistoryDetailsCell,
	            sortable : false
	        },
	        {
	            name     : 'this',
	            label    : '',
	            cell     : EpisodeHistoryActionsCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function(options) {
	        this.model = options.model;
	
	        this.collection = new HistoryCollection({
	            movieId : this.model.id,
	            tableName : 'episodeHistory'
	        });
	        this.collection.fetch();
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onRender : function() {
	        this.historyTable.show(new LoadingView());
	    },
	
	    _showTable : function() {
	        if (this.collection.any()) {
	            this.historyTable.show(new Backgrid.Grid({
	                collection : this.collection,
	                columns    : this.columns,
	                className  : 'table table-hover table-condensed'
	            }));
	        }
	
	        else {
	            this.historyTable.show(new NoHistoryView());
	        }
	    }
	});


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var HistoryModel = __webpack_require__(123);
	var PageableCollection = __webpack_require__(29);
	var AsFilteredCollection = __webpack_require__(63);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var Collection = PageableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + '/history',
	    model : HistoryModel,
	
	    state : {
	        pageSize : 15,
	        sortKey  : 'date',
	        order    : 1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	    filterModes : {
	        'all'      : [
	            null,
	            null
	        ],
	        'grabbed'  : [
	            'eventType',
	            '1'
	        ],
	        'imported' : [
	            'eventType',
	            '3'
	        ],
	        'failed'   : [
	            'eventType',
	            '4'
	        ],
	        'deleted'  : [
	            'eventType',
	            '6'
	        ]
	    },
	
	    sortMappings : {
	        'movie' : { sortKey : 'movie.title' }
	    },
	
	    initialize : function(options) {
	        delete this.queryParams.episodeId;
	        delete this.queryParams.movieId;
	
	        if (options) {
	            if (options.episodeId) {
	                this.queryParams.episodeId = options.episodeId;
	            }
	            if (options.movieId) {
	                this.queryParams.movieId = options.movieId;
	            }
	        }
	    },
	
	    parseState : function(resp) {
	        return { totalRecords : resp.totalRecords };
	    },
	
	    parseRecords : function(resp) {
	        if (resp) {
	            return resp.records;
	        }
	
	        return resp;
	    }
	});
	
	Collection = AsFilteredCollection.call(Collection);
	Collection = AsSortedCollection.call(Collection);
	Collection = AsPersistedStateCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	
	module.exports = Backbone.Model.extend({
	    parse : function(model) {
	        if (model.movie) {
	            model.movie = new MovieModel(model.movie);
	        }
	
	        return model;
	    }
	});


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'history-event-type-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.cellValue) {
	            var icon;
	            var toolTip;
	
	            switch (this.cellValue.get('eventType')) {
	                case 'grabbed':
	                    icon = 'icon-radarr-downloading';
	                    toolTip = 'Movie grabbed from {0} and sent to download client'.format(this.cellValue.get('data').indexer);
	                    break;
	                case 'seriesFolderImported':
	                    icon = 'icon-radarr-hdd';
	                    toolTip = 'Existing movie file added to library';
	                    break;
	                case 'downloadFolderImported':
	                    icon = 'icon-radarr-imported';
	                    toolTip = 'Movie downloaded successfully and picked up from download client';
	                    break;
	                case 'downloadFailed':
	                    icon = 'icon-radarr-download-failed';
	                    toolTip = 'Movie download failed';
	                    break;
	                case 'episodeFileDeleted':
	                    icon = 'icon-radarr-deleted';
	                    toolTip = 'Movie file deleted';
	                    break;
	                case 'movieFileDeleted':
	                    icon = 'icon-radarr-deleted';
	                    toolTip = 'Movie file deleted';
	                    break;
	                default:
	                    icon = 'icon-radarr-unknown';
	                    toolTip = 'unknown event';
	            }
	
	            this.$el.html('<i class="{0}" title="{1}" data-placement="right"/>'.format(icon, toolTip));
	        }
	
	        return this;
	    }
	});


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var QualityCellEditor = __webpack_require__(126);
	
	module.exports = TemplatedCell.extend({
	    className : 'quality-cell',
	    template  : 'Cells/QualityCellTemplate',
	    editor    : QualityCellEditor,
	
	
	});


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backgrid = __webpack_require__(78);
	var Marionette = __webpack_require__(11);
	var ProfileSchemaCollection = __webpack_require__(127);
	
	module.exports = Backgrid.CellEditor.extend({
	    className : 'quality-cell-editor',
	    template  : 'Cells/Edit/QualityCellEditorTemplate',
	    tagName   : 'select',
	
	    events : {
	        'change'  : 'save',
	        'blur'    : 'close',
	        'keydown' : 'close'
	    },
	
	    render : function() {
	        var self = this;
	
	        var profileSchemaCollection = new ProfileSchemaCollection();
	        var promise = profileSchemaCollection.fetch();
	
	        promise.done(function() {
	            var templateName = self.template;
	            self.schema = profileSchemaCollection.first();
	
	            var selected = _.find(self.schema.get('items'), function(model) {
	                return model.quality.id === self.model.get(self.column.get('name')).quality.id;
	            });
	
	            if (selected) {
	                selected.quality.selected = true;
	            }
	
	            self.templateFunction = Marionette.TemplateCache.get(templateName);
	            var data = self.schema.toJSON();
	            var html = self.templateFunction(data);
	            self.$el.html(html);
	        });
	
	        return this;
	    },
	
	    save : function(e) {
	        var model = this.model;
	        var column = this.column;
	        var selected = parseInt(this.$el.val(), 10);
	
	        var profileItem = _.find(this.schema.get('items'), function(model) {
	            return model.quality.id === selected;
	        });
	
	        var newQuality = {
	            quality  : profileItem.quality,
	            revision : {
	                version : 1,
	                real    : 0
	            }
	        };
	
	        model.set(column.get('name'), newQuality);
	        model.save();
	
	        model.trigger('backgrid:edited', model, column, new Backgrid.Command(e));
	    },
	
	    close : function(e) {
	        var model = this.model;
	        var column = this.column;
	        var command = new Backgrid.Command(e);
	
	        model.trigger('backgrid:edited', model, column, command);
	    }
	});


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var ProfileModel = __webpack_require__(42);
	
	module.exports = Backbone.Collection.extend({
	    model : ProfileModel,
	    url   : window.NzbDrone.ApiRoot + '/profile/schema'
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'episode-actions-cell',
	
	    events : {
	        'click .x-failed' : '_markAsFailed'
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.model.get('eventType') === 'grabbed') {
	            this.$el.html('<i class="icon-radarr-delete x-failed" title="Mark download as failed"></i>');
	        }
	
	        return this;
	    },
	
	    _markAsFailed : function() {
	        var url = window.NzbDrone.ApiRoot + '/history/failed';
	        var data = {
	            id : this.model.get('id')
	        };
	
	        $.ajax({
	            url  : url,
	            type : 'POST',
	            data : data
	        });
	    }
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var NzbDroneCell = __webpack_require__(94);
	var HistoryDetailsView = __webpack_require__(130);
	__webpack_require__(71);
	
	module.exports = NzbDroneCell.extend({
	    className : 'episode-history-details-cell',
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i class="icon-radarr-form-info"></i>');
	
	        var html = new HistoryDetailsView({ model : this.model }).render().$el;
	
	        this.$el.popover({
	            content   : html,
	            html      : true,
	            trigger   : 'hover',
	            title     : 'Details',
	            placement : 'left',
	            container : this.$el
	        });
	
	        return this;
	    }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	__webpack_require__(131);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Activity/History/Details/HistoryDetailsViewTemplate'
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(14);
	var FormatHelpers = __webpack_require__(20);
	
	Handlebars.registerHelper('historyAge', function() {
	
	    var age = this.age;
	    var unit = FormatHelpers.plural(Math.round(age), 'day');
	    var ageHours = parseFloat(this.ageHours);
	    var ageMinutes = this.ageMinutes ? parseFloat(this.ageMinutes) : null;
	
	    if (age < 2) {
	        age = ageHours.toFixed(1);
	        unit = FormatHelpers.plural(Math.round(ageHours), 'hour');
	    }
	
	    if (age < 2 && ageMinutes) {
	        age = parseFloat(ageMinutes).toFixed(1);
	        unit = FormatHelpers.plural(Math.round(ageMinutes), 'minute');
	    }
	
	    return new Handlebars.SafeString('<dt>Age (when grabbed):</dt><dd>{0} {1}</dd>'.format(age, unit));
	});


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/History/NoHistoryViewTemplate'
	});


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var ButtonsView = __webpack_require__(134);
	var ManualSearchLayout = __webpack_require__(135);
	var ReleaseCollection = __webpack_require__(153);
	var CommandController = __webpack_require__(84);
	var LoadingView = __webpack_require__(120);
	var NoResultsView = __webpack_require__(155);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Movies/Search/MovieSearchLayoutTemplate',
	
	    regions : {
	        main : '#episode-search-region'
	    },
	
	    events : {
	        'click .x-search-auto'   : '_searchAuto',
	        'click .x-search-manual' : '_searchManual',
	        'click .x-search-back'   : '_showButtons'
	    },
	
	    initialize : function() {
	        this.mainView = new ButtonsView();
	        this.releaseCollection = new ReleaseCollection();
	
	        this.listenTo(this.releaseCollection, 'sync', this._showSearchResults);
	    },
	
	    onShow : function() {
	        if (this.startManualSearch) {
	            this._searchManual();
	        }
	
	        else {
	            this._showMainView();
	        }
	    },
	
	    _searchAuto : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        CommandController.Execute('episodeSearch', {
	            episodeIds : [this.model.get('id')]
	        });
	
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _searchManual : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.mainView = new LoadingView();
	        this._showMainView();
	        this.releaseCollection.fetchMovieReleases(this.model.id);
	    },
	
	    _showMainView : function() {
	        this.main.show(this.mainView);
	    },
	
	    _showButtons : function() {
	        this.mainView = new ButtonsView();
	        this._showMainView();
	    },
	
	    _showSearchResults : function() {
	        if (this.releaseCollection.length === 0) {
	            this.mainView = new NoResultsView();
	        }
	
	        else {
	            this.mainView = new ManualSearchLayout({ collection : this.releaseCollection });
	        }
	
	        this._showMainView();
	    }
	});


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Search/ButtonsViewTemplate'
	});


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var ReleaseTitleCell = __webpack_require__(136);
	var FileSizeCell = __webpack_require__(137);
	var QualityCell = __webpack_require__(125);
	var ApprovalStatusCell = __webpack_require__(138);
	var DownloadReportCell = __webpack_require__(139);
	var AgeCell = __webpack_require__(147);
	var ProtocolCell = __webpack_require__(148);
	var PeersCell = __webpack_require__(149);
	var EditionCell = __webpack_require__(150);
	var IndexerFlagsCell = __webpack_require__(151);
	var MultipleFormatsCell = __webpack_require__(152);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Movies/Search/ManualLayoutTemplate',
	
	    regions : {
	        grid : '#episode-release-grid'
	    },
	
	    columns : [
	        {
	            name  : 'protocol',
	            label : 'Source',
	            cell  : ProtocolCell
	        },
	        {
	            name  : 'age',
	            label : 'Age',
	            cell  : AgeCell
	        },
	        {
	            name  : 'title',
	            label : 'Title',
	            cell  : ReleaseTitleCell
	        },
	        {
	            name  : 'edition',
	            label : 'Edition',
	            cell  : EditionCell,
	            title : "Edition",
	        },
	        {
	          name : 'flags',
	          label : 'Flags',
	          cell : IndexerFlagsCell,
	        },
	        {
	            name  : 'indexer',
	            label : 'Indexer',
	            cell  : Backgrid.StringCell
	        },
	        {
	            name  : 'size',
	            label : 'Size',
	            cell  : FileSizeCell
	        },
	        {
	            name  : 'seeders',
	            label : 'Peers',
	            cell  : PeersCell
	        },
	        {
	            name  : 'quality',
	            label : 'Quality',
	            cell  : QualityCell,
	        },
	        {
	            name : 'quality',
	            label : 'Custom Formats',
	            cell : MultipleFormatsCell
	        },
	        {
	            name      : 'rejections',
	            label     : '<i class="icon-radarr-header-rejections" />',
	            tooltip   : 'Rejections',
	            cell      : ApprovalStatusCell,
	            sortable  : true,
	            sortType  : 'fixed',
	            direction : 'ascending',
	            title     : 'Release Rejected'
	        },
	        {
	            name      : 'download',
	            label     : '<i class="icon-radarr-download" />',
	            tooltip   : 'Auto-Search Prioritization',
	            cell      : DownloadReportCell,
	            sortable  : true,
	            sortType  : 'fixed',
	            direction : 'ascending'
	        }
	    ],
	
	    onShow : function() {
	        if (!this.isClosed) {
	            this.grid.show(new Backgrid.Grid({
	                row        : Backgrid.Row,
	                columns    : this.columns,
	                collection : this.collection,
	                className  : 'table table-hover release-table'
	            }));
	        }
	    }
	});


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'release-title-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var title = this.model.get('title');
	        var infoUrl = this.model.get('infoUrl');
	
	        var flags = this.model.get("indexerFlags");
	        
	
	        if (infoUrl) {
	            this.$el.html('<a href="{0}">{1}</a>'.format(infoUrl, title));
	        } else {
	            this.$el.html(title);
	        }
	
	        return this;
	    }
	});


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var FormatHelpers = __webpack_require__(20);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'file-size-cell',
	
	    render : function() {
	        var size = this.model.get(this.column.get('name'));
	        this.$el.html(FormatHelpers.bytes(size));
	        this.delegateEvents();
	        return this;
	    }
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var Marionette = __webpack_require__(11);
	__webpack_require__(71);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'approval-status-cell',
	    template  : 'Cells/ApprovalStatusCellTemplate',
	
	    render : function() {
	
	        var rejections = this.model.get(this.column.get('name'));
	
	        if (rejections.length === 0) {
	            return this;
	        }
	
	        this.templateFunction = Marionette.TemplateCache.get(this.template);
	
	        var html = this.templateFunction(rejections);
	        this.$el.html('<i class="icon-radarr-form-danger"/>');
	
	        this.$el.popover({
	            content   : html,
	            html      : true,
	            trigger   : 'hover',
	            title     : this.column.get('title'),
	            placement : 'left',
	            container : this.$el
	        });
	
	        return this;
	    }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var AppLayout = __webpack_require__(68);
	var ForceDownloadView = __webpack_require__(140);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'download-report-cell',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    _onClick : function() {
	        if (!this.model.downloadOk()) {
	            var view = new ForceDownloadView({
	                release            : this.model
	            });
	            AppLayout.modalRegion.show(view);
	
	            return;
	        }
	
	        var self = this;
	
	        this.$el.html('<i class="icon-radarr-spinner fa-spin" title="Adding to download queue" />');
	
	        //Using success callback instead of promise so it
	        //gets called before the sync event is triggered
	        var promise = this.model.save(null, {
	            success : function() {
	                self.model.set('queued', true);
	            }
	        });
	
	        promise.fail(function (xhr) {
	            if (xhr.responseJSON && xhr.responseJSON.message) {
	                self.$el.html('<i class="icon-radarr-download-failed" title="{0}" />'.format(xhr.responseJSON.message));
	            } else {
	                self.$el.html('<i class="icon-radarr-download-failed" title="Failed to add to download queue" />');
	            }
	        });
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.model.get('queued')) {
	            this.$el.html('<i class="icon-radarr-downloading" title="Added to downloaded queue" />');
	        } else if (this.model.downloadOk()) {
	            this.$el.html('<i class="icon-radarr-download" title="Add to download queue" />');
	        } else if (this.model.forceDownloadOk()){
	            this.$el.html('<i class="icon-radarr-download-warning" title="Force add to download queue."/>');
	            this.className = 'force-download-report-cell';
	        } else {
	            this.className = 'no-download-report-cell';
	        }
	
	        return this;
	    }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var Config = __webpack_require__(33);
	var LanguageCollection = __webpack_require__(141);
	var AltTitleModel = __webpack_require__(143);
	var AltYearModel = __webpack_require__(144);
	var Messenger = __webpack_require__(52);
	__webpack_require__(145);
	__webpack_require__(71);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Release/ForceDownloadViewTemplate',
	
	    events : {
	        'click .x-download'            : '_forceDownload',
	    },
	
	    ui : {
	        titleMapping : "#title-mapping",
	        yearMapping : "#year-mapping",
	        language : "#language-selection",
	        indicator : ".x-indicator",
	    },
	
	    initialize : function(options) {
	        this.release = options.release;
	        this.templateHelpers = {};
	
	        this._configureTemplateHelpers();
	    },
	
	    onShow : function() {
	        if (this.release.get("mappingResult") === "wrongYear") {
	            this.ui.titleMapping.hide();
	        } else {
	            this.ui.yearMapping.hide();
	        }
	    },
	
	    _configureTemplateHelpers : function() {
	        this.templateHelpers.release = this.release.toJSON();
	        this.templateHelpers.languages = LanguageCollection.toJSON();
	    },
	
	    _forceDownload : function() {
	        this.ui.indicator.show();
	        var self = this;
	
	        if (this.release.get("mappingResult") === "wrongYear") {
	            var altYear = new AltYearModel({
	                movieId : this.release.get("suspectedMovieId"),
	                year : this.release.get("year")
	            });
	            this.savePromise = altYear.save();
	        } else {
	            var altTitle = new AltTitleModel({
	                movieId : this.release.get("suspectedMovieId"),
	                title : this.release.get("movieTitle"),
	                language : this.ui.language.val(),
	            });
	
	            this.savePromise = altTitle.save();
	        }
	
	        this.savePromise.always(function(){
	            self.ui.indicator.hide();
	        });
	
	        this.savePromise.success(function(){
	            self.release.save(null, {
	                success : function() {
	                    self.release.set('queued', true);
	                    vent.trigger(vent.Commands.CloseModalCommand);
	                }
	            });
	        });
	    },
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var LanguageModel = __webpack_require__(142);
	
	var LanuageCollection = Backbone.Collection.extend({
	    model : LanguageModel,
	    url   : window.NzbDrone.ApiRoot + '/language'
	});
	
	var languages = new LanuageCollection();
	languages.fetch();
	
	module.exports = languages;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Model.extend({
	    urlRoot : window.NzbDrone.ApiRoot + '/alttitle',
	});


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Model.extend({
	    urlRoot : window.NzbDrone.ApiRoot + '/altyear',
	});


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Handlebars = __webpack_require__(14);
	var _ = __webpack_require__(8);
	__webpack_require__(146);
	
	var _templateRenderer = function(templateName) {
	    var templateFunction = Marionette.TemplateCache.get(templateName);
	    return new Handlebars.SafeString(templateFunction(this));
	};
	
	var _fieldBuilder = function(field) {
	    if (!field.type) {
	        return _templateRenderer.call(field, 'Form/TextboxTemplate');
	    }
	
	    if (field.type === 'hidden') {
	        return _templateRenderer.call(field, 'Form/HiddenTemplate');
	    }
	
	    if (field.type === 'url') {
	        return _templateRenderer.call(field, 'Form/UrlTemplate');
	    }
	
	    if (field.type === 'password') {
	        return _templateRenderer.call(field, 'Form/PasswordTemplate');
	    }
	
	    if (field.type === 'checkbox') {
	        return _templateRenderer.call(field, 'Form/CheckboxTemplate');
	    }
	
	    if (field.type === 'select') {
	        return _templateRenderer.call(field, 'Form/SelectTemplate');
	    }
	
	    if (field.type === 'hidden') {
	        return _templateRenderer.call(field, 'Form/HiddenTemplate');
	    }
	
	    if (field.type === 'path' || field.type === 'filepath') {
	        return _templateRenderer.call(field, 'Form/PathTemplate');
	    }
	
	    if (field.type === 'tag') {
	        return _templateRenderer.call(field, 'Form/TagTemplate');
	    }
	
	    if (field.type === 'action') {
	        return _templateRenderer.call(field, 'Form/ActionTemplate');
	    }
	
	    if (field.type === 'captcha') {
	        return _templateRenderer.call(field, 'Form/CaptchaTemplate');
	    }
	
	    return _templateRenderer.call(field, 'Form/TextboxTemplate');
	};
	
	Handlebars.registerHelper('formBuilder', function() {
	    var ret = '';
	    _.each(this.fields, function(field) {
	        ret += _fieldBuilder(field);
	    });
	
	    return new Handlebars.SafeString(ret);
	});


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(14);
	
	Handlebars.registerHelper('formMessage', function(message) {
	    if (!message) {
	        return '';
	    }
	
	    var level = message.type;
	
	    if (message.type === 'error') {
	        level = 'danger';
	    }
	
	    var messageHtml = '<div class="alert alert-{0}" role="alert">{1}</div>'.format(level, message.message);
	
	    return new Handlebars.SafeString(messageHtml);
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(17);
	var Backgrid = __webpack_require__(78);
	var UiSettings = __webpack_require__(22);
	var FormatHelpers = __webpack_require__(20);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'age-cell',
	
	    render : function() {
	        var age = this.model.get('age');
	        var ageHours = this.model.get('ageHours');
	        var ageMinutes = this.model.get('ageMinutes');
	        var published = moment(this.model.get('publishDate'));
	        var publishedFormatted = published.format('{0} {1}'.format(UiSettings.get('shortDateFormat'), UiSettings.time(true, true)));
	        var formatted = age;
	        var suffix = FormatHelpers.plural(age, 'day');
	
	        if (age < 2) {
	            formatted = ageHours.toFixed(1);
	            suffix = FormatHelpers.plural(Math.round(ageHours), 'hour');
	        }
	
	        if (ageHours < 2) {
	            formatted = ageMinutes.toFixed(1);
	            suffix = FormatHelpers.plural(Math.round(ageMinutes), 'minute');
	        }
	
	        this.$el.html('<div title="{2}">{0} {1}</div>'.format(formatted, suffix, publishedFormatted));
	
	        this.delegateEvents();
	        return this;
	    }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'protocol-cell',
	
	    render : function() {
	        var protocol = this.model.get('protocol') || 'Unknown';
	        var label = '??';
	
	        if (protocol) {
	            if (protocol === 'torrent') {
	                label = 'torrent';
	            } else if (protocol === 'usenet') {
	                label = 'nzb';
	            }
	
	            this.$el.html('<div class="label label-default protocol-{0}" title="{0}">{1}</div>'.format(protocol, label));
	        }
	
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'peers-cell',
	
	    render : function() {
	        if (this.model.get('protocol') === 'torrent') {
	            var seeders = this.model.get('seeders') || 0;
	            var leechers = this.model.get('leechers') || 0;
	
	            var level = 'danger';
	
	            if (seeders > 0) {
	                level = 'warning';
	            } else if (seeders > 10) {
	                level = 'info';
	            } else if (seeders > 50) {
	                level = 'primary';
	            }
	
	            this.$el.html('<div class="label label-{2}" title="{0} seeders, {1} leechers">{0} / {1}</div>'.format(seeders, leechers, level));
	        }
	
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var Marionette = __webpack_require__(11);
	__webpack_require__(71);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'edition-cell',
	    //template  : 'Cells/EditionCellTemplate',
	
	    render : function() {
	
	        var edition = this.model.get(this.column.get('name'));
	        if (!edition) {
	          return this;
	        }
	        var cut = false;
	
	        if (edition.toLowerCase().contains("cut")) {
	          cut = true;
	        }
	
	        //this.templateFunction = Marionette.TemplateCache.get(this.template);
	
	        //var html = this.templateFunction(edition);
	        if (cut) {
	          this.$el.html('<i class="icon-radarr-form-cut"/ title="{0}">'.format(edition));
	        } else {
	          this.$el.html('<i class="icon-radarr-form-special"/ title="{0}">'.format(edition));
	        }
	
	        /*this.$el.popover({
	            content   : html,
	            html      : true,
	            trigger   : 'hover',
	            title     : this.column.get('title'),
	            placement : 'left',
	            container : this.$el
	        });*/
	
	        return this;
	    }
	});


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var Marionette = __webpack_require__(11);
	__webpack_require__(71);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'edition-cell',
	    //template  : 'Cells/EditionCellTemplate',
	
	    render : function() {
	
	        var flags = this.model.get("indexerFlags");
	        if (!flags) {
	          return this;
	        }
	
	        var html = "";
	
	        if (flags) {
	          _.each(flags, function(flag){
	            var addon = "";
	            var title = "";
	
	            switch (flag) {
	              case "G_Freeleech":
	              addon = "⬇⬇";
	              title = "100% Freeleech";
	              break;
	              case "G_Halfleech":
	              addon = "⇩⇩";
	              title = "50% Freeleech";
	              break;
	              case "G_DoubleUpload":
	              addon = "⬆";
	              title = "Double upload";
	              break;
	              case "PTP_Golden":
	              addon = "🌟";
	              title = "Golden";
	              break;
	              case "PTP_Approved":
	              addon = "✔";
	              title = "Approved by PTP";
	              break;
	              case "HDB_Internal":
	              addon = "🚪";
	              title = "HDBits Internal";
	              break;
	                case "G_Scene":
	                    addon = "☠";
	                    title = "Scene Release";
	                    break;
	                case "AHD_Internal":
	                    addon = "🚪";
	                    title = "AHD Internal";
	                    break;
	                case "G_Freeleech75":
	                    addon = "⇩⬇";
	                    title = "75% Freeleech";
	                    break;
	                case "G_Freeleech25":
	                    addon = "⇩";
	                    title = "25% Freeleech";
	                    break;
	            }
	            if (addon !== "") {
	              html += "<a href='https://github.com/Radarr/Radarr/wiki/Indexer-Flags#supported-flags' target='_blank' style='color: inherit; text-decoration: none;'><span title='{0}'>{1}</span></a>".format(title, addon);
	            }
	          });
	        }
	
	        this.$el.html(html);
	
	        return this;
	    }
	});


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var _ = __webpack_require__(8);
	
	module.exports = TemplatedCell.extend({
	    className : 'matches-cell',
	    template  : 'Cells/MultipleFormatsCell'
	});


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var PagableCollection = __webpack_require__(29);
	var ReleaseModel = __webpack_require__(154);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PagableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + '/release',
	    model : ReleaseModel,
	
	    state : {
	        pageSize : 2000,
	        sortKey  : 'download',
	        order    : -1
	    },
	
	    mode : 'client',
	
	    sortMappings : {
	        'quality'    : {
	            sortKey : "qualityWeight"
	        },
	        'rejections' : {
	            sortValue : function(model) {
	                var rejections = model.get('rejections');
	                var releaseWeight = model.get('releaseWeight');
	
	                if (rejections.length !== 0) {
	                    return releaseWeight + 1000000;
	                }
	
	                return releaseWeight;
	            }
	        },
	        "edition" : {
	          sortKey : "edition"
	        },
	        "flags" : {
	          sortValue : function(model) {
	            var flags = model.get("indexerFlags");
	            var weight = 0;
	            if (flags) {
	              _.each(flags, function(flag){
	                var addon = "";
	                var title = "";
	
	                switch (flag) {
	                  case "G_Halfleech":
	                  weight += 1;
	                  break;
	                  case "G_Freeleech":
	                  case "G_DoubleUpload":
	                  case "PTP_Approved":
	                  case "PTP_Golden":
	                  case "HDB_Internal":
	                  weight += 2;
	                  break;
	                }
	              });
	            }
	
	            return weight;
	          }
	        },
	        'download'   : {
	            sortKey : 'releaseWeight'
	        },
	        'seeders'    : {
	            sortValue : function(model) {
	                var seeders = model.get('seeders') || 0;
	                var leechers = model.get('leechers') || 0;
	
	                return seeders * 1000000 + leechers;
	            }
	        },
	        'age'        : {
	            sortKey : 'ageMinutes'
	        }
	    },
	
	    fetchEpisodeReleases : function(episodeId) {
	        return this.fetch({ data : { episodeId : episodeId } });
	    },
	
	    fetchMovieReleases : function(movieId) {
	      return this.fetch({ data : { movieId : movieId}});
	    }
	
	});
	
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	    downloadOk : function() {
	        return this.get("mappingResult") === "success" || this.get("mappingResult") === "successLenientMapping";
	    },
	
	    forceDownloadOk : function() {
	        return this.get("mappingResult") === "wrongYear" || this.get("mappingResult") === "wrongTitle";
	    }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Search/NoResultsViewTemplate'
	});


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var FilesLayout = __webpack_require__(157);
	var ExtraFilesLayout = __webpack_require__(165);
	
	module.exports = Marionette.Layout.extend({
			template : 'Movies/Files/AllFilesLayoutTemplate',
	
			regions : {
				files        : "#movie-files",
				mediaFiles   : "#movie-media-files",
				extras  	 : "#movie-extra-files"
			},
	
			onShow : function() {
				this.filesLayout = new FilesLayout({ model : this.model });
				this.extraFilesLayout = new ExtraFilesLayout({ model : this.model });
	
				this._showFiles();
			},
	
			_showFiles : function(e) {
				if (e) {
					e.preventDefault();
				}
				
				this.mediaFiles.show(this.filesLayout);
				this.extras.show(this.extraFilesLayout);
			}
	});


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var FilesCollection = __webpack_require__(158);
	var CommandController = __webpack_require__(84);
	var LoadingView = __webpack_require__(120);
	var NoResultsView = __webpack_require__(160);
	var FileModel = __webpack_require__(159);
	var FileTitleCell = __webpack_require__(161);
	var FileSizeCell = __webpack_require__(137);
	var QualityCell = __webpack_require__(125);
	var MediaInfoCell = __webpack_require__(162);
	var EditionCell = __webpack_require__(150);
	var DeleteFileCell = __webpack_require__(163);
	var EditFileCell = __webpack_require__(164);
	
	module.exports = Marionette.Layout.extend({
		template : 'Movies/Files/Media/FilesLayoutTemplate',
	
		regions : {
			grid : "#movie-files-grid"
		},
	
		events : {
			'click .x-search-auto'   : '_searchAuto',
			'click .x-search-manual' : '_searchManual',
			'click .x-search-back'   : '_showButtons'
		},
	
		columns : [
			{
				name  : 'title',
				label : 'Title',
				cell  : FileTitleCell
			},
			{
				name : "mediaInfo",
				label : "Media Info",
				cell : MediaInfoCell
			},
			{
				name  : 'edition',
				label : 'Edition',
				cell  : EditionCell,
				title : "Edition",
			},
			{
				name  : 'size',
				label : 'Size',
				cell  : FileSizeCell
			},
			{
				name  : 'quality',
				label : 'Quality',
				cell  : QualityCell,
			},
			{
				name : "delete",
				label : "",
				cell : DeleteFileCell,
			},
			{
				name : "edit",
				label : "",
				cell : EditFileCell,
			}
		],
	
	
		initialize : function(movie) {
			this.filesCollection = new FilesCollection();
			var file = movie.model.get("movieFile");
			this.movie = movie;
			this.filesCollection.add(file);
	
			this.listenTo(this.model, 'change', function(model, options) {
				if (options && options.changeSource === 'signalr') {
					this._refresh(model);
				}
			});
	
			vent.on(vent.Commands.MovieFileEdited, this._showGrid, this);
		},
	
		_refresh : function(model) {
			this.filesCollection = new FilesCollection();
	
			if(model.get('hasFile')) {
				var file = model.get("movieFile");
				this.filesCollection.add(file);
			}
	
			this.onShow();
		},
	
		_refreshClose : function(options) {
			this.filesCollection = new FilesCollection();
			var file = this.movie.model.get("movieFile");
			this.filesCollection.add(file);
			this._showGrid();
		},
	
		onShow : function() {
			this._showGrid();
		},
	
		_showGrid : function() {
			if (this.filesCollection.length === 0) {
	            this.regionManager.get('grid').show(new NoResultsView());
			}
			else {
				this.regionManager.get('grid').show(new Backgrid.Grid({
					row        : Backgrid.Row,
					columns    : this.columns,
					collection : this.filesCollection,
					className  : 'table table-hover'
				}));
			}
		}
	});


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var PagableCollection = __webpack_require__(29);
	var FileModel = __webpack_require__(159);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PagableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + "/moviefile",
	    model : FileModel,
	
	    state : {
	        pageSize : 2000,
	        sortKey  : 'title',
	        order    : -1
	    },
	
	    mode : 'client',
	
	    sortMappings : {
	        'quality'    : {
	            sortKey : "qualityWeight"
	        },
	        "edition" : {
	          sortKey : "edition"
	        }
	    },
	
	});
	
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Files/NoFilesViewTemplate'
	});


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'file-title-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var title = this.model.get('relativePath');
	            this.$el.html(title);
	
	
	        return this;
	    }
	});


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'release-title-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var info = this.model.get('mediaInfo');
	        if (info) {
	          var runtime = info.runTime;
	          if (runtime) {
	            runtime = runtime.split(".")[0];
	          }
	          var video = "{0} ({1}x{2}) ({3})".format(info.videoFormat || info.videoCodec, info.width, info.height, runtime);
	          var audio = "{0} ({1})".format(info.audioFormat, info.audioLanguages);
	          this.$el.html(video + " " + audio);
	        }
	
	
	        return this;
	    }
	});


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'delete-episode-file-cell',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i class="icon-radarr-delete" title="Delete movie file from disk"></i>');
	
	        return this;
	    },
	
	    _onClick : function() {
	        var self = this;
	        if (window.confirm('Are you sure you want to delete \'{0}\' from disk?'.format(this.model.get('relativePath')))) {
	            this.model.destroy().done(function() {
	                vent.trigger(vent.Events.MovieFileDeleted, { movieFile : self.model });
	            });
	        }
	    }
	});


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
			className : 'edit-episode-file-cell',
	
			events : {
					'click' : '_onClick'
			},
	
			render : function() {
					this.$el.empty();
					this.$el.html('<i class="icon-radarr-edit" title="Edit information about this file."></i>');
	
					return this;
			},
	
			_onClick : function() {
					var self = this;
					vent.trigger(vent.Commands.EditFileCommand, { file : this.model });
			}
	});


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var ExtraFilesCollection = __webpack_require__(166);
	var LoadingView = __webpack_require__(120);
	var ExtraFileModel = __webpack_require__(167);
	var FileTitleCell = __webpack_require__(161);
	var ExtraExtensionCell = __webpack_require__(168);
	var ExtraTypeCell = __webpack_require__(169);
	var NoResultsView = __webpack_require__(160);
	
	module.exports = Marionette.Layout.extend({
			template : 'Movies/Files/Extras/ExtraFilesLayoutTemplate',
	
			regions : {
				extraFilesTable : '.extra-files-table'
			},
	
			columns : [
				{
					name  : 'relativePath',
					label : 'File',
					cell  : FileTitleCell
				},
				{
					name  : 'extension',
					label : 'Extension',
					cell  : ExtraExtensionCell
				},
				{
					name  : 'type',
					label : 'Type',
					cell  : ExtraTypeCell
				}
			],
	
	
			initialize : function() {
				this.collection = new ExtraFilesCollection();
				
				this.listenTo(this.collection, 'sync', this._showTable);
			},
		
			onShow : function() {
				this.extraFilesTable.show(new LoadingView());
				
				this.collection.fetchMovieExtras(this.model.id);			
			},
		
			_showTable : function() {
				if (this.collection.any()) {
					this.extraFilesTable.show(new Backgrid.Grid({
						row        : Backgrid.Row,
						columns    : this.columns,
						collection : this.collection,
						className  : 'table table-hover'
					}));
				} else {
					this.extraFilesTable.show(new NoResultsView());
				}
			}
	});


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var PagableCollection = __webpack_require__(29);
	var ExtraFileModel = __webpack_require__(167);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PagableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + "/extrafile",
	    model : ExtraFileModel,
	
	    state : {
	        pageSize : 2000,
	        sortKey  : 'relativePath',
	        order    : -1
	    },
	
	    mode : 'client',
	
	    sortMappings : {
	        'relativePath'    : {
	            sortKey : "relativePath"
	        },
	        "type" : {
	            sortKey : "type"
	        },
	        "extension" : {
	            sortKey : "extension"
	        }
	    },
	
	    fetchMovieExtras : function(movieId) {
	        return this.fetch({ data : { movieId : movieId}});
	    }
	
	});
	
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'extra-extension-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var title = this.model.get('extension');
	            this.$el.html(title);
	
	        return this;
	    }
	});


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'extra-type-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var title = this.model.get('type');
	            this.$el.html(this.toTitleCase(title));
	
	        return this;
	    },
	
	    toTitleCase : function(str)
	    {
	        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    }
	});


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	//var ButtonsView = require('./ButtonsView');
	//var ManualSearchLayout = require('./ManualLayout');
	var TitlesCollection = __webpack_require__(171);
	var CommandController = __webpack_require__(84);
	var LoadingView = __webpack_require__(120);
	var NoResultsView = __webpack_require__(173);
	var TitleModel = __webpack_require__(172);
	var TitleCell = __webpack_require__(174);
	var SourceCell = __webpack_require__(175);
	var LanguageCell = __webpack_require__(176);
	
	module.exports = Marionette.Layout.extend({
			template : 'Movies/Titles/TitlesLayoutTemplate',
	
			regions : {
					main : '#movie-titles-region',
					grid : "#movie-titles-grid"
			},
	
			events : {
					'click .x-search-auto'   : '_searchAuto',
					'click .x-search-manual' : '_searchManual',
					'click .x-search-back'   : '_showButtons'
			},
	
			columns : [
					{
							name  : 'title',
							label : 'Title',
							cell  : Backgrid.StringCell
					},
	                {
	                        name : "this",
	                        label : "Source",
	                        cell : SourceCell,
	                        sortKey : "sourceType",
	                },
	                {
	                        name : "this",
	                        label : "Language",
	                        cell : LanguageCell
	                }
			],
	
	
			initialize : function(movie) {
					this.titlesCollection = new TitlesCollection();
					var titles = movie.model.get("alternativeTitles");
					this.movie = movie;
					this.titlesCollection.add(titles);
					//this.listenTo(this.releaseCollection, 'sync', this._showSearchResults);
					this.listenTo(this.model, 'change', function(model, options) {
							if (options && options.changeSource === 'signalr') {
									this._refresh(model);
							}
					});
	
					//vent.on(vent.Commands.MovieFileEdited, this._showGrid, this);
			},
	
			_refresh : function(model) {
				this.titlesCollection = new TitlesCollection();
					var file = model.get("alternativeTitles");
					this.titlesCollection.add(file);
	
	
				this.onShow();
			},
	
			_refreshClose : function(options) {
				this.titlesCollection = new TitlesCollection();
				var file = this.movie.model.get("alternativeTitles");
				this.titlesCollection.add(file);
				this._showGrid();
			},
	
			onShow : function() {
				this.grid.show(new Backgrid.Grid({
						row        : Backgrid.Row,
						columns    : this.columns,
						collection : this.titlesCollection,
						className  : 'table table-hover'
				}));
			},
	
			_showGrid : function() {
				this.regionManager.get('grid').show(new Backgrid.Grid({
					row        : Backgrid.Row,
					columns    : this.columns,
					collection : this.titlesCollection,
					className  : 'table table-hover'
				}));
			},
	
			_showMainView : function() {
					this.main.show(this.mainView);
			},
	
			_showButtons : function() {
					this._showMainView();
			},
	
			_showSearchResults : function() {
					if (this.releaseCollection.length === 0) {
							this.mainView = new NoResultsView();
					}
	
					else {
							//this.mainView = new ManualSearchLayout({ collection : this.releaseCollection });
					}
	
					this._showMainView();
			}
	});


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var PagableCollection = __webpack_require__(29);
	var TitleModel = __webpack_require__(172);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PagableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + "/aka",
	    model : TitleModel,
	
	    state : {
	        pageSize : 2000,
	        sortKey  : 'title',
	        order    : -1
	    },
	
	    mode : 'client',
	
	    sortMappings : {
	        "source" : {
	            sortKey : "sourceType"
	        },
	        "language" : {
	            sortKey : "language"
	        }
	    },
	
	});
	
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Titles/NoTitlesViewTemplate'
	});


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
	    className : 'movie-title-cell',
	    template  : 'Movies/Titles/TitleTemplate'
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'title-source-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var link;
	        var sourceTitle = this.model.get("sourceType");
	        var sourceId = this.model.get("sourceId");
	
	        switch (sourceTitle) {
	            case "tmdb":
	                sourceTitle = "TMDB";
	                link = "https://themoviedb.org/movie/" + sourceId;
	                break;
	            case "mappings":
	                sourceTitle = "Radarr Mappings";
	                link = "https://mappings.radarr.video/mapping/" + sourceId;
	                break;
	            case "user":
	                sourceTitle = "Force Download";
	                break;
	            case "indexer":
	                sourceTitle = "Indexer";
	                break;
	        }
	
	        var a = "{0}";
	
	        if (link) {
	            a = "<a href='"+link+"' target='_blank'>{0}</a>";
	        }
	
	        this.$el.html(a.format(sourceTitle));
	
	        return this;
	    }
	
	
	});


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'language-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var language = this.model.get("language");
	
	        this.$el.html(this.toTitleCase(language));
	
	        return this;
	    },
	
	    toTitleCase : function(str)
	    {
	        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    }
	
	
	});


/***/ },
/* 177 */,
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Controller = __webpack_require__(179);
	
	module.exports = Marionette.AppRouter.extend({
	    controller : new Controller(),
	    appRoutes  : {
	        'addmovies'                  : 'addMovies',
	        'addmovies/:action(/:query)' : 'addMovies',
	        'calendar'                   : 'calendar',
	        'settings'                   : 'settings',
	        'settings/:action(/:query)'  : 'settings',
	        'wanted'                     : 'wanted',
	        'wanted/:action'             : 'wanted',
	        'history'                    : 'activity',
	        'history/:action'            : 'activity',
	        'activity'                   : 'activity',
	        'activity/:action'           : 'activity',
	        'rss'                        : 'rss',
	        'system'                     : 'system',
	        'system/:action'             : 'system',
	        'movieeditor'                : 'movieEditor',
	        ':whatever'                  : 'showNotFound'
	    }
	});


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneController = __webpack_require__(75);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var ActivityLayout = __webpack_require__(180);
	var SettingsLayout = __webpack_require__(196);
	var AddMoviesLayout = __webpack_require__(356);
	var WantedLayout = __webpack_require__(387);
	var CalendarLayout = __webpack_require__(393);
	var ReleaseLayout = __webpack_require__(402);
	var SystemLayout = __webpack_require__(404);
	var MovieEditorLayout = __webpack_require__(452);
	
	module.exports = NzbDroneController.extend({
	    addMovies : function(action, query) {
	      this.setTitle("Add Movie");
	      this.showMainRegion(new AddMoviesLayout({ action : action, query : query }));
	    },
	
	    calendar : function() {
	        this.setTitle('Calendar');
	        this.showMainRegion(new CalendarLayout());
	    },
	
	    settings : function(action) {
	        this.setTitle('Settings');
	        this.showMainRegion(new SettingsLayout({ action : action }));
	    },
	
	    wanted : function(action) {
	        this.setTitle('Wanted');
	        this.showMainRegion(new WantedLayout({ action : action }));
	    },
	
	    activity : function(action) {
	        this.setTitle('Activity');
	        this.showMainRegion(new ActivityLayout({ action : action }));
	    },
	
	    rss : function() {
	        this.setTitle('RSS');
	        this.showMainRegion(new ReleaseLayout());
	    },
	
	    system : function(action) {
	        this.setTitle('System');
	        this.showMainRegion(new SystemLayout({ action : action }));
	    },
	
	    movieEditor : function() {
	        this.setTitle('Movie Editor');
	        this.showMainRegion(new MovieEditorLayout());
	    }
	});


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var Backgrid = __webpack_require__(78);
	var HistoryLayout = __webpack_require__(181);
	var BlacklistLayout = __webpack_require__(184);
	var QueueLayout = __webpack_require__(190);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/ActivityLayoutTemplate',
	
	    regions : {
	        queueRegion : '#queue',
	        history     : '#history',
	        blacklist   : '#blacklist'
	    },
	
	    ui : {
	        queueTab     : '.x-queue-tab',
	        historyTab   : '.x-history-tab',
	        blacklistTab : '.x-blacklist-tab'
	    },
	
	    events : {
	        'click .x-queue-tab'     : '_showQueue',
	        'click .x-history-tab'   : '_showHistory',
	        'click .x-blacklist-tab' : '_showBlacklist'
	    },
	
	    initialize : function(options) {
	        if (options.action) {
	            this.action = options.action.toLowerCase();
	        }
	    },
	
	    onShow : function() {
	        switch (this.action) {
	            case 'history':
	                this._showHistory();
	                break;
	            case 'blacklist':
	                this._showBlacklist();
	                break;
	            default:
	                this._showQueue();
	        }
	    },
	
	    _navigate : function(route) {
	        Backbone.history.navigate(route, {
	            trigger : false,
	            replace : true
	        });
	    },
	
	    _showHistory : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.history.show(new HistoryLayout());
	        this.ui.historyTab.tab('show');
	        this._navigate('/activity/history');
	    },
	
	    _showBlacklist : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.blacklist.show(new BlacklistLayout());
	        this.ui.blacklistTab.tab('show');
	        this._navigate('/activity/blacklist');
	    },
	
	    _showQueue : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.queueRegion.show(new QueueLayout());
	        this.ui.queueTab.tab('show');
	        this._navigate('/activity/queue');
	    }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var HistoryCollection = __webpack_require__(122);
	var EventTypeCell = __webpack_require__(124);
	var MovieTitleCell = __webpack_require__(96);
	var HistoryQualityCell = __webpack_require__(182);
	var RelativeDateCell = __webpack_require__(95);
	var HistoryDetailsCell = __webpack_require__(183);
	var GridPager = __webpack_require__(104);
	var ToolbarLayout = __webpack_require__(108);
	var LoadingView = __webpack_require__(120);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/History/HistoryLayoutTemplate',
	
	    regions : {
	        history : '#x-history',
	        toolbar : '#x-history-toolbar',
	        pager   : '#x-history-pager'
	    },
	
	    columns : [
	        {
	            name      : 'eventType',
	            label     : '',
	            cell      : EventTypeCell,
	            cellValue : 'this'
	        },
	        {
	            name  : 'movie',
	            label : 'Movie Title',
	            cell  : MovieTitleCell,
	        },
	        {
	            name     : 'this',
	            label    : 'Quality',
	            cell     : HistoryQualityCell,
	            sortable : false
	        },
	        {
	            name  : 'date',
	            label : 'Date',
	            cell  : RelativeDateCell
	        },
	        {
	            name     : 'this',
	            label    : '',
	            cell     : HistoryDetailsCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new HistoryCollection({ tableName : 'history' });
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onShow : function() {
	        this.history.show(new LoadingView());
	        this._showToolbar();
	    },
	
	    _showTable : function(collection) {
	
	        this.history.show(new Backgrid.Grid({
	            columns    : this.columns,
	            collection : collection,
	            className  : 'table table-hover'
	        }));
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : collection
	        }));
	    },
	
	    _showToolbar : function() {
	        var filterOptions = {
	            type          : 'radio',
	            storeState    : true,
	            menuKey       : 'history.filterMode',
	            defaultAction : 'all',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'grabbed',
	                    title    : '',
	                    tooltip  : 'Grabbed',
	                    icon     : 'icon-radarr-downloading',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'imported',
	                    title    : '',
	                    tooltip  : 'Imported',
	                    icon     : 'icon-radarr-imported',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'failed',
	                    title    : '',
	                    tooltip  : 'Failed',
	                    icon     : 'icon-radarr-download-failed',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'deleted',
	                    title    : '',
	                    tooltip  : 'Deleted',
	                    icon     : 'icon-radarr-deleted',
	                    callback : this._setFilter
	                }
	            ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            right   : [
	                filterOptions
	            ],
	            context : this
	        }));
	    },
	
	    _setFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.setFilterMode(mode);
	
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    }
	});


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var _ = __webpack_require__(8);
	
	module.exports = NzbDroneCell.extend({
	    className : 'history-quality-cell',
	
	    render : function() {
	
	        var title = '';
	        var quality = this.model.get('quality');
	        var revision = quality.revision;
	
	        if (revision.real && revision.real > 0) {
	            title += ' REAL';
	        }
	
	        if (revision.version && revision.version > 1) {
	            title += ' PROPER';
	        }
	
	        title = title.trim();
	
	        var html = '';
	
	        if (this.model.get('qualityCutoffNotMet')) {
	            html = '<span class="badge badge-inverse" title="{0}">{1}</span>'.format(title, quality.quality.name);
	        } else {
	            html = '<span class="badge" title="{0}">{1}</span>'.format(title, quality.quality.name);
	        }
	
	        if (quality.customFormats.length > 0){
	            var formatNames = _.map(quality.customFormats, function(format) {
	                return format.name;
	            });
	            html += ' <span class="badge badge-success" title="Custom Formats">{0}</span>'.format(formatNames.join(", "));
	        }
	
	        this.$el.html(html);
	
	        return this;
	    }
	});


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'history-details-cell',
	
	    events : {
	        'click' : '_showDetails'
	    },
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i class="icon-radarr-info"></i>');
	
	        return this;
	    },
	
	    _showDetails : function() {
	        vent.trigger(vent.Commands.ShowHistoryDetails, { model : this.model });
	    }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var BlacklistCollection = __webpack_require__(185);
	var MovieTitleCell = __webpack_require__(96);
	var QualityCell = __webpack_require__(125);
	var RelativeDateCell = __webpack_require__(95);
	var BlacklistActionsCell = __webpack_require__(187);
	var GridPager = __webpack_require__(104);
	var LoadingView = __webpack_require__(120);
	var ToolbarLayout = __webpack_require__(108);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/Blacklist/BlacklistLayoutTemplate',
	
	    regions : {
	        blacklist : '#x-blacklist',
	        toolbar   : '#x-toolbar',
	        pager     : '#x-pager'
	    },
	
	    columns : [
	        {
	            name  : 'movie',
	            label : 'Movie Title',
	            cell  : MovieTitleCell
	        },
	        {
	            name  : 'sourceTitle',
	            label : 'Source Title',
	            cell  : 'string'
	        },
	        {
	            name     : 'quality',
	            label    : 'Quality',
	            cell     : QualityCell,
	            sortable : false
	        },
	        {
	            name  : 'date',
	            label : 'Date',
	            cell  : RelativeDateCell
	        },
	        {
	            name     : 'this',
	            label    : '',
	            cell     : BlacklistActionsCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new BlacklistCollection({ tableName : 'blacklist' });
	
	        this.listenTo(this.collection, 'sync', this._showTable);
	        this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	    },
	
	    onShow : function() {
	        this.blacklist.show(new LoadingView());
	        this._showToolbar();
	        this.collection.fetch();
	    },
	
	    _showTable : function(collection) {
	
	        this.blacklist.show(new Backgrid.Grid({
	            columns    : this.columns,
	            collection : collection,
	            className  : 'table table-hover'
	        }));
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : collection
	        }));
	    },
	
	    _showToolbar : function() {
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            collapse: true,
	            items      : [
	                {
	                    title   : 'Clear Blacklist',
	                    icon    : 'icon-radarr-clear',
	                    command : 'clearBlacklist'
	                }
	            ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            left    : [
	                leftSideButtons
	            ],
	            context : this
	        }));
	    },
	
	    _refreshTable : function(buttonContext) {
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.fetch({ reset : true });
	
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _commandComplete : function(options) {
	        if (options.command.get('name') === 'clearblacklist') {
	            this._refreshTable();
	        }
	    }
	});


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var BlacklistModel = __webpack_require__(186);
	var PageableCollection = __webpack_require__(29);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var Collection = PageableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + '/blacklist',
	    model : BlacklistModel,
	
	    state : {
	        pageSize : 15,
	        sortKey  : 'date',
	        order    : 1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	    sortMappings : {
	        'movie' : { sortKey : 'movie.title' }
	    },
	
	    parseState : function(resp) {
	        return { totalRecords : resp.totalRecords };
	    },
	
	    parseRecords : function(resp) {
	        if (resp) {
	            return resp.records;
	        }
	
	        return resp;
	    }
	});
	Collection = AsSortedCollection.call(Collection);
	Collection = AsPersistedStateCollection.call(Collection);
	
	module.exports = Collection;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	var MoviesCollection = __webpack_require__(61);
	
	module.exports = Backbone.Model.extend({
	    parse : function(model) {
	
	        //if (model.movie) {
	        //    model.movie = new MovieModel(model.movie);
	        //}
	
			model.movie = MoviesCollection.get(model.movieId);
	
	        return model;
	    }
	});


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	var BlacklistDetailsLayout = __webpack_require__(188);
	
	module.exports = NzbDroneCell.extend({
	    className : 'blacklist-actions-cell',
	
	    events : {
	        'click .x-details' : '_details',
	        'click .x-delete'  : '_delete'
	    },
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i class="icon-radarr-info x-details"></i>' +
	                      '<i class="icon-radarr-delete x-delete"></i>');
	
	        return this;
	    },
	
	    _details : function() {
	        vent.trigger(vent.Commands.OpenModalCommand, new BlacklistDetailsLayout({ model : this.model }));
	    },
	
	    _delete : function() {
	        this.model.destroy();
	    }
	});


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var BlacklistDetailsView = __webpack_require__(189);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/Blacklist/Details/BlacklistDetailsLayoutTemplate',
	
	    regions : {
	        bodyRegion : '.modal-body'
	    },
	
	    onShow : function() {
	        this.bodyRegion.show(new BlacklistDetailsView({ model : this.model }));
	    }
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Activity/Blacklist/Details/BlacklistDetailsViewTemplate'
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var QueueCollection = __webpack_require__(28);
	var MovieTitleCell = __webpack_require__(96);
	var QualityCell = __webpack_require__(125);
	var QueueStatusCell = __webpack_require__(191);
	var QueueActionsCell = __webpack_require__(192);
	var TimeleftCell = __webpack_require__(194);
	var ProgressCell = __webpack_require__(195);
	var ProtocolCell = __webpack_require__(148);
	var GridPager = __webpack_require__(104);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/Queue/QueueLayoutTemplate',
	
	    regions : {
	        table : '#x-queue',
	        pager : '#x-queue-pager'
	    },
	
	    columns : [
	        {
	            name      : 'status',
	            label     : '',
	            cell      : QueueStatusCell,
	            cellValue : 'this'
	        },
	        {
	            name     : 'movie',
	            label    : 'Movie',
	            cell     : MovieTitleCell
	        },
	        {
	            name     : 'quality',
	            label    : 'Quality',
	            cell     : QualityCell,
	            sortable : false
	        },
	        {
	            name  : 'protocol',
	            label : 'Protocol',
	            cell  : ProtocolCell
	        },
	        {
	            name      : 'timeleft',
	            label     : 'Time Left',
	            cell      : TimeleftCell,
	            cellValue : 'this'
	        },
	        {
	            name      : 'sizeleft',
	            label     : 'Progress',
	            cell      : ProgressCell,
	            cellValue : 'this'
	        },
	        {
	            name      : 'status',
	            label     : '',
	            cell      : QueueActionsCell,
	            cellValue : 'this'
	        }
	    ],
	
	    initialize : function() {
	        this.listenTo(QueueCollection, 'sync', this._showTable);
	    },
	
	    onShow : function() {
	        this._showTable();
	    },
	
	    _showTable : function() {
	        this.table.show(new Backgrid.Grid({
	            columns    : this.columns,
	            collection : QueueCollection,
	            className  : 'table table-hover'
	        }));
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : QueueCollection
	        }));
	    }
	});


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'queue-status-cell',
	    template  : 'Activity/Queue/QueueStatusCellTemplate',
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.cellValue) {
	            var status = this.cellValue.get('status').toLowerCase();
	            var trackedDownloadStatus = this.cellValue.has('trackedDownloadStatus') ? this.cellValue.get('trackedDownloadStatus').toLowerCase() : 'ok';
	            var icon = 'icon-radarr-downloading';
	            var title = 'Downloading';
	            var itemTitle = this.cellValue.get('title');
	            var content = itemTitle;
	
	            if (status === 'paused') {
	                icon = 'icon-radarr-paused';
	                title = 'Paused';
	            }
	
	            if (status === 'queued') {
	                icon = 'icon-radarr-queued';
	                title = 'Queued';
	            }
	
	            if (status === 'completed') {
	                icon = 'icon-radarr-downloaded';
	                title = 'Downloaded';
	            }
	
	            if (status === 'pending') {
	                icon = 'icon-radarr-pending';
	                title = 'Pending';
	            }
	
	            if (status === 'failed') {
	                icon = 'icon-radarr-download-failed';
	                title = 'Download failed';
	            }
	
	            if (status === 'warning') {
	                icon = 'icon-radarr-download-warning';
	                title = 'Download warning: check download client for more details';
	            }
	
	            if (trackedDownloadStatus === 'warning') {
	                icon += ' icon-radarr-warning';
	
	                this.templateFunction = Marionette.TemplateCache.get(this.template);
	                content = this.templateFunction(this.cellValue.toJSON());
	            }
	
	            if (trackedDownloadStatus === 'error') {
	                if (status === 'completed') {
	                    icon = 'icon-radarr-import-failed';
	                    title = 'Import failed: ' + itemTitle;
	                } else {
	                    icon = 'icon-radarr-download-failed';
	                    title = 'Download failed';
	                }
	
	                this.templateFunction = Marionette.TemplateCache.get(this.template);
	                content = this.templateFunction(this.cellValue.toJSON());
	            }
	
	            this.$el.html('<i class="{0}"></i>'.format(icon));
	            this.$el.popover({
	                content   : content,
	                html      : true,
	                trigger   : 'hover',
	                title     : title,
	                placement : 'right',
	                container : this.$el
	            });
	        }
	        return this;
	    }
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var TemplatedCell = __webpack_require__(93);
	var RemoveFromQueueView = __webpack_require__(193);
	
	module.exports = TemplatedCell.extend({
	
	    template  : 'Activity/Queue/QueueActionsCellTemplate',
	    className : 'queue-actions-cell',
	
	    events : {
	        'click .x-remove'        : '_remove',
	        'click .x-manual-import' : '_manualImport',
	        'click .x-grab'          : '_grab'
	    },
	
	    ui : {
	        import : '.x-import',
	        grab   : '.x-grab'
	    },
	
	    _remove : function() {
	        var showBlacklist = this.model.get('status') !== 'Pending';
	
	        vent.trigger(vent.Commands.OpenModalCommand, new RemoveFromQueueView({
	            model         : this.model,
	            showBlacklist : showBlacklist
	        }));
	    },
	
	    _manualImport : function () {
	        vent.trigger(vent.Commands.ShowManualImport,
	            {
	                downloadId: this.model.get('downloadId'),
	                title: this.model.get('title')
	            });
	    },
	
	    _grab : function() {
	        var self = this;
	        var data = _.omit(this.model.toJSON(), 'series', 'episode');
	
	        var promise = $.ajax({
	            url  : window.NzbDrone.ApiRoot + '/queue/grab',
	            type : 'POST',
	            data : JSON.stringify(data)
	        });
	
	        this.$(this.ui.grab).spinForPromise(promise);
	
	        promise.success(function() {
	            //find models that have the same series id and episode ids and remove them
	            self.model.trigger('destroy', self.model);
	        });
	    }
	});


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Activity/Queue/RemoveFromQueueViewTemplate',
	
	    events : {
	        'click .x-confirm-remove' : 'removeItem'
	    },
	
	    ui : {
	        blacklist : '.x-blacklist',
	        indicator : '.x-indicator'
	    },
	
	    initialize : function(options) {
	        this.templateHelpers = {
	            showBlacklist : options.showBlacklist
	        };
	    },
	
	    removeItem : function() {
	        var blacklist = this.ui.blacklist.prop('checked') || false;
	
	        this.ui.indicator.show();
	
	        this.model.destroy({
	            data : { 'blacklist' : blacklist },
	            wait : true
	        }).done(function() {
	            vent.trigger(vent.Commands.CloseModalCommand);
	        });
	    }
	});


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	var UiSettingsModel = __webpack_require__(22);
	var FormatHelpers = __webpack_require__(20);
	
	module.exports = NzbDroneCell.extend({
	    className : 'timeleft-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.cellValue) {
	            if (this.cellValue.get('status').toLowerCase() === 'pending') {
	                var ect = this.cellValue.get('estimatedCompletionTime');
	                var time = '{0} at {1}'.format(FormatHelpers.relativeDate(ect), moment(ect).format(UiSettingsModel.time(true, false)));
	                this.$el.html('<div title="Delaying download till {0}">-</div>'.format(time));
	                return this;
	            }
	
	            var timeleft = this.cellValue.get('timeleft');
	            var totalSize = FormatHelpers.bytes(this.cellValue.get('size'), 2);
	            var remainingSize = FormatHelpers.bytes(this.cellValue.get('sizeleft'), 2);
	
	            if (timeleft === undefined) {
	                this.$el.html('-');
	            } else {
	                this.$el.html('<span title="{1} / {2}">{0}</span>'.format(timeleft, remainingSize, totalSize));
	            }
	        }
	
	        return this;
	    }
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'progress-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        if (this.cellValue) {
	
	            var status = this.model.get('status').toLowerCase();
	
	            if (status === 'downloading') {
	                var progress = 100 - (this.model.get('sizeleft') / this.model.get('size') * 100);
	
	                this.$el.html('<div class="progress" title="{0}%">'.format(progress.toFixed(1)) +
	                              '<div class="progress-bar progress-bar-purple" style="width: {0}%;"></div></div>'.format(progress));
	            }
	        }
	
	        return this;
	    }
	});


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var GeneralSettingsModel = __webpack_require__(197);
	var NamingModel = __webpack_require__(200);
	var MediaManagementLayout = __webpack_require__(201);
	var MediaManagementSettingsModel = __webpack_require__(225);
	var ProfileLayout = __webpack_require__(226);
	var QualityLayout = __webpack_require__(253);
	var CustomFormatLayout = __webpack_require__(259);
	var IndexerLayout = __webpack_require__(277);
	var IndexerCollection = __webpack_require__(278);
	var IndexerSettingsModel = __webpack_require__(295);
	var NetImportSettingsModel = __webpack_require__(296);
	var NetImportCollection = __webpack_require__(240);
	var ImportExclusionsCollection = __webpack_require__(297);
	var NetImportLayout = __webpack_require__(299);
	var DownloadClientLayout = __webpack_require__(319);
	var DownloadClientSettingsModel = __webpack_require__(337);
	var NotificationCollectionView = __webpack_require__(338);
	var NotificationCollection = __webpack_require__(343);
	var MetadataLayout = __webpack_require__(347);
	var GeneralView = __webpack_require__(353);
	var UiView = __webpack_require__(354);
	var UiSettingsModel = __webpack_require__(355);
	var LoadingView = __webpack_require__(120);
	var Config = __webpack_require__(33);
	
	module.exports = Marionette.Layout.extend({
			template : 'Settings/SettingsLayoutTemplate',
	
			regions : {
					mediaManagement : '#media-management',
					profiles        : '#profiles',
					quality         : '#quality',
	                customFormats   : '#custom-formats',
					indexers        : '#indexers',
					downloadClient  : '#download-client',
					netImport : "#net-import",
					notifications   : '#notifications',
					metadata        : '#metadata',
					general         : '#general',
					uiRegion        : '#ui',
					loading         : '#loading-region'
			},
	
			ui : {
					mediaManagementTab : '.x-media-management-tab',
					profilesTab        : '.x-profiles-tab',
					qualityTab         : '.x-quality-tab',
	                customFormatsTab   : '.x-custom-formats-tab',
					indexersTab        : '.x-indexers-tab',
					downloadClientTab  : '.x-download-client-tab',
					netImportTab : ".x-net-import-tab",
					notificationsTab   : '.x-notifications-tab',
					metadataTab        : '.x-metadata-tab',
					generalTab         : '.x-general-tab',
					uiTab              : '.x-ui-tab',
					advancedSettings   : '.x-advanced-settings'
			},
	
			events : {
					'click .x-media-management-tab' : '_showMediaManagement',
					'click .x-profiles-tab'         : '_showProfiles',
					'click .x-quality-tab'          : '_showQuality',
	                'click .x-custom-formats-tab'   : '_showCustomFormats',
					'click .x-indexers-tab'         : '_showIndexers',
					'click .x-download-client-tab'  : '_showDownloadClient',
					"click .x-net-import-tab" : "_showNetImport",
					'click .x-notifications-tab'    : '_showNotifications',
					'click .x-metadata-tab'         : '_showMetadata',
					'click .x-general-tab'          : '_showGeneral',
					'click .x-ui-tab'               : '_showUi',
					'click .x-save-settings'        : '_save',
					'change .x-advanced-settings'   : '_toggleAdvancedSettings'
			},
	
			initialize : function(options) {
					if (options.action) {
							this.action = options.action.toLowerCase();
					}
	
					this.listenTo(vent, vent.Hotkeys.SaveSettings, this._save);
			},
	
			onRender : function() {
					this.loading.show(new LoadingView());
					var self = this;
	
					this.mediaManagementSettings = new MediaManagementSettingsModel();
					this.namingSettings = new NamingModel();
					this.indexerSettings = new IndexerSettingsModel();
					this.netImportSettings = new NetImportSettingsModel();
					this.downloadClientSettings = new DownloadClientSettingsModel();
					this.notificationCollection = new NotificationCollection();
					this.generalSettings = new GeneralSettingsModel();
					this.uiSettings = new UiSettingsModel();
					Backbone.$.when(this.mediaManagementSettings.fetch(), this.namingSettings.fetch(), this.indexerSettings.fetch(), this.downloadClientSettings.fetch(),
							this.notificationCollection.fetch(), this.generalSettings.fetch(), this.uiSettings.fetch(), this.netImportSettings.fetch()).done(function() {
									if (!self.isClosed) {
											self.loading.$el.hide();
											self.mediaManagement.show(new MediaManagementLayout({
													settings       : self.mediaManagementSettings,
													namingSettings : self.namingSettings
											}));
											self.profiles.show(new ProfileLayout());
											self.quality.show(new QualityLayout());
											self.customFormats.show(new CustomFormatLayout());
											self.indexers.show(new IndexerLayout({ model : self.indexerSettings }));
											self.downloadClient.show(new DownloadClientLayout({ model : self.downloadClientSettings }));
											self.netImport.show(new NetImportLayout({model : self.netImportSettings}));
											self.notifications.show(new NotificationCollectionView({ collection : self.notificationCollection }));
											self.metadata.show(new MetadataLayout());
											self.general.show(new GeneralView({ model : self.generalSettings }));
											self.uiRegion.show(new UiView({ model : self.uiSettings }));
									}
							});
	
					this._setAdvancedSettingsState();
			},
	
			onShow : function() {
					switch (this.action) {
							case 'profiles':
									this._showProfiles();
									break;
							case 'quality':
									this._showQuality();
									break;
	                        case 'customformats':
	                                this._showCustomFormats();
	                                break;
							case 'indexers':
									this._showIndexers();
									break;
							case 'downloadclient':
									this._showDownloadClient();
									break;
							case "netimport":
									this._showNetImport();
									break;
							case 'connect':
									this._showNotifications();
									break;
							case 'notifications':
									this._showNotifications();
									break;
							case 'metadata':
									this._showMetadata();
									break;
							case 'general':
									this._showGeneral();
									break;
							case 'ui':
									this._showUi();
									break;
							default:
									this._showMediaManagement();
					}
			},
	
			_showMediaManagement : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.mediaManagementTab.tab('show');
					this._navigate('settings/mediamanagement');
			},
	
			_showProfiles : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.profilesTab.tab('show');
					this._navigate('settings/profiles');
			},
	
			_showQuality : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.qualityTab.tab('show');
					this._navigate('settings/quality');
			},
	
	        _showCustomFormats : function(e) {
			        if (e) {
			                e.preventDefault();
	                }
	
	                this.ui.customFormatsTab.tab('show');
			        this._navigate('settings/customformats');
	        },
	
			_showIndexers : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.indexersTab.tab('show');
					this._navigate('settings/indexers');
			},
	
			_showNetImport : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.netImportTab.tab('show');
					this._navigate('settings/netimport');
			},
	
			_showDownloadClient : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.downloadClientTab.tab('show');
					this._navigate('settings/downloadclient');
			},
	
			_showNotifications : function(e) {
					if (e) {
							e.preventDefault();
					}
	
					this.ui.notificationsTab.tab('show');
					this._navigate('settings/connect');
			},
	
			_showMetadata : function(e) {
					if (e) {
							e.preventDefault();
					}
					this.ui.metadataTab.tab('show');
					this._navigate('settings/metadata');
			},
	
			_showGeneral : function(e) {
					if (e) {
							e.preventDefault();
					}
					this.ui.generalTab.tab('show');
					this._navigate('settings/general');
			},
	
			_showUi : function(e) {
					if (e) {
							e.preventDefault();
					}
					this.ui.uiTab.tab('show');
					this._navigate('settings/ui');
			},
	
			_navigate : function(route) {
					Backbone.history.navigate(route, {
							trigger : false,
							replace : true
					});
			},
	
			_save : function() {
					vent.trigger(vent.Commands.SaveSettings);
			},
	
			_setAdvancedSettingsState : function() {
					var checked = Config.getValueBoolean(Config.Keys.AdvancedSettings);
					this.ui.advancedSettings.prop('checked', checked);
	
					if (checked) {
							$('body').addClass('show-advanced-settings');
					}
			},
	
			_toggleAdvancedSettings : function() {
					var checked = this.ui.advancedSettings.prop('checked');
					Config.setValue(Config.Keys.AdvancedSettings, checked);
	
					if (checked) {
							$('body').addClass('show-advanced-settings');
					} else {
							$('body').removeClass('show-advanced-settings');
					}
			}
	});


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	
	module.exports = SettingsModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/host',
	    successMessage : 'General settings saved',
	    errorMessage   : 'Failed to save general settings'
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var DeepModel = __webpack_require__(43);
	var AsChangeTrackingModel = __webpack_require__(199);
	var Messenger = __webpack_require__(52);
	
	var model = DeepModel.extend({
	
	    initialize : function() {
	        this.listenTo(vent, vent.Commands.SaveSettings, this.saveSettings);
	        this.listenTo(this, 'destroy', this._stopListening);
	
	    },
	
	    saveSettings : function() {
	        if (!this.isSaved) {
	            var savePromise = this.save();
	
	            Messenger.monitor({
	                promise        : savePromise,
	                successMessage : this.successMessage,
	                errorMessage   : this.errorMessage
	            });
	
	
	            return savePromise;
	        }
	
	        return undefined;
	    },
	
	    _stopListening : function() {
	        this.stopListening(vent, vent.Commands.SaveSettings);
	    }
	});
	
	module.exports = AsChangeTrackingModel.call(model);


/***/ },
/* 199 */
/***/ function(module, exports) {

	module.exports = function() {
	    var originalInit = this.prototype.initialize;
	
	    this.prototype.initialize = function() {
	
	        this.isSaved = true;
	
	        this.on('change', function() {
	            this.isSaved = false;
	        }, this);
	
	        this.on('sync', function() {
	            this.isSaved = true;
	        }, this);
	
	        if (originalInit) {
	            originalInit.call(this);
	        }
	    };
	
	    return this;
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var ModelBase = __webpack_require__(198);
	
	module.exports = ModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/naming',
	    successMessage : 'MediaManagement settings saved',
	    errorMessage   : 'Couldn\'t save naming settings'
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var NamingView = __webpack_require__(202);
	var SortingView = __webpack_require__(212);
	var FileManagementView = __webpack_require__(213);
	var PermissionsView = __webpack_require__(224);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/MediaManagement/MediaManagementLayoutTemplate',
	
	    regions : {
	        episodeNaming  : '#episode-naming',
	        sorting        : '#sorting',
	        fileManagement : '#file-management',
	        permissions    : '#permissions'
	    },
	
	    initialize : function(options) {
	        this.settings = options.settings;
	        this.namingSettings = options.namingSettings;
	    },
	
	    onShow : function() {
	        this.episodeNaming.show(new NamingView({ model : this.namingSettings }));
	        this.sorting.show(new SortingView({ model : this.settings }));
	        this.fileManagement.show(new FileManagementView({ model : this.settings }));
	        this.permissions.show(new PermissionsView({ model : this.settings }));
	    }
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var NamingSampleModel = __webpack_require__(203);
	var BasicNamingView = __webpack_require__(204);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	module.exports = (function() {
	    var view = Marionette.Layout.extend({
	        template                            : 'Settings/MediaManagement/Naming/NamingViewTemplate',
	        ui                                  : {
	            namingOptions            : '.x-naming-options',
	            renameEpisodesCheckbox   : '.x-rename-episodes',
	            replacingOptions         : '.x-replacing-options',
	            replaceIllegalChars      : '.x-replace-illegal-chars',
	            namingTokenHelper        : '.x-naming-token-helper',
	            movieExample             : '.x-movie-example',
	            movieFolderExample       : '.x-movie-folder-example'
	        },
	        events                              : {
	            'change .x-rename-episodes'      : '_setRenameEpisodesVisibility',
	            'change .x-replace-illegal-chars': '_setReplaceIllegalCharsVisibility',
	            'click .x-show-wizard'           : '_showWizard',
	            'click .x-naming-token-helper a' : '_addToken',
	            'change .x-multi-episode-style'  : '_multiEpisodeFomatChanged'
	        },
	        regions                             : { basicNamingRegion : '.x-basic-naming' },
	        onRender                            : function() {
	            if (!this.model.get('renameEpisodes')) {
	                this.ui.namingOptions.hide();
	            }
	            if (!this.model.get('replaceIllegalCharacters')) {
	                this.ui.replacingOptions.hide();
	            }
	            var basicNamingView = new BasicNamingView({ model : this.model });
	            this.basicNamingRegion.show(basicNamingView);
	            this.namingSampleModel = new NamingSampleModel();
	            this.listenTo(this.model, 'change', this._updateSamples);
	            this.listenTo(this.namingSampleModel, 'sync', this._showSamples);
	            this._updateSamples();
	        },
	        _setRenameEpisodesVisibility : function() {
	            var checked = this.ui.renameEpisodesCheckbox.prop('checked');
	            if (checked) {
	                this.ui.namingOptions.slideDown();
	            } else {
	                this.ui.namingOptions.slideUp();
	            }
	        },
	        _setReplaceIllegalCharsVisibility : function() {
	            var checked = this.ui.replaceIllegalChars.prop('checked');
	            if (checked) {
	                this.ui.replacingOptions.slideDown();
	            } else {
	                this.ui.replacingOptions.slideUp();
	            }
	        },
	        _updateSamples                      : function() {
	            this.namingSampleModel.fetch({ data : this.model.toJSON() });
	        },
	        _showSamples                        : function() {
	            this.ui.movieExample.html(this.namingSampleModel.get('movieExample'));
	            this.ui.movieFolderExample.html(this.namingSampleModel.get('movieFolderExample'));
	        },
	        _addToken                           : function(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var target = e.target;
	            var token = '';
	            var input = this.$(target).closest('.x-helper-input').children('input');
	            if (this.$(target).attr('data-token')) {
	                token = '{{0}}'.format(this.$(target).attr('data-token'));
	            } else {
	                token = this.$(target).attr('data-separator');
	            }
	            input.val(input.val() + token);
	            input.change();
	            this.ui.namingTokenHelper.removeClass('open');
	            input.focus();
	        },
	        multiEpisodeFormatChanged           : function() {
	            this.model.set('multiEpisodeStyle', this.ui.multiEpisodeStyle.val());
	        }
	    });
	    AsModelBoundView.call(view);
	    AsValidatedView.call(view);
	    return view;
	}).call(this);


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({ url : window.NzbDrone.ApiRoot + '/config/naming/samples' });

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var Config = __webpack_require__(33);
	var NamingSampleModel = __webpack_require__(203);
	var BasicNamingModel = __webpack_require__(205);
	var AsModelBoundView = __webpack_require__(206);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/MediaManagement/Naming/Basic/BasicNamingViewTemplate',
	
	    ui : {
	        namingOptions        : '.x-naming-options',
	        singleEpisodeExample : '.x-single-episode-example',
	        multiEpisodeExample  : '.x-multi-episode-example',
	        dailyEpisodeExample  : '.x-daily-episode-example'
	    },
	
	    initialize : function(options) {
	        this.namingModel = options.model;
	        this.model = new BasicNamingModel();
	
	        this._parseNamingModel();
	
	        this.listenTo(this.model, 'change', this._buildFormat);
	        this.listenTo(this.namingModel, 'sync', this._parseNamingModel);
	    },
	
	    _parseNamingModel : function() {
	        var standardFormat = this.namingModel.get('standardMovieFormat');
	
	        var includeSeriesTitle = false;//standardFormat.match(/\{Series[-_. ]Title\}/i);
	        var includeEpisodeTitle = false;//standardFormat.match(/\{Episode[-_. ]Title\}/i);
	        var includeQuality = standardFormat.match(/\{Quality[-_. ]Title\}/i);
	        var numberStyle = standardFormat.match(/s?\{season(?:\:0+)?\}[ex]\{episode(?:\:0+)?\}/i);
	        var replaceSpaces = standardFormat.indexOf(' ') === -1;
	        var separator = standardFormat.match(/\}( - |\.-\.|\.| )|( - |\.-\.|\.| )\{/i);
	
	        if (separator === null || separator[1] === '.-.') {
	            separator = ' - ';
	        } else {
	            separator = separator[1];
	        }
	
	        if (numberStyle === null) {
	            numberStyle = 'S{season:00}E{episode:00}';
	        } else {
	            numberStyle = numberStyle[0];
	        }
	
	        this.model.set({
	            includeSeriesTitle  : includeSeriesTitle !== null,
	            includeEpisodeTitle : includeEpisodeTitle !== null,
	            includeQuality      : includeQuality !== null,
	            numberStyle         : numberStyle,
	            replaceSpaces       : replaceSpaces,
	            separator           : separator
	        }, { silent : true });
	    },
	
	    _buildFormat : function() {
	        if (Config.getValueBoolean(Config.Keys.AdvancedSettings)) {
	            return;
	        }
	
	        var movieFormat = "";
	
	        if (this.model.get('replaceSpaces')) {
	            movieFormat += '{Movie.Title}';
	        } else {
	            movieFormat += '{Movie Title}';
	        }
	
	        movieFormat += this.model.get('separator') + '{Release Year}' + this.model.get('separator');
	
	        if (this.model.get('includeQuality')) {
	            if (this.model.get('replaceSpaces')) {
	                movieFormat += '{Quality.Title}';
	            } else {
	                movieFormat += '{Quality Title}';
	            }
	        }
	
	        if (this.model.get('replaceSpaces')) {
	            movieFormat = movieFormat.replace(/\s/g, '.');
	        }
	
	        this.namingModel.set('standardMovieFormat', movieFormat);
	    }
	});
	
	module.exports = AsModelBoundView.call(view);


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var ModelBinder = __webpack_require__(207);
	
	module.exports = function() {
	
	    var originalOnRender = this.prototype.onRender;
	    var originalBeforeClose = this.prototype.onBeforeClose;
	
	    this.prototype.onRender = function() {
	
	        if (!this.model) {
	            throw 'View has no model for binding';
	        }
	
	        if (!this._modelBinder) {
	            this._modelBinder = new ModelBinder();
	        }
	
	        var options = {
	            changeTriggers : {
	                ''                  : 'change typeahead:selected typeahead:autocompleted',
	                '[contenteditable]' : 'blur',
	                '[data-onkeyup]'    : 'keyup'
	            }
	        };
	
	        this._modelBinder.bind(this.model, this.el, null, options);
	
	        if (originalOnRender) {
	            originalOnRender.call(this);
	        }
	    };
	
	    this.prototype.onBeforeClose = function() {
	
	        if (this._modelBinder) {
	            this._modelBinder.unbind();
	            delete this._modelBinder;
	        }
	
	        if (originalBeforeClose) {
	            originalBeforeClose.call(this);
	        }
	    };
	
	    return this;
	};


/***/ },
/* 207 */,
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var Validation = __webpack_require__(209);
	var _ = __webpack_require__(8);
	
	module.exports = (function() {
	    'use strict';
	    return function() {
	
	        var originalInitialize = this.prototype.initialize;
	        var originalOnRender = this.prototype.onRender;
	        var originalBeforeClose = this.prototype.onBeforeClose;
	
	        var errorHandler = function(response) {
	            if (this.model) {
	                this.model.trigger('validation:failed', response);
	            } else {
	                this.trigger('validation:failed', response);
	            }
	        };
	
	        var validatedSync = function(method, model, options) {
	            model.trigger('validation:sync');
	
	            arguments[2].isValidatedCall = true;
	            return model._originalSync.apply(this, arguments).fail(errorHandler.bind(this));
	        };
	
	        var bindToModel = function(model) {
	            if (!model._originalSync) {
	                model._originalSync = model.sync;
	                model.sync = validatedSync.bind(this);
	            }
	        };
	
	        var validationFailed = function(response) {
	            if (response.status === 400) {
	                var view = this;
	                var validationErrors = JSON.parse(response.responseText);
	                _.each(validationErrors, function(error) {
	                    view.$el.processServerError(error);
	                });
	            }
	        };
	
	        this.prototype.initialize = function(options) {
	            if (this.model) {
	                this.listenTo(this.model, 'validation:sync', function() {
	                    this.$el.removeAllErrors();
	                });
	
	                this.listenTo(this.model, 'validation:failed', validationFailed);
	            } else {
	                this.listenTo(this, 'validation:sync', function() {
	                    this.$el.removeAllErrors();
	                });
	
	                this.listenTo(this, 'validation:failed', validationFailed);
	            }
	
	            if (originalInitialize) {
	                originalInitialize.call(this, options);
	            }
	        };
	
	        this.prototype.onRender = function() {
	            Validation.bind(this);
	            this.bindToModelValidation = bindToModel.bind(this);
	
	            if (this.model) {
	                this.bindToModelValidation(this.model);
	            }
	
	            if (originalOnRender) {
	                originalOnRender.call(this);
	            }
	        };
	
	        this.prototype.onBeforeClose = function() {
	            if (this.model) {
	                Validation.unbind(this);
	
	                //If we don't do this the next time the model is used the sync is bound to an old view
	                this.model.sync = this.model._originalSync;
	                this.model._originalSync = undefined;
	            }
	
	            if (originalBeforeClose) {
	                originalBeforeClose.call(this);
	            }
	        };
	
	        return this;
	    };
	}).call(this);

/***/ },
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/MediaManagement/Sorting/SortingViewTemplate',
	
	    events : {
	        'change .x-import-extra-files' : '_setExtraFileExtensionVisibility'
	    },
	
	    ui : {
	        importExtraFiles    : '.x-import-extra-files',
	        extraFileExtensions : '.x-extra-file-extensions'
	    },
	
	    onRender : function() {
	        if (!this.ui.importExtraFiles.prop('checked')) {
	            this.ui.extraFileExtensions.hide();
	        }
	    },
	
	    _setExtraFileExtensionVisibility : function() {
	        var showExtraFileExtensions = this.ui.importExtraFiles.prop('checked');
	
	        if (showExtraFileExtensions) {
	            this.ui.extraFileExtensions.slideDown();
	        }
	
	        else {
	            this.ui.extraFileExtensions.slideUp();
	        }
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	__webpack_require__(214);
	__webpack_require__(216);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/MediaManagement/FileManagement/FileManagementViewTemplate',
	
	    ui : {
	        recyclingBin : '.x-path'
	    },
	
	    onShow : function() {
	        this.ui.recyclingBin.fileBrowser();
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(215);
	
	$.fn.directoryAutoComplete = function(options) {
	    options = options || {};
	
	    var query = 'path';
	    var data = {
	        includeFiles: options.includeFiles || false
	    };
	
	    $(this).autoComplete({
	        resource : '/filesystem',
	        query    : query,
	        data     : data,
	        filter   : function(filter, response, callback) {
	            var matches = [];
	            var results = response.directories.concat(response.files);
	
	            $.each(results, function(i, d) {
	                if (d[query] && d[query].startsWith(filter)) {
	                    matches.push({ value : d[query] });
	                }
	            });
	
	            callback(matches);
	        }
	    });
	};

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(65);
	
	$.fn.autoComplete = function(options) {
	    if (!options) {
	        throw 'options are required';
	    }
	
	    if (!options.resource) {
	        throw 'resource is required';
	    }
	
	    if (!options.query) {
	        throw 'query is required';
	    }
	
	    $(this).typeahead({
	        hint      : true,
	        highlight : true,
	        minLength : 3,
	        items     : 20
	    }, {
	        name       : options.resource.replace('/'),
	        displayKey : '',
	        source     : function(filter, callback) {
	            var data = options.data || {};
	            data[options.query] = filter;
	            $.ajax({
	                url      : window.NzbDrone.ApiRoot + options.resource,
	                dataType : 'json',
	                type     : 'GET',
	                data     : data,
	                success  : function(response) {
	                    if (options.filter) {
	                        options.filter.call(this, filter, response, callback);
	                    } else {
	                        var matches = [];
	
	                        $.each(response, function(i, d) {
	                            if (d[options.query] && d[options.property].startsWith(filter)) {
	                                matches.push({ value : d[options.property] });
	                            }
	                        });
	
	                        callback(matches);
	                    }
	                }
	            });
	        }
	    });
	};

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	__webpack_require__(217);
	__webpack_require__(214);
	
	$.fn.fileBrowser = function(options) {
	    var inputs = $(this);
	
	    inputs.each(function() {
	        var input = $(this);
	        var inputOptions = $.extend({ input : input, showFiles: input.hasClass('x-filepath') }, options);
	        var inputGroup = $('<div class="input-group"></div>');
	        var inputGroupButton = $('<span class="input-group-btn"></span>');
	
	        var button = $('<button class="btn btn-primary x-file-browser" title="Browse"><i class="icon-radarr-folder-open"/></button>');
	
	        if (input.parent('.input-group').length > 0) {
	            input.parent('.input-group').find('.input-group-btn').prepend(button);
	        } else {
	            inputGroupButton.append(button);
	            input.wrap(inputGroup);
	            input.after(inputGroupButton);
	        }
	
	        button.on('click', function() {
	            vent.trigger(vent.Commands.ShowFileBrowser, inputOptions);
	        });
	
	        input.directoryAutoComplete({ includeFiles: inputOptions.showFiles });
	    });
	
	};


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var FileBrowserCollection = __webpack_require__(218);
	var EmptyView = __webpack_require__(220);
	var FileBrowserRow = __webpack_require__(221);
	var FileBrowserTypeCell = __webpack_require__(222);
	var FileBrowserNameCell = __webpack_require__(223);
	var RelativeDateCell = __webpack_require__(95);
	var FileSizeCell = __webpack_require__(137);
	var LoadingView = __webpack_require__(120);
	__webpack_require__(214);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Shared/FileBrowser/FileBrowserLayoutTemplate',
	
	    regions : {
	        browser : '#x-browser'
	    },
	
	    ui : {
	        path      : '.x-path',
	        indicator : '.x-indicator'
	    },
	
	    events : {
	        'typeahead:selected .x-path'      : '_pathChanged',
	        'typeahead:autocompleted .x-path' : '_pathChanged',
	        'keyup .x-path'                   : '_inputChanged',
	        'click .x-ok'                     : '_selectPath'
	    },
	
	    initialize : function(options) {
	        this.collection = new FileBrowserCollection();
	        this.collection.showFiles = options.showFiles || false;
	        this.collection.showLastModified = options.showLastModified || false;
	        this.input = options.input;
	        this._setColumns();
	        this.listenTo(this.collection, 'sync', this._showGrid);
	        this.listenTo(this.collection, 'filebrowser:row:folderselected', this._rowSelected);
	        this.listenTo(this.collection, 'filebrowser:row:fileselected', this._fileSelected);
	    },
	
	    onRender : function() {
	        this.browser.show(new LoadingView());
	        this.ui.path.directoryAutoComplete();
	        this._fetchCollection(this.input.val());
	        this._updatePath(this.input.val());
	    },
	
	    _setColumns : function() {
	        this.columns = [
	            {
	                name     : 'type',
	                label    : '',
	                sortable : false,
	                cell     : FileBrowserTypeCell
	            },
	            {
	                name     : 'name',
	                label    : 'Name',
	                sortable : false,
	                cell     : FileBrowserNameCell
	            }
	        ];
	        if (this.collection.showLastModified) {
	            this.columns.push({
	                name     : 'lastModified',
	                label    : 'Last Modified',
	                sortable : false,
	                cell     : RelativeDateCell
	            });
	        }
	        if (this.collection.showFiles) {
	            this.columns.push({
	                name     : 'size',
	                label    : 'Size',
	                sortable : false,
	                cell     : FileSizeCell
	            });
	        }
	    },
	
	    _fetchCollection : function(path) {
	        this.ui.indicator.show();
	        var data = { includeFiles : this.collection.showFiles };
	        if (path) {
	            data.path = path;
	        }
	        this.collection.fetch({ data : data });
	    },
	
	    _showGrid : function() {
	        this.ui.indicator.hide();
	        if (this.collection.models.length === 0) {
	            this.browser.show(new EmptyView());
	            return;
	        }
	        var grid = new Backgrid.Grid({
	            row        : FileBrowserRow,
	            collection : this.collection,
	            columns    : this.columns,
	            className  : 'table table-hover'
	        });
	        this.browser.show(grid);
	    },
	
	    _rowSelected : function(model) {
	        var path = model.get('path');
	
	        this._updatePath(path);
	        this._fetchCollection(path);
	    },
	
	    _fileSelected : function(model) {
	        var path = model.get('path');
	        var type = model.get('type');
	
	        this.input.val(path);
	        this.input.trigger('change');
	
	        this.input.trigger('filebrowser:fileselected', {
	            type : type,
	            path : path
	        });
	
	        vent.trigger(vent.Commands.CloseFileBrowser);
	    },
	
	    _pathChanged : function(e, path) {
	        this._fetchCollection(path.value);
	        this._updatePath(path.value);
	    },
	
	    _inputChanged : function() {
	        var path = this.ui.path.val();
	        if (path === '' || path.endsWith('\\') || path.endsWith('/')) {
	            this._fetchCollection(path);
	        }
	    },
	
	    _updatePath : function(path) {
	        if (path !== undefined || path !== null) {
	            this.ui.path.val(path);
	        }
	    },
	
	    _selectPath : function() {
	        var path = this.ui.path.val();
	
	        this.input.val(path);
	        this.input.trigger('change');
	
	        this.input.trigger('filebrowser:folderselected', {
	            type: 'folder',
	            path: path
	        });
	
	        vent.trigger(vent.Commands.CloseFileBrowser);
	    }
	});


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Backbone = __webpack_require__(6);
	var FileBrowserModel = __webpack_require__(219);
	
	module.exports = Backbone.Collection.extend({
	    model : FileBrowserModel,
	    url   : window.NzbDrone.ApiRoot + '/filesystem',
	
	    parse : function(response) {
	        var contents = [];
	        if (response.parent || response.parent === '') {
	            var type = 'parent';
	            var name = '...';
	            if (response.parent === '') {
	                type = 'computer';
	                name = 'My Computer';
	            }
	            contents.push({
	                type : type,
	                name : name,
	                path : response.parent
	            });
	        }
	        $.merge(contents, response.directories);
	        $.merge(contents, response.files);
	        return contents;
	    }
	});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'Shared/FileBrowser/EmptyViewTemplate'
	});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Row.extend({
	    className : 'file-browser-row',
	
	    events : {
	        'click' : '_selectRow'
	    },
	
	    _originalInit : Backgrid.Row.prototype.initialize,
	
	    initialize : function() {
	        this._originalInit.apply(this, arguments);
	    },
	
	    _selectRow : function() {
	        if (this.model.get('type') === 'file') {
	            this.model.collection.trigger('filebrowser:row:fileselected', this.model);
	        } else {
	            this.model.collection.trigger('filebrowser:row:folderselected', this.model);
	        }
	    }
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'file-browser-type-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var type = this.model.get(this.column.get('name'));
	        var icon = 'icon-radarr-hdd';
	
	        if (type === 'computer') {
	            icon = 'icon-radarr-browser-computer';
	        } else if (type === 'parent') {
	            icon = 'icon-radarr-browser-up';
	        } else if (type === 'folder') {
	            icon = 'icon-radarr-browser-folder';
	        } else if (type === 'file') {
	            icon = 'icon-radarr-browser-file';
	        }
	
	        this.$el.html('<i class="{0}"></i>'.format(icon));
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'file-browser-name-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var name = this.model.get(this.column.get('name'));
	
	        this.$el.html(name);
	
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/MediaManagement/Permissions/PermissionsViewTemplate'
	});
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	
	module.exports = SettingsModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/mediamanagement',
	    successMessage : 'Media management settings saved',
	    errorMessage   : 'Failed to save media management settings'
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ProfileCollection = __webpack_require__(41);
	var ProfileCollectionView = __webpack_require__(227);
	var DelayProfileLayout = __webpack_require__(246);
	var DelayProfileCollection = __webpack_require__(252);
	var LanguageCollection = __webpack_require__(141);
	
	var vent = __webpack_require__(34);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/Profile/ProfileLayoutTemplate',
	
	    regions : {
	        profile      : '#profile',
	        delayProfile : '#delay-profile'
	    },
	
	    initialize : function(options) {
	        this.settings = options.settings;
	        ProfileCollection.fetch();
	
	        vent.on(vent.Events.CustomFormatsChanged, function(options) {
	            ProfileCollection.fetch();
	        });
	
	        this.delayProfileCollection = new DelayProfileCollection();
	        this.delayProfileCollection.fetch();
	    },
	
	    onShow : function() {
	        this.profile.show(new ProfileCollectionView({ collection : ProfileCollection }));
	        this.delayProfile.show(new DelayProfileLayout({ collection : this.delayProfileCollection }));
	    }
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var ProfileView = __webpack_require__(228);
	var EditProfileView = __webpack_require__(229);
	var ProfileCollection = __webpack_require__(127);
	var _ = __webpack_require__(8);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ProfileView,
	    itemViewContainer : '.profiles',
	    template          : 'Settings/Profile/ProfileCollectionTemplate',
	
	    ui : {
	        'addCard' : '.x-add-card'
	    },
	
	    events : {
	        'click .x-add-card' : '_addProfile'
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.addCard.parent('li').before(itemView.el);
	    },
	
	    _addProfile : function() {
	        var self = this;
	        var schemaCollection = new ProfileCollection();
	        schemaCollection.fetch({
	            success : function(collection) {
	                var model = _.first(collection.models);
	                model.set('id', undefined);
	                model.set('name', '');
	                model.collection = self.collection;
	                var view = new EditProfileView({
	                    model             : model,
	                    profileCollection : self.collection
	                });
	
	                AppLayout.modalRegion.show(view);
	            }
	        });
	    }
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditProfileView = __webpack_require__(229);
	var AsModelBoundView = __webpack_require__(206);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(71);
	
	
	var view = Marionette.ItemView.extend({
			template : 'Settings/Profile/ProfileViewTemplate',
			tagName  : 'li',
	
			ui : {
					"progressbar"  : '.progress .bar',
					"deleteButton" : '.x-delete',
	
			},
	
			events : {
					'click' : '_editProfile'
			},
	
			initialize : function() {
					this.listenTo(this.model, 'sync', this.render);
			},
	
			_editProfile : function() {
					var view = new EditProfileView({
							model             : this.model,
							profileCollection : this.model.collection
					});
					AppLayout.modalRegion.show(view);
			}
	});
	
	module.exports = AsModelBoundView.call(view);


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var EditProfileItemView = __webpack_require__(230);
	var QualitySortableCollectionView = __webpack_require__(231);
	var EditProfileView = __webpack_require__(234);
	var DeleteView = __webpack_require__(239);
	var FullMovieCollection = __webpack_require__(61);
	var NetImportCollection = __webpack_require__(240);
	var Config = __webpack_require__(33);
	var AsEditModalView = __webpack_require__(243);
	
	var view = Marionette.Layout.extend({
	    template : 'Settings/Profile/Edit/EditProfileLayoutTemplate',
	
	    regions : {
	        fields    : '#x-fields',
	        qualities : '#x-qualities',
	        formats   : '#x-formats'
	    },
	
	    ui : {
	        deleteButton : '.x-delete'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.profileCollection = options.profileCollection;
	        this.itemsCollection = new Backbone.Collection(_.toArray(this.model.get('items')).reverse());
	        this.netImportCollection = new NetImportCollection();
	        this.netImportCollection.fetch();
	        this.formatItemsCollection = new Backbone.Collection(_.toArray(this.model.get('formatItems')).reverse());
	        this.listenTo(FullMovieCollection, 'all', this._updateDisableStatus);
	        this.listenTo(this.netImportCollection, 'all', this._updateDisableStatus);
	    },
	
	    onRender : function() {
	        this._updateDisableStatus();
	    },
	
	    onShow : function() {
	        this.fieldsView = new EditProfileView({ model : this.model });
	        this._showFieldsView();
	        var advancedShown = Config.getValueBoolean(Config.Keys.AdvancedSettings, false);
	
	        this.sortableListView = new QualitySortableCollectionView({
	            selectable     : true,
	            selectMultiple : true,
	            clickToSelect  : true,
	            clickToToggle  : true,
	            sortable       : advancedShown,
	
	            sortableOptions : {
	                handle : '.x-drag-handle'
	            },
	
	            visibleModelsFilter : function(model) {
	                var quality = model.get('quality');
	                if (quality) {
	                    return quality.id !== 0 || advancedShown;
	                }
	
	                return true;
	            },
	
	            collection : this.itemsCollection,
	            model      : this.model
	        });
	
	        this.sortableListView.setSelectedModels(this.itemsCollection.filter(function(item) {
	            return item.get('allowed') === true;
	        }));
	        this.qualities.show(this.sortableListView);
	
	        this.sortableFormatListView = new QualitySortableCollectionView({
	            selectable     : true,
	            selectMultiple : true,
	            clickToSelect  : true,
	            clickToToggle  : true,
	            sortable       : advancedShown,
	
	            sortableOptions : {
	                handle : '.x-drag-handle'
	            },
	
	            visibleModelsFilter : function(model) {
	                var quality = model.get('format');
	                console.log(quality);
	                if (quality) {
	                    console.log(quality);
	                    return quality.id !== 0 || advancedShown;
	                }
	
	                return true;
	            },
	
	            collection : this.formatItemsCollection,
	            model      : this.model
	        });
	        this.sortableFormatListView.setSelectedModels(this.formatItemsCollection.filter(function(item) {
	            return item.get('allowed') === true;
	        }));
	        this.formats.show(this.sortableFormatListView);
	
	        this.listenTo(this.sortableListView, 'selectionChanged', this._selectionChanged);
	        this.listenTo(this.sortableListView, 'sortStop', this._updateModel);
	
	        this.listenTo(this.sortableFormatListView, 'selectionChanged', this._selectionChanged);
	        this.listenTo(this.sortableFormatListView, 'sortStop', this._updateModel);
	    },
	
	    _onBeforeSave : function() {
	        var cutoff = this.fieldsView.getCutoff();
	        this.model.set('cutoff', cutoff);
	    },
	
	    _onAfterSave : function() {
	        this.profileCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _selectionChanged : function(newSelectedModels, oldSelectedModels) {
	        var addedModels = _.difference(newSelectedModels, oldSelectedModels);
	        var removeModels = _.difference(oldSelectedModels, newSelectedModels);
	
	        _.each(removeModels, function(item) {
	            item.set('allowed', false);
	        });
	        _.each(addedModels, function(item) {
	            item.set('allowed', true);
	        });
	        this._updateModel();
	    },
	
	    _updateModel : function() {
	        this.model.set('items', this.itemsCollection.toJSON().reverse());
	        this.model.set('formatItems', this.formatItemsCollection.toJSON().reverse());
	
	        this._showFieldsView();
	    },
	
	    _showFieldsView : function() {
	        this.fields.show(this.fieldsView);
	    },
	
	    _updateDisableStatus : function() {
	        if (this._isQualityInUse() || this._isQualityInUsebyList()) {
	            this.ui.deleteButton.attr('disabled', 'disabled');
	            this.ui.deleteButton.addClass('disabled');
	            this.ui.deleteButton.attr('title', 'Can\'t delete a profile that is attached to a movie or list.');
	        } else {
	            this.ui.deleteButton.removeClass('disabled');
	        }
	    },
	
	    _isQualityInUse : function() {
	        return FullMovieCollection.where({ 'profileId' : this.model.id }).length !== 0;
	    },
	
	    _isQualityInUsebyList : function() {
	        return this.netImportCollection.where({ 'profileId' : this.model.id }).length !== 0;
	    }
	});
	module.exports = AsEditModalView.call(view);


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Profile/Edit/EditProfileItemViewTemplate'
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var BackboneSortableCollectionView = __webpack_require__(232);
	var EditProfileItemView = __webpack_require__(230);
	
	module.exports = BackboneSortableCollectionView.extend({
	    className : 'qualities',
	    modelView : EditProfileItemView,
	
	    attributes : {
	        'validation-name' : 'items'
	    },
	
	    events : {
	        'click li, td'    : '_listItem_onMousedown',
	        'dblclick li, td' : '_listItem_onDoubleClick',
	        'keydown'         : '_onKeydown'
	    }
	});

/***/ },
/* 232 */,
/* 233 */,
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var LanguageCollection = __webpack_require__(141);
	var Config = __webpack_require__(33);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	__webpack_require__(235);
	__webpack_require__(71);
	__webpack_require__(238);
	
	var view = Marionette.ItemView.extend({
			template : 'Settings/Profile/Edit/EditProfileViewTemplate',
	
			ui : { cutoff : '.x-cutoff',
						preferred : '.x-preferred',
					},
	
			onRender : function() {
				this.ui.preferred.tagsinput({
						trimValue : true,
						allowDuplicates: true,
						tagClass  : 'label label-success'
				});
			},
	
			templateHelpers : function() {
					return {
							languages : LanguageCollection.toJSON()
					};
			},
	
			getCutoff : function() {
					var self = this;
	
					return _.findWhere(_.pluck(this.model.get('items'), 'quality'), { id : parseInt(self.ui.cutoff.val(), 10) });
			}
	});
	
	AsValidatedView.call(view);
	
	module.exports = AsModelBoundView.call(view);


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var TagCollection = __webpack_require__(236);
	var TagModel = __webpack_require__(237);
	__webpack_require__(238);
	
	var substringMatcher = function(tags, selector) {
	    return function findMatches (q, cb) {
	        q = q.replace(/[^-_a-z0-9]/gi, '').toLowerCase();
	        var matches = _.select(tags, function(tag) {
	            return selector(tag).toLowerCase().indexOf(q) > -1;
	        });
	        cb(matches);
	    };
	};
	var getExistingTags = function(tagValues) {
	    return _.select(TagCollection.toJSON(), function(tag) {
	        return _.contains(tagValues, tag.id);
	    });
	};
	
	var testTag = function(item) {
	    var tagLimitations = new RegExp('[^-_a-z0-9]', 'i');
	    try {
	        return !tagLimitations.test(item);
	    }
	    catch (e) {
	        return false;
	    }
	};
	
	var originalAdd = $.fn.tagsinput.Constructor.prototype.add;
	var originalRemove = $.fn.tagsinput.Constructor.prototype.remove;
	var originalBuild = $.fn.tagsinput.Constructor.prototype.build;
	
	$.fn.tagsinput.Constructor.prototype.add = function(item, dontPushVal) {
	    var tagCollection = this.options.tagCollection;
	
	    if (!tagCollection) {
	        originalAdd.call(this, item, dontPushVal);
	        return;
	    }
	    var self = this;
	
	    if (typeof item === 'string') {
	        var existing = _.find(tagCollection.toJSON(), { label : item });
	
	        if (existing) {
	            originalAdd.call(this, existing, dontPushVal);
	        } else if (this.options.allowNew) {
	            if (item === null || item === '' || !testTag(item)) {
	                return;
	            }
	
	            var newTag = new TagModel();
	            newTag.set({ label : item.toLowerCase() });
	            tagCollection.add(newTag);
	
	            newTag.save().done(function() {
	                item = newTag.toJSON();
	                originalAdd.call(self, item, dontPushVal);
	            });
	        }
	    } else {
	        originalAdd.call(self, item, dontPushVal);
	    }
	
	    self.$input.typeahead('val', '');
	};
	
	$.fn.tagsinput.Constructor.prototype.remove = function(item, dontPushVal) {
	    if (item === null) {
	        return;
	    }
	
	    originalRemove.call(this, item, dontPushVal);
	};
	
	$.fn.tagsinput.Constructor.prototype.build = function(options) {
	    var self = this;
	    var defaults = {
	        confirmKeys : [
	            9,
	            13,
	            32,
	            44,
	            59
	        ] //tab, enter, space, comma, semi-colon
	    };
	
	    options = $.extend({}, defaults, options);
	
	    self.$input.on('keydown', function(event) {
	        if (event.which === 9) {
	            var e = $.Event('keypress');
	            e.which = 9;
	            self.$input.trigger(e);
	            event.preventDefault();
	        }
	    });
	
	    self.$input.on('focusout', function() {
	        self.add(self.$input.val());
	        self.$input.val('');
	    });
	
	    originalBuild.call(this, options);
	};
	
	$.fn.tagInput = function(options) {
	
	    this.each(function () {
	
	        var input = $(this);
	        var tagInput = null;
	
	        if (input[0].hasAttribute('tag-source')) {
	
	            var listItems = JSON.parse(input.attr('tag-source'));
	
	            tagInput = input.tagsinput({
	                freeInput: false,
	                allowNew: false,
	                allowDuplicates: false,
	                itemValue: 'value',
	                itemText: 'name',
	                tagClass : input.attr('tag-class-name') || "label label-info",
	                typeaheadjs: {
	                    displayKey: 'name',
	                    source: substringMatcher(listItems, function (t) { return t.name; })
	                }
	            });
	
	            var origValue = input.val();
	
	            input.tagsinput('removeAll');
	
	            if (origValue) {
	                _.each(origValue.split(','), function (v) {
	                    var parsed = parseInt(v);
	                    var found = _.find(listItems, function (t) { return t.value === parsed; });
	
	                    if (found) {
	                        input.tagsinput('add', found);
	                    }
	                });
	            }
	        }
	        else {
	
	            options = $.extend({}, { allowNew: true }, options);
	
	            var model = options.model;
	            var property = options.property;
	
	            tagInput = input.tagsinput({
	                tagCollection: TagCollection,
	                freeInput: true,
	                allowNew: options.allowNew,
	                itemValue: 'id',
	                itemText: 'label',
	                trimValue: true,
	                typeaheadjs: {
	                    name: 'tags',
	                    displayKey: 'label',
	                    source: substringMatcher(TagCollection.toJSON(), function (t) { return t.label; })
	                }
	            });
	
	            //Override the free input being set to false because we're using objects
	            $(tagInput)[0].options.freeInput = true;
	
	            if (model) {
	                var tags = getExistingTags(model.get(property));
	
	                //Remove any existing tags and re-add them
	                input.tagsinput('removeAll');
	                _.each(tags, function (tag) {
	                    input.tagsinput('add', tag);
	                });
	                input.tagsinput('refresh');
	                input.on('itemAdded', function (event) {
	                    var tags = model.get(property);
	                    tags.push(event.item.id);
	                    model.set(property, tags);
	                });
	                input.on('itemRemoved', function (event) {
	                    if (!event.item) {
	                        return;
	                    }
	                    var tags = _.without(model.get(property), event.item.id);
	                    model.set(property, tags);
	                });
	            }
	        }
	
	    });
	
	};


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var TagModel = __webpack_require__(237);
	var ApiData = __webpack_require__(23);
	
	var Collection = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/tag',
	    model : TagModel,
	
	    comparator : function(model) {
	        return model.get('label');
	    }
	});
	
	module.exports = new Collection(ApiData.get('tag'));


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 238 */,
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Profile/DeleteProfileViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_removeProfile'
	    },
	
	    _removeProfile : function() {
	        this.model.destroy({ wait : true }).done(function() {
	            vent.trigger(vent.Commands.CloseModalCommand);
	        });
	    }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var NetImportModel = __webpack_require__(241);
	
	module.exports = Backbone.Collection.extend({
			model : NetImportModel,
			url   : window.NzbDrone.ApiRoot + '/netimport',
	
			comparator : function(left, right, collection) {
					var result = 0;
	
					return result;
			}
	});


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	
	module.exports = ProviderSettingsModelBase.extend({});


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var DeepModel = __webpack_require__(43);
	var Messenger = __webpack_require__(52);
	
	module.exports = DeepModel.extend({
	
	    getFieldValue : function(name) {
	        var index = _.indexOf(_.pluck(this.get('fields'), 'name'), name);
	        return this.get('fields.' + index + '.value');
	    },
	
	    setFieldValue : function(name, value) {
	        var index = _.indexOf(_.pluck(this.get('fields'), 'name'), name);
	        return this.set('fields.' + index + '.value', value);
	    },
	
	    requestAction : function(action, queryParams) {
	        var self = this;
	
	        this.trigger('validation:sync');
	
	        var params = {
	            url             : this.collection.url + '/action/' + action,
	            contentType     : 'application/json',
	            data            : JSON.stringify(this.toJSON()),
	            type            : 'POST',
	            isValidatedCall : true
	        };
	
	        if (queryParams) {
	            params.url += '?' + $.param(queryParams, true);
	        }
	
	        var promise = $.ajax(params);
	
	        promise.fail(function(response) {
	            self.trigger('validation:failed', response);
	        });
	
	        return promise;
	    },
	
	    test : function() {
	        var self = this;
	
	        this.trigger('validation:sync');
	
	        var params = {};
	
	        params.url = this.collection.url + '/test';
	        params.contentType = 'application/json';
	        params.data = JSON.stringify(this.toJSON());
	        params.type = 'POST';
	        params.isValidatedCall = true;
	
	        var promise = $.ajax(params);
	
	        Messenger.monitor({
	            promise        : promise,
	            successMessage : 'Testing \'{0}\' succeeded'.format(this.get('name')),
	            errorMessage   : 'Testing \'{0}\' failed'.format(this.get('name'))
	        });
	
	        promise.fail(function(response) {
	            self.trigger('validation:failed', response);
	        });
	
	        return promise;
	    }
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	
	module.exports = function() {
	    var originalInitialize = this.prototype.initialize;
	    var originalOnBeforeClose = this.prototype.onBeforeClose;
	
	    var saveInternal = function() {
	        var self = this;
	
	        if (this.saving) {
	            return this.savePromise;
	        }
	
	        this.saving = true;
	        this.ui.indicator.show();
	
	        if (this._onBeforeSave) {
	            this._onBeforeSave.call(this);
	        }
	
	        this.savePromise = this.model.save();
	
	        this.savePromise.always(function() {
	            self.saving = false;
	
	            if (!self.isClosed) {
	                self.ui.indicator.hide();
	            }
	        });
	
	        this.savePromise.done(function() {
	            self.originalModelData = JSON.stringify(self.model.toJSON());
	        });
	
	        return this.savePromise;
	    };
	
	    this.prototype.initialize = function(options) {
	        if (!this.model) {
	            throw 'View has no model';
	        }
	
	        this.testing = false;
	        this.saving = false;
	
	        this.originalModelData = JSON.stringify(this.model.toJSON());
	
	        this.events = this.events || {};
	        this.events['click .x-save'] = '_save';
	        this.events['click .x-save-and-add'] = '_saveAndAdd';
	        this.events['click .x-test'] = '_test';
	        this.events['click .x-delete'] = '_delete';
	
	        this.ui = this.ui || {};
	        this.ui.indicator = '.x-indicator';
	
	        if (originalInitialize) {
	            originalInitialize.call(this, options);
	        }
	    };
	
	    this.prototype._save = function() {
	        var self = this;
	        var promise = saveInternal.call(this);
	
	        promise.done(function() {
	            if (self._onAfterSave) {
	                self._onAfterSave.call(self);
	            }
	        });
	    };
	
	    this.prototype._saveAndAdd = function() {
	        var self = this;
	        var promise = saveInternal.call(this);
	
	        promise.done(function() {
	            if (self._onAfterSaveAndAdd) {
	                self._onAfterSaveAndAdd.call(self);
	            }
	        });
	    };
	
	    this.prototype._test = function() {
	        var self = this;
	
	        if (this.testing) {
	            return;
	        }
	
	        this.testing = true;
	        this.ui.indicator.show();
	
	        this.model.test().always(function() {
	            self.testing = false;
	            self.ui.indicator.hide();
	        });
	    };
	
	    this.prototype._delete = function() {
	        var view = new this._deleteView({ model : this.model });
	        AppLayout.modalRegion.show(view);
	    };
	
	    this.prototype.onBeforeClose = function() {
	        this.model.set(JSON.parse(this.originalModelData));
	
	        if (originalOnBeforeClose) {
	            originalOnBeforeClose.call(this);
	        }
	    };
	
	    return this;
	};


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(14);
	var _ = __webpack_require__(8);
	
	Handlebars.registerHelper('allowedLabeler', function() {
	    var ret = '';
	    var cutoff = this.cutoff;
	
	    _.each(this.items, function(item) {
	        if (item.allowed) {
	            if (item.quality.id === cutoff.id) {
	                ret += '<li><span class="label label-info" title="Cutoff">' + item.quality.name + '</span></li>';
	            } else {
	                ret += '<li><span class="label label-default">' + item.quality.name + '</span></li>';
	            }
	        }
	    });
	
	    return new Handlebars.SafeString(ret);
	});


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Handlebars = __webpack_require__(14);
	var LanguageCollection = __webpack_require__(141);
	
	Handlebars.registerHelper('languageLabel', function() {
	    var wantedLanguage = this.language;
	
	    var language = LanguageCollection.find(function(lang) {
	        return lang.get('nameLower') === wantedLanguage;
	    });
	
	    var result = '<span class="label label-primary">' + language.get('name') + '</span>';
	
	    return new Handlebars.SafeString(result);
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var DelayProfileCollectionView = __webpack_require__(247);
	var EditView = __webpack_require__(249);
	var Model = __webpack_require__(251);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/Profile/Delay/DelayProfileLayoutTemplate',
	
	    regions : {
	        delayProfiles : '.x-rows'
	    },
	
	    events : {
	        'click .x-add' : '_add'
	    },
	
	    initialize : function(options) {
	        this.collection = options.collection;
	
	        this._updateOrderedCollection();
	
	        this.listenTo(this.collection, 'sync', this._updateOrderedCollection);
	        this.listenTo(this.collection, 'add', this._updateOrderedCollection);
	        this.listenTo(this.collection, 'remove', function() {
	            this.collection.fetch();
	        });
	    },
	
	    onRender : function() {
	
	        this.sortableListView = new DelayProfileCollectionView({
	            sortable   : true,
	            collection : this.orderedCollection,
	
	            sortableOptions : {
	                handle : '.x-drag-handle'
	            },
	
	            sortableModelsFilter : function(model) {
	                return model.get('id') !== 1;
	            }
	        });
	
	        this.delayProfiles.show(this.sortableListView);
	
	        this.listenTo(this.sortableListView, 'sortStop', this._updateOrder);
	    },
	
	    _updateOrder : function() {
	        var self = this;
	
	        this.collection.forEach(function(model) {
	            if (model.get('id') === 1) {
	                return;
	            }
	
	            var orderedModel = self.orderedCollection.get(model);
	            var order = self.orderedCollection.indexOf(orderedModel) + 1;
	
	            if (model.get('order') !== order) {
	                model.set('order', order);
	                model.save();
	            }
	        });
	    },
	
	    _add : function() {
	        var model = new Model({
	            enableUsenet      : true,
	            enableTorrent     : true,
	            preferredProtocol : 'usenet',
	            usenetDelay       : 0,
	            torrentDelay      : 0,
	            order             : this.collection.length,
	            tags              : []
	        });
	
	        model.collection = this.collection;
	        var view = new EditView({
	            model            : model,
	            targetCollection : this.collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    },
	
	    _updateOrderedCollection : function() {
	        if (!this.orderedCollection) {
	            this.orderedCollection = new Backbone.Collection();
	        }
	
	        this.orderedCollection.reset(_.sortBy(this.collection.models, function(model) {
	            return model.get('order');
	        }));
	    }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var BackboneSortableCollectionView = __webpack_require__(232);
	var DelayProfileItemView = __webpack_require__(248);
	
	module.exports = BackboneSortableCollectionView.extend({
	    className : 'delay-profiles',
	    modelView : DelayProfileItemView,
	
	    events : {
	        'click li, td'    : '_listItem_onMousedown',
	        'dblclick li, td' : '_listItem_onDoubleClick',
	        'keydown'         : '_onKeydown'
	    }
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(249);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/Profile/Delay/DelayProfileItemViewTemplate',
	    className : 'row',
	
	    events : {
	        'click .x-edit' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(250);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(235);
	__webpack_require__(71);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Profile/Delay/Edit/DelayProfileEditViewTemplate',
	
	    _deleteView : DeleteView,
	
	    ui : {
	        tags         : '.x-tags',
	        usenetDelay  : '.x-usenet-delay',
	        torrentDelay : '.x-torrent-delay',
	        protocol     : '.x-protocol'
	    },
	
	    events : {
	        'change .x-protocol' : '_updateModel'
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onRender : function() {
	        if (this.model.id !== 1) {
	            this.ui.tags.tagInput({
	                model    : this.model,
	                property : 'tags'
	            });
	        }
	
	        this._toggleControls();
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _updateModel : function() {
	        var protocol = this.ui.protocol.val();
	
	        if (protocol === 'preferUsenet') {
	            this.model.set({
	                enableUsenet      : true,
	                enableTorrent     : true,
	                preferredProtocol : 'usenet'
	            });
	        }
	
	        if (protocol === 'preferTorrent') {
	            this.model.set({
	                enableUsenet      : true,
	                enableTorrent     : true,
	                preferredProtocol : 'torrent'
	            });
	        }
	
	        if (protocol === 'onlyUsenet') {
	            this.model.set({
	                enableUsenet      : true,
	                enableTorrent     : false,
	                preferredProtocol : 'usenet'
	            });
	        }
	
	        if (protocol === 'onlyTorrent') {
	            this.model.set({
	                enableUsenet      : false,
	                enableTorrent     : true,
	                preferredProtocol : 'torrent'
	            });
	        }
	
	        this._toggleControls();
	    },
	
	    _toggleControls : function() {
	        var enableUsenet = this.model.get('enableUsenet');
	        var enableTorrent = this.model.get('enableTorrent');
	        var preferred = this.model.get('preferredProtocol');
	
	        if (preferred === 'usenet') {
	            this.ui.protocol.val('preferUsenet');
	        }
	
	        else {
	            this.ui.protocol.val('preferTorrent');
	        }
	
	        if (enableUsenet) {
	            this.ui.usenetDelay.show();
	        }
	
	        else {
	            this.ui.protocol.val('onlyTorrent');
	            this.ui.usenetDelay.hide();
	        }
	
	        if (enableTorrent) {
	            this.ui.torrentDelay.show();
	        }
	
	        else {
	            this.ui.protocol.val('onlyUsenet');
	            this.ui.torrentDelay.hide();
	        }
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Profile/Delay/Delete/DelayProfileDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        var collection = this.model.collection;
	
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var DelayProfileModel = __webpack_require__(251);
	
	module.exports = Backbone.Collection.extend({
	    model : DelayProfileModel,
	    url   : window.NzbDrone.ApiRoot + '/delayprofile'
	});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var _ = __webpack_require__(8);
	var QualityDefinitionCollection = __webpack_require__(254);
	var QualityDefinitionCollectionView = __webpack_require__(256);
	
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/Quality/QualityLayoutTemplate',
	
	    regions : {
	        qualityDefinition : '#quality-definition',
	        matchesGrid : '#qd-matches-grid'
	    },
	
	
	    initialize : function(options) {
	        this.settings = options.settings;
	        this.qualityDefinitionCollection = new QualityDefinitionCollection();
	        this.qualityDefinitionCollection.fetch();
	
	    },
	
	    onShow : function() {
	        this.qualityDefinition.show(new QualityDefinitionCollectionView({ collection : this.qualityDefinitionCollection }));
	    }
	});


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var QualityDefinitionModel = __webpack_require__(255);
	
	module.exports = Backbone.Collection.extend({
	    model : QualityDefinitionModel,
	    url   : window.NzbDrone.ApiRoot + '/qualitydefinition'
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var ModelBase = __webpack_require__(198);
	
	module.exports = ModelBase.extend({
	    baseInitialize : ModelBase.prototype.initialize,
	
	    initialize : function() {
	        var name = this.get('title');
	
	        this.successMessage = 'Saved ' + name + ' quality settings';
	        this.errorMessage = 'Couldn\'t save ' + name + ' quality settings';
	
	        this.baseInitialize.call(this);
	    }
	});


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var QualityDefinitionItemView = __webpack_require__(257);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'Settings/Quality/Definition/QualityDefinitionCollectionTemplate',
	
	    itemViewContainer : '.x-rows',
	
	    itemView : QualityDefinitionItemView
	});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	__webpack_require__(258);
	var FormatHelpers = __webpack_require__(20);
	
	var view = Marionette.ItemView.extend({
			template  : 'Settings/Quality/Definition/QualityDefinitionItemViewTemplate',
			className : 'row',
	
			slider    : {
					min  : 0,
					max  : 400,
					step : 0.1
			},
	
			ui : {
					sizeSlider          : '.x-slider',
					thirtyMinuteMinSize : '.x-min-thirty',
					sixtyMinuteMinSize  : '.x-min-sixty',
					thirtyMinuteMaxSize : '.x-max-thirty',
					sixtyMinuteMaxSize  : '.x-max-sixty'
			},
	
			events : {
					'slide .x-slider' : '_updateSize',
	                'blur .x-max-thirty' : '_changeMaxThirty'
			},
	
			initialize : function(options) {
					this.profileCollection = options.profiles;
			},
	
			onRender : function() {
					if (this.model.get('quality').id === 0) {
							this.$el.addClass('row advanced-setting');
					}
	
					this.ui.sizeSlider.slider({
							range  : true,
							min    : this.slider.min,
							max    : this.slider.max,
							step   : this.slider.step,
							values : [
									this.model.get('minSize') || this.slider.min,
									this.model.get('maxSize') || this.slider.max
							]
					});
	
					this._changeSize();
			},
	
			_updateSize : function(event, ui) {
					var minSize = ui.values[0];
					var maxSize = ui.values[1];
	
					if (maxSize === this.slider.max) {
							maxSize = null;
					}
	
					this.model.set('minSize', minSize);
					this.model.set('maxSize', maxSize);
	
					this._changeSize();
			},
	
			_changeSize : function() {
					var minSize = this.model.get('minSize') || this.slider.min;
					var maxSize = this.model.get('maxSize') || null;
					{
							var minBytes = minSize * 1024 * 1024;
							var minThirty = FormatHelpers.bytes(minBytes * 90, 2);
							var minSixty = FormatHelpers.bytes(minBytes * 140, 2);
	
							this.ui.thirtyMinuteMinSize.html(minThirty);
							this.ui.sixtyMinuteMinSize.html(minSixty);
					}
	
					{
							if (maxSize === 0 || maxSize === null) {
									this.ui.thirtyMinuteMaxSize.val('Unlimited');
									this.ui.sixtyMinuteMaxSize.html('Unlimited');
							} else {
									var maxBytes = maxSize * 1024 * 1024;
									var maxThirty = FormatHelpers.bytes(maxBytes * 90, 2);
									var maxSixty = FormatHelpers.bytes(maxBytes * 140, 2);
	
									this.ui.thirtyMinuteMaxSize.val(maxThirty);
									this.ui.sixtyMinuteMaxSize.html(maxSixty);
							}
					}
			},
	
	        _changeMaxThirty : function() {
			        var input = this.ui.thirtyMinuteMaxSize.val();
			        var maxSize = parseFloat(input) || 0;
			        var mbPerMinute = maxSize / 90 * 1024;
			        if (mbPerMinute === 0)
	                {
	                    mbPerMinute = null;
	                }
			        this.model.set("maxSize", mbPerMinute);
			        var values = this.ui.sizeSlider.slider("option", "values");
			        values[1] = mbPerMinute || this.slider.max;
			        this.ui.sizeSlider.slider("option", "values", values);
			        this._changeSize();
	        }
	});
	
	view = AsModelBoundView.call(view);
	
	module.exports = view;


/***/ },
/* 258 */,
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var CustomFormatCollection = __webpack_require__(260);
	var TestLayout = __webpack_require__(262);
	var CollectionView = __webpack_require__(268);
	
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/CustomFormats/CustomFormatsLayout',
	
	    regions : {
	        indexers       : '#x-custom-formats-region',
	        test           : '#x-custom-formats-test'
	    },
	
	    initialize : function() {
	        this.indexersCollection = new CustomFormatCollection();
	        this.indexersCollection.fetch();
	    },
	
	    onShow : function() {
	        this.indexers.show(new CollectionView({ collection : this.indexersCollection }));
	        this.test.show(new TestLayout({ showLegend : true, autoTest : true }));
	    }
	});


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var IndexerModel = __webpack_require__(261);
	
	var vent = __webpack_require__(34);
	
	module.exports = Backbone.Collection.extend({
	    model : IndexerModel,
	    url   : window.NzbDrone.ApiRoot + '/customformat',
	    
	    sync : function(method, model, options) {
	        vent.trigger(vent.Events.CustomFormatsChanged, {method : method});
	
	        Backbone.Collection.prototype.sync.apply(this, arguments);
	    },
	
	    add : function(model, options) {
	        vent.trigger(vent.Events.CustomFormatsChanged, {options : options});
	
	        Backbone.Collection.prototype.add.apply(this, arguments);
	    },
	
	    remove : function(model, options) {
	        vent.trigger(vent.Events.CustomFormatsChanged, {options : options});
	
	        Backbone.Collection.prototype.remove.apply(this, arguments);
	    }
	});
	


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	var Messenger = __webpack_require__(52);
	var $ = __webpack_require__(1);
	
	
	module.exports = ProviderSettingsModelBase.extend({
	    test : function() {
	        var self = this;
	
	        this.trigger('validation:sync');
	
	        var params = {};
	
	        params.url = this.collection.url + '/test?title='+this.testCollection.title;
	        params.contentType = 'application/json';
	        params.data = JSON.stringify(this.toJSON());
	        params.type = 'POST';
	        params.isValidatedCall = true;
	
	        var promise = $.ajax(params);
	
	        Messenger.monitor({
	            promise        : promise,
	            successMessage : 'Testing \'{0}\' succeeded'.format(this.get('name')),
	            errorMessage   : 'Testing \'{0}\' failed'.format(this.get('name'))
	        });
	
	        promise.fail(function(response) {
	            self.trigger('validation:failed', response);
	        });
	
	        promise.done(function(response) {
	            console.warn(response);
	           self.testCollection.set(response, {parse:true});
	            self.testCollection.trigger('sync', self.testCollection, response);
	        });
	
	        return promise;
	    }
	});


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var Backbone = __webpack_require__(6);
	
	var CustomFormatTestCollection = __webpack_require__(263);
	var QualityCell = __webpack_require__(265);
	var MatchesCell = __webpack_require__(266);
	var MultipleFormatsCell = __webpack_require__(152);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/CustomFormats/CustomFormatTestLayout',
	
	    regions : {
	        matchesGrid : '#qd-matches-grid',
	        matchedFormats : '#matched-formats'
	    },
	
	    events : {
	        'change #test-title' : '_changeTestTitle'
	    },
	
	    ui : {
	        testTitle : '#test-title'
	    },
	
	    columns : [
	        {
	            name  : 'customFormat',
	            label : 'Custom Format',
	            cell  : QualityCell,
	        },
	        {
	            name : 'this',
	            label : 'Matches',
	            cell : MatchesCell
	        }
	    ],
	
	    initialize : function(options) {
	        this.options = options;
	        this.templateHelpers = this.options;
	        this.qualityDefinitionTestCollection = new CustomFormatTestCollection();
	        this.listenTo(this.qualityDefinitionTestCollection, 'sync', this._showTestResults);
	        this.throttledSearch = _.debounce(this.test, 300, { trailing : true }).bind(this);
	    },
	
	    onRender : function() {
	        var self = this;
	
	        this.qualityDefinitionTestCollection.title = this.ui.testTitle.val();
	
	        if (this.options.autoTest === true) {
	            this.test({title : this.ui.testTitle.val()});
	
	            this.ui.testTitle.keyup(function(e) {
	                if (_.contains([
	                        9,
	                        16,
	                        17,
	                        18,
	                        19,
	                        20,
	                        33,
	                        34,
	                        35,
	                        36,
	                        37,
	                        38,
	                        39,
	                        40,
	                        91,
	                        92,
	                        93
	                    ], e.keyCode)) {
	                    return;
	                }
	
	
	                self.throttledSearch({
	                    title : self.ui.testTitle.val()
	                });
	            });
	        }
	
	    },
	
	    test : function(options) {
	        var title = options.title || '';
	        this.qualityDefinitionTestCollection.fetch({
	            data : { title : title }
	        });
	    },
	
	    _showTestResults : function() {
	        var model = new Backbone.Model({
	            customFormats : this.qualityDefinitionTestCollection.matchedFormats
	        });
	
	        var cell = new MultipleFormatsCell({
	            column: {
	                name: 'this'
	            },
	            model: model
	        });
	
	        console.log(cell);
	
	        this.matchedFormats.show(cell);
	
	        this.matchesGrid.show(new Backgrid.Grid({
	            row        : Backgrid.Row,
	            columns    : this.columns,
	            collection : this.qualityDefinitionTestCollection,
	            className  : 'table table-hover'
	        }));
	    },
	
	    _changeTestTitle : function() {
	        this.qualityDefinitionTestCollection.title = this.ui.testTitle.val();
	    }
	
	});


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var PagableCollection = __webpack_require__(29);
	
	var _ = __webpack_require__(8);
	var QualityDefinitionModel = __webpack_require__(264);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PagableCollection.extend({
	    model : QualityDefinitionModel,
	    url   : window.NzbDrone.ApiRoot + '/customformat/test',
	    bestMatch : undefined,
	    parse: function(response) {
	        this.matchedFormats = response.matchedFormats;
	        console.warn("test");
	        return response.matches;
	    },
	
	    state : {
	        pageSize : 2000,
	        sortKey  : 'matches',
	        order    : 1
	    },
	
	    mode : 'client',
	
	    sortMappings : {
	        'matches' : {
	            sortValue : function(model) {
	                var matches = model.get("matches");
	                var weight = 0;
	                _.each(matches, function(value, key){
	                    if (value === true) {
	                        weight += 1;
	                    }
	                });
	                return weight;
	            }
	        }
	    }
	});
	
	var SortedCollection = AsSortedCollection.call(Collection);
	module.exports = SortedCollection;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leonardogalli on 13.02.18.
	 */
	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	var Messenger = __webpack_require__(52);
	
	module.exports = Backbone.Model.extend({
	    urlRoot : window.NzbDrone.ApiRoot + '/customformat/test'
	});


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var _ = __webpack_require__(8);
	
	module.exports = TemplatedCell.extend({
	    className : 'matches-cell',
	    template  : 'Cells/CustomFormatCell',
	    _orig     : TemplatedCell.prototype.initialize,
	
	    initialize : function() {
	        this._orig.apply(this, arguments);
	    }
	
	});


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var _ = __webpack_require__(8);
	__webpack_require__(267);
	
	module.exports = TemplatedCell.extend({
	    className : 'matches-cell',
	    template  : 'Settings/CustomFormats/MatchesCell'
	});


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(14);
	var _ = __webpack_require__(8);
	
	Handlebars.registerHelper('formatTagType', function(raw) {
	    var firstLetter = raw[0].toLowerCase();
	    var groupKey = "Unknown";
	    switch (firstLetter)
	    {
	        case "s":
	            groupKey = "Source";
	            break;
	        case "r":
	            groupKey = "Resolution";
	            break;
	        case "m":
	            groupKey = "Modifier";
	            break;
	        case "c":
	            groupKey = "Custom";
	            break;
	        case "l":
	            groupKey = "Language";
	            break;
	        case "i":
	            groupKey = "Indexer Flag";
	            break;
	        case "e":
	            groupKey = "Edition";
	            break;
	    }
	
	    return new Handlebars.SafeString(groupKey);
	});
	
	Handlebars.registerHelper('formatTagLabelClass', function(raw) {
	    var groupKey = Handlebars.helpers.formatTagType(raw).string.toLowerCase();
	
	    var labelClass = "default";
	
	    switch (groupKey)
	    {
	        case "custom":
	            labelClass = "warning";
	            break;
	        case "language":
	            labelClass = "success";
	            break;
	        case "edition":
	            labelClass = "info";
	            break;
	    }
	
	    return new Handlebars.SafeString(labelClass);
	});
	
	Handlebars.registerHelper('formatTag', function(raw) {
	    var ret = '';
	
	    var labelClass = Handlebars.helpers.formatTagLabelClass(raw);
	
	    var type = Handlebars.helpers.formatTagType(raw);
	
	    ret = "<span class='label label-{0}' title='{1}'>{2}</span>".format(labelClass, type, raw);
	
	    return new Handlebars.SafeString(ret);
	});
	
	Handlebars.registerHelper('infoLinkCreator', function(options) {
	    var wikiRoot = options.hash.wikiRoot;
	    var hash = options.hash.hash;
	    var hashPrefix = options.hash.hashPrefix || "";
	   return new Handlebars.SafeString("https://github.com/Radarr/Radarr/wiki/{0}#{1}{2}".format(wikiRoot, hashPrefix.toLowerCase().replace(/ /g, "-"), hash.toLowerCase().replace(/ /g, "-")));
	});


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ItemView = __webpack_require__(269);
	var SchemaModal = __webpack_require__(272);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ItemView,
	    itemViewContainer : '.indexer-list',
	    template          : 'Settings/CustomFormats/CustomFormatCollectionViewTemplate',
	
	    ui : {
	        'addCard' : '.x-add-card'
	    },
	
	    events : {
	        'click .x-add-card' : '_openSchemaModal'
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.addCard.parent('li').before(itemView.el);
	    },
	
	    _openSchemaModal : function() {
	        SchemaModal.open(this.collection);
	    }
	});


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(270);
	__webpack_require__(267);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/CustomFormats/CustomFormatItemViewTemplate',
	    tagName  : 'li',
	
	    events : {
	        'click' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(271);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(145);
	__webpack_require__(215);
	__webpack_require__(235);
	__webpack_require__(71);
	__webpack_require__(267);
	var Handlebars = __webpack_require__(14);
	var TestLayout = __webpack_require__(262);
	
	var view = Marionette.Layout.extend({
	    template : 'Settings/CustomFormats/Edit/CustomFormatEditViewTemplate',
	
	    ui: {
	        tags : '.x-tags'
	    },
	
	    events : {
	        'click .x-back'            : '_back'
	    },
	
	    regions : {
	        testArea : '#x-test-region'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onRender: function () {
	        this.ui.tags.tagsinput({
	            trimValue : true,
	            allowDuplicates: false,
	            tagClass : function(item) {
	                var cls = "label ";
	                var otherLabel = "label-" + Handlebars.helpers.formatTagLabelClass(item);
	                return cls + otherLabel;
	            }
	        });
	        var self = this;
	        _.each(this.model.get("formatTags"), function(item){
	            self.ui.tags.tagsinput('add', item);
	        });
	
	        this.testLayout = new TestLayout({ showLegend : false, autoTest : false });
	        this.testArea.show(this.testLayout);
	        this.model.testCollection = this.testLayout.qualityDefinitionTestCollection;
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _onAfterSaveAndAdd : function() {
	        this.targetCollection.add(this.model, { merge : true });
	
	        __webpack_require__(272).open(this.targetCollection);
	    },
	
	    _back : function() {
	        if (this.model.isNew()) {
	            this.model.destroy();
	        }
	
	        __webpack_require__(272).open(this.targetCollection);
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/CustomFormats/DeleteCustomFormatView',
	
	    ui: {
	        indicator : '.x-indicator',
	        delete : '.x-confirm-delete',
	        cancel : '.x-cancel-confirm'
	    },
	
	    events : {
	        'click .x-confirm-delete' : '_removeProfile'
	    },
	
	    _removeProfile : function() {
	        this.ui.indicator.show();
	        this.ui.delete.attr("disabled", "disabled");
	        this.ui.cancel.attr("disabled", "disabled");
	
	        var self = this;
	        this.model.destroy({ wait : true }).done(function() {
	            self.ui.indicator.hide();
	            vent.trigger(vent.Commands.CloseModalCommand);
	        });
	    }
	});


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var SchemaCollection = __webpack_require__(260);
	var AddCollectionView = __webpack_require__(273);
	
	module.exports = {
	    open : function(collection) {
	        var schemaCollection = new SchemaCollection();
	        var originalUrl = schemaCollection.url;
	        schemaCollection.url = schemaCollection.url + '/schema';
	        schemaCollection.fetch();
	        schemaCollection.url = originalUrl;
	
	        var groupedSchemaCollection = new Backbone.Collection();
	
	        schemaCollection.on('sync', function() {
	
	            var groups = schemaCollection.groupBy(function(model, iterator) {
	                return model.get('simplicity');
	            });
	            var modelCollection = _.map(groups, function(values, key, list) {
	                return {
	                    "header"   : key,
	                    collection : values
	                };
	            });
	
	            groupedSchemaCollection.reset(modelCollection);
	        });
	
	        var view = new AddCollectionView({
	            collection       : groupedSchemaCollection,
	            targetCollection : collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	};


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var ThingyAddCollectionView = __webpack_require__(274);
	var ThingyHeaderGroupView = __webpack_require__(275);
	var AddItemView = __webpack_require__(276);
	
	module.exports = ThingyAddCollectionView.extend({
	    itemView          : ThingyHeaderGroupView.extend({ itemView : AddItemView }),
	    itemViewContainer : '.add-indexer .items',
	    template          : 'Settings/CustomFormats/Add/CustomFormatAddCollectionViewTemplate'
	});


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    itemViewOptions : function() {
	        return {
	            targetCollection : this.targetCollection || this.options.targetCollection
	        };
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    itemViewContainer : '.item-list',
	    template          : 'Settings/ThingyHeaderGroupViewTemplate',
	    tagName           : 'div',
	
	    itemViewOptions : function() {
	        return {
	            targetCollection : this.targetCollection || this.options.targetCollection
	        };
	    },
	
	    initialize : function() {
	        this.collection = new Backbone.Collection(this.model.get('collection'));
	    }
	});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	__webpack_require__(267);
	var EditView = __webpack_require__(270);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/CustomFormats/Add/CustomFormatAddItemView',
	    tagName   : 'li',
	    className : 'add-thingy-item',
	
	    events : {
	        'click .x-preset' : '_addPreset',
	        'click'           : '_add'
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    _addPreset : function(e) {
	        var presetName = $(e.target).closest('.x-preset').attr('data-id');
	        var presetData = _.where(this.model.get('presets'), { name : presetName })[0];
	
	        this.model.set(presetData);
	
	        this._openEdit();
	    },
	
	    _add : function(e) {
	        if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
	            return;
	        }
	
	        this._openEdit();
	    },
	
	    _openEdit : function() {
	        this.model.set({
	            id           : undefined,
	            enableRss    : this.model.get('supportsRss'),
	            enableSearch : this.model.get('supportsSearch')
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    }
	});


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var IndexerCollection = __webpack_require__(278);
	var CollectionView = __webpack_require__(280);
	var OptionsView = __webpack_require__(287);
	var RestrictionCollection = __webpack_require__(288);
	var RestrictionCollectionView = __webpack_require__(290);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/Indexers/IndexerLayoutTemplate',
	
	    regions : {
	        indexers       : '#x-indexers-region',
	        indexerOptions : '#x-indexer-options-region',
	        restriction    : '#x-restriction-region'
	    },
	
	    initialize : function() {
	        this.indexersCollection = new IndexerCollection();
	        this.indexersCollection.fetch();
	
	        this.restrictionCollection = new RestrictionCollection();
	        this.restrictionCollection.fetch();
	    },
	
	    onShow : function() {
	        this.indexers.show(new CollectionView({ collection : this.indexersCollection }));
	        this.indexerOptions.show(new OptionsView({ model : this.model }));
	        this.restriction.show(new RestrictionCollectionView({ collection : this.restrictionCollection }));
	    }
	});

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var IndexerModel = __webpack_require__(279);
	
	module.exports = Backbone.Collection.extend({
	    model : IndexerModel,
	    url   : window.NzbDrone.ApiRoot + '/indexer',
	
	    comparator : function(left, right, collection) {
	        var result = 0;
	
	        if (left.get('protocol')) {
	            result = -left.get('protocol').localeCompare(right.get('protocol'));
	        }
	
	        if (result === 0 && left.get('name')) {
	            result = left.get('name').localeCompare(right.get('name'));
	        }
	
	        if (result === 0) {
	            result = left.get('implementation').localeCompare(right.get('implementation'));
	        }
	
	        return result;
	    }
	});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	
	module.exports = ProviderSettingsModelBase.extend({});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ItemView = __webpack_require__(281);
	var SchemaModal = __webpack_require__(284);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ItemView,
	    itemViewContainer : '.indexer-list',
	    template          : 'Settings/Indexers/IndexerCollectionViewTemplate',
	
	    ui : {
	        'addCard' : '.x-add-card'
	    },
	
	    events : {
	        'click .x-add-card' : '_openSchemaModal'
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.addCard.parent('li').before(itemView.el);
	    },
	
	    _openSchemaModal : function() {
	        SchemaModal.open(this.collection);
	    }
	});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(282);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/IndexerItemViewTemplate',
	    tagName  : 'li',
	
	    events : {
	        'click' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(283);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(145);
	__webpack_require__(215);
	__webpack_require__(235);
	__webpack_require__(71);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/Edit/IndexerEditViewTemplate',
	
	    ui: {
	        tags : '.x-form-tag'
	    },
	
	    events : {
	        'click .x-back'            : '_back',
	        'click .x-captcha-refresh' : '_onRefreshCaptcha'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onRender: function () {
	        this.ui.tags.tagInput({});
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _onAfterSaveAndAdd : function() {
	        this.targetCollection.add(this.model, { merge : true });
	
	        __webpack_require__(284).open(this.targetCollection);
	    },
	
	    _back : function() {
	        if (this.model.isNew()) {
	            this.model.destroy();
	        }
	
	        __webpack_require__(284).open(this.targetCollection);
	    },
	
	    _onRefreshCaptcha : function(event) {
	        var self = this;
	
	        var target = $(event.target).parents('.input-group');
	
	        this.ui.indicator.show();
	
	        this.model.requestAction("checkCaptcha")
	            .then(function(result) {
	                if (!result.captchaRequest) {
	                    self.model.setFieldValue('CaptchaToken', '');
	
	                    return result;
	                }
	
	                return self._showCaptcha(target, result.captchaRequest);
	            })
	            .always(function() {
	                self.ui.indicator.hide();
	            });
	    },
	
	    _showCaptcha : function(target, captchaRequest) {
	        var self = this;
	
	        var widget = $('<div class="g-recaptcha"></div>').insertAfter(target);
	
	        return this._loadRecaptchaWidget(widget[0], captchaRequest.siteKey, captchaRequest.secretToken)
	            .then(function(captchaResponse) {
	                target.parents('.form-group').removeAllErrors();
	                widget.remove();
	
	                var queryParams = {
	                    responseUrl    : captchaRequest.responseUrl,
	                    ray            : captchaRequest.ray,
	                    captchaResponse: captchaResponse
	                };
	
	                return self.model.requestAction("getCaptchaCookie", queryParams);
	            })
	            .then(function(response) {
	                self.model.setFieldValue('CaptchaToken', response.captchaToken);
	            });
	    },
	
	    _loadRecaptchaWidget : function(widget, sitekey, stoken) {
	        var promise = $.Deferred();
	
	        var renderWidget = function() {
	            window.grecaptcha.render(widget, {
	              'sitekey'  : sitekey,
	              'stoken'   : stoken,
	              'callback' : promise.resolve
	            });
	        };
	
	        if (window.grecaptcha) {
	            renderWidget();
	        } else {
	            window.grecaptchaLoadCallback = function() {
	                delete window.grecaptchaLoadCallback;
	                renderWidget();
	            };
	
	            $.getScript('https://www.google.com/recaptcha/api.js?onload=grecaptchaLoadCallback&render=explicit')
	             .fail(function() { promise.reject(); });
	        }
	
	        return promise;
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/Delete/IndexerDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var SchemaCollection = __webpack_require__(278);
	var AddCollectionView = __webpack_require__(285);
	
	module.exports = {
	    open : function(collection) {
	        var schemaCollection = new SchemaCollection();
	        var originalUrl = schemaCollection.url;
	        schemaCollection.url = schemaCollection.url + '/schema';
	        schemaCollection.fetch();
	        schemaCollection.url = originalUrl;
	
	        var groupedSchemaCollection = new Backbone.Collection();
	
	        schemaCollection.on('sync', function() {
	
	            var groups = schemaCollection.groupBy(function(model, iterator) {
	                return model.get('protocol');
	            });
	            var modelCollection = _.map(groups, function(values, key, list) {
	                return {
	                    "header"   : key,
	                    collection : values
	                };
	            });
	
	            groupedSchemaCollection.reset(modelCollection);
	        });
	
	        var view = new AddCollectionView({
	            collection       : groupedSchemaCollection,
	            targetCollection : collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	};

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var ThingyAddCollectionView = __webpack_require__(274);
	var ThingyHeaderGroupView = __webpack_require__(275);
	var AddItemView = __webpack_require__(286);
	
	module.exports = ThingyAddCollectionView.extend({
	    itemView          : ThingyHeaderGroupView.extend({ itemView : AddItemView }),
	    itemViewContainer : '.add-indexer .items',
	    template          : 'Settings/Indexers/Add/IndexerAddCollectionViewTemplate'
	});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(282);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/Indexers/Add/IndexerAddItemViewTemplate',
	    tagName   : 'li',
	    className : 'add-thingy-item',
	
	    events : {
	        'click .x-preset' : '_addPreset',
	        'click'           : '_add'
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    _addPreset : function(e) {
	        var presetName = $(e.target).closest('.x-preset').attr('data-id');
	        var presetData = _.where(this.model.get('presets'), { name : presetName })[0];
	
	        this.model.set(presetData);
	
	        this._openEdit();
	    },
	
	    _add : function(e) {
	        if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
	            return;
	        }
	
	        this._openEdit();
	    },
	
	    _openEdit : function() {
	        this.model.set({
	            id           : undefined,
	            enableRss    : this.model.get('supportsRss'),
	            enableSearch : this.model.get('supportsSearch')
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    }
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	__webpack_require__(235);
	__webpack_require__(71);
	__webpack_require__(238);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/Options/IndexerOptionsViewTemplate',
	
	    ui : {
	            hcwhitelist : '.x-hcwhitelist',
				leniencyTooltip : '.x-leniency-tooltip',
	        },
	
	    onRender : function() {
				this.ui.hcwhitelist.tagsinput({
						trimValue : true,
						allowDuplicates: true,
						tagClass  : 'label label-success'
				});
	
	            this.templateFunction = Marionette.TemplateCache.get('Settings/Indexers/Options/LeniencyTooltipTemplate');
	            var content = this.templateFunction();
	
	            this.ui.leniencyTooltip.popover({
	                content   : content,
	                html      : true,
	                trigger   : 'hover',
	                title     : 'Parsing Leniency Notes',
	                placement : 'right',
	                container : this.$el
	            });
			},
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var RestrictionModel = __webpack_require__(289);
	
	module.exports = Backbone.Collection.extend({
	    model : RestrictionModel,
	    url   : window.NzbDrone.ApiRoot + '/Restriction'
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var DeepModel = __webpack_require__(43);
	
	module.exports = DeepModel.extend({});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var RestrictionItemView = __webpack_require__(291);
	var EditView = __webpack_require__(292);
	__webpack_require__(294);
	__webpack_require__(71);
	
	module.exports = Marionette.CompositeView.extend({
	    template          : 'Settings/Indexers/Restriction/RestrictionCollectionViewTemplate',
	    itemViewContainer : '.x-rows',
	    itemView          : RestrictionItemView,
	
	    events : {
	        'click .x-add' : '_addMapping'
	    },
	
	    _addMapping : function() {
	        var model = this.collection.create({ tags : [] });
	        var view = new EditView({
	            model            : model,
	            targetCollection : this.collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(292);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/Indexers/Restriction/RestrictionItemViewTemplate',
	    className : 'row',
	
	    ui : {
	        tags : '.x-tags'
	    },
	
	    events : {
	        'click .x-edit' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(293);
	var CommandController = __webpack_require__(84);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(235);
	__webpack_require__(71);
	__webpack_require__(238);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/Restriction/RestrictionEditViewTemplate',
	
	    ui : {
	        required : '.x-required',
	        ignored  : '.x-ignored',
	        tags     : '.x-tags'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onRender : function() {
	        this.ui.required.tagsinput({
	            trimValue : true,
	            tagClass  : 'label label-success'
	        });
	
	        this.ui.ignored.tagsinput({
	            trimValue : true,
	            tagClass  : 'label label-danger'
	        });
	
	        this.ui.tags.tagInput({
	            model    : this.model,
	            property : 'tags'
	        });
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	module.exports = view;

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Indexers/Restriction/RestrictionDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Handlebars = __webpack_require__(14);
	var TagCollection = __webpack_require__(236);
	
	Handlebars.registerHelper('tagDisplay', function(tags) {
	    var tagLabels = _.map(TagCollection.filter(function(tag) {
	        return _.contains(tags, tag.get('id'));
	    }), function(tag) {
	        return '<span class="label label-info">{0}</span>'.format(tag.get('label'));
	    });
	
	    return new Handlebars.SafeString(tagLabels.join(' '));
	});
	
	Handlebars.registerHelper('genericTagDisplay', function(tags, classes) {
	    if (!tags) {
	        return new Handlebars.SafeString('');
	    }
	
	    var tagLabels = _.map(tags.split(','), function(tag) {
	        return '<span class="{0}">{1}</span>'.format(classes, tag);
	    });
	
	    return new Handlebars.SafeString(tagLabels.join(' '));
	});

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	
	module.exports = SettingsModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/indexer',
	    successMessage : 'Indexer settings saved',
	    errorMessage   : 'Failed to save indexer settings'
	});

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	
	module.exports = SettingsModelBase.extend({
			url            : window.NzbDrone.ApiRoot + '/config/netimport',
			successMessage : 'Net Import settings saved',
			errorMessage   : 'Failed to save net import settings'
	});


/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var NetImportModel = __webpack_require__(298);
	
	var ImportExclusionsCollection = Backbone.Collection.extend({
			model : NetImportModel,
			url   : window.NzbDrone.ApiRoot + '/exclusions',
	});
	
	module.exports = new ImportExclusionsCollection();


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Model.extend({
	    urlRoot : window.NzbDrone.ApiRoot + '/exclusions',
	
	});


/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var NetImportCollection = __webpack_require__(240);
	var CollectionView = __webpack_require__(300);
	var OptionsView = __webpack_require__(312);
	var RootFolderCollection = __webpack_require__(304);
	var ImportExclusionsCollection = __webpack_require__(297);
	var SelectAllCell = __webpack_require__(313);
	var DeleteExclusionCell = __webpack_require__(317);
	var ExclusionTitleCell = __webpack_require__(318);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	var $ = __webpack_require__(1);
	
	module.exports = Marionette.Layout.extend({
			template : 'Settings/NetImport/NetImportLayoutTemplate',
	
			regions : {
					lists       : '#x-lists-region',
					listOption : '#x-list-options-region',
					importExclusions : "#exclusions"
			},
	
			columns: [{
					name: '',
					cell: SelectAllCell,
					headerCell: 'select-all',
					sortable: false
			}, {
					name: 'tmdbId',
					label: 'TMDBID',
					cell: Backgrid.StringCell,
					sortable: false,
			}, {
					name: 'movieTitle',
					label: 'Title',
					cell: ExclusionTitleCell,
					cellValue: 'this',
			}, {
					name: 'this',
					label: '',
					cell: DeleteExclusionCell,
					sortable: false,
			}],
	
	
			initialize : function() {
					this.indexersCollection = new NetImportCollection();
					this.indexersCollection.fetch();
					RootFolderCollection.fetch().done(function() {
							RootFolderCollection.synced = true;
					});
					ImportExclusionsCollection.fetch().done(function() {
						ImportExclusionsCollection.synced = true;
					});
			},
	
			onShow : function() {
					this.listenTo(ImportExclusionsCollection, "sync", this._showExclusions);
					if (ImportExclusionsCollection.synced === true) {
						this._showExclusions();
					}
					this.lists.show(new CollectionView({ collection : this.indexersCollection }));
					this.listOption.show(new OptionsView({ model : this.model }));
			},
	
			_showExclusions : function() {
				this.exclusionGrid = new Backgrid.Grid({
						collection: ImportExclusionsCollection,
						columns: this.columns,
						className: 'table table-hover'
				});
				this.importExclusions.show(this.exclusionGrid);
			}
	});


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ItemView = __webpack_require__(301);
	var SchemaModal = __webpack_require__(309);
	
	module.exports = Marionette.CompositeView.extend({
			itemView          : ItemView,
			itemViewContainer : '.list-list',
			template          : 'Settings/NetImport/NetImportCollectionViewTemplate',
	
			ui : {
					'addCard' : '.x-add-card'
			},
	
			events : {
					'click .x-add-card' : '_openSchemaModal'
			},
	
			appendHtml : function(collectionView, itemView, index) {
					collectionView.ui.addCard.parent('li').before(itemView.el);
			},
	
			_openSchemaModal : function() {
					SchemaModal.open(this.collection);
			}
	});


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(302);
	
	module.exports = Marionette.ItemView.extend({
			template : 'Settings/NetImport/NetImportItemViewTemplate',
			tagName  : 'li',
	
			events : {
					'click' : '_edit'
			},
	
			initialize : function() {
					this.listenTo(this.model, 'sync', this.render);
			},
	
			_edit : function() {
					var view = new EditView({
							model            : this.model,
							targetCollection : this.model.collection
					});
					AppLayout.modalRegion.show(view);
			}
	});


/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(303);
	var Profiles = __webpack_require__(41);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	var RootFolders = __webpack_require__(304);
	var RootFolderLayout = __webpack_require__(306);
	var Config = __webpack_require__(33);
	__webpack_require__(145);
	__webpack_require__(215);
	__webpack_require__(71);
	
	var view = Marionette.ItemView.extend({
			template : 'Settings/NetImport/Edit/NetImportEditViewTemplate',
	
			ui : {
					profile         : '.x-profile',
					minimumAvailability : '.x-minimumavailability',
					rootFolder      : '.x-root-folder',
					tags            : '.x-tags'
				},
	
			events : {
					'click .x-back'            : '_back',
					'click .x-captcha-refresh' : '_onRefreshCaptcha',
					'change .x-root-folder'   : '_rootFolderChanged',
			},
	
			_deleteView : DeleteView,
	
			initialize : function(options) {
					this.targetCollection = options.targetCollection;
					this.templateHelpers = {};
	
					this._configureTemplateHelpers();
					this.listenTo(this.model, 'change', this.render);
					this.listenTo(RootFolders, 'all', this._rootFoldersUpdated);
			},
	
			onRender : function() {
					var rootFolder = this.model.get("rootFolderPath");
					if (rootFolder !== "") {
	                    this.ui.rootFolder.children().filter(function() {
	                        return $.trim($(this).text()) === rootFolder;
	                    }).prop('selected', true);
					} else {
						var defaultRoot = Config.getValue(Config.Keys.DefaultRootFolderId);
						if (RootFolders.get(defaultRoot)) {
								this.ui.rootFolder.val(defaultRoot);
						}
					}
					this.ui.tags.tagInput({
						model    : this.model,
						property : 'tags'
					});
			},
	
			_onBeforeSave : function() {
				var profile = parseInt(this.ui.profile.val(), 10);
				var minAvail = this.ui.minimumAvailability.val();
				var rootFolderPath = this.ui.rootFolder.children(':selected').text();
				this.model.set({
					profileId : profile,
					rootFolderPath : rootFolderPath,
					minimumAvailability : minAvail,
				});
			},
	
			_onAfterSave : function() {
					this.targetCollection.add(this.model, { merge : true });
					vent.trigger(vent.Commands.CloseModalCommand);
			},
	
			_onAfterSaveAndAdd : function() {
					this.targetCollection.add(this.model, { merge : true });
	
					__webpack_require__(309).open(this.targetCollection);
			},
	
			_back : function() {
					if (this.model.isNew()) {
							this.model.destroy();
					}
	
					__webpack_require__(309).open(this.targetCollection);
			},
	
			_configureTemplateHelpers : function() {
				this.templateHelpers.profiles = Profiles.toJSON();
				this.templateHelpers.rootFolders = RootFolders.toJSON();
			},
	
			_rootFolderChanged : function() {
				var rootFolderValue = this.ui.rootFolder.val();
				if (rootFolderValue === 'addNew') {
						var rootFolderLayout = new RootFolderLayout();
						this.listenToOnce(rootFolderLayout, 'folderSelected', this._setRootFolder);
						AppLayout.modalRegion.show(rootFolderLayout);
				} else {
						Config.setValue(Config.Keys.DefaultRootFolderId, rootFolderValue);
				}
			},
	
			_rootFoldersUpdated : function() {
					this._configureTemplateHelpers();
					this.render();
			},
	
			_onRefreshCaptcha : function(event) {
					var self = this;
	
					var target = $(event.target).parents('.input-group');
	
					this.ui.indicator.show();
	
					this.model.requestAction("checkCaptcha")
							.then(function(result) {
									if (!result.captchaRequest) {
											self.model.setFieldValue('CaptchaToken', '');
	
											return result;
									}
	
									return self._showCaptcha(target, result.captchaRequest);
							})
							.always(function() {
									self.ui.indicator.hide();
							});
			},
	
			_showCaptcha : function(target, captchaRequest) {
					var self = this;
	
					var widget = $('<div class="g-recaptcha"></div>').insertAfter(target);
	
					return this._loadRecaptchaWidget(widget[0], captchaRequest.siteKey, captchaRequest.secretToken)
							.then(function(captchaResponse) {
									target.parents('.form-group').removeAllErrors();
									widget.remove();
	
									var queryParams = {
											responseUrl    : captchaRequest.responseUrl,
											ray            : captchaRequest.ray,
											captchaResponse: captchaResponse
									};
	
									return self.model.requestAction("getCaptchaCookie", queryParams);
							})
							.then(function(response) {
									self.model.setFieldValue('CaptchaToken', response.captchaToken);
							});
			},
	
			_loadRecaptchaWidget : function(widget, sitekey, stoken) {
					var promise = $.Deferred();
	
					var renderWidget = function() {
							window.grecaptcha.render(widget, {
								'sitekey'  : sitekey,
								'stoken'   : stoken,
								'callback' : promise.resolve
							});
					};
	
					if (window.grecaptcha) {
							renderWidget();
					} else {
							window.grecaptchaLoadCallback = function() {
									delete window.grecaptchaLoadCallback;
									renderWidget();
							};
	
							$.getScript('https://www.google.com/recaptcha/api.js?onload=grecaptchaLoadCallback&render=explicit')
							 .fail(function() { promise.reject(); });
					}
	
					return promise;
			}
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/NetImport/Delete/NetImportDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});


/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var RootFolderModel = __webpack_require__(305);
	__webpack_require__(37);
	
	var RootFolderCollection = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/rootfolder',
	    model : RootFolderModel
	});
	
	module.exports = new RootFolderCollection();

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	    urlRoot  : window.NzbDrone.ApiRoot + '/rootfolder',
	    defaults : {
	        freeSpace : 0
	    }
	});

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var RootFolderCollectionView = __webpack_require__(307);
	var RootFolderCollection = __webpack_require__(304);
	var RootFolderModel = __webpack_require__(305);
	var LoadingView = __webpack_require__(120);
	var AsValidatedView = __webpack_require__(208);
	__webpack_require__(216);
	
	var Layout = Marionette.Layout.extend({
	    template : 'AddMovies/RootFolders/RootFolderLayoutTemplate',
	
	    ui : {
	        pathInput : '.x-path'
	    },
	
	    regions : {
	        currentDirs : '#current-dirs'
	    },
	
	    events : {
	        'click .x-add'          : '_addFolder',
	        'keydown .x-path input' : '_keydown'
	    },
	
	    initialize : function() {
	        this.collection = RootFolderCollection;
	        this.rootfolderListView = null;
	
	        
	    },
	
	    onShow : function() {
	        this.listenTo(RootFolderCollection, 'sync', this._showCurrentDirs);
	        this.currentDirs.show(new LoadingView());
	
	        if (RootFolderCollection.synced) {
	            this._showCurrentDirs();
	        }
	
	        this.ui.pathInput.fileBrowser();
	    },
	
	    _onFolderSelected : function(options) {
	        this.trigger('folderSelected', options);
	    },
	
	    _addFolder : function() {
	        var self = this;
	
	        var newDir = new RootFolderModel({
	            Path : this.ui.pathInput.val(),
	        });
	
	        this.bindToModelValidation(newDir);
	
	        newDir.save().done(function() {
	            RootFolderCollection.add(newDir);
	            self.trigger('folderSelected', { model : newDir });
	        });
	    },
	
	    _showCurrentDirs : function() {
	        if(!this.rootfolderListView)
	        {
	            this.rootfolderListView = new RootFolderCollectionView({ collection : RootFolderCollection });
	            this.currentDirs.show(this.rootfolderListView);
	            this.listenTo(this.rootfolderListView, 'itemview:folderSelected', this._onFolderSelected);
	        }
	    },
	
	    _keydown : function(e) {
	        if (e.keyCode !== 13) {
	            return;
	        }
	
	        this._addFolder();
	    }
	});
	
	var Layout = AsValidatedView.apply(Layout);
	
	module.exports = Layout;

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var RootFolderItemView = __webpack_require__(308);
	
	module.exports = Marionette.CompositeView.extend({
	    template          : 'AddMovies/RootFolders/RootFolderCollectionViewTemplate',
	    itemViewContainer : '.x-root-folders',
	    itemView          : RootFolderItemView
	});

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'AddMovies/RootFolders/RootFolderItemViewTemplate',
	    className : 'recent-folder',
	    tagName   : 'tr',
	
	    initialize : function() {
	        this.listenTo(this.model, 'change', this.render);
	    },
	
	    events : {
	        'click .x-delete' : 'removeFolder',
	        'click .x-folder' : 'folderSelected'
	    },
	
	    removeFolder : function() {
	        var self = this;
	
	        this.model.destroy().success(function() {
	            self.close();
	        });
	    },
	
	    folderSelected : function() {
	        this.trigger('folderSelected', this.model);
	    }
	});

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var SchemaCollection = __webpack_require__(240);
	var AddCollectionView = __webpack_require__(310);
	
	module.exports = {
			open : function(collection) {
					var schemaCollection = new SchemaCollection();
					var originalUrl = schemaCollection.url;
					schemaCollection.url = schemaCollection.url + '/schema';
					schemaCollection.fetch();
					schemaCollection.url = originalUrl;
	
					var groupedSchemaCollection = new Backbone.Collection();
	
					schemaCollection.on('sync', function() {
	
							var groups = schemaCollection.groupBy(function(model, iterator) {
									return model.get('protocol');
							});
							//key is "undefined", which is being placed in the header
							var modelCollection = _.map(groups, function(values, key, list) {
									return {
											//"header"   : key,
											collection : values
									};
							});
	
							groupedSchemaCollection.reset(modelCollection);
					});
	
					var view = new AddCollectionView({
							collection       : groupedSchemaCollection,
							targetCollection : collection
					});
	
					AppLayout.modalRegion.show(view);
			}
	};


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var ThingyAddCollectionView = __webpack_require__(274);
	var ThingyHeaderGroupView = __webpack_require__(275);
	var AddItemView = __webpack_require__(311);
	
	module.exports = ThingyAddCollectionView.extend({
			itemView          : ThingyHeaderGroupView.extend({ itemView : AddItemView }),
			itemViewContainer : '.add-indexer .items',
			template          : 'Settings/NetImport/Add/NetImportAddCollectionViewTemplate'
	});


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(302);
	
	module.exports = Marionette.ItemView.extend({
			template  : 'Settings/NetImport/Add/NetImportAddItemViewTemplate',
			tagName   : 'li',
			className : 'add-thingy-item',
	
			events : {
					'click .x-preset' : '_addPreset',
					'click'           : '_add'
			},
	
			initialize : function(options) {
					this.targetCollection = options.targetCollection;
			},
	
			_addPreset : function(e) {
					var presetName = $(e.target).closest('.x-preset').attr('data-id');
					var presetData = _.where(this.model.get('presets'), { name : presetName })[0];
	
					this.model.set(presetData);
	
					this._openEdit();
			},
	
			_add : function(e) {
					if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
							return;
					}
	
					this._openEdit();
			},
	
			_openEdit : function() {
					this.model.set({
							id           : undefined,
							enableAuto    : this.model.get('enableAuto')
					});
	
					var editView = new EditView({
							model            : this.model,
							targetCollection : this.targetCollection
					});
	
					AppLayout.modalRegion.show(editView);
			}
	});


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var ImportExclusionsCollection = __webpack_require__(297);
	var SelectAllCell = __webpack_require__(313);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	var $ = __webpack_require__(1);
	__webpack_require__(235);
	__webpack_require__(71);
	__webpack_require__(238);
	
	var Config = __webpack_require__(33);
	
	
	//if ('searchParams' in HTMLAnchorElement.prototype) {
	//	var URLSearchParams = require('url-search-params-polyfill');
	//}
	
	var URLSearchParams = __webpack_require__(316);
	
	var view = Marionette.ItemView.extend({
		template : 'Settings/NetImport/Options/NetImportOptionsViewTemplate',
		events : {
			'click .x-reset-trakt-tokens' : '_resetTraktTokens',
			'click .x-revoke-trakt-tokens' : '_revokeTraktTokens'
		},
	
	  initialize : function() {
	
		},
	
		onShow : function() {
			var params = new URLSearchParams(window.location.search);
	                var oauth = params.get('access');
			var refresh=params.get('refresh');
			if (oauth && refresh){
				//var callback_url = window.location.href;
				history.pushState('object', 'title', (window.location.href).replace(window.location.search, '')); // jshint ignore:line
		        this.ui.authToken.val(oauth).trigger('change');
				this.ui.refreshToken.val(refresh).trigger('change');
				//Config.setValue("traktAuthToken", oauth);
				//Config.setValue("traktRefreshToken", refresh);
				var tokenExpiry = Math.floor(Date.now() / 1000) + 4838400;
				this.ui.tokenExpiry.val(tokenExpiry).trigger('change');  // this means the token will expire in 8 weeks (4838400 seconds)
				//Config.setValue("traktTokenExpiry",tokenExpiry);
				//this.model.isSaved = false;
		        //window.alert("Trakt Authentication Complete - Click Save to make the change take effect");
			}
			if (this.ui.authToken.val() && this.ui.refreshToken.val()){
	      this.ui.resetTokensButton.hide();
				this.ui.revokeTokensButton.show();
			} else {
				this.ui.resetTokensButton.show();
				this.ui.revokeTokensButton.hide();
			}
	
	
	
		},
	
		onRender : function() {
	
	  },
	
		ui : {
			resetTraktTokens : '.x-reset-trakt-tokens',
			authToken : '.x-trakt-auth-token',
			refreshToken : '.x-trakt-refresh-token',
			resetTokensButton : '.x-reset-trakt-tokens',
			revokeTokensButton : '.x-revoke-trakt-tokens',
	    tokenExpiry : '.x-trakt-token-expiry',
			importExclusions : '.x-import-exclusions'
		},
	
		_resetTraktTokens : function() {
			if (window.confirm("Proceed to trakt.tv for authentication?\nYou will then be redirected back here.")){
			window.location='http://radarr.aeonlucid.com/v1/trakt/redirect?target='+window.location.href;
			//this.ui.resetTokensButton.hide();
			}
		},
	
		_revokeTraktTokens : function() {
			if (window.confirm("Log out of trakt.tv?")){
	          //TODO: need to implement this: http://docs.trakt.apiary.io/#reference/authentication-oauth/revoke-token/revoke-an-access_token
		        this.ui.authToken.val('').trigger('change');
						this.ui.refreshToken.val('').trigger('change');
						this.ui.tokenExpiry.val(0).trigger('change');
		        this.ui.resetTokensButton.show();
						this.ui.revokeTokensButton.hide();
						window.alert("Logged out of Trakt.tv - Click Save to make the change take effect");
			}
		},
	
	});
	
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;


/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var BackgridSelectAll = __webpack_require__(314);
	
	module.exports = BackgridSelectAll.extend({
	    enterEditMode : function(e) {
	        var collection = this.column.get('sortedCollection') || this.model.collection;
	
	        if (e.shiftKey && collection.lastToggled) {
	            this._selectRange(collection);
	        }
	
	        var checked = $(e.target).prop('checked');
	
	        collection.lastToggled = this.model;
	        collection.checked = checked;
	    },
	
	    onChange : function(e) {
	        var checked = $(e.target).prop('checked');
	        this.$el.parent().toggleClass('selected', checked);
	        this.model.trigger('backgrid:selected', this.model, checked);
	    },
	
	    _selectRange : function(collection) {
	        var lastToggled = collection.lastToggled;
	        var checked = collection.checked;
	
	        var currentIndex = collection.indexOf(this.model);
	        var lastIndex = collection.indexOf(lastToggled);
	
	        var low = Math.min(currentIndex, lastIndex);
	        var high = Math.max(currentIndex, lastIndex);
	        var range = _.range(low + 1, high);
	
	        _.each(range, function(index) {
	            var model = collection.at(index);
	
	            model.trigger('backgrid:select', model, checked);
	        });
	
	        collection.lastToggled = undefined;
	        collection.checked = undefined;
	    }
	});

/***/ },
/* 314 */,
/* 315 */,
/* 316 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	Copyright (C) 2015 by WebReflection
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	*/
	'use strict';
	
	function encode(str) {
	  return encodeURIComponent(str).replace(find, replacer);
	}
	
	function decode(str) {
	  return decodeURIComponent(str.replace(plus, ' '));
	}
	
	function URLSearchParams(query) {
	  this[secret] = Object.create(null);
	  if (!query) return;
	  if (query.charAt(0) === '?') {
	    query = query.slice(1);
	  }
	  for (var
	    index, value,
	    pairs = (query || '').split('&'),
	    i = 0,
	    length = pairs.length; i < length; i++
	  ) {
	    value = pairs[i];
	    index = value.indexOf('=');
	    if (-1 < index) {
	      this.append(
	        decode(value.slice(0, index)),
	        decode(value.slice(index + 1))
	      );
	    } else if (value.length){
	      this.append(
	        decode(value),
	        ''
	      );
	    }
	  }
	}
	
	var
	  URLSearchParamsProto = URLSearchParams.prototype,
	  find = /[!'\(\)~]|%20|%00/g,
	  plus = /\+/g,
	  replace = {
	    '!': '%21',
	    "'": '%27',
	    '(': '%28',
	    ')': '%29',
	    '~': '%7E',
	    '%20': '+',
	    '%00': '\x00'
	  },
	  replacer = function (match) {
	    return replace[match];
	  },
	  iterable = isIterable(),
	  secret = '__URLSearchParams__:' + Math.random()
	;
	
	function isIterable() {
	  try {
	    return !!Symbol.iterator;
	  } catch(error) {
	    return false;
	  }
	}
	
	URLSearchParamsProto.append = function append(name, value) {
	  var dict = this[secret];
	  if (name in dict) {
	    dict[name].push('' + value);
	  } else {
	    dict[name] = ['' + value];
	  }
	};
	
	URLSearchParamsProto.delete = function del(name) {
	  delete this[secret][name];
	};
	
	URLSearchParamsProto.get = function get(name) {
	  var dict = this[secret];
	  return name in dict ? dict[name][0] : null;
	};
	
	URLSearchParamsProto.getAll = function getAll(name) {
	  var dict = this[secret];
	  return name in dict ? dict[name].slice(0) : [];
	};
	
	URLSearchParamsProto.has = function has(name) {
	  return name in this[secret];
	};
	
	URLSearchParamsProto.set = function set(name, value) {
	  this[secret][name] = ['' + value];
	};
	
	URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
	  var dict = this[secret];
	  Object.getOwnPropertyNames(dict).forEach(function(name) {
	    dict[name].forEach(function(value) {
	      callback.call(thisArg, value, name, this);
	    }, this);
	  }, this);
	};
	
	URLSearchParamsProto.keys = function keys() {
	  var items = [];
	  this.forEach(function(value, name) { items.push(name); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	URLSearchParamsProto.values = function values() {
	  var items = [];
	  this.forEach(function(value) { items.push(value); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	URLSearchParamsProto.entries = function entries() {
	  var items = [];
	  this.forEach(function(value, name) { items.push([name, value]); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	if (iterable) {
	  URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
	}
	
	/*
	URLSearchParamsProto.toBody = function() {
	  return new Blob(
	    [this.toString()],
	    {type: 'application/x-www-form-urlencoded'}
	  );
	};
	*/
	
	URLSearchParamsProto.toJSON = function toJSON() {
	  return {};
	};
	
	URLSearchParamsProto.toString = function toString() {
	  var dict = this[secret], query = [], i, key, name, value;
	  for (key in dict) {
	    name = encode(key);
	    for (
	      i = 0,
	      value = dict[key];
	      i < value.length; i++
	    ) {
	      query.push(name + '=' + encode(value[i]));
	    }
	  }
	  return query.join('&');
	};
	
	module.exports = global.URLSearchParams || URLSearchParams;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'delete-episode-file-cell',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i class="icon-radarr-delete" title="Delete exclusion."></i>');
	
	        return this;
	    },
	
	    _onClick : function() {
	        var self = this;
	
	            this.model.destroy();
	
	    }
	});


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'exclusion-title-cell',
	
	    render : function() {
	        this.$el.empty();
	        var title = this.model.get("movieTitle");
	        var year = this.model.get("movieYear");
	        var str = title;
	        if (year > 1800) {
	          str += " ("+year+")";
	        }
	        this.$el.html(str);
	
	        return this;
	    }
	});


/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var DownloadClientCollection = __webpack_require__(320);
	var DownloadClientCollectionView = __webpack_require__(322);
	var DownloadHandlingView = __webpack_require__(329);
	var DroneFactoryView = __webpack_require__(330);
	var RemotePathMappingCollection = __webpack_require__(331);
	var RemotePathMappingCollectionView = __webpack_require__(333);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/DownloadClient/DownloadClientLayoutTemplate',
	
	    regions : {
	        downloadClients    : '#x-download-clients-region',
	        downloadHandling   : '#x-download-handling-region',
	        droneFactory       : '#x-dronefactory-region',
	        remotePathMappings : '#x-remotepath-mapping-region'
	    },
	
	    initialize : function() {
	        this.downloadClientsCollection = new DownloadClientCollection();
	        this.downloadClientsCollection.fetch();
	        this.remotePathMappingCollection = new RemotePathMappingCollection();
	        this.remotePathMappingCollection.fetch();
	    },
	
	    onShow : function() {
	        this.downloadClients.show(new DownloadClientCollectionView({ collection : this.downloadClientsCollection }));
	        this.downloadHandling.show(new DownloadHandlingView({ model : this.model }));
	        this.droneFactory.show(new DroneFactoryView({ model : this.model }));
	        this.remotePathMappings.show(new RemotePathMappingCollectionView({ collection : this.remotePathMappingCollection }));
	    }
	});

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var DownloadClientModel = __webpack_require__(321);
	
	module.exports = Backbone.Collection.extend({
	    model : DownloadClientModel,
	    url   : window.NzbDrone.ApiRoot + '/downloadclient',
	
	    comparator : function(left, right, collection) {
	        var result = 0;
	
	        if (left.get('protocol')) {
	            result = -left.get('protocol').localeCompare(right.get('protocol'));
	        }
	
	        if (result === 0 && left.get('name')) {
	            result = left.get('name').localeCompare(right.get('name'));
	        }
	
	        if (result === 0) {
	            result = left.get('implementation').localeCompare(right.get('implementation'));
	        }
	
	        return result;
	    }
	});

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	
	module.exports = ProviderSettingsModelBase.extend({});

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ItemView = __webpack_require__(323);
	var SchemaModal = __webpack_require__(326);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ItemView,
	    itemViewContainer : '.download-client-list',
	    template          : 'Settings/DownloadClient/DownloadClientCollectionViewTemplate',
	
	    ui : {
	        'addCard' : '.x-add-card'
	    },
	
	    events : {
	        'click .x-add-card' : '_openSchemaModal'
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.addCard.parent('li').before(itemView.el);
	    },
	
	    _openSchemaModal : function() {
	        SchemaModal.open(this.collection);
	    }
	});

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(324);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/DownloadClientItemViewTemplate',
	    tagName  : 'li',
	
	    events : {
	        'click' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(325);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(145);
	__webpack_require__(216);
	__webpack_require__(71);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/Edit/DownloadClientEditViewTemplate',
	
	    ui : {
	        path      : '.x-path',
	        modalBody : '.modal-body'
	    },
	
	    events : {
	        'click .x-back' : '_back'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onShow : function() {
	        if (this.ui.path.length > 0) {
	            this.ui.modalBody.addClass('modal-overflow');
	        }
	
	        this.ui.path.fileBrowser();
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _onAfterSaveAndAdd : function() {
	        this.targetCollection.add(this.model, { merge : true });
	
	        __webpack_require__(326).open(this.targetCollection);
	    },
	    _back              : function() {
	        __webpack_require__(326).open(this.targetCollection);
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/Delete/DownloadClientDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var SchemaCollection = __webpack_require__(320);
	var AddCollectionView = __webpack_require__(327);
	
	module.exports = {
	    open : function(collection) {
	        var schemaCollection = new SchemaCollection();
	        var originalUrl = schemaCollection.url;
	        schemaCollection.url = schemaCollection.url + '/schema';
	        schemaCollection.fetch();
	        schemaCollection.url = originalUrl;
	
	        var groupedSchemaCollection = new Backbone.Collection();
	
	        schemaCollection.on('sync', function() {
	
	            var groups = schemaCollection.groupBy(function(model, iterator) {
	                return model.get('protocol');
	            });
	            var modelCollection = _.map(groups, function(values, key, list) {
	                return {
	                    'header'   : key,
	                    collection : values
	                };
	            });
	
	            groupedSchemaCollection.reset(modelCollection);
	        });
	
	        var view = new AddCollectionView({
	            collection       : groupedSchemaCollection,
	            targetCollection : collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	};

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var ThingyAddCollectionView = __webpack_require__(274);
	var ThingyHeaderGroupView = __webpack_require__(275);
	var AddItemView = __webpack_require__(328);
	
	module.exports = ThingyAddCollectionView.extend({
	    itemView          : ThingyHeaderGroupView.extend({ itemView : AddItemView }),
	    itemViewContainer : '.add-download-client .items',
	    template          : 'Settings/DownloadClient/Add/DownloadClientAddCollectionViewTemplate'
	});

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(324);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/DownloadClient/Add/DownloadClientAddItemViewTemplate',
	    tagName   : 'li',
	    className : 'add-thingy-item',
	
	    events : {
	        'click .x-preset' : '_addPreset',
	        'click'           : '_add'
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    _addPreset : function(e) {
	        var presetName = $(e.target).closest('.x-preset').attr('data-id');
	
	        var presetData = _.where(this.model.get('presets'), { name : presetName })[0];
	
	        this.model.set(presetData);
	
	        this.model.set({
	            id     : undefined,
	            enable : true
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    },
	
	    _add : function(e) {
	        if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
	            return;
	        }
	
	        this.model.set({
	            id     : undefined,
	            enable : true
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    }
	});

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/DownloadHandling/DownloadHandlingViewTemplate',
	
	    ui : {
	        completedDownloadHandlingCheckbox : '.x-completed-download-handling',
	        completedDownloadOptions          : '.x-completed-download-options',
	        failedAutoRedownladCheckbox       : '.x-failed-auto-redownload',
	        failedDownloadOptions             : '.x-failed-download-options'
	    },
	
	    events : {
	        'change .x-completed-download-handling' : '_setCompletedDownloadOptionsVisibility',
	        'change .x-failed-auto-redownload'      : '_setFailedDownloadOptionsVisibility'
	    },
	
	    onRender : function() {
	        if (!this.ui.completedDownloadHandlingCheckbox.prop('checked')) {
	            this.ui.completedDownloadOptions.hide();
	        }
	        if (!this.ui.failedAutoRedownladCheckbox.prop('checked')) {
	            this.ui.failedDownloadOptions.hide();
	        }
	    },
	
	    _setCompletedDownloadOptionsVisibility : function() {
	        var checked = this.ui.completedDownloadHandlingCheckbox.prop('checked');
	        if (checked) {
	            this.ui.completedDownloadOptions.slideDown();
	        } else {
	            this.ui.completedDownloadOptions.slideUp();
	        }
	    },
	
	    _setFailedDownloadOptionsVisibility : function() {
	        var checked = this.ui.failedAutoRedownladCheckbox.prop('checked');
	        if (checked) {
	            this.ui.failedDownloadOptions.slideDown();
	        } else {
	            this.ui.failedDownloadOptions.slideUp();
	        }
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	module.exports = view;

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	__webpack_require__(216);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/DroneFactory/DroneFactoryViewTemplate',
	
	    ui : {
	        droneFactory : '.x-path'
	    },
	
	    onShow : function() {
	        this.ui.droneFactory.fileBrowser();
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var RemotePathMappingModel = __webpack_require__(332);
	
	module.exports = Backbone.Collection.extend({
	    model : RemotePathMappingModel,
	    url   : window.NzbDrone.ApiRoot + '/remotePathMapping'
	});

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var DeepModel = __webpack_require__(43);
	
	module.exports = DeepModel.extend({});

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var RemotePathMappingItemView = __webpack_require__(334);
	var EditView = __webpack_require__(335);
	var RemotePathMappingModel = __webpack_require__(332);
	__webpack_require__(71);
	
	module.exports = Marionette.CompositeView.extend({
	    template          : 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingCollectionViewTemplate',
	    itemViewContainer : '.x-rows',
	    itemView          : RemotePathMappingItemView,
	
	    events : {
	        'click .x-add' : '_addMapping'
	    },
	
	    _addMapping : function() {
	        var model = new RemotePathMappingModel();
	        model.collection = this.collection;
	
	        var view = new EditView({
	            model            : model,
	            targetCollection : this.collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(335);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingItemViewTemplate',
	    className : 'row',
	
	    events : {
	        'click .x-edit' : '_editMapping'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _editMapping : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(336);
	var CommandController = __webpack_require__(84);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(216);
	__webpack_require__(71);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingEditViewTemplate',
	
	    ui : {
	        path      : '.x-path',
	        modalBody : '.modal-body'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onShow : function() {
	        if (this.ui.path.length > 0) {
	            this.ui.modalBody.addClass('modal-overflow');
	        }
	
	        this.ui.path.fileBrowser();
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingDeleteViewTemplate',
	
	    events : {
	        'click .x-confirm-delete' : '_delete'
	    },
	
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	
	module.exports = SettingsModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/downloadclient',
	    successMessage : 'Download client settings saved',
	    errorMessage   : 'Failed to save download client settings'
	});

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ItemView = __webpack_require__(339);
	var SchemaModal = __webpack_require__(342);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : ItemView,
	    itemViewContainer : '.notification-list',
	    template          : 'Settings/Notifications/NotificationCollectionViewTemplate',
	
	    ui : {
	        'addCard' : '.x-add-card'
	    },
	
	    events : {
	        'click .x-add-card' : '_openSchemaModal'
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.addCard.parent('li').before(itemView.el);
	    },
	
	    _openSchemaModal : function() {
	        SchemaModal.open(this.collection);
	    }
	});

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(340);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Notifications/NotificationItemViewTemplate',
	    tagName  : 'li',
	
	    events : {
	        'click' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({
	            model            : this.model,
	            targetCollection : this.model.collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	});

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var DeleteView = __webpack_require__(341);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(145);
	__webpack_require__(235);
	__webpack_require__(216);
	__webpack_require__(238);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Notifications/Edit/NotificationEditViewTemplate',
	
	    ui : {
	        onDownloadToggle             : '.x-on-download',
	        onUpgradeSection             : '.x-on-upgrade',
	        tags                         : '.x-tags',
	        modalBody                    : '.x-modal-body',
	        formTag                      : '.x-form-tag',
	        path                         : '.x-path',
	        authorizedNotificationButton : '.AuthorizeNotification'
	    },
	
	    events : {
	        'click .x-back'         : '_back',
	        'change .x-on-download' : '_onDownloadChanged',
	        'click .AuthorizeNotification' : '_onAuthorizeNotification'
	    },
	
	    _deleteView : DeleteView,
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    onRender : function() {
	        this._onDownloadChanged();
	
	        this.ui.tags.tagInput({
	            model    : this.model,
	            property : 'tags'
	        });
	
	        this.ui.formTag.tagsinput({
	            trimValue : true,
	            tagClass  : 'label label-default'
	        });
	    },
	
	    onShow : function() {
	        if (this.ui.path.length > 0) {
	            this.ui.modalBody.addClass('modal-overflow');
	        }
	
	        this.ui.path.fileBrowser();
	    },
	
	    _onAfterSave : function() {
	        this.targetCollection.add(this.model, { merge : true });
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _onAfterSaveAndAdd : function() {
	        this.targetCollection.add(this.model, { merge : true });
	
	        __webpack_require__(342).open(this.targetCollection);
	    },
	
	    _back : function() {
	        if (this.model.isNew()) {
	            this.model.destroy();
	        }
	
	        __webpack_require__(342).open(this.targetCollection);
	    },
	
	    _onDownloadChanged : function() {
	        var checked = this.ui.onDownloadToggle.prop('checked');
	
	        if (checked) {
	            this.ui.onUpgradeSection.show();
	        } else {
	            this.ui.onUpgradeSection.hide();
	        }
	    },
	
	    _onAuthorizeNotification : function() {
	        this.ui.indicator.show();
	
	        var self = this;
	        var callbackUrl = window.location.origin + window.NzbDrone.UrlBase + '/oauth.html';
	
	        var promise = this.model.requestAction('startOAuth', { callbackUrl: callbackUrl })
	            .then(function(response) {
	                return self._showOAuthWindow(response.oauthUrl);
	            })
	            .then(function(responseQueryParams) {
	                return self.model.requestAction('getOAuthToken', responseQueryParams);
	            })
	            .then(function(response) {
	                self.model.setFieldValue('AccessToken', response.accessToken);
	                self.model.setFieldValue('AccessTokenSecret', response.accessTokenSecret);
	            });
	            
	        promise.always(function() {
	                self.ui.indicator.hide();
	            });
	    },
	    
	    _showOAuthWindow : function(oauthUrl) {
	        var promise = $.Deferred();
	    
	        window.open(oauthUrl);
	        var selfWindow = window;
	        selfWindow.onCompleteOauth = function(query, callback) {
	            delete selfWindow.onCompleteOauth;
	
	            var queryParams = {};
	            var splitQuery = query.substring(1).split('&');
	            _.each(splitQuery, function (param) {
	                var paramSplit = param.split('=');
	                queryParams[paramSplit[0]] = paramSplit[1];
	            });
	
	            callback();
	
	            promise.resolve(queryParams);
	        };
	        
	        return promise;
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Settings/Notifications/Delete/NotificationDeleteViewTemplate',
	
	    events  : {
	        'click .x-confirm-delete' : '_delete'
	    },
	    _delete : function() {
	        this.model.destroy({
	            wait    : true,
	            success : function() {
	                vent.trigger(vent.Commands.CloseModalCommand);
	            }
	        });
	    }
	});

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var SchemaCollection = __webpack_require__(343);
	var AddCollectionView = __webpack_require__(345);
	
	module.exports = {
	    open : function(collection) {
	        var schemaCollection = new SchemaCollection();
	        var originalUrl = schemaCollection.url;
	        schemaCollection.url = schemaCollection.url + '/schema';
	        schemaCollection.fetch();
	        schemaCollection.url = originalUrl;
	        var view = new AddCollectionView({
	            collection       : schemaCollection,
	            targetCollection : collection
	        });
	        AppLayout.modalRegion.show(view);
	    }
	};

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var NotificationModel = __webpack_require__(344);
	
	module.exports = Backbone.Collection.extend({
	    model : NotificationModel,
	    url   : window.NzbDrone.ApiRoot + '/notification'
	});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	
	module.exports = ProviderSettingsModelBase.extend({});

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var ThingyAddCollectionView = __webpack_require__(274);
	var AddItemView = __webpack_require__(346);
	
	module.exports = ThingyAddCollectionView.extend({
	    itemView          : AddItemView,
	    itemViewContainer : '.add-notifications .items',
	    template          : 'Settings/Notifications/Add/NotificationAddCollectionViewTemplate'
	});

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(340);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'Settings/Notifications/Add/NotificationAddItemViewTemplate',
	    tagName   : 'li',
	    className : 'add-thingy-item',
	
	    events : {
	        'click .x-preset' : '_addPreset',
	        'click'           : '_add'
	    },
	
	    initialize : function(options) {
	        this.targetCollection = options.targetCollection;
	    },
	
	    _addPreset : function(e) {
	        var presetName = $(e.target).closest('.x-preset').attr('data-id');
	
	        var presetData = _.where(this.model.get('presets'), { name : presetName })[0];
	
	        this.model.set(presetData);
	
	        this.model.set({
	            id         : undefined,
	            onGrab     : this.model.get('supportsOnGrab'),
	            onDownload : this.model.get('supportsOnDownload'),
	            onUpgrade  : this.model.get('supportsOnUpgrade'),
	            onRename   : this.model.get('supportsOnRename')
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    },
	
	    _add : function(e) {
	        if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
	            return;
	        }
	
	        this.model.set({
	            id         : undefined,
	            onGrab     : this.model.get('supportsOnGrab'),
	            onDownload : this.model.get('supportsOnDownload'),
	            onUpgrade  : this.model.get('supportsOnUpgrade'),
	            onRename   : this.model.get('supportsOnRename')
	        });
	
	        var editView = new EditView({
	            model            : this.model,
	            targetCollection : this.targetCollection
	        });
	
	        AppLayout.modalRegion.show(editView);
	    }
	});

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var MetadataCollection = __webpack_require__(348);
	var MetadataCollectionView = __webpack_require__(350);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Settings/Metadata/MetadataLayoutTemplate',
	
	    regions : {
	        metadata : '#x-metadata-providers'
	    },
	
	    initialize : function(options) {
	        this.settings = options.settings;
	        this.metadataCollection = new MetadataCollection();
	        this.metadataCollection.fetch();
	    },
	    onShow     : function() {
	        this.metadata.show(new MetadataCollectionView({ collection : this.metadataCollection }));
	    }
	});

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MetadataModel = __webpack_require__(349);
	
	module.exports = Backbone.Collection.extend({
	    model : MetadataModel,
	    url   : window.NzbDrone.ApiRoot + '/metadata'
	});

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var ProviderSettingsModelBase = __webpack_require__(242);
	
	module.exports = ProviderSettingsModelBase.extend({});

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var MetadataItemView = __webpack_require__(351);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : MetadataItemView,
	    itemViewContainer : '#x-metadata',
	    template          : 'Settings/Metadata/MetadataCollectionViewTemplate'
	});

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditView = __webpack_require__(352);
	var AsModelBoundView = __webpack_require__(206);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Metadata/MetadataItemViewTemplate',
	    tagName  : 'li',
	
	    events : {
	        'click' : '_edit'
	    },
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this.render);
	    },
	
	    _edit : function() {
	        var view = new EditView({ model : this.model });
	        AppLayout.modalRegion.show(view);
	    }
	});
	
	module.exports = AsModelBoundView.call(view);

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/Metadata/MetadataEditViewTemplate',
	
	    _onAfterSave : function() {
	        vent.trigger(vent.Commands.CloseModalCommand);
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var CommandController = __webpack_require__(84);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/General/GeneralViewTemplate',
	
	    events : {
	        'change .x-auth'             : '_setAuthOptionsVisibility',
	        'change .x-proxy'            : '_setProxyOptionsVisibility',
	        'change .x-ssl'              : '_setSslOptionsVisibility',
	        'click .x-reset-api-key'     : '_resetApiKey',
	        'click .x-copy-api-key'      : '_copyApiKeyToClipboard',
	        'change .x-update-mechanism' : '_setScriptGroupVisibility'
	    },
	
	    ui : {
	        authToggle      : '.x-auth',
	        authOptions     : '.x-auth-options',
	        sslToggle       : '.x-ssl',
	        sslOptions      : '.x-ssl-options',
	        resetApiKey     : '.x-reset-api-key',
	        copyApiKey      : '.x-copy-api-key',
	        apiKeyInput     : '.x-api-key',
	        updateMechanism : '.x-update-mechanism',
	        scriptGroup     : '.x-script-group',
	        proxyToggle     : '.x-proxy',
	        proxyOptions    : '.x-proxy-settings'
	    },
	
	    initialize : function() {
	        this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	    },
	
	    onRender : function() {
	        if (this.ui.authToggle.val() === 'none') {
	            this.ui.authOptions.hide();
	        }
	
	        if (!this.ui.proxyToggle.prop('checked')) {
	            this.ui.proxyOptions.hide();
	        }
	
	        if (!this.ui.sslToggle.prop('checked')) {
	            this.ui.sslOptions.hide();
	        }
	
	        if (!this._showScriptGroup()) {
	            this.ui.scriptGroup.hide();
	        }
	
	        CommandController.bindToCommand({
	            element : this.ui.resetApiKey,
	            command : {
	                name : 'resetApiKey'
	            }
	            });
	    },
	   
	    _copyApiKeyToClipboard : function() {
	        this.ui.apiKeyInput.select();
	        document.execCommand("copy");
	    },
	
	    _setAuthOptionsVisibility : function() {
	
	        var showAuthOptions = this.ui.authToggle.val() !== 'none';
	
	        if (showAuthOptions) {
	            this.ui.authOptions.slideDown();
	        }
	
	        else {
	            this.ui.authOptions.slideUp();
	        }
	    },
	
	    _setProxyOptionsVisibility : function() {
	        if (this.ui.proxyToggle.prop('checked')) {
	            this.ui.proxyOptions.slideDown();
	        }
	        else {
	            this.ui.proxyOptions.slideUp();
	        }
	    },
	
	    _setSslOptionsVisibility : function() {
	
	        var showSslOptions = this.ui.sslToggle.prop('checked');
	
	        if (showSslOptions) {
	            this.ui.sslOptions.slideDown();
	        }
	
	        else {
	            this.ui.sslOptions.slideUp();
	        }
	    },
	
	    _resetApiKey : function() {
	        if (window.confirm('Reset API Key?')) {
	            CommandController.Execute('resetApiKey', {
	                name : 'resetApiKey'
	            });
	        }
	    },
	
	    _commandComplete : function(options) {
	        if (options.command.get('name') === 'resetapikey') {
	            this.model.fetch();
	        }
	    },
	
	    _setScriptGroupVisibility : function() {
	
	        if (this._showScriptGroup()) {
	            this.ui.scriptGroup.slideDown();
	        }
	
	        else {
	            this.ui.scriptGroup.slideUp();
	        }
	    },
	
	    _showScriptGroup : function() {
	        return this.ui.updateMechanism.val() === 'script';
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;
	


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var UiSettingsModel = __webpack_require__(22);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	
	var view = Marionette.ItemView.extend({
	    template : 'Settings/UI/UiViewTemplate',
	
	    initialize : function() {
	        this.listenTo(this.model, 'sync', this._reloadUiSettings);
	    },
	
	    _reloadUiSettings : function() {
	        UiSettingsModel.fetch();
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	
	module.exports = view;

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	var SettingsModelBase = __webpack_require__(198);
	var Config = __webpack_require__(33);
	
	module.exports = SettingsModelBase.extend({
	    url            : window.NzbDrone.ApiRoot + '/config/ui',
	    successMessage : 'UI settings saved',
	    errorMessage   : 'Failed to save UI settings',
	
	    origSave : SettingsModelBase.prototype.saveSettings,
	    origInit : SettingsModelBase.prototype.initialize,
	
	    initialize : function() {
	      this.set("pageSize", Config.getValue("pageSize", 250));
	      this.origInit.call(this);
	    },
	
	    saveSettings : function() {
	      Config.setValue("pageSize", this.get("pageSize"));
	      this.origSave.call(this);
	    }
	});


/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var RootFolderLayout = __webpack_require__(306);
	var ExistingMoviesCollectionView = __webpack_require__(357);
	var AddMoviesView = __webpack_require__(358);
	var ProfileCollection = __webpack_require__(41);
	var AddFromListView = __webpack_require__(373);
	var RootFolderCollection = __webpack_require__(304);
	var BulkImportView = __webpack_require__(377);
	var DiscoverMoviesCollection = __webpack_require__(366);
	__webpack_require__(62);
	
	module.exports = Marionette.Layout.extend({
			template : 'AddMovies/AddMoviesLayoutTemplate',
	
			regions : {
					workspace : '#add-movies-workspace',
			},
	
			ui : {
				$existing : '#show-existing-movies-toggle'
			},
	
			events : {
					'click .x-discover'  : '_discoverMovies',
					'click .x-bulk-import' : '_bulkImport',
					'click .x-add-new' : '_addMovies',
					"click .x-add-lists" : "_addFromList",
					'click .x-show-existing' : '_toggleExisting'
			},
	
			attributes : {
					id : 'add-movies-screen'
			},
	
			initialize : function(options) {
					ProfileCollection.fetch();
					RootFolderCollection.fetch().done(function() {
							RootFolderCollection.synced = true;
					});
	
					if (options.action === "search") {
						this._addMovies(options);
					}
			},
	
			_toggleExisting : function(e) {
				var showExisting = e.target.checked;
	
				vent.trigger(vent.Commands.ShowExistingCommand, {
						showExisting: showExisting
				});
			},
	
			onShow : function() {
	
					this.workspace.show(new AddMoviesView(this.options));
					this.ui.$existing.hide();
			},
	
	
			_folderSelected : function(options) {
					vent.trigger(vent.Commands.CloseModalCommand);
					//this.ui.$existing.show();
					this.workspace.show(new ExistingMoviesCollectionView({ model : options.model }));
			},
	
			_bulkFolderSelected : function(options) {
				vent.trigger(vent.Commands.CloseModalCommand);
				this.workspace.show(new BulkImportView({ model : options.model}));
			},
	
			_discoverMovies : function(options) {
				options = options || {};
				options.action = "discover";
				options.collection = new DiscoverMoviesCollection();
				this.workspace.show(new AddMoviesView(options));
			},
	
			_addMovies : function(options) {
					this.workspace.show(new AddMoviesView(options));
			},
	
			_addFromList : function() {
				//this.ui.$existing.hide();
				this.workspace.show(new AddFromListView());
			},
	
			_bulkImport : function() {
				this.bulkRootFolderLayout = new RootFolderLayout();
				this.listenTo(this.bulkRootFolderLayout, 'folderSelected', this._bulkFolderSelected);
				AppLayout.modalRegion.show(this.bulkRootFolderLayout);
			}
	});


/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var AddMoviesView = __webpack_require__(358);
	var UnmappedFolderCollection = __webpack_require__(371);
	var vent = __webpack_require__(34);
	
	module.exports = Marionette.CompositeView.extend({
	    itemView          : AddMoviesView,
	    itemViewContainer : '.x-loading-folders',
	    template          : 'AddMovies/Existing/AddExistingMovieCollectionViewTemplate',
	
	    ui : {
	        loadingFolders : '.x-loading-folders'
	    },
	
	    initialize : function() {
	        this.collection = new UnmappedFolderCollection();
	        this.collection.importItems(this.model);
	    },
	
	    showCollection : function() {
	        this._showAndSearch(0);
	    },
	
	    appendHtml : function(collectionView, itemView, index) {
	        collectionView.ui.loadingFolders.before(itemView.el);
	    },
	
	    _showAndSearch : function(index) {
	        var self = this;
	        var model = this.collection.at(index);
	
	        if (model) {
	            var currentIndex = index;
	            var folderName = model.get('folder').name;
	            this.addItemView(model, this.getItemView(), index);
	            this.children.findByModel(model).search({ term : folderName }).always(function() {
	                if (!self.isClosed) {
	                    self._showAndSearch(currentIndex + 1);
	                }
	            });
	        }
	
	        else {
	            this.ui.loadingFolders.hide();
	        }
	    },
	
	    itemViewOptions : {
	        isExisting : true
	    }
	
	});

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AddMoviesCollection = __webpack_require__(359);
	var AddFromListCollection = __webpack_require__(360);
	var SearchResultCollectionView = __webpack_require__(361);
	var DiscoverableListDropdownView = __webpack_require__(364);
	var DiscoverableListCollection = __webpack_require__(365);
	var DiscoverMoviesCollection = __webpack_require__(366);
	var EmptyView = __webpack_require__(367);
	var NotFoundView = __webpack_require__(368);
	var DiscoverEmptyView = __webpack_require__(369);
	var ErrorView = __webpack_require__(370);
	var LoadingView = __webpack_require__(120);
	var FullMovieCollection = __webpack_require__(61);
	
	module.exports = Marionette.Layout.extend({
			template : 'AddMovies/AddMoviesViewTemplate',
	
			regions : {
								myRegion : '#my-region',
					searchResult : '#search-result',
			},
	
			ui : {
					moviesSearch : '.x-movies-search',
					searchBar    : '.x-search-bar',
					loadMore     : '.x-load-more',
					discoverHeader : ".x-discover-header",
					discoverBefore : ".x-discover-before",
					discoverRecos : ".x-recommendations-tab",
					discoverPopular : ".x-popular-tab" ,
					discoverUpcoming : ".x-upcoming-tab",
					discoverLists : ".x-lists-tab"
			},
	
			events : {
					'click .x-load-more' : '_onLoadMore',
					"click .x-recommendations-tab" : "_discoverRecos",
					"click .x-popular-tab" : "_discoverPopular",
					"click .x-upcoming-tab" : "_discoverUpcoming",
					"click .x-lists-tab" : "_discoverLists",
					"click .discoverable-list-item" : "_discoverList"
			},
	
			initialize : function(options) {
					this.isExisting = options.isExisting;
					this.collection = options.collection || new AddMoviesCollection();
	
					if (this.isExisting) {
							this.collection.unmappedFolderModel = this.model;
					}
	
					if (this.isExisting) {
							this.className = 'existing-movies';
					} else {
							this.className = 'new-movies';
					}
	
					this.listenTo(vent, vent.Events.MoviesAdded, this._onMoviesAdded);
					this.listenTo(this.collection, 'sync', this._showResults);
	
					this.resultCollectionView = new SearchResultCollectionView({
							collection : this.collection,
							isExisting : this.isExisting
					});
	
					/*this.listsDropdown = new DiscoverableListCollectionView({
							collection : DiscoverableListCollection
					});*/
	
					this.listenTo(DiscoverableListCollection, 'sync', this._showListDropdown);
					/*this.listsDropdown = new DiscoverableListCollectionView({
							collection : DiscoverableListCollection
					})*/
	
					this.throttledSearch = _.debounce(this.search, 1000, { trailing : true }).bind(this);
	
					if (options.action === "search") {
						this.search({term: options.query});
					} else if (options.action === "discover") {
						this.isDiscover = true;
					}
	
			},
	
			onRender : function() {
					var self = this;
	
	
	
					this.$el.addClass(this.className);
	
					this.ui.moviesSearch.on('input', function(e) {
	
							if (_.contains([
											9,
											16,
											17,
											18,
											19,
											20,
											33,
											34,
											35,
											36,
											37,
											38,
											39,
											40,
											91,
											92,
											93
									], e.keyCode)) {
									return;
							}
	
							self._abortExistingSearch();
							self.throttledSearch({
									term : self.ui.moviesSearch.val()
							});
					});
	
					this._clearResults();
	
					if (this.isExisting) {
							this.ui.searchBar.hide();
					}
	
					if (this.isDiscover) {
							this.ui.searchBar.hide();
							this._discoverRecos();
							/*if (this.collection.length == 0) {
								this.searchResult.show(new LoadingView());
							}*/
					}
			},
	
			onShow : function() {
					this.ui.discoverBefore.hide();
					this.ui.moviesSearch.focus();
					this.ui.loadMore.hide();
	
					this._showListDropdown();
	
					if (this.isDiscover) {
							this.ui.discoverBefore.show();
					}
			},
	
			search : function(options) {
					var self = this;
	
					this.collection.reset();
	
					if (!options.term || options.term === this.collection.term) {
							return Marionette.$.Deferred().resolve();
					}
	
					this.searchResult.show(new LoadingView());
					this.collection.term = options.term;
					this.currentSearchPromise = this.collection.fetch({
							data : { term : options.term }
					});
	
					this.currentSearchPromise.fail(function() {
							self._showError();
					});
	
					return this.currentSearchPromise;
			},
	
			_onMoviesAdded : function(options) {
					if (this.isExisting && options.movie.get('path') === this.model.get('folder').path) {
							this.close();
					}
	
					else if (!this.isExisting) {
							this.resultCollectionView.setExisting(options.movie.get('tmdbId'));
							/*this.collection.term = '';
							this.collection.reset();
							this._clearResults();
							this.ui.moviesSearch.val('');
							this.ui.moviesSearch.focus();*/ //TODO: Maybe add option wheter to clear search result.
					}
			},
	
			_onLoadMore : function() {
					var showingAll = this.resultCollectionView.showMore();
					if (!this.isDiscover) {
						this.ui.searchBar.show();
					}
	
	
					if (showingAll) {
							this.ui.loadMore.hide();
					}
			},
	
			_clearResults : function() {
	
					if (!this.isExisting) {
							this.searchResult.show(new EmptyView());
					} else {
							this.searchResult.close();
					}
			},
	
			_showResults : function() {
					if (!this.isClosed) {
							if (this.collection.length === 0) {
									this.ui.loadMore.hide();
									if (this.isDiscover) {
										this.searchResult.show(new DiscoverEmptyView());
									} else {
										this.ui.searchBar.show();
										this.searchResult.show(new NotFoundView({ term : this.collection.term }));
									}
	
							} else {
									this.searchResult.show(this.resultCollectionView);
									if (!this.showingAll) {
											this.ui.loadMore.show();
									}
							}
					}
			},
	
			_showListDropdown : function() {
				this.listsDropdown = new DiscoverableListDropdownView(DiscoverableListCollection.toJSON());
				this.listsDropdown.render();
				$("#list-dropdown").html(this.listsDropdown.$el.html());
				//this.myRegion.show(new DiscoverableListDropdownView(DiscoverableListCollection.toJSON()));
			},
	
			_abortExistingSearch : function() {
					if (this.currentSearchPromise && this.currentSearchPromise.readyState > 0 && this.currentSearchPromise.readyState < 4) {
							console.log('aborting previous pending search request.');
							this.currentSearchPromise.abort();
					} else {
							this._clearResults();
					}
			},
	
			_showError : function() {
					if (!this.isClosed) {
							this.ui.searchBar.show();
							this.searchResult.show(new ErrorView({ term : this.collection.term }));
							this.collection.term = '';
					}
			},
	
			_discover : function(action) {
				if (this.collection.action === action) {
					return;
				}
	
				if (this.collection.specialProperty === "special") {
					this.collection.reset();
					this.collection = new DiscoverMoviesCollection();
					this.resultCollectionView.collection = this.collection;
				}
	
				this.listenTo(this.collection, 'sync', this._showResults);
				this.searchResult.show(new LoadingView());
				this.collection.action = action;
				this.currentSearchPromise = this.collection.fetch();
			},
	
			_discoverRecos : function() {
				this.ui.discoverRecos.tab("show");
				this.ui.discoverHeader.html("Recommendations by The Movie Database for you");
				this._discover("recommendations");
			},
	
			_discoverPopular : function() {
				this.ui.discoverPopular.tab("show");
				this.ui.discoverHeader.html("Currently Popular Movies");
				this._discover("popular");
			},
	
			_discoverUpcoming : function() {
				this.ui.discoverUpcoming.tab("show");
				this.ui.discoverHeader.html("Movies coming to Blu-Ray in the next weeks");
				this._discover("upcoming");
			},
	
			_discoverLists : function() {
				/*this.ui.discoverLists.tab("show");
				this.ui.discoverHeader.html("");*/
			},
	
			_discoverList : function(options) {
				this.ui.discoverLists.tab("show");
				this.ui.discoverHeader.html("Showing movies from list: "+options.target.textContent);
	
				this.collection.reset();
				this.collection = new AddFromListCollection();
				this.listenTo(this.collection, 'sync', this._showResults);
				this.searchResult.show(new LoadingView());
				this.currentSearchPromise = this.collection.fetch({ data: { listId: options.target.value } });
				this.resultCollectionView.collection = this.collection;
			}
	
	
	});


/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/movie/lookup',
	    model : MovieModel,
	
	    parse : function(response) {
	        var self = this;
	
	        _.each(response, function(model) {
	            model.id = undefined;
	
	            if (self.unmappedFolderModel) {
	                model.path = self.unmappedFolderModel.get('folder').path;
	            }
	        });
	
	        return response;
	    }
	});


/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Collection.extend({
			url   : window.NzbDrone.ApiRoot + '/netimport/movies',
			model : MovieModel,
			specialProperty: "special",
	
			parse : function(response) {
					var self = this;
	
					_.each(response, function(model) {
							model.id = undefined;
					});
	
					return response;
			}
	});


/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var SearchResultView = __webpack_require__(362);
	var FullMovieCollection = __webpack_require__(61);
	var vent = __webpack_require__(34);
	var $ = __webpack_require__(1);
	
	module.exports = Marionette.CollectionView.extend({
			itemView : SearchResultView,
	
			initialize : function(options) {
					this.showExisting = true;
					this.isExisting = options.isExisting;
					this.showing = 10;
					if (this.isExisting) {
						this.showing = 1;
					}
					vent.on(vent.Commands.ShowExistingCommand, this._onExistingToggle.bind(this));
			},
	
			_onExistingToggle : function(data) {
					this.showExisting = data.showExisting;
	
					this.render();
			},
	
			showAll : function() {
					this.showingAll = true;
					this.render();
			},
	
			showMore : function() {
					var pos = $(window).scrollTop();
					this.showing += 10;
					this.render();
					$(window).scrollTop(pos);
					return this.showing >= this.collection.length;
			},
	
			setExisting : function(tmdbid) {
					var movies = this.collection.where({ tmdbId : tmdbid });
					console.warn(movies);
					if (movies.length > 0) {
							this.children.findByModel(movies[0])._configureTemplateHelpers();
							//this.children.findByModel(movies[0])._configureTemplateHelpers();
							this.children.findByModel(movies[0]).render();
							//this.templateHelpers.existing = existingMovies[0].toJSON();
					}
			},
	
			appendHtml : function(collectionView, itemView, index) {
					var tmdbId = itemView.model.get('tmdbId');
					var existingMovies = FullMovieCollection.where({ tmdbId: tmdbId });
					if(existingMovies.length > 0) {
							if(this.showExisting) {
									if (index < this.showing || index === 0) {
											collectionView.$el.append(itemView.el);
									}
							}
					} else {
							if (index < this.showing || index === 0) {
									collectionView.$el.append(itemView.el);
							}
					}
	
			}
	});


/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var Profiles = __webpack_require__(41);
	var RootFolders = __webpack_require__(304);
	var RootFolderLayout = __webpack_require__(306);
	var FullMovieCollection = __webpack_require__(61);
	var ImportExclusionModel = __webpack_require__(298);
	var Config = __webpack_require__(33);
	var Messenger = __webpack_require__(52);
	var AsValidatedView = __webpack_require__(208);
	
	__webpack_require__(363);
	
	var view = Marionette.ItemView.extend({
	
	    template : 'AddMovies/SearchResultViewTemplate',
	
	    ui : {
	        profile         : '.x-profile',
	        rootFolder      : '.x-root-folder',
	        seasonFolder    : '.x-season-folder',
	        monitor         : '.x-monitor',
		      minimumAvailability : '.x-minimumavailability',
		      minimumAvailabilityTooltip : '.x-minimumavailability-tooltip',
	        monitorTooltip  : '.x-monitor-tooltip',
	        addButton       : '.x-add',
	        addSearchButton : '.x-add-search',
	        overview        : '.x-overview'
	    },
	
	    events : {
	        'click .x-add'            : '_addWithoutSearch',
	        'click .x-add-search'     : '_addAndSearch',
	        "click .x-ignore"         : "_ignoreMovie",
	        'change .x-profile'       : '_profileChanged',
	        'change .x-root-folder'   : '_rootFolderChanged',
	        'change .x-season-folder' : '_seasonFolderChanged',
	        "change .x-minimumavailability" : "_minAvailabilityChanged",
	        'change .x-monitor'       : '_monitorChanged'
	    },
	
	    initialize : function() {
	
	        if (!this.model) {
	            throw 'model is required';
	        }
	
	        //console.log(this.route);
	
	        this.templateHelpers = {};
	        this._configureTemplateHelpers();
	
	        this.listenTo(vent, Config.Events.ConfigUpdatedEvent, this._onConfigUpdated);
	        this.listenTo(this.model, 'change', this.render);
	        this.listenTo(RootFolders, 'all', this._rootFoldersUpdated);
	    },
	
	    onRender : function() {
	
	        var defaultProfile = Config.getValue(Config.Keys.DefaultProfileId);
	        var defaultRoot = Config.getValue(Config.Keys.DefaultRootFolderId);
	        var defaultMinAvailability = Config.getValue(Config.Keys.DefaultMinAvailability, "announced");
	        var useSeasonFolder = Config.getValueBoolean(Config.Keys.UseSeasonFolder, true);
	        var defaultMonitorEpisodes = Config.getValue(Config.Keys.MonitorEpisodes, 'all');
	
	        if (Profiles.get(defaultProfile)) {
	            this.ui.profile.val(defaultProfile);
	        }
	
	        if (RootFolders.get(defaultRoot)) {
	            this.ui.rootFolder.val(defaultRoot);
	        }
	
	        this.ui.seasonFolder.prop('checked', useSeasonFolder);
	        this.ui.monitor.val(defaultMonitorEpisodes);
		      this.ui.minimumAvailability.val(defaultMinAvailability);
	
	        //TODO: make this work via onRender, FM?
	        //works with onShow, but stops working after the first render
	        this.ui.overview.dotdotdot({
	            height : 120
	        });
	
	        this.templateFunction = Marionette.TemplateCache.get('AddMovies/MonitoringTooltipTemplate');
	        var content = this.templateFunction();
	
	        this.ui.monitorTooltip.popover({
	            content   : content,
	            html      : true,
	            trigger   : 'hover',
	            title     : 'Movie Monitoring Options',
	            placement : 'right',
	            container : this.$el
	        });
	
		this.templateFunction = Marionette.TemplateCache.get('AddMovies/MinimumAvailabilityTooltipTemplate');
		var content1 = this.templateFunction();
	
		this.ui.minimumAvailabilityTooltip.popover({
			content : content1,
			html :true,
			trigger : 'hover',
			title : 'When to Consider a Movie Available',
			placement : 'right',
			container : this.$el
		});
	    },
	
	    _configureTemplateHelpers : function() {
	        var existingMovies = FullMovieCollection.where({ tmdbId : this.model.get('tmdbId') });
	        if (existingMovies.length > 0) {
	            this.templateHelpers.existing = existingMovies[0].toJSON();
	        }
	
	        this.templateHelpers.profiles = Profiles.toJSON();
	        //console.log(this.templateHelpers.isExisting);
	        if (!this.model.get('isExisting')) {
	            this.templateHelpers.rootFolders = RootFolders.toJSON();
	        }
	    },
	
	    _onConfigUpdated : function(options) {
	        if (options.key === Config.Keys.DefaultProfileId) {
	            this.ui.profile.val(options.value);
	        }
	
	        else if (options.key === Config.Keys.DefaultRootFolderId) {
	            this.ui.rootFolder.val(options.value);
	        }
	
	        else if (options.key === Config.Keys.UseSeasonFolder) {
	            this.ui.seasonFolder.prop('checked', options.value);
	        }
	
	        else if (options.key === Config.Keys.MonitorEpisodes) {
	            this.ui.monitor.val(options.value);
	        }
	
	        else if (options.key === Config.Keys.DefaultMinAvailability) {
	            this.ui.minimumAvailability.val(options.value);
	        }
	    },
	
	    _profileChanged : function() {
	        Config.setValue(Config.Keys.DefaultProfileId, this.ui.profile.val());
	    },
	
	    _seasonFolderChanged : function() {
	        Config.setValue(Config.Keys.UseSeasonFolder, this.ui.seasonFolder.prop('checked'));
	    },
	
	    _rootFolderChanged : function() {
	        var rootFolderValue = this.ui.rootFolder.val();
	        if (rootFolderValue === 'addNew') {
	            var rootFolderLayout = new RootFolderLayout();
	            this.listenToOnce(rootFolderLayout, 'folderSelected', this._setRootFolder);
	            AppLayout.modalRegion.show(rootFolderLayout);
	        } else {
	            Config.setValue(Config.Keys.DefaultRootFolderId, rootFolderValue);
	        }
	    },
	
	    _monitorChanged : function() {
	        Config.setValue(Config.Keys.MonitorEpisodes, this.ui.monitor.val());
	    },
	
	    _minAvailabilityChanged : function() {
	        Config.setValue(Config.Keys.DefaultMinAvailability, this.ui.minimumAvailability.val());
	    },
	
	    _setRootFolder : function(options) {
	        vent.trigger(vent.Commands.CloseModalCommand);
	        this.ui.rootFolder.val(options.model.id);
	        this._rootFolderChanged();
	    },
	
	    _addWithoutSearch : function() {
	        this._addMovies(false);
	    },
	
	    _addAndSearch : function() {
	        this._addMovies(true);
	    },
	
	    _addMovies : function(searchForMovie) {
	        var addButton = this.ui.addButton;
	        var addSearchButton = this.ui.addSearchButton;
	
	        addButton.addClass('disabled');
	        addSearchButton.addClass('disabled');
	
	        var profile = this.ui.profile.val();
	        var rootFolderPath = this.ui.rootFolder.children(':selected').text();
	        var monitor = this.ui.monitor.val();
	        var minAvail = this.ui.minimumAvailability.val();
	
	        var options = this._getAddMoviesOptions();
	        options.searchForMovie = searchForMovie;
	        console.warn(searchForMovie);
	
	        this.model.set({
	            profileId      : profile,
	            rootFolderPath : rootFolderPath,
	            addOptions     : options,
		    minimumAvailability : minAvail,
	            monitored      : (monitor === 'all' ? true : false)
	        }, { silent : true });
	
	        var self = this;
	        var promise = this.model.save();
	
	        //console.log(this.model.save);
	        //console.log(promise);
	
	        if (searchForMovie) {
	            this.ui.addSearchButton.spinForPromise(promise);
	        }
	
	        else {
	            this.ui.addButton.spinForPromise(promise);
	        }
	
	        promise.always(function() {
	            addButton.removeClass('disabled');
	            addSearchButton.removeClass('disabled');
	        });
	
	        promise.done(function() {
	            FullMovieCollection.add(self.model);
	
	            self.close();
	
	            Messenger.show({
	                message        : 'Added: ' + self.model.get('title'),
	                actions        : {
	                    goToMovie : {
	                        label  : 'Go to Movie',
	                        action : function() {
	                            Backbone.history.navigate('/movies/' + self.model.get('titleSlug'), { trigger : true });
	                        }
	                    }
	                },
	                hideAfter      : 8,
	                hideOnNavigate : true
	            });
	
	            vent.trigger(vent.Events.MoviesAdded, { movie : self.model });
	        });
	    },
	
	    _ignoreMovie : function() {
	      var exclusion = new ImportExclusionModel({tmdbId : this.model.get("tmdbId"),
	        movieTitle : this.model.get("title"), movieYear : this.model.get("year")});
	      exclusion.save();
	      this.model.destroy();
	      this.remove();
	    },
	
	    _rootFoldersUpdated : function() {
	        this._configureTemplateHelpers();
	        this.render();
	    },
	
	    _getAddMoviesOptions : function() {
	        return {
	            ignoreEpisodesWithFiles    : false,
	            ignoreEpisodesWithoutFiles : false
	        };
	    }
	});
	
	AsValidatedView.apply(view);
	
	module.exports = view;


/***/ },
/* 363 */,
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'AddMovies/DiscoverableListDropdownViewTemplate',
	
	    initialize : function(lists) {
	        this.lists = lists;
	    },
	
	    templateHelpers : function() {
	        return this.lists;
	    }
	});


/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var NetImportModel = __webpack_require__(241);
	var _ = __webpack_require__(8);
	
	var DiscoverableCollection = Backbone.Collection.extend({
			url   : window.NzbDrone.ApiRoot + '/movies/discover/lists',
			model : NetImportModel,
	});
	var collection = new DiscoverableCollection();
	collection.fetch();
	module.exports = collection;


/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Collection.extend({
	    url   : function() {
	      var route = this.action || "";
	      return window.NzbDrone.ApiRoot + "/movies/discover/" + route;
	    },
	    
	    model : MovieModel,
	
	    parse : function(response) {
	        var self = this;
	
	        _.each(response, function(model) {
	            model.id = undefined;
	
	            if (self.unmappedFolderModel) {
	                model.path = self.unmappedFolderModel.get('folder').path;
	            }
	        });
	
	        return response;
	    }
	});


/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'AddMovies/EmptyViewTemplate'
	});


/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'AddMovies/NotFoundViewTemplate',
	
	    initialize : function(options) {
	        this.options = options;
	    },
	
	    templateHelpers : function() {
	        return this.options;
	    }
	});


/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'AddMovies/DiscoverEmptyViewTemplate'
	});


/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'AddMovies/ErrorViewTemplate',
	
	    initialize : function(options) {
	        this.options = options;
	    },
	
	    templateHelpers : function() {
	        return this.options;
	    }
	});


/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var UnmappedFolderModel = __webpack_require__(372);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Collection.extend({
	    model : UnmappedFolderModel,
	
	    importItems : function(rootFolderModel) {
	
	        this.reset();
	        var rootFolder = rootFolderModel;
	
	        _.each(rootFolderModel.get('unmappedFolders'), function(folder) {
	            this.push(new UnmappedFolderModel({
	                rootFolder : rootFolder,
	                folder     : folder
	            }));
	        }, this);
	    }
	});

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var AddFromListCollection = __webpack_require__(360);
	var AddFromListCollectionView = __webpack_require__(374);
	var AddListView = __webpack_require__(311);
	var EmptyView = __webpack_require__(367);
	var NotFoundView = __webpack_require__(368);
	var ListCollection = __webpack_require__(240);
	var ErrorView = __webpack_require__(370);
	var LoadingView = __webpack_require__(120);
	var AppLayout = __webpack_require__(68);
	var InCinemasCell = __webpack_require__(92);
	var MovieTitleCell = __webpack_require__(376);
	var SelectAllCell = __webpack_require__(313);
	var TemplatedCell = __webpack_require__(93);
	var ProfileCell = __webpack_require__(97);
	var MovieLinksCell = __webpack_require__(98);
	var MovieActionCell = __webpack_require__(99);
	var MovieStatusCell = __webpack_require__(100);
	var MovieDownloadStatusCell = __webpack_require__(101);
	var DownloadedQualityCell = __webpack_require__(102);
	var MoviesCollection = __webpack_require__(62);
	var Messenger = __webpack_require__(52);
	__webpack_require__(363);
	var SchemaModal = __webpack_require__(309);
	
	module.exports = Marionette.Layout.extend({
	    template: 'AddMovies/List/AddFromListViewTemplate',
	
	    regions: {
	        fetchResult: '#fetch-result'
	    },
	
	    ui: {
	        moviesSearch: '.x-movies-search',
	        listSelection: ".x-list-selection",
	        importSelected: ".x-import-selected"
	    },
	
	    columns: [{
	        name: '',
	        cell: SelectAllCell,
	        headerCell: 'select-all',
	        sortable: false
	    }, {
	        name: 'title',
	        label: 'Title',
	        cell: MovieTitleCell,
	        cellValue: 'this',
	    }, {
	        name: 'profileId',
	        label: 'Profile',
	        cell: ProfileCell,
	        sortable: false,
	    }, {
	        name: 'this',
	        label: 'Links',
	        cell: MovieLinksCell,
	        className: "movie-links-cell",
	        sortable: false,
	    }],
	
	    events: {
	        'click .x-load-more': '_onLoadMore',
	        "change .x-list-selection": "_listSelected",
	        "click .x-fetch-list": "_fetchList",
	        "click .x-import-selected": "_importSelected"
	    },
	
	    initialize: function(options) {
	        console.log(options);
	
	        this.isExisting = options.isExisting;
	        //this.collection = new AddFromListCollection();
	
	        this.templateHelpers = {};
	        this.listCollection = new ListCollection();
	        this.templateHelpers.lists = this.listCollection.toJSON();
	
	        this.listenTo(this.listCollection, 'all', this._listsUpdated);
	        this.listCollection.fetch();
	
	        this.collection = new AddFromListCollection();
	
	        this.listenTo(this.collection, 'sync', this._showResults);
	
	        /*this.listenTo(this.collection, 'sync', this._showResults);
	
	        this.resultCollectionView = new SearchResultCollectionView({
	        		collection : this.collection,
	        		isExisting : this.isExisting
	        });*/
	
	        //this.throttledSearch = _.debounce(this.search, 1000, { trailing : true }).bind(this);
	    },
	
	    onRender: function() {
	        var self = this;
	        this.ui.importSelected.hide();
	    },
	
	    onShow: function() {
	        this.ui.moviesSearch.focus();
	
	    },
	
	    search: function(options) {
	        var self = this;
	
	        this.collection.reset();
	
	        if (!options.term || options.term === this.collection.term) {
	            return Marionette.$.Deferred().resolve();
	        }
	
	        this.searchResult.show(new LoadingView());
	        this.collection.term = options.term;
	        this.currentSearchPromise = this.collection.fetch({
	            data: { term: options.term }
	        });
	
	        this.currentSearchPromise.fail(function() {
	            self._showError();
	        });
	
	        return this.currentSearchPromise;
	    },
	
	    _onMoviesAdded: function(options) {
	        if (this.isExisting && options.movie.get('path') === this.model.get('folder').path) {
	            this.close();
	        } else if (!this.isExisting) {
	            this.resultCollectionView.setExisting(options.movie.get('tmdbId'));
	            /*this.collection.term = '';
	            this.collection.reset();
	            this._clearResults();
	            this.ui.moviesSearch.val('');
	            this.ui.moviesSearch.focus();*/ //TODO: Maybe add option wheter to clear search result.
	        }
	    },
	
	    _onLoadMore: function() {
	        var showingAll = this.resultCollectionView.showMore();
	        this.ui.searchBar.show();
	
	        if (showingAll) {
	            this.ui.loadMore.hide();
	        }
	    },
	
	    _listSelected: function() {
	        var rootFolderValue = this.ui.listSelection.val();
	        if (rootFolderValue === 'addNew') {
	            //var rootFolderLayout = new SchemaModal(this.listCollection);
	            //AppLayout.modalRegion.show(rootFolderLayout);
	            SchemaModal.open(this.listCollection);
	        }
	    },
	
	    _fetchList: function() {
	        var self = this;
	        var listId = this.ui.listSelection.val();
	
	        this.fetchResult.show(new LoadingView());
	
	        this.currentFetchPromise = this.collection.fetch({ data: { listId: listId } });
	        this.currentFetchPromise.fail(function() {
	            self._showError();
	        });
	
	    },
	
	    _listsUpdated: function() {
	        this.templateHelpers.lists = this.listCollection.toJSON();
	        this.render();
	    },
	
	    _importSelected: function() {
	        var selected = this.importGrid.getSelectedModels();
	        // console.log(selected);
	        var promise = MoviesCollection.importFromList(selected);
	        this.ui.importSelected.spinForPromise(promise);
	        this.ui.importSelected.addClass('disabled');
	
	        Messenger.show({
	            message: "Importing {0} movies. Don't close this browser window until it has finished".format(selected.length),
	            hideOnNavigate: false,
	            hideAfter: 30,
	            type: "error"
	        });
	
	        promise.done(function() {
	            Messenger.show({
	                message: "Imported movies from list.",
	                hideAfter: 8,
	                hideOnNavigate: true
	            });
	        });
	        /*for (m in selected) {
	        	debugger;
	        	m.save()
	        	MoviesCollection.add(m);
	        }*/
	
	        //MoviesCollection.save();
	    },
	
	    _clearResults: function() {
	
	        if (!this.isExisting) {
	            this.searchResult.show(new EmptyView());
	        } else {
	            this.searchResult.close();
	        }
	    },
	
	    _showResults: function() {
	        if (this.collection.length === 0) {
	            this.fetchResult.show(new NotFoundView({ term: "" }));
	        } else {
	            this.importGrid = new Backgrid.Grid({
	                collection: this.collection,
	                columns: this.columns,
	                className: 'table table-hover'
	            });
	            this.fetchResult.show(this.importGrid);
	            this.ui.importSelected.show();
	        }
	
	    },
	
	    _abortExistingSearch: function() {
	        if (this.currentSearchPromise && this.currentSearchPromise.readyState > 0 && this.currentSearchPromise.readyState < 4) {
	            console.log('aborting previous pending search request.');
	            this.currentSearchPromise.abort();
	        } else {
	            this._clearResults();
	        }
	    },
	
	    _showError: function() {
	        this.fetchResult.show(new ErrorView({ term: "" }));
	    }
	});


/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var ListItemView = __webpack_require__(375);
	var vent = __webpack_require__(34);
	
	module.exports = Marionette.CollectionView.extend({
			itemView          : ListItemView,
	
			ui : {
					loadingList : '.x-loading-list'
			},
	
			initialize : function() {
	
			},
	
			showCollection : function() {
			 },
			//
			// appendHtml : function(collectionView, itemView, index) {
			// 		collectionView.ui.loadingFolders.before(itemView.el);
			// },
			//
			// _showAndSearch : function(index) {
			// 		var self = this;
			// 		var model = this.collection.at(index);
			//
			// 		if (model) {
			// 				var currentIndex = index;
			// 				var folderName = model.get('folder').name;
			// 				this.addItemView(model, this.getItemView(), index);
			// 				this.children.findByModel(model).search({ term : folderName }).always(function() {
			// 						if (!self.isClosed) {
			// 								self._showAndSearch(currentIndex + 1);
			// 						}
			// 				});
			// 		}
			//
			// 		else {
			// 				this.ui.loadingFolders.hide();
			// 		}
			// },
			//
			// itemViewOptions : {
			// 		isExisting : true
			// }
	
	});


/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var Config = __webpack_require__(33);
	var Messenger = __webpack_require__(52);
	var AsValidatedView = __webpack_require__(208);
	
	__webpack_require__(363);
	
	var view = Marionette.ItemView.extend({
	
			template : 'AddMovies/SearchResultViewTemplate',
	
	
	});
	
	
	AsValidatedView.apply(view);
	
	module.exports = view;


/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
			className : 'movie-title-cell',
			template  : 'Cells/MovieListTitleTemplate',
	
	});


/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var MovieTitleCell = __webpack_require__(378);
	var BulkImportCollection = __webpack_require__(379);
	var QualityCell = __webpack_require__(380);
	var TmdbIdCell = __webpack_require__(381);
	var GridPager = __webpack_require__(104);
	var SelectAllCell = __webpack_require__(382);
	var ProfileCell = __webpack_require__(383);
	var MonitorCell = __webpack_require__(384);
	var MoviePathCell = __webpack_require__(385);
	var LoadingView = __webpack_require__(120);
	var EmptyView = __webpack_require__(386);
	var ToolbarLayout = __webpack_require__(108);
	var CommandController = __webpack_require__(84);
	var Messenger = __webpack_require__(52);
	var MoviesCollection = __webpack_require__(62);
	var ProfileCollection = __webpack_require__(41);
	
	__webpack_require__(314);
	__webpack_require__(37);
	
	module.exports = Marionette.Layout.extend({
			template : 'AddMovies/BulkImport/BulkImportViewTemplate',
	
			regions : {
					toolbar : '#x-toolbar',
					table : '#x-movies-bulk',
					pager : '#x-movies-bulk-pager'
			},
	
			ui : {
				addSelectdBtn : '.x-add-selected',
				//addAllBtn : '.x-add-all',
				pageSizeSelector : '.x-page-size'
			},
	
			events: { "change .x-page-size" : "_pageSizeChanged" },
	
			initialize : function(options) {
					ProfileCollection.fetch();
					this.bulkImportCollection = new BulkImportCollection().bindSignalR({ updateOnly : true });
					this.model = options.model;
					this.folder = this.model.get("path");
					this.folderId = this.model.get("id");
					this.bulkImportCollection.folderId = this.folderId;
					this.bulkImportCollection.folder = this.folder;
					this.bulkImportCollection.fetch();
					this.listenTo(this.bulkImportCollection, {"sync" : this._showContent, "error" : this._showContent, "backgrid:selected" : this._select});
			},
	
			_pageSizeChanged : function(event) {
				var pageSize = parseInt($(event.target).val());
				this.bulkImportCollection.fullCollection.reset();
				this.bulkImportCollection.reset();
	            this.table.show(new LoadingView());
				this.bulkImportCollection.setPageSize(pageSize);
				//this.bulkImportCollection.fetch();
			},
	
			columns : [
					{
						name : '',
						cell : SelectAllCell,
						headerCell : 'select-all',
						sortable : false,
						cellValue : 'this'
					},
					{
						name     : 'movie',
						label    : 'Movie',
						cell     : MovieTitleCell,
						cellValue : 'this',
						sortable : false,
					},
					{
						name : "path",
						label : "Path",
						cell : MoviePathCell,
						cellValue : 'this',
						sortable : false,
					},
					{
						name	: 'tmdbId',
						label	: 'Tmdb Id',
						cell	: TmdbIdCell,
						cellValue : 'this',
						sortable: false
					},
					{
						name :'monitor',
						label: 'Monitor',
						cell : MonitorCell,
						cellValue : 'this',
						sortable : false,
					},
					{
						name : 'profileId',
						label : 'Profile',
						cell  : ProfileCell,
						cellValue : "this",
						sortable : false,
					},
					{
						name     : 'quality',
						label    : 'Quality',
						cell     : QualityCell,
						cellValue : 'this',
						sortable : false
					}
			],
	
			_showContent : function() {
				this._showToolbar();
				this._showTable();
			},
	
			onShow : function() {
				this.table.show(new LoadingView());
			},
	
			_showToolbar : function() {
				var leftSideButtons = {
					type : 'default',
					storeState: false,
					collapse : true,
					items : [
						{
							title        : 'Add Selected',
							icon         : 'icon-radarr-add',
							callback     : this._addSelected,
							ownerContext : this,
							className    : 'x-add-selected'
						}//,
						// {
						// 	title        : 'Add All',
						// 	icon         : 'icon-radarr-add',
						// 	callback     : this._addAll,
						// 	ownerContext : this,
						// 	className    : 'x-add-all'
						// }
					]
				};
	
				this.toolbar.show(new ToolbarLayout({
					left    : [leftSideButtons],
					right   : [],
					context : this
				}));
	
				$('#x-toolbar').addClass('inline');
			},
	
			_addSelected : function() {
				var selected = _.filter(this.bulkImportCollection.fullCollection.models, function(elem){
					return elem.selected;
				});
				console.log(selected);
	
				var promise = MoviesCollection.importFromList(selected);
				this.ui.addSelectdBtn.spinForPromise(promise);
				this.ui.addSelectdBtn.addClass('disabled');
				//this.ui.addAllBtn.addClass('disabled');
	
				if (selected.length === 0) {
					Messenger.show({
						type    : 'error',
						message : 'No movies selected'
					});
					return;
				}
	
				Messenger.show({
					message : "Importing {0} movies. This can take multiple minutes depending on how many movies should be imported. Don't close this browser window until it is finished!".format(selected.length),
					hideOnNavigate : false,
					hideAfter : 30,
					type : "error"
				});
	
				var _this = this;
	
				promise.done(function() {
					Messenger.show({
						message        : "Imported movies from folder.",
						hideAfter      : 8,
						hideOnNavigate : true
					});
	
	
					_.forEach(selected, function(movie) {
						movie.destroy(); //update the collection without the added movies
					});
				});
			},
	
			_addAll : function() {
				console.log("TODO");
			},
	
			_handleEvent : function(event_name, data) {
				if (event_name === "sync" || event_name === "content") {
					this._showContent();
				}
			},
	
			_select : function(model, selected) {
				model.selected = selected;
			},
	
			_showTable : function() {
					if (this.bulkImportCollection.length === 0) {
						this.table.show(new EmptyView({ folder : this.folder }));
						return;
					}
	
					//TODO: override row in order to set an opacity based on duplication state of the movie
					this.importGrid = new Backgrid.Grid({
							columns    : this.columns,
							collection : this.bulkImportCollection,
							className  : 'table table-hover'
					});
	
					this.table.show(this.importGrid);
	
					this.pager.show(new GridPager({
							columns    : this.columns,
							collection : this.bulkImportCollection
					}));
			}
	});


/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var BulkImportCollection = __webpack_require__(379);
	
	module.exports = NzbDroneCell.extend({
			className : 'movie-title-cell',
	
	        render : function() {
	            var collection = this.model.collection;
	            //this.listenTo(collection, 'sync', this._renderCell);
	
	            this._renderCell();
	
	            return this;
	        },
	
	        _renderCell : function() {
	            this.$el.empty();
	
	            this.$el.html('<a href="https://www.themoviedb.org/movie/' + this.cellValue.get('tmdbId') +'">' + this.cellValue.get('title') + ' (' + this.cellValue.get('year') + ')' +'</a>');
	        }
	});


/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var PageableCollection = __webpack_require__(29);
	var MovieModel = __webpack_require__(31);
	var AsSortedCollection = __webpack_require__(32);
	var AsPageableCollection = __webpack_require__(36);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var BulkImportCollection = PageableCollection.extend({
			url   : window.NzbDrone.ApiRoot + '/movies/bulkimport',
			model : MovieModel,
			mode: "infinite",
			tableName : 'bulkimport',
	
			state : {
				pageSize : 15,
				sortKey: 'sortTitle',
				firstPage: 1
			},
	
			queryParams: {
				totalPages: null,
				totalRecords: null,
				sortKey: "sort",
				order: "direction",
				directions: {
				"-1": "asc",
				"1": "desc"
			}
	  },
	
			// queryParams : {
			// 	totalPages : null,
			// 	totalRecords : null,
			// 	pageSize : 'pageSize',
			// 	sortKey : 'sortKey'
			// },
	
			/*parse : function(response) {
					var self = this;
	
					_.each(response.records, function(model) {
							model.id = undefined;
					});
	
					return response;
			},*/
	
			parseState : function(resp) {
					return { totalRecords : resp.totalRecords };
			},
	
			parseRecords : function(resp) {
					if (resp) {
							return resp.records;
					}
	
					return resp;
			},
	
			fetch : function(options) {
	
				options = options || {};
	
				var data = options.data || {};
	
				if (data.id === undefined || data.folder === undefined) {
					data.id = this.folderId;
					data.folder = this.folder;
				}
	
				options.data = data;
	
				return PageableCollection.prototype.fetch.call(this, options);
			},
	
			parseLinks : function(options) {
				console.log(options);
				return {
					first : this.url,
					next: this.url,
					last : this.url
				};
			}
	});
	
	
	BulkImportCollection = AsSortedCollection.call(BulkImportCollection);
	BulkImportCollection = AsPageableCollection.call(BulkImportCollection);
	BulkImportCollection = AsPersistedStateCollection.call(BulkImportCollection);
	
	module.exports = BulkImportCollection;


/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	var QualityCellEditor = __webpack_require__(126);
	
	module.exports = TemplatedCell.extend({
			className : 'quality-cell',
			template  : 'AddMovies/BulkImport/QualityCellTemplate',
			editor    : QualityCellEditor
	});


/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var NzbDroneCell = __webpack_require__(94);
	var CommandController = __webpack_require__(84);
	
	module.exports = NzbDroneCell.extend({
			className : 'tmdbId-cell',
	
	        // would like to use change with a _.debounce eventually
	        events : {
	            'blur input.tmdbId-input' : '_updateId'
	        },
	
	        render : function() {
	            this.$el.empty();
	
	            this.$el.html('<i class="icon-radarr-info hidden"></i><input type="text" class="x-tmdbId tmdbId-input form-control" value="' + this.cellValue.get('tmdbId') + '" />');
	
	            return this;
	        },
	
	        _updateId : function() {
	            var field = this.$el.find('.x-tmdbId');
	            var data = field.val();
	
	            var promise = $.ajax({
	                url  : window.NzbDrone.ApiRoot + '/movie/lookup/tmdb?tmdbId=' + data,
	                type : 'GET',
	            });
	
							//field.spinForPromise(promise);
	
	            field.prop("disabled", true);
	
	            var icon = this.$(".icon-radarr-info");
	
	            icon.removeClass("hidden");
	
	            icon.spinForPromise(promise);
	            var _self = this;
	            var cacheMonitored = this.model.get('monitored');
	            var cacheProfile = this.model.get("profileId");
	            var cachePath = this.model.get("path");
	            var cacheFile = this.model.get("movieFile");
	            var cacheRoot = this.model.get("rootFolderPath");
	
	            promise.success(function(response) {
	                _self.model.set(response);
	                _self.model.set('monitored', cacheMonitored); //reset to the previous monitored value
	                _self.model.set('profileId', cacheProfile);
	                _self.model.set('path', cachePath);
	                _self.model.set('movieFile', cacheFile); // may be unneccessary.
	                field.prop("disabled", false);
	            });
	
	            promise.error(function(request, status, error) {
	                console.error("Status: " + status, "Error: " + error);
	                field.prop("disabled", false);
	            });
	        }
	});


/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var SelectAllCell = __webpack_require__(313);
	var Backgrid = __webpack_require__(78);
	var FullMovieCollection = __webpack_require__(61);
	
	
	module.exports = SelectAllCell.extend({
	    _originalRender : SelectAllCell.prototype.render,
	
	    _originalInit : SelectAllCell.prototype.initialize,
	
	    initialize : function() {
	        this._originalInit.apply(this, arguments);
	
	        this._refreshIsDuplicate();
	
	        this.listenTo(this.model, 'change', this._refresh);
	    },
	
	    onChange : function(e) {
	        if(!this.isDuplicate) {
	            var checked = $(e.target).prop('checked');
	            this.$el.parent().toggleClass('selected', checked);
	            this.model.trigger('backgrid:selected', this.model, checked);
	        } else {
	            $(e.target).prop('checked', false);
	        }
	    },
	
	    render : function() {
	        this._originalRender.apply(this, arguments);
	
	        this.$el.children(':first').prop('disabled', this.isDuplicate);
	
	        return this;
	    },
	
	    _refresh: function() {
	        this._refreshIsDuplicate();
	        this.render();
	    },
	
	    _refreshIsDuplicate: function() {
	        var tmdbId = this.model.get('tmdbId');
	        var existingMovie = FullMovieCollection.where({ tmdbId: tmdbId });
	        this.isDuplicate = existingMovie.length > 0 ? true : false;
	    }
	});


/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var ProfileCollection = __webpack_require__(41);
	var Config = __webpack_require__(33);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var TemplatedCell = __webpack_require__(93);
	var NzbDroneCell = __webpack_require__(94);
	var Marionette = __webpack_require__(11);
	
	module.exports = TemplatedCell.extend({
	    className : 'profile-cell',
	    template  : 'AddMovies/BulkImport/BulkImportProfileCell',
	
	    _orig : TemplatedCell.prototype.initialize,
	    _origRender : TemplatedCell.prototype.initialize,
	
	    ui : {
	      profile : ".x-profile",
	    },
	
	    events: { "change .x-profile" : "_profileChanged" },
	
	    initialize : function () {
	        this._orig.apply(this, arguments);
	
	        this.listenTo(vent, Config.Events.ConfigUpdatedEvent, this._onConfigUpdated);
	
	        this.defaultProfile = Config.getValue(Config.Keys.DefaultProfileId);
	        if(ProfileCollection.get(this.defaultProfile))
	        {
	            this.profile = this.defaultProfile;
	            this.$(".x-profile").val(this.defaultProfile);
	            this.model.set("profileId", this.defaultProfile);
	        } else {
	            this.profile = 1;
	            this.$(".x-profile").val(1);
	            this.model.set("profileId", 1);
	        }
	
	        this.cellValue = ProfileCollection;
	
	
	        //this.render();
	        //this.listenTo(ProfileCollection, 'sync', this.render);
	
	    },
	
	    _profileChanged : function() {
	      Config.setValue(Config.Keys.DefaultProfileId, this.$(".x-profile").val());
	      this.model.set("profileId", this.$(".x-profile").val());
	    },
	
	    _onConfigUpdated : function(options) {
	      if (options.key === Config.Keys.DefaultProfileId) {
	        this.defaultProfile = options.value;
	        this.$(".x-profile").val(this.defaultProfile);
	        //
	        //this.render();
	          //this.ui.profile.val(options.value);
	      }
	    },
	
	    render : function() {
	      var templateName = this.column.get('template') || this.template;
	
	      this.cellValue = ProfileCollection;
	
	      this.templateFunction = Marionette.TemplateCache.get(templateName);
	      this.$el.empty();
	
	      if (this.cellValue) {
	          var data = this.cellValue.toJSON();
	          var html = this.templateFunction(data);
	          this.$el.html(html);
	      }
	
	      this.delegateEvents();
	      this.$(".x-profile").val(this.defaultProfile);
	      return this;
	    }
	
	});


/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	var Config = __webpack_require__(33);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var TemplatedCell = __webpack_require__(93);
	var NzbDroneCell = __webpack_require__(94);
	var Marionette = __webpack_require__(11);
	
	module.exports = TemplatedCell.extend({
	    className : 'monitor-cell',
	    template  : 'AddMovies/BulkImport/BulkImportMonitorCell',
	
	    _orig : TemplatedCell.prototype.initialize,
	    _origRender : TemplatedCell.prototype.initialize,
	
	    ui : {
	      monitor : ".x-monitor",
	    },
	
	    events: { "change .x-monitor" : "_monitorChanged" },
	
	    initialize : function () {
	        this._orig.apply(this, arguments);
	
	        this.listenTo(vent, Config.Events.ConfigUpdatedEvent, this._onConfigUpdated);
	
	        this.defaultMonitor = Config.getValue(Config.Keys.MonitorEpisodes, 'all');
	
	        this.model.set('monitored', this._convertMonitorToBool(this.defaultMonitor));
	
	        this.$el.find('.x-monitor').val(this.defaultMonitor);
	        // this.ui.monitor.val(this.defaultProfile);//this.ui.profile.val(this.defaultProfile);
	        // this.model.set("profileId", this.defaultProfile);
	
	        // this.cellValue = ProfileCollection;
	
	
	        //this.render();
	        //this.listenTo(ProfileCollection, 'sync', this.render);
	
	    },
	
	    _convertMonitorToBool : function(monitorString) {
	        return monitorString === 'all' ? true : false;
	    },
	
	    _monitorChanged : function() {
	      Config.setValue(Config.Keys.MonitorEpisodes, this.$el.find('.x-monitor').val());
	      this.defaultMonitor = this.$el.find('.x-monitor').val();
	      this.model.set("monitored", this._convertMonitorToBool(this.$el.find('.x-monitor').val()));
	    },
	
	    _onConfigUpdated : function(options) {
	      if (options.key === Config.Keys.MonitorEpisodes) {
	        this.$el.find('.x-monitor').val(options.value);
	      }
	    },
	
	    render : function() {
	      var templateName = this.column.get('template') || this.template;
	
	    //   this.cellValue = ProfileCollection;
	
	      this.templateFunction = Marionette.TemplateCache.get(templateName);
	      this.$el.empty();
	
	      if (this.cellValue) {
	          var data = this.cellValue.toJSON();
	          var html = this.templateFunction(data);
	          this.$el.html(html);
	      }
	
	      this.delegateEvents();
	
	      this.$el.find('.x-monitor').val(this.defaultMonitor);
	
	      return this;
	    }
	
	});


/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
			className : 'movie-title-cell',
			template  : 'AddMovies/BulkImport/MoviePathTemplate',
	
	});


/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
			template : 'AddMovies/BulkImport/EmptyViewTemplate',
	
	
			initialize : function (options) {
				this.templateHelpers = {};
				this.templateHelpers.folder = options.folder;
			}
	});


/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	var Backgrid = __webpack_require__(78);
	var MissingLayout = __webpack_require__(388);
	var CutoffUnmetLayout = __webpack_require__(391);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Wanted/WantedLayoutTemplate',
	
	    regions : {
	        content : '#content'
	        //missing    : '#missing',
	        //cutoff     : '#cutoff'
	    },
	
	    ui : {
	        missingTab : '.x-missing-tab',
	        cutoffTab  : '.x-cutoff-tab'
	    },
	
	    events : {
	        'click .x-missing-tab' : '_showMissing',
	        'click .x-cutoff-tab'  : '_showCutoffUnmet'
	    },
	
	    initialize : function(options) {
	        if (options.action) {
	            this.action = options.action.toLowerCase();
	        }
	    },
	
	    onShow : function() {
	        switch (this.action) {
	            case 'cutoff':
	                this._showCutoffUnmet();
	                break;
	            default:
	                this._showMissing();
	        }
	    },
	
	    _navigate : function(route) {
	        Backbone.history.navigate(route, {
	            trigger : false,
	            replace : true
	        });
	    },
	
	    _showMissing : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.content.show(new MissingLayout());
	        this.ui.missingTab.tab('show');
	        this._navigate('/wanted/missing');
	    },
	
	    _showCutoffUnmet : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.content.show(new CutoffUnmetLayout());
	        this.ui.cutoffTab.tab('show');
	        this._navigate('/wanted/cutoff');
	    }
	});

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var MissingCollection = __webpack_require__(389);
	var SelectAllCell = __webpack_require__(313);
	var MovieTitleCell = __webpack_require__(96);
	var RelativeDateCell = __webpack_require__(95);
	var MovieStatusWithTextCell = __webpack_require__(390);
	var GridPager = __webpack_require__(104);
	var ToolbarLayout = __webpack_require__(108);
	var LoadingView = __webpack_require__(120);
	var Messenger = __webpack_require__(52);
	var CommandController = __webpack_require__(84);
	
	__webpack_require__(314);
	__webpack_require__(37);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Wanted/Missing/MissingLayoutTemplate',
	
	    regions : {
	        missing : '#x-missing',
	        toolbar : '#x-toolbar',
	        pager   : '#x-pager'
	    },
	
	    ui : {
	        searchSelectedButton : '.btn i.icon-radarr-search'
	    },
	
	    columns : [
	        {
	            name       : '',
	            cell       : SelectAllCell,
	            headerCell : 'select-all',
	            sortable   : false
	        },
	        {
	            name      : 'title',
	            label     : 'Title',
	            cell      : MovieTitleCell,
	            cellValue : 'this',
	        },
	        {
	            name  : 'inCinemas',
	            label : 'In Cinemas',
	            cell  : RelativeDateCell
	        },
	        {
	            name  : 'physicalRelease',
	            label : 'Physical Release',
	            cell  : RelativeDateCell
	        },
	        {
	            name     : 'status',
	            label    : 'Status',
	            cell     : MovieStatusWithTextCell,
	            sortable : false
	        },
	
	    ],
	
	    initialize : function() {
	        this.collection = new MissingCollection().bindSignalR({ updateOnly : true });
	
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onShow : function() {
	        this.missing.show(new LoadingView());
	        this._showToolbar();
	        this.collection.fetch();
	    },
	
	    _showTable : function() {
	        this.missingGrid = new Backgrid.Grid({
	            columns    : this.columns,
	            collection : this.collection,
	            className  : 'table table-hover'
	        });
	
	        this.missing.show(this.missingGrid);
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : this.collection
	        }));
	    },
	
	    _showToolbar    : function() {
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            collapse   : true,
	            items      : [
	                {
	                    title        : 'Search Selected',
	                    icon         : 'icon-radarr-search',
	                    callback     : this._searchSelected,
	                    ownerContext : this,
	                    className    : 'x-search-selected'
	                },
	                {
	                    title        : 'Search All',
	                    icon         : 'icon-radarr-search',
	                    callback     : this._searchMissing,
	                    ownerContext : this,
	                    className    : 'x-search-missing'
	                },
	                {
	                    title        : 'Toggle Selected',
	                    icon         : 'icon-radarr-monitored',
	                    tooltip      : 'Toggle monitored status of selected',
	                    callback     : this._toggleMonitoredOfSelected,
	                    ownerContext : this,
	                    className    : 'x-unmonitor-selected'
	                },
	                {
	                    title      : 'Rescan Drone Factory Folder',
	                    icon       : 'icon-radarr-refresh',
	                    command    : 'downloadedMoviesScan',
	                    properties : { sendUpdates : true }
	                },
	                {
	                    title        : 'Manual Import',
	                    icon         : 'icon-radarr-search-manual',
	                    callback     : this._manualImport,
	                    ownerContext : this
	                }
	            ]
	        };
	
	        var filterOptions = {
	            type          : 'radio',
	            storeState    : false,
	            menuKey       : 'wanted.filterMode',
	            defaultAction : 'monitored',
	            items         : [
	        		{
	        	 	    key      : 'all',
	        		    title    : '',
	        		    tooltip  : 'All',
	        		    icon     : 'icon-radarr-all',
	        		    callback : this._setFilter
	        		},
	        		{
	        	        key      : 'available',
	        		    title    : '',
	        		    tooltip  : 'Available & Monitored',
	        		    icon     : 'icon-radarr-available',
	        		    callback : this._setFilter
	        		},
	                {
	                    key      : 'monitored',
	                    title    : '',
	                    tooltip  : 'Monitored Only',
	                    icon     : 'icon-radarr-monitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'unmonitored',
	                    title    : '',
	                    tooltip  : 'Unmonitored Only',
	                    icon     : 'icon-radarr-unmonitored',
	                    callback : this._setFilter
	                },
	    		    {
	    			    key      : 'announced',
	    			    title    : '',
	    			    tooltip  : 'Announced Only',
	    			    icon     : 'icon-radarr-movie-announced',
	    			    callback : this._setFilter
	    		    },
	    	            {     
	    			    key      : 'incinemas',
	    			    title    : '',
	    			    tooltip  : 'In Cinemas Only',
	    			    icon     : 'icon-radarr-movie-cinemas',
	    			    callback : this._setFilter
	    		    },
	    		    {
	    			    key      : 'released',
	    			    title    : '',
	    			    tooltip  : 'Released Only',
	    			    icon     : 'icon-radarr-movie-released',
	    			    callback : this._setFilter
	    		    }
	    		]
	        };
	        this.toolbar.show(new ToolbarLayout({
	            left    : [leftSideButtons],
	            right   : [filterOptions],
	            context : this
	        }));
	        CommandController.bindToCommand({
	            element : this.$('.x-search-selected'),
	            command : { name : 'moviesSearch' }
	        });
	        CommandController.bindToCommand({
	            element : this.$('.x-search-missing'),
	            command : { name : 'missingMoviesSearch' }
	        });
	    },
	
	    _setFilter      : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.setFilterMode(mode);
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _searchSelected : function() {
	        var selected = this.missingGrid.getSelectedModels();
	        if (selected.length === 0) {
	            Messenger.show({
	                type    : 'error',
	                message : 'No movies selected'
	            });
	            return;
	        }
	        var ids = _.pluck(selected, 'id');
	        CommandController.Execute('moviesSearch', {
	            name       : 'moviesSearch',
	            movieIds : ids
	        });
	    },
	    _searchMissing  : function() {
	        if (window.confirm('Are you sure you want to search for {0} filtered missing movies?'.format(this.collection.state.totalRecords) +
	                           'One API request to each indexer will be used for each movie. ' + 'This cannot be stopped once started.')) {
	            CommandController.Execute('missingMoviesSearch', { name : 'missingMoviesSearch',
		                                                       filterKey : this.collection.state.filterKey,
		   						       filterValue : this.collection.state.filterValue });
	        }
	    },
	    _toggleMonitoredOfSelected : function() {
	        var selected = this.missingGrid.getSelectedModels();
	
	        if (selected.length === 0) {
	            Messenger.show({
	                type    : 'error',
	                message : 'No movies selected'
	            });
	            return;
	        }
	
	        var promises = [];
	        var self = this;
	
	        _.each(selected, function (episode) {
	            episode.set('monitored', !episode.get('monitored'));
	            promises.push(episode.save());
	        });
	
	        $.when(promises).done(function () {
	            self.collection.fetch();
	        });
	    },
	    _manualImport : function () {
	        vent.trigger(vent.Commands.ShowManualImport);
	    }
	});


/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var MovieModel = __webpack_require__(31);
	var PagableCollection = __webpack_require__(29);
	var AsFilteredCollection = __webpack_require__(63);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var Collection = PagableCollection.extend({
	    url       : window.NzbDrone.ApiRoot + '/wanted/missing',
	    model     : MovieModel,
	    tableName : 'wanted.missing',
	
	    state : {
	        pageSize : 50,
	        sortKey  : 'title',
	        order    : -1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	    filterModes : {
	        'monitored'   : [
	            'monitored',
	            'true'
	        ],
	        'unmonitored' : [
	            'monitored',
	            'false'
	        ],
	    	'announced' : [
	    		'status',
	    		'announced'
	    	],
	    	'incinemas' : [
	    		'status',
	    		'inCinemas'
	    	],
	    	'released' : [
	    		'status',
	    		'released'
	    	],
	    	'available' : [
	    		'status',
	    		'available'
	    	],
	    	'all' : [
	    		'all',
	    		'all'
	    	]
	    },
	
	    parseState : function(resp) {
	        return { totalRecords : resp.totalRecords };
	    },
	
	    parseRecords : function(resp) {
	        if (resp) {
	            return resp.records;
	        }
	
	        return resp;
	    }
	});
	Collection = AsFilteredCollection.call(Collection);
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = AsPersistedStateCollection.call(Collection);


/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	//used in Wanted tab
	module.exports = NzbDroneCell.extend({
	    className : 'movie-status-text-cell',
	
	    render : function() {
	        this.$el.empty();
	        var monitored = this.model.get('monitored');
	        var status = this.model.get('status');
	        var inCinemas = this.model.get("inCinemas");
	        var date = new Date(inCinemas);
	        var timeSince = new Date().getTime() - date.getTime();
	        var numOfMonths = timeSince / 1000 / 60 / 60 / 24 / 30;
	
	        if (status === 'released') {
	            this.$el.html('<div class="released-banner"><i class="icon-radarr-movie-released grid-icon" title=""></i>&nbsp;Released</div>');
	            this._setStatusWeight(3);
	        }
	
	        if (status ==='inCinemas') {
	            this.$el.html('<div class="cinemas-banner"><i class="icon-radarr-movie-cinemas grid-icon" title=""></i>&nbsp;In Cinemas</div>');
	            this._setStatusWeight(2);
	        }
	
	        if (status === "announced") {
	            this.$el.html('<div class="announced-banner"><i class="icon-radarr-movie-announced grid-icon" title=""></i>&nbsp;Announced</div>');
	            this._setStatusWeight(1);
	        }
	
	        return this;
	    },
	
	    _setStatusWeight : function(weight) {
	        this.model.set('statusWeight', weight, { silent : true });
	    }
	});


/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var CutoffUnmetCollection = __webpack_require__(392);
	var SelectAllCell = __webpack_require__(313);
	var MovieTitleCell = __webpack_require__(96);
	var DownloadedQualityCell = __webpack_require__(102);
	var MovieStatusWithTextCell = __webpack_require__(390);
	var RelativeDateCell = __webpack_require__(95);
	var GridPager = __webpack_require__(104);
	var ToolbarLayout = __webpack_require__(108);
	var LoadingView = __webpack_require__(120);
	var Messenger = __webpack_require__(52);
	var CommandController = __webpack_require__(84);
	
	__webpack_require__(314);
	__webpack_require__(37);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Wanted/Cutoff/CutoffUnmetLayoutTemplate',
	
	    regions : {
	        cutoff  : '#x-cutoff-unmet',
	        toolbar : '#x-toolbar',
	        pager   : '#x-pager'
	    },
	
	    ui : {
	        searchSelectedButton : '.btn i.icon-radarr-search'
	    },
	
	    columns : [
	        {
	            name       : '',
	            cell       : SelectAllCell,
	            headerCell : 'select-all',
	            sortable   : false
	        },
	        {
	            name      : 'title',
	            label     : 'Title',
	            cell      : MovieTitleCell,
	            cellValue : 'this',
	        },
	        {
	          name : "movieFile.quality",
	          label : "Downloaded", 
	          cell : DownloadedQualityCell,
	          sortable : true
	        },
	        {
	            name      : 'inCinemas',
	            label     : 'In Cinemas',
	            cell      : RelativeDateCell
	        },
	        {
	            name      : 'physicalRelease',
	            label     : 'Physical Release',
	            cell      : RelativeDateCell
	        },
	        {
	            name     : 'status',
	            label    : 'Status',
	            cell     : MovieStatusWithTextCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new CutoffUnmetCollection().bindSignalR({ updateOnly : true });
	
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onShow : function() {
	        this.cutoff.show(new LoadingView());
	        this._showToolbar();
	        this.collection.fetch();
	    },
	
	    _showTable : function() {
	        this.cutoffGrid = new Backgrid.Grid({
	            columns    : this.columns,
	            collection : this.collection,
	            className  : 'table table-hover'
	        });
	
	        this.cutoff.show(this.cutoffGrid);
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : this.collection
	        }));
	    },
	
	    _showToolbar : function() {
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            collapse: true,
	            items      : [
	                {
	                    title        : 'Search Selected',
	                    icon         : 'icon-radarr-search',
	                    callback     : this._searchSelected,
	                    ownerContext : this,
	                    className    : 'x-search-selected'
	                },
	                {
	                    title        : 'Search All',
	                    icon         : 'icon-radarr-search',
	                    callback     : this._searchMissing,
	                    ownerContext : this,
	                    className    : 'x-search-cutoff'
	                },
	            ]
	        };
	
	        var filterOptions = {
	            type          : 'radio',
	            storeState    : false,
	            menuKey       : 'wanted.filterMode',
	            defaultAction : 'monitored',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'available',
	                    title    : '',
	                    tooltip  : 'Available & Monitored',
	                    icon     : 'icon-radarr-available',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'monitored',
	                    title    : '',
	                    tooltip  : 'Monitored Only',
	                    icon     : 'icon-radarr-monitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'unmonitored',
	                    title    : '',
	                    tooltip  : 'Unmonitored Only',
	                    icon     : 'icon-radarr-unmonitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'announced',
	                    title    : '',
	                    tooltip  : 'Announced Only',
	                    icon     : 'icon-radarr-movie-announced',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'incinemas',
	                    title    : '',
	                    tooltip  : 'In Cinemas Only',
	                    icon     : 'icon-radarr-movie-cinemas',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'released',
	                    title    : '',
	                    tooltip  : 'Released Only',
	                    icon     : 'icon-radarr-movie-released',
	                    callback : this._setFilter
	                }
	        ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            left    : [
	                leftSideButtons
	            ],
	            right   : [
	                filterOptions
	            ],
	            context : this
	        }));
	
	        CommandController.bindToCommand({
	            element  : this.$('.x-search-selected'),
	            command  : {
	                name : 'moviesSearch'
	            }
	        });
	
	        CommandController.bindToCommand({
	            element : this.$('.x-search-cutoff'),
	            command : { name : 'cutOffUnmetMoviesSearch' }
	        });
	    },
	
	    _setFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.setFilterMode(mode);
	
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _searchSelected : function() {
	        var selected = this.cutoffGrid.getSelectedModels();
	
	        if (selected.length === 0) {
	            Messenger.show({
	                type    : 'error',
	                message : 'No movies selected'
	            });
	
	            return;
	        }
	
	        var ids = _.pluck(selected, 'id');
	
	        CommandController.Execute('moviesSearch', {
	            name       : 'moviesSearch',
	            movieIds : ids
	        });
	    },
	
	    _searchMissing  : function() {
	        if (window.confirm('Are you sure you want to search for {0} filtered missing movies? '.format(this.collection.state.totalRecords) +
	                           'One API request to each indexer will be used for each movie. ' + 'This cannot be stopped once started.')) {
	            CommandController.Execute('cutOffUnmetMoviesSearch', { name : 'cutOffUnmetMoviesSearch',
	                                                           filterKey : this.collection.state.filterKey,
	                                   filterValue : this.collection.state.filterValue });
	        }
	    },
	});


/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var MovieModel = __webpack_require__(31);
	var PagableCollection = __webpack_require__(29);
	var AsFilteredCollection = __webpack_require__(63);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var Collection = PagableCollection.extend({
	    url       : window.NzbDrone.ApiRoot + '/wanted/cutoff',
	    model     : MovieModel,
	    tableName : 'wanted.cutoff',
	
	    state : {
	        pageSize : 50,
	        sortKey  : 'title',
	        order    : -1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	
	    filterModes : {
	        'monitored'   : [
	            'monitored',
	            'true'
	        ],
	        'unmonitored' : [
	            'monitored',
	            'false'
	        ],
	        'announced' : [
	            'status',
	            'announced'
	        ],
	        'incinemas' : [
	            'status',
	            'inCinemas'
	        ],
	        'released' : [
	            'status',
	            'released'
	        ],
	        'available' : [
	            'status',
	            'available'
	        ],
	        'all' : [
	            'all',
	            'all'
	        ]
	    },
	
	
	    parseState : function(resp) {
	        return { totalRecords : resp.totalRecords };
	    },
	
	    parseRecords : function(resp) {
	        if (resp) {
	            return resp.records;
	        }
	
	        return resp;
	    }
	});
	
	Collection = AsFilteredCollection.call(Collection);
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = AsPersistedStateCollection.call(Collection);


/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var UpcomingCollectionView = __webpack_require__(394);
	var CalendarView = __webpack_require__(397);
	var CalendarFeedView = __webpack_require__(401);
	var ToolbarLayout = __webpack_require__(108);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Calendar/CalendarLayoutTemplate',
	
	    regions : {
	        upcoming : '#x-upcoming',
	        calendar : '#x-calendar',
	        toolbar  : '#x-toolbar'
	    },
	
	    onShow : function() {
	        this._showUpcoming();
	        this._showCalendar();
	        this._showToolbar();
	    },
	
	    _showUpcoming : function() {
	        this.upcomingView = new UpcomingCollectionView();
	        this.upcoming.show(this.upcomingView);
	    },
	
	    _showCalendar : function() {
	        this.calendarView = new CalendarView();
	        this.calendar.show(this.calendarView);
	    },
	
	    _showiCal : function() {
	        var view = new CalendarFeedView();
	        AppLayout.modalRegion.show(view);
	    },
	
	    _showToolbar    : function() {
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            items      : [
	                {
	                    title        : 'Get iCal Link',
	                    icon         : 'icon-radarr-calendar-o',
	                    callback     : this._showiCal,
	                    ownerContext : this
	                }
	            ]
	        };
	
	        var filterOptions = {
	            type          : 'radio',
	            storeState    : true,
	            menuKey       : 'calendar.show',
	            defaultAction : 'monitored',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setCalendarFilter
	                },
	                {
	                    key      : 'monitored',
	                    title    : '',
	                    tooltip  : 'Monitored Only',
	                    icon     : 'icon-radarr-monitored',
	                    callback : this._setCalendarFilter
	                }
	            ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            left          : [leftSideButtons],
	            right         : [filterOptions],
	            context       : this,
	            floatOnMobile : true
	        }));
	    },
	
	    _setCalendarFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	
	        if (mode === 'all') {
	            this.calendarView.setShowUnmonitored(true);
	            this.upcomingView.setShowUnmonitored(true);
	        }
	
	        else {
	            this.calendarView.setShowUnmonitored(false);
	            this.upcomingView.setShowUnmonitored(false);
	        }
	    }
	});

/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var UpcomingCollection = __webpack_require__(395);
	var UpcomingItemView = __webpack_require__(396);
	var Config = __webpack_require__(33);
	__webpack_require__(37);
	
	module.exports = Marionette.CollectionView.extend({
	    itemView : UpcomingItemView,
	
	    initialize : function() {
	        this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
	        this.collection = new UpcomingCollection().bindSignalR({ updateOnly : true });
	        this._fetchCollection();
	
	        this._fetchCollection = _.bind(this._fetchCollection, this);
	        this.timer = window.setInterval(this._fetchCollection, 60 * 60 * 1000);
	    },
	
	    onClose : function() {
	        window.clearInterval(this.timer);
	    },
	
	    setShowUnmonitored : function (showUnmonitored) {
	        if (this.showUnmonitored !== showUnmonitored) {
	            this.showUnmonitored = showUnmonitored;
	            this._fetchCollection();
	        }
	    },
	
	    _fetchCollection : function() {
	        this.collection.fetch({ data: { unmonitored : this.showUnmonitored }});
	    }
	});

/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var moment = __webpack_require__(17);
	var MovieModel = __webpack_require__(31);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/calendar',
	    model : MovieModel,
	
	    comparator : function(model1, model2) {
	
	        var airDate1 = model1.get('inCinemas');
	        var airDate2 = model2.get('inCinemas');
	        var status1 = model1.get('status');
	        var status2 = model2.get('status');
	
	        if (status1 === 'inCinemas') {
	            airDate1 = model1.get('physicalRelease');
	        }
	
	        if (status2 === 'inCinemas') {
	            airDate2 = model2.get('physicalRelease');
	        }
	
	        var date1 = moment(airDate1);
	        var time1 = date1.unix();
	
	        var date2 = moment(airDate2);
	        var time2 = date2.unix();
	
	        if (time1 < time2) {
	            return -1;
	        }
	
	        if (time1 > time2) {
	            return 1;
	        }
	
	        return 0;
	    }
	});


/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var moment = __webpack_require__(17);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Calendar/UpcomingItemViewTemplate',
	    tagName  : 'div',
	
	    initialize : function() {
	        this.listenTo(this.model, 'change', this.render);
	    }
	});


/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AppLayout = __webpack_require__(68);
	var moment = __webpack_require__(17);
	var CalendarCollection = __webpack_require__(398);
	var UiSettings = __webpack_require__(22);
	var QueueCollection = __webpack_require__(28);
	var MoviesDetailsLayout = __webpack_require__(117);
	var Config = __webpack_require__(33);
	
	__webpack_require__(37);
	__webpack_require__(399);
	__webpack_require__(400);
	
	module.exports = Marionette.ItemView.extend({
			storageKey : 'calendar.view',
	
			initialize : function() {
					this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
					this.collection = new CalendarCollection().bindSignalR({ updateOnly : true });
					this.listenTo(this.collection, 'change', this._reloadCalendarEvents);
					this.listenTo(QueueCollection, 'sync', this._reloadCalendarEvents);
			},
	
			render : function() {
					this.$el.empty().fullCalendar(this._getOptions());
			},
	
			onShow : function() {
					this.$('.fc-today-button').click();
			},
	
			setShowUnmonitored : function (showUnmonitored) {
					if (this.showUnmonitored !== showUnmonitored) {
							this.showUnmonitored = showUnmonitored;
							this._getEvents(this.$el.fullCalendar('getView'));
					}
			},
	
			_viewRender : function(view, element) {
					if (Config.getValue(this.storageKey) !== view.name) {
							Config.setValue(this.storageKey, view.name);
					}
	
					this._getEvents(view);
					element.find('.fc-day-grid-container').css('height', '');
			},
	
			_eventRender : function(event, element) {
					element.addClass(event.statusLevel);
					element.children('.fc-content').addClass(event.statusLevel);
	
					if (event.downloading) {
							var progress = 100 - event.downloading.get('sizeleft') / event.downloading.get('size') * 100;
							var releaseTitle = event.downloading.get('title');
							var estimatedCompletionTime = moment(event.downloading.get('estimatedCompletionTime')).fromNow();
							var status = event.downloading.get('status').toLocaleLowerCase();
							var errorMessage = event.downloading.get('errorMessage');
	
							if (status === 'pending') {
									this._addStatusIcon(element, 'icon-radarr-pending', 'Release will be processed {0}'.format(estimatedCompletionTime));
							}
	
							else if (errorMessage) {
									if (status === 'completed') {
											this._addStatusIcon(element, 'icon-radarr-import-failed', 'Import failed: {0}'.format(errorMessage));
									} else {
											this._addStatusIcon(element, 'icon-radarr-download-failed', 'Download failed: {0}'.format(errorMessage));
									}
							}
	
							else if (status === 'failed') {
									this._addStatusIcon(element, 'icon-radarr-download-failed', 'Download failed: check download client for more details');
							}
	
							else if (status === 'warning') {
									this._addStatusIcon(element, 'icon-radarr-download-warning', 'Download warning: check download client for more details');
							}
	
							else {
									element.find('.fc-time').after('<span class="chart pull-right" data-percent="{0}"></span>'.format(progress));
	
									element.find('.chart').easyPieChart({
											barColor   : '#ffffff',
											trackColor : false,
											scaleColor : false,
											lineWidth  : 2,
											size       : 14,
											animate    : false
									});
	
									element.find('.chart').tooltip({
											title     : 'Movie is downloading - {0}% {1}'.format(progress.toFixed(1), releaseTitle),
											container : '.fc'
									});
							}
					}
	
					else if (event.model.get('unverifiedSceneNumbering')) {
							this._addStatusIcon(element, 'icon-radarr-form-warning', 'Scene number hasn\'t been verified yet.');
					}
			},
	
			_eventAfterAllRender :  function () {
					if ($(window).width() < 768) {
							this.$('.fc-center').show();
							this.$('.calendar-title').remove();
	
							var title = this.$('.fc-center').html();
							var titleDiv = '<div class="calendar-title">{0}</div>'.format(title);
	
							this.$('.fc-toolbar').before(titleDiv);
							this.$('.fc-center').hide();
					}
	
					this._clearScrollBar();
			},
	
			_windowResize :  function () {
					this._clearScrollBar();
			},
	
			_getEvents : function(view) {
					var start = moment(view.start.toISOString()).toISOString();
					var end = moment(view.end.toISOString()).toISOString();
	
					this.$el.fullCalendar('removeEvents');
	
					this.collection.fetch({
							data    : {
									start       : start,
									end         : end,
									unmonitored : this.showUnmonitored
							},
							success : this._setEventData.bind(this, new Date(start), new Date(end))
					});
			},
	
			_setEventData : function(startD, endD, collection) {
					if (collection.length === 0) {
							return;
					}
	
					var events = [];
					var self = this;
	
					collection.each(function(model) {
							var movieTitle = model.get('title');
							var start = model.get('inCinemas');
							var startDate = new Date(start);
							if (!(startD <= startDate && startDate <= endD)) {
								start = model.get("physicalRelease");
							}
							var runtime = model.get('runtime');
							var end = moment(start).add(runtime, 'minutes').toISOString();
	
							var event = {
									title       : movieTitle,
									start       : moment(start),
									end         : moment(end),
									allDay      : true,
									statusLevel : self._getStatusLevel(model, end),
									downloading : QueueCollection.findMovie(model.get('id')),
									model       : model,
									sortOrder   : 0,
									url			: "movies/" + model.get("titleSlug")
							};
	
							events.push(event);
					});
	
					this.$el.fullCalendar('addEventSource', events);
			},
	
			_getStatusLevel : function(element, endTime) {
					var hasFile = element.get('hasFile');
					var downloading = QueueCollection.findMovie(element.get('id')) || element.get('grabbed');
					var currentTime = moment();
					var start = moment(element.get('inCinemas'));
					var status = element.getStatus().toLowerCase();
					var end = moment(endTime);
					var monitored = element.get('monitored');
	
					var statusLevel = 'primary';
	
					if (hasFile) {
							statusLevel = 'success';
					}
	
					else if (downloading) {
							statusLevel = 'purple';
					}
	
					else if (!monitored) {
							statusLevel = 'unmonitored';
					}
	
					else if (status === "incinemas") {
							statusLevel = 'premiere';
					}
	
					else if (status === "released") {
							statusLevel = 'danger';
					}
	
					else if (status === "announced") {
							statusLevel = 'primary';
					}
	
					if (end.isBefore(currentTime.startOf('day'))) {
							statusLevel += ' past';
					}
	
					return statusLevel;
			},
	
			_reloadCalendarEvents : function() {
					this.$el.fullCalendar('removeEvents');
					var view = this.$el.fullCalendar('getView');
					var start = moment(view.start.toISOString()).toISOString();
					var end = moment(view.end.toISOString()).toISOString();
					this._setEventData(new Date(start), new Date(end), this.collection);
			},
	
			_getOptions    : function() {
					var options = {
							allDayDefault       : true,
							weekMode            : 'variable',
							firstDay            : UiSettings.get('firstDayOfWeek'),
							timeFormat          : 'h(:mm)t',
							viewRender          : this._viewRender.bind(this),
							eventRender         : this._eventRender.bind(this),
							eventAfterAllRender : this._eventAfterAllRender.bind(this),
							windowResize        : this._windowResize.bind(this)
					};
	
					if ($(window).width() < 768) {
							options.defaultView = Config.getValue(this.storageKey, 'listYear');
	
							options.header = {
									left   : 'prev,next today',
									center : 'title',
									right  : 'listYear'
							};
					}
	
					else {
							options.defaultView = Config.getValue(this.storageKey, 'month');
	
							options.header = {
									left   : 'prev,next today',
									center : 'title',
									right  : 'month,listYear'
							};
					}
	
					options.views = {
						month: {
							titleFormat: 'MMMM YYYY',
							columnFormat: 'ddd'
						},
						list: {
							titleFormat: 'L',
							columnFormat: 'L'
						}
					},
	
					options.timeFormat = UiSettings.get('timeFormat');
	
					return options;
			},
	
			_addStatusIcon : function(element, icon, tooltip) {
					element.find('.fc-time').after('<span class="status pull-right"><i class="{0}"></i></span>'.format(icon));
					element.find('.status').tooltip({
							title     : tooltip,
							container : '.fc'
					});
			},
	
			_clearScrollBar : function () {
					// Remove height from calendar so we don't have another scroll bar
					this.$('.fc-day-grid-container').css('height', '');
					this.$('.fc-row.fc-widget-header').attr('style', '');
			}
	});


/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var MovieModel = __webpack_require__(31);
	
	module.exports = Backbone.Collection.extend({
	    url       : window.NzbDrone.ApiRoot + '/calendar',
	    model     : MovieModel,
	    tableName : 'calendar',
	
	    comparator : function(model) {
	        var date = new Date(model.get('inCinemas'));
	        var time = date.getTime();
	        return time;
	    }
	});


/***/ },
/* 399 */,
/* 400 */,
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var StatusModel = __webpack_require__(25);
	__webpack_require__(235);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Calendar/CalendarFeedViewTemplate',
	
	    ui : {
	        includeUnmonitored : '.x-includeUnmonitored',
	        premiersOnly       : '.x-premiersOnly',
	        tags               : '.x-tags',
	        icalUrl            : '.x-ical-url',
	        icalCopy           : '.x-ical-copy',
	        icalWebCal         : '.x-ical-webcal'
	    },
	
	    events : {
	        'click .x-includeUnmonitored' : '_updateUrl',
	        'click .x-premiersOnly'       : '_updateUrl',
	        'click .x-ical-copy'          : '_copyIcalToClipboard',
	        'itemAdded .x-tags'           : '_updateUrl',
	        'itemRemoved .x-tags'         : '_updateUrl'
	    },
	
	    onShow : function() {
	        this._updateUrl();
	        this.ui.tags.tagInput({ allowNew: false });
	    },
	
	    _copyIcalToClipboard: function () {
	        this.ui.icalUrl.select();
	        document.execCommand("copy");
	    },
	
	    _updateUrl : function() {
	        var icalUrl = window.location.host + StatusModel.get('urlBase') + '/feed/calendar/Radarr.ics?';
	
	        if (this.ui.includeUnmonitored.prop('checked')) {
	            icalUrl += 'unmonitored=true&';
	        }
	
	        if (this.ui.premiersOnly.prop('checked')) {
	            icalUrl += 'premiersOnly=true&';
	        }
	
	        if (this.ui.tags.val()) {
	            icalUrl += 'tags=' + this.ui.tags.val() + '&';
	        }
	
	        icalUrl += 'apikey=' + window.NzbDrone.ApiKey;
	
	        var icalHttpUrl = window.location.protocol + '//' + icalUrl;
	        var icalWebCalUrl = 'webcal://' + icalUrl;
	
	        this.ui.icalUrl.attr('value', icalHttpUrl);
	        this.ui.icalWebCal.attr('href', icalWebCalUrl);
	    }
	});


/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var ReleaseCollection = __webpack_require__(153);
	var IndexerCell = __webpack_require__(403);
	var FileSizeCell = __webpack_require__(137);
	var QualityCell = __webpack_require__(125);
	var ApprovalStatusCell = __webpack_require__(138);
	var LoadingView = __webpack_require__(120);
	var EditionCell = __webpack_require__(150);
	var ReleaseTitleCell = __webpack_require__(136);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Release/ReleaseLayoutTemplate',
	
	    regions : {
	        grid    : '#x-grid',
	        toolbar : '#x-toolbar'
	    },
	
	    columns : [
	        {
	          name      : 'edition',
	          label     : 'Edition',
	          sortable  : false,
	          cell      : EditionCell
	        },
	        {
	            name     : 'indexer',
	            label    : 'Indexer',
	            sortable : true,
	            cell     : IndexerCell
	        },
	        {
	            name     : 'title',
	            label    : 'Title',
	            sortable : true,
	            cell     : ReleaseTitleCell
	        },
	        {
	            name     : 'size',
	            label    : 'Size',
	            sortable : true,
	            cell     : FileSizeCell
	        },
	        {
	            name     : 'quality',
	            label    : 'Quality',
	            sortable : true,
	            cell     : QualityCell
	        },
	        {
	            name  : 'rejections',
	            label : '',
	            cell  : ApprovalStatusCell,
	            title : 'Release Rejected'
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new ReleaseCollection();
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onRender : function() {
	        this.grid.show(new LoadingView());
	        this.collection.fetch();
	    },
	
	    _showTable : function() {
	        if (!this.isClosed) {
	            this.grid.show(new Backgrid.Grid({
	                row        : Backgrid.Row,
	                columns    : this.columns,
	                collection : this.collection,
	                className  : 'table table-hover release-table'
	            }));
	        }
	    }
	});


/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'indexer-cell',
	
	    render : function() {
	        var indexer = this.model.get(this.column.get('name'));
	        this.$el.html(indexer);
	        return this;
	    }
	});

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var SystemInfoLayout = __webpack_require__(405);
	var LogsLayout = __webpack_require__(416);
	var UpdateLayout = __webpack_require__(433);
	var BackupLayout = __webpack_require__(439);
	var TaskLayout = __webpack_require__(445);
	var Messenger = __webpack_require__(52);
	var StatusModel = __webpack_require__(25);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/SystemLayoutTemplate',
	
	    regions : {
	        status  : '#status',
	        logs    : '#logs',
	        updates : '#updates',
	        backup  : '#backup',
	        tasks   : '#tasks'
	    },
	
	    ui : {
	        statusTab  : '.x-status-tab',
	        logsTab    : '.x-logs-tab',
	        updatesTab : '.x-updates-tab',
	        backupTab  : '.x-backup-tab',
	        tasksTab   : '.x-tasks-tab'
	    },
	
	    events : {
	        'click .x-status-tab'  : '_showStatus',
	        'click .x-logs-tab'    : '_showLogs',
	        'click .x-updates-tab' : '_showUpdates',
	        'click .x-backup-tab'  : '_showBackup',
	        'click .x-tasks-tab'   : '_showTasks',
	        'click .x-shutdown'    : '_shutdown',
	        'click .x-restart'     : '_restart'
	    },
	
	    initialize : function(options) {
	        if (options.action) {
	            this.action = options.action.toLowerCase();
	        }
	
	        this.templateHelpers = {
	            authentication : StatusModel.get('authentication')
	        };
	    },
	
	    onShow : function() {
	        switch (this.action) {
	            case 'logs':
	                this._showLogs();
	                break;
	            case 'updates':
	                this._showUpdates();
	                break;
	            case 'backup':
	                this._showBackup();
	                break;
	            case 'tasks':
	                this._showTasks();
	                break;
	            default:
	                this._showStatus();
	        }
	    },
	
	    _navigate : function(route) {
	        Backbone.history.navigate(route, {
	            trigger : true,
	            replace : true
	        });
	    },
	
	    _showStatus : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.status.show(new SystemInfoLayout());
	        this.ui.statusTab.tab('show');
	        this._navigate('system/status');
	    },
	
	    _showLogs : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.logs.show(new LogsLayout());
	        this.ui.logsTab.tab('show');
	        this._navigate('system/logs');
	    },
	
	    _showUpdates : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.updates.show(new UpdateLayout());
	        this.ui.updatesTab.tab('show');
	        this._navigate('system/updates');
	    },
	
	    _showBackup : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.backup.show(new BackupLayout());
	        this.ui.backupTab.tab('show');
	        this._navigate('system/backup');
	    },
	
	    _showTasks : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.tasks.show(new TaskLayout());
	        this.ui.tasksTab.tab('show');
	        this._navigate('system/tasks');
	    },
	
	    _shutdown : function() {
	        $.ajax({
	            url  : window.NzbDrone.ApiRoot + '/system/shutdown',
	            type : 'POST'
	        });
	
	        Messenger.show({
	            message : 'Radarr will shutdown shortly',
	            type    : 'info'
	        });
	    },
	
	    _restart : function() {
	        $.ajax({
	            url  : window.NzbDrone.ApiRoot + '/system/restart',
	            type : 'POST'
	        });
	
	        Messenger.show({
	            message : 'Radarr will restart shortly',
	            type    : 'info'
	        });
	    }
	});


/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var AboutView = __webpack_require__(406);
	var DiskSpaceLayout = __webpack_require__(407);
	var HealthLayout = __webpack_require__(411);
	var MoreInfoView = __webpack_require__(415);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Info/SystemInfoLayoutTemplate',
	
	    regions : {
	        about     : '#about',
	        diskSpace : '#diskspace',
	        health    : '#health',
	        moreInfo  : '#more-info'
	    },
	
	    onRender : function() {
	        this.health.show(new HealthLayout());
	        this.diskSpace.show(new DiskSpaceLayout());
	        this.about.show(new AboutView());
	        this.moreInfo.show(new MoreInfoView());
	    }
	});

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var StatusModel = __webpack_require__(25);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Info/About/AboutViewTemplate',
	
	    initialize : function() {
	        this.model = StatusModel;
	    }
	});

/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var DiskSpaceCollection = __webpack_require__(408);
	var LoadingView = __webpack_require__(120);
	var DiskSpacePathCell = __webpack_require__(410);
	var FileSizeCell = __webpack_require__(137);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Info/DiskSpace/DiskSpaceLayoutTemplate',
	
	    regions : {
	        grid : '#x-grid'
	    },
	
	    columns : [
	        {
	            name     : 'path',
	            label    : 'Location',
	            cell     : DiskSpacePathCell,
	            sortable : false
	        },
	        {
	            name     : 'freeSpace',
	            label    : 'Free Space',
	            cell     : FileSizeCell,
	            sortable : false
	        },
	        {
	            name     : 'totalSpace',
	            label    : 'Total Space',
	            cell     : FileSizeCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new DiskSpaceCollection();
	        this.listenTo(this.collection, 'sync', this._showTable);
	    },
	
	    onRender : function() {
	        this.grid.show(new LoadingView());
	    },
	
	    onShow : function() {
	        this.collection.fetch();
	    },
	
	    _showTable : function() {
	        this.grid.show(new Backgrid.Grid({
	            row        : Backgrid.Row,
	            columns    : this.columns,
	            collection : this.collection,
	            className  : 'table table-hover'
	        }));
	    }
	});

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var DiskSpaceModel = __webpack_require__(409);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/diskspace',
	    model : DiskSpaceModel
	});

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'disk-space-path-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var path = this.model.get('path');
	        var label = this.model.get('label');
	
	        var contents = path;
	
	        if (label) {
	            contents += ' ({0})'.format(label);
	        }
	
	        this.$el.html(contents);
	
	        return this;
	    }
	});

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var HealthCollection = __webpack_require__(57);
	var HealthCell = __webpack_require__(412);
	var HealthWikiCell = __webpack_require__(413);
	var HealthOkView = __webpack_require__(414);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Info/Health/HealthLayoutTemplate',
	
	    regions : {
	        grid : '#x-health-grid'
	    },
	
	    columns : [
	        {
	            name     : 'type',
	            label    : '',
	            cell     : HealthCell,
	            sortable : false
	        },
	        {
	            name     : 'message',
	            label    : 'Message',
	            cell     : 'string',
	            sortable : false
	        },
	        {
	            name     : 'wikiUrl',
	            label    : '',
	            cell     : HealthWikiCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function() {
	        this.listenTo(HealthCollection, 'sync', this.render);
	        HealthCollection.fetch();
	    },
	
	    onRender : function() {
	        if (HealthCollection.length === 0) {
	            this.grid.show(new HealthOkView());
	        } else {
	            this._showTable();
	        }
	    },
	
	    _showTable : function() {
	        this.grid.show(new Backgrid.Grid({
	            row        : Backgrid.Row,
	            columns    : this.columns,
	            collection : HealthCollection,
	            className  : 'table table-hover'
	        }));
	    }
	});

/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'log-level-cell',
	
	    render : function() {
	        var level = this._getValue();
	        this.$el.html('<i class="icon-radarr-health-{0}" title="{1}"/>'.format(this._getValue().toLowerCase(), level));
	
	        return this;
	    }
	});

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.UriCell.extend({
	    className : 'wiki-link-cell',
	
	    title : 'Read the Wiki for more information',
	
	    text : 'Wiki',
	
	    render : function() {
	        this.$el.empty();
	        var rawValue = this.model.get(this.column.get('name'));
	        var formattedValue = this.formatter.fromRaw(rawValue, this.model);
	        this.$el.append($('<a>', {
	            tabIndex : -1,
	            href     : rawValue,
	            title    : this.title || formattedValue,
	            target   : this.target
	        }).text(this.text));
	        this.delegateEvents();
	        return this;
	    }
	});

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Info/Health/HealthOkViewTemplate'
	});

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Info/MoreInfo/MoreInfoViewTemplate'
	});

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var LogsTableLayout = __webpack_require__(417);
	var LogsFileLayout = __webpack_require__(423);
	var LogFileCollection = __webpack_require__(429);
	var UpdateLogFileCollection = __webpack_require__(431);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Logs/LogsLayoutTemplate',
	
	    ui : {
	        tableTab       : '.x-table-tab',
	        filesTab       : '.x-files-tab',
	        updateFilesTab : '.x-update-files-tab'
	    },
	
	    regions : {
	        table       : '#table',
	        files       : '#files',
	        updateFiles : '#update-files'
	    },
	
	    events : {
	        'click .x-table-tab'        : '_showTable',
	        'click .x-files-tab'        : '_showFiles',
	        'click .x-update-files-tab' : '_showUpdateFiles'
	    },
	
	    onShow : function() {
	        this._showTable();
	    },
	
	    _showTable : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.ui.tableTab.tab('show');
	        this.table.show(new LogsTableLayout());
	    },
	
	    _showFiles : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.ui.filesTab.tab('show');
	        this.files.show(new LogsFileLayout({
	            collection         : new LogFileCollection(),
	            deleteFilesCommand : 'deleteLogFiles'
	        }));
	    },
	
	    _showUpdateFiles : function(e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        this.ui.updateFilesTab.tab('show');
	        this.updateFiles.show(new LogsFileLayout({
	            collection         : new UpdateLogFileCollection(),
	            deleteFilesCommand : 'deleteUpdateLogFiles'
	        }));
	    }
	});

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var LogTimeCell = __webpack_require__(418);
	var LogLevelCell = __webpack_require__(419);
	var LogRow = __webpack_require__(420);
	var GridPager = __webpack_require__(104);
	var LogCollection = __webpack_require__(421);
	var ToolbarLayout = __webpack_require__(108);
	var LoadingView = __webpack_require__(120);
	__webpack_require__(4);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Logs/Table/LogsTableLayoutTemplate',
	
	    regions : {
	        grid    : '#x-grid',
	        toolbar : '#x-toolbar',
	        pager   : '#x-pager'
	    },
	
	    attributes : {
	        id : 'logs-screen'
	    },
	
	    columns : [
	        {
	            name     : 'level',
	            label    : '',
	            sortable : true,
	            cell     : LogLevelCell
	        },
	        {
	            name     : 'logger',
	            label    : 'Component',
	            sortable : true,
	            cell     : Backgrid.StringCell.extend({
	                className : 'log-logger-cell'
	            })
	        },
	        {
	            name     : 'message',
	            label    : 'Message',
	            sortable : false,
	            cell     : Backgrid.StringCell.extend({
	                className : 'log-message-cell'
	            })
	        },
	        {
	            name  : 'time',
	            label : 'Time',
	            cell  : LogTimeCell
	        }
	    ],
	
	    initialize : function() {
	        this.collection = new LogCollection();
	
	        this.listenTo(this.collection, 'sync', this._showTable);
	        this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	    },
	
	    onRender : function() {
	        this.grid.show(new LoadingView());
	    },
	
	    onShow : function() {
	        this._showToolbar();
	    },
	
	    _showTable : function() {
	        this.grid.show(new Backgrid.Grid({
	            row        : LogRow,
	            columns    : this.columns,
	            collection : this.collection,
	            className  : 'table table-hover'
	        }));
	
	        this.pager.show(new GridPager({
	            columns    : this.columns,
	            collection : this.collection
	        }));
	    },
	
	    _showToolbar : function() {
	        var filterButtons = {
	            type          : 'radio',
	            storeState    : true,
	            menuKey       : 'logs.filterMode',
	            defaultAction : 'all',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'info',
	                    title    : '',
	                    tooltip  : 'Info',
	                    icon     : 'icon-radarr-log-info',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'warn',
	                    title    : '',
	                    tooltip  : 'Warn',
	                    icon     : 'icon-radarr-log-warn',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'error',
	                    title    : '',
	                    tooltip  : 'Error',
	                    icon     : 'icon-radarr-log-error',
	                    callback : this._setFilter
	                }
	            ]
	        };
	
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            items      : [
	                {
	                    title        : 'Refresh',
	                    icon         : 'icon-radarr-refresh',
	                    ownerContext : this,
	                    callback     : this._refreshTable
	                },
	                {
	                    title   : 'Clear Logs',
	                    icon    : 'icon-radarr-clear',
	                    command : 'clearLog'
	                }
	            ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            left    : [leftSideButtons],
	            right   : [filterButtons],
	            context : this
	        }));
	    },
	
	    _refreshTable : function(buttonContext) {
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.fetch({ reset : true });
	
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _setFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	
	        this.collection.setFilterMode(mode, { reset : false });
	
	        this.collection.state.currentPage = 1;
	        var promise = this.collection.fetch({ reset : true });
	
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _commandComplete : function(options) {
	        if (options.command.get('name') === 'clearlog') {
	            this._refreshTable();
	        }
	    }
	});

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	var FormatHelpers = __webpack_require__(20);
	var UiSettings = __webpack_require__(22);
	
	module.exports = NzbDroneCell.extend({
	    className : 'log-time-cell',
	
	    render : function() {
	        var dateStr = this._getValue();
	        var date = moment(dateStr);
	        var diff = date.diff(moment().utcOffset(date.utcOffset()).startOf('day'), 'days', true);
	        var result = '<span title="{0}">{1}</span>';
	        var tooltip = date.format(UiSettings.longDateTime(true));
	        var text;
	
	        if (diff > 0 && diff < 1) {
	            text = date.format(UiSettings.time(true, false));
	        } else {
	            if (UiSettings.get('showRelativeDates')) {
	                text = FormatHelpers.relativeDate(dateStr);
	            } else {
	                text = date.format(UiSettings.get('shortDateFormat'));
	            }
	        }
	
	        this.$el.html(result.format(tooltip, text));
	
	        return this;
	    }
	});


/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'log-level-cell',
	
	    render : function() {
	        var level = this._getValue();
	        this.$el.html('<i class="icon-radarr-log-{0}" title="{1}"/>'.format(this._getValue().toLowerCase(), level));
	
	        return this;
	    }
	});

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Row.extend({
	    className : 'log-row',
	
	    events : {
	        'click' : '_showDetails'
	    },
	
	    _showDetails : function() {
	        vent.trigger(vent.Commands.ShowLogDetails, { model : this.model });
	    }
	});

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	var PagableCollection = __webpack_require__(29);
	var LogsModel = __webpack_require__(422);
	var AsFilteredCollection = __webpack_require__(63);
	var AsPersistedStateCollection = __webpack_require__(64);
	
	var collection = PagableCollection.extend({
	    url       : window.NzbDrone.ApiRoot + '/log',
	    model     : LogsModel,
	    tableName : 'logs',
	
	    state : {
	        pageSize : 50,
	        sortKey  : 'time',
	        order    : 1
	    },
	
	    queryParams : {
	        totalPages   : null,
	        totalRecords : null,
	        pageSize     : 'pageSize',
	        sortKey      : 'sortKey',
	        order        : 'sortDir',
	        directions   : {
	            '-1' : 'asc',
	            '1'  : 'desc'
	        }
	    },
	
	    // Filter Modes
	    filterModes : {
	        "all"   : [
	            null,
	            null
	        ],
	        "info"  : [
	            'level',
	            'Info'
	        ],
	        "warn"  : [
	            'level',
	            'Warn'
	        ],
	        "error" : [
	            'level',
	            'Error'
	        ]
	    },
	
	    parseState : function(resp, queryParams, state) {
	        return { totalRecords : resp.totalRecords };
	    },
	
	    parseRecords : function(resp) {
	        if (resp) {
	            return resp.records;
	        }
	
	        return resp;
	    }
	});
	
	collection = AsFilteredCollection.apply(collection);
	
	module.exports = AsPersistedStateCollection.apply(collection);

/***/ },
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var FilenameCell = __webpack_require__(424);
	var RelativeDateCell = __webpack_require__(95);
	var DownloadLogCell = __webpack_require__(425);
	var LogFileRow = __webpack_require__(426);
	var ContentsView = __webpack_require__(427);
	var ContentsModel = __webpack_require__(428);
	var ToolbarLayout = __webpack_require__(108);
	var LoadingView = __webpack_require__(120);
	__webpack_require__(4);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Logs/Files/LogFileLayoutTemplate',
	
	    regions : {
	        toolbar  : '#x-toolbar',
	        grid     : '#x-grid',
	        contents : '#x-contents'
	    },
	
	    columns : [
	        {
	            name     : 'filename',
	            label    : 'Filename',
	            cell     : FilenameCell,
	            sortable : false
	        },
	        {
	            name     : 'lastWriteTime',
	            label    : 'Last Write Time',
	            cell     : RelativeDateCell,
	            sortable : false
	        },
	        {
	            name     : 'downloadUrl',
	            label    : '',
	            cell     : DownloadLogCell,
	            sortable : false
	        }
	    ],
	
	    initialize : function(options) {
	        this.collection = options.collection;
	        this.deleteFilesCommand = options.deleteFilesCommand;
	
	        this.listenTo(vent, vent.Commands.ShowLogFile, this._fetchLogFileContents);
	        this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	        this.listenTo(this.collection, 'sync', this._collectionSynced);
	
	        this.collection.fetch();
	    },
	
	    onShow : function() {
	        this._showToolbar();
	        this._showTable();
	    },
	
	    _showToolbar : function() {
	        var leftSideButtons = {
	            type       : 'default',
	            storeState : false,
	            items      : [
	                {
	                    title        : 'Refresh',
	                    icon         : 'icon-radarr-refresh',
	                    ownerContext : this,
	                    callback     : this._refreshTable
	                },
	                {
	                    title          : 'Clear Log Files',
	                    icon           : 'icon-radarr-clear',
	                    command        : this.deleteFilesCommand,
	                    successMessage : 'Log files have been deleted',
	                    errorMessage   : 'Failed to delete log files'
	                }
	            ]
	        };
	
	        this.toolbar.show(new ToolbarLayout({
	            left    : [leftSideButtons],
	            context : this
	        }));
	    },
	
	    _showTable : function() {
	        this.grid.show(new Backgrid.Grid({
	            row        : LogFileRow,
	            columns    : this.columns,
	            collection : this.collection,
	            className  : 'table table-hover'
	        }));
	    },
	
	    _collectionSynced : function() {
	        if (!this.collection.any()) {
	            return;
	        }
	
	        var model = this.collection.first();
	        this._fetchLogFileContents({ model : model });
	    },
	
	    _fetchLogFileContents : function(options) {
	        this.contents.show(new LoadingView());
	
	        var model = options.model;
	        var contentsModel = new ContentsModel(model.toJSON());
	
	        this.listenToOnce(contentsModel, 'sync', this._showDetails);
	
	        contentsModel.fetch({ dataType : 'text' });
	    },
	
	    _showDetails : function(model) {
	        this.contents.show(new ContentsView({ model : model }));
	    },
	
	    _refreshTable : function(buttonContext) {
	        this.contents.close();
	        var promise = this.collection.fetch();
	
	        //Would be nice to spin the icon on the refresh button
	        if (buttonContext) {
	            buttonContext.ui.icon.spinForPromise(promise);
	        }
	    },
	
	    _commandComplete : function(options) {
	        if (options.command.get('name') === this.deleteFilesCommand.toLowerCase()) {
	            this._refreshTable();
	        }
	    }
	});

/***/ },
/* 424 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'log-filename-cell',
	
	    render : function() {
	        var filename = this._getValue();
	        this.$el.html(filename);
	
	        return this;
	    }
	});

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'download-log-cell',
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<a href="{0}" class="no-router" target="_blank">Download</a>'.format(this.cellValue));
	
	        return this;
	    }
	});

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Row.extend({
	    className : 'log-file-row',
	
	    events : {
	        'click' : '_showDetails'
	    },
	
	    _showDetails : function() {
	        vent.trigger(vent.Commands.ShowLogFile, { model : this.model });
	    }
	});

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Logs/Files/ContentsViewTemplate'
	});

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	    url : function() {
	        return this.get('contentsUrl');
	    },
	
	    parse : function(contents) {
	        var response = {};
	        response.contents = contents;
	        return response;
	    }
	});

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var LogFileModel = __webpack_require__(430);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/log/file',
	    model : LogFileModel,
	
	    state : {
	        sortKey : 'lastWriteTime',
	        order   : 1
	    }
	});

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var LogFileModel = __webpack_require__(432);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/log/file/update',
	    model : LogFileModel,
	
	    state : {
	        sortKey : 'lastWriteTime',
	        order   : 1
	    }
	});

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var UpdateCollection = __webpack_require__(434);
	var UpdateCollectionView = __webpack_require__(436);
	var LoadingView = __webpack_require__(120);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Update/UpdateLayoutTemplate',
	
	    regions : {
	        updates : '#x-updates'
	    },
	
	    initialize : function() {
	        this.updateCollection = new UpdateCollection();
	
	        this.listenTo(this.updateCollection, 'sync', this._showUpdates);
	    },
	
	    onRender : function() {
	        this.updates.show(new LoadingView());
	
	        this.updateCollection.fetch();
	    },
	
	    _showUpdates : function() {
	        this.updates.show(new UpdateCollectionView({ collection : this.updateCollection }));
	    }
	});

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var UpdateModel = __webpack_require__(435);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/update',
	    model : UpdateModel
	});

/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var UpdateItemView = __webpack_require__(437);
	var EmptyView = __webpack_require__(438);
	
	module.exports = Marionette.CollectionView.extend({
	    itemView  : UpdateItemView,
	    emptyView : EmptyView
	});

/***/ },
/* 437 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var CommandController = __webpack_require__(84);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Update/UpdateItemViewTemplate',
	
	    events : {
	        'click .x-install-update' : '_installUpdate'
	    },
	
	    initialize : function() {
	        this.updating = false;
	    },
	
	    _installUpdate : function() {
	        if (this.updating) {
	            return;
	        }
	
	        this.updating = true;
	        var self = this;
	
	        var promise = CommandController.Execute('applicationUpdate');
	
	        promise.done(function() {
	            window.setTimeout(function() {
	                self.updating = false;
	            }, 5000);
	        });
	    }
	});

/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Update/EmptyViewTemplate'
	});

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var BackupCollection = __webpack_require__(440);
	var RelativeDateCell = __webpack_require__(95);
	var BackupFilenameCell = __webpack_require__(442);
	var BackupTypeCell = __webpack_require__(443);
	var EmptyView = __webpack_require__(444);
	var LoadingView = __webpack_require__(120);
	var ToolbarLayout = __webpack_require__(108);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Backup/BackupLayoutTemplate',
	
	    regions : {
	        backups : '#x-backups',
	        toolbar : '#x-backup-toolbar'
	    },
	
	    columns : [
	        {
	            name     : 'type',
	            label    : '',
	            sortable : false,
	            cell     : BackupTypeCell
	        },
	        {
	            name     : 'this',
	            label    : 'Name',
	            sortable : false,
	            cell     : BackupFilenameCell
	        },
	        {
	            name     : 'time',
	            label    : 'Time',
	            sortable : false,
	            cell     : RelativeDateCell
	        }
	    ],
	
	    leftSideButtons : {
	        type       : 'default',
	        storeState : false,
	        collapse   : true,
	        items      : [
	            {
	                title          : 'Backup',
	                icon           : 'icon-radarr-file-text',
	                command        : 'backup',
	                properties     : { type : 'manual' },
	                successMessage : 'Database and settings were backed up successfully',
	                errorMessage   : 'Backup Failed!'
	            }
	        ]
	    },
	
	    initialize : function() {
	        this.backupCollection = new BackupCollection();
	
	        this.listenTo(this.backupCollection, 'sync', this._showBackups);
	        this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
	    },
	
	    onRender : function() {
	        this._showToolbar();
	        this.backups.show(new LoadingView());
	
	        this.backupCollection.fetch();
	    },
	
	    _showBackups : function() {
	        if (this.backupCollection.length === 0) {
	            this.backups.show(new EmptyView());
	        } else {
	            this.backups.show(new Backgrid.Grid({
	                columns    : this.columns,
	                collection : this.backupCollection,
	                className  : 'table table-hover'
	            }));
	        }
	    },
	
	    _showToolbar     : function() {
	        this.toolbar.show(new ToolbarLayout({
	            left    : [this.leftSideButtons],
	            context : this
	        }));
	    },
	    _commandComplete : function(options) {
	        if (options.command.get('name') === 'backup') {
	            this.backupCollection.fetch();
	        }
	    }
	});

/***/ },
/* 440 */
/***/ function(module, exports, __webpack_require__) {

	var PageableCollection = __webpack_require__(29);
	var BackupModel = __webpack_require__(441);
	
	module.exports = PageableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + '/system/backup',
	    model : BackupModel,
	
	    state : {
	        sortKey  : 'time',
	        order    : 1,
	        pageSize : 100000
	    },
	
	    mode : 'client'
	});

/***/ },
/* 441 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 442 */
/***/ function(module, exports, __webpack_require__) {

	var TemplatedCell = __webpack_require__(93);
	
	module.exports = TemplatedCell.extend({
	    className : 'movie-title-cell',
	    template  : 'System/Backup/BackupFilenameCellTemplate'
	});

/***/ },
/* 443 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'backup-type-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var icon = 'icon-radarr-backup-scheduled';
	        var title = 'Scheduled';
	
	        var type = this.model.get(this.column.get('name'));
	
	        if (type === 'manual') {
	            icon = 'icon-radarr-backup-manual';
	            title = 'Manual';
	        } else if (type === 'update') {
	            icon = 'icon-radarr-backup-update';
	            title = 'Before update';
	        }
	
	        this.$el.html('<i class="{0}" title="{1}"></i>'.format(icon, title));
	
	        return this;
	    }
	});

/***/ },
/* 444 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Backup/BackupEmptyViewTemplate'
	});

/***/ },
/* 445 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var BackupCollection = __webpack_require__(446);
	var RelativeTimeCell = __webpack_require__(448);
	var TaskIntervalCell = __webpack_require__(449);
	var ExecuteTaskCell = __webpack_require__(450);
	var NextExecutionCell = __webpack_require__(451);
	var LoadingView = __webpack_require__(120);
	__webpack_require__(37);
	
	module.exports = Marionette.Layout.extend({
	    template : 'System/Task/TaskLayoutTemplate',
	
	    regions : {
	        tasks : '#x-tasks'
	    },
	
	    columns : [
	        {
	            name     : 'name',
	            label    : 'Name',
	            sortable : true,
	            cell     : 'string'
	        },
	        {
	            name     : 'interval',
	            label    : 'Interval',
	            sortable : true,
	            cell     : TaskIntervalCell
	        },
	        {
	            name     : 'lastExecution',
	            label    : 'Last Execution',
	            sortable : true,
	            cell     : RelativeTimeCell
	        },
	        {
	            name     : 'nextExecution',
	            label    : 'Next Execution',
	            sortable : true,
	            cell     : NextExecutionCell
	        },
	        {
	            name     : 'this',
	            label    : '',
	            sortable : false,
	            cell     : ExecuteTaskCell
	        }
	    ],
	
	    initialize : function() {
	        this.taskCollection = new BackupCollection();
	
	        this.listenTo(this.taskCollection, 'sync', this._showTasks);
	        this.taskCollection.bindSignalR();
	    },
	
	    onRender : function() {
	        this.tasks.show(new LoadingView());
	
	        this.taskCollection.fetch();
	    },
	
	    _showTasks : function() {
	        this.tasks.show(new Backgrid.Grid({
	            columns    : this.columns,
	            collection : this.taskCollection,
	            className  : 'table table-hover'
	        }));
	    }
	});

/***/ },
/* 446 */
/***/ function(module, exports, __webpack_require__) {

	var PageableCollection = __webpack_require__(29);
	var TaskModel = __webpack_require__(447);
	
	module.exports = PageableCollection.extend({
	    url   : window.NzbDrone.ApiRoot + '/system/task',
	    model : TaskModel,
	
	    state : {
	        sortKey  : 'name',
	        order    : -1,
	        pageSize : 100000
	    },
	
	    mode : 'client'
	});

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	var FormatHelpers = __webpack_require__(20);
	var UiSettings = __webpack_require__(22);
	
	module.exports = NzbDroneCell.extend({
	    className : 'relative-time-cell',
	
	    render : function() {
	
	        var dateStr = this.model.get(this.column.get('name'));
	
	        if (dateStr) {
	            var date = moment(dateStr);
	            var result = '<span title="{0}">{1}</span>';
	            var tooltip = date.format(UiSettings.longDateTime());
	            var text;
	
	            if (UiSettings.get('showRelativeDates')) {
	                text = date.fromNow();
	            } else {
	                text = date.format(UiSettings.shortDateTime());
	            }
	
	            this.$el.html(result.format(tooltip, text));
	        }
	
	        return this;
	    }
	});

/***/ },
/* 449 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	
	module.exports = NzbDroneCell.extend({
	    className : 'task-interval-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var interval = this.model.get('interval');
	        var duration = moment.duration(interval, 'minutes').humanize().replace(/an?(?=\s)/, '1');
	
	        if (interval === 0) {
	            this.$el.html('disabled');
	        } else {
	            this.$el.html(duration);
	        }
	
	        return this;
	    }
	});

/***/ },
/* 450 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var CommandController = __webpack_require__(84);
	
	module.exports = NzbDroneCell.extend({
	    className : 'execute-task-cell',
	
	    events : {
	        'click .x-execute' : '_executeTask'
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        var name = this.model.get('name');
	        var task = this.model.get('taskName');
	
	        this.$el.html('<i class="icon-radarr-refresh icon-can-spin x-execute" title="Execute {0}"></i>'.format(name));
	
	        CommandController.bindToCommand({
	            element : this.$el.find('.x-execute'),
	            command : { name : task }
	        });
	
	        return this;
	    },
	
	    _executeTask : function() {
	        CommandController.Execute(this.model.get('taskName'), { name : this.model.get('taskName') });
	    }
	});

/***/ },
/* 451 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	var moment = __webpack_require__(17);
	var UiSettings = __webpack_require__(22);
	
	module.exports = NzbDroneCell.extend({
	    className : 'next-execution-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var interval = this.model.get('interval');
	        var nextExecution = moment(this.model.get('nextExecution'));
	
	        if (interval === 0) {
	            this.$el.html('-');
	        } else if (moment().isAfter(nextExecution)) {
	            this.$el.html('now');
	        } else {
	            var result = '<span title="{0}">{1}</span>';
	            var tooltip = nextExecution.format(UiSettings.longDateTime());
	            var text;
	
	            if (UiSettings.get('showRelativeDates')) {
	                text = nextExecution.fromNow();
	            } else {
	                text = nextExecution.format(UiSettings.shortDateTime());
	            }
	
	            this.$el.html(result.format(tooltip, text));
	        }
	
	        return this;
	    }
	});

/***/ },
/* 452 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var EmptyView = __webpack_require__(91);
	var FullMovieCollection = __webpack_require__ (61);
	var MoviesCollection = __webpack_require__(62);
	var MovieTitleCell = __webpack_require__(96);
	var MovieMonitoredCell = __webpack_require__(453);
	var DownloadedQualityCell = __webpack_require__(102);
	var ProfileCell = __webpack_require__(97);
	var SelectAllCell = __webpack_require__(313);
	var ToolbarLayout = __webpack_require__(108);
	var FooterView = __webpack_require__(454);
	var GridPager = __webpack_require__(104);
	__webpack_require__(37);
	var DeleteSelectedView = __webpack_require__(456);
	var Config = __webpack_require__(33);
	var CommandController = __webpack_require__(84);
	
	window.shownOnce = false;
	module.exports = Marionette.Layout.extend({
	    template : 'Movies/Editor/MovieEditorLayoutTemplate',
	
	    regions : {
	        moviesRegion : '#x-movie-editor',
	        toolbar      : '#x-toolbar',
	        pagerTop : "#x-movie-pager-top",
	        pager : "#x-movie-pager"
	    },
	
	    ui : {
	        monitored     : '.x-monitored',
	        profiles      : '.x-profiles',
	        rootFolder    : '.x-root-folder',
	        selectedCount : '.x-selected-count'
	    },
	
	    events : {
	        'click .x-save'         : '_updateAndSave',
	        'change .x-root-folder' : '_rootFolderChanged'
	    },
	
	    columns : [
	        {
	            name       : '',
	            cell       : SelectAllCell,
	            headerCell : 'select-all',
	            sortable   : false
	        },
	        {
	            name       : 'monitored',
	            label      : '',
	            cell       : MovieMonitoredCell,
	            trueClass  : 'icon-radarr-monitored',
	            falseClass : 'icon-radarr-unmonitored',
	            tooltip    : 'Toggle movie monitored status',
	            sortable   : false
	        },
	        {
	            name      : 'title',
	            label     : 'Title',
	            cell      : MovieTitleCell,
	            cellValue : 'this'
	        },
	        {
	            name: "downloadedQuality",
	            label: "Downloaded",
	            cell: DownloadedQualityCell,
	        },
	        {
	            name  : 'profileId',
	            label : 'Profile',
	            cell  : ProfileCell
	        },
	        {
	            name  : 'path',
	            label : 'Path',
	            cell  : 'string'
	        }
	    ],
	
	    initialize : function() {
	
			this.movieCollection = MoviesCollection.clone();
			var pageSize = parseInt(Config.getValue("pageSize")) || 10;
			this.movieCollection.switchMode('client', {fetch: false});
			this.movieCollection.setPageSize(pageSize, {fetch: true});
	        this.movieCollection.bindSignalR();
			this.movieCollection.fullCollection.bindSignalR();
	
			var selected = FullMovieCollection.where( { selected : true });
			_.each(selected, function(model) {
		     	model.set('selected', false);
			});
	
			this.listenTo(this.movieCollection, 'sync', function() {
				this._showToolbar();
				this._showTable();
				this._showPager();
				window.shownOnce = true;
			});
	
			this.listenTo(this.movieCollection.fullCollection, 'sync', function() {
				});
	
	
			this.leftSideButtons = {
	            type       : 'default',
	                storeState : false,
	                collapse: true,
	                items      : [
	                {
	                    title          : 'Update library',
	                    icon           : 'icon-radarr-refresh',
	                    command        : 'refreshmovie',
	                    successMessage : 'Library was updated!',
	                    errorMessage   : 'Library update failed!'
	                },
	                {
	                    title : 'Update Custom Formats',
	                    icon : 'icon-radarr-refresh',
	                    className : 'btn-danger',
	                    callback : this._updateQuality
	                },
	                {
	                    title : 'Delete selected',
	                    icon : 'icon-radarr-delete-white',
	                    className: 'btn-danger',
	                    callback : this._deleteSelected
	                },
					{
	                    title : 'Select All',
	                    icon : 'icon-radarr-checked',
	                    className: 'btn-primary',
	                    callback : this._selectAll
	                },
					{
	                    title : 'Unselect All',
	                    icon : 'icon-radarr-unchecked',
	                    className: 'btn-primary',
	                    callback : this._unselectAll
	                }
	            ]
	        };
			//this.listenTo(FullMovieCollection, 'save', function() {
			//	window.alert('Done Saving');
			//});
	
	        this.filteringOptions = {
	            type          : 'radio',
	            storeState    : false,
	            menuKey       : 'movieeditor.filterMode',
	            defaultAction : 'all',
	            items         : [
	                {
	                    key      : 'all',
	                    title    : '',
	                    tooltip  : 'All',
	                    icon     : 'icon-radarr-all',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'monitored',
	                    title    : '',
	                    tooltip  : 'Monitored Only',
	                    icon     : 'icon-radarr-monitored',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'unmonitored',
	                    title    : '',
	                    tooltip  : 'UnMonitored Only',
	                    icon     : 'icon-radarr-unmonitored',
	                    callback : this._setFilter
	                },
			        {
	                    key      : 'missing',
	                    title    : '',
	                    tooltip  : 'Missing Only',
	                    icon     : 'icon-radarr-missing',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'released',
	                    title    : '',
	                    tooltip  : 'Released',
	                    icon     : 'icon-radarr-movie-released',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'announced',
	                    title    : '',
	                    tooltip  : 'Announced',
	                    icon     : 'icon-radarr-movie-announced',
	                    callback : this._setFilter
	                },
	                {
	                    key      : 'cinemas',
	                    title    : '',
	                    tooltip  : 'In Cinemas',
	                    icon     : 'icon-radarr-movie-cinemas',
	                    callback : this._setFilter
	                }
	            ]
	        };
	    },
	
	    onRender : function() {
	      	//this._showToolbar();
	       	//this._showTable();
	       	//this._showPager();
			    //if (window.shownOnce){
			    //	this.movieCollection.fetch();
			    //}
			    //window.shownOnce = true;
	    },
	
	    onClose : function() {
	        vent.trigger(vent.Commands.CloseControlPanelCommand);
	    },
	
	    _showPager : function(){
	      var pager = new GridPager({
	          columns    : this.columns,
	          collection : this.movieCollection
	      });
	      var pagerTop = new GridPager({
	          columns    : this.columns,
	          collection : this.movieCollection,
	      });
	      this.pager.show(pager);
	      this.pagerTop.show(pagerTop);
	    },
	
	    _showTable : function() {
	        if (this.movieCollection.length === 0) {
	            this.moviesRegion.show(new EmptyView());
	            this.toolbar.close();
	            return;
	        }
	        this.columns[0].sortedCollection = this.movieCollection;
	
	        this.editorGrid = new Backgrid.Grid({
	            collection : this.movieCollection,
	            columns    : this.columns,
	            className  : 'table table-hover'
	        });
	
	        this.moviesRegion.show(this.editorGrid);
	       	this._showFooter();
	
	    },
	
	    _showToolbar : function() {
	        this.toolbar.show(new ToolbarLayout({
	            left    : [
	                this.leftSideButtons
	            ],
	            right   : [
	                this.filteringOptions
	            ],
	            context : this
	        }));
	    },
	
	    _showFooter : function() {
	        vent.trigger(vent.Commands.OpenControlPanelCommand, new FooterView({
	            editorGrid : this.editorGrid,
	            collection : this.movieCollection
	        }));
	    },
	
	    _setFilter : function(buttonContext) {
	        var mode = buttonContext.model.get('key');
	        this.movieCollection.setFilterMode(mode);
	    },
	
	    _deleteSelected: function() {
	        var selected = FullMovieCollection.where({ selected : true });
	        var updateFilesMoviesView = new DeleteSelectedView({ movies : selected });
	
	        vent.trigger(vent.Commands.OpenModalCommand, updateFilesMoviesView);
	    },
	    
	    _selectAll : function() {
			    var pageSize = this.movieCollection.state.pageSize;
			    var currentPage = this.movieCollection.state.currentPage;
			    this.movieCollection.setPageSize(this.movieCollection.fullCollection.length, { fetch: false});
			    this.movieCollection.each(function(model) {
			    	model.trigger('backgrid:selected', model, true);	
			    });
			    this.movieCollection.setPageSize(pageSize, {fetch: false});
			    this.movieCollection.getPage(currentPage, {fetch: false});
		},
	
		_unselectAll : function() {
			    var pageSize = this.movieCollection.state.pageSize;
			    var currentPage = this.movieCollection.state.currentPage;
			    this.movieCollection.setPageSize(this.movieCollection.fullCollection.length, { fetch: false});
			    this.movieCollection.each(function(model) {
			   	model.trigger('backgrid:selected', model, false);
		        });
			    this.movieCollection.setPageSize(pageSize, {fetch: false});
			    this.movieCollection.getPage(currentPage, {fetch: false});
		},
	
	    _updateQuality : function() {
	        var selected = FullMovieCollection.where({ selected : true});
	        var files = selected.filter(function(model) {
	            return model.get("movieFile") !== undefined;
	        }).map(function(model){
	            return model.get("movieFile").id;
	        });
	        
	        CommandController.Execute('updateMovieFileQuality', {
	            name : 'updateMovieFileQuality',
	            movieFileIds : files
	        });
	    }
		
	});


/***/ },
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Cell.extend({
	    className : 'toggle-cell',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    _onClick : function() {
	
	        var self = this;
	
	        this.$el.tooltip('hide');
	
	        var name = this.column.get('name');
	        this.model.set(name, !this.model.get(name));
	
	        var promise = this.model.save();
	
	        this.$('i').spinForPromise(promise);
	
	        promise.always(function() {
	            self.render();
	        });
	    },
	
	    render : function() {
	        this.$el.empty();
	        this.$el.html('<i />');
	
	        var name = this.column.get('name');
	
	        if (this.model.get(name)) {
	            this.$('i').addClass(this.column.get('trueClass'));
	        } else {
	            this.$('i').addClass(this.column.get('falseClass'));
	        }
	
	        var tooltip = this.column.get('tooltip');
	
	        if (tooltip) {
	            this.$('i').attr('title', tooltip);
	        }
	
	        return this;
	    }
	});

/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var vent = __webpack_require__(34);
	var Profiles = __webpack_require__(41);
	var RootFolders = __webpack_require__(304);
	var RootFolderLayout = __webpack_require__(306);
	var UpdateFilesMoviesView = __webpack_require__(455);
	var Config = __webpack_require__(33);
	var FullMovieCollection = __webpack_require__(61);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Editor/MovieEditorFooterViewTemplate',
	
	    ui : {
	        monitored           : '.x-monitored',
	        profile             : '.x-profiles',
		minimumAvailability : '.x-minimumavailability',
	        staticPath        : '.x-static-path',
	        rootFolder          : '.x-root-folder',
	        selectedCount       : '.x-selected-count',
	        container           : '.movie-editor-footer',
	        actions             : '.x-action'
	    },
	
	    events : {
	        'click .x-save'           : '_updateAndSave',
	        'change .x-root-folder'   : '_rootFolderChanged',
	        'click .x-organize-files' : '_organizeFiles',
	        'click .x-update-quality' : '_updateQuality'
	    },
	
	    templateHelpers : function() {
	        return {
	            profiles    : Profiles,
	            rootFolders : RootFolders.toJSON()
	        };
	    },
	
	    initialize : function(options) {
	        this.moviesCollection = options.collection;
	        RootFolders.fetch().done(function() {
	            RootFolders.synced = true;
	        });
	
	        this.editorGrid = options.editorGrid;
	
	
	        this.listenTo(this.moviesCollection, 'backgrid:selected', function(model, selected) {
	            var m =  FullMovieCollection.findWhere({ tmdbId : model.get('tmdbId') });
	            m.set('selected', selected);
	            this._updateInfo();
	        });
	
	        this.listenTo(FullMovieCollection, 'save', function() {
				window.alert(' Done Saving');
				var selected = FullMovieCollection.where({ selected : true });
			});
	
	
	        this.listenTo(RootFolders, 'all', this.render);
	    },
	
	    onRender : function() {
	        this._updateInfo();
	    },
	
	    _updateAndSave : function() {
	        //var selected = this.editorGrid.getSelectedModels();
	
			var selected = FullMovieCollection.where({ selected : true });
	        var monitored = this.ui.monitored.val();
			var minAvail = this.ui.minimumAvailability.val();
	        var profile = this.ui.profile.val();
	        var staticPath = this.ui.staticPath.val();
	        var rootFolder = this.ui.rootFolder.val();
	
			var i = 0;
			var b = [];
	        _.each(selected, function(model) {
	
	            b[i] = model.get('tmdbId');
							i++;
	            if (monitored === 'true') {
	                model.set('monitored', true);
	            } else if (monitored === 'false') {
	                model.set('monitored', false);
	            }
	
	            if (minAvail !=='noChange') {
					model.set('minimumAvailability', minAvail);
		    	}
	
	            if (profile !== 'noChange') {
	                model.set('profileId', parseInt(profile, 10));
	            }
	
	            if (staticPath !== 'noChange') {
	                model.set('pathState', staticPath);
	            }
	
	            if (rootFolder !== 'noChange') {
	                var rootFolderPath = RootFolders.get(parseInt(rootFolder, 10));
	
	                model.set('rootFolderPath', rootFolderPath.get('path'));
	            }
	            model.edited = true;
	        });
	        var filterKey = this.moviesCollection.state.filterKey;
	        var filterValue = this.moviesCollection.state.filterValue;
			var currentPage = this.moviesCollection.state.currentPage;
	        this.moviesCollection.setFilterMode('all');
			//this.moviesCollection.fullCollection.resetFiltered();
			for (var j=0; j<i; j++) {
					var m = this.moviesCollection.fullCollection.findWhere({ tmdbId : b[j] });
					if (m!== undefined) {
	      			if (monitored === 'true') {
	          			m.set('monitored', true);
	                } else if (monitored === 'false') {
	                    m.set('monitored', false);
	                }
	
	                if (minAvail !=='noChange') {
	                    m.set('minimumAvailability', minAvail);
	                }
	
	                if (profile !== 'noChange') {
	                    m.set('profileId', parseInt(profile, 10));
	                }
	
	                if (staticPath !== 'noChange') {
	                    m.set('pathState', staticPath);
	                }
	
	                if (rootFolder !== 'noChange') {
	                	var rootFolderPath = RootFolders.get(parseInt(rootFolder, 10));
						var folderName = m.get('folderName');
	                	//m.set('path', rootFolderPath.get('path')+ folderName);
	            	}
				}
			}
			this.moviesCollection.state.filterKey = filterKey;
	        this.moviesCollection.state.filterValue = filterValue;
	        this.moviesCollection.fullCollection.resetFiltered();
			this.moviesCollection.getPage(currentPage, { fetch: false});
	
			FullMovieCollection.save();
	    },
	
	    _updateInfo : function() {
	        var selected = this.editorGrid.getSelectedModels();
	        var selectedCount = selected.length;
	
	        this.ui.selectedCount.html('{0} movies selected'.format(selectedCount));
	
	        if (selectedCount === 0) {
	            this.ui.actions.attr('disabled', 'disabled');
	        } else {
	            this.ui.actions.removeAttr('disabled');
	        }
	    },
	
	    _rootFolderChanged : function() {
	        var rootFolderValue = this.ui.rootFolder.val();
	        if (rootFolderValue === 'addNew') {
	            var rootFolderLayout = new RootFolderLayout();
	            this.listenToOnce(rootFolderLayout, 'folderSelected', this._setRootFolder);
	            vent.trigger(vent.Commands.OpenModalCommand, rootFolderLayout);
	        } else {
	            Config.setValue(Config.Keys.DefaultRootFolderId, rootFolderValue);
	        }
	    },
	
	    _setRootFolder : function(options) {
	        vent.trigger(vent.Commands.CloseModalCommand);
	        this.ui.rootFolder.val(options.model.id);
	        this._rootFolderChanged();
	    },
	
	    _organizeFiles : function() {
	        var selected = FullMovieCollection.where({ selected : true });
	        var updateFilesMoviesView = new UpdateFilesMoviesView({ movies : selected });
	        this.listenToOnce(updateFilesMoviesView, 'updatingFiles', this._afterSave);
	
	        vent.trigger(vent.Commands.OpenModalCommand, updateFilesMoviesView);
	    }
	});


/***/ },
/* 455 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Backbone = __webpack_require__(6);
	var Marionette = __webpack_require__(11);
	var CommandController = __webpack_require__(84);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Editor/Organize/OrganizeFilesViewTemplate',
	
	    events : {
	        'click .x-confirm-organize' : '_organize'
	    },
	
	    initialize : function(options) {
	        this.movies = options.movies;
	        this.templateHelpers = {
	            numberOfMovies : this.movies.length,
	            movies         : new Backbone.Collection(this.movies).toJSON()
	        };
	    },
	
	    _organize : function() {
	        var movieIds = _.pluck(this.movies, 'id');
	
	        CommandController.Execute('renameMovie', {
	            name      : 'renameMovie',
	            movieIds : movieIds
	        });
	
	        this.trigger('organizingFiles');
	        vent.trigger(vent.Commands.CloseModalCommand);
	    }
	});

/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Editor/Delete/DeleteSelectedTemplate',
	
	    events : {
	        'click .x-confirm-delete' : 'removeMovie',
	        'change .x-delete-files'  : 'changeDeletedFiles'
	    },
	
	    ui : {
	        deleteFiles     : '.x-delete-files',
	        deleteFilesInfo : '.x-delete-files-info',
	        indicator       : '.x-indicator',
	        addExclusion    : '.x-add-exclusion'
	    },
	
	    initialize : function(options) {
	        this.movies = options.movies;
	        this.templateHelpers = {
	            removeCount : this.movies.length,
	            fileCount : _.filter(this.movies, function(m){
	                return m.get("hasFile");
	            }).length
	        };
	    },
	
	    removeMovie : function() {
	        var self = this;
	        var deleteFiles = this.ui.deleteFiles.prop('checked');
	        var addExclusion = this.ui.addExclusion.prop('checked');
	        this.ui.indicator.show();
	        var proxy = _.extend(new Backbone.Model(), {
	            id : '',
	
	            url : window.NzbDrone.ApiRoot+'/movie/editor/delete?deleteFiles='+deleteFiles+'&addExclusion='+addExclusion,
	
	            toJSON : function() {
	                return _.pluck(self.movies, "id");
	            }
	        });
	
	        proxy.save().done(function() {
	            //vent.trigger(vent.Events.MovieDeleted, { series : self.model });
	            vent.trigger(vent.Commands.CloseModalCommand);
	        });
	    },
	
	    changeDeletedFiles : function() {
	        var deleteFiles = this.ui.deleteFiles.prop('checked');
	
	        if (deleteFiles) {
	            this.ui.deleteFilesInfo.show();
	        } else {
	            this.ui.deleteFilesInfo.hide();
	        }
	    }
	});


/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	var EditMovieView = __webpack_require__(458);
	var DeleteMovieView = __webpack_require__(459);
	var HistoryDetailsLayout = __webpack_require__(460);
	var LogDetailsView = __webpack_require__(461);
	var RenamePreviewLayout = __webpack_require__(462);
	var ManualImportLayout = __webpack_require__(469);
	var FileBrowserLayout = __webpack_require__(217);
	var MoviesDetailsLayout = __webpack_require__(117);
	var EditFileView = __webpack_require__(482);
	
	module.exports = Marionette.AppRouter.extend({
			initialize : function() {
					vent.on(vent.Commands.OpenModalCommand, this._openModal, this);
					vent.on(vent.Commands.CloseModalCommand, this._closeModal, this);
					vent.on(vent.Commands.OpenModal2Command, this._openModal2, this);
					vent.on(vent.Commands.CloseModal2Command, this._closeModal2, this);
					vent.on(vent.Commands.EditMovieCommand, this._editMovie, this);
					vent.on(vent.Commands.EditFileCommand, this._editFile, this);
					vent.on(vent.Commands.DeleteMovieCommand, this._deleteMovie, this);
					vent.on(vent.Commands.ShowMovieDetails, this._showMovie, this);
					vent.on(vent.Commands.ShowHistoryDetails, this._showHistory, this);
					vent.on(vent.Commands.ShowLogDetails, this._showLogDetails, this);
					vent.on(vent.Commands.ShowRenamePreview, this._showRenamePreview, this);
					vent.on(vent.Commands.ShowManualImport, this._showManualImport, this);
					vent.on(vent.Commands.ShowFileBrowser, this._showFileBrowser, this);
					vent.on(vent.Commands.CloseFileBrowser, this._closeFileBrowser, this);
			},
	
			_openModal : function(view) {
					AppLayout.modalRegion.show(view);
			},
	
			_closeModal : function() {
					AppLayout.modalRegion.closeModal();
			},
	
			_openModal2 : function(view) {
					AppLayout.modalRegion2.show(view);
			},
	
			_closeModal2 : function() {
					AppLayout.modalRegion2.closeModal();
			},
	
			_editMovie : function(options) {
					var view = new EditMovieView({ model : options.movie });
					AppLayout.modalRegion.show(view);
			},
	
			_editFile : function(options) {
					var view = new EditFileView({ model : options.file });
					AppLayout.modalRegion.show(view);
			},
	
			_deleteMovie : function(options) {
					var view = new DeleteMovieView({ model : options.movie });
					AppLayout.modalRegion.show(view);
			},
	
			_showMovie : function(options) {
					var view = new MoviesDetailsLayout({
							model          : options.movie,
							hideSeriesLink : options.hideSeriesLink,
							openingTab     : options.openingTab
					});
					AppLayout.modalRegion.show(view);
			},
	
			_showHistory : function(options) {
					var view = new HistoryDetailsLayout({ model : options.model });
					AppLayout.modalRegion.show(view);
			},
	
			_showLogDetails : function(options) {
					var view = new LogDetailsView({ model : options.model });
					AppLayout.modalRegion.show(view);
			},
	
			_showRenamePreview : function(options) {
					var view = new RenamePreviewLayout(options);
					AppLayout.modalRegion.show(view);
			},
	
			_showManualImport : function(options) {
					var view = new ManualImportLayout(options);
					AppLayout.modalRegion.show(view);
			},
	
			_showFileBrowser : function(options) {
					var view = new FileBrowserLayout(options);
					AppLayout.modalRegion2.show(view);
			},
	
			_closeFileBrowser : function() {
					AppLayout.modalRegion2.closeModal();
			}
	});


/***/ },
/* 458 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Profiles = __webpack_require__(41);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	__webpack_require__(235);
	__webpack_require__(216);
	
	var view = Marionette.ItemView.extend({
	    template : 'Movies/Edit/EditMovieTemplate',
	
	    ui : {
	        profile : '.x-profile',
	        path    : '.x-path',
	        tags    : '.x-tags'
	    },
	
	    events : {
	        'click .x-remove' : '_removeMovie'
	    },
	
	    initialize : function() {
	        this.model.set('profiles', Profiles);
	        var pathState = this.model.get("pathState");
	        if (pathState === "static") {
	          this.model.set("pathState", true);
	        } else {
	          this.model.set("pathState", false);
	        }
	    },
	
	    onRender : function() {
	        this.ui.path.fileBrowser();
	        this.ui.tags.tagInput({
	            model    : this.model,
	            property : 'tags'
	        });
	
	    },
	
	    _onBeforeSave : function() {
	        var profileId = this.ui.profile.val();
	        this.model.set({ profileId : profileId });
	        var pathState = this.model.get("pathState");
	        if (pathState === true) {
	          this.model.set("pathState", "static");
	        } else {
	          this.model.set("pathState", "dynamic");
	        }
	    },
	
	    _onAfterSave : function() {
			this.model.set('saved', true);
	        this.trigger('saved');
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _removeMovie : function() {
	        vent.trigger(vent.Commands.DeleteMovieCommand, { movie : this.model });
	    }
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;


/***/ },
/* 459 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Movies/Delete/DeleteMovieTemplate',
	
	    events : {
	        'click .x-confirm-delete' : 'removeMovie',
	        'change .x-delete-files'  : 'changeDeletedFiles'
	    },
	
	    ui : {
	        deleteFiles     : '.x-delete-files',
	        deleteFilesInfo : '.x-delete-files-info',
	        indicator       : '.x-indicator',
	        addExclusion    : '.x-add-exclusion'
	    },
	
	    removeMovie : function() {
	        var self = this;
	        var deleteFiles = this.ui.deleteFiles.prop('checked');
	        var addExclusion = this.ui.addExclusion.prop('checked');
	        this.ui.indicator.show();
	        this.model.set('deleted', true); 
	        this.model.destroy({
	            data : { 'deleteFiles' : deleteFiles,
	                     'addExclusion' : addExclusion },
	            wait : true
	        }).done(function() {
	            vent.trigger(vent.Events.MovieDeleted, { series : self.model });
	            vent.trigger(vent.Commands.CloseModalCommand);
	        });
	    },
	
	    changeDeletedFiles : function() {
	        var deleteFiles = this.ui.deleteFiles.prop('checked');
	
	        if (deleteFiles) {
	            this.ui.deleteFilesInfo.show();
	        } else {
	            this.ui.deleteFilesInfo.hide();
	        }
	    }
	});


/***/ },
/* 460 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var HistoryDetailsView = __webpack_require__(130);
	
	module.exports = Marionette.Layout.extend({
	    template : 'Activity/History/Details/HistoryDetailsLayoutTemplate',
	
	    regions : {
	        bodyRegion : '.modal-body'
	    },
	
	    events : {
	        'click .x-mark-as-failed' : '_markAsFailed'
	    },
	
	    onShow : function() {
	        this.bodyRegion.show(new HistoryDetailsView({ model : this.model }));
	    },
	
	    _markAsFailed : function() {
	        var url = window.NzbDrone.ApiRoot + '/history/failed';
	        var data = {
	            id : this.model.get('id')
	        };
	
	        $.ajax({
	            url  : url,
	            type : 'POST',
	            data : data
	        });
	
	        vent.trigger(vent.Commands.CloseModalCommand);
	    }
	});


/***/ },
/* 461 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'System/Logs/Table/Details/LogDetailsViewTemplate'
	});

/***/ },
/* 462 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var RenamePreviewCollection = __webpack_require__(463);
	var RenamePreviewCollectionView = __webpack_require__(465);
	var EmptyCollectionView = __webpack_require__(467);
	var RenamePreviewFormatView = __webpack_require__(468);
	var LoadingView = __webpack_require__(120);
	var CommandController = __webpack_require__(84);
	
	module.exports = Marionette.Layout.extend({
	    className : 'modal-lg',
	    template  : 'Rename/RenamePreviewLayoutTemplate',
	
	    regions : {
	        renamePreviews : '#rename-previews',
	        formatRegion   : '.x-format-region'
	    },
	
	    ui : {
	        pathInfo     : '.x-path-info',
	        renameAll    : '.x-rename-all',
	        checkboxIcon : '.x-rename-all-button i'
	    },
	
	    events : {
	        'click .x-organize'    : '_organizeFiles',
	        'change .x-rename-all' : '_toggleAll'
	    },
	
	    initialize : function(options) {
	        this.model = options.movie;
	        this.seasonNumber = options.seasonNumber;
	
	        var viewOptions = {};
	        viewOptions.movieId = this.model.id;
	
	        this.collection = new RenamePreviewCollection(viewOptions);
	        this.listenTo(this.collection, 'sync', this._showPreviews);
	        this.listenTo(this.collection, 'rename:select', this._itemRenameChanged);
	
	        this.collection.fetch();
	    },
	
	    onRender : function() {
	        this.renamePreviews.show(new LoadingView());
	        this.formatRegion.show(new RenamePreviewFormatView({ model : this.model }));
	    },
	
	    _showPreviews : function() {
	        if (this.collection.length === 0) {
	            this.ui.pathInfo.hide();
	            this.renamePreviews.show(new EmptyCollectionView());
	            return;
	        }
	
	        this.ui.pathInfo.show();
	        this.collection.invoke('set', { rename : true });
	        this.renamePreviews.show(new RenamePreviewCollectionView({ collection : this.collection }));
	    },
	
	    _organizeFiles : function() {
	        if (this.collection.length === 0) {
	            vent.trigger(vent.Commands.CloseModalCommand);
	        }
	
	        var files = _.map(this.collection.where({ rename : true }), function(model) {
	            //return model.get('episodeFileId');
	            return model.get('movieFileId');
	        });
	
	        if (files.length === 0) {
	            vent.trigger(vent.Commands.CloseModalCommand);
	            return;
	        }
	
	        CommandController.Execute('renameMovieFiles', {
	            name         : 'renameMovieFiles',
	            movieId      : this.model.id,
	            files        : files
	        });
	
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _setCheckedState : function(checked) {
	        if (checked) {
	            this.ui.checkboxIcon.addClass('icon-radarr-checked');
	            this.ui.checkboxIcon.removeClass('icon-radarr-unchecked');
	        } else {
	            this.ui.checkboxIcon.addClass('icon-radarr-unchecked');
	            this.ui.checkboxIcon.removeClass('icon-radarr-checked');
	        }
	    },
	
	    _toggleAll : function() {
	        var checked = this.ui.renameAll.prop('checked');
	        this._setCheckedState(checked);
	
	        this.collection.each(function(model) {
	            model.trigger('rename:select', model, checked);
	        });
	    },
	
	    _itemRenameChanged : function(model, checked) {
	        var allChecked = this.collection.all(function(m) {
	            return m.get('rename');
	        });
	
	        if (!checked || allChecked) {
	            this._setCheckedState(checked);
	        }
	    }
	});

/***/ },
/* 463 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var RenamePreviewModel = __webpack_require__(464);
	
	module.exports = Backbone.Collection.extend({
	    url   : window.NzbDrone.ApiRoot + '/renameMovie',
	    model : RenamePreviewModel,
	
	    originalFetch : Backbone.Collection.prototype.fetch,
	
	    initialize : function(options) {
	        if (!options.movieId) {
	            throw 'movieId is required';
	        }
	
	        this.movieId = options.movieId;
	        //this.seasonNumber = options.seasonNumber;
	    },
	
	    fetch : function(options) {
	        if (!this.movieId) {
	            throw 'movieId is required';
	        }
	
	        options = options || {};
	        options.data = {};
	        options.data.movieId = this.movieId;
	
	        // if (this.seasonNumber !== undefined) {
	        //     options.data.seasonNumber = this.seasonNumber;
	        //}
	
	        return this.originalFetch.call(this, options);
	    }
	});

/***/ },
/* 464 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({});

/***/ },
/* 465 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	var RenamePreviewItemView = __webpack_require__(466);
	
	module.exports = Marionette.CollectionView.extend({
	    itemView : RenamePreviewItemView
	});

/***/ },
/* 466 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	
	var view = Marionette.ItemView.extend({
	    template : 'Rename/RenamePreviewItemViewTemplate',
	
	    ui : {
	        itemDiv      : '.rename-preview-item',
	        checkboxIcon : '.rename-checkbox i'
	    },
	
	    onRender : function() {
	        this._setItemState();
	        this.listenTo(this.model, 'change', this._setItemState);
	        this.listenTo(this.model, 'rename:select', this._onRenameAll);
	    },
	
	    _setItemState : function() {
	        var checked = this.model.get('rename');
	        this.model.trigger('rename:select', this.model, checked);
	
	        if (checked) {
	            this.ui.itemDiv.removeClass('do-not-rename');
	            this.ui.checkboxIcon.addClass('icon-radarr-checked');
	            this.ui.checkboxIcon.removeClass('icon-radarr-unchecked');
	        } else {
	            this.ui.itemDiv.addClass('do-not-rename');
	            this.ui.checkboxIcon.addClass('icon-radarr-unchecked');
	            this.ui.checkboxIcon.removeClass('icon-radarr-checked');
	        }
	    },
	
	    _onRenameAll : function(model, checked) {
	        this.model.set('rename', checked);
	    }
	});
	
	module.exports = AsModelBoundView.apply(view);

/***/ },
/* 467 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Rename/RenamePreviewEmptyCollectionViewTemplate'
	});

/***/ },
/* 468 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var NamingModel = __webpack_require__(200);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Rename/RenamePreviewFormatViewTemplate',
	
	    templateHelpers : function() {
	        //var type = this.model.get('seriesType');
	        return {
	            rename : this.naming.get('renameEpisodes'),
	            folderFormat: this.naming.get('movieFolderFormat'),
	            format : this.naming.get('standardMovieFormat')
	        };
	    },
	
	    initialize : function() {
	        this.naming = new NamingModel();
	        this.naming.fetch();
	        this.listenTo(this.naming, 'sync', this.render);
	    }
	});

/***/ },
/* 469 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var CommandController = __webpack_require__(84);
	var EmptyView = __webpack_require__(470);
	var SelectFolderView = __webpack_require__(471);
	var LoadingView = __webpack_require__(120);
	var ManualImportRow = __webpack_require__(472);
	var SelectAllCell = __webpack_require__(313);
	var PathCell = __webpack_require__(473);
	var QualityCell = __webpack_require__(474);
	var FileSizeCell = __webpack_require__(137);
	var ApprovalStatusCell = __webpack_require__(138);
	var ManualImportCollection = __webpack_require__(477);
	var MovieCell = __webpack_require__(479);
	var Messenger = __webpack_require__(52);
	
	module.exports = Marionette.Layout.extend({
	    className : 'modal-lg',
	    template  : 'ManualImport/ManualImportLayoutTemplate',
	
	    regions : {
	        workspace  : '.x-workspace'
	    },
	
	    ui : {
	        importButton : '.x-import',
	        importMode   : '.x-importmode'
	    },
	
	    events : {
	        'click .x-import' : '_import'
	    },
	
	    columns : [
	        {
	            name       : '',
	            cell       : SelectAllCell,
	            headerCell : 'select-all',
	            sortable   : false
	        },
	        {
	            name       : 'relativePath',
	            label      : 'Relative Path',
	            cell       : PathCell,
	            sortable   : true
	        },
	        {
	            name       : 'movie',
	            label      : 'Movie',
	            cell       : MovieCell,
	            sortable   : true
	        },
	        {
	            name       : 'quality',
	            label      : 'Quality',
	            cell       : QualityCell,
	            sortable   : true
	
	        },
	        {
	            name       : 'size',
	            label      : 'Size',
	            cell       : FileSizeCell,
	            sortable   : true
	        },
	        {
	            name       : 'rejections',
	            label      : '<i class="icon-radarr-header-rejections" />',
	            tooltip    : 'Rejections',
	            cell       : ApprovalStatusCell,
	            sortable   : false,
	            sortType   : 'fixed',
	            direction  : 'ascending',
	            title      : 'Import Rejected'
	        }
	    ],
	
	    initialize : function(options) {
	        this.folder = options.folder;
	        this.downloadId = options.downloadId;
	        this.title = options.title;
	        this.importMode = options.importMode || 'Move';
	
	        this.templateHelpers = {
	            title : this.title || this.folder
	        };
	    },
	
	    onRender : function() {
	
	        if (this.folder || this.downloadId) {
	            this._showLoading();
	            this._loadCollection();
	            this.ui.importMode.val(this.importMode);
	        }
	
	        else {
	            this._showSelectFolder();
	            this.ui.importButton.hide();
	            this.ui.importMode.hide();
	        }
	    },
	
	    _showLoading : function () {
	        this.workspace.show(new LoadingView());
	    },
	
	    _loadCollection : function () {
	        this.manualImportCollection = new ManualImportCollection({ folder: this.folder, downloadId: this.downloadId });
	        this.manualImportCollection.fetch();
	
	        this.listenTo(this.manualImportCollection, 'sync', this._showTable);
	        this.listenTo(this.manualImportCollection, 'backgrid:selected', this._updateButtons);
	    },
	
	    _showTable : function () {
	        if (this.manualImportCollection.length === 0) {
	            this.workspace.show(new EmptyView());
	            return;
	        }
	
	        this.fileView = new Backgrid.Grid({
	            columns    : this.columns,
	            collection : this.manualImportCollection,
	            className  : 'table table-hover',
	            row        : ManualImportRow
	        });
	
	        this.workspace.show(this.fileView);
	        this._updateButtons();
	    },
	
	    _showSelectFolder : function () {
	        this.selectFolderView = new SelectFolderView();
	        this.workspace.show(this.selectFolderView);
	
	        this.listenTo(this.selectFolderView, 'manualImport', this._manualImport);
	        this.listenTo(this.selectFolderView, 'automaticImport', this._automaticImport);
	    },
	
	    _manualImport : function (e) {
	        this.folder = e.folder;
	        this.templateHelpers.title = this.folder;
	        this.render();
	    },
	
	    _automaticImport : function (e) {
	        CommandController.Execute('downloadedMoviesScan', {
	            name : 'downloadedMoviesScan',
	            path : e.folder
	        });
	
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _import : function () {
	        var selected = this.fileView.getSelectedModels();
	
	        if (selected.length === 0) {
	            return;
	        }
	
	        if(_.any(selected, function(model) {
	            return !model.has('movie');
	        })) {
	            this._showErrorMessage('Movie must be chosen for each selected file');
	            return;
	        }
	
	        var importMode = this.ui.importMode.val();
	
	        CommandController.Execute('manualImport', {
	            name  : 'manualImport',
	            files : _.map(selected, function (file) {
	                return {
	                    path       : file.get('path'),
	                    movieId    : file.get('movie').id,
	                    quality    : file.get('quality'),
	                    downloadId : file.get('downloadId')
	                };
	            }),
	            importMode : importMode
	        });
	
	        vent.trigger(vent.Commands.CloseModalCommand);
	    },
	
	    _updateButtons : function (model, selected) {
	        if (!this.fileView) {
	            this.ui.importButton.attr('disabled', 'disabled');
	            return;
	        }
	
	        if (!model) {
	            return;
	        }
	
	        var selectedModels = this.fileView.getSelectedModels();
	        var selectedCount = 0;
	
	        if (selected) {
	            selectedCount = _.any(selectedModels, { id : model.id }) ? selectedModels.length : selectedModels.length + 1;
	        }
	
	        else {
	            selectedCount = _.any(selectedModels, { id : model.id }) ? selectedModels.length - 1 : selectedModels.length;
	        }
	
	        if (selectedCount === 0) {
	            this.ui.importButton.attr('disabled', 'disabled');
	        }
	
	        else {
	            this.ui.importButton.removeAttr('disabled');
	        }
	    },
	
	    _showErrorMessage : function (message) {
	        Messenger.show({
	            message   : message,
	            type      : 'error',
	            hideAfter : 5
	        });
	    }
	});


/***/ },
/* 470 */
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.CompositeView.extend({
	    template : 'ManualImport/EmptyViewTemplate'
	});

/***/ },
/* 471 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var $ = __webpack_require__(1);
	var Config = __webpack_require__(33);
	var Marionette = __webpack_require__(11);
	var moment = __webpack_require__(17);
	__webpack_require__(216);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'ManualImport/Folder/SelectFolderViewTemplate',
	
	    ui : {
	        path    : '.x-path',
	        buttons : '.x-button'
	    },
	
	    events: {
	        'click .x-manual-import'    : '_manualImport',
	        'click .x-automatic-import' : '_automaticImport',
	        'change .x-path'            : '_updateButtons',
	        'keyup .x-path'             : '_updateButtons',
	        'click .x-recent-folder'    : '_selectRecentFolder'
	    },
	
	    initialize : function () {
	        this.templateHelpers = {
	            recentFolders: Config.getValueJson('manualimport.recentfolders', [])
	        };
	    },
	
	    onRender : function() {
	        this.ui.path.fileBrowser();
	        this._updateButtons();
	    },
	
	    path : function() {
	        return this.ui.path.val();
	    },
	
	    _manualImport : function () {
	        var path = this.ui.path.val();
	
	        if (path) {
	            this._setRecentFolders(path);
	            this.trigger('manualImport', { folder: path });
	        }
	    },
	
	    _automaticImport : function () {
	        var path = this.ui.path.val();
	
	        if (path) {
	            this._setRecentFolders(path);
	            this.trigger('automaticImport', { folder: path });
	        }
	    },
	
	    _updateButtons : function () {
	        if (this.ui.path.val()) {
	            this.ui.buttons.removeAttr('disabled');
	        }
	
	        else {
	            this.ui.buttons.attr('disabled', 'disabled');
	        }
	    },
	
	    _selectRecentFolder : function (e) {
	        var path = $(e.target).closest('tr').data('path');
	        this.ui.path.val(path);
	        this.ui.path.trigger('change');
	    },
	
	    _setRecentFolders : function (path) {
	        var recentFolders = Config.getValueJson('manualimport.recentfolders', []);
	
	        recentFolders = _.filter(recentFolders, function (folder) {
	            return folder.path.toLowerCase() !== path.toLowerCase();
	        });
	
	        recentFolders.unshift({ path: path, lastUsed: moment.utc().toISOString() });
	
	        Config.setValueJson('manualimport.recentfolders', _.take(recentFolders, 5));
	    }
	});


/***/ },
/* 472 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Row.extend({
	    className : 'manual-import-row',
	
	    _originalInit : Backgrid.Row.prototype.initialize,
	    _originalRender : Backgrid.Row.prototype.render,
	
	    initialize : function () {
	        this._originalInit.apply(this, arguments);
	
	        this.listenTo(this.model, 'change', this._setError);
	        this.listenTo(this.model, 'change', this._setClasses);
	    },
	
	    render : function () {
	        this._originalRender.apply(this, arguments);
	        this._setError();
	        this._setClasses();
	
	        return this;
	    },
	
	    _setError : function () {
	        if (this.model.has('movie') &&
	            this.model.has('quality')) {
	            this.$el.removeClass('manual-import-error');
	        }
	
	        else {
	            this.$el.addClass('manual-import-error');
	        }
	    },
	
	    _setClasses : function () {
	        this.$el.toggleClass('has-movie', this.model.has('movie'));
	    }
	});


/***/ },
/* 473 */
/***/ function(module, exports, __webpack_require__) {

	var NzbDroneCell = __webpack_require__(94);
	
	module.exports = NzbDroneCell.extend({
	    className : 'path-cell',
	
	    render : function() {
	        this.$el.empty();
	
	        var relativePath = this.model.get('relativePath');
	        var path = this.model.get('path');
	
	        this.$el.html('<div title="{0}">{1}</div>'.format(path, relativePath));
	
	        return this;
	    }
	});

/***/ },
/* 474 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var QualityCell = __webpack_require__(125);
	var SelectQualityLayout = __webpack_require__(475);
	
	module.exports = QualityCell.extend({
	    className : 'quality-cell editable',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    _onClick : function () {
	        var view =  new SelectQualityLayout();
	
	        this.listenTo(view, 'manualimport:selected:quality', this._setQuality);
	
	        vent.trigger(vent.Commands.OpenModal2Command, view);
	    },
	
	    _setQuality : function (e) {
	        this.model.set('quality', e.quality);
	    }
	});

/***/ },
/* 475 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var LoadingView = __webpack_require__(120);
	var ProfileSchemaCollection = __webpack_require__(127);
	var SelectQualityView = __webpack_require__(476);
	
	module.exports = Marionette.Layout.extend({
	    template  : 'ManualImport/Quality/SelectQualityLayoutTemplate',
	
	    regions : {
	        quality : '.x-quality'
	    },
	
	    events : {
	        'click .x-select' : '_selectQuality'
	    },
	
	    initialize : function() {
	        this.profileSchemaCollection = new ProfileSchemaCollection();
	        this.profileSchemaCollection.fetch();
	
	        this.listenTo(this.profileSchemaCollection, 'sync', this._showQuality);
	    },
	
	    onRender : function() {
	        this.quality.show(new LoadingView());
	    },
	
	    _showQuality : function () {
	        var qualities = _.map(this.profileSchemaCollection.first().get('items'), function (quality) {
	            return quality.quality;
	        });
	        var formats = _.map(this.profileSchemaCollection.first().get('formatItems'), function (format) {
	            return format.format;
	        });
	
	        this.selectQualityView = new SelectQualityView({ qualities: qualities, formats : formats });
	        this.quality.show(this.selectQualityView);
	    },
	
	    _selectQuality : function () {
	        this.trigger('manualimport:selected:quality', { quality: this.selectQualityView.selectedQuality() });
	        vent.trigger(vent.Commands.CloseModal2Command);
	    }
	});


/***/ },
/* 476 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Marionette = __webpack_require__(11);
	var Backbone = __webpack_require__(6);
	__webpack_require__(235);
	
	module.exports = Marionette.ItemView.extend({
	    template  : 'ManualImport/Quality/SelectQualityViewTemplate',
	
	    ui : {
	        select : '.x-select-quality',
	        proper : 'x-proper',
	        formats: '.x-tags',
	    },
	
	    initialize : function(options) {
	        this.qualities = options.qualities;
	        this.formats = options.formats;
	        this.current = options.current || {};
	
	        this.templateHelpers = {
	            qualities: this.qualities,
	            formats: JSON.stringify(_.map(this.formats, function(f) {
	                return { value : f.id, name : f.name };
	            })),
	        };
	    },
	
	    onRender : function() {
	        if (this.current.formats !== undefined) {
	            this.ui.formats.val(this.current.formats.map(function(m) {return m.id;}).join(","));
	        }
	        if (this.current.quality !== undefined) {
	            this.ui.select.val(this.current.quality.id);
	        }
	        this.ui.formats.tagInput();
	    },
	
	    selectedQuality : function () {
	        var selected = parseInt(this.ui.select.val(), 10);
	        var proper = this.ui.proper.prop('checked');
	
	        var quality = _.find(this.qualities, function(q) {
	            return q.id === selected;
	        });
	
	        var formatIds = this.ui.formats.val().split(',');
	
	        var formats = _.map(_.filter(this.formats, function(f) {
	            return formatIds.includes(f.id + "");
	        }), function(f) {
	            return { name : f.name, id : f.id};
	        });
	
	        return {
	            quality  : quality,
	            revision : {
	                version : proper ? 2 : 1,
	                real    : 0
	            },
	            customFormats : formats
	        };
	    }
	});


/***/ },
/* 477 */
/***/ function(module, exports, __webpack_require__) {

	var PageableCollection = __webpack_require__(29);
	var ManualImportModel = __webpack_require__(478);
	var AsSortedCollection = __webpack_require__(32);
	
	var Collection = PageableCollection.extend({
	    model : ManualImportModel,
	    url   : window.NzbDrone.ApiRoot + '/manualimport',
	
	    state : {
	        sortKey  : 'quality',
	        order    : 1,
	        pageSize : 100000
	    },
	
	    mode : 'client',
	
	    originalFetch : PageableCollection.prototype.fetch,
	
	    initialize : function (options) {
	        options = options || {};
	
	        if (!options.folder && !options.downloadId) {
	            throw 'folder or downloadId is required';
	        }
	
	        this.folder = options.folder;
	        this.downloadId = options.downloadId;
	    },
	
	    fetch : function(options) {
	        options = options || {};
	
	        options.data = { folder : this.folder, downloadId : this.downloadId };
	
	        return this.originalFetch.call(this, options);
	    },
	
	    sortMappings : {
	        movie : {
	            sortValue : function(model, attr, order) {
	                var movie = model.get(attr);
	
	                if (movie) {
	                    return movie.sortTitle;
	                }
	
	                return '';
	            }
	        },
	
	        quality : {
	            sortKey : 'qualityWeight'
	        }
	    },
	
	    comparator : function(model1, model2) {
	        var quality1 = model1.get('quality');
	        var quality2 = model2.get('quality');
	
	        if (quality1 < quality2) {
	            return 1;
	        }
	
	        if (quality1 > quality2) {
	            return -1;
	        }
	
	        return 0;
	    }
	});
	
	Collection = AsSortedCollection.call(Collection);
	
	module.exports = Collection;


/***/ },
/* 478 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	
	module.exports = Backbone.Model.extend({
	});

/***/ },
/* 479 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var NzbDroneCell = __webpack_require__(94);
	var SelectMovieLayout = __webpack_require__(480);
	
	module.exports = NzbDroneCell.extend({
	    className : 'movie-title-cell editable',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    render : function() {
	        this.$el.empty();
	
	        var movie = this.model.get('movie');
	
	        if (movie)
	        {
	            this.$el.html(movie.title + " (" + movie.year + ")" );
	        }
	        else
	        {
	            this.$el.html("Click to select movie");
	        }
	
	        this.delegateEvents();
	        return this;
	    },
	
	    _onClick : function () {
	        var view = new SelectMovieLayout();
	
	        this.listenTo(view, 'manualimport:selected:movie', this._setMovie);
	
	        vent.trigger(vent.Commands.OpenModal2Command, view);
	    },
	
	    _setMovie : function (e) {
	        if (this.model.has('movie') && e.model.id === this.model.get('movie').id) {
	            return;
	        }
	
	        this.model.set({
	            movie       : e.model.toJSON()
	        });
	    }
	});

/***/ },
/* 480 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var Backgrid = __webpack_require__(78);
	var MoviesCollection = __webpack_require__(62);
	var SelectRow = __webpack_require__(481);
	var FullMovieCollection = __webpack_require__(61);
	var Backbone = __webpack_require__(6);
	
	module.exports = Marionette.Layout.extend({
	    template  : 'ManualImport/Movie/SelectMovieLayoutTemplate',
	
	    regions : {
	        movie : '.x-movie'
	    },
	
	    ui : {
	        filter : '.x-filter'
	    },
	
	    columns : [
	        {
	            name      : 'title',
	            label     : 'Title',
	            cell      : 'String',
	            sortValue : 'title'
	        },
	        {
	            name      : 'year',
	            label     : 'Year',
	            cell      : 'String',
	            sortValue : 'year'
	        }
	    ],
	
	    initialize : function() {
	        this.fullMovieCollection = FullMovieCollection;
	        this.movieCollection = new Backbone.Collection(this.fullMovieCollection.first(20));
	        this._setModelCollection();
	
	        this.listenTo(this.movieCollection, 'row:selected', this._onSelected);
	        this.listenTo(this, 'modal:afterShow', this._setFocus);
	    },
	
	    onRender : function() {
	        this.movieView = new Backgrid.Grid({
	            columns    : this.columns,
	            collection : this.movieCollection,
	            className  : 'table table-hover season-grid',
	            row        : SelectRow
	        });
	
	        this.movie.show(this.movieView);
	        this._setupFilter();
	    },
	
	    _setupFilter : function () {
	        var self = this;
	
	        //TODO: This should be a mixin (same as Add Movie searching)
	        this.ui.filter.keyup(function(e) {
	            if (_.contains([
	                    9,
	                    16,
	                    17,
	                    18,
	                    19,
	                    20,
	                    33,
	                    34,
	                    35,
	                    36,
	                    37,
	                    38,
	                    39,
	                    40,
	                    91,
	                    92,
	                    93
	                ], e.keyCode)) {
	                return;
	            }
	
	            self._filter(self.ui.filter.val());
	        });
	    },
	
	    _filter : function (term) {
	        this.movieCollection.reset(this.fullMovieCollection.filter(function(model){
	            return (model.get("title") + " "+model.get("year")+"").toLowerCase().indexOf(term.toLowerCase()) !== -1;
	        }).slice(0, 50));
	
	        this._setModelCollection();
	        //this.movieView.render();
	    },
	
	    _onSelected : function (e) {
	        this.trigger('manualimport:selected:movie', { model: e.model });
	
	        vent.trigger(vent.Commands.CloseModal2Command);
	    },
	
	    _setFocus : function () {
	        this.ui.filter.focus();
	    },
	
	    _setModelCollection: function () {
	        var self = this;
	
	        _.each(this.movieCollection.models, function (model) {
	            model.collection = self.movieCollection;
	        });
	    }
	});


/***/ },
/* 481 */
/***/ function(module, exports, __webpack_require__) {

	var Backgrid = __webpack_require__(78);
	
	module.exports = Backgrid.Row.extend({
	    className : 'select-row select-movie-row',
	
	    events : {
	        'click' : '_onClick'
	    },
	
	    _onClick : function() {
	        this.model.collection.trigger('row:selected', { model: this.model });
	    }
	});

/***/ },
/* 482 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	var AsModelBoundView = __webpack_require__(206);
	var AsValidatedView = __webpack_require__(208);
	var AsEditModalView = __webpack_require__(243);
	var LoadingView = __webpack_require__(120);
	var ProfileSchemaCollection = __webpack_require__(127);
	var SelectQualityView = __webpack_require__(476);
	
	var view = Marionette.Layout.extend({
			template : 'Movies/Files/Media/Edit/EditFileTemplate',
	
			ui : {
					quality : '.x-quality',
					path    : '.x-path',
					tags    : '.x-tags'
			},
	
	        regions : {
			    selectQuality : '#select-quality'
	        },
	
			events : {
	
			},
	
	        initialize : function() {
	            this.profileSchemaCollection = new ProfileSchemaCollection();
	            this.profileSchemaCollection.fetch();
	
	            this.listenTo(this.profileSchemaCollection, 'sync', this._showQuality);
	        },
	
	        onRender : function() {
	            this.selectQuality.show(new LoadingView());
	        },
	
	        _showQuality : function () {
	            var qualities = _.map(this.profileSchemaCollection.first().get('items'), function (quality) {
	                return quality.quality;
	            });
	            var formats = _.map(this.profileSchemaCollection.first().get('formatItems'), function (format) {
	                return format.format;
	            });
	
	            var quality = this.model.get("quality");
	
	            this.selectQualityView = new SelectQualityView({ qualities: qualities, formats : formats, current : {
	                    formats : quality.customFormats, quality : quality.quality
	                }
	            });
	            this.selectQuality.show(this.selectQualityView);
	        },
	
			_onBeforeSave : function() {
					this.model.set({ quality : this.selectQualityView.selectedQuality() });
			},
	
			_onAfterSave : function() {
					this.trigger('saved');
					vent.trigger(vent.Commands.MovieFileEdited);
					vent.trigger(vent.Commands.CloseModalCommand);
			},
	
	});
	
	AsModelBoundView.call(view);
	AsValidatedView.call(view);
	AsEditModalView.call(view);
	
	module.exports = view;


/***/ },
/* 483 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var AppLayout = __webpack_require__(68);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.AppRouter.extend({
	    initialize : function() {
	        vent.on(vent.Commands.OpenControlPanelCommand, this._openControlPanel, this);
	        vent.on(vent.Commands.CloseControlPanelCommand, this._closeControlPanel, this);
	    },
	
	    _openControlPanel : function(view) {
	        AppLayout.controlPanelRegion.show(view);
	    },
	
	    _closeControlPanel : function() {
	        AppLayout.controlPanelRegion.closePanel();
	    }
	});

/***/ },
/* 484 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(71);
	
	var Tooltip = $.fn.tooltip.Constructor;
	
	var origGetOptions = Tooltip.prototype.getOptions;
	Tooltip.prototype.getOptions = function(options) {
	    var result = origGetOptions.call(this, options);
	
	    if (result.container === false) {
	
	        var container = this.$element.closest('.btn-group,.input-group').parent();
	
	        if (container.length) {
	            result.container = container;
	        }
	    }
	
	    return result;
	};
	
	var onElementRemoved = function(event) {
	    event.data.hide();
	};
	
	var origShow = Tooltip.prototype.show;
	Tooltip.prototype.show = function() {
	    origShow.call(this);
	
	    this.$element.on('remove', this, onElementRemoved);
	};
	
	var origHide = Tooltip.prototype.hide;
	Tooltip.prototype.hide = function() {
	    origHide.call(this);
	
	    this.$element.off('remove', onElementRemoved);
	};
	
	module.exports = {
	    appInitializer : function() {
	
	        $('body').tooltip({ selector : '[title]' });
	
	        return this;
	    }
	};

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	var UiSettingsModel = __webpack_require__(22);
	
	var Controller = {
	
	    appInitializer : function() {
	
	        UiSettingsModel.on('sync', this._updateUiSettings);
	
	        this._updateUiSettings();
	    },
	
	    _updateUiSettings: function() {
	
	        if (UiSettingsModel.get('enableColorImpairedMode')) {
	            $('body').addClass('color-impaired-mode');
	        } else {
	            $('body').removeClass('color-impaired-mode');
	        }
	    }
	};
	
	_.bindAll(Controller, 'appInitializer');
	
	module.exports = Controller;

/***/ },
/* 486 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8);
	var Backbone = __webpack_require__(6);
	var PageableCollection = __webpack_require__(29);
	var SeriesModel = __webpack_require__(487);
	var ApiData = __webpack_require__(23);
	var AsFilteredCollection = __webpack_require__(63);
	var AsSortedCollection = __webpack_require__(32);
	var AsPersistedStateCollection = __webpack_require__(64);
	var moment = __webpack_require__(17);
	__webpack_require__(37);
	
	var Collection = PageableCollection.extend({
	    url       : window.NzbDrone.ApiRoot + '/series',
	    model     : SeriesModel,
	    tableName : 'series',
	
	    state : {
	        sortKey            : 'sortTitle',
	        order              : -1,
	        pageSize           : 100000,
	        secondarySortKey   : 'sortTitle',
	        secondarySortOrder : -1
	    },
	
	    mode : 'client',
	
	    save : function() {
	        var self = this;
	
	        var proxy = _.extend(new Backbone.Model(), {
	            id : '',
	
	            url : self.url + '/editor',
	
	            toJSON : function() {
	                return self.filter(function(model) {
	                    return model.edited;
	                });
	            }
	        });
	
	        this.listenTo(proxy, 'sync', function(proxyModel, models) {
	            this.add(models, { merge : true });
	            this.trigger('save', this);
	        });
	
	        return proxy.save();
	    },
	
	    filterModes : {
	        'all'        : [
	            null,
	            null
	        ],
	        'continuing' : [
	            'status',
	            'continuing'
	        ],
	        'ended'      : [
	            'status',
	            'ended'
	        ],
	        'monitored'  : [
	            'monitored',
	            true
	        ],
	        'missing'  : [
	            null,
	            null,
	            function(model) { return model.get('episodeCount') !== model.get('episodeFileCount'); }
	        ]
	    },
	
	    sortMappings : {
	        title : {
	            sortKey : 'sortTitle'
	        },
	
	        nextAiring : {
	            sortValue : function(model, attr, order) {
	                var nextAiring = model.get(attr);
	
	                if (nextAiring) {
	                    return moment(nextAiring).unix();
	                }
	
	                if (order === 1) {
	                    return 0;
	                }
	
	                return Number.MAX_VALUE;
	            }
	        },
	
	        path : {
	            sortValue : function(model) {
	                var path = model.get('path');
	
	                return path.toLowerCase();
	            }
	        }
	    }
	});
	
	Collection = AsFilteredCollection.call(Collection);
	Collection = AsSortedCollection.call(Collection);
	Collection = AsPersistedStateCollection.call(Collection);
	
	var data = ApiData.get('series');
	
	module.exports = new Collection(data, { full : true }).bindSignalR(); 

/***/ },
/* 487 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(6);
	var _ = __webpack_require__(8);
	
	module.exports = Backbone.Model.extend({
	    urlRoot : window.NzbDrone.ApiRoot + '/series',
	
	    defaults : {
	        episodeFileCount : 0,
	        episodeCount     : 0,
	        isExisting       : false,
	        status           : 0
	    },
	
	    setSeasonMonitored : function(seasonNumber) {
	        _.each(this.get('seasons'), function(season) {
	            if (season.seasonNumber === seasonNumber) {
	                season.monitored = !season.monitored;
	            }
	        });
	    },
	
	    setSeasonPass : function(seasonNumber) {
	        _.each(this.get('seasons'), function(season) {
	            if (season.seasonNumber >= seasonNumber) {
	                season.monitored = true;
	            } else {
	                season.monitored = false;
	            }
	        });
	    }
	});

/***/ },
/* 488 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var _ = __webpack_require__(8);
	
	$(document).ready(function() {
	    var _window = $(window);
	    var _scrollContainer = $('#scroll-up');
	    var _scrollButton = $('#scroll-up i');
	
	    var _scrollHandler = function() {
	        if (_window.scrollTop() > 400) {
	            _scrollContainer.fadeIn();
	        } else {
	            _scrollContainer.fadeOut();
	        }
	    };
	
	    $(window).scroll(_.throttle(_scrollHandler, 500));
	    _scrollButton.click(function() {
	        $('html, body').animate({ scrollTop : 0 }, 600);
	        return false;
	    });
	});
	


/***/ },
/* 489 */
/***/ function(module, exports) {

	window.onbeforeunload = function() {
	    window.NzbDrone.unloading = true;
	};

/***/ },
/* 490 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	var HotkeysView = __webpack_require__(491);
	
	$(document).on('keypress', function(e) {
	    if ($(e.target).is('input') || $(e.target).is('textarea')) {
	        return;
	    }
	
	    if (e.charCode === 63) {
	        vent.trigger(vent.Commands.OpenModalCommand, new HotkeysView());
	    }
	});
	
	$(document).on('keydown', function(e) {
	    if (e.ctrlKey && e.keyCode === 83) {
	        vent.trigger(vent.Hotkeys.SaveSettings);
	        e.preventDefault();
	        return;
	    }
	
	    if ($(e.target).is('input') || $(e.target).is('textarea')) {
	        return;
	    }
	
	    if (e.ctrlKey || e.metaKey || e.altKey) {
	        return;
	    }
	
	    if (e.keyCode === 84) {
	        vent.trigger(vent.Hotkeys.NavbarSearch);
	        e.preventDefault();
	    }
	});


/***/ },
/* 491 */
/***/ function(module, exports, __webpack_require__) {

	var vent = __webpack_require__(34);
	var Marionette = __webpack_require__(11);
	
	module.exports = Marionette.ItemView.extend({
	    template : 'Hotkeys/HotkeysViewTemplate'
	});

/***/ },
/* 492 */
/***/ function(module, exports) {

	'use strict';
	if(window.NzbDrone.Analytics) {
	    var d = document;
	    var g = d.createElement('script');
	    var s = d.getElementsByTagName('script')[0];
	    g.type = 'text/javascript';
	    g.async = true;
	    g.defer = true;
	    g.src = 'https://radarr.video/piwik/piwik.js';
	    s.parentNode.insertBefore(g, s);
	}


/***/ },
/* 493 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var vent = __webpack_require__(34);
	
	$(document).ajaxSuccess(function(event, xhr) {
	    var version = xhr.getResponseHeader('X-ApplicationVersion');
	    if (!version || !window.NzbDrone || !window.NzbDrone.Version) {
	        return;
	    }
	
	    if (version !== window.NzbDrone.Version) {
	        vent.trigger(vent.Events.ServerUpdated);
	    }
	});


/***/ }
]);
//# sourceMappingURL=main.map