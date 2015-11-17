var _sr_config = "broker-config.js"; var SR_url = window.location.toString().toLowerCase();
if(/account\.microsoft-ppe\.com/i.test(SR_url) ){ _sr_config = "broker-config2.js"; }
if(typeof(COMSCORE)=="undefined"){var COMSCORE={};}if(typeof COMSCORE.SiteRecruit=="undefined"){COMSCORE.SiteRecruit={version:"5.0.3",configUrl: _sr_config,builderUrl:"builder.js",allowScriptCaching:false,CONSTANTS:{COOKIE_TYPE:{ALREADY_ASKED:1,DD_IN_PROGRESS:2},STATE_NAME:{IDLE:"IDLE",DDINPROGRESS:"DDINPROGRESS"}}};
COMSCORE.SiteRecruit.Utils=(function(){var _sr=COMSCORE.SiteRecruit;return{location:document.location.toString(),loadScript:function(url,loadFresh){if(loadFresh&&!_sr.allowScriptCaching){url=_sr.Utils.appendQueryParams(url,(new Date()).getTime());
}var s=document.createElement("script");s.src=url;document.body.appendChild(s);},getBrowser:function(){var b={};
b.name=navigator.appName;b.version=parseInt(navigator.appVersion,10);if(b.name=="Microsoft Internet Explorer"){if(b.version>3){var ua=navigator.userAgent.toLowerCase();
if(ua.indexOf("msie 5.0")==-1){b.ie=true;}if(ua.indexOf("msie 7")!=-1){b.ie7=true;
}}}if(b.name=="Netscape"||b.name=="Opera"){if(b.version>4){b.mozilla=true;}}return b;
},fireBeacon:function(url){setTimeout(function(){if(url.indexOf("?")==-1){url+=(/\?/.test(url)?"&":"?")+(new Date()).getTime();
}else{url+="&"+(new Date()).getTime();}var i=new Image();i.src=url;},1);},appendQueryParams:function(url,params){if(url==null||params==null){}if(!url){return params;
}else{url=url.replace("?","")+"?";if(params){url+=params.toString().replace("?","");
}return url;}},getRandom:function(num){var n=1000000000;function ugen(old,a,q,r,m){var t=Math.floor(old/q);
t=a*(old-(t*q))-(t*r);return Math.round((t<0)?(t+m):t);}var m1=2147483563,m2=2147483399,a1=40014,a2=40692,q1=53668,q2=52774,r1=12211,r2=3791,x=67108862;
var g2=(Math.round(((new Date()).getTime()%100000))&2147483647),g1=g2;var shuffle=[32],i=0;
for(;i<19;i++){g1=ugen(g1,a1,q1,r1,m1);}for(i=0;i<32;i++){g1=ugen(g1,a1,q1,r1,m1);
shuffle[31-i]=g1;}g1=ugen(g1,a1,q1,r1,m1);g2=ugen(g2,a2,q2,r2,m2);var s=Math.round((shuffle[Math.floor(shuffle[0]/x)]+g2)%m1);
var rand=Math.floor(s/(m1/(n+1)))/n;if(typeof(num)=="undefined"){return rand;}else{return Math.floor(rand*(num+1));
}},getExecutingPath:function(filename){var tags=document.getElementsByTagName("script");
for(var i=tags.length-1;i>=0;i--){var src=tags[i].src;this.scriptUrl=src;if(src.indexOf("/"+filename)!=-1){return src.replace(/(.*)(\/.*)$/,"$1/");
}}},
      
JSONDeserialize: function(str){
				try{ 
         if(str === "")str = '""';
          if(str.length > 4){            
           if(window.JSON && window.JSON.parse){
       				return window.JSON.parse(str.replace("undefined", '"undefined"'));
           }else{
              //Extract cookie state object data and survey array data from the rest of the params  
              var _data = str.substring(1,str.indexOf(",")) + str.substring(str.indexOf("}")+1,str.length-1);
              var _st = str.slice(str.indexOf('name'), str.indexOf("}")).replace(/"/gi,'');
              var _sv =  str.substring(str.indexOf('[')+1, str.indexOf("]")).replace(/"/gi,'');
              var _p = _data.substring(0,_data.indexOf("surveys")-1).replace(/"/gi,'') + _data.substring(_data.indexOf("],")+2,_data.length).replace(/"/gi,'');
              //Convert cookie state, survey, other param string data into separate arrays
              var _stArr = _st.split(",");
              var _svArr = _sv.split(",");
              var _pArr = _p.split(",");
              var obj = {};
              obj.version = _pArr[0].substring(_pArr[0].indexOf(":")+1);                                                                       
              obj.state = {};
              obj.state.name = _stArr[0].substring(_stArr[0].indexOf(":")+1);
              obj.state.url = _stArr[1].substring(_stArr[1].indexOf(":")+1)
              obj.state.timestamp = parseInt(_stArr[2].substring(_stArr[2].indexOf(":")+1));
              obj.lastinvited = parseInt(_pArr[1].substring(_pArr[1].indexOf(":")+1));
              obj.userid = _pArr[2].substring(_pArr[2].indexOf(":")+1);
              obj.vendorid = parseInt(_pArr[3].substring(_pArr[3].indexOf(":")+1)); 
              obj.surveys = new Array();
              //Iterate through survey array[], append surveyIDs to obj.survey[]
              for(var i=0; i<_svArr.length;i++){ obj.surveys.push(_svArr[i]); }
              obj.graceperiod = parseInt(_pArr[4].substring(_pArr[4].indexOf(":")+1));
              obj.trackertimestamp = parseInt(_pArr[5].substring(_pArr[5].indexOf(":")+1)); 
              return obj;
            }
          }else{
          	return null;
          }
				}catch (e){
           return null;
				}
			},
JSONSerialize:function(obj){try{var t=typeof(obj);
if(t!="object"||obj===null){if(t=="string"){obj='"'+obj+'"';}return String(obj);}else{var n,v,json=[],arr=(obj&&obj.constructor==Array);
for(n in obj){v=obj[n];t=typeof(v);if(t!="function"){if(t=="string"){v='"'+v+'"';
}else{if(t=="object"&&v!==null){v=this.JSONSerialize(v);}}json.push((arr?"":'"'+n+'":')+String(v));
}}return(arr?"[":"{")+String(json)+(arr?"]":"}");}}catch(e){return"";}}};})();COMSCORE.SiteRecruit.Utils.UserPersistence={maxNumberOfPids:6,CONSTANTS:{STATE_NAME:{IDLE:"IDLE",DDINPROGRESS:"DDINPROGRESS"}},getCookieName:function(){var A;
if(COMSCORE.SiteRecruit.Broker&&COMSCORE.SiteRecruit.Broker.config){A=COMSCORE.SiteRecruit.Broker.config.cookie;
if(A.name){return A.name;}}return"";},getDefaultCookieOptions:function(){var A={path:"/",domain:""};
return A;},getVendorId:function(){var A=1;return A;},createCookie:function(B,A,D){A=escape(A);
if(D.duration&&D.duration<0){var C=new Date();C.setTime(C.getTime()+D.duration*24*60*60*1000);
A+="; expires="+C.toGMTString();}else{var C=new Date();C.setTime(C.getTime()+10*365*24*60*60*1000);
A+="; expires="+C.toGMTString();}if(D.path){A+="; path="+D.path;}else{}if(D.domain){A+="; domain="+D.domain;
}if(D.secure){A+="; secure";}if(D.graceperiod){A+="; graceperiod="+D.graceperiod;
}document.cookie=B+"="+A;return true;},getCookieValue:function(B){var A=document.cookie.match("(?:^|;)\\s*"+B+"=([^;]*)");
return A?unescape(A[1]):false;},removeCookie:function(A,B){B=B||{};B.duration=-999;
this.createCookie(A,"",B);},createUserObj:function(D){var C=new Date();var G=D.pid;
var F=D.url;var E=this.CONSTANTS.STATE_NAME.IDLE;if(D.statename){E=D.statename;}var A=C.getTime();
if(D.timestamp){A=D.timestamp;}var H=this.getCookieName();if(D.cookiename){H=D.cookiename;
}if(!D.cookieoptions){D.cookieoptions=this.getDefaultCookieOptions();}var B={};B.version="5.0";
B.state={};B.state.name=E;B.state.url=F;B.state.timestamp=A;B.lastinvited=A;B.userid=C.getTime().toString()+Math.floor(Math.random()*1e+16).toString();
B.vendorid=this.getVendorId();B.surveys=new Array();B.surveys.push(G);B.graceperiod=5;
var I=COMSCORE.SiteRecruit.Utils.JSONSerialize(B);this.createCookie(H,I,D.cookieoptions);
return B;},setUserObj:function(E){var I,H,G,A;var J,F,L;var D;var C=this.getUserObj(E);
if(!C){C=this.createUserObj(E);}D=new Date();A=0;J=this.getCookieName();F=5;L=0;G=this.CONSTANTS.STATE_NAME.IDLE;
I=E.pid;if(E.url){H=E.url;}else{if(C.state.url){H=C.state.url;}}if(E.statename){G=E.statename;
}else{if(C.state&&C.state.name){G=C.state.name;}}if(E.timestamp){A=E.timestamp;}else{if(C.state&&C.state.timestamp){A=C.state.timestamp;
}}if(E.cookiename){J=E.cookiename;}if(!E.cookieoptions){E.cookieoptions=this.getDefaultCookieOptions();
}if(E.graceperiod){F=E.graceperiod;}else{if(C.graceperiod){F=C.graceperiod;}}if(E.trackertimestamp){L=E.trackertimestamp;
}else{if(C.trackertimestamp){L=C.trackertimestamp;}}C.lastinvited=D.getTime();if(I){var B=false;
for(i=0;i<C.surveys.length;i++){if(C.surveys[i]&&C.surveys[i].toLowerCase()==I.toLowerCase()){B=true;
}}if(B==false){if(C.surveys.length){if(C.surveys.length<this.maxNumberOfPids){C.surveys.push(I);
}else{C.surveys.splice(0,1);C.surveys.push(I);}}else{C.surveys.push(I);}}for(i=0;
i<C.surveys.length;i++){if(C.surveys[i]==null){C.surveys.splice(i,1);}}}if(G){C.state.name=G;
C.state.url=H;C.state.timestamp=A;C.graceperiod=F;C.trackertimestamp=L;}var K=COMSCORE.SiteRecruit.Utils.JSONSerialize(C);
this.createCookie(J,K,E.cookieoptions);return C;},getUserObj:function(A){var B=this.getCookieName();
if(A.cookiename){B=A.cookiename;}var C=this.getCookieValue(B);if(C&&C!=""){var D=COMSCORE.SiteRecruit.Utils.JSONDeserialize(C);
if(D&&D.version&&!isNaN(D.version)&&D.version>=4.6){return D;}else{}}return null;
}};COMSCORE.SiteRecruit.DDKeepAlive=(function(){var B=1000,E=Math.random(),A;var C=COMSCORE.SiteRecruit;
var D=C.Utils;return{start:function(){var F=this;A=setInterval(function(){if(C.Broker.isDDInProgress()&&F.isTrackerPageOpen()){F.setDDTrackerCookie();
}else{if(!F.isTrackerPageOpen()){F.handleClosedTrackerPage();}else{F.stop();}}},B);
},stop:function(){clearInterval(A);},isTrackerPageOpen:function(){var K={};K.cookiename=COMSCORE.SiteRecruit.Broker.config.cookie.name;
var F=D.UserPersistence.getUserObj(K);var H=(new Date()).getTime();var G=true;var I=false;
var M;if(F&&F.state&&F.state.name==C.CONSTANTS.STATE_NAME.DDINPROGRESS&&F.state.timestamp&&F.trackertimestamp){var J=H-F.trackertimestamp;
var L=J/1000;if(COMSCORE.SiteRecruit.Builder&&COMSCORE.SiteRecruit.Builder.invitation&&COMSCORE.SiteRecruit.Builder.invitation.config){M=COMSCORE.SiteRecruit.Builder.invitation.config.trackerGracePeriod;
}else{if(F.gracePeriod){M=F.gracePeriod;}}if(M){M=parseInt(M);var N=2*M*1000;I=(J<N);
if(!I){G=false;}}}return G;},handleClosedTrackerPage:function(){var F={};var G=C.Broker.config.cookie;
F.cookiename=G.name;F.statename=C.CONSTANTS.STATE_NAME.IDLE;F.cookieoptions={path:G.path,domain:G.domain};
F.url=escape(D.location);F.timestamp=(new Date()).getTime();D.UserPersistence.setUserObj(F);
this.stop();},setDDTrackerCookie:function(){var H=C.Broker.config.cookie;var F={};
F.cookiename=H.name;var G=D.UserPersistence.getUserObj(F);var F={};F.cookiename=H.name;
F.cookieoptions={path:H.path,domain:H.domain};F.url=escape(D.location);F.statename=C.CONSTANTS.STATE_NAME.DDINPROGRESS;
F.timestamp=(new Date()).getTime();if(COMSCORE.SiteRecruit.Builder&&COMSCORE.SiteRecruit.Builder.invitation&&COMSCORE.SiteRecruit.Builder.invitation.config){F.pid=COMSCORE.SiteRecruit.Builder.invitation.config.projectId;
F.graceperiod=COMSCORE.SiteRecruit.Builder.invitation.config.trackerGracePeriod;}else{if(G&&G.gracePeriod){F.graceperiod=G.graceperiod;
}}D.UserPersistence.setUserObj(F);}};})();COMSCORE.SiteRecruit.PagemapFinder=(function(){var C;
var B=COMSCORE.SiteRecruit;var A=B.Utils;return{getTotalFreq:function(){return C;
},find:function(K){var F=0,I;var G=K;var J=[];var H=false;C=0;for(var D=0;G&&D<G.length;
D++){var E=false;var N=G[D];if(N){var M=new RegExp(N.m,"i");if(A.location.search(M)!=-1){var L=G[D].prereqs;
E=true;if(L){if(!this.isMatchContent(L.content)){E=false;}if(!this.isMatchCookie(L.cookie)){E=false;
}if(!this.isMatchLanguage(L.language)){E=false;}}}if(E){if(N.halt){H=true;break;}else{J.push(N);
C=N.f;}}}}if(H==true){J=null;C=0;return null;}return this.choosePriority(J);},choosePriority:function(D){var F=null;
for(var E=0;E<D.length;E++){if(F==null){F=D[E];C=D[E].f;}else{if(F.p<D[E].p){F=D[E];
C=D[E].f;}}}return F;},
isMatchContent:function(O){var I=true,D=0;while(I&&D<O.length){var L=false;
var K=false;var J=O[D];if(J.element){var F=document.getElementsByTagName(J.element);
var G=true;
for(var E=0;E<F.length;E++){
	var N=new RegExp(J.elementValue);
	if(N){
		if(N.test(F[E].innerHTML)){
			if(G){G=false;}
			L=true;
		}
	}else{L=true;}
	if(J.attrib&&J.attrib.length){
		var H=F[E].attributes.getNamedItem(J.attrib);
		var _N =false;
		if(F[E].attributes.getNamedItem("name")){
			 _N=F[E].attributes.getNamedItem("name").value;
		}
		var M=new RegExp(J.attribValue);
		if(H && (_N && /Search\.MSForums\.Iroot/i.test(_N))){
			if(J.attribValue&&J.attribValue.length){
				if(M.test(H.value)){
					K=true;
}}else{K=true;}}}else{K=true;}}}if(!L||!K){I=false;}D++;}return I;},
isMatchCookie:function(E){var I=true,G=0;
while(I&&G<E.length){var F=E[G],H=A.UserPersistence.getCookieValue(F.name);if(H&&H!==null){var D=new RegExp(F.value);
I=D.test(H);G++;}else{return false;}}return I;},isMatchLanguage:function(F){var D=navigator.language||navigator.userLanguage;
D=D.toLowerCase();if(!F){return true;}var E=new RegExp(F);if(E.test(D)){return true;
}return false;},verifyExternalCookie:function(D){COMSCORE.SiteRecruit.Broker.extCookie=D;
},readExternalCookie:function(G){var E=G[0].domain;var D=G[0].name;var H="COMSCORE.SiteRecruit.PagemapFinder.verifyExternalCookie";
var F=E+"?n="+D+"&func="+H+"&";A.loadScript(F,false);},isMatchExternalCookie:function(H){var F=H[0].domain;
var G=H[0].name;var E="COMSCORE.SiteRecruit.PagemapFinder.verifyExternalCookie";var I=F+"?n="+G+"&func="+E+"&";
var J;var K=document.getElementsByTagName("script");for(var D=0;D<K.length;D++){if(K[D].src.search(F)!=-1){J=K[D];
}}if(COMSCORE.SiteRecruit.Broker.extCookie&&COMSCORE.SiteRecruit.Broker.extCookie!=""){return true;
}else{return false;}}};})();COMSCORE.SiteRecruit.Broker=(function(){var B=COMSCORE.SiteRecruit;
var A=B.Utils;var C="!";return{init:function(){B.browser=A.getBrowser();B.executingPath=A.getExecutingPath("broker.js");
if(B.browser.ie||B.browser.mozilla){A.loadScript(B.executingPath+B.configUrl,true);
}else{return;}},start:function(){
if((/iphone|ipad|ipod|android|opera mini|blackberry|windows(phone|ce)|iemobile|htc|nokia/i.test(navigator.userAgent))){
//Disable recruitment for mobile
//}else if(/windows nt 6\.(2|3)/i.test(navigator.userAgent) && /11\.0/i.test(navigator.userAgent)){
}else{	this.init(); }
},run:function(){this.config.Events.beforeRecruit();
if(this.config.objStoreElemName){if(B.browser.ie){COMSCORE.SiteRecruit.Utils.UserPersistence.initialize();
}else{return;}}if(B.version!==this.config.version){return;}var K=this.config.testMode;
var D;var J;D=(A.UserPersistence.getCookieValue("tstMode")==1)?true:false;J=(K||D);
if(this.isDDInProgress()){this.processDDInProgress();}if(!J||this.isDDInProgress()){var H={};
H.cookiename=this.config.cookie.name;var F=A.UserPersistence.getUserObj(H);var G=new Date();
var L=this.config.cookie.duration;var E=G.getTime()-(L*24*60*60*1000);if(F){if(F.lastinvited>E){return;
}}}if(this.findPageMapping()){if(J){if(this.pagemap){this.loadBuilder();}return;}var I=A.getRandom();
if(I<=B.PagemapFinder.getTotalFreq()){if(this.pagemap){this.loadBuilder(); }}else{return;
}}else{return;}},isDDInProgress:function(){var F=false;var D={};D.cookiename=COMSCORE.SiteRecruit.Broker.config.cookie.name;
var E=A.UserPersistence.getUserObj(D);if(E){if(E.state.name==B.CONSTANTS.STATE_NAME.DDINPROGRESS){F=true;
}}return F;},processDDInProgress:function(){B.DDKeepAlive.start();},findPageMapping:function(){this.pagemap=B.PagemapFinder.find(this.config.mapping);
return this.pagemap;},loadBuilder:function(){var D=B.executingPath+B.builderUrl;A.loadScript(D);
}};})();COMSCORE.isDDInProgress=COMSCORE.SiteRecruit.Broker.isDDInProgress;COMSCORE.SiteRecruit.OnReady=(function(){var B=COMSCORE.SiteRecruit;
var A=B.Utils;return{onload:function(){if(B.OnReady.done){return;}B.OnReady.done=true;
B.Broker.start();if(B.OnReady.timer){clearInterval(B.OnReady.timer);}if(document.addEventListener){document.removeEventListener("DOMContentLoaded",B.OnReady.onload,false);
}if(window.ActiveXObject){}},listen:function(){if(/Chrome/i.test(navigator.userAgent)){if(/loading|uninitialized/i.test(document.readyState)){document.addEventListener("DOMContentLoaded",B.OnReady.onload,false)}else{B.OnReady.onload()}}else if(/WebKit|khtml/i.test(navigator.userAgent)){B.OnReady.timer=setInterval(function(){if(/loaded|interactive|complete/.test(document.readyState)){clearInterval(B.OnReady.timer);delete B.OnReady.timer;B.OnReady.onload()}},10)}else if(window.ActiveXObject){COMSCORE.SiteRecruit.OnReady.waitForLoad=setInterval(function(){try{document.documentElement.doScroll("left")}catch(C){return}COMSCORE.SiteRecruit.OnReady.waitForLoad=clearInterval(COMSCORE.SiteRecruit.OnReady.waitForLoad);COMSCORE.SiteRecruit.OnReady.onload()},1000)}else if(document.addEventListener){if(/loading|uninitialized/i.test(document.readyState)){document.addEventListener("DOMContentLoaded",B.OnReady.onload,false)}else{B.OnReady.onload()}}else{if(window.addEventListener){window.addEventListener("load",B.OnReady.onload,false)}else if(window.attachEvent){return window.attachEvent("onload",B.OnReady.onload)}}},
f:[],done:false,timer:null};})();
COMSCORE.SiteRecruit.OnReady.listen();}