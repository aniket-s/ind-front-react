// src/data/dummyDealers.ts
export interface DealerData {
    id: string | number;
    name: string;
    type: 'distributor' | 'service_center' | 'dealer';
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
    establishedYear?: number;
    brands?: string[];
    services?: string[];
}

export const dummyDealers: DealerData[] = [
    // Delhi NCR
    {
        id: 1,
        name: "IndPower Solutions Delhi",
        type: "distributor",
        address: "A-42, Sector 16, Noida",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
        phone: "9876543210",
        email: "delhi@indpower.com",
        rating: 4.8,
        latitude: 28.5355,
        longitude: 77.3910,
        establishedYear: 2015,
        brands: ["IndPower", "PowerMax"],
        services: ["Sales", "Service", "Installation"]
    },
    {
        id: 2,
        name: "Power Tech Services",
        type: "service_center",
        address: "B-23, Connaught Place",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        phone: "9876543211",
        email: "cp.service@indpower.com",
        rating: 4.5,
        latitude: 28.6315,
        longitude: 77.2167,
        establishedYear: 2018
    },
    {
        id: 3,
        name: "Gurgaon Power Hub",
        type: "dealer",
        address: "Plot 45, Udyog Vihar Phase IV",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122015",
        phone: "9876543212",
        email: "gurgaon@indpower.com",
        rating: 4.6,
        latitude: 28.4595,
        longitude: 77.0266
    },

    // Mumbai
    {
        id: 4,
        name: "Maharashtra Power Solutions",
        type: "distributor",
        address: "Phoenix Mall, Lower Parel",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400013",
        phone: "9876543213",
        email: "mumbai@indpower.com",
        rating: 4.7,
        latitude: 19.0176,
        longitude: 72.8561
    },
    {
        id: 5,
        name: "Andheri Service Point",
        type: "service_center",
        address: "Link Road, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
        phone: "9876543214",
        email: "andheri@indpower.com",
        rating: 4.4,
        latitude: 19.1136,
        longitude: 72.8697
    },

    // Bangalore
    {
        id: 6,
        name: "Silicon Valley Power",
        type: "distributor",
        address: "Electronic City Phase 1",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560100",
        phone: "9876543215",
        email: "bangalore@indpower.com",
        rating: 4.9,
        latitude: 12.8458,
        longitude: 77.6606
    },
    {
        id: 7,
        name: "Whitefield Power Center",
        type: "dealer",
        address: "ITPL Main Road, Whitefield",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560066",
        phone: "9876543216",
        email: "whitefield@indpower.com",
        rating: 4.6,
        latitude: 12.9698,
        longitude: 77.7500
    },

    // Chennai
    {
        id: 8,
        name: "Tamil Nadu Power Hub",
        type: "distributor",
        address: "Mount Road, Anna Salai",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600002",
        phone: "9876543217",
        email: "chennai@indpower.com",
        rating: 4.5,
        latitude: 13.0657,
        longitude: 80.2627
    },
    {
        id: 9,
        name: "OMR Service Station",
        type: "service_center",
        address: "Old Mahabalipuram Road",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600096",
        phone: "9876543218",
        email: "omr@indpower.com",
        rating: 4.3,
        latitude: 12.9165,
        longitude: 80.2302
    },

    // Kolkata
    {
        id: 10,
        name: "Bengal Power Solutions",
        type: "distributor",
        address: "Park Street",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700016",
        phone: "9876543219",
        email: "kolkata@indpower.com",
        rating: 4.4,
        latitude: 22.5448,
        longitude: 88.3426
    },
    {
        id: 11,
        name: "Salt Lake Power Point",
        type: "dealer",
        address: "Sector V, Salt Lake",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700091",
        phone: "9876543220",
        email: "saltlake@indpower.com",
        rating: 4.2,
        latitude: 22.5761,
        longitude: 88.4335
    },

    // Hyderabad
    {
        id: 12,
        name: "Cyberabad Power Hub",
        type: "distributor",
        address: "HITEC City, Madhapur",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500081",
        phone: "9876543221",
        email: "hyderabad@indpower.com",
        rating: 4.7,
        latitude: 17.4486,
        longitude: 78.3808
    },
    {
        id: 13,
        name: "Banjara Hills Service",
        type: "service_center",
        address: "Road No. 12, Banjara Hills",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500034",
        phone: "9876543222",
        email: "banjara@indpower.com",
        rating: 4.5,
        latitude: 17.4156,
        longitude: 78.4347
    },

    // Pune
    {
        id: 14,
        name: "Pune Power Plaza",
        type: "dealer",
        address: "Hinjewadi IT Park",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
        phone: "9876543223",
        email: "pune@indpower.com",
        rating: 4.6,
        latitude: 18.5912,
        longitude: 73.7389
    },
    {
        id: 15,
        name: "Kothrud Service Center",
        type: "service_center",
        address: "Karve Road, Kothrud",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411038",
        phone: "9876543224",
        email: "kothrud@indpower.com",
        rating: 4.4,
        latitude: 18.5074,
        longitude: 73.8077
    },

    // Ahmedabad
    {
        id: 16,
        name: "Gujarat Power Solutions",
        type: "distributor",
        address: "S.G. Highway",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380054",
        phone: "9876543225",
        email: "ahmedabad@indpower.com",
        rating: 4.5,
        latitude: 23.0396,
        longitude: 72.5656
    },

    // Jaipur
    {
        id: 17,
        name: "Pink City Power",
        type: "dealer",
        address: "M.I. Road",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        phone: "9876543226",
        email: "jaipur@indpower.com",
        rating: 4.3,
        latitude: 26.9196,
        longitude: 75.7878
    },

    // Lucknow
    {
        id: 18,
        name: "Lucknow Power Center",
        type: "service_center",
        address: "Gomti Nagar",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226010",
        phone: "9876543227",
        email: "lucknow@indpower.com",
        rating: 4.2,
        latitude: 26.8470,
        longitude: 80.9470
    },

    // Chandigarh
    {
        id: 19,
        name: "Chandigarh Power Hub",
        type: "distributor",
        address: "Sector 17",
        city: "Chandigarh",
        state: "Chandigarh",
        pincode: "160017",
        phone: "9876543228",
        email: "chandigarh@indpower.com",
        rating: 4.6,
        latitude: 30.7410,
        longitude: 76.7685
    },

    // Bhopal
    {
        id: 20,
        name: "MP Power Solutions",
        type: "dealer",
        address: "New Market, T.T. Nagar",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pincode: "462003",
        phone: "9876543229",
        email: "bhopal@indpower.com",
        rating: 4.1,
        latitude: 23.2599,
        longitude: 77.4126
    },

    // Kochi
    {
        id: 21,
        name: "Kerala Power Point",
        type: "service_center",
        address: "M.G. Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682011",
        phone: "9876543230",
        email: "kochi@indpower.com",
        rating: 4.4,
        latitude: 9.9816,
        longitude: 76.2999
    },

    // Visakhapatnam
    {
        id: 22,
        name: "Vizag Power Center",
        type: "dealer",
        address: "Beach Road",
        city: "Visakhapatnam",
        state: "Andhra Pradesh",
        pincode: "530002",
        phone: "9876543231",
        email: "vizag@indpower.com",
        rating: 4.3,
        latitude: 17.7140,
        longitude: 83.3241
    },

    // Nagpur
    {
        id: 23,
        name: "Orange City Power",
        type: "distributor",
        address: "Civil Lines",
        city: "Nagpur",
        state: "Maharashtra",
        pincode: "440001",
        phone: "9876543232",
        email: "nagpur@indpower.com",
        rating: 4.2,
        latitude: 21.1458,
        longitude: 79.0882
    },

    // Coimbatore
    {
        id: 24,
        name: "Coimbatore Service Hub",
        type: "service_center",
        address: "Avinashi Road",
        city: "Coimbatore",
        state: "Tamil Nadu",
        pincode: "641018",
        phone: "9876543233",
        email: "coimbatore@indpower.com",
        rating: 4.5,
        latitude: 11.0168,
        longitude: 76.9558
    },

    // Indore
    {
        id: 25,
        name: "Indore Power Plaza",
        type: "dealer",
        address: "Vijay Nagar",
        city: "Indore",
        state: "Madhya Pradesh",
        pincode: "452010",
        phone: "9876543234",
        email: "indore@indpower.com",
        rating: 4.3,
        latitude: 22.7196,
        longitude: 75.8577
    }
];

