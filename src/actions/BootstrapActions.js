import {
    VEHICLE_POSTS_READY,
    UPDATED_DIMENSIONS
} from './types';

const sampleData = [
    {
        "year": 2013,
        "make": "Kia",
        "model": "Optima",
        "mileage": 24235,
        "drivetrain": "FWD",
        "bodytype": "sedan",
        "image_url": "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2013,
        "make": "Hyundai",
        "model": "Accent",
        "mileage": 21587,
        "drivetrain": "FWD",
        "bodytype": "sedan",
        "image_url": "http://www.conceptcarz.com/images/Hyundai/2013-Hyundai-Accent-Sedan-Image-01.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2014,
        "make": "Nissan",
        "model": "Juke",
        "mileage": 10457,
        "drivetrain": "FWD",
        "bodytype": "CUV",
        "image_url": "http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2014,
        "make": "Land Rover",
        "model": "Range Rover",
        "mileage": 7458,
        "drivetrain": "4x4",
        "bodytype": "SUV",
        "image_url": "http://st.motortrend.com/uploads/sites/10/2015/09/2014-Range-Rover-Autobiography-Black-Edition-front-three-quarters.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2014,
        "make": "Jaguar",
        "model": "XK",
        "mileage": 9852,
        "drivetrain": "RWD",
        "bodytype": "convertible",
        "image_url": "http://st.motortrend.com/uploads/sites/10/2015/09/2014-Jaguar-XKR-S-GT-front-three-quarter-in-motion-02.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2013,
        "make": "Audi",
        "model": "A5",
        "mileage": 17216,
        "image_url": "http://st.motortrend.com/uploads/sites/5/2012/07/2013-Audi-A5-front-three-quarter-in-motion.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2013,
        "make": "Jeep",
        "model": "Wrangler Unlimited",
        "mileage": 19000,
        "image_url": "http://blog.caranddriver.com/wp-content/uploads/2014/07/2013-Jeep-Wrangler-Unlimited-Rubicon-10th-Anniversary-Edition-PLACEMENT.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 1999,
        "make": "BMW",
        "model": "528i",
        "mileage": 160254,
        "image_url": "http://intorg.netfirms.com/Cars8/1999_BMW_528/DrQuarter2.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    },
    {
        "year": 2016,
        "make": "Lincoln",
        "model": "MKX",
        "mileage": 1545,
        "image_url": "http://st.motortrend.com/uploads/sites/10/2015/09/2016-Lincoln-MKX-front-three-quarter.jpg",
        "created_at": "2016-10-14T20:13:22.586Z"
    }
];

export const updateWindowDimensions = () => {

    return {
        type: UPDATED_DIMENSIONS,
        payload: {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        }
    }
};

export const loadVehicles = () => {
    return async (dispatch) => {
        dispatch({
            type: VEHICLE_POSTS_READY,
            payload: {vehiclePosts: sampleData}
        });
    }

};