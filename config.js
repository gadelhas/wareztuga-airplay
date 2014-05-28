 $( document ).ready(function() {
    console.log( "document loaded" );
    var xbmcIP = localStorage["xbmcIP"];
	var xbmcPort = localStorage["xbmcPort"];
	if (xbmcIP == undefined) {
		xbmcIP = defaultIP;
	};
	if (xbmcPort == undefined) {
		xbmcPort = defaultPort;
	};
	$('input#IP').val(xbmcIP);
	$('input#Port').val(xbmcPort);

	$("button#save").click(function() {
		localStorage['xbmcIP'] = $('input#IP').val();
		localStorage['xbmcPort'] = $('input#Port').val();
	});
	$("button#play").click(function() {
		var tablink;
		chrome.tabs.getSelected(null,function(tab) {
			var tablink = tab.url;
			EnviarXBMC(tab.url);
		});
		
	});
});

var defaultIP = "Ip do teu xbmc";
var defaultPort = "Porta do teu xbmc";

function EnviarXBMC(link) {
	console.log(link);
	var url = 'http://' + localStorage['xbmcIP'] + ':' + localStorage['xbmcPort'] + '/jsonrpc';
	var data = 'request={"jsonrpc": "2.0","id": 0,"method": "Addons.ExecuteAddon","params": {"addonid": "plugin.video.wtairplay","params": {"url": "' + link + '"}}}';
	console.log(url);
	console.log(data);
	pedido = $.ajax({
                url: url,
                type: "get",
                data: data,
                crossDomain: true,
                dataType: "json",
            });
	alert("Pedido enviado!\n\nVerifique o seu dispositivo com XBMC.\n\nSe nada acontecer, certifique-se que tem o servidor XBMC activado.");
}