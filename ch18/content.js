fetch("https://eloquentjavascript.net/author",{headers: {
	Accept: 'text/plain'
}}).then(resp => console.log('text/plain', resp.status));

fetch("https://eloquentjavascript.net/author",{headers: {
	Accept: 'application/json'
}}).then(resp => console.log('application/json', resp.status));

fetch("https://eloquentjavascript.net/author",{headers: {
	Accept: 'text/html'
}}).then(resp => console.log('text/html', resp.status));

fetch("https://eloquentjavascript.net/author",{headers: {
	Accept: 'application/rainbows+unicorns'
}}).then(resp => console.log('application/rainbows+unicorns', resp.status));