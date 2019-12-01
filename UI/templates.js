Handlebars.registerPartial("MoviesTypeSelectionPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select class=\"form-control col-md-2 x-movie-type\" name=\"movieType\">\n    <option value=\"standard\">Standard</option>\n</select>\n";
  },"useData":true}))
Handlebars.registerPartial("StartingSeasonSelectionPartial", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.seasonNumber : depth0), {"name":"if_eq","hash":{
    'compare': ("0")
  },"fn":this.program(2, data),"inverse":this.program(4, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.seasonNumber || (depth0 != null ? depth0.seasonNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"seasonNumber","hash":{},"data":data}) : helper)))
    + "\">Specials</option>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.seasonNumber || (depth0 != null ? depth0.seasonNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"seasonNumber","hash":{},"data":data}) : helper)))
    + "\">Season "
    + escapeExpression(((helper = (helper = helpers.seasonNumber || (depth0 != null ? depth0.seasonNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"seasonNumber","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"form-control col-md-2 starting-season x-starting-season\">\n\n\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    <option value=\"5000000\">None</option>\n</select>\n";
},"useData":true}))
Handlebars.registerPartial("FormHelpPartial", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon-radarr-form-info\" title=\""
    + escapeExpression(((helper = (helper = helpers.helpText || (depth0 != null ? depth0.helpText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"helpText","hash":{},"data":data}) : helper)))
    + "\"/>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.helpLink || (depth0 != null ? depth0.helpLink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"helpLink","hash":{},"data":data}) : helper)))
    + "\" class=\"help-link\"><i class=\"icon-radarr-form-info-link\"/></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<span class=\"col-sm-1 help-inline\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.helpText : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.helpLink : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"useData":true}))
Handlebars.registerPartial("ProfileSelectionPartial", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"col-md-2 form-control x-profile\">\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>";
},"useData":true}))
Handlebars.registerPartial("PageSizePartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select class=\"col-md-2 form-control page-size x-page-size\">\n    <option value=\"15\">15</option>\n    <option value=\"30\">30</option>\n    <option value=\"50\">50</option>\n    <option value=\"100\">100</option>\n    <option value=\"500\">500</option>\n    <option value=\"1000\">1000</option>\n</select>\n";
  },"useData":true}))
Handlebars.registerPartial("RootFolderSelectionPartial", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"4":function(depth0,helpers,partials,data) {
  return "    <option value=\"\">Select Path</option>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"col-md-4 form-control x-root-folder\" validation-name=\"RootFolderPath\">\n";
  stack1 = helpers['if'].call(depth0, depth0, {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    <option value=\"addNew\">Add a different path</option>\n</select>\n\n";
},"useData":true}))
Handlebars.registerPartial("ListSelectionPartial", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"4":function(depth0,helpers,partials,data) {
  return "		<option value=\"\">Select List</option>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"col-md-4 form-control x-list-selection\" validation-name=\"ListSelection\">\n		<option value=\"0\">All</option>\n";
  stack1 = helpers['if'].call(depth0, depth0, {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		<option value=\"addNew\">Add a new list</option>\n</select>\n";
},"useData":true}))
Handlebars.registerPartial("ImdbIdNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li><a href=\"#\" data-token=\"IMDb Id\">IMDb Id</a></li>";
  },"useData":true}))
Handlebars.registerPartial("MediaInfoNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-token=\"MediaInfo.Simple\">MediaInfo</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-token=\"MediaInfo Simple\">MediaInfo Simple</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo.Simple\">MediaInfo.Simple</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo_Simple\">MediaInfo_Simple</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo Full\">MediaInfo Full</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo.Full\">MediaInfo.Full</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo_Full\">MediaInfo_Full</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo AudioLanguages\">MediaInfo AudioLanguages</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo.AudioLanguages\">MediaInfo.AudioLanguages</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo_AudioLanguages\">MediaInfo_AudioLanguages</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo AudioLanguagesAll\">MediaInfo AudioLanguagesAll</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo.AudioLanguagesAll\">MediaInfo.AudioLanguagesAll</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo_AudioLanguagesAll\">MediaInfo_AudioLanguagesAll</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo SubtitleLanguages\">MediaInfo SubtitleLanguages</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo.SubtitleLanguages\">MediaInfo.SubtitleLanguages</a></li>\n        <li><a href=\"#\" data-token=\"MediaInfo_SubtitleLanguages\">MediaInfo_SubtitleLanguages</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
Handlebars.registerPartial("MovieTitleNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-token=\"Movie Title\">Movie Title</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-token=\"Movie Title\">Movie Title</a></li>\n        <li><a href=\"#\" data-token=\"Movie.Title\">Movie.Title</a></li>\n        <li><a href=\"#\" data-token=\"Movie_Title\">Movie_Title</a></li>\n        <li><a href=\"#\" data-token=\"Movie TitleThe\">Movie Title, The</a></li>\n        <li><a href=\"#\" data-token=\"Movie CleanTitle\">Movie CleanTitle</a></li>\n        <li><a href=\"#\" data-token=\"Movie.CleanTitle\">Movie.CleanTitle</a></li>\n        <li><a href=\"#\" data-token=\"Movie_CleanTitle\">Movie_CleanTitle</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
Handlebars.registerPartial("OriginalTitleNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li><a href=\"#\" data-token=\"Original Title\">Original Title</a></li>";
  },"useData":true}))
Handlebars.registerPartial("QualityNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-token=\"Quality Full\">Quality</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-token=\"Quality Full\">Quality Full</a></li>\n        <li><a href=\"#\" data-token=\"Quality.Full\">Quality.Full</a></li>\n        <li><a href=\"#\" data-token=\"Quality_Full\">Quality_Full</a></li>\n        <li><a href=\"#\" data-token=\"Quality Title\">Quality Title</a></li>\n        <li><a href=\"#\" data-token=\"Quality.Title\">Quality.Title</a></li>\n        <li><a href=\"#\" data-token=\"Quality_Title\">Quality_Title</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
Handlebars.registerPartial("ReleaseGroupNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-token=\"Release Group\">Release Group</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-token=\"Release Group\">Release Group</a></li>\n        <li><a href=\"#\" data-token=\"Release.Group\">Release.Group</a></li>\n        <li><a href=\"#\" data-token=\"Release_Group\">Release_Group</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
Handlebars.registerPartial("ReleaseYearNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li><a href=\"#\" data-token=\"Release Year\">Release Year</a></li>";
  },"useData":true}))
Handlebars.registerPartial("SeparatorNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-separator=\" - \">Separator</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-separator=\" - \">Space-Dash-Space</a></li>\n        <li><a href=\"#\" data-separator=\"-\">Dash</a></li>\n        <li><a href=\"#\" data-separator=\" \">Space</a></li>\n        <li><a href=\"#\" data-separator=\".\">Period</a></li>\n        <li><a href=\"#\" data-separator=\"_\">Underscore</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
Handlebars.registerPartial("TagsNamingPartial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"dropdown-submenu\">\n    <a href=\"#\" tabindex=\"-1\" data-token=\"Tags\">Tags</a>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\" data-token=\"Edition Tags\">Edition Tags</a></li>\n        <li><a href=\"#\" data-token=\"Edition.Tags\">Edition.Tags</a></li>\n        <li><a href=\"#\" data-token=\"Edition_Tags\">Edition_Tags</a></li>\n    </ul>\n</li>\n";
  },"useData":true}))
this["T"] = this["T"] || {};
this["T"]["activity/activitylayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul class=\"nav nav-tabs\">\n    <li><a href=\"#queue\" class=\"x-queue-tab no-router\">Queue</a></li>\n    <li><a href=\"#history\" class=\"x-history-tab no-router\">History</a></li>\n    <li><a href=\"#blacklist\" class=\"x-blacklist-tab no-router\">Blacklist</a></li>\n</ul>\n\n<div class=\"tab-content\">\n    <div class=\"tab-pane\" id=\"queue\"></div>\n    <div class=\"tab-pane\" id=\"history\"></div>\n    <div class=\"tab-pane\" id=\"blacklist\"></div>\n</div>";
  },"useData":true};
this["T"]["addmovies/addmovieslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n		<div class=\"col-md-12\">\n				<div class=\"btn-group add-movies-btn-group btn-group-lg btn-block btn-group-collapse\">\n						<button class=\"btn btn-default col-md-3 col-xs-12 x-bulk-import\">\n                            <i class=\"icon-radarr-view-list hidden-xs\" aria-hidden=\"true\"></i>\n                            Bulk Import Movies\n                        </button>\n						<button type=\"button\" class=\"btn btn-default col-md-4 col-xs-12 add-movies-import-btn x-discover\">\n                            <i class=\"icon-radarr-star hidden-xs\" aria-hidden=\"true\"></i>\n                            Discover New movies\n                        </button>\n						<button class=\"btn btn-default col-md-2 col-xs-12 x-add-new\">\n                            <i class=\"icon-radarr-active hidden-xs\" aria-hidden=\"true\"></i>\n                            Add New Movie\n                        </button>\n						<button class=\"btn btn-default col-md-3 col-xs-12 x-add-lists\">\n                            <i class=\"icon-radarr-active hidden-xs\" aria-hidden=\"true\"></i>\n                            Add Movies from Lists\n                        </button>\n				</div>\n		</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-md-12\">\n		<div class=\"form-horizontal\" style=\"margin-top: 15px;\">\n			<div id=\"show-existing-movies-toggle\">\n				<div class=\"form-group\" style=\"margin-bottom: 0px;\">\n					<label class=\"col-sm-3 control-label\">Display Existing Movies</label>\n\n					<div class=\"col-sm-8\">\n						<div class=\"input-group\">\n							<label class=\"checkbox toggle well\">\n								<input class=\"x-show-existing\" type=\"checkbox\" checked=\"checked\" name=\"showExisting\"/>\n								<p>\n										<span>Yes</span>\n										<span>No</span>\n								</p>\n\n								<div class=\"btn btn-primary slide-button\"/>\n							</label>\n\n							<span class=\"help-inline-checkbox\">\n                                <i class=\"icon-radarr-form-info\" title=\"Should Radarr display movies already in your collection?\"></i>\n							</span>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n<div class=\"row\">\n		<div class=\"col-md-12\">\n				<div id=\"add-movies-workspace\"></div>\n		</div>\n</div>\n";
  },"useData":true};
this["T"]["addmovies/addmoviesview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"unmapped-folder-path\">\n    <div class=\"col-md-12\">\n        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.folder : depth0)) != null ? stack1.path : stack1), depth0))
    + "\n    </div>\n</div>";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <input type=\"text\" class=\"form-control x-movies-search\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.folder : depth0)) != null ? stack1.name : stack1), depth0))
    + "\">\n";
},"5":function(depth0,helpers,partials,data) {
  return "        <input type=\"text\" class=\"form-control x-movies-search\" placeholder=\"Start typing the name of the movie you want to add ...\">\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.folder : depth0)) != null ? stack1.path : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n<div class=\"x-discover-before\">\n  <ul class=\"nav nav-tabs nav-justified settings-tabs\">\n  		<li><a href=\"#media-management\" class=\"x-recommendations-tab no-router\">Recommendations</a></li>\n  		<li><a href=\"#popular\" class=\"x-popular-tab no-router\">Popular</a></li>\n  		<li><a href=\"#upcoming\" class=\"x-upcoming-tab no-router\">Upcoming</a></li>\n      <li role=\"presentation\" class=\"dropdown\">\n    <a class=\"dropdown-toggle x-lists-tab\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n      Lists <span class=\"caret\"></span>\n    </a>\n        <ul id=\"list-dropdown\" class=\"dropdown-menu\">\n        </ul>\n  </li>\n  </ul>\n  <h2 class=\"x-discover-header\">\n    Recommendations by The Movie Database based on your library:\n  </h2>\n</div>\n\n<div class=\"x-search-bar\">\n    <div class=\"input-group input-group-lg add-movies-search\">\n        <span class=\"input-group-addon\"><i class=\"icon-radarr-search\"/></span>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.folder : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n<div class=\"row\">\n    <div id=\"search-result\" class=\"result-list col-md-12\"/>\n</div>\n<div class=\"btn btn-block text-center new-movies-loadmore x-load-more\" style=\"display: none;\">\n    <i class=\"icon-radarr-load-more\"/>\n    more\n</div>\n";
},"useData":true};
this["T"]["addmovies/discoverablelistdropdownview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"clickable discoverable-list-item\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["addmovies/discoveremptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"text-center col-md-12\">\n    <h3>\n        No movies left to discover. Come back at another time :)\n    </h3>\n\n</div>\n";
  },"useData":true};
this["T"]["addmovies/emptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"text-center hint col-md-12\">\n    <span>You can also search by imdbid using the imdb: prefixes.</span>\n</div>\n";
  },"useData":true};
this["T"]["addmovies/errorview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"text-center col-md-12\">\n    <h3>\n        There was an error searching for '"
    + escapeExpression(((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"term","hash":{},"data":data}) : helper)))
    + "'.\n    </h3>\n\n    If the movie title contains non-alphanumeric characters try removing them, otherwise try your search again later.\n</div>\n";
},"useData":true};
this["T"]["addmovies/minimumavailabilitytooltip"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<dl class=\"minimumavailability-tooltip-contents\">\n    <dt>Announced</dt>\n    <dd>Consider the movie available after it has been announced</dd>\n    <dt>In Cinemas</dt>\n    <dd>Consider the movie available once it is In Cinemas</dd>\n    <dt>Physical/Web</dt>\n    <dd>Consider the movie available after Physical/Web release</dd>\n    <dt>PreDB</dt>\n    <dd>Consider the movie available if preDB contains at least one entry</dd>\n</dl>\n";
  },"useData":true};
this["T"]["addmovies/monitoringtooltip"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<dl class=\"monitor-tooltip-contents\">\n    <dt>Yes</dt>\n    <dd>Monitor for new releases</dd>\n    <dt>No</dt>\n    <dd>Do not monitor for new releases</dd>\n</dl>";
  },"useData":true};
