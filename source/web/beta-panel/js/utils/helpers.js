$(function(){var helpers={};helpers.DELAY_MS=325;helpers.DEBUG_STATE=0||(localStorage.getItem('phantombot_debug_state')==='1'?1:0);helpers.parseNumber=function(number){return(number+'').replace(/\B(?=(\d{3})+(?!\d))/g,',')};helpers.isValidNumberOrString=function(obj){let value=(typeof obj==='object'?obj.val():obj);if(isNaN(value)){if(typeof value==='string'&&value.length>0){return!0}}else{if(typeof value==='number'&&value>0){return!0}}
return!1};helpers.getDefaultIfNullOrUndefined=function(value,def){if(value===null||value===undefined){return def}else{return value}};helpers.getEventMessage=function(event){switch(event.type.toLowerCase()){case 'subscriber':return(event.username+' just subscribed!');case 'prime subscriber':return(event.username+' just subscribed with Twitch Prime!');case 'resubscriber':return(event.username+' just resubscribed for '+event.months+' months in a row!');case 'follower':return(event.username+' just followed!');case 'bits':return(event.username+' just cheered '+event.amount+' bits!');case 'host':return(event.username+' just hosted with '+event.viewers+' viewers!');case 'auto-host':return(event.username+' just auto-hosted with '+event.viewers+' viewers!')}};helpers.handleInputString=function(obj){if(obj.val().length<1){if(!obj.parent().hasClass('has-error')){obj.parent().addClass('has-error');obj.after($('<p/>',{'class':'help-block','text':'You cannot leave this field empty.'}));obj.closest('form').find('button').prop('disabled',!0).addClass('disabled');return!1}}else{if(obj.parent().find('p').length>0){if(obj.parent().hasClass('has-error')){obj.parent().removeClass('has-error');obj.parent().find('p').remove();obj.closest('form').find('button').prop('disabled',!1).removeClass('disabled');return!0}}}
return!obj.parent().hasClass('has-error')};helpers.handleInputNumber=function(obj,min){min=(min===undefined?0:min);if(isNaN(parseInt(obj.val()))||isNaN(obj.val())||parseInt(obj.val())<min){if(!obj.parent().hasClass('has-error')){obj.parent().addClass('has-error');obj.after($('<p/>',{'class':'help-block','text':'Please input a number that is greater or equal to '+min+'.'}));obj.closest('form').find('button').addClass('disabled');return!1}}else{if(obj.parent().find('p').length>0){if(obj.parent().hasClass('has-error')){obj.parent().removeClass('has-error');obj.parent().find('p').remove();obj.closest('form').find('button').removeClass('disabled');return!0}}}
return!obj.parent().hasClass('has-error')};helpers.handleInputDate=function(obj){if(obj.val().match(/((\d{2})(\\|\/|\.)(\d{2})(\\|\/|\.)(\d{4}))/)===null){if(!obj.parent().hasClass('has-error')){obj.parent().addClass('has-error');obj.after($('<p/>',{'class':'help-block','text':'Please input a valid date (mm/dd/yyyy or dd/mm/yyyy).'}));obj.closest('form').find('button').addClass('disabled');return!1}}else{if(obj.parent().find('p').length>0){if(obj.parent().hasClass('has-error')){obj.parent().removeClass('has-error');obj.parent().find('p').remove();obj.closest('form').find('button').removeClass('disabled');return!0}}}
return!obj.parent().hasClass('has-error')};helpers.handlePanelToggleInfo=function(obj,id){id='phantombot_'+id.substring(id.indexOf('-')+1);if(localStorage.getItem(id)==='false'){obj.html(obj.data('number'));localStorage.setItem(id,'true')}else{obj.html('Hidden');localStorage.setItem(id,'false')}};helpers.handlePanelSetInfo=function(obj,id){let item=localStorage.getItem('phantombot_'+id.substring(id.indexOf('-')+1));if(item==='true'||item===null){obj.html(obj.data('number'))}else{obj.html('Hidden')}};helpers.getModal=function(id,title,btn,body,onClose){return $('<div/>',{'class':'modal fade','id':id}).append($('<div/>',{'class':'modal-dialog'}).append($('<div/>',{'class':'modal-content'}).append($('<div/>',{'class':'modal-header',}).append($('<button/>',{'type':'button','class':'close','data-dismiss':'modal','html':'&times;'})).append($('<h4/>',{'class':'modal-title','text':title}))).append($('<div/>',{'class':'modal-body','html':body})).append($('<div/>',{'class':'modal-footer',}).append($('<button/>',{'class':'btn btn-primary','type':'button','text':btn,'click':onClose})).append($('<button/>',{'class':'btn btn-default','type':'button','text':'Cancel','data-dismiss':'modal'}))))).on('hidden.bs.modal',function(){$('#'+id).remove()})};helpers.getAdvanceModal=function(id,title,btn,body,onClose){return $('<div/>',{'class':'modal fade','id':id}).append($('<div/>',{'class':'modal-dialog'}).append($('<div/>',{'class':'modal-content'}).append($('<div/>',{'class':'modal-header',}).append($('<button/>',{'type':'button','class':'close','data-dismiss':'modal','html':'&times;'})).append($('<h4/>',{'class':'modal-title','text':title}))).append($('<div/>',{'class':'modal-body','html':body})).append($('<div/>',{'class':'modal-footer',}).append($('<button/>',{'class':'btn btn-default pull-left','type':'button','data-toggle':'collapse','data-target':'#advance-collapse','html':$('<span/>',{'class':'glyphicon glyphicon-chevron-down pull-right','style':'top: 4px; padding-left: 5px;'})}).append($('<span/>',{'class':'collapse-btn','html':'Show Advanced'}))).append($('<button/>',{'class':'btn btn-primary','type':'button','text':btn,'click':onClose})).append($('<button/>',{'class':'btn btn-default','type':'button','text':'Cancel','data-dismiss':'modal'}))))).on('hidden.bs.modal',function(){$('#'+id).remove()}).on('show.bs.collapse',function(){$(this).find('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');$(this).find('.collapse-btn').html('Hide Advanced')}).on('hide.bs.collapse',function(){$(this).find('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');$(this).find('.collapse-btn').html('Show Advanced')})};helpers.getInputGroup=function(id,type,title,placeholder,value,toolTip,disabled){return $('<div/>',{'class':'form-group'}).append($('<lable/>',{'html':$('<b/>',{'text':title})})).append($('<input/>',{'id':id,'type':type,'class':'form-control','style':'margin-top: 5px;','data-toggle':'tooltip','title':toolTip,'data-str':type,'placeholder':placeholder,'value':(value===undefined?'':(value+''))}).prop('disabled',(disabled===undefined?!1:disabled)))};helpers.getTextAreaGroup=function(id,type,title,placeholder,value,toolTip,unlimited){return $('<div/>',{'class':'form-group'}).append($('<lable/>',{'html':$('<b/>',{'text':title})})).append($('<textarea/>',{'id':id,'type':type,'maxlength':(unlimited?Number.MAX_SAFE_INTEGER:480),'class':'form-control','style':'margin-top: 5px;','rows':'2','data-toggle':'tooltip','title':toolTip,'data-str':type,'placeholder':placeholder,'text':(value===undefined?'':(value+''))}))};helpers.getDropdownGroup=function(id,title,def,options,toolTip){return $('<div/>',{'class':'form-group'}).append($('<lable/>',{'html':$('<b/>',{'text':title})})).append($('<div/>',{'class':'dropdown','data-toggle':'tooltip','title':toolTip}).append($('<select/>',{'class':'form-control','id':id,'text':def,'style':'width: 100%; cursor: pointer;','data-toggle':'dropdown'}).append($('<option/>',{'html':def,'selected':'true','disabled':'true','hidden':'true'})).append(options.map(function(option){return $('<option/>',{'html':option})}))))};helpers.getCheckBox=function(id,value,text,tooltip){return $('<div/>',{'class':'checkbox','style':'margin-top: 0px; !important'}).append($('<label/>',{'style':'margin-right: 10px;','data-toggle':'tooltip','title':tooltip}).append($('<input/>',{'type':'checkbox','id':id,'style':'cursor: pointer;'}).prop('checked',value)).append(text))};helpers.getCollapsibleAccordion=function(id,title,body){return $('<div/>',{'class':'panel panel-default'}).append($('<div/>',{'class':'panel-heading'}).append($('<h4/>',{'class':'panel-title'}).append($('<a/>',{'data-toggle':'collapse','data-parent':'#accordion','text':title,'href':'#'+id})))).append($('<div/>',{'class':'panel-collapse collapse'+(id.endsWith('1')?' in':''),'id':id}).append($('<div/>',{'class':'panel-body','html':body})))};helpers.getRandomString=function(len){let randStr='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',str='';for(let i=0;i<len;i++){str+=randStr.charAt(Math.floor(Math.random()*randStr.length))}
return str};helpers.setInterval=function(func,interval){timers.push(setInterval(func,interval))};helpers.setTimeout=function(func,timeout){timers.push(setTimeout(func,timeout))};helpers.clearTimers=function(){for(let i=0;i<timers.length;i++){clearInterval(timers[i])}};helpers.getModuleStatus=function(id,toggle){if(toggle==='false'){$('#'+id+'Toggle').prop('checked',!1);$('#'+id).slideUp(helpers.DELAY_MS)}else{$('#'+id+'Toggle').prop('checked',!0);$('#'+id).slideDown(helpers.DELAY_MS)}
return toggle==='true'};helpers.getGroupIdByName=function(name,asString){switch(name.toLowerCase()){case 'casters':case 'caster':return(asString?'0':0);case 'administrators':case 'administrator':return(asString?'1':1);case 'moderators':case 'moderator':return(asString?'2':2);case 'subscribers':case 'subscriber':return(asString?'3':3);case 'donators':case 'donator':return(asString?'4':4);case 'hosters':case 'hoster':return(asString?'5':5);case 'regulars':case 'regular':return(asString?'6':6);default:return(asString?'7':7)}};helpers.getGroupNameById=function(id){switch(id.toString()){case '0':return'Caster';case '1':return'Administrators';case '2':return'Moderators';case '3':return'Subscribers';case '4':return'Donators';case '5':return'Hosters';case '6':return'Regulars';default:return'Viewers'}};helpers.log=function(message,force){if(helpers.DEBUG_STATE===1||force){console.log('%c[PhantomBot Debug]','color: #6441a5; font-weight: 900;',message)}};helpers.logError=function(message,force){if(helpers.DEBUG_STATE===1||force){console.log('%c[PhantomBot Error]','color: red; font-weight: 900;',message)}};helpers.getEpochFromDate=function(date){let parsedDate=Date.parse(date),now=Date.now();if(isNaN(parsedDate)){let matcher=date.match(/((\d{1,2})(\\|\/|\.)(\d{1,2})(\\|\/|\.)(\d{2,4}))/);if(matcher!==null){parsedDate=Date.parse(matcher[4]+'.'+matcher[2]+'.'+matcher[6]);if(isNaN(parsedDate)){helpers.logError('Failed to parse date from "'+date+'". Returning current date.',!0);parsedDate=now}}else{helpers.logError('Failed to parse date from "'+date+'". Returning current date.',!0);parsedDate=now}}
return parsedDate};window.helpers=helpers})