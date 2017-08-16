//bootstrap
importFile('vendors/bootstrap/dist/css/bootstrap.min.css','css');
importFile('vendors/bootstrap-daterangepicker/daterangepicker.css','css');
importFile('vendors/bootstrap-treeview/dist/bootstrap-treeview.min.css','css');
//ECS fonts
importFile('vendors/font-ecs/style.css','css');
//Font-Awesome
importFile('vendors/font-awesome/css/font-awesome.min.css','css');
//Material-deisng-icons
importFile('vendors/mdi/css/materialdesignicons.min.css','css');

//iCheck
importFile('vendors/iCheck/skins/flat/green.css','css');

//dropzone
importFile('vendors/dropzone/dist/min/dropzone.min.css','css');
//DataTables
importFile('vendors/datatables.net-bs/css/dataTables.bootstrap.min.css','css');
importFile('vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css','css');
importFile('vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css','css');
importFile('vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css','css');
importFile('vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css','css');
//nprogress
importFile('vendors/nprogress/nprogress.css','css');
//tree grid
importFile('vendors/jquery-treegrid/css/jquery.treegrid.css','css');
//swiper
importFile('vendors/swiper/dist/css/swiper.min.css','css');
//custom
importFile('css/custom.min.css','css');





function importFile(filename, filetype) {
    var rootPath = '../assets/';
    var fullfilename = rootPath + filename;

    if(filetype == "js") {
        var cssNode = document.createElement('script');
        cssNode.setAttribute("type", "text/javascript");
        cssNode.setAttribute("src", fullfilename);
    } else if(filetype == "css") {
        var cssNode = document.createElement("link");
        cssNode.setAttribute("rel", "stylesheet");
        cssNode.setAttribute("type", "text/css");
        cssNode.setAttribute("href", fullfilename);
    }
    if(typeof cssNode != "undefined")
        document.getElementsByTagName("head")[0].appendChild(cssNode);
}