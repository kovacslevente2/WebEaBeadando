function bigLoop(){
    if (typeof(Worker) !== "undefined") {
        var worker = new Worker('bigLoop.js');
        worker.onmessage = function (event) {
            alert("Lefutott " + event.data + " ismétlés" );
        };
    } else {
        alert("Sorry, your browser does not support Web Workers..." );
    }
}
function sayHello(){
    alert("Sziaaa" );
}

function serversent() {
if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("server.php");
    source.onmessage = function(event) {
        document.getElementById("result").innerHTML += event.data + "<br>";
    };
} else
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}

//Geolocation API
var x = document.getElementById("demo");
		function getLocation()  {
			if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(showPosition);
			else 
				x.innerHTML = "Geolocation is not supported by this browser.";
		}
		function showPosition(position)  {
			x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	
		}


        // Drag and Drop API 
const draggable = document.getElementById("draggable");
const dropzone = document.getElementById("dropzone");

draggable.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.id);
});

dropzone.addEventListener("dragover", (event) => {
    event.preventDefault(); 
});

dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    dropzone.appendChild(draggedElement);
    dropzone.style.border = "2px solid green";
    dropzone.innerHTML = "Sikeresen ide dobtad!";
});


// Canvas rajzolás példa
function drawCanvas() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Téglalap rajzolása
    ctx.fillStyle = "blue";
    ctx.fillRect(30, 30, 90, 60);

    // Kör rajzolása
    ctx.beginPath();
    ctx.arc(150, 75, 30, 0, 2 * Math.PI); 
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}