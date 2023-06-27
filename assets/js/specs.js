document.addEventListener("DOMContentLoaded", LoadMakeList);


function LoadMakeList(){(async () => {
    const result = await getData();
    const data = await result.json();
    // console.log(data);
    
    injectMade(getMake(data))
    // injectModel(data);
})();
}

// --------------------------------------------------


function LoadModelList(){(async () => {
    const result = await getData();
    const data = await result.json();
    // console.log(this.value)
    injectModel(getModel(data))
})();
}

// --------------------------------------------------


function LoadYearList(){(async () => {
    const result = await getData();
    const data = await result.json();
    // console.log(this.value)
    injectYear(getYear(data))
})();
}

function LoadSpecs(){(async () => {
    const result = await getData();
    const data = await result.json();
    // console.log(this.value)
    injectSpecs(getSpecs(data))
})();
}

// --------------------------------------------------


function injectMade(list) {
    // debugger;
    let makeList = document.getElementById("make");
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Make</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    // console.log(optionList);
    makeList.innerHTML=optionList;
    modelList.innerHTML='<option value="" disabled selected hidden>Select Make</option>';
    yearList.innerHTML='<option value="" disabled selected hidden>Select Make</option>';
    makeList.addEventListener( "input", LoadModelList)
}


// --------------------------------------------------



function injectModel(list) {
    // debugger;
    
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Model</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    console.log(optionList);
    modelList.innerHTML=optionList;
    
    yearList.innerHTML='<option value="" disabled selected hidden>Select Model</option>';
    modelList.addEventListener( "input", LoadYearList)
}


// --------------------------------------------------



function injectYear(list) {
    // debugger;
    
    
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Year</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    console.log(optionList);
    yearList.innerHTML=optionList;
    
    
    yearList.addEventListener( "input", LoadSpecs)
}


function injectSpecs(specs) {
    // debugger;
    let category = document.getElementById("category");
    let power = document.getElementById("power");
    let engine = document.getElementById("engine");
    let drive = document.getElementById("drive");
    let gear = document.getElementById("gear");
    let clutch = document.getElementById("clutch");
    let cooling = document.getElementById("cooling");
    let weight = document.getElementById("weight");
    
    category.innerHTML=specs.type?specs.type.split(" ")[0] : "-";
    power.innerHTML=specs.power?`${specs.power.split(" ")[0]} HP` : "-";
    engine.innerHTML=specs.engine?specs.engine.split(",")[0] : "-";

    let driveTemp=specs.transmission?specs.transmission.split(",")[0] : "-"
    drive.innerHTML=driveTemp.split(" ")[0]
    gear.innerHTML=specs.gearbox?specs.gearbox : "-";
    let clutchTemp =specs.clutch?specs.clutch.split(",")[0] : "-";
    clutch.innerHTML=clutchTemp.split(" ")[0]
    cooling.innerHTML=specs.cooling?specs.cooling : "-";
    weight.innerHTML=specs.total_weight?`${specs.total_weight.split(" ")[0]} KG` : "-";
}


// --------------------------------------------------
function getMake(data){
    let makeList=[];    
    for(let item of data){
        if (!makeList.includes(item.make.trim())){
            makeList.push(item.make.trim());
        }
    }
    console.log(makeList);
    return makeList.sort();
}

// --------------------------------------------------


function getModel(data){
    // debugger
    currentMake = document.getElementById("make")
    
    const models = data.filter(item => item.make == currentMake.value);
    console.log( models)

    const modelsList = []
    // debugger
    for (let item of models){
        if (!modelsList.includes(item.model.trim())){
            modelsList.push(item.model.trim());
        }
    }
    console.log(modelsList);
    return modelsList.sort();
}

// --------------------------------------------------

function getYear(data){
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");
    
    
    // debugger
    const models = data.filter(item => item.make.trim() == currentMake.value);
    console.log(models);
    const years = models.filter(item => item.model.trim() == currentmodel.value)
    console.log(years);
    const yearsList = []
    // debugger
    for (let item of years){
        if (!yearsList.includes(item.year.trim())){
            yearsList.push(item.year.trim());
        }
    }
    console.log("this is"+yearsList);
    return yearsList
}


function getSpecs(data){
    // debugger
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");
    let currentyear = document.getElementById("year");

    
    const models = data.filter(item => item.make.trim() == currentMake.value);
    
    const years = models.filter(item => item.model.trim() == currentmodel.value)
    
    const specs = years.filter(item => item.year.trim() == currentyear.value)
    console.log(specs)
    
    return specs[0]
}




// --------------------------------------------------



function getData() {

    let url = "https://mocki.io/v1/17c2c065-e630-4f7a-b1ad-3fa1876a9f6e";
    const options = {
        method: 'GET',
        contentType: 'application/json'
    };

    try {
        const response = fetch(url, options);
        // const result = await response.text();
        return response;
    } catch (error) {
        console.error(error);
    }
}



