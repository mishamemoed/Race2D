import { ROADS } from "./roads";
import { EventType } from "./events";

export const LEVELS = {
    TRACK: {
        backgroundSrc: 'images/bg_misha.png',
        width: 2048,
        height: 1024,
        roads: [],
        walls: [{
            color: 'green',
            width: 46,
            height: 282,
            x: 964,
            y: 693,
            background: true,
            name: "start_line"
        },{
            x: 0,
            y: -15,
            width: 2048,
            height: 15
        },
        {
            x: -15,
            y: 0,
            width: 15,
            height: 1024
        },
        {
            x: 2063,
            y: 0,
            width: 15,
            height: 1024,

        },
        {
            x: 0,
            y: 1024,
            width: 2048,
            height: 15
        }
        ],
        spawn: {
            x: 868,
            y: 822,
            angle: 90,
        }
    },

    DEMO1: {
        backgroundSrc: 'images/demo1.png',
        width: 1920,
        height: 1080,
        spawn: {
            x: 766,
            y: 724,
            angle: 90
        },
        roads: [{
            ...ROADS.DRY_ASPHALT_ROAD,
            x: 469,
            y: 665,
            width: 875 - 469,
            height: 802 - 665
        },],
        walls: [{
            x: 0,
            y: -15,
            width: 1920,
            height: 15,
        },
        {
            x: -15,
            y: 0,
            width: 15,
            height: 1080,
        },
        {
            x: 0,
            y: 1095,
            width: 1920,
            height: 15,
        },
        {
            x: 1935,
            y: 0,
            width: 15,
            height: 1080,
        }]

    },
    DEV: {
        backgroundSrc: 'images/track.jpg',
        width: 1061,
        height: 1500,
        roads: [],
        walls: []
    },
    ROAD_TEST: {
        backgroundSrc: ' images/background.png',
        width: 1600,
        height: 1000,
        walls: [{
            x: 10,
            y: 10,
            width: 1580,
            height: 50,
            color: "#ff0000",
            angle: 30
        }],
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
            ...ROADS.WET_DIRT_ROAD,
            x: 10,
            y: 850,
            width: 1500,
            height: 200
        }]
    }
}