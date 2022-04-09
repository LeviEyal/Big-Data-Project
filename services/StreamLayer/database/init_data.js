
module.exports.initial_data = {
    current_waiting_calls: 0,
    waiting_times: [],
    number_of_waiting_calls: [],
    calls_per_topic: {
		הצטרפות: 0,
		ניתוק: 0,
		תלונה: 0,
		שירות: 0
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
};