angular.module('angularFileUpload.filter', ['angularFileUpload'])
.factory("filterFactory",function(FileUploader,dialog){
//文件上传过滤器（公共）
	var filterFactory = {
		sizeFilter:function(){
			return {
		        name: 'sizeFilter',
		        fn: function(item /*{File|FileLikeObject}*/, options) { 
		        	return item.size/1024 < 2000; }
			};
		},
		checkSize: function(name,messageConfig){
			if( name == "sizeFilter" ) {
	        	messageConfig.content = "添加文件失败，文件大小不可超过2M！";
	        	dialog.openDialog(messageConfig);
	        }
		},

		filesCountFilter:function(){
			return{
		        name: 'filesCountFilter',
		        fn: function(item /*{File|FileLikeObject}*/, options) {
		            return this.queue.length < 3;
		        }
		    }
		},
		checkFilesCount:function(name,messageConfig){
	        if( name == "filesCountFilter" ) {
	        	messageConfig.content = "最多添加3个文件";
	        	dialog.openDialog(messageConfig);
	        };
		},
		
		imageFilter:function(){
			return{
		    	name:'imageFilter',
		    	fn: function(item /*{File|FileLikeObject}*/, options) {
		             var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
		             return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		        }
		    }
		},
		checkImage:function(name,messageConfig){
			if(name == "imageFilter"){
		        messageConfig.content = "请选择图片类型文件！";
		        dialog.openDialog(messageConfig);
	        }
		}

	}
	return filterFactory;
});