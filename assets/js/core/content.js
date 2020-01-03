const elementsFormSarankanDesa = ["inputNamaDesa", "inputAlamatDesa", "inputNoHp", "inputKeterangan"];
const elementsFormDaftarVolunteer = ["inputNamaLengkap", "inputNoKTP", "inputBidang", "inputNoHpVolunteer", "inputMotivasi"];
const elementsFormDonatur = ["inputNamaDonatur", "inputPilihanBank", "inputNominal"];

const placeholderErrorText = ["Fitur hanya tersedia di Line Browser!",
						"Terjadi Kesalahan Pengiriman",
						"Form tidak boleh kosong"];
let temp_dummyID = 0 //ID desa yang dipilih
let mode = 0
/*
Penjelasan Mode :
-----------> 0 default landing page
-----------> 1 tampilan form sarankan desa
-----------> 2 tampilan form identitas diri volunteer + donasi
*/

function showLandingPage() {
	if (mode != 0) {
		if (mode == 1) {
			document.getElementById('switchFormSarankanDesa').style.display = "none";
		} else if (mode == 2) {
			domSwitcherVolunteerDonatur("none")	
		}

		domSwitcherLandingPage("block")
		

		mode = 0;
	}
}

function showSarankanDesa() {
	//check mode 

	if (mode != 1) {
		if (mode == 0) {
			domSwitcherLandingPage("none")
		} else if (mode == 2) {
			domSwitcherVolunteerDonatur("none")
		}
		//tampilkan form pengisian desa
			document.getElementById('switchFormSarankanDesa').style.display = "block";

		mode = 1;
	}

	 $(".collapse").collapse('hide');
}

function showVolunteerDonatur(id) {
	//only works on mode 0
	if (mode == 0) {
		domSwitcherLandingPage("none")
	}

	domSwitcherVolunteerDonatur("block")

	temp_dummyID = id;

	mode = 2;

}

function domSwitcherLandingPage(args){
	document.getElementById('pageHeader').style.display = args;
	if (args != "none") {
		document.getElementById('cardList').style.display = "flex";
	} else {
		document.getElementById('cardList').style.display = args;
	}
}

function domSwitcherVolunteerDonatur(args) {
	document.getElementById('switchFormVolunteerDonatur').style.display = args;
	document.getElementById('navIconVolunteer').style.display = args;
	document.getElementById('navIconDonatur').style.display = args;
	document.getElementById('formDaftarVolunteer').style.display = args;
	document.getElementById('formDaftarDonatur').style.display = args;
}


function errorMessage(args) {
	Swal.fire({
  		icon: 'error',
  		title: 'Oops...',
  		text: placeholderErrorText[args],
	})
}


function validationForm (idForm) {
	let isValid = true;

	var form = document.getElementById(idForm);
  		for(var i=0; i < form.elements.length-1; i++){ 

  			if (form.elements[i].value == '') {
  				errorMessage(2);
        		isValid = false;
        		break;
  			}	
    	}

	return isValid;
}


function getterPayload(elementsForm) {
	let temp_payload = ""

	for (var i=0; i < elementsForm.length; i++) {
		temp_payload += document.getElementById(elementsForm[i]).value + "#"
	}

	return temp_payload;
}


function sendMessage(payload) {
	liff.sendMessages([{
                'type': 'text',
                'text': payload
            }]).then(function() {
                liff.closeWindow();
            }).catch(function(error) {
                errorMessage(1)
            });
}


$(document).ready(function() {
	document.getElementById("btnSarankanDesa").addEventListener("click", function(event){
  		event.preventDefault()

  		isValid = validationForm('formSarankanDesa');
  		let payload = ""

    	if (isValid) {
    		payload = getterPayload(elementsFormSarankanDesa)

    		if (!liff.isInClient()) {
    			errorMessage(0);
    		} else {
    			sendMessage(payload)
    		}
    	} 

	});

	document.getElementById("btnDaftarVolunteer").addEventListener("click", function(event){
  		event.preventDefault()

  		isValid = validationForm('formDaftarVolunteer');
  		let payload = ""

    	if (isValid) {
    		payload += temp_dummyID.toString()
    		payload += "#"
    		payload += getterPayload(elementsFormDaftarVolunteer)

    		if (!liff.isInClient()) {
    			errorMessage(0);
    		} else {
    			sendMessage(payload)
    		}
    	} 

	});


	document.getElementById("btnDaftarDonatur").addEventListener("click", function(event){
  		event.preventDefault()

  		isValid = validationForm('formDaftarDonatur');
  		let payload = ""

    	if (isValid) {
    		payload += temp_dummyID.toString()
    		payload += "#"
    		payload += getterPayload(elementsFormDonatur)

    		if (!liff.isInClient()) {
    			errorMessage(0);
    		} else {
    			sendMessage(payload)
    		}
    	} 

	});


});