'use strict';window.____mjsLoaded=!0;var baseUrl='http://meeting.oa.com/meetingweb/FramePage/OrderForm.aspx';-1===location.href.indexOf(baseUrl)&&(location.href=baseUrl+'?time=1533546978103&RoomID=2051&SCol=0&ECol=1&Date=2018-08-26');var mettingMap={};function getViewState(b,c,d){$.get(baseUrl+'?time=1533291425165&RoomID='+b+'&SCol=18&ECol=19&Date='+c+'&random='+Date.now(),function(f,g){log('get viewstate state:'+g);var h=f.match(/ id="__VIEWSTATE" value="([\s\S]*?)" \/>/)[1],i=f.match(/ id="__VIEWSTATEGENERATOR" value="([\s\S]*?)" \/>/)[1],j=f.match(/ id="__EVENTVALIDATION" value="([\s\S]*?)" \/>/)[1];d&&d(h,j,i)})}function metting(b,c,d,f,g,h,i,j,k,l,m,n){$.ajax({type:'POST',url:baseUrl+'?time=1533291425165&RoomID='+b+'&SCol=18&ECol=19&Date='+f,data:{__EVENTTARGET:'',__EVENTARGUMENT:'',__VIEWSTATE:k,__VIEWSTATEGENERATOR:m,__EVENTVALIDATION:l,ordercontent$tbTitle:g,ordercontent$tbDate:f,ordercontent$drpStartTime:c,ordercontent$drpEndTime:d,ordercontent$ucMember:h,ordercontent$ucCompere:'',ordercontent$txtAgenda:'',ordercontent$ucRecorder:'',ordercontent$tbIsSendSMS:'on',ordercontent$tbIsSendWeixin:'on',ordercontent$tbIsSendWeixinToMember:'on',ordercontent$tbMemo:'',ordercontent$btnsubmit:'\u786E\u8BA4\u6DFB\u52A0',ordercontent$hidShowMeetingExt:'false',BuildingID:i,FloorID:j},success:function(p){var D=p.match(/<script language="javascript">alert\("([\s\S]*)"\);<\/script>/);D&&!n?log('\u65F6\u95F4\u51B2\u7A81'===D[1]?'\u5DF2\u88AB\u9884\u5B9A':D[1]):(!n&&log('\u9884\u5B9A\u6210\u529F\u3002RoomID: '+b+' \u4F1A\u8BAE\u65E5\u671F: '+f+' \u65F6\u95F4\u6BB5: '+c+'-'+d),mettingMap[b+c+d+f]=!0)},dataType:'text',error:function(p){log(p.statusText),console.log(p)}})}function formatDate(b,c){var d=new Date(b);c=c||'YY-MM-DD hh:mm:ss';var f=d.getFullYear(),g=d.getMonth()+1,h=d.getDate(),i=d.getHours(),j=d.getMinutes(),k=d.getSeconds(),l=Array.apply(null,Array(10)).map(function(n,o){return'0'+o}),m=c.replace(/YY/g,f).replace(/MM/g,l[g]||g).replace(/DD/g,l[h]||h).replace(/hh/g,l[i]||i).replace(/mm/g,l[j]||j).replace(/ss/g,l[k]||k);return m}function getIt(b,c,d,f,g){var h=$('#ordercontent_tbTitle').val(),i=$('#ordercontent_ucMember').val();getViewState(b,f,function(j,k,l){setTimeout(function(){metting(b,c,d,f,h,i,381,471,j,k,l,g)},0)})}var $tr=$('.formtable tr');$tr.eq(8).hide(),$tr.eq(1).hide(),$tr.eq(9).hide(),$tr.eq(10).hide(),$tr.eq(11).hide(),$tr.eq(12).hide(),$tr.eq(6).hide(),$tr.eq(13).hide(),$('.sidebar').hide(),$('.title').html('\u5FAE\u4FE1\u652F\u4ED8\u4F1A\u8BAE\u9884\u5B9A\u7CFB\u7EDF - \u81EA\u52A8\u9884\u5B9A\u6EE8\u6D77 N2717,N2716'),$('.buttoncol').html('<input type="button" value="\u521B\u5EFA\u4EFB\u52A1" class="orderconfirm"><input type="button" value="\u6D4B\u8BD5\u9884\u5B9AS4344" class="testBtn orderconfirm" style="margin-left: 10px;">'),$('.testBtn').click(function(){if(''===$.trim($('#ordercontent_tbTitle').val()))return void alert('\u4E3B\u9898\u4E0D\u80FD\u4E3A\u7A7A');if(''===$.trim($('#ordercontent_ucMember').val()))return void alert('\u4E0E\u4F1A\u4EBA\u5458\u4E0D\u80FD\u4E3A\u7A7A');var b=new Date,c=new Date(b);c.setDate(b.getDate()+20);var d=formatDate(c,'YY-MM-DD');getIt('1651','12:00','13:00',d)}),$('.orderconfirm').eq(0).click(function(){return''===$.trim($('#ordercontent_tbTitle').val())?void alert('\u4E3B\u9898\u4E0D\u80FD\u4E3A\u7A7A'):''===$.trim($('#ordercontent_ucMember').val())?void alert('\u4E0E\u4F1A\u4EBA\u5458\u4E0D\u80FD\u4E3A\u7A7A'):void($('.orderconfirm').hide(),log('\u521B\u5EFA\u4EFB\u52A1\u6210\u529F\uFF01\u51CC\u6668\u5C06\u81EA\u52A8\u9884\u5B9A\u3002'),getIt('2051','10:00','12:00','2028-08-26',!0),setInterval(function(){log('\u7EED\u767B\u5F55\u6001');try{getIt('2051','10:00','12:00','2028-08-26',!0)}catch(b){log(b.msg)}},3.6e6),setInterval(function(){var b,c;try{var d=new Date;0===d.getMinutes()&&1===d.getHours()&&15<d.getSeconds()&&30>d.getSeconds()&&(b=new Date(d),b.setDate(d.getDate()+20),c=formatDate(b,'YY-MM-DD'),log('\u53D1\u8D77\u5B9A\u4F1A\u8BAE\u5BA4\u8BF7\u6C42'),!mettingMap['205110:0012:00'+c]&&!mettingMap['205910:0012:00'+c]&&getIt('2051','10:00','12:00',c),!mettingMap['205114:3019:00'+c]&&!mettingMap['205914:3019:00'+c]&&getIt('2051','14:30','19:00',c),!mettingMap['205310:0012:00'+c]&&!mettingMap['206110:0012:00'+c]&&getIt('2053','10:00','12:00',c),!mettingMap['205314:3019:00'+c]&&!mettingMap['206114:3019:00'+c]&&getIt('2053','14:30','19:00',c)),0===d.getMinutes()&&0===d.getHours()&&15>d.getSeconds()&&(b=new Date(d),b.setDate(d.getDate()+20),c=formatDate(b,'YY-MM-DD'),mettingMap['205910:0012:00'+c]||getIt('2059','10:00','12:00',c),mettingMap['205914:3019:00'+c]||getIt('2059','14:30','19:00',c),mettingMap['206110:0012:00'+c]||getIt('2061','10:00','12:00',c),mettingMap['206114:3019:00'+c]||getIt('2061','14:30','19:00',c))}catch(f){log(f.msg)}},1e3))});function log(b){$('#divContendArea').append('<div>'+b+'----'+new Date().toLocaleDateString()+new Date().toLocaleTimeString()+'</div>')}
