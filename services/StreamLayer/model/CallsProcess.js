const processData = (new_Call, calls_data) => {
    calls_data.current_waiting_calls = new_Call.waiting_calls;
	calls_data = processCallsPerHour(new_Call, calls_data);
	calls_data = processLatestCalls(new_Call, calls_data);
	calls_data = processCallsPerCity(new_Call, calls_data);
	calls_data = processCallsPerTopic(new_Call, calls_data);
	calls_data = processCallsPerAge(new_Call, calls_data);
	calls_data = processAverageWaitingTimePerHour(new_Call, calls_data);
    return calls_data;
};

const processCallsPerHour = (new_Call, calls_data) => {
	const hour = new Date(new_Call.start_time).getHours();
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

const processCallsPerAge = (new_Call, calls_data) => {
	const age = new_Call.age;
	if (age < 18) {
		calls_data.calls_per_age["גיל < 18"]++;
	} else if (age < 26) {
		calls_data.calls_per_age["18-25"]++;
	} else if (age < 36) {
		calls_data.calls_per_age["26-35"]++;
	} else if (age < 46) {
		calls_data.calls_per_age["36-45"]++;
	} else if (age < 56) {
		calls_data.calls_per_age["46-55"]++;
	} else if (age < 66) {
		calls_data.calls_per_age["56-65"]++;
	} else {
		calls_data.calls_per_age["66+"]++;
	}
	return calls_data;
};

const processAverageWaitingTimePerHour = (new_Call, calls_data) => {
	const hour = new Date(new_Call.start_time).getHours();
	calls_data.total_calls_per_hour[hour]++;
	calls_data.sum_of_waiting_time_per_hour[hour] += new_Call.waiting_time;
	calls_data.average_waiting_time_per_hour[hour] = (calls_data.sum_of_waiting_time_per_hour[hour] / calls_data.total_calls_per_hour[hour]).toFixed(2);
	calls_data.average_waiting_time_per_hour[hour];
	return calls_data;
}

module.exports = {
    processData
};