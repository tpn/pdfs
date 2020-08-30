//(MSDN)-/en-us/(TIER 5)-CUSTOM - Make frequency changes here for mdsn.microsoft.com/en-us/…(various paths)
//Array [PATH,SITE_CODE,FREQ]
var _msdn = [ ["default.aspx",'1175',0.3],[".*windows/apps",'2391',0.3],[".*windows/desktop",'2392',0.3],[".*windows/hardware",'2394',0.3],[".*ie",'2393',0.3],["library",'1176',0.3],["windowsazure",'1179',0.3],["windows",'1190',0.3],["magazine",'1180',0.3],["sharepoint",'1183',0.3],["sqlserver",'1184',0.3],["subscriptions",'1185',0.3],["vstudio",'1189',0.3] ];
//(TECHNET)-/en-us/(TIER 5) - CUSTOM - Make frequency changes here for tehnet.microsoft.com/en-us/…(various paths)
//Array [PATH,SITE_CODE,FREQ]
var _technet = [ ["default.aspx",'1219',0.3],["library",'1192',0.3],["cloud",'2201',0.3],["network",'2200',0.3],["sbs",'2199',0.3],["windowsserver",'1194',0.0815],["forefront",'1011',0.3], ["sharepoint",'1196',0.3],["sqlserver",'1197',0.3],["systemcenter",'1198',0.3],["windows",'1199',0.0036],["scriptcenter",'1200',0.3],["security",'1202',0.3],["subscriptions",'1206',0.3],["sysinternals",'1203',0.1327],["ie",'1220',0.3],["exchange",'1221',0.3],["lync",'1566',0.3]  ];
var SR_url = window.location.toString().toLowerCase();
var SR_url_stripped = SR_url.split("?");
var _pipeIn = false; var _Hweight=false;
//Freq,Site,Halt reset params for Center survey on (MSDN)-/en-us/(TIER 5)-CUSTOM  and (TECHNET)-/en-us/(TIER 5) mappings
var _Freq=0,_halt=false,_Site=false;
var _centerW=0, _networkW=0, _invMSDN = 'inv_c_MSDN-p77596864_TIER5.js'; _invTech="inv_c_TechNet-p77596864.js";
//Raw Params passed to CENTER SURVEY on (MSDN)-/en-us/(TIER 5)-CUSTOM  and (TECHNET)-/en-us/(TIER 5) mappings
var srchMSForumIroot="",_wtsp="", dcSextProduct="";
if(document.getElementsByName('Search.MSForums.Iroot')[0] && document.getElementsByName('Search.MSForums.Iroot')[0].getAttribute('content') != null){
		srchMSForumIroot = document.getElementsByName('Search.MSForums.Iroot')[0].getAttribute('content');	
		if(srchMSForumIroot.search('windowsazure') != -1){ srchMSForumIroot='windowsazure'; }
}
if(document.getElementsByName('DCSext.Product')[0] && document.getElementsByName('DCSext.Product')[0].getAttribute('content') != null){
		dcSextProduct = document.getElementsByName('DCSext.Product')[0].getAttribute('content');
}
if(typeof(wtsp)&& typeof(wtsp)!='undefined'){ _wtsp=wtsp.toLowerCase(); if(/_technet_library_windowsserver/i.test(_wtsp)){_wtsp="_technet_library_windowsserver_";} };
var _raw_params = 'Search.MSForums.Iroot='+srchMSForumIroot+"&wtsp="+ _wtsp+"&DCSext.Product="+dcSextProduct;

