import { ROADS } from "./roads";

export const LEVELS = {
    DEV: {
        backgroundSrc: 'images/track.jpg',
        width: 1061,
        height: 1500
    },
    ROAD_TEST: {
        backgroundSrc: ' images/background.png',
        width: 1600,
        height:1000,
        roads: [{
            ...ROADS.ICE_ROAD,
            x: 10,
            y: 10,
            height: 1500,
            height: 200
        }]
    }
}