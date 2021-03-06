window.onload = function() {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server
 
    // DO NOT CHANGE THIS
    let myLiffId = "";
 
    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                //document.getElementById("liffAppContent").classList.add('hidden');
                //document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};
 
/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (myLiffId) {
        initializeLiff(myLiffId);
    }
}
 
/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            // document.getElementById("liffAppContent").classList.add('hidden');
            // document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}
 
/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {

        liff.getProfile().then(profile => {
            document.getElementById("profile-img-placeholder").src = profile.pictureUrl
        }).catch((err) => {
            console.log('error', err);
        });


    } else {
        liff.login()
    }
}


function logout() {
    console.log("Logout clicked");

    console.log("islogin = " + liff.isLoggedIn())
    console.log("isInClient = " + liff.isInClient())

    if (!liff.isInClient()) {
        liff.logout()
        window.location.reload();
    } else {
         liff.logout();
         liff.closeWindow();
    }

}


$(document).ready(function() {
    document.getElementById('logoutLink').addEventListener('click', function() {
        if (!liff.isInClient()) {
            liff.logout()
            window.location.reload();
        } else {
            liff.closeWindow();
        }
    });
});



 