if(SR_url_stripped[0].search('http://msdn.microsoft.com') != -1 || SR_url_stripped[0].search('https://msdn.microsoft.com') != -1){
	setSiteFreq("msdn\.microsoft\.com\/en-us\/", _msdn);//MSDN center survey check
	checkWTSP();
}else if(SR_url_stripped[0].search('http://technet.microsoft.com') != -1 || SR_url_stripped[0].search('https://technet.microsoft.com') != -1){
	setSiteFreq("technet\.microsoft\.com\/en-us\/", _technet);//TechNet center survey check
	checkWTSP();
}
//Function to reset _Site and _Freq for Center Survey usinng ARRAY's above
function setSiteFreq(_url, _array){
	for(i=0; i< _array.length; i++){
		//if(SR_url.search(_url + _array[i][0].toString().toLowerCase()) != -1){
		var _reg = new RegExp(_url + _array[i][0], "i");
		if(_reg.test(SR_url)){
			_Site = _array[i][1];
			_Freq = _array[i][2];
			break;
		}
	}
}
//Function to reset _Freq, _halt based on wtsp param
function checkWTSP(){
					
	 if(_Site == '1176'){
		//if(!(/msdnlib_(webdev|devtools_lang)|_msdn_library_sqlserver_|windowsazure/i.test(_wtsp))){
		if(!(/msdnlib_hp|msdn_library_sqlserver|windowsazure|msdnlib_office365|msdnlib_office/i.test(_wtsp))){
			_halt=true;
		}else if(/msdnlib_office/i.test(_wtsp)){
			if(!(/MULTIPLEPRODUCTS|SHAREPOINTALL|OFFICE365/i.test(dcSextProduct))){
				_halt=true;
			}
		}
		//if(/msdnlib_(webdev|devtools_lang)/i.test(_wtsp)){
		if(/msdnlib_hp/i.test(_wtsp)){
			_Freq=0.3;
		}	
	}else if(_Site=='1192'){	
		if(!(/technet_(library_(windowsserver_|sqlserver_|sharepoint|forefront|lync|win7_|security_|ie_|exchangeserver_|windowsserveressentials_))|_technet_prodtechnol_office_|technet_sharepoint_library|sto_technet_systemcenter_|sto_technet_windowsclient_library_|scriptcenter_technet/i.test(_wtsp))){
				_halt=true;
		}else if(/technet_prodtechnol_office_/i.test(_wtsp) ){
			if(!(/OFFICE365|OFFICERESOURCEKIT/i.test(dcSextProduct))){
				_halt=true;
			}
		}
		if(_wtsp=="_technet_library_windowsserver_"){
			_Freq=0.3; 
	  }else if(_wtsp=="technet_library_win7_"){
	    _Freq=0.3;
    }else if( _wtsp=="_sto_technet_windowsclient_library_"){
			_Freq=0.3; 
		}else if(_wtsp=="_technet_prodtechnol_office_"){
			_Freq=0.3; 
		}else if(_wtsp=="_technet_library_sqlserver_"){
			_Freq=0.3; 
		}else if(_wtsp=="_technet_library_security_"){
			_Freq=0.3; 
		}
		//Default is 1232 set in _technet[] array above
	}
}
if(_Site=='1176'){
	//if(/msdnlib_(webdev|devtools_lang)/i.test(_wtsp)){_pipeIn="Microsoft Developer Network (MSDN)"; _Hweight=2;}
	if(/msdnlib_hp/i.test(_wtsp)){_pipeIn="Microsoft Developer Network (MSDN)"; _Hweight=2;}
	else if(/windowsazure/i.test(_wtsp)){_pipeIn="Windows Azure Developer Center"; _Hweight=8;}
	else if(/_msdn_library_sqlserver/i.test(_wtsp)){_pipeIn="SQL Server Developer Center"; _Hweight=19;}
	else if(/msdnlib_office365/i.test(_wtsp)){_pipeIn="Office 365 Developer Center"; _Hweight=37;}
					
	else if(/msdnlib_office/i.test(_wtsp)){
		if(/MULTIPLEPRODUCTS/i.test(dcSextProduct)){_pipeIn="Office Developer Center"; _Hweight=12; }
		else if(/SHAREPOINTALL/i.test(dcSextProduct)){_pipeIn="SharePoint Developer Center"; _Hweight=16;}
		else if(/OFFICE365/i.test(dcSextProduct)){_pipeIn="Office 365 Developer Center"; _Hweight=37;}
	}
}
if(/social\.msdn\.microsoft\.com\/forums/i.test(SR_url_stripped[0])){
	if(/forums\/windowsazure/i.test(SR_url_stripped[0])){_pipeIn="Windows Azure Developer Center"; _Hweight=9;}
	else if(/forums\/office/i.test(SR_url_stripped[0])){_pipeIn="Office Developer Center"; _Hweight=13;}
	else if(/forums\/sharepoint/i.test(SR_url_stripped[0])){_pipeIn="SharePoint Developer Center"; _Hweight=17;}
	else if(/forums\/sqlserver/i.test(SR_url_stripped[0])){_pipeIn="SQL Server Developer Center"; _Hweight=20;}
	else if(/forums\/vstudio/i.test(SR_url_stripped[0])){_pipeIn="Visual Studio Developer Center"; _Hweight=29;}
}
if(_Site=='1175'){	_pipeIn="Microsoft Developer Network Homepage"; _Hweight=1;}
else if(_Site=='1179'){_pipeIn="Windows Azure Developer Center";_Hweight=7;} 
else if(_Site=='1180'){_pipeIn="MSDN Magazine site";_Hweight=10;}
else if(_Site=='1181'){_pipeIn="Office Developer Center";_Hweight=11;}
else if(_Site=='2009'){_pipeIn="Office Apps Developer Center";_Hweight=14;}
else if(_Site=='1183'){_pipeIn="SharePoint Developer Center";_Hweight=15;}	
else if(_Site=='1184'){_pipeIn="SQL Server Developer Center";_Hweight=18;} 			
else if(_Site=='1185'){_pipeIn="MSDN Subscription site";_Hweight=21;}
else if(_Site=='1189'){_pipeIn="Visual Studio Developer Center";_Hweight=28;}
else if(_Site=='2185'){_pipeIn="Office 365 Developer Center";_Hweight=36;}
else if(_Site=='1190'){_pipeIn="Windows Dev Center";_Hweight=38;}
else if(_Site=='2391'){_pipeIn="Windows Dev Center";_Hweight=39;}
else if(_Site=='2392'){_pipeIn="Windows Dev Center";_Hweight=40;}
else if(_Site=='2393'){_pipeIn="Internet Explorer Developer Center";_Hweight=41;}
else if(_Site=='2394'){_pipeIn="Windows Dev Center";_Hweight=42;}
				
