
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.greeting == "activate"){
        chrome.alarms.create("myAlarm", { periodInMinutes: 30});
        sendResponse({farewell: "Activado"});
        chrome.alarms.onAlarm.addListener(listenerAlarm);
        console.log("activo");
    }else{
        chrome.alarms.clear("myAlarm");
        sendResponse({farewell: "Desactivado"});
        console.log("desactivo");
    }

});


function listenerAlarm (alarm) {
            var project = [];
            project = JSON.parse(window.localStorage.getItem('projects'));
            console.log(project);
            var noti = false;
            project.forEach(function (element, index, array) {
                if (element.run) {
                    noti=true;
                }
            });
            if(noti){
                var notification = new Notification('Task Counter', {
                                        icon: '../icon.png',
                                        body: "You have running tasks! ",
                 });
            }

}