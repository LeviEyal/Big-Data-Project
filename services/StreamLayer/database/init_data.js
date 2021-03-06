module.exports = {
    current_waiting_calls: 0,
    average_waiting_time_per_hour: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    sum_of_waiting_time_per_hour: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    total_calls_per_hour: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    calls_per_topic: {
        הצטרפות: 0,
        ניתוק: 0,
        תלונה: 0,
        שירות: 0,
    },
    calls_per_city: {},
    last_calls: [],
    calls_per_hour: [
        {
            name: "הצטרפות",
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0,
            ],
        },
        {
            name: "ניתוק",
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0,
            ],
        },
        {
            name: "שירות",
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0,
            ],
        },
        {
            name: "תלונה",
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0,
            ],
        },
    ],
    calls_per_age: {
        "גיל < 18": 0,
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-55": 0,
        "56-65": 0,
        "66+": 0,
    },
};
