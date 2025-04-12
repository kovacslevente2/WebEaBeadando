// Alap jármű osztály
class Vehicle {
    constructor(licensePlate, brand) {
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.parkingSpot = null;
    }

    park(parkingSpot) {
        this.parkingSpot = parkingSpot;
        this.updateDisplay();
    }

    leave() {
        this.parkingSpot = null;
        this.updateDisplay();
    }

    updateDisplay() {
        const vehicleInfo = document.getElementById('vehicleInfo');
        vehicleInfo.innerHTML = `
            <h3>Jármű Információ</h3>
            <p>Rendszám: ${this.licensePlate}</p>
            <p>Márka: ${this.brand}</p>
            <p>Típus: ${this.constructor.name}</p>
            <p>Parkolóhely: ${this.parkingSpot ? this.parkingSpot.id : 'Nincs parkolva'}</p>
        `;
    }
}

// Személyautó osztály
class Car extends Vehicle {
    constructor(licensePlate, brand) {
        super(licensePlate, brand);
        this.type = 'car';
    }

    createElement() {
        const element = document.createElement('div');
        element.className = 'parking-spot';
        element.style.backgroundColor = '#a8d5e2';
        element.innerHTML = '🚗';
        return element;
    }
}

// Teherautó osztály
class Truck extends Vehicle {
    constructor(licensePlate, brand) {
        super(licensePlate, brand);
        this.type = 'truck';
    }

    createElement() {
        const element = document.createElement('div');
        element.className = 'parking-spot';
        element.style.backgroundColor = '#e2a8a8';
        element.innerHTML = '🚛';
        return element;
    }
}

// Motorkerékpár osztály
class Motorcycle extends Vehicle {
    constructor(licensePlate, brand) {
        super(licensePlate, brand);
        this.type = 'motorcycle';
    }

    createElement() {
        const element = document.createElement('div');
        element.className = 'parking-spot';
        element.style.backgroundColor = '#a8e2b8';
        element.innerHTML = '🏍️';
        return element;
    }
}

// Parkoló osztály
class ParkingLot {
    constructor(capacity) {
        this.capacity = capacity;
        this.spots = new Array(capacity).fill(null);
        this.vehicles = [];
        this.initializeParkingLot();
    }

    initializeParkingLot() {
        const parkingLot = document.getElementById('parkingLot');
        parkingLot.innerHTML = '';
        
        for (let i = 0; i < this.capacity; i++) {
            const spot = document.createElement('div');
            spot.className = 'parking-spot';
            spot.id = `spot-${i}`;
            spot.onclick = () => this.handleSpotClick(i);
            parkingLot.appendChild(spot);
        }
    }

    addVehicle(vehicle) {
        if (this.vehicles.length >= this.capacity) {
            alert('A parkoló tele van!');
            return;
        }

        const emptySpot = this.spots.findIndex(spot => spot === null);
        if (emptySpot !== -1) {
            this.vehicles.push(vehicle);
            this.spots[emptySpot] = vehicle;
            vehicle.park(`spot-${emptySpot}`);
            this.updateDisplay();
        }
    }

    removeVehicle(spotIndex) {
        const vehicle = this.spots[spotIndex];
        if (vehicle) {
            vehicle.leave();
            this.spots[spotIndex] = null;
            this.vehicles = this.vehicles.filter(v => v !== vehicle);
            this.updateDisplay();
        }
    }

    handleSpotClick(spotIndex) {
        if (this.spots[spotIndex]) {
            this.removeVehicle(spotIndex);
        }
    }

    updateDisplay() {
        const parkingLot = document.getElementById('parkingLot');
        parkingLot.innerHTML = '';
        
        this.spots.forEach((vehicle, index) => {
            const spot = document.createElement('div');
            spot.className = 'parking-spot';
            spot.id = `spot-${index}`;
            spot.onclick = () => this.handleSpotClick(index);
            
            if (vehicle) {
                const vehicleElement = vehicle.createElement();
                spot.appendChild(vehicleElement);
            }
            
            parkingLot.appendChild(spot);
        });
    }
}

// Globális változók
const parkingLot = new ParkingLot(10);

// Jármű hozzáadása
function addVehicle() {
    const type = document.getElementById('vehicleType').value;
    const licensePlate = document.getElementById('licensePlate').value;
    const brand = document.getElementById('brand').value;

    if (!licensePlate || !brand) {
        alert('Kérjük, töltse ki az összes mezőt!');
        return;
    }

    let vehicle;
    switch (type) {
        case 'car':
            vehicle = new Car(licensePlate, brand);
            break;
        case 'truck':
            vehicle = new Truck(licensePlate, brand);
            break;
        case 'motorcycle':
            vehicle = new Motorcycle(licensePlate, brand);
            break;
    }

    parkingLot.addVehicle(vehicle);
    
    // Mezők törlése
    document.getElementById('licensePlate').value = '';
    document.getElementById('brand').value = '';
}
