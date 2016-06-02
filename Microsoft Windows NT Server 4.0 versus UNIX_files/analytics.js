var archive_analytics = {
    startTime: new Date(),
    img_src: "//analytics.archive.org/0.gif",
    values: { service: 'wb' },
    
    onload_func: function() {
	var now = new Date();
	var loadtime = now - archive_analytics.startTime;

	var v = archive_analytics.values;
	v.loadtime = loadtime;
	v.timediff = -(now.getTimezoneOffset()/60);
	v.locale = archive_analytics.get_locale();
	// if no referrer set '-' as referrer
	v.referrer = document.referrer || '-';

        var string = archive_analytics.format_bug(v);
        var loadtime_img = new Image(100,25);
        loadtime_img.src = archive_analytics.img_src + "?" + string;
    },
    format_bug: function(values) {
        var ret = ['version=2'], count = 2;
        
        for (var data in values) {
            ret.push(encodeURIComponent(data) + "=" + encodeURIComponent(values[data]));
            count = count + 1;
        }
        ret.push('count=' + count);
        return ret.join("&");
    },
    get_locale: function() {
        if (navigator) {
	    return navigator.language || navigator.browserLanguage ||
		navigator.systemLanguage || navigator.userLanguage || '';
        }
        return '';
    },
    get_cookie: function(name) {
      var parts = document.cookie.split(name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
      return 0;
    }
};

if (window.addEventListener) {
    window.addEventListener('load', archive_analytics.onload_func, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', archive_analytics.onload_func);
}
