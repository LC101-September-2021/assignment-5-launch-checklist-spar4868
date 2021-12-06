window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const missionTargetElement = document.getElementById("missionTarget");
         const missionDestination = getRandomInt(0,6);
         missionTargetElement.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[missionDestination].name}</li>
            <li>Diameter: ${json[missionDestination].diameter}</li>
            <li>Star: ${json[missionDestination].star}</li>
            <li>Distance from Earth: ${json[missionDestination].distance}</li>
            <li>Number of Moons: ${json[missionDestination].moons}</li>
         </ol>
         <img src="${json[missionDestination].image}">
         `;
      });
   });

   function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min) + min);
   }

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameIn = document.querySelector("input[name=pilotName]");
      let copilotNameIn = document.querySelector("input[name=copilotName]");
      let fuelAmountIn = document.querySelector("input[name=fuelLevel]");
      let cargoMassIn = document.querySelector("input[name=cargoMass]");
      console.log(pilotNameIn.value);

      if ((pilotNameIn.value === "") || (copilotNameIn.value === "") || (fuelAmountIn.value === "") || (cargoMassIn.value === "")) {
         alert("Please enter all information");
         event.preventDefault();
      }
      else if (isNaN(pilotNameIn.value) === false || isNaN(copilotNameIn.value) === false) {
         alert("Please enter valid name for Pilot Name or Co-pilot Name (or both)");
         event.preventDefault();
      }
      else if (isNaN(fuelAmountIn.value) === true || isNaN(cargoMassIn.value) === true) {
         alert("Please enter valid number for Fuel Level or Cargo Mass (or both)");
         event.preventDefault();
      }
      else {
         document.getElementById("pilotStatus").innerHTML = "Pilot " + pilotNameIn.value + " Ready";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilotNameIn.value + " Ready";
         if (fuelAmountIn.value <= 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         }
         else {
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         }
         if (cargoMassIn.value >= 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
         }
         else {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
         }
         if (fuelAmountIn.value >= 10000 && cargoMassIn.value <= 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle Ready for Launch";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
            document.getElementById("faultyItems").style.visibility = "hidden";
         }
         event.preventDefault();
      }
   });
});