this["T"]["addmovies/notfoundview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"text-center col-md-12\">\n    <h3>\n        Sorry. We couldn't find any movies matching '"
    + escapeExpression(((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"term","hash":{},"data":data}) : helper)))
    + "'\n    </h3>\n    <a href=\"https://github.com/Radarr/Radarr/wiki/FAQ#why-cant-i-add-a-new-movie-to-radarr-its-on-tmdb\">Why can't I find my movie?</a>\n\n</div>\n";
},"useData":true};
this["T"]["addmovies/searchresultview"] = {"1":function(depth0,helpers,partials,data) {
  return "search-item-new";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helper = (helper = helpers.remotePoster || (depth0 != null ? depth0.remotePoster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"remotePoster","hash":{},"data":data}) : helper)))
    + "\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n";
},"7":function(depth0,helpers,partials,data) {
  return "                                <span class=\"label label-default\">Announced</span>\n";
  },"9":function(depth0,helpers,partials,data) {
  return "                                <span class=\"label label-success\">Released</span>\n";
  },"11":function(depth0,helpers,partials,data) {
  return "                                <span class=\"label label-warning\">In Cinemas</span>\n";
  },"13":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            <span class=\"label label-info\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.youTubeTrailerUrl || (depth0 != null ? depth0.youTubeTrailerUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"youTubeTrailerUrl","hash":{},"data":data}) : helper)))
    + "\" style=\"color: white;\">Trailer</a></span>\n";
},"15":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            <span class=\"label label-info\" title=\""
    + escapeExpression(((helper = (helper = helpers.physicalReleaseNote || (depth0 != null ? depth0.physicalReleaseNote : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"physicalReleaseNote","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.inCinemas || (depth0 != null ? depth0.inCinemas : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inCinemas","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.path : depth0), {"name":"unless","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                    <div class=\"form-group col-md-2\">\n                        <label>Monitor <i class=\"icon-radarr-form-info monitor-tooltip x-monitor-tooltip\"></i></label>\n                        <select class=\"form-control col-md-2 x-monitor\">\n                            <option value=\"all\">Yes</option>\n                            <option value=\"none\">No</option>\n                        </select>\n                    </div>\n\n		    <div class=\"form-group col-md-2\">\n		        <label>Min Availability <i class=\"icon-radarr-form-info minimumavailability-tooltip x-minimumavailability-tooltip\"></i></label>\n			<select class=\"form-control col-md-2 x-minimumavailability\">\n			    <option value=\"announced\">Announced</option>\n			    <option value=\"inCinemas\">In Cinemas</option>\n			    <option value=\"released\">Physical/Web</option>\n			    <option value=\"preDB\">PreDB</option>\n			</select>\n	            </div>\n\n                    <div class=\"form-group col-md-2\">\n                        <label>Profile</label>\n";
  stack1 = this.invokePartial(partials.ProfileSelectionPartial, '                        ', 'ProfileSelectionPartial', (depth0 != null ? depth0.profiles : depth0), undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </div>\n\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                        <div class=\"form-group col-md-4\">\n                            <label>Path</label>\n";
  stack1 = this.invokePartial(partials.RootFolderSelectionPartial, '                            ', 'RootFolderSelectionPartial', (depth0 != null ? depth0.rootFolders : depth0), undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </div>\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"21":function(depth0,helpers,partials,data) {
  return "                    <div class=\"form-group col-md-2\">\n                        <label style=\"visibility: hidden\">Add</label>\n                        <div class=\"btn-group\">\n                            <button class=\"btn btn-success add x-add\" title=\"Add\">\n                                <i class=\"icon-radarr-add\"></i>\n                            </button>\n\n                            <button class=\"btn btn-success add x-add-search\" title=\"Add and Search for movie\">\n                                <i class=\"icon-radarr-search\"></i>\n                            </button>\n\n                            <button class=\"btn btn-warning ignore x-ignore\" title=\"Ignore this movie, so it does not show up anymore\">\n                                <i class=\"icon-radarr-ignore\"></i>\n                            </button>\n                        </div>\n                    </div>\n";
  },"23":function(depth0,helpers,partials,data) {
  return "                      <label style=\"visibility: hidden\">Add</label>\n                        <div class=\"col-md-2\" title=\"Movies require an English title\">\n                            <button class=\"btn add-movies disabled\">\n                                Add\n                            </button>\n                        </div>\n";
  },"25":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                  <label style=\"visibility: hidden\">Add</label>\n                    <div class=\"col-md-2 col-md-offset-10\">\n                        <a class=\"btn btn-default\" href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">\n                            Already Exists\n                        </a>\n                    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\"search-item ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.isExisting : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.remotePoster : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </a>\n        </div>\n        <div class=\"col-md-10\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <h2 class=\"movie-title\">\n                        "
    + escapeExpression(((helper = (helper = helpers.titleWithYear || (depth0 != null ? depth0.titleWithYear : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"titleWithYear","hash":{},"data":data}) : helper)))
    + "\n\n                        <span class=\"labels\">\n                            <span class=\"label label-default\">"
    + escapeExpression(((helper = (helper = helpers.network || (depth0 != null ? depth0.network : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"network","hash":{},"data":data}) : helper)))
    + "</span>\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("announced")
  },"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("released")
  },"fn":this.program(9, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("inCinemas")
  },"fn":this.program(11, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "                            <span class=\"label label-default\" title=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.votes : stack1), depth0))
    + " Vote(s)\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.value : stack1), depth0))
    + "</span>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.youTubeTrailerId : depth0), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.physicalRelease : depth0), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </span>\n\n\n                    </h2>\n                </div>\n            </div>\n            <div class=\"row new-movies-overview x-overview\">\n                <div class=\"col-md-12 overview-internal\">\n                    "
    + escapeExpression(((helper = (helper = helpers.overview || (depth0 != null ? depth0.overview : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"overview","hash":{},"data":data}) : helper)))
    + "\n                </div>\n            </div>\n            <div class=\"row\">\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.existing : depth0), {"name":"unless","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.existing : depth0), {"name":"unless","hash":{},"fn":this.program(20, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n        </div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true};
this["T"]["calendar/calendarfeedview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n		<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n				<h3>Radarr Calendar feed</h3>\n		</div>\n		<div class=\"modal-body edit-movie-modal\">\n				<div class=\"form-horizontal\">\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">Include Unmonitored</label>\n\n								<div class=\"col-sm-4\">\n										<div class=\"input-group\">\n												<label class=\"checkbox toggle well\">\n														<input type=\"checkbox\" name=\"includeUnmonitored\" class=\"form-control x-includeUnmonitored\"/>\n\n														<p>\n																<span>Yes</span>\n																<span>No</span>\n														</p>\n\n														<div class=\"btn btn-primary slide-button\"/>\n												</label>\n										</div>\n								</div>\n						</div>\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">Tags</label>\n\n								<div class=\"col-sm-1 col-sm-push-5 help-inline\">\n										<i class=\"icon-radarr-form-info\" title=\"One or more tags only show matching series\" />\n								</div>\n\n								<div class=\"col-sm-5 col-sm-pull-1\">\n										<input type=\"text\" class=\"form-control x-tags\">\n								</div>\n						</div>\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">iCal feed</label>\n								<div class=\"col-sm-1 col-sm-push-8 help-inline\">\n										<i class=\"icon-radarr-form-info\" title=\"Copy this url into your clients subscription form or use the subscribe button if your browser support webcal\" />\n								</div>\n								<div class=\"col-sm-8 col-sm-pull-1\">\n										<div class=\"input-group ical-url\">\n												<input type=\"text\" class=\"form-control x-ical-url\" readonly=\"readonly\" />\n												<div class=\"input-group-btn\">\n														<button class=\"btn btn-icon-only x-ical-copy\"><i class=\"icon-radarr-copy\"></i></button>\n														<button class=\"btn btn-icon-only no-router x-ical-webcal\" title=\"Subscribe\" target=\"_blank\"><i class=\"icon-radarr-calendar-o\"></i></button>\n												</div>\n										</div>\n								</div>\n						</div>\n				</div>\n		</div>\n		<div class=\"modal-footer\">\n				<button class=\"btn\" data-dismiss=\"modal\">Close</button>\n		</div>\n</div>\n";
  },"useData":true};
this["T"]["calendar/calendarlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-3 hidden-xs\">\n        <div class=\"pull-left\">\n            <h4>Upcoming</h4>\n        </div>\n        <div id=\"x-upcoming\"/>\n    </div>\n    <div class=\"col-md-9 col-xs-12\">\n        <div id=\"x-toolbar\" class=\"calendar-toolbar\"/>\n        <div id=\"x-calendar\" class=\"calendar\"/>\n        <div class=\"legend calendar\">\n            <ul class='legend-labels'>\n                <li class=\"legend-label\"><span class=\"premiere\" title=\"This Movie is still in cinemas and hasn't been released yet. Only poor qualities will be available\"></span>In Cinemas</li>\n                <li class=\"legend-label\"><span class=\"primary\" title=\"This movie has only been announced yet.\"></span>Announced</li>\n                <li class=\"legend-label\"><span class=\"purple\" title=\"Movie is currently downloading\"></span>Downloading</li>\n                <li class=\"legend-label\"><span class=\"danger\" title=\"Movie file has not been found\"></span>Missing</li>\n                <li class=\"legend-label\"><span class=\"success\" title=\"Movie was downloaded and sorted\"></span>Downloaded</li>\n                <li class=\"legend-label\"><span class=\"unmonitored\" title=\"Movie is unmonitored\"></span>Unmonitored</li>\n            </ul>\n         </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["calendar/upcomingitemview"] = {"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h1>"
    + escapeExpression(((helpers.Day || (depth0 && depth0.Day) || helperMissing).call(depth0, (depth0 != null ? depth0.inCinemas : depth0), {"name":"Day","hash":{},"data":data})))
    + "</h1>\n            <h4>"
    + escapeExpression(((helpers.Month || (depth0 && depth0.Month) || helperMissing).call(depth0, (depth0 != null ? depth0.inCinemas : depth0), {"name":"Month","hash":{},"data":data})))
    + "</h4>\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h1>"
    + escapeExpression(((helpers.Day || (depth0 && depth0.Day) || helperMissing).call(depth0, (depth0 != null ? depth0.physicalRelease : depth0), {"name":"Day","hash":{},"data":data})))
    + "</h1>\n            <h4>"
    + escapeExpression(((helpers.Month || (depth0 && depth0.Month) || helperMissing).call(depth0, (depth0 != null ? depth0.physicalRelease : depth0), {"name":"Month","hash":{},"data":data})))
    + "</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"event\">\n    <div class=\"date "
    + escapeExpression(((helper = (helper = helpers.StatusLevel || (depth0 != null ? depth0.StatusLevel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"StatusLevel","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("announced")
  },"fn":this.program(1, data),"inverse":this.program(3, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n \n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">\n        <h4>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n    </a>\n</div>\n";
},"useData":true};
this["T"]["cells/approvalstatuscell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "    <li>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.reason : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helper = (helper = helpers.reason || (depth0 != null ? depth0.reason : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"reason","hash":{},"data":data}) : helper)))
    + "\n";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(depth0, depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul>\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true};
this["T"]["cells/customformatcell"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<span class=\"badge badge-info\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true};
this["T"]["cells/editioncell"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<ul>\n    <li>\n            "
    + escapeExpression(lambda(depth0, depth0))
    + "\n    </li>\n</ul>\n";
},"useData":true};
this["T"]["cells/moviedownloadstatus"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<span class=\"label label-"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatusColor || (depth0 != null ? depth0.DownloadedStatusColor : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatusColor","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.DownloadedQuality || (depth0 != null ? depth0.DownloadedQuality : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedQuality","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatus || (depth0 != null ? depth0.DownloadedStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatus","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true};
this["T"]["cells/movielinks"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.traktUrl || (depth0 != null ? depth0.traktUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"traktUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trakt</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">The Movie DB</a>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.imdbUrl || (depth0 != null ? depth0.imdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">IMDB</a>\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.homepage || (depth0 != null ? depth0.homepage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"homepage","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Homepage</a>\n";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(((helper = (helper = helpers.youTubeTrailerUrl || (depth0 != null ? depth0.youTubeTrailerUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"youTubeTrailerUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trailer</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<span class=\"movie-info-links\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tmdbId : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tmdbId : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imdbId : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.website : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.youTubeTrailerId : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"useData":true};
this["T"]["cells/movielisttitle"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	<a href=\""
    + escapeExpression(((helper = (helper = helpers.imdbUrl || (depth0 != null ? depth0.imdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imdbUrl","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	<a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imdbId : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true};
this["T"]["cells/movietitle"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"useData":true};
this["T"]["cells/multipleformatscell"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<span class=\"badge badge-success format-badge\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.customFormats : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"useData":true};
this["T"]["cells/qualitycell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <span class=\"badge badge-info\" title=\"PROPER\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <span class=\"badge\" title=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.hardcodedSubs : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "Warning: "
    + escapeExpression(((helper = (helper = helpers.hardcodedSubs || (depth0 != null ? depth0.hardcodedSubs : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hardcodedSubs","hash":{},"data":data}) : helper)));
},"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "    <span class=\"badge badge-success format-badge\" title=\"Custom Formats\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.customFormats : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </span>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "            "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)));
  stack1 = helpers.unless.call(depth0, (data && data.last), {"name":"unless","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"8":function(depth0,helpers,partials,data) {
  return ", ";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, (depth0 != null ? depth0.proper : depth0), {"name":"if_gt","hash":{
    'compare': ("1")
  },"fn":this.program(1, data),"inverse":this.program(3, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.customFormats : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["form/action"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n    <label class=\"col-sm-3 control-label\"></label>\n\n    <div class=\"col-sm-5\">\n        <button class=\"form-control "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-value=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["form/captcha"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <div class=\"input-group\">\n            <input type=\"text\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" spellcheck=\"false\" class=\"form-control x-captcha\" readonly placeholder=\"(optional)\" />\n            <span class=\"input-group-btn\"><button class=\"btn btn-primary x-captcha-refresh\" title=\"Refresh CAPTCHA Token\"><i class=\"icon-radarr-refresh\" /></button></span>\n        </div>\n    </div>\n\n    <span class=\"col-sm-1 help-inline\">\n        <i class=\"icon-radarr-form-warning\" title=\"Expires periodically and will need to be refreshed.\"/>\n        <i class=\"icon-radarr-form-warning\" title=\"Refreshing the CAPTCHA Token will embed a temporary Google reCaptcha widget on this page.\"/>\n    </span>\n</div>\n";
},"useData":true};
this["T"]["form/checkbox"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\""
    + escapeExpression(((helper = (helper = helpers.helpText || (depth0 != null ? depth0.helpText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"helpText","hash":{},"data":data}) : helper)))
    + "\"/>\n                </span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <div class=\"input-group\">\n            <label class=\"checkbox toggle well\">\n                <input type=\"checkbox\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"/>\n                <p>\n                    <span>Yes</span>\n                    <span>No</span>\n                </p>\n\n                <div class=\"btn btn-primary slide-button\"/>\n            </label>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.helpText : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["form/hidden"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"hidden\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" spellcheck=\"false\"/>";
},"useData":true};
this["T"]["form/password"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <input type=\"password\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"new-password\" class=\"form-control\"/>\n    </div>\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true};
this["T"]["form/path"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"3":function(depth0,helpers,partials,data) {
  return "x-filepath";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <input type=\"text\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control x-path ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"if_eq","hash":{
    'compare': ("filepath")
  },"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"/>\n    </div>\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true};
this["T"]["form/select"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <option value=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <select name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.selectOptions : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </select>\n    </div>\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true};
this["T"]["form/tag"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <input type=\"text\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" tag-source=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depth0 != null ? depth0.selectOptions : depth0), {"name":"json","hash":{},"data":data})))
    + "\" class=\"form-control x-form-tag\"/>\n    </div>\n\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"usePartial":true,"useData":true};
this["T"]["form/textbox"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <input type=\"text\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" spellcheck=\"false\" class=\"form-control\"/>\n    </div>\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true};
this["T"]["form/url"] = {"1":function(depth0,helpers,partials,data) {
  return "advanced-setting";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.advanced : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <label class=\"col-sm-3 control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n\n    <div class=\"col-sm-5\">\n        <input type=\"url\" name=\"fields."
    + escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"order","hash":{},"data":data}) : helper)))
    + ".value\" validation-name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" spellcheck=\"false\" class=\"form-control\"/>\n    </div>\n";
  stack1 = this.invokePartial(partials.FormHelpPartial, '    ', 'FormHelpPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true};
this["T"]["hotkeys/hotkeysview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Keyboard Shortcuts</h3>\n    </div>\n    <div class=\"modal-body hotkeys-modal\">\n        <div class=\"row hotkey-group\">\n            <div class=\"col-md-12\">\n                <div class=\"row\">\n                    <div class=\"col-md-5 col-md-offset-1\">\n                        <h3>Focus Search Box</h3>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <kbd class=\"hotkey\">t</kbd>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-11 col-md-offset-1\">\n                        Pressing 't' puts the cursor in the search box below the navigation links\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row hotkey-group\">\n            <div class=\"col-md-12\">\n                <div class=\"row\">\n                    <div class=\"col-md-5 col-md-offset-1\">\n                        <h3>Save Settings</h3>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <kbd class=\"hotkey\">ctrl + s</kbd>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-11 col-md-offset-1\">\n                        Pressing ctrl + 's' saves your settings (only in settings)\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["manualimport/emptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "No video files were found in the selected folder.";
  },"useData":true};
this["T"]["manualimport/manualimportlayout"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  return "Select Folder";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"manual-import-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>\n                Manual Import - ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"x-workspace\"></div>\n            <div class=\"x-footer\"></div>\n        </div>\n        <div class=\"modal-footer\">\n            <div class=\"col-md-2 pull-left\">\n                <select class=\"form-control x-importmode\">\n                    <option value=\"Move\">Move Files</option>\n                    <option value=\"Copy\">Copy Files</option>\n                </select>\n            </div>\n            <button class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n            <button class=\"btn btn-success x-import\" disabled=\"disabled\">Import</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["navbar/navbarlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"navbar navbar-nzbdrone\" role=\"navigation\">\n	<div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle navbar-inverse\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n				<span class=\"sr-only\">Toggle navigation</span>\n				<span class=\"icon-radarr-navbar-collapsed fa-lg\"></span>\n			</button>\n			<a class=\"navbar-brand\" href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/\">\n				<img src=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/Content/Images/logos/128.png\" class=\"visible-md visible-lg\">\n                <img src=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/Content/Images/logos/64.png\" class=\"visible-sm\">\n				<div class=\"visible-xs\">\n					<img src=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/Content/Images/logos/32.png\"/>\n					<span class=\"logo-text\">Radarr</span>\n				</div>\n			</a>\n        </div>\n        <div class=\"navbar-collapse collapse x-navbar-collapse\">\n            <ul class=\"nav navbar-nav\">\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/addmovies\" class=\"x-addmovies-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-add\" aria-hidden=\"true\"></i>\n                        Add Movies\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/\" class=\"x-movies-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-movies\" aria-hidden=\"true\"></i>\n                        Movies\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/calendar\" class=\"x-calendar-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-calendar\" aria-hidden=\"true\"></i>\n                        Calendar\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/activity\" class=\"x-activity-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-activity\" aria-hidden=\"true\"></i>\n                        Activity <span id=\"x-queue-count\" class=\"navbar-info\"></span>\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/wanted\" class=\"x-wanted-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-wanted\" aria-hidden=\"true\"></i>\n                        Wanted\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/settings\" class=\"x-settings-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-settings\" aria-hidden=\"true\"></i>\n                        Settings\n                    </a>\n                </li>\n				<li>\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/system\" class=\"x-system-nav\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-system\" aria-hidden=\"true\"></i>\n                        System <span id=\"x-health\" class=\"navbar-info\"></span>\n                    </a>\n                </li>\n				<li>\n                    <a href=\"https://radarr.video/donate.html\" target=\"_blank\">\n                        <i class=\"icon-radarr-navbar-icon icon-radarr-navbar-donate\" aria-hidden=\"true\"></i>\n                        Donate\n                    </a>\n                </li>\n			</ul>\n		</div>\n	</div>\n	<div class=\"col-md-12 search\">\n		<div class=\"col-md-6 col-md-offset-3\">\n			<div class=\"input-group\">\n				<span class=\"input-group-addon\">\n                    <i class=\"fa fa-search\"></i>\n                </span>\n				<input type=\"text\" class=\"col-md-6 form-control x-movies-search\" placeholder=\"Search the movies in your library\">\n			</div>\n		</div>\n	</div>\n</div>\n";
},"useData":true};
this["T"]["release/forcedownloadview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.unless_eq || (depth0 && depth0.unless_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.nameLower : depth0), {"name":"unless_eq","hash":{
    'compare': ("unknown")
  },"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                                    <option value=\""
    + escapeExpression(((helper = (helper = helpers.nameLower || (depth0 != null ? depth0.nameLower : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nameLower","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.nameLower : depth0), {"name":"if_eq","hash":{
    'compare': ("english")
  },"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"3":function(depth0,helpers,partials,data) {
  return " selected ";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\r\n            <h3>Force Download</h3>\r\n    </div>\r\n    <div class=\"modal-body indexer-modal\">\r\n        <div id=\"title-mapping\">\r\n            <p>The title \""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.release : depth0)) != null ? stack1.movieTitle : stack1), depth0))
    + "\" could not be found amongst the alternative titles of the movie. This could lead to problems when Radarr wants to import your movie.\r\n            If you click force download below, the title will be added to the alternative titles using the language selected below.</p>\r\n            <div class=\"form-horizontal\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"col-sm-3 control-label\">Language</label>\r\n\r\n                    <div class=\"col-sm-5\">\r\n                        <select id=\"language-selection\" class=\"form-control\" name=\"language\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.languages : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </select>\r\n                    </div>\r\n\r\n                    <div class=\"col-sm-1 help-inline\">\r\n                        <i class=\"icon-radarr-form-info\" title=\"Language of the alternative title.\"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div id=\"year-mapping\">\r\n            <p>The year "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.release : depth0)) != null ? stack1.year : stack1), depth0))
    + " does not match the expected release year. This could lead to problems when Radarr wants to import your movie.\r\n                If you click force download below, the year will be added as a secondary year for this movie.</p>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\r\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\r\n\r\n        <div class=\"btn-group\">\r\n            <button class=\"btn btn-primary x-download\">Force Download</button>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true};
this["T"]["release/releaselayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-grid\"/>\n    </div>\n</div>\n\n";
  },"useData":true};
this["T"]["rename/renamepreviewemptycollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"alert alert-success\">\n    Success! My work is done, no files to rename.\n</div>";
  },"useData":true};
this["T"]["rename/renamepreviewformatview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "Folder Naming pattern: "
    + escapeExpression(((helper = (helper = helpers.folderFormat || (depth0 != null ? depth0.folderFormat : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"folderFormat","hash":{},"data":data}) : helper)))
    + "<br>\nNaming pattern: "
    + escapeExpression(((helper = (helper = helpers.format || (depth0 != null ? depth0.format : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"format","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.rename : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["rename/renamepreviewitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"rename-preview-item\">\n    <div class=\"row\">\n        <div class=\"rename-checkbox col-md-1\">\n            <label class=\"checkbox-button\" title=\"Rename File\">\n                <input type=\"checkbox\" name=\"rename\"/>\n                <div class=\"btn\">\n                    <i></i>\n                </div>\n            </label>\n        </div>\n        <div class=\"col-md-11\">\n            <div class=\"row\">\n                <div class=\"col-md-12 file-path\"><i class=\"icon-radarr-existing\" title=\"Existing path\" /> "
    + escapeExpression(((helper = (helper = helpers.existingPath || (depth0 != null ? depth0.existingPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"existingPath","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 file-path\"><i class=\"icon-radarr-suggested\" title=\"Suggested path\" /> "
    + escapeExpression(((helper = (helper = helpers.newPath || (depth0 != null ? depth0.newPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"newPath","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true};
this["T"]["rename/renamepreviewlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"rename-preview-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n            <h3>\n                <i class=\"icon-radarr-rename\"></i> Organize & Rename\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"alert alert-info\">\n                <div class=\"path-info x-path-info\">Your movie may be moved; see the paths below</strong></div>\n                <div class=\"x-format-region\"></div>\n            </div>\n\n            <div id=\"rename-previews\"></div>\n\n        </div>\n        <div class=\"modal-footer\">\n\n            <span class=\"rename-all-button x-rename-all-button pull-left\">\n                <label class=\"checkbox-button\" title=\"Toggle all\">\n                    <input type=\"checkbox\" checked=\"checked\" class=\"x-rename-all\"/>\n                    <div class=\"btn btn-icon-only\">\n                        <i class=\"icon-radarr-checked\"></i>\n                    </div>\n                </label>\n            </span>\n\n            <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n            <button class=\"btn btn-primary x-organize\">Organize</button>\n        </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/settingslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul class=\"nav nav-tabs nav-justified settings-tabs\">\n		<li><a href=\"#media-management\" class=\"x-media-management-tab no-router\">Media Management</a></li>\n		<li><a href=\"#profiles\" class=\"x-profiles-tab no-router\">Profiles</a></li>\n		<li><a href=\"#quality\" class=\"x-quality-tab no-router\">Quality</a></li>\n        <li><a href=\"#custom-formats\" class=\"x-custom-formats-tab no-router\">Custom Formats</a></li>\n		<li><a href=\"#indexers\" class=\"x-indexers-tab no-router\">Indexers</a></li>\n		<li><a href=\"#download-client\" class=\"x-download-client-tab no-router\">Download Client</a></li>\n		<li><a href=\"#net-import\" class=\"x-net-import-tab no-router\">Lists</a></li>\n		<li><a href=\"#notifications\" class=\"x-notifications-tab no-router\">Connect</a></li>\n		<li><a href=\"#metadata\" class=\"x-metadata-tab no-router\">Metadata</a></li>\n		<li><a href=\"#general\" class=\"x-general-tab no-router\">General</a></li>\n		<li><a href=\"#ui\" class=\"x-ui-tab no-router\">UI</a></li>\n</ul>\n\n<div class=\"row settings-controls\">\n		<div class=\"col-sm-4 col-sm-offset-7 col-md-3 col-md-offset-8\">\n				<div class=\"advanced-settings-toggle\">\n						<span class=\"help-inline-checkbox hidden-xs\">\n								Advanced Settings\n						</span>\n						<label class=\"checkbox toggle well\">\n								<input type=\"checkbox\" class=\"x-advanced-settings\"/>\n								<p>\n										<span>Shown</span>\n										<span>Hidden</span>\n								</p>\n								<div class=\"btn btn-warning slide-button\"/>\n						</label>\n						<span class=\"help-inline-checkbox hidden-sm hidden-md hidden-lg\">\n								Advanced Settings\n						</span>\n				</div>\n		</div>\n		<div class=\"col-sm-1 col-md-1\">\n				<button class=\"btn btn-primary x-save-settings\">Save</button>\n		</div>\n</div>\n\n<div class=\"tab-content\">\n		<div class=\"tab-pane\" id=\"media-management\"></div>\n		<div class=\"tab-pane\" id=\"profiles\"></div>\n		<div class=\"tab-pane\" id=\"quality\"></div>\n        <div class=\"tab-pane\" id=\"custom-formats\"></div>\n		<div class=\"tab-pane\" id=\"indexers\"></div>\n		<div class=\"tab-pane\" id=\"download-client\"></div>\n		<div class=\"tab-pane\" id=\"net-import\"></div>\n		<div class=\"tab-pane\" id=\"notifications\"></div>\n		<div class=\"tab-pane\" id=\"metadata\"></div>\n		<div class=\"tab-pane\" id=\"general\"></div>\n		<div class=\"tab-pane\" id=\"ui\"></div>\n</div>\n\n<div id=\"loading-region\"></div>\n";
  },"useData":true};
this["T"]["settings/thingyheadergroupview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<legend>"
    + escapeExpression(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"header","hash":{},"data":data}) : helper)))
    + "</legend>\n<ul class=\"item-list\" />";
},"useData":true};
this["T"]["shared/loadingview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"followingBalls\">\n            <div id=\"ball-1\" class=\"ball\"></div>\n            <div id=\"ball-2\" class=\"ball\"></div>\n            <div id=\"ball-3\" class=\"ball\"></div>\n            <div id=\"ball-4\" class=\"ball\"></div>\n        </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["shared/notfoundview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>\n    <img src=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/Content/Images/404.png\" style=\"height:400px; margin-top: 50px\"/>\n\n</div>\n";
},"useData":true};
this["T"]["system/systemlayout"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/logout\" class=\"btn btn-default btn-icon-only\" title=\"Logout\">\n                <i class=\"icon-radarr-logout\"></i>\n            </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<ul class=\"nav nav-tabs\">\n    <li><a href=\"#status\" class=\"x-status-tab no-router\">Status</a></li>\n    <li><a href=\"#updates\" class=\"x-updates-tab no-router\">Updates</a></li>\n    <li><a href=\"#tasks\" class=\"x-tasks-tab no-router\">Tasks</a></li>\n    <li><a href=\"#backup\" class=\"x-backup-tab no-router\">Backup</a></li>\n    <li><a href=\"#logs\" class=\"x-logs-tab no-router\">Logs</a></li>\n    <li class=\"lifecycle-controls pull-right\">\n        <div class=\"btn-group\">\n            <button class=\"btn btn-default btn-icon-only x-shutdown\" title=\"Shutdown\">\n                <i class=\"icon-radarr-shutdown\"></i>\n            </button>\n            <button class=\"btn btn-default btn-icon-only x-restart\" title=\"Restart\">\n                <i class=\"icon-radarr-restart\"></i>\n            </button>\n\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.authentication : depth0), {"name":"if_eq","hash":{
    'compare': ("forms")
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n    </li>\n</ul>\n\n<div class=\"tab-content\">\n    <div class=\"tab-pane\" id=\"status\"></div>\n    <div class=\"tab-pane\" id=\"updates\"></div>\n    <div class=\"tab-pane\" id=\"tasks\"></div>\n    <div class=\"tab-pane\" id=\"backup\"></div>\n    <div class=\"tab-pane\" id=\"logs\"></div>\n</div>";
},"useData":true};
this["T"]["wanted/controlscolumn"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<i class=\"icon-radarr-search x-search\" title=\"Search\"/>\n";
  },"useData":true};
this["T"]["wanted/wantedlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul class=\"nav nav-tabs\">\n    <li><a href=\"#missing\" class=\"x-missing-tab no-router\">Missing</a></li>\n    <li><a href=\"#cutoff\" class=\"x-cutoff-tab no-router\">Cutoff Unmet</a></li>\n</ul>\n\n<div class=\"tab-pane\" id=\"content\"></div>\n";
},"useData":true};
this["T"]["activity/blacklist/blacklistlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-blacklist\" class=\"table-responsive\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-pager\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["activity/history/historylayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-history-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-history\" class=\"table-responsive\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-history-pager\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["activity/queue/queueactionscell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.trackedDownloadStatus : depth0), {"name":"if_eq","hash":{
    'compare': ("Warning")
  },"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  return "        <i class=\"icon-radarr-import-manual x-manual-import\" title=\"Manual import\"></i>\n";
  },"4":function(depth0,helpers,partials,data) {
  return "    <i class=\"icon-radarr-download x-grab\" title=\"Add to download queue (Override Delay Profile)\"></i>\n    <i class=\"icon-radarr-delete x-remove\" title=\"Remove pending release\"></i>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "    <i class=\"icon-radarr-delete x-remove\" title=\"Remove from download client\"></i>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("Completed")
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("Pending")
  },"fn":this.program(4, data),"inverse":this.program(6, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["activity/queue/queuelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-queue\" class=\"queue table-responsive\"/>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-queue-pager\"/>\n    </div>\n</div>";
  },"useData":true};
this["T"]["activity/queue/queuestatuscell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n    <ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.messages : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.statusMessages : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true};
this["T"]["activity/queue/removefromqueueview"] = {"1":function(depth0,helpers,partials,data) {
  return "        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Blacklist release</label>\n\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" class=\"x-blacklist\"/>\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n\n                                    <div class=\"btn slide-button btn-danger\"/>\n                                </label>\n\n                                    <span class=\"help-inline-checkbox\">\n                                        <i class=\"icon-radarr-form-info\" title=\"Do you want to blacklist this release?\"/>\n                                    </span>\n                                </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n    <div class=\"modal-body remove-from-queue-modal\">\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                Are you sure you want to remove '"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "'?\n            </div>\n        </div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.showBlacklist : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-remove\">Remove</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["addmovies/bulkimport/bulkimportmonitorcell"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<select class=\"col-md-2 form-control x-monitor\">\n    <option value=\"all\">Yes</option>\n    <option value=\"none\">No</option>\n</select>\n";
  },"useData":true};
this["T"]["addmovies/bulkimport/bulkimportprofilecell"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"col-md-2 form-control x-profile\">\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>\n";
},"useData":true};
this["T"]["addmovies/bulkimport/bulkimportview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"x-toolbar\"/>\n";
  stack1 = this.invokePartial(partials.PageSizePartial, '', 'PageSizePartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<div class=\"row\">\n		<div class=\"col-md-12\">\n            <strong>Disabled movies are possible duplicates. If the match is incorrect, update the Tmdb Id cell to import the proper movie.</strong>\n		</div>\n</div>\n\n<div class=\"row\">\n		<div class=\"col-md-12\">\n				<div id=\"x-movies-bulk\" class=\"queue table-responsive\"/>\n		</div>\n</div>\n\n<div class=\"row\">\n		<div class=\"col-md-12\">\n				<div id=\"x-movies-bulk-pager\"/>\n		</div>\n</div>\n";
},"usePartial":true,"useData":true};
this["T"]["addmovies/bulkimport/emptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"text-center hint col-md-12\">\n		<span>No movies found in folder "
    + escapeExpression(((helper = (helper = helpers.folder || (depth0 != null ? depth0.folder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"folder","hash":{},"data":data}) : helper)))
    + ". Have you already added all of them?</span>\n</div>\n";
},"useData":true};
this["T"]["addmovies/bulkimport/moviepath"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "&nbsp;"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.relativePath : stack1), depth0));
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "&#9493;&nbsp;"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.relativePath : stack1), depth0));
},"5":function(depth0,helpers,partials,data) {
  return "&#9493;&nbsp;Movie File Not Found";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "<br>\n<span title=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.relativePath : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" class=\"hint path\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.relativePath : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</span>\n";
},"useData":true};
this["T"]["addmovies/bulkimport/qualitycell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<span class=\"badge badge-info\" title=\"PROPER\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.quality : stack1)) != null ? stack1.quality : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "		<span class=\"badge\" title=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.quality : stack1)) != null ? stack1.hardcodedSubs : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.quality : stack1)) != null ? stack1.quality : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "Warning: "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.movieFile : depth0)) != null ? stack1.quality : stack1)) != null ? stack1.hardcodedSubs : stack1), depth0));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, (depth0 != null ? depth0.proper : depth0), {"name":"if_gt","hash":{
    'compare': ("1")
  },"fn":this.program(1, data),"inverse":this.program(3, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["addmovies/existing/addexistingmoviecollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"x-existing-folders\">\n    <div class=\"loading-folders x-loading-folders\">\n        Loading search results from TMDb for your movies, this may take a few minutes.\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["addmovies/list/addfromlistcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"x-list\">\n	<div class=\"x-loading-list\">\n	</div>\n</div>\n";
  },"useData":true};
this["T"]["addmovies/list/addfromlistview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"x-search-bar\">\n	<div class=\"form-group\" style=\"margin-bottom: 0px;\">\n			<label class=\"col-sm-1 control-label\">List</label>\n\n			<div class=\"col-sm-8\">\n";
  stack1 = this.invokePartial(partials.ListSelectionPartial, '					', 'ListSelectionPartial', (depth0 != null ? depth0.lists : depth0), undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</div>\n			<div class=\"col-sm-1\">\n				<button class=\"btn btn-info x-fetch-list\">Fetch List</button>\n			</div>\n			<div class=\"col-sm-2\">\n				<button class=\"btn btn-success x-import-selected\"><i class=\"icon-radarr-add\"></i> Import Selected</button>\n			</div>\n	</div>\n</div>\n<div class=\"row\">\n		<div id=\"fetch-result\" class=\"result-list col-md-12\"/>\n</div>\n";
},"usePartial":true,"useData":true};
this["T"]["addmovies/list/listitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"fetch-item\">\n	ASDF\n</div>\n";
  },"useData":true};
this["T"]["addmovies/rootfolders/rootfoldercollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<table class=\"table table-hover\">\n    <thead>\n        <tr>\n            <th class=\"col-md-10 \">\n                Path\n            </th>\n            <th class=\"col-md-3\">\n                Free Space\n            </th>\n        </tr>\n    </thead>\n    <tbody class=\"x-root-folders\"></tbody>\n</table>";
  },"useData":true};
this["T"]["addmovies/rootfolders/rootfolderitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<td class=\"col-md-10 x-folder folder-path\">\n   "
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td class=\"col-md-3 x-folder folder-free-space\">\n    <span>"
    + escapeExpression(((helpers.Bytes || (depth0 && depth0.Bytes) || helperMissing).call(depth0, (depth0 != null ? depth0.freeSpace : depth0), {"name":"Bytes","hash":{},"data":data})))
    + "</span>\n</td>\n<td class=\"col-md-1\">\n    <i class=\"icon-radarr-delete x-delete\"></i>\n</td>\n";
},"useData":true};
this["T"]["addmovies/rootfolders/rootfolderlayout"] = {"1":function(depth0,helpers,partials,data) {
  return "                    <h4>Recent Folders</h4>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Select Folder</h3>\n    </div>\n    <div class=\"modal-body root-folders-modal\">\n        <div class=\"validation-errors\"></div>\n        <div class=\"alert alert-info\">Enter the path that contains some or all of your movies, you will be able to choose which movies you want to import<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button></div>\n\n        <div class=\"row\">\n            <div class=\"form-group\">\n\n                <div class=\"col-md-12\">\n\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">&nbsp;<i class=\"icon-radarr-folder-open\"></i></span>\n                        <input class=\"form-control x-path\" type=\"text\" validation-name=\"path\" placeholder=\"Enter path to folder that contains your movies\">\n                        <span class=\"input-group-btn\"><button class=\"btn btn-success x-add\"><i class=\"icon-radarr-ok\"/></button></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row root-folders\">\n            <div class=\"col-md-12\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <div id=\"current-dirs\" class=\"root-folders-list\"></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        \n\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["cells/edit/qualitycelleditor"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.quality : depth0), {"name":"with","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" selected=\"selected\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.eachReverse || (depth0 && depth0.eachReverse) || helperMissing).call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"eachReverse","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["manualimport/folder/selectfolderview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <h4>Recent Folders</h4>\n\n        <table class=\"table table-hover\">\n            <thead>\n                <tr>\n                    <th>Path</th>\n                    <th>Last Used</th>\n                </tr>\n            </thead>\n            <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.recentFolders : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </tbody>\n        </table>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <tr class=\"recent-folder x-recent-folder\" data-path=\""
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "\">\n                    <td>"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</td>\n                    <td>"
    + escapeExpression(((helpers.RelativeDate || (depth0 && depth0.RelativeDate) || helperMissing).call(depth0, (depth0 != null ? depth0.lastUsed : depth0), {"name":"RelativeDate","hash":{},"data":data})))
    + "</td>\n                </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"select-folder\">\n    <div class=\"row\">\n        <div class=\"form-group\">\n            <div class=\"col-md-12\">\n                <input type=\"text\" class=\"form-control x-path\" placeholder=\"Select a folder to import\" name=\"path\">\n            </div>\n        </div>\n    </div>\n    <div class=\"recent-folders\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.recentFolders : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"buttons\">\n        <div class=\"row\">\n            <div class=\"col-md-4 col-md-offset-4\">\n                <button class=\"btn btn-primary btn-lg btn-block x-automatic-import x-button\"><i class=\"icon-radarr-search-automatic\"></i> Import File(s) Automatically</button>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-4 col-md-offset-4\">\n                <button class=\"btn btn-primary btn-lg btn-block x-manual-import x-button\"><i class=\"icon-radarr-search-manual\"></i> Manual Import</button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true};
this["T"]["manualimport/movie/selectmovielayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"manual-import-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>\n                Manual Import - Select Movie\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control x-filter\" placeholder=\"Filter movies\" />\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-12 x-movie\"></div>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n        </div>\n    </div>\n</div>\n\n\n";
  },"useData":true};
this["T"]["manualimport/quality/selectqualitylayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"manual-import-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>\n                Manual Import - Select Quality\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"x-quality\"></div>\n        </div>\n        <div class=\"modal-footer\">\n            <button class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n            <button class=\"btn btn-success x-select\" data-dismiss=\"modal\">Select Quality</button>\n        </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["manualimport/quality/selectqualityview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-horizontal\">\n    <div class=\"form-group\">\n        <label class=\"col-sm-4 control-label\">Quality</label>\n\n        <div class=\"col-sm-4\">\n            <select class=\"form-control x-select-quality\">\n                <option value=\"-1\">Select Quality</option>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.qualities : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </select>\n\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-4 control-label\">Proper</label>\n\n        <div class=\"col-sm-8\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" class=\"x-proper\"/>\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-4 control-label\">Custom Formats</label>\n\n        <div class=\"col-sm-4\">\n            <input type=\"text\" class=\"form-control x-tags\" tag-source=\""
    + escapeExpression(((helper = (helper = helpers.formats || (depth0 != null ? depth0.formats : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formats","hash":{},"data":data}) : helper)))
    + "\" tag-class-name=\"label label-success\">\n        </div>\n\n        <span class=\"help-inline-checkbox\">\n            <i class=\"icon-radarr-form-info\" title=\"Edit matched custom formats for this file. ADVANCED USERS ONLY!\"/>\n        </span>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["manualimport/summary/manualimportsummaryview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<dl class=\"dl-horizontal\">\n\n    <dt>Path:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"file","hash":{},"data":data}) : helper)))
    + "</dd>\n\n    <dt>Movie:</dt>\n    <dd>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.movie : depth0)) != null ? stack1.title : stack1), depth0))
    + " ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.movie : depth0)) != null ? stack1.year : stack1), depth0))
    + ")</dd>\n\n    <dt>Quality:</dt>\n    <dd>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + "</dd>\n</dl>\n";
},"useData":true};
this["T"]["movies/delete/deletemovie"] = {"1":function(depth0,helpers,partials,data) {
  return "1";
  },"3":function(depth0,helpers,partials,data) {
  return "0";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n    <div class=\"modal-body delete-movie-modal\">\n\n        <div class=\"row\">\n            <div class=\"col-sm-3 hidden-xs\">\n                "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n            </div>\n            <div class=\"col-sm-9\">\n                <div class=\"form-horizontal\">\n                    <h3 class=\"path\">"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</h3>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Delete all files</label>\n\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" class=\"x-delete-files\"/>\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n\n                                    <div class=\"btn slide-button btn-danger\"/>\n                                </label>\n\n                                    <span class=\"help-inline-checkbox\">\n                                        <i class=\"icon-radarr-form-info\" title=\"Do you want to delete all files from disk?\"/>\n                                        <i class=\"icon-radarr-form-warning\" title=\"This option is irreversible, use with extreme caution\"/>\n                                    </span>\n                                </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-md-offset-1 col-md-5 delete-files-info x-delete-files-info\">\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.hasFile : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " movie file(s) will be deleted\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Exclude movie from Auto List Import?</label>\n\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" class=\"x-add-exclusion\"/>\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n\n                                    <div class=\"btn slide-button btn-danger\"/>\n                                </label>\n\n                                    <span class=\"help-inline-checkbox\">\n                                        <i class=\"icon-radarr-form-info\" title=\"Do you want to prevent this movie from being readded during Automatic List syncing?\"/>\n                                        <i class=\"icon-radarr-form-info\" title=\"Movies can be removed from the exclusions list via Lists tab in Settings\"/>\n                                    </span>\n                                </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/details/infoview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <span class=\"label label-info\">"
    + escapeExpression(((helper = (helper = helpers.network || (depth0 != null ? depth0.network : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"network","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <span class=\"label label-info\">"
    + escapeExpression(((helper = (helper = helpers.studio || (depth0 != null ? depth0.studio : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"studio","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "            <span class=\"label label-info\" title=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.votes : stack1), depth0))
    + " vote";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.votes : stack1), {"name":"if_gt","hash":{
    'compare': ("1")
  },"fn":this.program(6, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.value : stack1), depth0))
    + "</span>\n";
},"6":function(depth0,helpers,partials,data) {
  return "s";
  },"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	    <span class=\"label label-default\">"
    + escapeExpression(((helper = (helper = helpers.inCinemas || (depth0 != null ? depth0.inCinemas : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inCinemas","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <span class=\"label label-info\" title=\""
    + escapeExpression(((helper = (helper = helpers.physicalReleaseNote || (depth0 != null ? depth0.physicalReleaseNote : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"physicalReleaseNote","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.inCinemas || (depth0 != null ? depth0.inCinemas : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inCinemas","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"12":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <a href=\""
    + escapeExpression(((helper = (helper = helpers.imdbUrl || (depth0 != null ? depth0.imdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">IMDB</a>\n";
},"14":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              <a href=\""
    + escapeExpression(((helper = (helper = helpers.homepage || (depth0 != null ? depth0.homepage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"homepage","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Homepage</a>\n";
},"16":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <a href=\""
    + escapeExpression(((helper = (helper = helpers.youTubeTrailerUrl || (depth0 != null ? depth0.youTubeTrailerUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"youTubeTrailerUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trailer</a>\n";
},"18":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n      <span class=\"alternative-titles\">\n        Also known as: "
    + escapeExpression(((helper = (helper = helpers.alternativeTitlesString || (depth0 != null ? depth0.alternativeTitlesString : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"alternativeTitlesString","hash":{},"data":data}) : helper)))
    + ".\n      </span>\n    </div>\n</div>\n";
},"20":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        "
    + escapeExpression(((helpers.tagDisplay || (depth0 && depth0.tagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"tagDisplay","hash":{},"data":data})))
    + "\n    </div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div class=\"row\">\n    <div class=\"col-md-8\">\n        "
    + escapeExpression(((helpers.profile || (depth0 && depth0.profile) || helperMissing).call(depth0, (depth0 != null ? depth0.profileId : depth0), {"name":"profile","hash":{},"data":data})))
    + "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.network : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.studio : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <span class=\"label label-info\">"
    + escapeExpression(((helper = (helper = helpers.runtime || (depth0 != null ? depth0.runtime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"runtime","hash":{},"data":data}) : helper)))
    + " minutes</span>\n        <span class=\"label label-info\">"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</span>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ratings : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        <span class=\"label label-info\">"
    + escapeExpression(((helpers.Bytes || (depth0 && depth0.Bytes) || helperMissing).call(depth0, (depth0 != null ? depth0.sizeOnDisk : depth0), {"name":"Bytes","hash":{},"data":data})))
    + "</span>\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.status : depth0), {"name":"if_eq","hash":{
    'compare': ("announced")
  },"fn":this.program(8, data),"inverse":this.program(10, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <span class=\"label label-"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatusColor || (depth0 != null ? depth0.DownloadedStatusColor : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatusColor","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.DownloadedQuality || (depth0 != null ? depth0.DownloadedQuality : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedQuality","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatus || (depth0 != null ? depth0.DownloadedStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatus","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <div class=\"col-md-4\">\n        <span class=\"movie-info-links\">\n            <a href=\""
    + escapeExpression(((helper = (helper = helpers.traktUrl || (depth0 != null ? depth0.traktUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"traktUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trakt</a>\n            <a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">The Movie DB</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imdbId : depth0), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.website : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.youTubeTrailerId : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </span>\n    </div>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alternativeTitles : depth0), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["movies/details/moviesdetails"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " / <a href=\"https://mappings.radarr.video/mapping/"
    + escapeExpression(((helper = (helper = helpers.secondaryYearSourceId || (depth0 != null ? depth0.secondaryYearSourceId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"secondaryYearSourceId","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><span title=\"Secondary year pulled from Radarr Mappings.\n                Click to head on over there and tell us whether this is correct or not.\">"
    + escapeExpression(((helper = (helper = helpers.secondaryYear || (depth0 != null ? depth0.secondaryYear : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"secondaryYear","hash":{},"data":data}) : helper)))
    + "</span></a>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row movie-page-header\">\n    <div class=\"visible-lg col-lg-2 poster\">\n        "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"col-md-12 col-lg-10\">\n        <div>\n            <h1 class=\"header-text\">\n                <i class=\"x-monitored\" title=\"Toggle monitored state for movie\"/>\n                "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <span class=\"year\">("
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)));
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.secondaryYear : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ")</span>\n                <div class=\"movie-actions pull-right\">\n                    <div class=\"x-refresh\">\n                        <i class=\"icon-radarr-refresh icon-can-spin\" title=\"Update movie info and scan disk\"/>\n                    </div>\n                    <div class=\"x-rename\">\n                        <i class=\"icon-radarr-rename\" title=\"Preview rename for movie\"/>\n                    </div>\n                    <div class=\"x-search\">\n                        <i class=\"icon-radarr-search\" title=\"Search for movie\"/>\n                    </div>\n                    <div class=\"x-manual-search\">\n                      <i class=\"icon-radarr-search-manual\" title=\"Manual Search\"/>\n                    </div>\n                    <div class=\"x-edit\">\n                        <i class=\"icon-radarr-edit\" title=\"Edit movie\"/>\n                    </div>\n                </div>\n            </h1>\n        </div>\n        <div class=\"movie-detail-overview\">\n            "
    + escapeExpression(((helper = (helper = helpers.overview || (depth0 != null ? depth0.overview : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"overview","hash":{},"data":data}) : helper)))
    + "\n        </div>\n        <div id=\"info\" class=\"movie-info\"></div>\n    </div>\n</div>\n<div id=\"movie-info\">\n  <div class=\"movie-tabs\">\n    <div>\n      <div class=\"movie-tabs-card\">\n        <ul class=\"nav nav-tabs\" id=\"myTab\">\n            <li><a href=\"#movie-history\" class=\"x-movie-history\">History</a></li>\n            <li><a href=\"#movie-search\" class=\"x-movie-search\">Search</a></li>\n            <li><a href=\"#movie-files-tabs\" class=\"x-movie-files-tabs\">Files</a></li>\n            <li><a href=\"#movie-titles\" class=\"x-movie-titles\">Titles</a></li>\n        </ul>\n\n        <div class=\"tab-content\">\n            <div class=\"tab-pane\" id=\"movie-history\"/>\n            <div class=\"tab-pane\" id=\"movie-search\"/>\n            <div class=\"tab-pane\" id=\"movie-files-tabs\"/>\n            <div class=\"tab-pane\" id=\"movie-titles\"/>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true};
this["T"]["movies/edit/editmovie"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                                <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n    <div class=\"modal-body edit-movie-modal\">\n        <div class=\"row\">\n            <div class=\"col-sm-3 hidden-xs\">\n                "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n            </div>\n            <div class=\"col-sm-9\">\n                <div class=\"form-horizontal\">\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Monitored</label>\n\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" name=\"monitored\"/>\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n\n                                    <div class=\"btn btn-primary slide-button\"/>\n                                </label>\n\n                                <span class=\"help-inline-checkbox\">\n                                    <i class=\"icon-radarr-form-info\" title=\"Should Radarr download the movie?\"/>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n		    <div class=\"form-group\">\n		        <label class=\"col-sm-4 control-label\">Minimum Availability</label>\n			<div class=\"col-sm-1 col-sm-push-4 help-inline\">\n			    <i class=\"icon-radarr-form-info\" title=\"When the movie is considered Available\"/>\n			</div>\n			<div class=\"col-sm-4 col-sm-pull-1\">\n			        <select class=\"form-control x-minimumavailability\" name=\"minimumAvailability\">\n				    <option value=\"announced\">Announced</option>\n				    <option value=\"inCinemas\">In Cinemas</option>\n				    <option value=\"released\">Physical/Web</option>\n				    <option value=\"preDB\">PreDB</option>\n				</select>\n			</div>\n		    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Static Path</label>\n\n                        <div class=\"col-sm-6\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" name=\"pathState\"/>\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n\n                                    <div class=\"btn btn-primary slide-button\">\n                                    </div>\n                                </label>\n\n                                <span class=\"help-inline-checkbox\">\n                                    <i class=\"icon-radarr-form-info\" title=\"Should movie path stay static or should it change on each disk scan according to your naming config? Note: Auto Rename Folders under Settings -&gt; Media Management must be enabled too.\"/>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Profile</label>\n\n                        <div class=\"col-sm-4\">\n                            <select class=\"form-control x-profile\" id=\"inputProfile\" name=\"profileId\">\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.profiles : depth0)) != null ? stack1.models : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                            </select>\n\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Path</label>\n\n                        <div class=\"col-sm-6\">\n                            <input type=\"text\" class=\"form-control x-path\" placeholder=\"Path\" name=\"path\">\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Tags</label>\n\n                        <div class=\"col-sm-6\">\n                            <input type=\"text\" class=\"form-control x-tags\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-danger pull-left x-remove\">Delete</button>\n\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-primary x-save\">Save</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/editor/movieeditorfooterview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                    <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</option>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"movie-editor-footer\">\n    <div class=\"row\">\n        <div class=\"form-group col-md-1\">\n            <label>Monitored</label>\n\n            <select class=\"form-control x-action x-monitored\">\n                <option value=\"noChange\">No change</option>\n                <option value=\"true\">Monitored</option>\n                <option value=\"false\">Unmonitored</option>\n            </select>\n        </div>\n\n	<div class=\"form-group col-md-2\">\n	    <label>Min Availability</label>\n\n	    <select class=\"form-control x-action x-minimumavailability\">\n	        <option value=\"noChange\">No change</option>\n		<option value=\"announced\">Announced</option>\n		<option value=\"inCinemas\">In Cinemas</option>\n		<option value=\"released\">Physical/Web</option>\n		<option value=\"preDB\">PreDB</option>\n	    </select>\n	</div>\n\n        <div class=\"form-group col-md-2\">\n            <label>Profile</label>\n\n            <select class=\"form-control x-action x-profiles\">\n                <option value=\"noChange\">No change</option>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.profiles : depth0)) != null ? stack1.models : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </select>\n        </div>\n\n        <div class=\"form-group col-md-2\">\n            <label>Static Path</label>\n\n            <select class=\"form-control x-action x-static-path\">\n                <option value=\"noChange\">No change</option>\n                <option value=\"static\">Yes</option>\n                <option value=\"dynamic\">No</option>\n            </select>\n        </div>\n\n        <div class=\"form-group col-md-3\">\n            <label>Root Folder</label>\n\n            <select class=\"form-control x-action x-root-folder\" validation-name=\"RootFolderPath\">\n                <option value=\"noChange\">No change</option>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rootFolders : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <option value=\"addNew\">Add a different path</option>\n            </select>\n        </div>\n\n        <div class=\"form-group col-md-2 actions\">\n            <label class=\"x-selected-count\">0 movies selected</label>\n            <div>\n                <button class=\"btn btn-primary x-action x-save\">Save</button>\n                <button class=\"btn btn-danger x-action x-organize-files\" title=\"Organize and rename movie files\">Organize</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/editor/movieeditorlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"></div>\n\n<div id=\"x-movie-pager-top\">\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-movie-editor\" class=\"table-responsive\"></div>\n    </div>\n</div>\n\n<div id=\"x-movie-pager\">\n</div>\n";
  },"useData":true};
this["T"]["movies/files/allfileslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"x-movie-files\" id=\"movie-files\">\n    <div id=\"movie-media-files\" />\n    <legend>Extras</legend>\n    <div id=\"movie-extra-files\" />\n</div>\n";
  },"useData":true};
this["T"]["movies/files/nofilesview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p class=\"text-warning\">\n    No files for this movie.\n</p>\n";
  },"useData":true};
this["T"]["movies/history/moviehistorylayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"history-table table-responsive\"></div>\n";
  },"useData":true};
this["T"]["movies/history/nohistoryview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p class=\"text-warning\">\n    No history for this movie.\n</p>\n";
  },"useData":true};
this["T"]["movies/index/empty"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"no-movies\">\n    <div class=\"row\">\n        <div class=\"well col-md-12\">\n            <i class=\"icon-radarr-comment\"/>\n            &nbsp;You must be new around here, before you start adding movies you may want to check out the following links on our <a href=\"https://github.com/Radarr/Radarr/wiki\">wiki</a>:\n            <ul>\n                <li><a href=\"https://github.com/Radarr/Radarr/wiki/Setup-Guide\">Our setup guide</a></li>\n                <li><a href=\"https://github.com/Radarr/Radarr/wiki/Common-Problems\">Common Problems</a></li>\n                <li><a href=\"https://github.com/Radarr/Radarr/wiki/FAQ\">FAQ</a></li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["movies/index/footerview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\">\n    <div class=\"series-legend legend col-xs-6 col-sm-4\">\n        <ul class='legend-labels'>\n            <li><span class=\"progress-bar-success\"></span>Downloaded and Monitored: "
    + escapeExpression(((helper = (helper = helpers.downloadedMonitored || (depth0 != null ? depth0.downloadedMonitored : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"downloadedMonitored","hash":{},"data":data}) : helper)))
    + "</li>\n	    <li><span class=\"progress-bar-gray\"></span>Downloaded, but not Monitored: "
    + escapeExpression(((helper = (helper = helpers.downloadedNotMonitored || (depth0 != null ? depth0.downloadedNotMonitored : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"downloadedNotMonitored","hash":{},"data":data}) : helper)))
    + "</li>\n            <li><span class=\"progress-bar-warning\"></span>Missing, but not Monitored: "
    + escapeExpression(((helper = (helper = helpers.missingNotMonitored || (depth0 != null ? depth0.missingNotMonitored : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"missingNotMonitored","hash":{},"data":data}) : helper)))
    + "</li>\n            <li><span class=\"progress-bar-danger\"></span>Missing, Monitored and considered Available: "
    + escapeExpression(((helper = (helper = helpers.missingMonitoredAvailable || (depth0 != null ? depth0.missingMonitoredAvailable : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"missingMonitoredAvailable","hash":{},"data":data}) : helper)))
    + "</li>\n            <li><span class=\"progress-bar\"></span>Missing, Monitored, but not yet considered Available: "
    + escapeExpression(((helper = (helper = helpers.missingMonitoredNotAvailable || (depth0 != null ? depth0.missingMonitoredNotAvailable : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"missingMonitoredNotAvailable","hash":{},"data":data}) : helper)))
    + "</li>\n        </ul>\n    </div>\n    <div class=\"col-xs-5 col-sm-7\">\n        <div class=\"row\">\n            <div class=\"movies-stats col-sm-4\">\n                <dl class=\"dl-horizontal\">\n                    <dt>Movies</dt>\n                    <dd>"
    + escapeExpression(((helper = (helper = helpers.movies || (depth0 != null ? depth0.movies : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"movies","hash":{},"data":data}) : helper)))
    + "</dd>\n\n                    <dt>Released</dt>\n                    <dd>"
    + escapeExpression(((helper = (helper = helpers.released || (depth0 != null ? depth0.released : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"released","hash":{},"data":data}) : helper)))
    + "</dd>\n\n		    <dt>In Cinemas</dt>\n		    <dd>"
    + escapeExpression(((helper = (helper = helpers.incinemas || (depth0 != null ? depth0.incinemas : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"incinemas","hash":{},"data":data}) : helper)))
    + "</dd>\n\n                    <dt>Announced</dt>\n                    <dd>"
    + escapeExpression(((helper = (helper = helpers.announced || (depth0 != null ? depth0.announced : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"announced","hash":{},"data":data}) : helper)))
    + "</dd>\n                </dl>\n            </div>\n\n            <div class=\"movies-stats col-sm-4\">\n                <dl class=\"dl-horizontal\">\n  			<dt>Downloaded</dt>\n			<dd>"
    + escapeExpression(((helper = (helper = helpers.downloaded || (depth0 != null ? depth0.downloaded : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"downloaded","hash":{},"data":data}) : helper)))
    + "</dd>\n		    <dt>Monitored</dt>\n		    <dd>"
    + escapeExpression(((helper = (helper = helpers.monitored || (depth0 != null ? depth0.monitored : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"monitored","hash":{},"data":data}) : helper)))
    + "</dd>\n                </dl>\n            </div>\n\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/index/moviesindexlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"toolbars\">\n    <div id=\"x-toolbar\"></div>\n    <div id=\"x-toolbar2\"></div>\n</div>\n\n<div id=\"x-movie-pager-top\">\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-movies\" class=\"table-responsive\"></div>\n    </div>\n</div>\n\n<div id=\"x-movie-pager\">\n</div>\n\n<div id=\"x-movies-footer\"></div>\n";
  },"useData":true};
this["T"]["movies/search/buttonsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"search-buttons\">\n    <button class=\"btn btn-lg btn-block x-search-auto\"><i class=\"icon-radarr-search-automatic\"/> Automatic Search</button>\n    <button class=\"btn btn-lg btn-block btn-primary x-search-manual\"><i class=\"icon-radarr-search-manual\"/> Manual Search</button>\n</div>";
  },"useData":true};
this["T"]["movies/search/manuallayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"episode-release-grid\" class=\"table-responsive\"></div>\n";
  },"useData":true};
this["T"]["movies/search/moviesearchlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"episode-search-region\"></div>";
  },"useData":true};
this["T"]["movies/search/noresultsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>No results found</div>";
  },"useData":true};
this["T"]["movies/titles/notitlesview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p class=\"text-warning\">\n    No alternative titles for this movie.\n</p>\n";
  },"useData":true};
this["T"]["movies/titles/titleslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"movie-titles-region\">\n    <div id=\"movie-titles-grid\" class=\"table-responsive\"></div>\n</div>\n";
  },"useData":true};
this["T"]["movies/titles/title"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(depth0, depth0));
  },"useData":true};
this["T"]["settings/customformats/customformatcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Custom Formats</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul class=\"indexer-list thingies\">\n                <li>\n                    <div class=\"indexer-item thingy add-card x-add-card\">\n                        <span class=\"center well\">\n                            <i class=\"icon-radarr-add\"/>\n                        </span>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/customformats/customformatitemview"] = {"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.formatTag || (depth0 && depth0.formatTag) || helperMissing).call(depth0, depth0, {"name":"formatTag","hash":{},"data":data})))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"indexer-item thingy\">\n    <div>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"settings\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.formatTags : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/customformats/customformatslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"advanced-setting\">\n    <div class=\"row\">\n        <div class=\"alert alert-warning alert-dismissable\">\n            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n            You can use custom formats to service all your automation needs! Read the <a href=\"https://github.com/Radarr/Radarr/wiki/Custom-Formats\">Wiki Page</a> for more info.\n            If you don't have the need for full customization, you can find a lot of predefined examples <a href=\"https://github.com/Radarr/Radarr/wiki/Custom-Formats#examples\">here</a>.\n            These should be able to cover most automation needs.\n        </div>\n    </div>\n\n    <div id=\"x-custom-formats-region\"></div>\n\n    <div id=\"x-custom-formats-test\">\n\n    </div>\n</div>\n<div class=\"basic-setting\">\n    <div class=\"alert alert-danger alert-dismissable\">\n        Custom Formats are very advanced. Please make sure you understand them fully before proceeding!\n    </div>\n</div>\n\n\n";
  },"useData":true};
this["T"]["settings/customformats/customformattestlayout"] = {"1":function(depth0,helpers,partials,data) {
  return "            <div class=\"form-group\">\n                <label class=\"col-md-2 control-label\">Legend for All Custom Format Matches</label>\n                <div class=\"col-md-10\">\n                    <div class=\"row quality-legend-row\">\n                        <div class=\"col-md-2\">\n                            <label class=\"label label-success label-large\">Group Example: ...</label>\n                        </div>\n                        <div class=\"col-md-10\">\n                            One of the Format Tags of Type Example has matched the release. For an overview of all Format Tag Types <a href=\"https://github.com/Radarr/Radarr/wiki/Custom-Formats#format-tags\" target=\"_blank\">see the wiki</a>.\n                        </div>\n                    </div>\n                    <div class=\"row quality-legend-row\">\n                        <div class=\"col-md-2\">\n                            <label class=\"label label-danger label-large\" style=\"font-size: 14px;\">Group Example: ...</label>\n                        </div>\n                        <div class=\"col-md-10\">\n                            None of the Format Tags of Type Example has matched the release. Because a group failed to match, the release will not be considered this format.\n                        </div>\n                    </div>\n                    <div class=\"row quality-legend-row\">\n                        <div class=\"col-md-2\">\n                            <label class=\"label label-info\" >S_BLURAY</label>\n                        </div>\n                        <div class=\"col-md-10\">\n                            The Format Tag matches the release. Ergo the whole group matches the release.\n                        </div>\n                    </div>\n                    <div class=\"row quality-legend-row\">\n                        <div class=\"col-md-2\">\n                            <label class=\"label label-warning\" >S_BLURAY</label>\n                        </div>\n                        <div class=\"col-md-10\">\n                            The Format Tag does not match the release.\n                        </div>\n                    </div>\n                    <div class=\"row quality-legend-row\">\n                        <div class=\"col-md-2\">\n                            <label class=\"label label-danger\" >L_RQ_ENGLISH</label>\n                        </div>\n                        <div class=\"col-md-10\">\n                            The Format Tag is required and does not match the release. Ergo the release will not be considered this format.\n                        </div>\n                    </div>\n                </div>\n            </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"\">\n    <div class=\"form-horizontal\">\n        <fieldset>\n            <legend>Testing Area</legend>\n            <div class=\"form-group\">\n                <label class=\"col-md-2 control-label\">Release Title</label>\n                <div class=\"col-md-10\">\n                    <input name=\"title\" id=\"test-title\" type=\"text\" class=\"form-control\" value=\"A.Movie.2018.Directors.Cut.2160p.UHD.BluRay.REMUX.HDR.HEVC.Atmos-EPSiLON\">\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-md-2 control-label\">Matched Custom Formats</label>\n                <div class=\"col-md-4\" id=\"matched-formats\">\n\n                </div>\n            </div>\n\n            "
    + escapeExpression(((helper = (helper = helpers.options || (depth0 != null ? depth0.options : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"options","hash":{},"data":data}) : helper)))
    + "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.showLegend : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n            <div class=\"form-group\">\n                <label class=\"col-md-2 control-label\">\n                    All Format Matches\n                </label>\n                <div class=\"col-md-10\">\n                    <div id=\"qd-matches-region\">\n                        <div id=\"qd-matches-grid\" class=\"table-responsive\"></div>\n                    </div>\n                </div>\n\n            </div>\n        </fieldset>\n\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/customformats/deletecustomformatview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    ﻿<div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete: "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n        <div class=\"alert alert-danger\">\n            Custom Formats will be removed from all files, history items, backlisted releases and profiles.\n            If a profile has this format set as cutoff, the cutoff will be reset to 'None'!\n            <br>\n            <br>\n            <b>Important:</b> This operation may take multiple minutes to complete! Please make sure you keep this tab open and active!\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn x-cancel-confirm\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/customformats/matchescell"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <span class=\"label ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.didMatch : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " label-large text-capitalize\">Group "
    + escapeExpression(((helper = (helper = helpers.groupName || (depth0 != null ? depth0.groupName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"groupName","hash":{},"data":data}) : helper)))
    + ": ";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.matches : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"2":function(depth0,helpers,partials,data) {
  return "label-success";
  },"4":function(depth0,helpers,partials,data) {
  return "label-danger";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<span class=\"label ";
  stack1 = helpers['if'].call(depth0, depth0, {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " text-uppercase\">"
    + escapeExpression(lambda((data && data.key), depth0))
    + "</span>";
},"7":function(depth0,helpers,partials,data) {
  return "label-info";
  },"9":function(depth0,helpers,partials,data) {
  return "label-warning";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.groupMatches : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["settings/downloadclient/downloadclientcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Download Clients</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul class=\"download-client-list thingies\">\n                <li>\n                    <div class=\"download-client-item thingy add-card x-add-card\">\n                        <span class=\"center well\">\n                            <i class=\"icon-radarr-add\"/>\n                        </span>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/downloadclient/downloadclientitemview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-success\">Enabled</span>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default\">Not Enabled</span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"download-client-item thingy\">\n    <div>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"settings\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enable : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/downloadclient/downloadclientlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-download-clients-region\"></div>\n<div class=\"form-horizontal\">\n    <div id=\"x-download-handling-region\"></div>\n    <div id=\"x-dronefactory-region\"></div>\n    <div id=\"x-remotepath-mapping-region\"></div>\n</div>\n";
  },"useData":true};
this["T"]["settings/general/generalview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <div class=\"form-group advanced-setting\">\n                <label class=\"col-sm-3 control-label\">SSL Cert Hash</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"text\" name=\"sslCertHash\" class=\"form-control\"/>\n                </div>\n            </div>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "        <div class=\"alert alert-warning\">Please see: <a href=\"https://github.com/Radarr/Radarr/wiki\">the wiki</a> for more information</div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Automatic</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"updateAutomatically\"/>\n                        <p>\n                            <span>On</span>\n                            <span>Off</span>\n                        </p>\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Automatically download and install updates. You will still be able to install from System: Updates\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Mechanism</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-info\" title=\"Use built-in updater or external script\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <select name=\"updateMechanism\" class=\"form-control x-update-mechanism\">\n                    <option value=\"builtIn\">Built-in</option>\n                    <option value=\"script\">Script</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group x-script-group\">\n            <label class=\"col-sm-3 control-label\">Script Path</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-info\" title=\"Path to a custom script that take an extracted update package and handle the remainder of the update process\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <input type=\"text\" name=\"updateScriptPath\" class=\"form-control\"/>\n            </div>\n        </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"form-horizontal\">\n    <fieldset>\n        <legend>Start-Up</legend>\n\n        <div class=\"form-group advanced-setting\">\n            <label class=\"col-sm-3 control-label\">Bind Address</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\" />\n                <i class=\"icon-radarr-form-info\" title=\"Valid IP4 address or '*' for all interfaces\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <input type=\"text\" name=\"bindAddress\" class=\"form-control\" />\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Port Number</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <input type=\"number\" placeholder=\"8989\" name=\"port\" class=\"form-control\"/>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">URL Base</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\"/>\n                <i class=\"icon-radarr-form-info\" title=\"For reverse proxy support, default is empty\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <input type=\"text\" name=\"urlBase\" class=\"form-control\"/>\n            </div>\n        </div>\n\n        <div class=\"form-group advanced-setting\">\n            <label class=\"col-sm-3 control-label\">Enable SSL</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"enableSsl\" class=\"x-ssl\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-warning\" title=\"Requires restart running as administrator to take effect\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"x-ssl-options\">\n            <div class=\"form-group advanced-setting\">\n                <label class=\"col-sm-3 control-label\">SSL Port Number</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"number\" placeholder=\"8989\" name=\"sslPort\" class=\"form-control\"/>\n                </div>\n            </div>\n\n";
  stack1 = ((helper = (helper = helpers.if_windows || (depth0 != null ? depth0.if_windows : depth0)) != null ? helper : helperMissing),(options={"name":"if_windows","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.if_windows) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Open browser on start</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"launchBrowser\" class=\"form-control\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Open a web browser and navigate to Radarr homepage on app start. Has no effect if installed as a windows service\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </fieldset>\n\n    <fieldset>\n        <legend>Security</legend>\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Authentication</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\"/>\n                <i class=\"icon-radarr-form-info\" title=\"Require Username and Password to access Radarr\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <select name=\"authenticationMethod\" class=\"form-control x-auth\">\n                    <option value=\"none\">None</option>\n                    <option value=\"basic\">Basic (Browser popup)</option>\n                    <option value=\"forms\">Forms (Login page)</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"x-auth-options\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Username</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"text\" placeholder=\"Username\" name=\"username\" spellcheck=\"false\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Password</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"password\" name=\"password\" autocomplete=\"new-password\" class=\"form-control\"/>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group api-key\">\n            <label class=\"col-sm-3 control-label\">API Key</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <div class=\"input-group\">\n                    <input type=\"text\" name=\"apiKey\" readonly=\"readonly\" class=\"form-control x-api-key\"/>\n                    <div class=\"input-group-btn\">\n                        <button class=\"btn btn-icon-only x-copy-api-key hidden-xs\"><i class=\"icon-radarr-copy\"></i></button>\n                        <button class=\"btn btn-danger btn-icon-only x-reset-api-key\" title=\"Reset API Key\"><i class=\"icon-radarr-refresh\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </fieldset>\n\n    <fieldset>\n        <legend>Proxy Settings</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Use Proxy</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"proxyEnabled\" class=\"form-control x-proxy\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"x-proxy-settings\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Proxy Type</label>\n\n                <div class=\"col-sm-4\">\n                    <select name=\"proxyType\" class=\"form-control\">\n                        <option value=\"http\" selected=\"selected\">HTTP(S)</option>\n                        <option value=\"socks4\">Socks4</option>\n                        <option value=\"socks5\">Socks5 (This option supports Tor)</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Hostname</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"text\" placeholder=\"localhost\" name=\"proxyHostname\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Port</label>\n\n                <div class=\"col-sm-4\">\n                    <input type=\"number\" placeholder=\"8080\" name=\"proxyPort\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Username</label>\n\n                <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"You only need to enter a username and password if one is required. Leave them blank otherwise.\"/>\n                </div>\n\n                <div class=\"col-sm-4 col-sm-pull-1\">\n                    <input type=\"text\" name=\"proxyUsername\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Password</label>\n\n                <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"You only need to enter a username and password if one is required. Leave them blank otherwise.\"/>\n                </div>\n\n                <div class=\"col-sm-4 col-sm-pull-1\">\n                    <input type=\"password\" name=\"proxyPassword\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Addresses for the proxy to ignore</label>\n\n                <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Use ',' as a separator, and '*.' as a wildcard for subdomains\"/>\n                </div>\n\n                <div class=\"col-sm-4 col-sm-pull-1\">\n                    <input type=\"text\" name=\"proxyBypassFilter\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Bypass Proxy for Local Addresses</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"proxyBypassLocalAddresses\" class=\"form-control\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n                </div>\n            </div>\n        </div>\n        </div>\n    </fieldset>\n\n    <fieldset>\n        <legend>Logging</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Log Level</label>\n\n            <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"Trace logging should only be enabled temporarily\"/>\n            </div>\n\n            <div class=\"col-sm-2 col-sm-pull-1\">\n                <select name=\"logLevel\" class=\"form-control\">\n                    <option value=\"Trace\">Trace</option>\n                    <option value=\"Debug\">Debug</option>\n                    <option value=\"Info\">Info</option>\n                </select>\n            </div>\n        </div>\n    </fieldset>\n    <fieldset>\n        <legend>Analytics</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Enable</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"analyticsEnabled\" class=\"form-control\"/>\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Send anonymous information about your browser and which parts of the web interface you use to Radarr servers. We use this information to prioritize features and browser support. We will NEVER include any personal information or any information that could identify you.\"/>\n                        <i class=\"icon-radarr-form-warning\" title=\"Requires restart to take effect\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </fieldset>\n\n    <fieldset class=\"advanced-setting\">\n        <legend>Updates</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Branch</label>\n\n            <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n                <i class=\"icon-radarr-form-warning\" title=\"If using Docker, do not use 'develop' or 'nightly' branches\"/>\n            </div>\n\n            <div class=\"col-sm-2 col-sm-pull-1\">\n                <input type=\"text\" placeholder=\"master\" name=\"branch\" class=\"form-control\"/>\n            </div>\n        </div>\n\n";
  stack1 = ((helper = (helper = helpers.if_mono || (depth0 != null ? depth0.if_mono : depth0)) != null ? helper : helperMissing),(options={"name":"if_mono","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.if_mono) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </fieldset>\n</div>\n";
},"useData":true};
this["T"]["settings/indexers/indexercollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Indexers</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul class=\"indexer-list thingies\">\n                <li>\n                    <div class=\"indexer-item thingy add-card x-add-card\">\n                        <span class=\"center well\">\n                            <i class=\"icon-radarr-add\"/>\n                        </span>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/indexers/indexeritemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableRss : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">RSS</span>\n";
  },"4":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">RSS</span>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">RSS</span>\n";
  },"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableSearch : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">Search</span>\n";
  },"11":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">Search</span>\n";
  },"13":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">Search</span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"indexer-item thingy\">\n    <div>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"settings\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsRss : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSearch : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/indexers/indexerlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-indexers-region\"></div>\n<div class=\"form-horizontal\">\n    <div id=\"x-indexer-options-region\"></div>\n    <div id=\"x-restriction-region\"></div>\n</div>\n";
  },"useData":true};
this["T"]["settings/mediamanagement/mediamanagementlayout"] = {"1":function(depth0,helpers,partials,data) {
  return "<div id=\"permissions\"></div>";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"form-horizontal\">\n    <div id=\"episode-naming\"></div>\n    <div id=\"sorting\"></div>\n    <div id=\"file-management\"></div>\n    ";
  stack1 = ((helper = (helper = helpers.if_mono || (depth0 != null ? depth0.if_mono : depth0)) != null ? helper : helperMissing),(options={"name":"if_mono","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.if_mono) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true};
this["T"]["settings/metadata/metadatacollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Metadata</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul id=\"x-metadata\" class=\"metadata-list\"></ul>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/metadata/metadataeditview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Edit</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Name</label>\n\n                <div class=\"col-sm-5 controls\">\n                    <input type=\"text\" name=\"name\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Enable</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"enable\"/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n                    </div>\n                </div>\n            </div>\n\n            <hr>\n\n            "
    + escapeExpression(((helper = (helper = helpers.formBuilder || (depth0 != null ? depth0.formBuilder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formBuilder","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-primary x-save\">Save</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/metadata/metadataitemview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-success\">Enabled</span>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default\">Not Enabled</span>\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"if_eq","hash":{
    'compare': ("checkbox")
  },"fn":this.program(6, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.value : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"label label-success\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"label label-default\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"metadata-item\">\n    <div>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"settings\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enable : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <hr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fields : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/metadata/metadatalayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\" id=\"x-metadata-providers\"/>\n</div>\n";
  },"useData":true};
this["T"]["settings/netimport/netimportcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n		<legend>Lists</legend>\n		<div class=\"row\">\n				<div class=\"col-md-12\">\n						<ul class=\"list-list thingies\">\n								<li>\n										<div class=\"list-item thingy add-card x-add-card\">\n												<span class=\"center well\">\n														<i class=\"icon-radarr-add\"/>\n												</span>\n										</div>\n								</li>\n						</ul>\n				</div>\n		</div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/netimport/netimportitemview"] = {"1":function(depth0,helpers,partials,data) {
  return "					<span class=\"label label-success\">Auto</span>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "					<span class=\"label label-default\">Auto</span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"list-item thingy\">\n		<div>\n				<h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n		</div>\n\n		<div class=\"settings\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableAuto : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		</div>\n</div>\n";
},"useData":true};
this["T"]["settings/netimport/netimportlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-lists-region\"></div>\n<div class=\"form-horizontal\">\n		<div id=\"x-list-options-region\"></div>\n		<fieldset>\n			<legend>Import Exclusions</legend>\n				<div id=\"exclusions\">\n				</div>\n		</fieldset>\n</div>\n";
  },"useData":true};
this["T"]["settings/notifications/notificationcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Connections</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul class=\"notification-list thingies\">\n                <li>\n                    <div class=\"notification-item thingy add-card x-add-card\">\n                        <span class=\"center well\">\n                            <i class=\"icon-radarr-add\"/>\n                        </span>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/notifications/notificationitemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.onGrab : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">On Grab</span>\n";
  },"4":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">On Grab</span>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">On Grab</span>\n";
  },"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.onDownload : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">On Download</span>\n";
  },"11":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">On Download</span>\n";
  },"13":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">On Download</span>\n";
  },"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.onUpgrade : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"16":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">On Upgrade</span>\n";
  },"18":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">On Upgrade</span>\n";
  },"20":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">On Upgrade</span>\n";
  },"22":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.onRename : depth0), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"23":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-success\">On Rename</span>\n";
  },"25":function(depth0,helpers,partials,data) {
  return "                <span class=\"label label-default\">On Rename</span>\n";
  },"27":function(depth0,helpers,partials,data) {
  return "            <span class=\"label label-default label-disabled\">On Rename</span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"notification-item thingy\">\n    <div>\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n\n    <div class=\"settings\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsOnGrab : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsOnDownload : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsOnUpgrade : depth0), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(20, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsOnRename : depth0), {"name":"if","hash":{},"fn":this.program(22, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/profile/deleteprofileview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    ﻿<div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete: "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/profile/profilecollection"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Profiles</legend>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ul class=\"profiles thingies\">\n                <li>\n                    <div class=\"profile-item thingy add-card x-add-card\">\n                        <span class=\"center well\">\n                            <i class=\"icon-radarr-add\"/>\n                        </span>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/profile/profilelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\" id=\"profile\"/>\n\n    <div class=\"col-md-12 delay-profile-region\" id=\"delay-profile\"/>\n</div>\n";
  },"useData":true};
this["T"]["settings/profile/profileview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"profile-item thingy\">\n		<div>\n				<h3 name=\"name\"></h3>\n		</div>\n\n		<div class=\"language\">\n				"
    + escapeExpression(((helper = (helper = helpers.languageLabel || (depth0 != null ? depth0.languageLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"languageLabel","hash":{},"data":data}) : helper)))
    + "\n		</div>\n\n		<ul class=\"allowed-qualities\">\n				"
    + escapeExpression(((helper = (helper = helpers.allowedLabeler || (depth0 != null ? depth0.allowedLabeler : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"allowedLabeler","hash":{},"data":data}) : helper)))
    + "\n		</ul>\n</div>\n";
},"useData":true};
this["T"]["settings/quality/qualitylayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\" id=\"quality-definition\"/>\n</div>\n\n";
  },"useData":true};
this["T"]["settings/ui/uiview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"form-horizontal\">\n  <fieldset>\n      <legend>Movies</legend>\n\n      <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Page Size</label>\n\n          <div class=\"col-sm-4\">\n              <select name=\"pageSize\" class=\"form-control\">\n                <option value=\"25\">25</option>\n                  <option value=\"50\">50</option>\n                  <option value=\"100\">100</option>\n                  <option value=\"250\">250</option>\n                  <option value=\"500\">500</option>\n                  <option value=\"1000\">1000</option>\n              </select>\n          </div>\n          <span class=\"col-sm-1 help-inline\">\n              <i class=\"icon-radarr-form-info\" title=\"How many movies to show on the main page.\"/>\n          </span>\n\n      </div>\n  </fieldset>\n\n    <fieldset>\n        <legend>Calendar</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">First Day of Week</label>\n\n            <div class=\"col-sm-4\">\n                <select name=\"firstDayOfWeek\" class=\"form-control\">\n                    <option value=\"0\">Sunday</option>\n                    <option value=\"1\">Monday</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Week Column Header</label>\n\n            <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n                <i class=\"icon-radarr-form-info\" title=\"Shown above each column when week is the active view\"/>\n            </div>\n\n            <div class=\"col-sm-4 col-sm-pull-1\">\n                <select name=\"calendarWeekColumnHeader\" class=\"form-control\">\n                    <option value=\"ddd M/D\">Tue 3/25</option>\n                    <option value=\"ddd MM/DD\">Tue 03/25</option>\n                    <option value=\"ddd D/M\">Tue 25/3</option>\n                    <option value=\"ddd DD/MM\">Tue 25/03</option>\n                </select>\n            </div>\n        </div>\n    </fieldset>\n\n    <fieldset>\n        <legend>Dates</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Short Date Format</label>\n\n            <div class=\"col-sm-4\">\n                <select name=\"shortDateFormat\" class=\"form-control\">\n                    <option value=\"MMM D YYYY\">Mar 25 2014</option>\n                    <option value=\"DD MMM YYYY\">25 Mar 2014</option>\n                    <option value=\"MM/D/YYYY\">03/25/2014</option>\n                    <option value=\"MM/DD/YYYY\">03/25/2014</option>\n                    <option value=\"DD/MM/YYYY\">25/03/2014</option>\n                    <option value=\"YYYY-MM-DD\">2014-03-25</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Long Date Format</label>\n\n            <div class=\"col-sm-4\">\n                <select name=\"longDateFormat\" class=\"form-control\">\n                    <option value=\"dddd, MMMM D YYYY\">Tuesday, March 25, 2014</option>\n                    <option value=\"dddd, D MMMM YYYY\">Tuesday, 25 March, 2014</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Time Format</label>\n\n            <div class=\"col-sm-4\">\n                <select name=\"timeFormat\" class=\"form-control\">\n                    <option value=\"h(:mm)a\">5pm/5:30pm</option>\n                    <option value=\"HH:mm\">17:00/17:30</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Show Relative Dates</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"showRelativeDates\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Show relative (Today/Yesterday/etc) or absolute dates\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </fieldset>\n\n    <fieldset>\n        <legend>Style</legend>\n\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Enable Color-Impaired mode</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"enableColorImpairedMode\" />\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Altered style to allow color-impaired users to better distinguish color coded information\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </fieldset>\n</div>\n";
  },"useData":true};
this["T"]["shared/filebrowser/emptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"text-center col-md-12 file-browser-empty\">\n    <span>No files/folders were found, edit the path above, or clear to start again</span>\n</div>\n";
  },"useData":true};
this["T"]["shared/filebrowser/filebrowserlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n    <h3>File Browser</h3>\n</div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control x-path\" placeholder=\"Start typing or select a path below\"/>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div id=\"x-browser\"></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n        <button class=\"btn btn-primary x-ok\">Ok</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["shared/grid/jumptopage"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.current : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"page","hash":{},"data":data}) : helper)))
    + "\" selected=\"selected\">"
    + escapeExpression(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"page","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"page","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"page","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"x-page-select\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.pages : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>";
},"useData":true};
this["T"]["shared/grid/pager"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.className : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " >\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pageNumber : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "class=\""
    + escapeExpression(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"className","hash":{},"data":data}) : helper)))
    + "\"";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <span class=\"x-page-number\">"
    + escapeExpression(((helper = (helper = helpers.pageNumber || (depth0 != null ? depth0.pageNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pageNumber","hash":{},"data":data}) : helper)))
    + " / "
    + escapeExpression(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lastPage","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <i class=\"pager-btn clickable "
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "\" data-action=\""
    + escapeExpression(((helper = (helper = helpers.action || (depth0 != null ? depth0.action : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"action","hash":{},"data":data}) : helper)))
    + "\"/>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.handles : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n\n<span class=\"total-records\">\n    <span class=\"hidden-xs\">Total records: "
    + escapeExpression(((helpers.Number || (depth0 && depth0.Number) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.totalRecords : stack1), {"name":"Number","hash":{},"data":data})))
    + "</span>\n    <span class=\"visible-xs label label-info\" title=\"Total records\">"
    + escapeExpression(((helpers.Number || (depth0 && depth0.Number) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.totalRecords : stack1), {"name":"Number","hash":{},"data":data})))
    + "</span>\n</span>";
},"useData":true};
this["T"]["shared/toolbar/button"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<i class=\""
    + escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"icon","hash":{},"data":data}) : helper)))
    + " x-icon\"/><span> "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true};
this["T"]["shared/toolbar/radiobutton"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"radio\"><i class=\""
    + escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"icon","hash":{},"data":data}) : helper)))
    + " x-icon\"/><span> "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true};
this["T"]["shared/toolbar/toolbarlayout"] = {"1":function(depth0,helpers,partials,data) {
  return "pull-none-xs";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"page-toolbar pull-left ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.floatOnMobile : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " x-toolbar-left\" />\n<div class=\"page-toolbar pull-right ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.floatOnMobile : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " x-toolbar-right\" />\n";
},"useData":true};
this["T"]["system/backup/backupemptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>No backups are available</div>";
  },"useData":true};
this["T"]["system/backup/backupfilenamecell"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\""
    + escapeExpression(((helper = (helper = helpers.UrlBase || (depth0 != null ? depth0.UrlBase : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UrlBase","hash":{},"data":data}) : helper)))
    + "/backup/"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"no-router\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"useData":true};
this["T"]["system/backup/backuplayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-backup-toolbar\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-backups\" class=\"table-responsive\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["system/info/systeminfolayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\" id=\"health\"></div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\" id=\"diskspace\"></div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\" id=\"about\"></div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\" id=\"more-info\"></div>\n</div>\n";
  },"useData":true};
this["T"]["system/logs/logslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-2 col-sm-2\">\n        <ul class=\"nav nav-pills nav-stacked\">\n            <li><a href=\"#table\" class=\"x-table-tab no-router\">Table</a></li>\n            <li><a href=\"#files\" class=\"x-files-tab no-router\">Files</a></li>\n            <li><a href=\"#update-files\" class=\"x-update-files-tab no-router\">Updates</a></li>\n        </ul>\n    </div>\n\n    <div class=\"col-md-10 col-sm-10\">\n        <div class=\"tab-content\">\n            <div class=\"tab-pane\" id=\"table\"></div>\n            <div class=\"tab-pane\" id=\"files\"></div>\n            <div class=\"tab-pane\" id=\"update-files\"></div>\n        </div>\n    </div>\n</div>";
  },"useData":true};
this["T"]["system/task/tasklayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-tasks\" class=\"tasks table-responsive\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["system/update/emptyview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>No updates are available</div>";
  },"useData":true};
this["T"]["system/update/updateitemview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"label label-default\">"
    + escapeExpression(((helper = (helper = helpers.branch || (depth0 != null ? depth0.branch : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"branch","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
  return "                    <span class=\"label label-success\">Installed</span>\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.latest : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.installable : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"7":function(depth0,helpers,partials,data) {
  return "                            <span class=\"label label-info install-update x-install-update\">Install Latest</span>\n";
  },"9":function(depth0,helpers,partials,data) {
  return "                            <span class=\"label label-info label-disabled\" title=\"Cannot install an older version\">Install Latest</span>\n";
  },"11":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0['new'] : depth0), {"name":"each","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fixed : depth0), {"name":"each","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"12":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <div class=\"change\">\n                    <span class=\"label label-success\">New</span> "
    + escapeExpression(lambda(depth0, depth0))
    + "\n                </div>\n";
},"14":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <div class=\"change\">\n                    <span class=\"label label-info\">Fixed</span> "
    + escapeExpression(lambda(depth0, depth0))
    + "\n                </div>\n";
},"16":function(depth0,helpers,partials,data) {
  return "            Maintenance release\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"update\">\n    <fieldset>\n        <legend>"
    + escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"version","hash":{},"data":data}) : helper)))
    + "\n            <span class=\"date\">\n                - "
    + escapeExpression(((helpers.ShortDate || (depth0 && depth0.ShortDate) || helperMissing).call(depth0, (depth0 != null ? depth0.releaseDate : depth0), {"name":"ShortDate","hash":{},"data":data})))
    + "\n            </span>\n            <span class=\"status\">\n";
  stack1 = ((helpers.unless_eq || (depth0 && depth0.unless_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.branch : depth0), {"name":"unless_eq","hash":{
    'compare': ("master")
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.installed : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </span>\n        </legend>\n\n";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.changes : depth0), {"name":"with","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.changes : depth0), {"name":"unless","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </fieldset>\n</div>\n";
},"useData":true};
this["T"]["system/update/updatelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-updates\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["wanted/cutoff/cutoffunmetlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-cutoff-unmet\" class=\"table-responsive\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-pager\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["wanted/missing/missinglayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-missing\" class=\"table-responsive\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-pager\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["activity/blacklist/details/blacklistdetailslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"history-detail-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>\n                Blacklisted\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n\n        </div>\n        <div class=\"modal-footer\">\n            <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n        </div>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["activity/blacklist/details/blacklistdetailsview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.unless_eq || (depth0 && depth0.unless_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.protocol : depth0), {"name":"unless_eq","hash":{
    'compare': ("unknown")
  },"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Protocol:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.protocol || (depth0 != null ? depth0.protocol : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"protocol","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Indexer:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.indexer || (depth0 != null ? depth0.indexer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"indexer","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Message:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<dl class=\"dl-horizontal info\">\n\n    <dt>Name:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.sourceTitle || (depth0 != null ? depth0.sourceTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sourceTitle","hash":{},"data":data}) : helper)))
    + "</dd>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.protocol : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.indexer : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.message : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"useData":true};
this["T"]["activity/history/details/historydetailslayout"] = {"1":function(depth0,helpers,partials,data) {
  return "Grabbed";
  },"3":function(depth0,helpers,partials,data) {
  return "Download Failed";
  },"5":function(depth0,helpers,partials,data) {
  return "Movie Imported";
  },"7":function(depth0,helpers,partials,data) {
  return "Movie File Deleted";
  },"9":function(depth0,helpers,partials,data) {
  return "<button class=\"btn btn-danger x-mark-as-failed\">Mark As Failed</button>";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<div class=\"modal-content\">\n    <div class=\"history-detail-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>\n                ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("grabbed")
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("downloadFailed")
  },"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("downloadFolderImported")
  },"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("movieFileDeleted")
  },"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n            </h3>\n\n        </div>\n        <div class=\"modal-body\">\n\n        </div>\n        <div class=\"modal-footer\">\n            ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("grabbed")
  },"fn":this.program(9, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n            <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["activity/history/details/historydetailsview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<dl class=\"dl-horizontal info\">\n\n    <dt>Name:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.sourceTitle || (depth0 != null ? depth0.sourceTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sourceTitle","hash":{},"data":data}) : helper)))
    + "</dd>\n\n";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"with","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.indexer : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.releaseGroup : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.nzbInfoUrl : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloadClient : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloadId : depth0), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.age : depth0), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.publishedDate : depth0), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Indexer:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.indexer || (depth0 != null ? depth0.indexer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"indexer","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Release Group:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.releaseGroup || (depth0 != null ? depth0.releaseGroup : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"releaseGroup","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Info:</dt>\n    <dd><a href=\""
    + escapeExpression(((helper = (helper = helpers.nzbInfoUrl || (depth0 != null ? depth0.nzbInfoUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nzbInfoUrl","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.nzbInfoUrl || (depth0 != null ? depth0.nzbInfoUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nzbInfoUrl","hash":{},"data":data}) : helper)))
    + "</a></dd>\n";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Download Client:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.downloadClient || (depth0 != null ? depth0.downloadClient : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"downloadClient","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Grab ID:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.downloadId || (depth0 != null ? depth0.downloadId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"downloadId","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"13":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    "
    + escapeExpression(((helper = (helper = helpers.historyAge || (depth0 != null ? depth0.historyAge : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"historyAge","hash":{},"data":data}) : helper)))
    + "\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Published Date:</dt>\n    <dd>"
    + escapeExpression(((helpers.ShortDate || (depth0 && depth0.ShortDate) || helperMissing).call(depth0, (depth0 != null ? depth0.publishedDate : depth0), {"name":"ShortDate","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.LTS || (depth0 && depth0.LTS) || helperMissing).call(depth0, (depth0 != null ? depth0.publishedDate : depth0), {"name":"LTS","hash":{},"data":data})))
    + "</dd>\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<dl class=\"dl-horizontal\">\n\n    <dt>Name:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.sourceTitle || (depth0 != null ? depth0.sourceTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sourceTitle","hash":{},"data":data}) : helper)))
    + "</dd>\n\n";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"with","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"18":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Message:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<dl class=\"dl-horizontal\">\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.sourceTitle : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"with","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"21":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Name:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.sourceTitle || (depth0 != null ? depth0.sourceTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sourceTitle","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.droppedPath : depth0), {"name":"if","hash":{},"fn":this.program(24, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.importedPath : depth0), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"24":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Source:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.droppedPath || (depth0 != null ? depth0.droppedPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"droppedPath","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"26":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <dt>Imported To:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.importedPath || (depth0 != null ? depth0.importedPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"importedPath","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<dl class=\"dl-horizontal\">\n\n    <dt>Path:</dt>\n    <dd>"
    + escapeExpression(((helper = (helper = helpers.sourceTitle || (depth0 != null ? depth0.sourceTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sourceTitle","hash":{},"data":data}) : helper)))
    + "</dd>\n\n";
  stack1 = helpers['with'].call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"with","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "    <dt>Reason:</dt>\n    <dd>\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.reason : depth0), {"name":"if_eq","hash":{
    'compare': ("Manual")
  },"fn":this.program(30, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.reason : depth0), {"name":"if_eq","hash":{
    'compare': ("MissingFromDisk")
  },"fn":this.program(32, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.reason : depth0), {"name":"if_eq","hash":{
    'compare': ("Upgrade")
  },"fn":this.program(34, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </dd>\n";
},"30":function(depth0,helpers,partials,data) {
  return "            File was deleted by via UI\n";
  },"32":function(depth0,helpers,partials,data) {
  return "            Radarr was unable to find the file on disk so it was removed\n";
  },"34":function(depth0,helpers,partials,data) {
  return "            File was deleted to import an upgrade\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("grabbed")
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("downloadFailed")
  },"fn":this.program(17, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("downloadFolderImported")
  },"fn":this.program(20, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.eventType : depth0), {"name":"if_eq","hash":{
    'compare': ("movieFileDeleted")
  },"fn":this.program(28, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true};
this["T"]["movies/editor/delete/deleteselected"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"close\">&times;</button>\n        <h3>Delete "
    + escapeExpression(((helper = (helper = helpers.removeCount || (depth0 != null ? depth0.removeCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"removeCount","hash":{},"data":data}) : helper)))
    + " Titles</h3>\n    </div>\n    <div class=\"modal-body delete-movie-modal\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Delete all files</label>\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" class=\"x-delete-files\">\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n                                    <div class=\"btn slide-button btn-danger\"></div>\n                                </label>\n                                <span class=\"help-inline-checkbox\">\n                                    <i class=\"icon-radarr-form-info\" title=\"Do you want to delete all files from disk?\"></i>\n                                    <i class=\"icon-radarr-form-warning\" title=\"This option is irreversible, use with extreme caution!\"></i>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-md-offset-1 col-md-5 delete-files-info x-delete-files-info\">\n                            "
    + escapeExpression(((helper = (helper = helpers.fileCount || (depth0 != null ? depth0.fileCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileCount","hash":{},"data":data}) : helper)))
    + " movie file(s) will be deleted\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-4 control-label\">Exclude movies from auto list import?</label>\n                        <div class=\"col-sm-8\">\n                            <div class=\"input-group\">\n                                <label class=\"checkbox toggle well\">\n                                    <input type=\"checkbox\" class=\"x-add-exclusion\">\n                                    <p>\n                                        <span>Yes</span>\n                                        <span>No</span>\n                                    </p>\n                                    <div class=\"btn slide-button btn-danger\"></div>\n                                </label>\n                                <span class=\"help-inline-checkbox\">\n                                    <i class=\"icon-radarr-form-info\" title=\"Do you want to prevent these movies from being read during automatic list syncing?\"></i>\n                                    <i class=\"icon-radarr-form-info\" title=\"Movies can be removed from the exclusions list via the lists tab in settings.\"></i>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <span class=\"indicator x-indicator\">\n            <i class=\"icon-radarr-spinner fa-spin\" aria-hidden=\"true\"></i>\n        </span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/editor/organize/organizefilesview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Organize Selected Movies</h3>\n    </div>\n    <div class=\"modal-body update-files-movie-modal\">\n        <div class=\"alert alert-info\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n            Tip: To preview a rename... select \"Cancel\" then any movie title and use the <i data-original-title=\"\" class=\"icon-radarr-rename\" title=\"\"></i>\n        </div>\n\n        Are you sure you want to update all files in the "
    + escapeExpression(((helper = (helper = helpers.numberOfMovies || (depth0 != null ? depth0.numberOfMovies : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"numberOfMovies","hash":{},"data":data}) : helper)))
    + " selected movies?\n\n\n        <ul class=\"selected-movie\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.movies : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </ul>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-organize\">Organize</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/files/extras/extrafileslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"extra-files-table table-responsive\"></div>";
  },"useData":true};
this["T"]["movies/files/media/fileslayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"movie-files-grid\" class=\"table-responsive\"/>\n\n";
  },"useData":true};
this["T"]["movies/index/overview/movieoverviewcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-movie-list\"/>\n";
  },"useData":true};
this["T"]["movies/index/overview/movieoverviewitemview"] = {"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                      <span class=\"label label-default\">"
    + escapeExpression(((helpers.RelativeDate || (depth0 && depth0.RelativeDate) || helperMissing).call(depth0, (depth0 != null ? depth0.inCinemas : depth0), {"name":"RelativeDate","hash":{},"data":data})))
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                          <a href=\""
    + escapeExpression(((helper = (helper = helpers.imdbUrl || (depth0 != null ? depth0.imdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">IMDB</a>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <a href=\""
    + escapeExpression(((helper = (helper = helpers.homepage || (depth0 != null ? depth0.homepage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"homepage","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Homepage</a>\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                          <a href=\""
    + escapeExpression(((helper = (helper = helpers.youTubeTrailerUrl || (depth0 != null ? depth0.youTubeTrailerUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"youTubeTrailerUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trailer</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"movie-item\">\n    <div class=\"row\">\n        <div class=\"col-md-2 col-xs-3\">\n            <a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">\n                "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n            </a>\n        </div>\n        <div class=\"col-md-10 col-xs-9\">\n            <div class=\"row\">\n                <div class=\"col-md-10 col-xs-10\">\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n                        <h2>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n                    </a>\n                </div>\n                <div class=\"col-md-2 col-xs-2\">\n                    <div class=\"pull-right movie-overview-list-actions\">\n                        <i class=\"icon-radarr-refresh x-refresh\" title=\"Update movie info and scan disk\"/>\n                        <i class=\"icon-radarr-edit x-edit\" title=\"Edit Movie\"/>\n                        <i class=\"icon-radarr-search x-search\" title=\"Search Movie\"/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 col-xs-12\">\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">\n                        <div>\n                            "
    + escapeExpression(((helper = (helper = helpers.overview || (depth0 != null ? depth0.overview : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"overview","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                    </a>\n                </div>\n            </div>\n            <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        &nbsp;\n                    </div>\n                </div>\n            <div class=\"row\">\n                <div class=\"col-md-8 col-xs-8\">\n                    <span class=\"label label-default\">"
    + escapeExpression(((helper = (helper = helpers.GetStatus || (depth0 != null ? depth0.GetStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"GetStatus","hash":{},"data":data}) : helper)))
    + "</span>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.inCinemas : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                    "
    + escapeExpression(((helpers.profile || (depth0 && depth0.profile) || helperMissing).call(depth0, (depth0 != null ? depth0.profileId : depth0), {"name":"profile","hash":{},"data":data})))
    + "\n\n                    <span class=\"label label-"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatusColor || (depth0 != null ? depth0.DownloadedStatusColor : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatusColor","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.DownloadedQuality || (depth0 != null ? depth0.DownloadedQuality : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedQuality","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatus || (depth0 != null ? depth0.DownloadedStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatus","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div class=\"col-md-4 col-xs-4\">\n                  <span class=\"movie-info-links\">\n                      <a href=\""
    + escapeExpression(((helper = (helper = helpers.traktUrl || (depth0 != null ? depth0.traktUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"traktUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trakt</a>\n                      <a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">The Movie DB</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imdbId : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.website : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.youTubeTrailerId : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["movies/index/posters/movieposterscollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul id=\"x-movie-posters\" class=\"movie-posters\"></ul>";
  },"useData":true};
this["T"]["movies/index/posters/moviepostersitemview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              <a href=\""
    + escapeExpression(((helper = (helper = helpers.imdbUrl || (depth0 != null ? depth0.imdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">IMDB</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <a href=\""
    + escapeExpression(((helper = (helper = helpers.homepage || (depth0 != null ? depth0.homepage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"homepage","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Homepage</a>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              <a href=\""
    + escapeExpression(((helper = (helper = helpers.youTubeTrailerUrl || (depth0 != null ? depth0.youTubeTrailerUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"youTubeTrailerUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trailer</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"movie-posters-item\">\n    <div class=\"center\">\n        <div class=\"movie-poster-container x-movie-poster-container\">\n            <div class=\"movie-controls x-movie-controls\">\n                <i class=\"icon-radarr-refresh x-refresh\" title=\"Refresh Movie\"/>\n                <i class=\"icon-radarr-edit x-edit\" title=\"Edit Movie\"/>\n                <i class=\"icon-radarr-search x-search\" title=\"Search Movie\"/>\n            </div>\n            "
    + escapeExpression(((helper = (helper = helpers.GetBannerStatus || (depth0 != null ? depth0.GetBannerStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"GetBannerStatus","hash":{},"data":data}) : helper)))
    + "\n            <a href=\""
    + escapeExpression(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"route","hash":{},"data":data}) : helper)))
    + "\">\n                "
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\n                <div class=\"center title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n            </a>\n            <div class=\"hidden-title x-title\">\n                "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"center\">\n        <div class=\"labels\">\n            <span class=\"label label-"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatusColor || (depth0 != null ? depth0.DownloadedStatusColor : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatusColor","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.DownloadedQuality || (depth0 != null ? depth0.DownloadedQuality : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedQuality","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.DownloadedStatus || (depth0 != null ? depth0.DownloadedStatus : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"DownloadedStatus","hash":{},"data":data}) : helper)))
    + "</span>\n          <a href=\""
    + escapeExpression(((helper = (helper = helpers.traktUrl || (depth0 != null ? depth0.traktUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"traktUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">Trakt</a>\n          <a href=\""
    + escapeExpression(((helper = (helper = helpers.tmdbUrl || (depth0 != null ? depth0.tmdbUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tmdbUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-primary\">The Movie DB</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imdbId : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.website : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.youTubeTrailerId : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/customformats/add/customformataddcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Add Custom Formats</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"alert alert-info\">\n            Radarr allows you to create custom formats to suit your automation needs. Below are some templates to help you get started.<br/>\n            For more information on the individual templates, click on the info buttons or view the whole wiki page <a href=\"https://github.com/Radarr/Radarr/wiki/Custom-Formats\">here</a>.\n        </div>\n        <div class=\"add-indexer add-thingies\">\n            <ul class=\"items\"></ul>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/customformats/add/customformatadditemview"] = {"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.formatTag || (depth0 && depth0.formatTag) || helperMissing).call(depth0, depth0, {"name":"formatTag","hash":{},"data":data})))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"add-thingy\">\n    <div>\n        "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n    </div>\n\n    <div class=\"pull-left\">\n        <div class=\"format-tags\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.formatTags : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n\n    </div>\n\n    <div class=\"pull-right\">\n        <a class=\"btn btn-xs btn-default x-info\" href=\""
    + escapeExpression(((helpers.infoLinkCreator || (depth0 && depth0.infoLinkCreator) || helperMissing).call(depth0, {"name":"infoLinkCreator","hash":{
    'hash': ((depth0 != null ? depth0.name : depth0)),
    'wikiRoot': ("Custom-Formats")
  },"data":data})))
    + "\">\n            <i class=\"icon-radarr-form-info\"/>\n        </a>\n    </div>\n\n</div>\n";
},"useData":true};
this["T"]["settings/customformats/edit/customformateditview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Edit - "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Add - "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"5":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn pull-left x-back\">Back</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body indexer-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Name</label>\n\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" name=\"name\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Format Tags</label>\n\n                <div class=\"col-sm-5\">\n                    <select multiple name=\"formatTags\" class=\"form-control x-tags\"></select>\n                </div>\n            </div>\n        </div>\n        <div id=\"x-test-region\">\n\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn x-test\">test <i class=\"x-test-icon icon-radarr-test\"/></button>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/downloadclient/add/downloadclientaddcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Add Download Client</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"add-download-client add-thingies\">\n            <ul class=\"items\"></ul>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/downloadclient/add/downloadclientadditemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <button class=\"btn btn-xs btn-default x-custom\">\n            Custom\n        </button>\n        <div class=\"btn-group\">\n            <button class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                Presets\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.presets : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <li class=\"x-preset\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                    <a>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a class=\"btn btn-xs btn-default x-info\" href=\""
    + escapeExpression(((helper = (helper = helpers.infoLink || (depth0 != null ? depth0.infoLink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"infoLink","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon-radarr-form-info\"/>\n        </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"add-thingy\">\n    <div>\n        "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"pull-right\">\n";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.presets : depth0)) != null ? stack1.length : stack1), {"name":"if_gt","hash":{
    'compare': (0)
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.infoLink : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>";
},"useData":true};
this["T"]["settings/downloadclient/delete/downloadclientdeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Download Client</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/downloadclient/downloadhandling/downloadhandlingview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Completed Download Handling</legend>\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Enable</label>\n\n        <div class=\"col-sm-8\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"enableCompletedDownloadHandling\" class=\"x-completed-download-handling\"/>\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Automatically import completed downloads from download client\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"x-completed-download-options advanced-setting\">\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\">Remove</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"removeCompletedDownloads\"/>\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Remove imported downloads from download client history\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group advanced-settings\">\n            <label class=\"col-sm-3 control-label\">Check For Finished Downloads Interval</label>\n\n            <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n                <i class=\"icon-radarr-form-info\" title=\"Interval in minutes to query the download clients for finished downloads\"/>\n            </div>\n\n            <div class=\"col-sm-2 col-sm-pull-1\">\n                <input type=\"number\" name=\"checkForFinishedDownloadInterval\" class=\"form-control\" />\n            </div>\n        </div>\n    </div>\n</fieldset>\n\n<fieldset>\n    <legend>Failed Download Handling</legend>\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Redownload</label>\n\n        <div class=\"col-sm-8\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"autoRedownloadFailed\" class=\"x-failed-auto-redownload\"/>\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                    <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Automatically search for and attempt to download a different release\"/>\n                    </span>\n            </div>\n        </div>\n    </div>\n    <div class=\"x-failed-download-options advanced-setting\">\n        <div class=\"form-group \">\n            <label class=\"col-sm-3 control-label\">Remove</label>\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"removeFailedDownloads\"/>\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n                    <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Remove failed downloads from download client history\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/downloadclient/dronefactory/dronefactoryview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"advanced-setting\">\n    <legend>Drone Factory Options</legend>\n    <div class=\"alert alert-danger\">\n        Drone Factory is deprecated and should be disabled, use Wanted -> Manual Import to manually import arbitrary directories. See <a href=\"https://github.com/Radarr/Radarr/wiki/Health-Checks#drone-factory-is-deprecated\">the wiki for further details</a>.\n    </div>\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Drone Factory</label>\n\n        <div class=\"col-sm-1 col-sm-push-8 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Optional folder to periodically scan for possible imports\"/>\n            <i class=\"icon-radarr-form-warning\" title=\"Do not use the folder that contains some or all of your sorted and named movies - doing so could cause data loss\"></i>\n            <i class=\"icon-radarr-form-warning\" title=\"Download client history items that are stored in the drone factory will be ignored.\"/>\n        </div>\n\n        <div class=\"col-sm-8 col-sm-pull-1\">\n            <input type=\"text\" name=\"downloadedMoviesFolder\" class=\"form-control x-path\" />\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Drone Factory Interval</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Interval in minutes to scan the Drone Factory. Set to zero to disable.\"/>\n            <i class=\"icon-radarr-form-warning\" title=\"Setting a high interval or disabling scanning will prevent movies from being imported.\"></i>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <input type=\"number\" name=\"downloadedMoviesScanInterval\" class=\"form-control\" />\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/downloadclient/edit/downloadclienteditview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Edit - "
    + escapeExpression(((helper = (helper = helpers.implementation || (depth0 != null ? depth0.implementation : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementation","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Add - "
    + escapeExpression(((helper = (helper = helpers.implementation || (depth0 != null ? depth0.implementation : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementation","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"5":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn pull-left x-back\">Back</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body download-client-modal\">\n        "
    + escapeExpression(((helpers.formMessage || (depth0 && depth0.formMessage) || helperMissing).call(depth0, (depth0 != null ? depth0.message : depth0), {"name":"formMessage","hash":{},"data":data})))
    + "\n\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Name</label>\n\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" name=\"name\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Enable</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"enable\"/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n                    </div>\n                </div>\n            </div>\n\n            <hr>\n\n            "
    + escapeExpression(((helper = (helper = helpers.formBuilder || (depth0 != null ? depth0.formBuilder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formBuilder","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn x-test\">test <i class=\"x-test-icon icon-radarr-test\"/></button>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n            <button class=\"btn btn-icon-only btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n                <li class=\"save-and-add x-save-and-add\">\n                    save and add\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/downloadclient/remotepathmapping/remotepathmappingcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"advanced-setting\">\n    <legend>Remote Path Mappings</legend>\n\n    <div class=\"col-md-12\">\n        <div class=\"rule-setting-list\">\n            <div class=\"rule-setting-header x-header hidden-xs\">\n                <div class=\"row\">\n                    <span class=\"col-sm-2\">Host</span>\n                    <span class=\"col-sm-5\">Remote Path</span>\n                    <span class=\"col-sm-4\">Local Path</span>\n                </div>\n            </div>\n            <div class=\"rows x-rows\">\n            </div>\n            <div class=\"rule-setting-footer\">\n                <div class=\"pull-right\">\n                    <span class=\"add-rule-setting-mapping\">\n                        <i class=\"icon-radarr-add x-add\" title=\"Add new mapping\" />\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/downloadclient/remotepathmapping/remotepathmappingdeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Mapping</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete the mapping for '"
    + escapeExpression(((helper = (helper = helpers.localPath || (depth0 != null ? depth0.localPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"localPath","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/downloadclient/remotepathmapping/remotepathmappingeditview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <h3>Edit Mapping</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <h3>Add Mapping</h3>\n";
  },"5":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body remotepath-mapping-modal\">\n        <div class=\"form-horizontal\">\n            <div>\n                <p>Use this feature if you have a remotely running Download Client. Radarr will use the information provided to translate the paths provided by the Download Client API to something Radarr can access and import.</p>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Host</label>\n\n                <div class=\"col-sm-1 col-sm-push-3 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Host you specified for the remote Download Client.\" />\n                </div>\n\n                <div class=\"col-sm-3 col-sm-pull-1\">\n                    <input type=\"text\" name=\"host\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Remote Path</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Root path to the directory that the Download Client accesses.\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"remotePath\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Local Path</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Path that Radarr should use to access the same directory remotely.\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"localPath\" class=\"form-control x-path\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n        </div>\n    </div>\n</div>";
},"useData":true};
this["T"]["settings/downloadclient/remotepathmapping/remotepathmappingitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"col-sm-2\">\n        "
    + escapeExpression(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"host","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"col-sm-5\">\n        "
    + escapeExpression(((helper = (helper = helpers.remotePath || (depth0 != null ? depth0.remotePath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"remotePath","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"col-sm-4\">\n        "
    + escapeExpression(((helper = (helper = helpers.localPath || (depth0 != null ? depth0.localPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"localPath","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"col-sm-1\">\n        <div class=\"pull-right\"><i class=\"icon-radarr-edit x-edit\" title=\"\" data-original-title=\"Edit Mapping\"></i></div>\n    </div>";
},"useData":true};
this["T"]["settings/indexers/add/indexeraddcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Add Indexer</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"alert alert-info\">\n            Radarr supports any indexer that uses the Newznab standard, as well as other indexers listed below.<br/>\n            For more information on the individual indexers, click on the info buttons.\n        </div>\n        <div class=\"add-indexer add-thingies\">\n            <ul class=\"items\"></ul>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/indexers/add/indexeradditemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <button class=\"btn btn-xs btn-default x-custom\">\n            Custom\n        </button>\n        <div class=\"btn-group\">\n            <button class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                Presets\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.presets : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <li class=\"x-preset\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                    <a>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a class=\"btn btn-xs btn-default x-info\" href=\""
    + escapeExpression(((helper = (helper = helpers.infoLink || (depth0 != null ? depth0.infoLink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"infoLink","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon-radarr-form-info\"/>\n        </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"add-thingy\">\n    <div>\n        "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"pull-right\">\n";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.presets : depth0)) != null ? stack1.length : stack1), {"name":"if_gt","hash":{
    'compare': (0)
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.infoLink : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>";
},"useData":true};
this["T"]["settings/indexers/delete/indexerdeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Indexer</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>";
},"useData":true};
this["T"]["settings/indexers/edit/indexereditview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Edit - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Add - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"5":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"7":function(depth0,helpers,partials,data) {
  return "                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-warning\" title=\"\" data-original-title=\"RSS is not supported with this indexer\"></i>\n                        </span>\n";
  },"9":function(depth0,helpers,partials,data) {
  return "                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-warning\" title=\"\" data-original-title=\"Search is not supported with this indexer\"></i>\n                        </span>\n";
  },"11":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"13":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn pull-left x-back\">Back</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body indexer-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Name</label>\n\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" name=\"name\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Enable RSS Sync</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"enableRss\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsRss : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsRss : depth0), {"name":"unless","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Enable Search</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n\n                            <input type=\"checkbox\" name=\"enableSearch\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsSearch : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsSearch : depth0), {"name":"unless","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\n                </div>\n            </div>\n\n            "
    + escapeExpression(((helper = (helper = helpers.formBuilder || (depth0 != null ? depth0.formBuilder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formBuilder","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn x-test\">test <i class=\"x-test-icon icon-radarr-test\"/></button>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n            <button class=\"btn btn-icon-only btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n                <li class=\"save-and-add x-save-and-add\">\n                    save and add\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/indexers/options/indexeroptionsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Options</legend>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Minimum Age</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Usenet only: Minimum age in minutes of NZBs before they are grabbed. Use this to give new releases time to propagate to your usenet provider.\"/>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <input type=\"number\" min=\"0\" name=\"minimumAge\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Retention</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Usenet only: Set to zero to set to unlimited\"/>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <input type=\"number\" min=\"0\" name=\"retention\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Maximum Size</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Maximum size for a release to be grabbed in MB. Set to zero to set to unlimited\"/>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <input type=\"number\" min=\"0\" name=\"maximumSize\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Prefer Special Indexer Flags</label>\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"If set to yes, the more indexer flags (such as Golden, Approved, Internal, Freeleech, Double upload, etc.) a release has the more priorized it will be. Quality and Preferred words would still come first.\"/>\n            <a href=\"https://github.com/Radarr/Radarr/wiki/Indexer-Flags\" class=\"help-link\" rel=\"noreferrer\" target=\"_blank\"><i class=\"icon-radarr-form-info-link\"></i></a>\n        </div>\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <div class=\"input-group\">\n              <label class=\"checkbox toggle well\">\n                <input type=\"checkbox\" name=\"preferIndexerFlags\" class=\"x-completed-download-handling\"/>\n                <p>\n                    <span>Yes</span>\n                    <span>No</span>\n                </p>\n\n                <div class=\"btn btn-primary slide-button\"/>\n            </label>\n          </div>\n        </div>\n\n    </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">RSS Sync Interval</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-warning\" title=\"This will apply to all indexers, please follow the rules set forth by them\"/>\n            <i class=\"icon-radarr-form-info\" title=\"Interval in minutes. Set to zero to disable (this will stop all automatic release grabbing)\"/>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <input type=\"number\" name=\"rssSyncInterval\" class=\"form-control\" min=\"0\" max=\"720\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Whitelisted Subtitle Tags</label>\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"All subtitle tags set here will not be considered hardcoded (e.g. dksub). This field is caseinsensitive. Tags must be put in singular (dksub instead of dksubs).\"/>\n        </div>\n        <div class=\"col-sm-2 col-sm-pull-1\">\n  					<input type=\"text\" name=\"whitelistedHardcodedSubs\" class=\"form-control x-hcwhitelist\"/>\n  			</div>\n\n    </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Allow Hardcoded Subs</label>\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"If set to yes, all detected hardcoded subs will be downloaded automatically.\"/>\n        </div>\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <div class=\"input-group\">\n              <label class=\"checkbox toggle well\">\n                <input type=\"checkbox\" name=\"allowHardcodedSubs\" class=\"x-completed-download-handling\"/>\n                <p>\n                    <span>Yes</span>\n                    <span>No</span>\n                </p>\n\n                <div class=\"btn btn-primary slide-button\"/>\n            </label>\n          </div>\n        </div>\n\n    </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Parser Leniency</label>\n\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-info leniency-tooltip x-leniency-tooltip\"/>\n        </div>\n\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <select class=\"form-control\" name=\"parsingLeniency\">\n                <option value=\"strict\">Strict</option>\n                <option value=\"parsingLenient\">Lenient Parsing</option>\n                <option value=\"mappingLenient\">Lenient Mapping</option>\n            </select>\n        </div>\n    </div>\n\n    <legend>Availability Options</legend>\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Availability Delay</label>\n	<div class=\"col-sm-1 col-sm-push-2 help-inline\">\n	    <i class=\"icon-radarr-form-info\" title=\"A movie will be considered available during RssSync this many days after(or before) the Min Availability has been satisfied. (can be negative)\"/>\n	    <i class=\"icon-radarr-form-info\" title=\"This only effects RssSyncs, It does not effect how movies are displayed or what is shown in the Wanted/Missing View\"/>\n	</div>\n	<div class=\"col-sm-2 col-sm-pull-1\">\n	    <input type=\"number\" name=\"availabilityDelay\" class=\"form-control\" min=\"-365\" max=\"365\"/>\n        </div>\n    </div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/indexers/options/leniencytooltip"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h5><b>How strict the Parser should be. (Note: Strict is strongly recommended!)</b></h5>\r\n<br>\r\n<b>Strict:</b> Just as before, year must immediately follow title.\r\n<br><br>\r\n<b>Lenient Parsing:</b> Either year or language tag must immediately follow after title. Enables releases such as 'Scary Movie German BluRay' to be parsed correctly.\r\n<br>\r\n<b>Note</b>: May prevent Movies with language tags in title - e.g. The Danish Girl - from being parsed correctly\r\n<br><br>\r\n<b>Lenient Mapping:</b> Includes Lenient Parsing. When title cannot be found, try mapping just parts of the title. Useful when no year is present / not after title.\r\n<br>\r\n<b>Warning!:</b> May cause unexpected mappings, e.g. Scary Movie 2 mapped to movie Scary Movie 1, etc. Use with caution.";
  },"useData":true};
this["T"]["settings/indexers/restriction/restrictioncollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"advanced-setting\">\n    <legend>Restrictions</legend>\n\n    <div class=\"col-md-12\">\n        <div class=\"rule-setting-list\">\n            <div class=\"rule-setting-header x-header hidden-xs\">\n                <div class=\"row\">\n                    <span class=\"col-sm-4\">Must Contain</span>\n                    <span class=\"col-sm-4\">Must Not Contain</span>\n                    <span class=\"col-sm-3\">Tags</span>\n                </div>\n            </div>\n            <div class=\"rows x-rows\">\n            </div>\n            <div class=\"rule-setting-footer\">\n                <div class=\"pull-right\">\n                    <span class=\"add-rule-setting-mapping\">\n                        <i class=\"icon-radarr-add x-add\" title=\"Add new restriction\" />\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/indexers/restriction/restrictiondeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Restriction</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete this restriction?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/indexers/restriction/restrictioneditview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <h3>Edit Restriction</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <h3>Add Restriction</h3>\n";
  },"5":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body remotepath-mapping-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Must contain</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"The release must contain at least one of these terms (case insensitive)\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"required\" class=\"form-control x-required\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Must not contain</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"The release will be rejected if it contains one or more of terms (case insensitive)\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"ignored\" class=\"form-control x-ignored\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Tags</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Restrictions will apply to movies with one or more matching tags. Leave blank to apply to all movies\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" class=\"form-control x-tags\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/indexers/restriction/restrictionitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"col-sm-4\">\n        "
    + escapeExpression(((helpers.genericTagDisplay || (depth0 && depth0.genericTagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.required : depth0), "label label-success", {"name":"genericTagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-4\">\n        "
    + escapeExpression(((helpers.genericTagDisplay || (depth0 && depth0.genericTagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.ignored : depth0), "label label-danger", {"name":"genericTagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-3\">\n        "
    + escapeExpression(((helpers.tagDisplay || (depth0 && depth0.tagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"tagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-1\">\n        <div class=\"pull-right\"><i class=\"icon-radarr-edit x-edit\" title=\"\" data-original-title=\"Edit\"></i></div>\n    </div>";
},"useData":true};
this["T"]["settings/mediamanagement/filemanagement/filemanagementview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n		<legend>File Management</legend>\n\n		<div class=\"form-group\">\n				<label class=\"col-sm-3 control-label\">Unmonitor Deleted Movies</label>\n\n				<div class=\"col-sm-9\">\n						<div class=\"input-group\">\n								<label class=\"checkbox toggle well\">\n										<input type=\"checkbox\" name=\"autoUnmonitorPreviouslyDownloadedEpisodes\"/>\n										<p>\n												<span>Yes</span>\n												<span>No</span>\n										</p>\n\n										<div class=\"btn btn-primary slide-button\"/>\n								</label>\n\n								<span class=\"help-inline-checkbox\">\n										<i class=\"icon-radarr-form-info\" title=\"Movies deleted from disk are automatically unmonitored in Radarr\"/>\n								</span>\n						</div>\n				</div>\n		</div>\n\n		<div class=\"form-group advanced-setting\">\n				<label class=\"col-sm-3 control-label\">Download Propers</label>\n\n				<div class=\"col-sm-9\">\n						<div class=\"input-group\">\n								<label class=\"checkbox toggle well\">\n										<input type=\"checkbox\" name=\"autoDownloadPropers\"/>\n										<p>\n												<span>Yes</span>\n												<span>No</span>\n										</p>\n\n										<div class=\"btn btn-primary slide-button\"/>\n								</label>\n\n								<span class=\"help-inline-checkbox\">\n										<i class=\"icon-radarr-form-info\" title=\"Should Radarr automatically upgrade to propers when available?\"/>\n								</span>\n						</div>\n				</div>\n		</div>\n\n		<div class=\"form-group advanced-setting\">\n				<label class=\"col-sm-3 control-label\">Analyse video files</label>\n\n				<div class=\"col-sm-9\">\n						<div class=\"input-group\">\n								<label class=\"checkbox toggle well\">\n										<input type=\"checkbox\" name=\"enableMediaInfo\"/>\n										<p>\n												<span>Yes</span>\n												<span>No</span>\n										</p>\n\n										<div class=\"btn btn-primary slide-button\"/>\n								</label>\n\n								<span class=\"help-inline-checkbox\">\n										<i class=\"icon-radarr-form-info\" title=\"Extract video information such as resolution, runtime and codec information from files. This requires Radarr to read parts of the file which may cause high disk or network activity during scans.\"/>\n								</span>\n						</div>\n				</div>\n		</div>\n\n		<div class=\"form-group advanced-setting\">\n				<label class=\"col-sm-3 control-label\">Change File Date</label>\n\n				<div class=\"col-sm-1 col-sm-push-2 help-inline\">\n						<i class=\"icon-radarr-form-info\" title=\"Change file date on import/rescan\"/>\n				</div>\n\n				<div class=\"col-sm-4 col-sm-pull-1\">\n						<select class=\"form-control\" name=\"fileDate\">\n								<option value=\"none\">None</option>\n								<option value=\"cinemas\">In Cinemas Date</option>\n								<option value=\"release\">Physical Release Date</option>\n						</select>\n				</div>\n		</div>\n\n		<div class=\"form-group\">\n				<label class=\"col-sm-3 control-label\">Recycling Bin</label>\n\n				<div class=\"col-sm-1 col-sm-push-8 help-inline\">\n						<i class=\"icon-radarr-form-info\" title=\"Movie files will go here when deleted instead of being permanently deleted\"/>\n				</div>\n\n				<div class=\"col-sm-8 col-sm-pull-1\">\n						<input type=\"text\" name=\"recycleBin\" class=\"form-control x-path\"/>\n				</div>\n\n		</div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/mediamanagement/naming/namingview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<fieldset>\n    <legend>Movie Naming</legend>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Rename Movies</label>\n\n        <div class=\"col-sm-8\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"renameEpisodes\" class=\"x-rename-episodes\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-warning\" title=\"Radarr will use the existing file name if set to no\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"x-naming-options\">\n        <div class=\"basic-setting x-basic-naming\"></div>\n\n        <div class=\"form-group advanced-setting\">\n            <label class=\"col-sm-3 control-label\">Replace Illegal Characters</label>\n\n            <div class=\"col-sm-8\">\n                <div class=\"input-group\">\n                    <label class=\"checkbox toggle well\">\n                        <input type=\"checkbox\" name=\"replaceIllegalCharacters\" class=\"x-replace-illegal-chars\"/>\n\n                        <p>\n                            <span>Yes</span>\n                            <span>No</span>\n                        </p>\n\n                        <div class=\"btn btn-primary slide-button\"/>\n                    </label>\n\n                    <span class=\"help-inline-checkbox\">\n                        <i class=\"icon-radarr-form-info\" title=\"Replace or Remove illegal characters\"/>\n                    </span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group advanced-setting\">\n            <div class=\"x-replacing-options\">\n\n                <label class=\"col-sm-3 control-label\">Colon Replacement Format</label>\n\n                <span class=\"col-sm-1 col-sm-push-8 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Colons are illegal characters; Radarr will delete them by default\" />\n                </span>\n\n                <div class=\"col-sm-8 col-sm-pull-1\">\n                    <select class=\"form-control\" name=\"colonReplacementFormat\">\n                        <option value=\"delete\">Delete</option>\n                        <option value=\"dash\">Replace with Dash</option>\n                        <option value=\"spaceDash\">Replace with Space Dash</option>\n                        <option value=\"spaceDashSpace\">Replace with Space Dash Space</option>\n\n                    </select>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group advanced-setting\">\n            <label class=\"col-sm-3 control-label\">Standard Movie Format</label>\n\n            <div class=\"col-sm-1 col-sm-push-8 help-inline\">\n                <i class=\"icon-radarr-form-info\" title=\"\" data-original-title=\"All caps or all lower-case can also be used\"></i>\n                <a href=\"https://github.com/Radarr/Radarr/wiki/Sorting-and-Renaming\" class=\"help-link\" title=\"More information\"><i class=\"icon-radarr-form-info-link\"/></a>\n            </div>\n\n            <div class=\"col-sm-8 col-sm-pull-1\">\n                <div class=\"input-group x-helper-input\">\n                    <input type=\"text\" class=\"form-control naming-format\" name=\"standardMovieFormat\" data-onkeyup=\"true\" />\n                    <div class=\"input-group-btn btn-group x-naming-token-helper\">\n                        <button class=\"btn btn-icon-only dropdown-toggle\" data-toggle=\"dropdown\">\n                            <i class=\"icon-radarr-add\"></i>\n                        </button>\n                        <ul class=\"dropdown-menu\">\n";
  stack1 = this.invokePartial(partials.MovieTitleNamingPartial, '                            ', 'MovieTitleNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ReleaseYearNamingPartial, '                            ', 'ReleaseYearNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.TagsNamingPartial, '                            ', 'TagsNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.QualityNamingPartial, '                            ', 'QualityNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.MediaInfoNamingPartial, '                            ', 'MediaInfoNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ReleaseGroupNamingPartial, '                            ', 'ReleaseGroupNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.OriginalTitleNamingPartial, '                            ', 'OriginalTitleNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ImdbIdNamingPartial, '                            ', 'ImdbIdNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.SeparatorNamingPartial, '                            ', 'SeparatorNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Movie Folder Format</label>\n\n        <div class=\"col-sm-1 col-sm-push-8 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"\" data-original-title=\"All caps or all lower-case can also be used. Only used when adding a new movie.\"></i>\n        </div>\n\n        <div class=\"col-sm-8 col-sm-pull-1\">\n            <div class=\"input-group x-helper-input\">\n                <input type=\"text\" class=\"form-control naming-format\" name=\"movieFolderFormat\" data-onkeyup=\"true\"/>\n                <div class=\"input-group-btn btn-group x-naming-token-helper\">\n                    <button class=\"btn btn-icon-only dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"icon-radarr-add\"></i>\n                    </button>\n                    <ul class=\"dropdown-menu\">\n";
  stack1 = this.invokePartial(partials.MovieTitleNamingPartial, '                        ', 'MovieTitleNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ReleaseYearNamingPartial, '                        ', 'ReleaseYearNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.TagsNamingPartial, '                        ', 'TagsNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.QualityNamingPartial, '                        ', 'QualityNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.MediaInfoNamingPartial, '                        ', 'MediaInfoNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ReleaseGroupNamingPartial, '                        ', 'ReleaseGroupNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.OriginalTitleNamingPartial, '                        ', 'OriginalTitleNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.ImdbIdNamingPartial, '                        ', 'ImdbIdNamingPartial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Movie Example</label>\n\n        <div class=\"col-sm-8\">\n            <p class=\"form-control-static x-movie-example naming-example\"></p>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Movie Folder Example</label>\n\n        <div class=\"col-sm-8\">\n            <p class=\"form-control-static x-movie-folder-example naming-example\"></p>\n        </div>\n    </div>\n</fieldset>\n";
},"usePartial":true,"useData":true};
this["T"]["settings/mediamanagement/permissions/permissionsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"advanced-setting\">\n    <legend>Permissions</legend>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Set Permissions</label>\n\n        <div class=\"col-sm-8\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"setPermissionsLinux\"/>\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Should chmod/chown be run when files are imported/renamed?\"/>\n                    <i class=\"icon-radarr-form-warning\" title=\"If you're unsure what these settings do, do not alter them.\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">File chmod mask</label>\n\n        <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Octal, applied to media files when imported/renamed by Radarr\"/>\n        </div>\n\n        <div class=\"col-sm-4 col-sm-pull-1\">\n            <input type=\"text\" name=\"fileChmod\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Folder chmod mask</label>\n\n        <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Octal, applied to media folders created by Radarr\"/>\n        </div>\n\n        <div class=\"col-sm-4 col-sm-pull-1\">\n            <input type=\"text\" name=\"folderChmod\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">chown User</label>\n\n        <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Username or uid. Use uid for remote file systems.\"/>\n        </div>\n\n        <div class=\"col-sm-4 col-sm-pull-1\">\n            <input type=\"text\" name=\"chownUser\" class=\"form-control\"/>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">chown Group</label>\n\n        <div class=\"col-sm-1 col-sm-push-4 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Group name or gid. Use gid for remote file systems.\"/>\n        </div>\n\n        <div class=\"col-sm-4 col-sm-pull-1\">\n            <input type=\"text\" name=\"chownGroup\" class=\"form-control\"/>\n        </div>\n    </div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/mediamanagement/sorting/sortingview"] = {"1":function(depth0,helpers,partials,data) {
  return "    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Skip Free Space Check</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"skipFreeSpaceCheckWhenImporting\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Use when drone is unable to detect free space from your movies root folder\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<fieldset class=\"advanced-setting\">\n    <legend>Folders</legend>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Create empty movie folders</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"createEmptySeriesFolders\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Create missing movie folders during disk scan\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Automatically Rename Folders</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"autoRenameFolders\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-warning\" title=\"CURRENTLY ALPHA! This feature must be enabled for namings schemes beyond '{Movie Title} {Year}' to work. With it folders are automatically renamed according to your naming scheme on each disk scan. If your folder naming scheme contains things such as quality, etc., the movie folder will be automatically adjusted for that regardless of this setting.\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Movie Paths Default to Static</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"pathsDefaultStatic\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-warning\" title=\"CURRENTLY ALPHA! If enabled, the path of new movies is static and won't change.\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n</fieldset>\n\n<fieldset>\n    <legend>Importing</legend>\n\n";
  stack1 = ((helper = (helper = helpers.if_mono || (depth0 != null ? depth0.if_mono : depth0)) != null ? helper : helperMissing),(options={"name":"if_mono","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.if_mono) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    <div class=\"form-group advanced-setting\">\n        <label class=\"col-sm-3 control-label\">Use Hardlinks instead of Copy</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"copyUsingHardlinks\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Use Hardlinks when trying to copy files from torrents that are still being seeded\"/>\n                    <i class=\"icon-radarr-form-warning\" title=\"Occasionally, file locks may prevent renaming files that are being seeded. You may temporarily disable seeding and use Radarr's rename function as a work around.\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Import Extra Files</label>\n\n        <div class=\"col-sm-9\">\n            <div class=\"input-group\">\n                <label class=\"checkbox toggle well\">\n                    <input type=\"checkbox\" name=\"importExtraFiles\" class=\"x-import-extra-files\"/>\n\n                    <p>\n                        <span>Yes</span>\n                        <span>No</span>\n                    </p>\n\n                    <div class=\"btn btn-primary slide-button\"/>\n                </label>\n\n                <span class=\"help-inline-checkbox\">\n                    <i class=\"icon-radarr-form-info\" title=\"Import matching extra files (subtitles, nfo, etc) after importing a movie file\"/>\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group x-extra-file-extensions\">\n        <label class=\"col-sm-3 control-label\">Extra File Extensions</label>\n\n        <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n            <i class=\"icon-radarr-form-info\" title=\"Comma separated list of extra files to import, ie sub,nfo (.nfo will be imported as .nfo-orig)\"/>\n        </div>\n\n        <div class=\"col-sm-5 col-sm-pull-1\">\n            <input type=\"text\" name=\"extraFileExtensions\" class=\"form-control\"/>\n        </div>\n    </div>\n</fieldset>\n";
},"useData":true};
this["T"]["settings/netimport/add/netimportaddcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n		<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n				<h3>Add List</h3>\n		</div>\n		<div class=\"modal-body\">\n				<div class=\"alert alert-info\">\n						Radarr supports any RSS movie lists as well as the one stated below.<br/>\n						For more information on the individual lists, click on the info buttons.\n				</div>\n				<div class=\"add-indexer add-thingies\">\n						<ul class=\"items\"></ul>\n				</div>\n		</div>\n		<div class=\"modal-footer\">\n				<button class=\"btn\" data-dismiss=\"modal\">Close</button>\n		</div>\n</div>\n";
  },"useData":true};
this["T"]["settings/netimport/add/netimportadditemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "				<button class=\"btn btn-xs btn-default x-custom\">\n						Custom\n				</button>\n				<div class=\"btn-group\">\n						<button class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n								Presets\n								<span class=\"caret\"></span>\n						</button>\n						<ul class=\"dropdown-menu\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.presets : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "						</ul>\n				</div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "								<li class=\"x-preset\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n										<a>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n								</li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "				<a class=\"btn btn-xs btn-default x-info\" href=\""
    + escapeExpression(((helper = (helper = helpers.infoLink || (depth0 != null ? depth0.infoLink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"infoLink","hash":{},"data":data}) : helper)))
    + "\">\n						<i class=\"icon-radarr-form-info\"/>\n				</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"add-thingy\">\n		<div>\n				"
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "\n		</div>\n		<div class=\"pull-right\">\n";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.presets : depth0)) != null ? stack1.length : stack1), {"name":"if_gt","hash":{
    'compare': (0)
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.infoLink : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		</div>\n</div>\n";
},"useData":true};
this["T"]["settings/netimport/delete/netimportdeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete List</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/netimport/edit/netimporteditview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "						<h3>Edit - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "						<h3>Add - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"5":function(depth0,helpers,partials,data) {
  return " checked=\"checked\" ";
  },"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                	<option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rootFolders : depth0), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "									    	<option value=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"path","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"12":function(depth0,helpers,partials,data) {
  return "									    <option value=\"\">Select Path</option>\n";
  },"14":function(depth0,helpers,partials,data) {
  return "						<button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"16":function(depth0,helpers,partials,data) {
  return "						<button class=\"btn pull-left x-back\">Back</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n		<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "		</div>\n		<div class=\"modal-body indexer-modal\">\n				<div class=\"form-horizontal\">\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">Name</label>\n\n								<div class=\"col-sm-5\">\n										<input type=\"text\" name=\"name\" class=\"form-control\"/>\n								</div>\n						</div>\n\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">Enable Automatic Sync</label>\n\n								<div class=\"col-sm-5\">\n										<div class=\"input-group\">\n												<label class=\"checkbox toggle well\">\n														<input type=\"checkbox\" name=\"enableAuto\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableAuto : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  />\n														<p>\n																<span>Yes</span>\n																<span>No</span>\n														</p>\n\n														<div class=\"btn btn-primary slide-button\"></div>\n												</label>\n\n												<span class=\"help-inline-checkbox\">\n														<i class=\"icon-radarr-form-warning\" title=\"\" data-original-title=\"New movies found by this list are automatically added to your collection.\"></i>\n												</span>\n										</div>\n								</div>\n						</div>\n\n						<div class=\"form-group\">\n								<label class=\"col-sm-3 control-label\">Add Movies Monitored</label>\n\n								<div class=\"col-sm-5\">\n										<div class=\"input-group\">\n												<label class=\"checkbox toggle well\">\n														<input type=\"checkbox\" name=\"shouldMonitor\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.shouldMonitor : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  />\n														<p>\n																<span>Yes</span>\n																<span>No</span>\n														</p>\n\n														<div class=\"btn btn-primary slide-button\"></div>\n												</label>\n\n												<span class=\"help-inline-checkbox\">\n														<i class=\"icon-radarr-form-info\" title=\"\" data-original-title=\"If enabled, movies found by this list are added and monitored.\"></i>\n												</span>\n										</div>\n								</div>\n						</div>\n						<div class=\"form-group\">\n							<label class=\"col-sm-3 control-label\">Minimum Availability</label>\n\n							<div class=\"col-sm-5\">\n								<select class=\"form-control x-minimumavailability\" name=\"minimumAvailability\">\n									<option value=\"announced\">Announced</option>\n									<option value=\"inCinemas\">In Cinemas</option>\n									<option value=\"released\">Physical/Web</option>\n									<option value=\"preDB\">PreDB</option>\n								</select>\n							</div>\n						</div>\n\n						<div class=\"form-group\">\n							<label class=\"col-sm-3 control-label\">Quality Profile</label>\n\n							<div class=\"col-sm-5\">\n								<select class=\"form-control x-profile\" id=\"inputProfile\" name=\"profileId\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.profiles : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                            	</select>\n							</div>\n						</div>\n\n						<div class=\"form-group\">\n							<label class=\"col-sm-3 control-label\">Folder</label>\n\n							<div class=\"col-sm-5\">\n								<select class=\"col-md-4 form-control x-root-folder\" name=\"rootFolderPath\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.rootFolders : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "								</select>\n							</div>\n						</div>\n\n						<div class=\"form-group\">\n							<label class=\"col-sm-3 control-label\">Tags</label>\n\n							<div class=\"col-sm-5\">\n								<input type=\"text\" class=\"form-control x-tags\">\n							</div>\n						</div>\n\n						"
    + escapeExpression(((helper = (helper = helpers.formBuilder || (depth0 != null ? depth0.formBuilder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formBuilder","hash":{},"data":data}) : helper)))
    + "\n				</div>\n		</div>\n		<div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.program(16, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "				<span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n				<button class=\"btn x-test\">test <i class=\"x-test-icon icon-radarr-test\"/></button>\n				<button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n				<div class=\"btn-group\">\n						<button class=\"btn btn-primary x-save\">Save</button>\n						<button class=\"btn btn-icon-only btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n								<span class=\"caret\"></span>\n						</button>\n						<ul class=\"dropdown-menu\">\n								<li class=\"save-and-add x-save-and-add\">\n										save and add\n								</li>\n						</ul>\n				</div>\n		</div>\n</div>\n";
},"useData":true};
this["T"]["settings/netimport/options/netimportoptionsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n	<legend>Options</legend>\n	<div class=\"form-group\">\n		<label class=\"col-sm-3 control-label\">List Update Interval</label>\n\n		<div class=\"col-sm-1 col-sm-push-2 help-inline\">\n			<i class=\"icon-radarr-form-warning\" title=\"This will apply to all lists, please follow the rules set forth by them.\"></i>\n			<i class=\"icon-radarr-form-info\" title=\"Interval in minutes.\"></i>\n		</div>\n\n		<div class=\"col-sm-2 col-sm-pull-1\">\n			<input type=\"number\" name=\"netImportSyncInterval\" class=\"form-control\" min=\"0\" max=\"1440\">\n		</div>\n	</div>\n    <div class=\"form-group\">\n        <label class=\"col-sm-3 control-label\">Clean Library Level</label>\n        <div class=\"col-sm-1 col-sm-push-2 help-inline\">\n            <i class=\"icon-radarr-form-warning\" title=\"Disable unless you are sure. Enabling Recycle bin before this is recommended\"></i>\n            <i class=\"icon-radarr-form-info\" title=\"Movies in library will be removed or unmonitored if not found in your lists\"></i>\n        </div>\n        <div class=\"col-sm-2 col-sm-pull-1\">\n            <select name=\"listSyncLevel\" class=\"form-control\">\n                <option value=\"disabled\">Disabled</option>\n                <option value=\"logOnly\">Log Only</option>\n                <option value=\"keepAndUnmonitor\">Keep but Unmonitor</option>\n                <option value=\"removeAndKeep\">Remove &amp; Keep Files</option>\n                <option value=\"removeAndDelete\">Remove &amp; Delete Files</option>\n            </select>\n       </div>\n    </div>\n	<legend>Trakt Authentication</legend>\n	<div class=\"form-group\">\n	    <label class=\"col-sm-3 control-label\">Auth Token</label>\n		<div class=\"col-sm-4\">\n		    <input type=\"text\" readonly=\"readonly\" name=\"traktAuthToken\" class=\"form-control x-trakt-auth-token\">\n			<input type=\"hidden\" readonly=\"readonly\" name=\"traktTokenExpiry\" class=\"form-control x-trakt-token-expiry\">\n        </div>\n	</div>\n	<div class=\"form-group\">\n	    <label class=\"col-sm-3 control-label\">Refresh Token</label>\n		<div class=\"col-sm-4\">\n            <div class=\"input-group\">\n    			<input type=\"text\" readonly=\"readonly\" name=\"traktRefreshToken\" class=\"form-control x-trakt-refresh-token\">\n                <div class=\"input-group-btn\">\n                    <button class=\"btn btn-danger btn-icon-only x-reset-trakt-tokens\" title=\"Reset Trakt Tokens\">\n                        <i class=\"icon-radarr-refresh\"></i>\n                    </button>\n                    <button class=\"btn btn-danger btn-icon-only x-revoke-trakt-tokens\" title=\"Revoke Trakt Tokens\">\n                        <i class=\"icon-radarr-logout\"></i>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>\n";
},"useData":true};
this["T"]["settings/netimport/restriction/restrictioncollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"advanced-setting\">\n    <legend>Restrictions</legend>\n\n    <div class=\"col-md-12\">\n        <div class=\"rule-setting-list\">\n            <div class=\"rule-setting-header x-header hidden-xs\">\n                <div class=\"row\">\n                    <span class=\"col-sm-4\">Must Contain</span>\n                    <span class=\"col-sm-4\">Must Not Contain</span>\n                    <span class=\"col-sm-3\">Tags</span>\n                </div>\n            </div>\n            <div class=\"rows x-rows\">\n            </div>\n            <div class=\"rule-setting-footer\">\n                <div class=\"pull-right\">\n                    <span class=\"add-rule-setting-mapping\">\n                        <i class=\"icon-radarr-add x-add\" title=\"Add new restriction\" />\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>";
  },"useData":true};
this["T"]["settings/netimport/restriction/restrictiondeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Restriction</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete this restriction?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/netimport/restriction/restrictioneditview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <h3>Edit Restriction</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <h3>Add Restriction</h3>\n";
  },"5":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body remotepath-mapping-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Must contain</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"The release must contain at least one of these terms (case insensitive)\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"required\" class=\"form-control x-required\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Must not contain</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"The release will be rejected if it contains one or more of terms (case insensitive)\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" name=\"ignored\" class=\"form-control x-ignored\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Tags</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Restrictions will apply to movie with one or more matching tags. Leave blank to apply to all movies\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" class=\"form-control x-tags\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/netimport/restriction/restrictionitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"col-sm-4\">\n        "
    + escapeExpression(((helpers.genericTagDisplay || (depth0 && depth0.genericTagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.required : depth0), "label label-success", {"name":"genericTagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-4\">\n        "
    + escapeExpression(((helpers.genericTagDisplay || (depth0 && depth0.genericTagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.ignored : depth0), "label label-danger", {"name":"genericTagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-3\">\n        "
    + escapeExpression(((helpers.tagDisplay || (depth0 && depth0.tagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"tagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-1\">\n        <div class=\"pull-right\"><i class=\"icon-radarr-edit x-edit\" title=\"\" data-original-title=\"Edit\"></i></div>\n    </div>";
},"useData":true};
this["T"]["settings/notifications/add/notificationaddcollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Add Notification</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"add-notifications add-thingies\">\n            <ul class=\"items\"></ul>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/notifications/add/notificationadditemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <button class=\"btn btn-xs btn-default x-custom\">\n            Custom\n        </button>\n        <div class=\"btn-group\">\n            <button class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                Presets\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.presets : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <li class=\"x-preset\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                    <a>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a class=\"btn btn-xs btn-default x-info\" href=\""
    + escapeExpression(((helper = (helper = helpers.infoLink || (depth0 != null ? depth0.infoLink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"infoLink","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"icon-radarr-form-info\"/>\n        </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"add-thingy\">\n    <div>\n        "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"pull-right\">\n";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.presets : depth0)) != null ? stack1.length : stack1), {"name":"if_gt","hash":{
    'compare': (0)
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.infoLink : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>";
},"useData":true};
this["T"]["settings/notifications/delete/notificationdeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Notification</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete '"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "'?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>";
},"useData":true};
this["T"]["settings/notifications/edit/notificationeditview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Edit - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <h3>Add - "
    + escapeExpression(((helper = (helper = helpers.implementationName || (depth0 != null ? depth0.implementationName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"implementationName","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"5":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"7":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"9":function(depth0,helpers,partials,data) {
  return "            <button class=\"btn pull-left x-back\">Back</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body notification-modal x-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Name</label>\n\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" name=\"name\" class=\"form-control\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">On Grab</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"onGrab\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsOnGrab : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n\n                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-info\" title=\"Be notified when movies are available for download and has been sent to a download client\"/>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">On Download</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"onDownload\" class=\"x-on-download\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsOnDownload : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n\n                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-info\" title=\"Be notified when movies are successfully downloaded\"/>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group x-on-upgrade\">\n                <label class=\"col-sm-3 control-label\">On Upgrade</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"onUpgrade\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsOnUpgrade : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n\n                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-info\" title=\"Be notified when movies are upgraded to a better quality\"/>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group x-on-upgrade\">\n                <label class=\"col-sm-3 control-label\">On Rename</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"input-group\">\n                        <label class=\"checkbox toggle well\">\n                            <input type=\"checkbox\" name=\"onRename\" ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.supportsOnRename : depth0), {"name":"unless","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/>\n                            <p>\n                                <span>Yes</span>\n                                <span>No</span>\n                            </p>\n\n                            <div class=\"btn btn-primary slide-button\"/>\n                        </label>\n\n                        <span class=\"help-inline-checkbox\">\n                            <i class=\"icon-radarr-form-info\" title=\"Be notified when movies are renamed\"/>\n                        </span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Filter Movies Tags</label>\n\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" class=\"form-control x-tags\">\n                </div>\n\n                <div class=\"col-sm-1 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Only send notifications for movies with matching tags\"/>\n                </div>\n            </div>\n\n            <hr>\n\n            "
    + escapeExpression(((helper = (helper = helpers.formBuilder || (depth0 != null ? depth0.formBuilder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formBuilder","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn x-test\">test <i class=\"x-test-icon icon-radarr-test\"/></button>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary x-save\">Save</button>\n            <button class=\"btn btn-icon-only btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n                <li class=\"save-and-add x-save-and-add\">\n                    save and add\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/profile/delay/delayprofileitemview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableTorrent : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.preferredProtocol : depth0), {"name":"if_eq","hash":{
    'compare': ("usenet")
  },"fn":this.program(3, data),"inverse":this.program(5, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  return "                    Prefer Usenet\n";
  },"5":function(depth0,helpers,partials,data) {
  return "                    Prefer Torrent\n";
  },"7":function(depth0,helpers,partials,data) {
  return "                Only Usenet\n";
  },"9":function(depth0,helpers,partials,data) {
  return "            Only Torrent\n";
  },"11":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.usenetDelay : depth0), {"name":"if_eq","hash":{
    'compare': ("0")
  },"fn":this.program(12, data),"inverse":this.program(14, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"12":function(depth0,helpers,partials,data) {
  return "                No delay\n";
  },"14":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.usenetDelay : depth0), {"name":"if_eq","hash":{
    'compare': ("1")
  },"fn":this.program(15, data),"inverse":this.program(17, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"15":function(depth0,helpers,partials,data) {
  return "                    1 minute\n";
  },"17":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helper = (helper = helpers.usenetDelay || (depth0 != null ? depth0.usenetDelay : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"usenetDelay","hash":{},"data":data}) : helper)))
    + " minutes\n";
},"19":function(depth0,helpers,partials,data) {
  return "            -\n";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.torrentDelay : depth0), {"name":"if_eq","hash":{
    'compare': ("0")
  },"fn":this.program(12, data),"inverse":this.program(22, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"22":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.torrentDelay : depth0), {"name":"if_eq","hash":{
    'compare': ("1")
  },"fn":this.program(15, data),"inverse":this.program(23, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"23":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helper = (helper = helpers.torrentDelay || (depth0 != null ? depth0.torrentDelay : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"torrentDelay","hash":{},"data":data}) : helper)))
    + " minutes\n";
},"25":function(depth0,helpers,partials,data) {
  return "                <i class=\"drag-handle icon-radarr-reorder x-drag-handle\" title=\"Reorder\"/>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <div class=\"col-sm-2\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableUsenet : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"col-sm-2\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableUsenet : depth0), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"col-sm-2\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.enableTorrent : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"col-sm-5\">\n        "
    + escapeExpression(((helpers.tagDisplay || (depth0 && depth0.tagDisplay) || helperMissing).call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"tagDisplay","hash":{},"data":data})))
    + "\n    </div>\n    <div class=\"col-sm-1\">\n        <div class=\"pull-right\">\n";
  stack1 = ((helpers.unless_eq || (depth0 && depth0.unless_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"unless_eq","hash":{
    'compare': ("1")
  },"fn":this.program(25, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n            <i class=\"icon-radarr-edit x-edit\" title=\"Edit\"></i>\n        </div>\n    </div>";
},"useData":true};
this["T"]["settings/profile/delay/delayprofilelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Delay Profiles</legend>\n\n    <div class=\"col-md-12\">\n        <div class=\"rule-setting-list\">\n            <div class=\"rule-setting-header x-header hidden-xs\">\n                <div class=\"row\">\n                    <span class=\"col-sm-2\">Protocol</span>\n                    <span class=\"col-sm-2\">Usenet Delay</span>\n                    <span class=\"col-sm-2\">Torrent Delay</span>\n                    <span class=\"col-sm-5\">Tags</span>\n                </div>\n            </div>\n            <div class=\"rows x-rows\"></div>\n            <div class=\"rule-setting-footer\">\n                <div class=\"pull-right\">\n                    <span class=\"add-rule-setting-mapping\">\n                        <i class=\"icon-radarr-add x-add\" title=\"Add new delay profile\" />\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/profile/edit/editprofileitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<i class=\"select-handle pull-left x-select\" />\n<span class=\"quality-label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.format : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n<i class=\"drag-handle pull-right icon-radarr-reorder advanced-setting x-drag-handle\" />\n";
},"useData":true};
this["T"]["settings/profile/edit/editprofilelayout"] = {"1":function(depth0,helpers,partials,data) {
  return "    <h3>Edit</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "    <h3>Add</h3>\n";
  },"5":function(depth0,helpers,partials,data) {
  return "        <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"modal-body\">\n        <div class=\"form-horizontal\">\n            <div id=\"x-fields\"></div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Qualities</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"controls qualities-controls\">\n                        <span id=\"x-qualities\"></span>\n                    </div>\n                </div>\n\n                <div class=\"col-sm-1 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Qualities higher in the list are more preferred. Only checked qualities will be wanted.\"/>\n                </div>\n            </div>\n            <div class=\"form-group advanced-setting\">\n                <label class=\"col-sm-3 control-label\">Custom Formats</label>\n\n                <div class=\"col-sm-5\">\n                    <div class=\"controls qualities-controls\">\n                        <span id=\"x-formats\"></span>\n                    </div>\n                </div>\n\n                <div class=\"col-sm-1 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Custom Formats higher in the list are more preferred. Only checked formats will be downloaded.\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-primary x-save\">Save</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/profile/edit/editprofileview"] = {"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.unless_eq || (depth0 && depth0.unless_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.nameLower : depth0), {"name":"unless_eq","hash":{
    'compare': ("unknown")
  },"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "										<option value=\""
    + escapeExpression(((helper = (helper = helpers.nameLower || (depth0 != null ? depth0.nameLower : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nameLower","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.nameLower : depth0), {"name":"if_eq","hash":{
    'compare': ("any")
  },"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"3":function(depth0,helpers,partials,data) {
  return "class=\"advanced-setting\"";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.allowed : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "						<option value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + "</option>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.allowed : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <option value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.format : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.format : depth0)) != null ? stack1.name : stack1), depth0))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<div class=\"form-group\">\n		<label class=\"col-sm-3 control-label\">Name</label>\n\n		<div class=\"col-sm-5\">\n				<input type=\"text\" name=\"name\" class=\"form-control\">\n		</div>\n</div>\n\n<hr>\n\n<div class=\"form-group\">\n		<label class=\"col-sm-3 control-label\">Language</label>\n\n		<div class=\"col-sm-5\">\n				<select class=\"form-control\" name=\"language\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.languages : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "				</select>\n		</div>\n\n		<div class=\"col-sm-1 help-inline\">\n				<i class=\"icon-radarr-form-info\" title=\"Movies assigned this profile will be looked for with the selected language\"/>\n		</div>\n</div>\n\n\n	<div class=\"form-group\">\n			<label class=\"col-sm-3 control-label\">Preferred Tags</label>\n\n			<div class=\"col-sm-1 col-sm-push-5 help-inline\">\n					<i class=\"icon-radarr-form-info\" title=\"When the release contains these tags it will be preferred. Case Insensitive.\" />\n			</div>\n\n			<div class=\"col-sm-5 col-sm-pull-1\">\n					<input type=\"text\" name=\"preferredTags\" class=\"form-control x-preferred\"/>\n			</div>\n	</div>\n\n\n<div class=\"form-group\">\n		<label class=\"col-sm-3 control-label\">Cutoff</label>\n\n		<div class=\"col-sm-5\">\n				<select class=\"form-control x-cutoff\" name=\"cutoff.id\" validation-name=\"cutoff\">\n";
  stack1 = ((helpers.eachReverse || (depth0 && depth0.eachReverse) || helperMissing).call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"eachReverse","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "				</select>\n		</div>\n\n		<div class=\"col-sm-1 help-inline\">\n				<i class=\"icon-radarr-form-info\" title=\"Once this quality is reached Radarr will no longer upgrade movies\"/>\n		</div>\n</div>\n\n<div class=\"form-group advanced-setting\">\n    <label class=\"col-sm-3 control-label\">Custom Format Cutoff</label>\n\n    <div class=\"col-sm-5\">\n        <select class=\"form-control x-cutoff\" name=\"formatCutoff.id\" validation-name=\"formatCutoff\">\n";
  stack1 = ((helpers.eachReverse || (depth0 && depth0.eachReverse) || helperMissing).call(depth0, (depth0 != null ? depth0.formatItems : depth0), {"name":"eachReverse","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </select>\n    </div>\n\n    <div class=\"col-sm-1 help-inline\">\n        <i class=\"icon-radarr-form-info\" title=\"Once this format is reached, Radarr will no longer upgrade movies.\"/>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["settings/quality/definition/qualitydefinitioncollection"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n		<legend>Quality Definitions</legend>\n		<div class=\"col-md-11\">\n				<div id=\"quality-definition-list\">\n						<div class=\"quality-header x-header hidden-xs\">\n								<div class=\"row\">\n										<span class=\"col-md-2 col-sm-3\">Quality</span>\n										<span class=\"col-md-2 col-sm-3\">Title</span>\n										<span class=\"col-md-4 col-sm-6\">Size Limit <i class=\"icon-radarr-warning\" title=\"Limits are automatically adjusted for the movie runtime.\" /></span>\n								</div>\n						</div>\n						<div class=\"rows x-rows\">\n						</div>\n				</div>\n		</div>\n</fieldset>\n";
  },"useData":true};
this["T"]["settings/quality/definition/qualitydefinitionitemview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"row quality-definition-row\">\n    <span class=\"col-md-2 col-sm-3\">\n\n        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.quality : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n\n    </span>\n    <span class=\"col-md-2 col-sm-3\">\n				<input type=\"text\" class=\"form-control\" name=\"title\">\n		</span>\n    <span class=\"col-md-5 col-sm-7\">\n				<div class=\"x-slider\"></div>\n				<div class=\"size-label-wrapper\">\n						<div class=\"pull-left\">\n								<span class=\"label label-warning x-min-thirty\"\n                                        name=\"thirtyMinuteMinSize\"\n                                        title=\"Minimum size for a 90 minute movie\">\n								</span>\n								<span class=\"label label-info x-min-sixty\"\n                                        name=\"sixtyMinuteMinSize\"\n                                        title=\"Minimum size for a 140 minute movie\">\n								</span>\n						</div>\n						<div class=\"pull-right\">\n								<span class=\"label label-warning\"\n                                        title=\"Maximum size for a 90 minute movie. Click to edit, allows you to go beyond the maximum value.\n                                        Radarr will automatically convert this field from Gigabytes to Megabytes per minute of runtime assuming a 90 minute movie, when you click outside of this label.\">\n                                    <input type=\"text\" name=\"thirtyMinuteMaxSize\" class=\"x-max-thirty label-textfield\">\n								</span>\n								<span class=\"label label-info x-max-sixty\"\n                                        name=\"sixtyMinuteMaxSize\"\n                                        title=\"Maximum size for a 140 minute movie\">\n								</span>\n						</div>\n				</div>\n		</span>\n\n\n</div>\n\n\n";
},"useData":true};
this["T"]["shared/toolbar/sorting/sortingbuttoncollectionview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"btn-group sorting-buttons\">\n    <a class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n        Sort <span class=\"caret\"></span>\n    </a>\n    <ul class=\"dropdown-menu\">\n\n    </ul>\n</div>\n";
  },"useData":true};
this["T"]["shared/toolbar/sorting/sortingbuttonview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#\">\n    <span class=\"sorting-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    <i class=\"\"></i>\n</a>";
},"useData":true};
this["T"]["system/info/about/aboutview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <dt>Mono Version</dt>\n        <dd>"
    + escapeExpression(((helper = (helper = helpers.runtimeVersion || (depth0 != null ? depth0.runtimeVersion : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"runtimeVersion","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<fieldset>\n    <legend>About</legend>\n\n    <dl class=\"dl-horizontal info\">\n        <dt>Version</dt>\n        <dd>"
    + escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"version","hash":{},"data":data}) : helper)))
    + "</dd>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isMonoRuntime : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <dt>AppData directory</dt>\n        <dd>"
    + escapeExpression(((helper = (helper = helpers.appData || (depth0 != null ? depth0.appData : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appData","hash":{},"data":data}) : helper)))
    + "</dd>\n\n        <dt>Startup directory</dt>\n        <dd>"
    + escapeExpression(((helper = (helper = helpers.startupPath || (depth0 != null ? depth0.startupPath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startupPath","hash":{},"data":data}) : helper)))
    + "</dd>\n    </dl>\n</fieldset>\n\n";
},"useData":true};
this["T"]["system/info/diskspace/diskspacelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>Disk Space</legend>\n\n    <div id=\"x-grid\"/>\n</fieldset>";
  },"useData":true};
this["T"]["system/info/health/healthlayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset class=\"x-health\">\n    <legend>Health</legend>\n\n    <div id=\"x-health-grid\"/>\n</fieldset>\n\n";
  },"useData":true};
this["T"]["system/info/health/healthokview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row health-ok\">\n    <div class=\"col-md-12\">No issues with your configuration</div>\n</div>";
  },"useData":true};
this["T"]["system/info/moreinfo/moreinfoview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<fieldset>\n    <legend>More Info</legend>\n\n    <dl class=\"dl-horizontal info\">\n        <dt>Discord</dt>\n        <dd><a href=\"https://discord.gg/AD3UP37\">Radarr on Discord</a></dd>\n\n        <dt>Reddit</dt>\n        <dd><a href=\"https://www.reddit.com/r/radarr/\">Radarr Subreddit</a></dd>\n        \n        <dt>Homepage</dt>\n        <dd><a href=\"https://radarr.video/\">radarr.video</a></dd>\n\n\n        <dt>Source</dt>\n        <dd><a href=\"https://github.com/Radarr/Radarr\">Radarr on GitHub</a></dd>\n\n        <dt>Feature Requests</dt>\n        <dd><a href=\"https://github.com/Radarr/Radarr/issues\">GitHub Issue Tracker</a></dd>\n    </dl>\n</fieldset>\n";
},"useData":true};
this["T"]["system/logs/files/contentsview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <h3>"
    + escapeExpression(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filename","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <pre>"
    + escapeExpression(((helper = (helper = helpers.contents || (depth0 != null ? depth0.contents : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contents","hash":{},"data":data}) : helper)))
    + "</pre>\n    </div>\n</div>";
},"useData":true};
this["T"]["system/logs/files/logfilelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-grid\"/>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-contents\"/>\n    </div>\n</div>";
  },"useData":true};
this["T"]["system/logs/table/logstablelayout"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"x-toolbar\"/>\n<div class=\"alert alert-warning alert-dismissable\">\n    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n    If the log viewer table does not load, please disable your adblocker and refresh the page.\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-grid\" class=\"table-responsive\"/>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div id=\"x-pager\"/>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["movies/files/media/edit/editfile"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal-content\">\n		<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n				<h3>"
    + escapeExpression(((helper = (helper = helpers.relativePath || (depth0 != null ? depth0.relativePath : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"relativePath","hash":{},"data":data}) : helper)))
    + "</h3>\n		</div>\n		<div class=\"modal-body edit-movie-modal\">\n				<div id=\"select-quality\">\n\n                </div>\n		</div>\n\n		<div class=\"modal-footer\">\n\n				<span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n				<button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n				<button class=\"btn btn-primary x-save\">Save</button>\n		</div>\n</div>\n";
},"useData":true};
this["T"]["settings/mediamanagement/naming/basic/basicnamingview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "\n<div class=\"form-group\">\n    <label class=\"col-sm-3 control-label\">Include Quality</label>\n\n    <div class=\"col-sm-9\">\n        <div class=\"input-group\">\n            <label class=\"checkbox toggle well\">\n                <input type=\"checkbox\" name=\"includeQuality\"/>\n\n                <p>\n                    <span>Yes</span>\n                    <span>No</span>\n                </p>\n\n                <div class=\"btn btn-primary slide-button\"/>\n            </label>\n        </div>\n    </div>\n</div>\n\n<div class=\"form-group\">\n    <label class=\"col-sm-3 control-label\">Replace Spaces</label>\n\n    <div class=\"col-sm-9\">\n        <div class=\"input-group\">\n            <label class=\"checkbox toggle well\">\n                <input type=\"checkbox\" name=\"replaceSpaces\"/>\n\n                <p>\n                    <span>Yes</span>\n                    <span>No</span>\n                </p>\n\n                <div class=\"btn btn-primary slide-button\"/>\n            </label>\n        </div>\n    </div>\n</div>\n\n<div class=\"form-group\">\n    <label class=\"col-sm-3 control-label\">Separator</label>\n\n    <div class=\"col-sm-3\">\n        <select class=\"form-control\" name=\"separator\">\n            <option value=\" - \">Dash</option>\n            <option value=\" \">Space</option>\n            <option value=\".\">Period</option>\n        </select>\n    </div>\n</div>\n\n";
},"useData":true};
this["T"]["settings/profile/delay/delete/delayprofiledeleteview"] = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h3>Delete Delay Profile</h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>Are you sure you want to delete this delay profile?</p>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-danger x-confirm-delete\">Delete</button>\n    </div>\n</div>\n";
  },"useData":true};
this["T"]["settings/profile/delay/edit/delayprofileeditview"] = {"1":function(depth0,helpers,partials,data) {
  return "            <h3>Edit - Delay Profile</h3>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "            <h3>Add - Delay Profile</h3>\n";
  },"5":function(depth0,helpers,partials,data) {
  return "                <div class=\"alert alert-info\" role=\"alert\">This is the default profile. It applies to all movies that don't have an explicit profile.</div>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Tags</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"One or more tags to apply these rules to matching movies\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"text\" class=\"form-control x-tags\">\n                </div>\n            </div>\n";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.if_gt || (depth0 && depth0.if_gt) || helperMissing).call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if_gt","hash":{
    'compare': ("1")
  },"fn":this.program(10, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"10":function(depth0,helpers,partials,data) {
  return "                <button class=\"btn btn-danger pull-left x-delete\">Delete</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-hidden=\"true\" data-dismiss=\"modal\">&times;</button>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div class=\"modal-body indexer-modal\">\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-3 control-label\">Protocol</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Choose which protocol(s) to use and which one is preferred when choosing between otherwise equal releases\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <select class=\"form-control x-protocol\">\n                        <option value=\"preferUsenet\">Prefer Usenet</option>\n                        <option value=\"preferTorrent\">Prefer Torrent</option>\n                        <option value=\"onlyUsenet\">Only Usenet</option>\n                        <option value=\"onlyTorrent\">Only Torrent</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"form-group x-usenet-delay\">\n                <label class=\"col-sm-3 control-label\">Usenet Delay</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Delay in minutes to wait before grabbing a release from Usenet\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"number\" class=\"form-control\" name=\"usenetDelay\"/>\n                </div>\n            </div>\n\n            <div class=\"form-group x-torrent-delay\">\n                <label class=\"col-sm-3 control-label\">Torrent Delay</label>\n\n                <div class=\"col-sm-1 col-sm-push-5 help-inline\">\n                    <i class=\"icon-radarr-form-info\" title=\"Delay in minutes to wait before grabbing a torrent\" />\n                </div>\n\n                <div class=\"col-sm-5 col-sm-pull-1\">\n                    <input type=\"number\" class=\"form-control\" name=\"torrentDelay\"/>\n                </div>\n            </div>\n\n";
  stack1 = ((helpers.if_eq || (depth0 && depth0.if_eq) || helperMissing).call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if_eq","hash":{
    'compare': ("1")
  },"fn":this.program(5, data),"inverse":this.program(7, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\n    </div>\n    <div class=\"modal-footer\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <span class=\"indicator x-indicator\"><i class=\"icon-radarr-spinner fa-spin\"></i></span>\n        <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n        <button class=\"btn btn-primary x-save\">Save</button>\n    </div>\n</div>\n";
},"useData":true};
this["T"]["system/logs/table/details/logdetailsview"] = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <br/>\n                Exception\n                <pre>"
    + escapeExpression(((helper = (helper = helpers.exception || (depth0 != null ? depth0.exception : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"exception","hash":{},"data":data}) : helper)))
    + "</pre>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-content\">\n    <div class=\"log-details-modal\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\n            <h3>Details</h3>\n\n        </div>\n        <div class=\"modal-body\">\n            Message\n            <pre>"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</pre>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.exception : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n        <div class=\"modal-footer\">\n            <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true};