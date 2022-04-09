const processData = (new_Call, calls_data) => {
    calls_data.current_waiting_calls = new_Call.waiting_calls;
    // calls_data.waiting_times.push(new_Call.waiting_time);
    // calls_data.number_of_waiting_calls.push(new_Call.waiting_calls);
	calls_data = processCallsPerHour(new_Call, calls_data);
	calls_data = processLatestCalls(new_Call, calls_data);
	calls_data = processCallsPerCity(new_Call, calls_data);
	calls_data = processCallsPerTopic(new_Call, calls_data);
    return calls_data;
};

const processCallsPerHour = (new_Call, calls_data) => {
	const hour = new_Call.start_time.split(":")[0];
	calls_data.calls_per_hour.find((topic) => topic.name === new_Call.topic).data[hour]++;
	return calls_data;
};

const processLatestCalls = (new_Call, calls_data) => {
	const latestCall = {
		title: new_Call.name,
		time: new Date().getTime(),
		phone: new_Call.phone,
		type: new_Call.topic
	}
	calls_data.last_calls.push(latestCall);
	if (calls_data.last_calls.length > 5) {
		calls_data.last_calls.shift();
	}
	return calls_data;
};

const processCallsPerCity = (new_Call, calls_data) => {
	try {
		calls_data.calls_per_city[new_Call.city]++;
	} catch (error) {
		calls_data.calls_per_city[new_Call.city] = 1;
	}
	return calls_data;
};

const processCallsPerTopic = (new_Call, calls_data) => {
	calls_data.calls_per_topic[new_Call.topic]++;
	return calls_data;
};

module.exports = {
    processData
};