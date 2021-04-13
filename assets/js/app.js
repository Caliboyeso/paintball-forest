// This assures the DOM has been loaded before running the JS code
$(document).ready(function() {

    // Global Variables, Arrays, Objects
    // =============================================
    // This object stores the Firebase configuration
    var config = {
        apiKey: "AIzaSyBy4F9YMQ6ik35lJYgeyfxMx5ftlFefK3s",
        authDomain: "paintball-forest-8c59e.firebaseapp.com",
        databaseURL: "https://paintball-forest-8c59e-default-rtdb.firebaseio.com",
        storageBucket: "paintball-forest-8c59e.appspot.com",
    };

    // Initialize Firebase
    firebase.initializeApp(config);
      
    // This variable stores the Firebase database
    var firebaseDB = firebase.database();


    // Events
    // =============================================
    // Event #1
    // This onclick event handles when the user clicks on the submit button
    $("#reservation-btn").on("click", function(e) {
        // This method prevents the form from submitting
        e.preventDefault();
        
        // This variable stores the name of the party
        var partyName = $("#name-input").val().trim();
        // This variable stores the number of players
        var numPlayers = $("#players-input").val().trim();
        // This variable stores the number of rentals
        var numRentals = $("#rentals-input").val().trim();
        // This variable stores the user email
        var partyEmail = $("#email-input").val().trim();
        // This variable stores the date of the party
        var partyDate = $("#date-input").val().trim();

        // A if statement if a input field is left empty
        if (partyName == "" || numPlayers == "" || numRentals == "" || partyEmail == "" || partyDate == "") {
            alert("Please complete all the fields!");
            return false;
        }
        
        // This object stores the users input
        var newReservation = {
            name: partyName,
            players: numPlayers,
            rentals: numRentals,
            email: partyEmail,
            date: partyDate
        };
        
        // Adding the users data to Firebase
        firebaseDB.ref().push(newReservation);
        
        // Alerting the user that there reservation has been placed
        alert("Thank you " + partyName + "! Your reservation has been placed.");
        
        // Clearing the name input field
        $("#name-input").val("");
        // Clearing the players input field
        $("#players-input").val("");
        // Clearing the rentals input field
        $("#rentals-input").val("");
        // Clearing the email input field
        $("#email-input").val("");
        // Clearing the date input field
        $("#date-input").val("");
    
    });
    
    // Event #2
    // This event handles rendering the user data to the page
    firebaseDB.ref().on("child_added", function(child, prevChild) {
        // This varibale stores the users party name
        var dName = child.val().name;
        // This variable stores the number of players
        var dPlayers = child.val().players;
        // This variable stores the number of rentals
        var dRentals = child.val().rentals;
        // This variable stores the users email
        var dEmail = child.val().email;
        // This variable stores the party date
        var dDate = child.val().date;
        
        // Targeting the <reservation-table> tag to append the users data in a row
        $("#reservation-table > tbody").append(
            $("<tr>").append(
                $("<td>").text(dName),
                $("<td>").text(dPlayers),
                $("<td>").text(dRentals),
                $("<td>").text(dDate)
            )
        );
    });

});