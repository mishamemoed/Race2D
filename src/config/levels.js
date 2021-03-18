import { ROADS } from "./roads";

export const LEVELS = {
    DEV: {
        backgroundSrc: 'images/track.jpg',
        width: 1061,
        height: 1500,
        roads: []
    },
    ROAD_TEST: {
        backgroundSrc: ' images/background.png',
        width: 1600,
        height:1000,
        roads: [{
           ...ROADS.ICE_ROAD,
            x: 10,
            y: 10,
            width: 1500,
            height: 200
        },
        {
            ...ROADS.DRY_ASPHALT_ROAD,
             x: 10,
             y: 220,
             width: 1500,
             height: 200
         },
         {
            ...ROADS.WET_ASPHALT_ROAD,
             x: 10,
             y: 430,
             width: 1500,
             height: 200
         },
         {
            ...ROADS.DRY_DIRT_ROAD,
             x: 10,
             y: 640,
             width: 1500,
             height: 200
         },
         {
            ...ROADS.WET_ASPHALT_ROAD,
             x: 10,
             y: 850,
             width: 1500,
             height: 200
         }]
    }
}