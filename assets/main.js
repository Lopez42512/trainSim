// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCr7ST-nw-HX01lszaC75UJPLrZKw7DYI",
    authDomain: "soul-train-cf7c8.firebaseapp.com",
    databaseURL: "https://soul-train-cf7c8.firebaseio.com",
    projectId: "soul-train-cf7c8",
    storageBucket: "soul-train-cf7c8.appspot.com",
    messagingSenderId: "1049539551411"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#add-train-btn").on("click", function () {
    event.preventDefault();

    // Grabs user input
    var tName = $("#train-name-input").val().trim();
    var tDest = $("#destination-input").val().trim();
    var firstTime = $("#first-input").val().trim();
    var tFrequency = $("#frequnecy-input").val();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: tName,
        dest: tDest,
        freq: tFrequency,
        time: firstTime
        // next: trainNext,
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.fTime);
    console.log(newTrain.freq);


    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequnecy-input").val("");
});

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable.
    var tName = snapshot.val().name;
    var tDest = snapshot.val().dest;
    var tfreq = snapshot.val().freq;
    var tFirstTime = snapshot.val().time;
    var tNext = "next";
    var minUntilNext = "minute";

    var firstTimeConverted = moment(tFirstTime, "HH:mm");
    console.log(firstTimeConverted);
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes")
    console.log(timeDiff);
    var timeRemainder = timeDiff % tfreq;
    console.log(timeRemainder);
    var timeNextTrain = tfreq - timeRemainder;
    console.log(timeNextTrain);
    var trainNext = moment().add(timeNextTrain, "minutes").format("HH:mm");

    // train Info
    console.log(tName);
    console.log(tDest);
    console.log(tfreq);
    console.log(tFirstTime);
    console.log(trainNext);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDest),
        $("<td>").text(tfreq),
        $("<td>").text(trainNext),
        $("<td>").text(timeNextTrain),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});
