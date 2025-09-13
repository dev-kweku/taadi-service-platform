    export interface Location {
        lat: number;
        lng: number;
        address: string;
    }
    
    export async function geocodeAddress(address: string): Promise<Location | null> {
        try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
            )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
    
        const data = await response.json();
    
        if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            return {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            address: result.formatted_address,
            };
        }
    
        return null;
        } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
        }
    }
    
    export async function calculateDistance(
        origin: Location,
        destination: Location
    ): Promise<number | null> {
        try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
    
        const data = await response.json();
    
        if (data.status === 'OK' && data.rows.length > 0 && data.rows[0].elements.length > 0) {
            const element = data.rows[0].elements[0];
            if (element.status === 'OK') {
            return element.distance.value; // Distance in meters
            }
        }
    
        return null;
        } catch (error) {
        console.error('Error calculating distance:', error);
        return null;
        }
    }