if(_Site=='1192'){
	if(/technet_library_windowsserver_/i.test(_wtsp)){_pipeIn="Windows Server TechCenter"; _Hweight=7;}
	else if(/technet_library_windowsserveressentials_/i.test(_wtsp)){_pipeIn="Windows Server Essentials TechCenter"; _Hweight=10;}
	else if(/technet_library_win7_|_sto_technet_windowsclient_library_/i.test(_wtsp)){_pipeIn="Windows TechCenter"; _Hweight=16;}
	else if(/technet_library_security_/i.test(_wtsp)){_pipeIn="Security TechCenter"; _Hweight=19;}
	else if(/technet_library_exchangeserver_/i.test(_wtsp)){_pipeIn="Exchange Server TechCenter"; _Hweight=21;}
	else if(/sto_technet_systemcenter_/i.test(_wtsp)){_pipeIn="System Center TechCenter"; _Hweight=24;}
	else if(/technet_library_sqlserver_/i.test(_wtsp)){_pipeIn="SQL Server TechCenter"; _Hweight=27;}
	else if(/technet_library_ie_/i.test(_wtsp)){_pipeIn="Internet Explorer TechCenter"; _Hweight=30;}
	else if(/technet_library_sharepoint_|technet_sharepoint_library/i.test(_wtsp)){_pipeIn="SharePoint TechCenter"; _Hweight=33;}
	else if(/scriptcenter_technet/i.test(_wtsp)){_pipeIn="Script Center"; _Hweight=36;}		
	else if(/technet_library_forefront_/i.test(_wtsp)){_pipeIn="Forefront TechCenter"; _Hweight=40;}
	else if(/technet_library_lync/i.test(_wtsp)){_pipeIn="Lync TechCenter"; _Hweight=45;}		
	else if(/technet_prodtechnol_office_/i.test(_wtsp)){
		if(/OFFICE365/i.test(dcSextProduct)){_pipeIn="Office 365 TechCenter"; _Hweight=48;}
		else if(/OFFICERESOURCEKIT/i.test(dcSextProduct)){_pipeIn="Office TechCenter"; _Hweight=13;}
	}
}else if(_Site=='1203'){	_pipeIn="Windows Sysinternals"; _Hweight=5;}
else if(_Site=='1194'){_pipeIn="Windows Server TechCenter"; _Hweight=6;} 
else if(_Site=='2199'){	_pipeIn="Windows Server Essentials TechCenter";  _Hweight=9;}
else if(_Site=='1199'){	_pipeIn="Windows TechCenter";  _Hweight=15;}
else if(_Site=='1202'){	_pipeIn="Security TechCenter";  _Hweight=18;}
else if(_Site=='1221'){	_pipeIn="Exchange Server TechCenter"; _Hweight=20;}
else if(_Site=='1198'){	_pipeIn="System Center TechCenter"; _Hweight=23;}
else if(_Site=='1197'){	_pipeIn="SQL Server TechCenter"; _Hweight=26;}
else if(_Site=='1220'){	_pipeIn="Internet Explorer TechCenter"; _Hweight=29;}
else if(_Site=='1196'){	_pipeIn="SharePoint TechCenter "; _Hweight=32;}
else if(_Site=='1200'){	_pipeIn="Script Center"; _Hweight=35;}
else if(_Site=='1219'){	_pipeIn="TechNet Home Page"; _Hweight=38;}
else if(_Site=='1011'){	_pipeIn="Forefront TechCenter"; _Hweight=39;}
else if(_Site=='2200'){	_pipeIn="Networking TechCenter";_Hweight=42;}
else if(_Site=='2201'){	_pipeIn="Cloud and DataCenter Solutions Hub"; _Hweight=43;}
else if(_Site=='1566'){	_pipeIn="Lync TechCenter";_Hweight=44;}
else if(_Site=='1206'){	_pipeIn="TechNet Subscriptions";_Hweight=49;}
if(/social\.technet\.microsoft\.com\/forums/i.test(SR_url_stripped[0])){
	if(/forums\/windowsserver\/.*winserveressentials/i.test(SR_url)){_pipeIn="Windows Server Essentials TechCenter";_Hweight=11;}
	else if(/forums\/windowsserver/i.test(SR_url_stripped[0])){_pipeIn="Windows Server TechCenter";_Hweight=8;}
	else if(/forums\/office/i.test(SR_url_stripped[0])){_pipeIn="Office TechCenter";_Hweight=14;}
	else if(/forums\/exchange/i.test(SR_url_stripped[0])){_pipeIn="Exchange Server TechCenter";_Hweight=22;}
	else if(/forums\/systemcenter/i.test(SR_url_stripped[0])){_pipeIn="System Center TechCenter";_Hweight=25;}
	else if(/forums\/sqlserver/i.test(SR_url_stripped[0])){_pipeIn="SQL Server TechCenter";_Hweight=28;}
	else if(/forums\/ie/i.test(SR_url_stripped[0])){_pipeIn="Internet Explorer TechCenter";_Hweight=31;}
	else if(/forums\/sharepoint/i.test(SR_url_stripped[0])){_pipeIn="SharePoint TechCenter";_Hweight=34;}
	else if(/forums\/scriptcenter/i.test(SR_url_stripped[0])){_pipeIn="Script Center TechCenter";_Hweight=37;}
	else if(/forums\/forefront/i.test(SR_url_stripped[0])){_pipeIn="Forefront TechCenter";_Hweight=41;}
	else if(/forums\/lync/i.test(SR_url_stripped[0])){_pipeIn="Lync TechCenter";_Hweight=46;}
}
function _rc(O){var P=document.cookie.split(";");var S=O+"=";for(var R=0;R<P.length;
R++){var Q=P[R];while(Q.charAt(0)==" "){Q=Q.substring(1,Q.length);}if(Q.indexOf(S)==0){return Q.substring(S.length,Q.length);
}}return null;}
_SS_TRACK=_rc("SS_TRACK");
_MSCOM_C=_rc("Microsoft.com");
_raw_params+='&'+ _MSCOM_C+'&'+_SS_TRACK;
if(_Hweight){_raw_params+="&hweight="+_Hweight;}
COMSCORE.SiteRecruit.Broker.config={version:"5.0.3",testMode:false,cookie:{name:"msresearch",path:"/",domain:".microsoft.com",duration:90,rapidDuration:0,expireDate:""},thirdPartyOptOutCookieEnabled:false,prefixUrl:"",Events:{beforeRecruit:function(){}},mapping:[{m:"(code\\.msdn\\.microsoft\\.com|cpapp02)/(WINDOWSAPPS|WINDOWSDESKTOP|WINDOWSHARDWARE|IE)",c:"inv_c_BLANK.js",f:0,p:2,halt:true},{m:"/(sr-msdn|msdnstage|msdntest|msdnlive|msdn\\.microsoft)[\\w\\.-]+/en-us/((default\\.aspx)|(.*windows/(apps|desktop|hardware))|(library|ie|windowsazure|windows|magazine|sqlserver|subscriptions|sharepoint|vstudio))",c:"inv_c_MSDN-p218260443_TIER5.js",f:_Freq,p:1,halt:_halt},{m:"/(sr-msdn|msdnstage|msdntest|msdnlive|msdn\\.microsoft)[\\w\\.-]+/en-us/office",c:"inv_c_MSDN-p218260443-1181.js",f:0.3,p:2},{m:"/(sr-msdn|msdnstage|msdntest|msdnlive|msdn\\.microsoft)[\\w\\.-]+/en-us/office/apps",c:"inv_c_MSDN-p218260443-2009.js",f:0.3,p:3},{m:"/(sr-msdn|msdnstage|msdntest|msdnlive|msdn\\.microsoft)[\\w\\.-]+/en-us/office365",c:"inv_c_MSDN-p218260443-2185.js",f:0.3,p:3},{m:"/(sr-msdn|msdnstage|msdntest|msdnlive|msdn\\.microsoft)[\\w\\.-]+/ja-jp",c:"inv_c_MSDN-p15466742-JA.js",f:0.0096,p:0},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/forums/en-(us|US)/category/(windowsdesktopdev|windowshardwaredev|iedevelopment|windowsapps)",c:"inv_c_BLANK.js",f:0,p:3,halt:true},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/Forums/office/en-(us|US)",c:"inv_c_SC-MSDN-p218260443-Office.js",f:0.3,p:1},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/Forums/sharepoint/en-(us|US)",c:"inv_c_SC-MSDN-p218260443-sharepoint.js",f:0.3,p:1},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/Forums/sqlserver/en-us",c:"inv_c_SC-MSDN-p218260443-sqlserver.js",f:0.3,p:1},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/Forums/vstudio/en-(us|US)",c:"inv_c_SC-MSDN-p218260443-vstudio.js",f:0.3,p:1},{m:"(.*?social\\.msdn\\.microsoft)[\\w\\.-/]+/Forums/windowsazure/en-(us|US)",c:"inv_c_SC-MSDN-p218260443-Tier1.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-/]+/(Forums/(en/ITCG/threads|scriptcenter/en-US/home))",c:"inv_c_SC-TN-p218292485-1201.js",f:0.3,p:1,prereqs:{content:[{"element":"meta","attrib":"content","attribValue":"scriptcenter"}],cookie:[],externalDomain:[]}},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/forums/exchange/en-us",c:"inv_c_SC-TN-p218292485-exchange.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/forefront/en-us",c:"inv_c_SC-TN-p218292485-forefront.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft|sr-technet)[\\w\\.-]+/Forums/ie/en-us",c:"inv_c_SC-TN-p218292485-ie.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/lync/en-us",c:"inv_c_SC-TN-p218292485-lync.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/office/en-us",c:"inv_c_SC-TN-p218292485-office.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/scriptcenter/en-us",c:"inv_c_SC-TN-p218292485-scriptcenter.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/sharepoint/en-us",c:"inv_c_SC-TN-p218292485-sharepoint.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/Forums/sqlserver/en-us",c:"inv_c_SC-TN-p218292485-sqlserver.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/forums/systemcenter/en-us",c:"inv_c_SC-TN-p218292485-syscenter.js",f:0.3,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/forums/windows/en-US",c:"inv_c_SC-TN-p218292485-windows.js",f:0.0036,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/forums/windowsserver/en-us",c:"inv_c_SC-TN-p218292485-TIER1.js",f:0.0815,p:1},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/forums/windowsserver/en-US/home\\?forum=winserveressentials",c:"inv_c_SC-TN-p218292485-TIER2.js",f:0.3,p:2},{m:"(.*?social\\.technet\\.microsoft)[\\w\\.-]+/wiki",c:"inv_c_SC-TN-p218292485-wiki.js",f:0.3,p:1},{m:"/(sr-technet|tnstage|tnlive|tntest|technet\\.microsoft)[\\w\\.-]+/en-us/office/ocs",c:"inv_c_BLANK.js",f:0,p:3,halt:true},{m:"/(sr-technet|tnstage|tnlive|tntest|technet\\.microsoft)[\\w\\.-]+/en-us/((default\\.aspx)|(windows($|/))|(library|cloud|network|sbs|windowsserver|forefront|sharepoint|sqlserver|systemcenter|scriptcenter|security|subscriptions|sysinternals|ie|exchange|lync))",c:"inv_c_TechNet-p218292485.js",f:_Freq,p:1,halt:_halt},{m:"/(technet\\.microsoft)[\\w\\.-]+/en-us/library/",c:"inv_c_Technet-p255816510-1192.js",f:_Freq,p:2,halt:_halt},{m:"/(sr-technet|tnstage|tnlive|tntest|technet\\.microsoft)[\\w\\.-]+/en-us/office",c:"inv_c_TN-p218292485-1195.js",f:0.3,p:2},{m:"/(sr-technet|tnstage|tnlive|tntest|technet\\.microsoft)[\\w\\.-]+/en-us/office365",c:"inv_c_TN-p218292485-1569.js",f:0.3,p:3},{m:"/(sr-technet|tnstage|tnlive|tntest|technet\\.microsoft)[\\w\\.-]+/ja-jp",c:"inv_c_TECHNET-p15466742-p81712691-JA.js",f:0.0097,p:1},{m:"//[\\w\\.-]+/en-us/server-cloud/windows-server",c:"inv_c_WWW-p218292485.js",f:0.3,p:0}]};
COMSCORE.SiteRecruit.Broker.run();