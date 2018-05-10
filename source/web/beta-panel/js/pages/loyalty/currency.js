$(run=function(){socket.getDBValue('get_points_module_status','modules','./systems/pointSystem.js',function(e){socket.getDBTableValuesByOrder('points_top_get_order','points',100,0,'DESC',!0,function(results){let tableData=[];for(let i=0;i<results.length;i++){tableData.push([(i+1),results[i].key,results[i].value])}
if($.fn.DataTable.isDataTable('#currencyTop')){$('#currencyTop').DataTable().destroy();$('#currencyTop').off()}
$('#currencyTop').DataTable({'searching':!0,'autoWidth':!1,'lengthChange':!1,'data':tableData,'pageLength':15,'columnDefs':[{'width':'15%','targets':0}],'columns':[{'title':'Position'},{'title':'Username'},{'title':'Currency'}]});$('#currency-top-title').html('Top 100 Currency')});socket.getDBValues('get_points_settings',{tables:['pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','settings'],keys:['onlineGain','offlineGain','onlinePayoutInterval','offlinePayoutInterval','activeBonus','pointNameSingle','pointNameMultiple','pointsMessage','topListAmountPoints']},!0,function(e){$('#points-message').val(e.pointsMessage);$('#points-name-single').val(e.pointNameSingle);$('#points-name-multiple').val(e.pointNameMultiple);$('#points-interval-online').val(e.onlineGain);$('#points-interval-offline').val(e.offlineGain);$('#points-payout-online').val(e.onlinePayoutInterval);$('#points-payout-offline').val(e.offlinePayoutInterval);$('#points-active').val(e.activeBonus);$('#points-top').val(e.topListAmountPoints)});socket.getDBTableValues('get_points_online_group_payout','grouppoints',function(results){for(let i=0;i<results.length;i++){$('#points-payout-'+results[i].key.toLowerCase()+'-on').val(results[i].value)}});socket.getDBTableValues('get_points_offline_group_payout','grouppointsoffline',function(results){for(let i=0;i<results.length;i++){$('#points-payout-'+results[i].key.toLowerCase()+'-off').val(results[i].value)}})})});$(function(){var currencyOffset=100;$('#currency-load-more').on('click',function(){let table=$('#currencyTop').DataTable(),dataCount=table.rows().count(),tableData=[];if(currencyOffset===dataCount){toastr.success('Loading more users into the table.');socket.getDBTableValuesByOrder('points_top_get_order_btn','points',100,(currencyOffset+100),'DESC',!0,function(results){for(let i=0;i<results.length;i++){tableData.push([(++currencyOffset),results[i].key,results[i].value])}
table.rows.add(tableData).draw(!1);$('#currency-top-title').html('Top '+helpers.parseNumber(currencyOffset)+' Currency')})}else{toastr.error('Cannot load more points since there are currently some being loaded.')}});$('#points-get-user').on('click',function(){let username=$('#points-username').val().toLowerCase();if(username.length>0){socket.getDBValue('points_get_user_total','points',username,function(e){$('#points-username-points').val((e.points===null?'0':e.points))})}});$('#points-save-user').on('click',function(){let username=$('#points-username'),points=$('#points-username-points');switch(!1){case helpers.handleInputString(username):case helpers.handleInputNumber(points):break;default:socket.updateDBValue('points_update_user','points',username.val().toLowerCase(),points.val(),function(){toastr.success('Successfully updated user points!');username.val('');points.val('')})}});$('#points-panalty-btn').on('click',function(){let username=$('#points-panalty-user'),time=$('#points-panalty-time');switch(!1){case helpers.handleInputString(username):case helpers.handleInputNumber(time):break;default:socket.sendCommand('set_penalty_user','penalty '+username.val().toLowerCase()+' '+time.val(),function(){toastr.success('Successfully set penalty on user!');username.val('');time.val('')})}});$('#points-bonus-btn').on('click',function(){let amount=$('#points-bonus-amount'),time=$('#points-bonus-time');switch(!1){case helpers.handleInputNumber(amount):case helpers.handleInputNumber(time):break;default:socket.sendCommand('set_bonus_all','pointsbonuspanel '+amount.val()+' '+time.val(),function(){toastr.success('Successfully set the points bonus!');amount.val('');time.val('')})}});$('#points-makeitrain-btn').on('click',function(){let amount=$('#points-bonus-amount');switch(!1){case helpers.handleInputNumber(amount):break;default:socket.sendCommand('main_it_rain_all','makeitrain '+amount.val(),function(){toastr.success('Successfully made it rain!');amount.val('')})}});$('#points-giveall-btn').on('click',function(){let amount=$('#points-bonus-amount');switch(!1){case helpers.handleInputNumber(amount):break;default:socket.sendCommand('set_give_all','pointsallpanel '+amount.val(),function(){toastr.success('Successfully gave everyone points!');amount.val('')})}});$('#points-takeall-btn').on('click',function(){let amount=$('#points-bonus-amount');switch(!1){case helpers.handleInputNumber(amount):break;default:socket.sendCommand('set_give_all','pointstakepanel '+amount.val(),function(){toastr.success('Successfully took points from everyone!');amount.val('')})}});$('#currency-reload').on('click',function(){run();toastr.success('Successfully updated the top 100 table.')});$('#points-save-all').on('click',function(){if($('#main-settings').hasClass('active')){let pointsMessage=$('#points-message'),pointsSingle=$('#points-name-single'),pointsMultiple=$('#points-name-multiple'),pointsOnlineInt=$('#points-interval-online'),pointsOfflineInt=$('#points-interval-offline'),pointsOnlinePay=$('#points-payout-online'),pointsOfflinePay=$('#points-payout-offline'),pointsActive=$('#points-active'),topList=$('#points-top');switch(!1){case helpers.handleInputString(pointsMessage):case helpers.handleInputString(pointsSingle):case helpers.handleInputString(pointsMultiple):case helpers.handleInputNumber(pointsOnlineInt):case helpers.handleInputNumber(pointsOfflineInt):case helpers.handleInputNumber(pointsOnlinePay):case helpers.handleInputNumber(pointsOfflinePay):case helpers.handleInputNumber(pointsActive):case helpers.handleInputNumber(topList):break;default:socket.updateDBValues('update_points_settings',{tables:['pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','pointSettings','settings'],keys:['onlineGain','offlineGain','onlinePayoutInterval','offlinePayoutInterval','activeBonus','pointNameSingle','pointNameMultiple','pointsMessage','topListAmountPoints'],values:[pointsOnlinePay.val(),pointsOfflinePay.val(),pointsOnlineInt.val(),pointsOfflineInt.val(),pointsActive.val(),pointsSingle.val(),pointsMultiple.val(),pointsMessage.val(),(parseInt(topList.val())>15?'15':topList.val())]},function(){socket.sendCommand('update_points_settings_cmd','reloadpoints',function(){toastr.success('Successfully updated points settings!')})})}}else{let groups=['caster','administrator','moderator','subscriber','donator','regular','viewer'],temp=[];for(let i=0;i<groups.length;i++){if(!helpers.handleInputString($('#points-payout-'+groups[i]+'-on'))){return}
if(!helpers.handleInputString($('#points-payout-'+groups[i]+'-off'))){return}}
for(let i=0;i<groups.length;i++){temp.push($('#points-payout-'+groups[i]+'-on').val())}
socket.updateDBValues('update_group_payout_online',{tables:['grouppoints','grouppoints','grouppoints','grouppoints','grouppoints','grouppoints','grouppoints'],keys:['Caster','Administrator','Moderator','Subscriber','Donator','Regular','Viewer'],values:temp},function(){temp=[];for(let i=0;i<groups.length;i++){temp.push($('#points-payout-'+groups[i]+'-off').val())}
socket.updateDBValues('update_group_payout_offline',{tables:['grouppointsoffline','grouppointsoffline','grouppointsoffline','grouppointsoffline','grouppointsoffline','grouppointsoffline','grouppointsoffline'],keys:['Caster','Administrator','Moderator','Subscriber','Donator','Regular','Viewer'],values:temp},function(){toastr.success('Successfully updated advanced points settings!')})})}});window.location.hash='#'})