$(run=function(){socket.getDBTableValues('permissions_get_group','group',function(results){let tableData=[];for(let i=0;i<results.length;i++){if(results[i].value==='7'){continue}
tableData.push([results[i].key,helpers.getGroupNameById(results[i].value),$('<div/>',{'class':'btn-group'}).append($('<button/>',{'type':'button','class':'btn btn-xs btn-danger','style':'float: right','data-toggle':'tooltip','title':'This will reset the user\'s permission back to viewer. Viewers aren\'t shown in this list','data-username':results[i].key,'html':$('<i/>',{'class':'fa fa-trash'})})).append($('<button/>',{'type':'button','class':'btn btn-xs btn-warning','style':'float: right','data-username':results[i].key,'html':$('<i/>',{'class':'fa fa-edit'})})).html()])}
if($.fn.DataTable.isDataTable('#permissionsTable')){$('#permissionsTable').DataTable().destroy();$('#permissionsTable').off()}
let table=$('#permissionsTable').DataTable({'searching':!0,'autoWidth':!1,'lengthChange':!1,'data':tableData,'columnDefs':[{'className':'default-table','orderable':!1,'targets':2},{'width':'45%','targets':0}],'columns':[{'title':'User'},{'title':'Permission'},{'title':'Actions'}]});table.on('click','.btn-danger',function(){let username=$(this).data('username'),row=$(this).parents('tr'),t=$(this);socket.removeDBValue('permission_remove','group',username,function(){socket.sendCommand('permission_remove_cmd','permissionsetuser '+username+' 7',function(){t.tooltip('hide');table.row(row).remove().draw(!1);toastr.success('Successfully reset permission for user '+username)})})});table.on('click','.btn-warning',function(){let username=$(this).data('username'),t=$(this);socket.getDBValue('permission_user_get','group',username,function(e){helpers.getModal('edit-user-perm','Edit User Permission','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('user-name','text','Username','',username,'Name of the user. This cannot be edited.',!0)).append(helpers.getDropdownGroup('user-permission','Permission',helpers.getGroupNameById(e.group),['Caster','Administrators','Moderators','Subscribers','Donators','Hosters','Regulars'])),function(){let group=helpers.getGroupIdByName($('#user-permission').find(':selected').text());socket.updateDBValue('permission_user_update','group',username,group,function(){socket.sendCommand('permission_edit_cmd','permissionsetuser '+username+' '+group,function(){t.parents('tr').find('td:eq(1)').text($('#user-permission').find(':selected').text());$('#edit-user-perm').modal('hide');toastr.success('Successfully updated permissions for user '+username)})})}).modal('toggle')})})})});$(function(){$('#add-permissions-button').on('click',function(){helpers.getModal('add-user-perm','Set User Permission','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('user-name','text','Username','PhantomBot','','Name of the user to set the permissions on.')).append(helpers.getDropdownGroup('user-permission','Permission','Regulars',['Caster','Administrators','Moderators','Subscribers','Donators','Hosters','Regulars'])),function(){let group=helpers.getGroupIdByName($('#user-permission').find(':selected').text()),username=$('#user-name');switch(!1){case helpers.handleInputString(username):break;default:socket.updateDBValue('permission_user_add','group',username.val().toLowerCase(),group,function(){socket.sendCommand('permission_add_cmd','permissionsetuser '+username.val().toLowerCase()+' '+group,function(){run();$('#add-user-perm').modal('hide');toastr.success('Successfully added permissions for user '+username.val())})})}}).modal('toggle')});window.location.hash='#'})