// Helper function to search dealers by pincode
export const searchDealersByPincode = (pincode: string): DealerData[] => {
    if (!pincode) return [];

    // For demo, return dealers matching exact pincode or nearby ones
    const nearbyPincodes = getNearbyPincodes(pincode);
    return dummyDealers.filter(dealer =>
        dealer.pincode === pincode || nearbyPincodes.includes(dealer.pincode)
    );
};

// Helper function to get nearby pincodes (simplified for demo)
const getNearbyPincodes = (pincode: string): string[] => {
    const pincodeGroups: { [key: string]: string[] } = {
        // Delhi NCR region
        "110001": ["201301", "122015", "110001"],
        "201301": ["110001", "122015", "201301"],
        "122015": ["110001", "201301", "122015"],

        // Mumbai region
        "400001": ["400013", "400058"],
        "400013": ["400001", "400058"],
        "400058": ["400001", "400013"],

        // Bangalore region
        "560001": ["560100", "560066"],
        "560100": ["560001", "560066"],
        "560066": ["560001", "560100"],

        // Add more regions as needed
    };

    return pincodeGroups[pincode] || [];
};

// Helper function to get dealers by city
export const getDealersByCity = (city: string): DealerData[] => {
    return dummyDealers.filter(dealer =>
        dealer.city.toLowerCase().includes(city.toLowerCase())
    );
};

// Helper function to get dealers by state
export const getDealersByState = (state: string): DealerData[] => {
    return dummyDealers.filter(dealer =>
        dealer.state.toLowerCase().includes(state.toLowerCase())
    );
};

// Helper function to get dealer statistics
export const getDealerStats = () => {
    const distributors = dummyDealers.filter(d => d.type === 'distributor').length;
    const serviceCenters = dummyDealers.filter(d => d.type === 'service_center').length;
    const dealers = dummyDealers.filter(d => d.type === 'dealer').length;
    const states = new Set(dummyDealers.map(d => d.state)).size;
    const cities = new Set(dummyDealers.map(d => d.city)).size;

    return {
        total: dummyDealers.length,
        distributors,
        serviceCenters,
        dealers,
        states,
        cities
    };
};