  // Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8cDoqPSRpYJayRtlk00qBoD99TyIMOG8",
    authDomain: "trainscheduler-b7faa.firebaseapp.com",
    databaseURL: "https://trainscheduler-b7faa.firebaseio.com",
    projectId: "trainscheduler-b7faa",
    storageBucket: "trainscheduler-b7faa.appspot.com",
    messagingSenderId: "1073417181371"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  };

  database.ref().push(newTrain);

  // console.log(newTrain.trainName);
  //   console.log(newTrain.destination);
  //     console.log(newTrain.trainTime);
  //       console.log(newTrain.frequency);

  alert("added new train")

  $("#trainName").val('');
    $("#destination").val('');
      $("#trainTime").val('');
        $("#frequency").val('');

});

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(trainTime);
    // console.log(frequency);

  var newTrainConverted = moment(trainTime, "hh:mm").subtract(1, "minutes");
  console.log(newTrainConverted);

  var diffTime = moment().diff(moment(newTrainConverted), "minutes");
  console.log(diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log(tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log(nextTrain);

 $("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>"); 
  })
 