// [{"id": "01",
//   "make": "Honda",
//     "model": "Hornet 600",
//     "year": "2013",
//     "type": "Naked",
//     "displacement": "599.0 ccm (36.55 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "100.6 HP (73.4  kW)) @ 12000 RPM",
//     "torque": "63.5 Nm (6.5 kgf-m or 46.8 ft.lbs) @ 10500 RPM",
//     "compression": "12.0:1",
//     "bore_stroke": "67.0 x 42.5 mm (2.6 x 1.7 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. PGM-FI",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Computer-controlled digital transistorised with electronic advance ",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "frame": "Steel",
//     "front_suspension": "41mm inverted telescopic fork",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Monoshock damper with 7-step adjustable preload",
//     "rear_wheel_travel": "128 mm (5.0 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. Twin piston caliper.",
//     "rear_brakes": "Single disc. Single-piston calliper and sintered metal pads ",
//     "dry_weight": "172.0 kg (379.2 pounds)",
//     "seat_height": "800 mm (31.5 inches) If adjustable, lowest setting.",
//     "total_height": "1095 mm (43.1 inches)",
//     "total_length": "2090 mm (82.3 inches)",
//     "total_width": "740 mm (29.1 inches)",
//     "ground_clearance": "135 mm (5.3 inches)",
//     "wheelbase": "1435 mm (56.5 inches)",
//     "fuel_capacity": "19.00 litres (5.02 US gallons)",
//     "starter": "Electric"
//   },
//   {
//     "id": "02",
//     "make": "Honda",
//     "model": "Hornet 600",
//     "year": "2007",
//     "type": "Sport",
//     "displacement": "600.0 ccm (36.61 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "100.6 HP (73.4  kW)) @ 12000 RPM",
//     "torque": "64.0 Nm (6.5 kgf-m or 47.2 ft.lbs) @ 10500 RPM",
//     "compression": "12.0:1",
//     "bore_stroke": "67.0 x 42.5 mm (2.6 x 1.7 inches)",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "front_suspension": "Teleskopgabel",
//     "rear_suspension": "Central shock strut swings",
//     "front_tire": "120/70-17 ",
//     "rear_tire": "180/55-17 ",
//     "front_brakes": "Double disc. Double piston brake pliers (CBS ABS opt.)",
//     "rear_brakes": "Single disc. Piston brake pliers (CBS ABS opt.)",
//     "seat_height": "800 mm (31.5 inches) If adjustable, lowest setting.",
//     "total_height": "1095 mm (43.1 inches)",
//     "total_length": "2090 mm (82.3 inches)",
//     "total_width": "740 mm (29.1 inches)",
//     "ground_clearance": "135 mm (5.3 inches)",
//     "wheelbase": "1435 mm (56.5 inches)",
//     "fuel_capacity": "19.00 litres (5.02 US gallons)",
//     "starter": "Electric"
//   },
// {"id": "03",
//     "make": "Honda",
//     "model": "Rebel 1100",
//     "year": "2022",
//     "type": "Cruiser",
//     "displacement": "1084.0 ccm (66.15 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "compression": "10.1:1",
//     "bore_stroke": "92.0 x 81.5 mm (3.6 x 3.2 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. PGM-FI electronic fuel injection. Throttle By Wire.",
//     "fuel_control": "Single Overhead Cams (SOHC)",
//     "ignition": "Full transistorized ignition",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Slipper clutch",
//     "front_suspension": "43mm fork",
//     "front_wheel_travel": "122 mm (4.8 inches)",
//     "rear_suspension": "Dual Showa shocks with 12.5mm shafts, adjustable preload, and piggyback pressurized reservoirs",
//     "rear_wheel_travel": "97 mm (3.8 inches)",
//     "front_tire": "130/70-18 ",
//     "rear_tire": "180/65-16 ",
//     "front_brakes": "Single disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Single-piston caliper. ",
//     "total_weight": "220.9 kg (487.0 pounds)",
//     "seat_height": "690 mm (27.2 inches) If adjustable, lowest setting.",
//     "total_height": "1094 mm (43.1 inches)",
//     "total_length": "2188 mm (86.1 inches)",
//     "total_width": "820 mm (32.3 inches)",
//     "ground_clearance": "136 mm (5.4 inches)",
//     "wheelbase": "1488 mm (58.6 inches)",
//     "fuel_capacity": "13.63 litres (3.60 US gallons)",
//     "starter": "Electric"
//   },
//   {"id": "04",
//     "make": "Honda",
//     "model": "Rebel 1100",
//     "year": "2021",
//     "type": "Cruiser",
//     "displacement": "1084.0 ccm (66.15 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "compression": "10.1:1",
//     "bore_stroke": "92.0 x 81.5 mm (3.6 x 3.2 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. PGM-FI electronic fuel injection. Throttle By Wire.",
//     "fuel_control": "Single Overhead Cams (SOHC)",
//     "ignition": "Full transistorized ignition",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Slipper clutch",
//     "front_suspension": "43mm fork",
//     "front_wheel_travel": "122 mm (4.8 inches)",
//     "rear_suspension": "Dual piggy backed shocks",
//     "rear_wheel_travel": "97 mm (3.8 inches)",
//     "front_tire": "130/70-18 ",
//     "rear_tire": "180/65-16 ",
//     "front_brakes": "Single disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Single-piston caliper. ",
//     "total_weight": "220.9 kg (487.0 pounds)",
//     "seat_height": "690 mm (27.2 inches) If adjustable, lowest setting.",
//     "total_height": "1094 mm (43.1 inches)",
//     "total_length": "2188 mm (86.1 inches)",
//     "total_width": "820 mm (32.3 inches)",
//     "ground_clearance": "136 mm (5.4 inches)",
//     "wheelbase": "1488 mm (58.6 inches)",
//     "fuel_capacity": "11.20 litres (2.96 US gallons)",
//     "starter": "Electric"
//   },
// {"id": "05",
//     "make": "Honda",
//     "model": "VFR 800",
//     "year": "2012",
//     "type": "Sport",
//     "displacement": "782.0 ccm (47.72 cubic inches)",
//     "engine": "V4, four-stroke",
//     "power": "107.0 HP (78.1  kW)) @ 10500 RPM",
//     "torque": "80.0 Nm (8.2 kgf-m or 59.0 ft.lbs) @ 8750 RPM",
//     "compression": "11.6:1",
//     "bore_stroke": "72.0 x 48.0 mm (2.8 x 1.9 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. PGM-FI",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Computer-controlled digital transistorised with electronic advance ",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "front_suspension": "43mm HMAS cartridge-type telescopic fork with stepless pre-load adjustment, 109mm axle travel ",
//     "rear_suspension": "Pro-link with gas-charged HMAS damper, 7-step preload and stepless rebound adjustment, 120mm axle travel ",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. Combined 3-piston calliper (ABS) and sintered metal pads ",
//     "rear_brakes": "Single disc. Combined 3-piston callipers (ABS) and sintered metal pads ",
//     "dry_weight": "218.0 kg (480.6 pounds)",
//     "seat_height": "805 mm (31.7 inches) If adjustable, lowest setting.",
//     "total_height": "1195 mm (47.0 inches)",
//     "total_length": "2120 mm (83.5 inches)",
//     "total_width": "735 mm (28.9 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1460 mm (57.5 inches)",
//     "fuel_capacity": "22.00 litres (5.81 US gallons)",
//     "starter": "Electric"
//   },
//   {"id": "06",
//     "make": "Honda",
//     "model": "VFR 800",
//     "year": "2011",
//     "type": "Sport touring",
//     "displacement": "782.0 ccm (47.72 cubic inches)",
//     "engine": "V4, four-stroke",
//     "power": "107.0 HP (78.1  kW)) @ 10500 RPM",
//     "torque": "80.0 Nm (8.2 kgf-m or 59.0 ft.lbs) @ 8750 RPM",
//     "compression": "11.6:1",
//     "bore_stroke": "72.0 x 48.0 mm (2.8 x 1.9 inches)",
//     "fuel_system": "Injection. PGM - Fi Electronic Fuel-Injection ",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Computer-controlled digital transistorised with electronic advance ",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "front_suspension": "43mm HMAS cartridge-type telescopic fork with stepless pre-load adjustment, 109mm axle travel ",
//     "rear_suspension": "Pro-link with gas-charged HMAS damper, 7-step preload and stepless rebound adjustment, 120mm axle travel ",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc",
//     "rear_brakes": "Single disc",
//     "dry_weight": "215.0 kg (474.0 pounds)",
//     "seat_height": "805 mm (31.7 inches) If adjustable, lowest setting.",
//     "total_height": "1195 mm (47.0 inches)",
//     "total_length": "2120 mm (83.5 inches)",
//     "total_width": "735 mm (28.9 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1460 mm (57.5 inches)",
//     "fuel_capacity": "22.00 litres (5.81 US gallons)",
//     "starter": "Electric"
//   },
//  {"id": "07",
//     "make": "Suzuki",
//     "model": "Bandit 1250",
//     "year": "2018",
//     "type": "Sport touring",
//     "displacement": "1255.0 ccm (76.58 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "98.0 HP (71.5  kW)) @ 7500 RPM",
//     "torque": "108.0 Nm (11.0 kgf-m or 79.7 ft.lbs) @ 3700 RPM",
//     "compression": "10.5:1",
//     "bore_stroke": "79.0 x 64.0 mm (3.1 x 2.5 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Electronic",
//     "lubrication": "Wet sump with heat exchanger",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Multi-plate clutch in oil bath, hydraulically",
//     "frame": "Double craddle",
//     "front_suspension": "Telescopic, coil spring, oil damped",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Link type, coil spring, oil damped",
//     "rear_wheel_travel": "136 mm (5.4 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. ABS, 4-piston",
//     "rear_brakes": "Single disc. ABS",
//     "dry_weight": "254.0 kg (560.0 pounds)",
//     "seat_height": "805 mm (31.7 inches) If adjustable, lowest setting.",
//     "total_height": "1245 mm (49.0 inches)",
//     "total_length": "2130 mm (83.9 inches)",
//     "total_width": "790 mm (31.1 inches)",
//     "ground_clearance": "135 mm (5.3 inches)",
//     "wheelbase": "1485 mm (58.5 inches)",
//     "fuel_capacity": "19.00 litres (5.02 US gallons)",
//     "starter": "Electric"
//   },
// {"id": "08",
//     "make": "Suzuki",
//     "model": "Bandit 1250",
//     "year": "2014",
//     "type": "Sport touring",
//     "displacement": "1255.0 ccm (76.58 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "98.0 HP (71.5  kW)) @ 7500 RPM",
//     "torque": "108.0 Nm (11.0 kgf-m or 79.7 ft.lbs) @ 3750 RPM",
//     "compression": "10.5:1",
//     "bore_stroke": "79.0 x 64.0 mm (3.1 x 2.5 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Electronic ignition (transistorised)",
//     "lubrication": "Wet sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "frame": "Double craddle",
//     "front_suspension": "Telescopic, coil spring, oil damped",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Link type, coil spring, oil damped",
//     "rear_wheel_travel": "136 mm (5.4 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. ABS",
//     "rear_brakes": "Single disc. ABS",
//     "dry_weight": "257.0 kg (566.6 pounds)",
//     "seat_height": "805 mm (31.7 inches) If adjustable, lowest setting.",
//     "total_height": "1245 mm (49.0 inches)",
//     "total_length": "2130 mm (83.9 inches)",
//     "total_width": "790 mm (31.1 inches)",
//     "wheelbase": "1485 mm (58.5 inches)",
//     "fuel_capacity": "19.00 litres (5.02 US gallons)",
//     "starter": "Electric"
//   },
//  {"id": "09",
//     "make": "Suzuki",
//     "model": "Intruder 400",
//     "year": "2011",
//     "type": "Custom / cruiser",
//     "displacement": "399.0 ccm (24.35 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "32.2 HP (23.5  kW)) @ 8000 RPM",
//     "torque": "33.0 Nm (3.4 kgf-m or 24.3 ft.lbs) @ 6000 RPM",
//     "compression": "10.5:1",
//     "bore_stroke": "65.0 x 60.2 mm (2.6 x 2.4 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_control": "Single Overhead Cams (SOHC)",
//     "ignition": "Full transistor type",
//     "cooling": "Oil & air",
//     "gearbox": "5-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet multi-plate coil spring",
//     "frame": "Diamond",
//     "front_tire": "130/90-16 ",
//     "rear_tire": "170/80-15 ",
//     "front_brakes": "Single disc",
//     "rear_brakes": "Expanding brake (drum brake)",
//     "dry_weight": "275.0 kg (606.3 pounds)",
//     "seat_height": "700 mm (27.6 inches) If adjustable, lowest setting.",
//     "total_height": "1105 mm (43.5 inches)",
//     "total_length": "2080 mm (81.9 inches)",
//     "ground_clearance": "140 mm (5.5 inches)",
//     "wheelbase": "1655 mm (65.2 inches)",
//     "fuel_capacity": "15.00 litres (3.96 US gallons)",
//     "starter": "Electric"
//   },{"id": "10",
//     "make": "Kawasaki",
//     "model": "Ninja 650 ",
//     "year": "2022",
//     "type": "Sport",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "52.3 HP (38.2  kW)) @ 8000 RPM",
//     "torque": "56.0 Nm (5.7 kgf-m or 41.3 ft.lbs) @ 4000 RPM",
//     "compression": "10.8:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. DFI® with dual 36mm Keihin throttle bodies",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCBI with digital advance",
//     "lubrication": "Forced lubrication, semi-dry sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Assist  and  Slipper Clutch",
//     "frame": "Trellis, high-tensile steel",
//     "front_suspension": "41mm hydraulic telescopic fork",
//     "front_wheel_travel": "124 mm (4.9 inches)",
//     "rear_suspension": "Horizontal back-link with adjustable spring preload",
//     "rear_wheel_travel": "130 mm (5.1 inches)",
//     "front_tire": "120/70-17 ",
//     "rear_tire": "160/60-17 ",
//     "front_brakes": "Double disc. Petal discs and two-piston calipers. Optional ABS.                                  ",
//     "rear_brakes": "Single disc. Petal disc and single piston caliper. Optional ABS.                               ",
//     "total_weight": "192.1 kg (423.4 pounds)",
//     "seat_height": "790 mm (31.1 inches) If adjustable, lowest setting.",
//     "total_height": "1146 mm (45.1 inches)",
//     "total_length": "2055 mm (80.9 inches)",
//     "total_width": "739 mm (29.1 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1410 mm (55.5 inches)",
//     "fuel_capacity": "15.14 litres (4.00 US gallons)",
//     "starter": "Electric"
//   },{"id": "11",
//     "make": "Kawasaki",
//     "model": "Ninja 650",
//     "year": "2018",
//     "type": "Sport",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "68.0 HP (49.6  kW)) @ 8000 RPM",
//     "torque": "65.7 Nm (6.7 kgf-m or 48.5 ft.lbs) @ 6500 RPM",
//     "compression": "10.8:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. DFI® with dual 38mm Keihin throttle bodies",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCBI with digital advance",
//     "lubrication": "Forced lubrication, semi-dry sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet multi-disc, manual",
//     "frame": "Trellis, high-tensile steel",
//     "front_suspension": "41mm hydraulic telescopic fork",
//     "front_wheel_travel": "124 mm (4.9 inches)",
//     "rear_suspension": "Horizontal Back-link with adjustable preload",
//     "rear_wheel_travel": "130 mm (5.1 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "160/60-ZR17 ",
//     "front_brakes": "Double disc. ABS. Petal discs and two-piston calipers.                                ",
//     "rear_brakes": "Single disc. ABS. Petal disc and single piston caliper.                           ",
//     "total_weight": "193.1 kg (425.6 pounds)",
//     "seat_height": "790 mm (31.1 inches) If adjustable, lowest setting.",
//     "total_height": "1135 mm (44.7 inches)",
//     "total_length": "2055 mm (80.9 inches)",
//     "total_width": "740 mm (29.1 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1410 mm (55.5 inches)",
//     "fuel_capacity": "15.00 litres (3.96 US gallons)",
//     "starter": "Electric"
//   }, {"id": "12",
//     "make": "Kawasaki",
//     "model": "Ninja 650",
//     "year": "2007",
//     "type": "Sport touring",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "71.0 HP (51.8  kW))",
//     "torque": "65.8 Nm (6.7 kgf-m or 48.5 ft.lbs) @ 7000 RPM",
//     "top_speed": "220.5 km/h (137.0 mph)",
//     "compression": "11.3:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Digital fuel injection with two 38mm Keihin throttle bodies",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "Digital CDI",
//     "lubrication": "Semi-Dry Sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet, Multi Disc",
//     "fuel_consumption": "4.90 litres/100 km (20.4 km/l or 48.00 mpg)",
//     "emission": "113.7 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Semi-double cradle, high-tensile steel",
//     "front_suspension": "41mm hydraulic telescopic fork",
//     "front_wheel_travel": "119 mm (4.7 inches)",
//     "rear_suspension": "Single offset laydown shock with adjustable spring preload",
//     "rear_wheel_travel": "124 mm (4.9 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "160/60-ZR17 ",
//     "front_brakes": "Double disc. Dual 300mm Petal Disc with 2-Piston Caliper",
//     "rear_brakes": "Single disc. Single 220mm Petal Disc with hydraulic caliper",
//     "dry_weight": "177.8 kg (392.0 pounds)",
//     "total_weight": "196.0 kg (432.0 pounds)",
//     "seat_height": "787 mm (31.0 inches) If adjustable, lowest setting.",
//     "total_height": "1210 mm (47.6 inches)",
//     "total_length": "2105 mm (82.9 inches)",
//     "total_width": "760 mm (29.9 inches)",
//     "ground_clearance": "145 mm (5.7 inches)",
//     "wheelbase": "1410 mm (55.5 inches)",
//     "fuel_capacity": "15.51 litres (4.10 US gallons)"
//   }, {"id": "13",
//     "make": "Kawasaki",
//     "model": "Vulcan S ",
//     "year": "2022",
//     "type": "Custom / cruiser",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "60.4 HP (44.1  kW)) @ 7500 RPM",
//     "torque": "63.0 Nm (6.4 kgf-m or 46.5 ft.lbs) @ 6600 RPM",
//     "compression": "10.8:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "fuel_system": "Injection. DFI  with two 38mm throttle bodies, with sub-throttles",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCBI with digital advance",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "fuel_consumption": "4.40 litres/100 km (22.7 km/l or 53.46 mpg)",
//     "emission": "102.1 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "High-tensile steel diamond ",
//     "front_suspension": "41mm telescopic fork ",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Lay-down offset rear shock with linkage and adjustable preload",
//     "rear_wheel_travel": "81 mm (3.2 inches)",
//     "front_tire": "120/70-18 ",
//     "rear_tire": "160/60-17 ",
//     "front_brakes": "Double disc. Optional ABS. Two-piston calipers. ",
//     "rear_brakes": "Single disc. Optional ABS. Single-piston caliper. ",
//     "total_weight": "222.7 kg (491.0 pounds)",
//     "seat_height": "705 mm (27.8 inches) If adjustable, lowest setting.",
//     "total_height": "1100 mm (43.3 inches)",
//     "total_length": "2310 mm (90.9 inches)",
//     "total_width": "880 mm (34.6 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1575 mm (62.0 inches)",
//     "fuel_capacity": "14.00 litres (3.70 US gallons)",
//     "starter": "Electric"
//   },{"id": "14",
//     "make": "Kawasaki",
//     "model": "Vulcan S ",
//     "year": "2021",
//     "type": "Custom / cruiser",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "60.4 HP (44.1  kW)) @ 7500 RPM",
//     "torque": "63.0 Nm (6.4 kgf-m or 46.5 ft.lbs) @ 6600 RPM",
//     "compression": "10.8:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "fuel_system": "Injection. DFI  with two 38mm throttle bodies, with sub-throttles",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCBI with digital advance",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "fuel_consumption": "4.40 litres/100 km (22.7 km/l or 53.46 mpg)",
//     "emission": "102.1 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "High-tensile steel diamond frame",
//     "front_suspension": "41mm telescopic fork ",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Lay-down offset rear shock with linkage and adjustable preload",
//     "rear_wheel_travel": "81 mm (3.2 inches)",
//     "front_tire": "120/70-18 ",
//     "rear_tire": "160/60-17 ",
//     "front_brakes": "Double disc. Optional ABS. Two-piston calipers. ",
//     "rear_brakes": "Single disc. Optional ABS. Single-piston caliper. ",
//     "total_weight": "226.0 kg (498.3 pounds)",
//     "seat_height": "705 mm (27.8 inches) If adjustable, lowest setting.",
//     "total_height": "1100 mm (43.3 inches)",
//     "total_length": "2310 mm (90.9 inches)",
//     "total_width": "880 mm (34.6 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1575 mm (62.0 inches)",
//     "fuel_capacity": "14.00 litres (3.70 US gallons)",
//     "starter": "Electric"
//   },{"id": "15",
//     "make": "Kawasaki",
//     "model": "Vulcan S ",
//     "year": "2019",
//     "type": "Custom / cruiser",
//     "displacement": "649.0 ccm (39.60 cubic inches)",
//     "engine": "Twin, four-stroke",
//     "power": "46.9 HP (34.3  kW)) @ 6600 RPM",
//     "torque": "53.0 Nm (5.4 kgf-m or 39.1 ft.lbs) @ 5600 RPM",
//     "compression": "10.8:1",
//     "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
//     "fuel_system": "Injection. DFI® 38mm throttle bodies (2), with sub-throttle valves",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCBI with digital advance",
//     "transmission": "Chain   (final drive)",
//     "frame": "High-tensile steel diamond frame",
//     "front_suspension": "Telescopi fork",
//     "rear_suspension": "Lay-down offset rear shock with linkage and adjustable preload",
//     "front_tire": "120/70-18 ",
//     "rear_tire": "160/60-17 ",
//     "front_brakes": "Double disc",
//     "rear_brakes": "Single disc",
//     "total_weight": "226.0 kg (498.3 pounds)",
//     "seat_height": "706 mm (27.8 inches) If adjustable, lowest setting.",
//     "total_height": "1100 mm (43.3 inches)",
//     "total_length": "2309 mm (90.9 inches)",
//     "total_width": "879 mm (34.6 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1575 mm (62.0 inches)",
//     "fuel_capacity": "14.00 litres (3.70 US gallons)",
//     "starter": "Electric"
//   },
// {"id": "16",
//     "make": "Yamaha",
//     "model": "Fazer",
//     "year": "2018",
//     "type": "Sport",
//     "displacement": "153.0 ccm (9.34 cubic inches)",
//     "engine": "Single cylinder, four-stroke",
//     "torque": "13.6 Nm (1.4 kgf-m or 10.0 ft.lbs) @ 6000 RPM",
//     "compression": "9.5:1",
//     "bore_stroke": "58.0 x 57.9 mm (2.3 x 2.3 inches)",
//     "fuel_system": "Carburettor",
//     "fuel_control": "Single Overhead Cams (SOHC)",
//     "ignition": "DC CDI",
//     "lubrication": " Wet    Sump",
//     "cooling": "Air",
//     "gearbox": "5-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet, multiple-disc",
//     "frame": "Diamond",
//     "front_suspension": "Telescopic Hydraulic",
//     "rear_suspension": "Ajustable, Hydraulic Shock Absorber",
//     "front_tire": "100/80-17 ",
//     "rear_tire": "140/60-17 ",
//     "front_brakes": "Expanding brake (drum brake)",
//     "rear_brakes": "Expanding brake (drum brake)",
//     "total_weight": "141.0 kg (310.9 pounds)",
//     "seat_height": "795 mm (31.3 inches) If adjustable, lowest setting.",
//     "total_length": "2075 mm (81.7 inches)",
//     "ground_clearance": "160 mm (6.3 inches)",
//     "wheelbase": "1334 mm (52.5 inches)",
//     "fuel_capacity": "13.60 litres (3.59 US gallons)",
//     "starter": "Electric & kick"
//   },
//   {"id": "17",
//     "make": "Yamaha",
//     "model": "Fazer",
//     "year": "2017",
//     "type": "Sport",
//     "displacement": "153.0 ccm (9.34 cubic inches)",
//     "engine": "Single cylinder, four-stroke",
//     "torque": "13.6 Nm (1.4 kgf-m or 10.0 ft.lbs) @ 6000 RPM",
//     "compression": "9.5:1",
//     "bore_stroke": "58.0 x 57.9 mm (2.3 x 2.3 inches)",
//     "fuel_system": "Carburettor",
//     "fuel_control": "Single Overhead Cams (SOHC)",
//     "ignition": "DC CDI",
//     "lubrication": " Wet    Sump",
//     "cooling": "Air",
//     "gearbox": "5-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet, multiple-disc",
//     "frame": "Diamond",
//     "front_suspension": "Telescopic Hydraulic",
//     "rear_suspension": "Ajustable, Hydraulic Shock Absorber",
//     "front_tire": "100/80-17 ",
//     "rear_tire": "140/60-17 ",
//     "front_brakes": "Expanding brake (drum brake)",
//     "rear_brakes": "Expanding brake (drum brake)",
//     "total_weight": "141.0 kg (310.9 pounds)",
//     "seat_height": "795 mm (31.3 inches) If adjustable, lowest setting.",
//     "total_length": "2075 mm (81.7 inches)",
//     "ground_clearance": "160 mm (6.3 inches)",
//     "wheelbase": "1334 mm (52.5 inches)",
//     "fuel_capacity": "13.60 litres (3.59 US gallons)",
//     "starter": "Electric & kick"
//   },
// {"id": "18",
//     "make": "Yamaha",
//     "model": "Fazer",
//     "year": "2013",
//     "type": "Naked bike",
//     "displacement": "998.0 ccm (60.90 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "147.9 HP (108.0  kW)) @ 11000 RPM",
//     "torque": "106.0 Nm (10.8 kgf-m or 78.2 ft.lbs) @ 8000 RPM",
//     "compression": "11.5:1",
//     "bore_stroke": "77.0 x 53.6 mm (3.0 x 2.1 inches)",
//     "fuel_system": "Injection. EFI",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCI",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet, multiple-disc coil spring",
//     "frame": "Aluminium die-cast, diamond shaped",
//     "front_suspension": "Upside-down telescopic fork ",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Swingarm (link suspension)",
//     "rear_wheel_travel": "130 mm (5.1 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/50-ZR17 ",
//     "front_brakes": "Double disc",
//     "rear_brakes": "Single disc",
//     "dry_weight": "198.0 kg (436.5 pounds)",
//     "total_weight": "220.0 kg (485.0 pounds)",
//     "seat_height": "815 mm (32.1 inches) If adjustable, lowest setting.",
//     "total_height": "1205 mm (47.4 inches)",
//     "total_length": "2140 mm (84.3 inches)",
//     "total_width": "770 mm (30.3 inches)",
//     "ground_clearance": "135 mm (5.3 inches)",
//     "wheelbase": "1460 mm (57.5 inches)",
//     "fuel_capacity": "18.00 litres (4.76 US gallons)",
//     "starter": "Electric"
//   },{"id": "19",
//     "make": "Ducati",
//     "model": "Monster ",
//     "year": "2021",
//     "type": "Naked bike",
//     "displacement": "937.0 ccm (57.18 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "111.0 HP (81.0  kW)) @ 9250 RPM",
//     "torque": "93.0 Nm (9.5 kgf-m or 68.6 ft.lbs) @ 6500 RPM",
//     "compression": "13.3:1",
//     "bore_stroke": "94.0 x 67.5 mm (3.7 x 2.7 inches)",
//     "valves_per_cylinder": "2",
//     "fuel_system": "Injection. Electronic fuel injection 53mm throttle bodies with Ride-by-Wire system",
//     "fuel_control": "Desmodromic valve control",
//     "cooling": "Air",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Slipper and self-servo wet multiplate clutch with hydraulic control",
//     "frame": "Aluminum alloy Front Frame",
//     "front_suspension": "43mm USD",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Progressive with preload and rebound  adjustable monoshock",
//     "rear_wheel_travel": "140 mm (5.5 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. Semi floating, radially mounted Brembo M4 32 mono bloc with four piston calipers",
//     "rear_brakes": "Single disc. Brembo 2-piston",
//     "dry_weight": "166.0 kg (366.0 pounds)",
//     "total_weight": "188.0 kg (414.5 pounds)",
//     "seat_height": "775 mm (30.5 inches) If adjustable, lowest setting.",
//     "wheelbase": "1474 mm (58.0 inches)",
//     "fuel_capacity": "14.00 litres (3.70 US gallons)",
//     "starter": "Electric"
//   },{"id": "20",
//     "make": "Ducati",
//     "model": "Monster ",
//     "year": "2020",
//     "type": "Naked bike",
//     "displacement": "821.0 ccm (50.10 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "109.0 HP (79.6  kW)) @ 9250 RPM",
//     "torque": "86.0 Nm (8.8 kgf-m or 63.4 ft.lbs) @ 7750 RPM",
//     "compression": "12.8:1",
//     "bore_stroke": "88.0 x 67.5 mm (3.5 x 2.7 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. 53mm throttle bodies with full Ride by Wire",
//     "fuel_control": "Desmodromic valve control",
//     "cooling": "Air",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "APTC slipper and self-servo wet multiplate clutch with control cable",
//     "fuel_consumption": "5.40 litres/100 km (18.5 km/l or 43.56 mpg)",
//     "emission": "125.3 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Tubular steel Trellis frame attached to the cylinders head",
//     "front_suspension": "43mm upside-down forks",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Progressive linkage with adjustable monoshock. Aluminium double-sided swingarm",
//     "rear_wheel_travel": "140 mm (5.5 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "180/55-ZR17 ",
//     "front_brakes": "Double disc. Semi-floating discs, radially mounted Monobloc Brembo M4-32 callipers, 4-pistons, axiial pump with ABS as standard",
//     "rear_brakes": "Single disc. 2-piston floating calliper with ABS as standard equipment",
//     "dry_weight": "180.5 kg (397.9 pounds)",
//     "total_weight": "206.0 kg (454.2 pounds)",
//     "seat_height": "785 mm (30.9 inches) If adjustable, lowest setting.",
//     "total_height": "1055 mm (41.5 inches)",
//     "total_length": "2170 mm (85.4 inches)",
//     "total_width": "800 mm (31.5 inches)",
//     "wheelbase": "1480 mm (58.3 inches)",
//     "fuel_capacity": "16.50 litres (4.36 US gallons)",
//     "starter": "Electric"
//   },{"id": "21",
//     "make": "Ducati",
//     "model": "Monster ",
//     "year": "2019",
//     "type": "Naked bike",
//     "displacement": "1198.4 ccm (73.13 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "150.0 HP (109.5  kW)) @ 9250 RPM",
//     "torque": "126.2 Nm (12.9 kgf-m or 93.1 ft.lbs) @ 7750 RPM",
//     "compression": "13.0:1",
//     "bore_stroke": "106.0 x 67.9 mm (4.2 x 2.7 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. 53mm throttle bodies with full  Ride by Wire",
//     "fuel_control": "Desmodromic valve control",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Light action, wet, multiplate clutch with hydraulic control. Self-servo action on drive, slipper action on over-run.",
//     "fuel_consumption": "5.20 litres/100 km (19.2 km/l or 45.23 mpg)",
//     "emission": "120.6 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Tubular steel Trellis frame attached to the cylinders head",
//     "front_suspension": "43mm fully adjustable usd forks",
//     "front_wheel_travel": "130 mm (5.1 inches)",
//     "rear_suspension": "Progressive linkage with fully adjustable monoshock. Aluminium single-sided swingarm",
//     "rear_wheel_travel": "152 mm (6.0 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/55-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Floating disc. Two-piston calipers. ",
//     "dry_weight": "187.0 kg (412.3 pounds)",
//     "total_weight": "213.0 kg (469.6 pounds)",
//     "seat_height": "795 mm (31.3 inches) If adjustable, lowest setting.",
//     "total_height": "1040 mm (40.9 inches)",
//     "total_length": "2200 mm (86.6 inches)",
//     "total_width": "830 mm (32.7 inches)",
//     "wheelbase": "1485 mm (58.5 inches)",
//     "fuel_capacity": "16.50 litres (4.36 US gallons)",
//     "starter": "Electric"
//   },{"id": "22",
//     "make": "Ducati",
//     "model": "Diavel 1260",
//     "year": "2022",
//     "type": "Allround",
//     "displacement": "1262.0 ccm (77.01 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "162.0 HP (118.2  kW)) @ 9500 RPM",
//     "torque": "129.5 Nm (13.2 kgf-m or 95.5 ft.lbs) @ 7500 RPM",
//     "compression": "13.0:1",
//     "bore_stroke": "106.0 x 71.5 mm (4.2 x 2.8 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Bosch electronic fuel injection system, elliptical throttle bodies with Ride-by-Wire, equivalent diameter 56 mm",
//     "fuel_control": "Desmodromic valve control",
//     "ignition": "Dual Spark",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Wet, multiplate, slipper",
//     "fuel_consumption": "5.50 litres/100 km (18.2 km/l or 42.77 mpg)",
//     "emission": "127.6 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Tubular steel trellis ",
//     "front_suspension": "50mm adjustable USD forks.",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Monoshock, preload and rebound adjustable",
//     "rear_wheel_travel": "130 mm (5.1 inches)",
//     "front_tire": "130/70-ZR17 ",
//     "rear_tire": "240/45-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Two-piston calipers. ",
//     "dry_weight": "223.0 kg (491.6 pounds)",
//     "total_weight": "249.0 kg (549.0 pounds)",
//     "seat_height": "780 mm (30.7 inches) If adjustable, lowest setting.",
//     "total_length": "2200 mm (86.6 inches)",
//     "wheelbase": "1600 mm (63.0 inches)",
//     "fuel_capacity": "17.00 litres (4.49 US gallons)",
//     "starter": "Electric"
//   },
//  {"id": "23",
//     "make": "Ducati",
//     "model": "Diavel 1260 ",
//     "year": "2019",
//     "type": "Allround",
//     "displacement": "1262.0 ccm (77.01 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "157.0 HP (114.6  kW)) @ 9500 RPM",
//     "torque": "129.5 Nm (13.2 kgf-m or 95.5 ft.lbs) @ 7500 RPM",
//     "compression": "13.0:1",
//     "bore_stroke": "106.0 x 71.5 mm (4.2 x 2.8 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Bosch electronic fuel injection system, elliptical throttle bodies with Ride-by-Wire, equivalent diameter 56 mm",
//     "fuel_control": "Desmodromic valve control",
//     "ignition": "Dual Spark",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "fuel_consumption": "5.40 litres/100 km (18.5 km/l or 43.56 mpg)",
//     "emission": "125.3 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Tubular steel Trellis ",
//     "front_suspension": "48mm fully adjustable usd forks.",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Fully adjustable Sachs unit. Remote spring preload adjustment. Aluminium single-sided swingarm",
//     "rear_wheel_travel": "130 mm (5.1 inches)",
//     "front_tire": "120/70-17 ",
//     "rear_tire": "240/45-17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Two-piston calipers. ",
//     "dry_weight": "218.0 kg (480.6 pounds)",
//     "total_weight": "244.0 kg (537.9 pounds)",
//     "seat_height": "780 mm (30.7 inches) If adjustable, lowest setting.",
//     "total_length": "2200 mm (86.6 inches)",
//     "wheelbase": "1600 mm (63.0 inches)",
//     "fuel_capacity": "17.00 litres (4.49 US gallons)",
//     "starter": "Electric"
//   },{"id": "24",
//     "make": "Ducati",
//     "model": "Diavel Carbon",
//     "year": "2018",
//     "type": "Naked bike",
//     "displacement": "1198.4 ccm (73.13 cubic inches)",
//     "engine": "V2, four-stroke",
//     "power": "152.0 HP (110.9  kW)) @ 9000 RPM",
//     "torque": "123.0 Nm (12.5 kgf-m or 90.7 ft.lbs) @ 8000 RPM",
//     "compression": "12.5:1",
//     "bore_stroke": "106.0 x 67.9 mm (4.2 x 2.7 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Elliptical throttle bodies, fully ride-by-wire controlled",
//     "fuel_control": "Desmodromic valve control",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Slipper and self-servo wet multiplate clutch with hydraulic control",
//     "frame": "Tubular steel trellis",
//     "front_suspension": "Marzocchi DLC coated 50mm fully adjustable usd forks",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Progressive linkage with fully adjustable Sachs monoshock. Remote spring preload adjustment. Aluminium single-sided swingarm",
//     "rear_wheel_travel": "120 mm (4.7 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "240/45-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. Radially mounted. ",
//     "rear_brakes": "Single disc. ABS. Floating disc. Two-piston calipers. ",
//     "dry_weight": "205.0 kg (451.9 pounds)",
//     "seat_height": "770 mm (30.3 inches) If adjustable, lowest setting.",
//     "total_height": "1192 mm (46.9 inches)",
//     "total_length": "2235 mm (88.0 inches)",
//     "total_width": "860 mm (33.9 inches)",
//     "wheelbase": "1590 mm (62.6 inches)",
//     "fuel_capacity": "17.00 litres (4.49 US gallons)",
//     "starter": "Electric"
//   },
// {"id": "25",
//     "make": "BMW",
//     "model": "R1200GS",
//     "year": "2007",
//     "type": "Enduro / offroad",
//     "displacement": "1170.0 ccm (71.39 cubic inches)",
//     "engine": "boxer, four-stroke",
//     "power": "102.0 HP (74.5  kW)) @ 7000 RPM",
//     "torque": "115.0 Nm (11.7 kgf-m or 84.8 ft.lbs) @ 5500 RPM",
//     "top_speed": "213.0 km/h (132.4 mph)",
//     "compression": "11.0:1",
//     "bore_stroke": "101.0 x 73.0 mm (4.0 x 2.9 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Electronic fuel injection ",
//     "ignition": "BMS-K",
//     "cooling": "Oil & air",
//     "gearbox": "6-speed",
//     "transmission": "Shaft drive (cardan)   (final drive)",
//     "clutch": "Hydraulic, dry, single-disk ",
//     "fuel_consumption": "5.50 litres/100 km (18.2 km/l or 42.77 mpg)",
//     "emission": "127.6 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Tubular",
//     "front_suspension": "Telelever ",
//     "front_wheel_travel": "190 mm (7.5 inches)",
//     "rear_suspension": "EVO Paralever ",
//     "rear_wheel_travel": "200 mm (7.9 inches)",
//     "front_tire": "110/80-H19 ",
//     "rear_tire": "150/70-H17 ",
//     "front_brakes": "Double disc. Four-piston calipers. ",
//     "rear_brakes": "Single disc. Two-piston calipers. ",
//     "dry_weight": "199.0 kg (438.7 pounds)",
//     "total_weight": "225.0 kg (496.0 pounds)",
//     "seat_height": "840 mm (33.1 inches) If adjustable, lowest setting.",
//     "total_height": "895 mm (35.2 inches)",
//     "total_length": "2210 mm (87.0 inches)",
//     "wheelbase": "1519 mm (59.8 inches)",
//     "fuel_capacity": "20.00 litres (5.28 US gallons)",
//     "starter": "Electric"
//   }, {"id": "26",
//     "make": "BMW",
//     "model": "S 1000 RR",
//     "year": "2022",
//     "type": "Sport",
//     "displacement": "999.0 ccm (60.96 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "205.0 HP (149.6  kW)) @ 13000 RPM",
//     "torque": "112.6 Nm (11.5 kgf-m or 83.0 ft.lbs) @ 11000 RPM",
//     "top_speed": "297.7 km/h (185.0 mph)",
//     "compression": "13.3:1",
//     "bore_stroke": "80.0 x 49.7 mm (3.1 x 2.0 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Electronic fuel injection with ride-by-wire throttle system, variable intake, and knock sensor",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "lubrication": "Wet sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Multiplate clutch in oil bath, anti-hopping clutch, mechanically controlled",
//     "frame": "Aluminium composite bridge frame, partially self-supporting engine",
//     "front_suspension": "Upside-down telescopic fork 46 mm, compression and rebound stage adjustable.",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "WSBK Aluminium swing arm, full floater pro, compression and rebound damping adjustable, adjustable preload",
//     "rear_wheel_travel": "117 mm (4.6 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/55-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. ",
//     "rear_brakes": "Single disc. ABS. Floating disc. Single-piston caliper. ",
//     "dry_weight": "208.0 kg (458.6 pounds)",
//     "total_weight": "196.9 kg (434.0 pounds)",
//     "seat_height": "823 mm (32.4 inches) If adjustable, lowest setting.",
//     "total_height": "1151 mm (45.3 inches)",
//     "total_length": "2073 mm (81.6 inches)",
//     "total_width": "848 mm (33.4 inches)",
//     "wheelbase": "1441 mm (56.7 inches)",
//     "fuel_capacity": "16.50 litres (4.36 US gallons)",
//     "starter": "Electric"
//   },{"id": "27",
//     "make": "BMW",
//     "model": "S 1000 RR",
//     "year": "2020",
//     "type": "Sport",
//     "displacement": "999.0 ccm (60.96 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "205.0 HP (149.6  kW)) @ 13500 RPM",
//     "torque": "112.6 Nm (11.5 kgf-m or 83.0 ft.lbs) @ 11000 RPM",
//     "top_speed": "200.0 km/h (124.3 mph)",
//     "compression": "13.3:1",
//     "bore_stroke": "80.0 x 49.7 mm (3.1 x 2.0 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection. Electronic fuel injection with ride-by-wire throttle system, variable intake, and knock sensor",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "lubrication": "Wet sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Multiplate clutch in oil bath, anti-hopping clutch, mechanically controlled",
//     "fuel_consumption": "6.36 litres/100 km (15.7 km/l or 36.98 mpg)",
//     "emission": "147.6 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Aluminium composite bridge frame, partially self-supporting engine",
//     "front_suspension": "Upside-down telescopic fork 46 mm, compression and rebound stage adjustable,",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "WSBK Aluminium swing arm, full floater pro, compression and rebound damping adjustable, adjustable preload",
//     "rear_wheel_travel": "117 mm (4.6 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/55-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. ",
//     "rear_brakes": "Single disc. ABS. Floating disc. Single-piston caliper. ",
//     "total_weight": "197.0 kg (434.3 pounds)",
//     "seat_height": "823 mm (32.4 inches) If adjustable, lowest setting.",
//     "total_height": "1151 mm (45.3 inches)",
//     "total_length": "2073 mm (81.6 inches)",
//     "total_width": "848 mm (33.4 inches)",
//     "wheelbase": "1441 mm (56.7 inches)",
//     "fuel_capacity": "16.50 litres (4.36 US gallons)",
//     "starter": "Electric"
//   },
//   {"id": "28",
//     "make": "BMW",
//     "model": "S 1000 RR",
//     "year": "2019",
//     "type": "Sport",
//     "displacement": "999.0 ccm (60.96 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "199.0 HP (145.3  kW)) @ 13500 RPM",
//     "torque": "113.0 Nm (11.5 kgf-m or 83.3 ft.lbs) @ 10500 RPM",
//     "top_speed": "200.0 km/h (124.3 mph)",
//     "compression": "13.0:1",
//     "bore_stroke": "80.0 x 49.7 mm (3.1 x 2.0 inches)",
//     "fuel_system": "Injection. Electronic injection, variable intake pipe",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "lubrication": "Wet sump",
//     "cooling": "Oil & air",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "clutch": "Multiplate clutch in oil bath, anti-hopping clutch, mechanically controlled",
//     "fuel_consumption": "6.70 litres/100 km (14.9 km/l or 35.11 mpg)",
//     "emission": "155.4 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Aluminium composite bridge frame, partially self-supporting engine",
//     "front_suspension": "Upside-down telescopic fork   46 mm, compression and rebound stage adjustable,",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Aluminium double-sided swing-arm, central spring strut, adjustable rebound and compression-stage damping",
//     "rear_wheel_travel": "120 mm (4.7 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/55-ZR17 ",
//     "front_brakes": "Double disc. ABS. Floating discs. Four-piston calipers. ",
//     "rear_brakes": "Single disc. ABS. Floating disc. Single-piston caliper. ",
//     "dry_weight": "179.5 kg (395.7 pounds)",
//     "total_weight": "208.0 kg (458.6 pounds)",
//     "seat_height": "815 mm (32.1 inches) If adjustable, lowest setting.",
//     "total_height": "1140 mm (44.9 inches)",
//     "total_length": "2050 mm (80.7 inches)",
//     "total_width": "826 mm (32.5 inches)",
//     "wheelbase": "1438 mm (56.6 inches)",
//     "fuel_capacity": "17.50 litres (4.62 US gallons)",
//     "starter": "Electric"
//   },{"id": "29",
//     "make": "Yamaha",
//     "model": "R1",
//     "year": "2022",
//     "type": "Sport",
//     "displacement": "998.0 ccm (60.90 cubic inches)",
//     "engine": "In-line four, four-stroke",
//     "power": "197.3 HP (144.0  kW)) @ 13500 RPM",
//     "torque": "113.3 Nm (11.6 kgf-m or 83.6 ft.lbs) @ 11500 RPM",
//     "compression": "13.0:1",
//     "bore_stroke": "79.0 x 50.9 mm (3.1 x 2.0 inches)",
//     "valves_per_cylinder": "4",
//     "fuel_system": "Injection",
//     "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
//     "ignition": "TCI",
//     "lubrication": "Wet sump",
//     "cooling": "Liquid",
//     "gearbox": "6-speed",
//     "transmission": "Chain   (final drive)",
//     "fuel_consumption": "7.20 litres/100 km (13.9 km/l or 32.67 mpg)",
//     "emission": "167.0 CO2 g/km. (CO2 - Carbon dioxide emission) ",
//     "frame": "Aluminium Deltabox, Diamond",
//     "front_suspension": "KYB  telescopic fork",
//     "front_wheel_travel": "120 mm (4.7 inches)",
//     "rear_suspension": "Swingarm",
//     "rear_wheel_travel": "120 mm (4.7 inches)",
//     "front_tire": "120/70-ZR17 ",
//     "rear_tire": "190/55-ZR17 ",
//     "front_brakes": "Double disc. Hydraulic",
//     "rear_brakes": "Single disc. Hydraulic. ",
//     "total_weight": "201.0 kg (443.1 pounds)",
//     "seat_height": "855 mm (33.7 inches) If adjustable, lowest setting.",
//     "total_height": "1165 mm (45.9 inches)",
//     "total_length": "2055 mm (80.9 inches)",
//     "total_width": "690 mm (27.2 inches)",
//     "ground_clearance": "130 mm (5.1 inches)",
//     "wheelbase": "1405 mm (55.3 inches)",
//     "fuel_capacity": "17.00 litres (4.49 US gallons)",
//     "starter": "Electric"
//   }
// ]