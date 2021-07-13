self.addEventListener('message', function (event) {
  setTimeout(function () {
    self.registration.showNotification("Hi there!", {
      body: 'test'
    })
  }, 10000);
});