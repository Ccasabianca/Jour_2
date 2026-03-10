function capitalize(str) {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function currentYear() {
    return new Date().getFullYear();
}

function bonjour(name) {
    const hour = new Date().getHours();
    const salut = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
    return `${salut}, ${capitalize(name)} !`;
}

module.exports = { capitalize, currentYear, bonjour };