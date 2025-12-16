const formatTime = (timeString) => {
    if (!timeString) return '--:-- --';
    try {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        return '--:-- --';
    }
};


export default formatTime;