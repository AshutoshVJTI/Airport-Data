export default function DistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R: number = 6371; // km
    var dLat: number = toRad(lat2 - lat1);
    var dLon: number = toRad(lon2 - lon1);
    var lat1Rad: number = toRad(lat1);
    var lat2Rad: number = toRad(lat2);

    var a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    var c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d: number = R * c;
    d = d/1.852; //Convert to nautical miles
    return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) {
    return Value * Math.PI / 180;
}