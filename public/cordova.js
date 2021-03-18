window.addEventListener("load", () => {
    let event = document.createEvent("HTMLEvents");
    event.initEvent("deviceready", true, true);
    event.eventName = "deviceready";
    document.dispatchEvent(event);
});

const StatusBar = {
    hide: () => {
        console.log("Cordova убирает панель состояния");
    }
}