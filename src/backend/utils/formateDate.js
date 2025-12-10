const formatDate = (date) => {
    if (!date) return 'NULL';
    const d = new Date(date);
    // Adjust for local timezone offset
    const offsetMs = d.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(d.getTime() - offsetMs);
    return `'${localDate.toISOString().slice(0, 19).replace('T', ' ')}'`;
};


export {
    formatDate  
}